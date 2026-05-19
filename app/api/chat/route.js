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
        content: "You are a portfolio assistant.",
      },
      {
        role: "user",
        content: `Context:\n${context}\n\nQuestion:\n${message}`,
      },
    ],
  });

  return Response.json({
    reply: completion.choices[0].message.content,
  });
}