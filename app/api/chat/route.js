export const runtime = "nodejs";

import Groq from "groq-sdk";
import { retrieveRelevant } from "@/ai/lib/retrieve";

const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 10;
const MAX_MESSAGE_LENGTH = 1_000;
const MAX_HISTORY_MESSAGES = 10;
const MAX_HISTORY_MESSAGE_LENGTH = 1_000;
const rateLimits = new Map();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function getClientIp(req) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip) {
  const now = Date.now();

  for (const [key, entry] of rateLimits) {
    if (now - entry.windowStartedAt >= RATE_LIMIT_WINDOW_MS) {
      rateLimits.delete(key);
    }
  }

  const entry = rateLimits.get(ip);
  if (!entry) {
    rateLimits.set(ip, { count: 1, windowStartedAt: now });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS_PER_WINDOW;
}

export async function POST(req) {
  if (isRateLimited(getClientIp(req))) {
    return Response.json(
      { error: "Too many chat requests. Please try again in a minute." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { message, history = [] } = body;
  const validHistory =
    Array.isArray(history) &&
    history.length <= MAX_HISTORY_MESSAGES &&
    history.every(
      (item) =>
        item &&
        (item.role === "user" || item.role === "assistant") &&
        typeof item.content === "string" &&
        item.content.length <= MAX_HISTORY_MESSAGE_LENGTH
    );

  if (
    typeof message !== "string" ||
    !message.trim() ||
    message.length > MAX_MESSAGE_LENGTH ||
    !validHistory
  ) {
    return Response.json({ error: "Invalid chat request." }, { status: 400 });
  }

  try {
    const docs = await retrieveRelevant(message);

    const context = docs.map(d => d.content).join("\n");

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `You are a professional, kind, and personable portfolio assistant for Ty, a software developer. Answer questions about Ty concisely in 2-3 sentences max. No bullet points, no headers, no lengthy explanations. End with one short follow-up question asking if the user wants to know more about a specific aspect of Ty's experience, projects, or skills and nothing else.\n\nContext:\n${context}`,
        },
        ...history,
        { role: "user", content: message },
      ],
      max_tokens: 150,
    });

    return Response.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Chat request failed", error);
    return Response.json(
      { error: "The chat service is temporarily unavailable." },
      { status: 503 }
    );
  }
}
