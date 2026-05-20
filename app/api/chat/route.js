export const runtime = "nodejs";

import Groq from "groq-sdk";
import { retrieveRelevant } from "@/ai/lib/retrieve";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  const { message, history = [] } = await req.json();

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
}