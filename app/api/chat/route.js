export const runtime = "nodejs";

import Groq from "groq-sdk";
import { retrieveRelevant } from "@/ai/lib/retrieve";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  console.log("HF_TOKEN set:", !!process.env.HF_TOKEN);
  console.log("GROQ_API_KEY set:", !!process.env.GROQ_API_KEY);
  
  const { message } = await req.json();

  const docs = await retrieveRelevant(message);

  const context = docs.map(d => d.content).join("\n");

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: "You are a portfolio assistant. Keep the responses brief and to the point and in 2-3 sentences max. Use only the provided context to answer questions. No bullet points, no headers, no lengthy explanations.",
      },
      {
        role: "user",
        content: `Context:\n${context}\n\nQuestion:\n${message}`,
      },
    ],
    max_tokens: 150,
  });

  return Response.json({
    reply: completion.choices[0].message.content,
  });
}