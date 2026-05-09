import Groq from "groq-sdk";
import { retrieveRelevant } from "@/ai/lib/retrieve";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  const { message } = await req.json();

  const docs = await retrieveRelevant(message);
  const context = docs.map(d => d.content).join("\n");

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant", 
    messages: [
  {
    role: "system",
    content: `
        You are Tyler Hirano’s personal portfolio assistant.

        CRITICAL RULES:
        - ONLY use the provided context.
        - Do NOT guess or generalize.
        - If the answer is not explicitly in the context, say:
          "I don't have enough information in my portfolio to answer that."

        - Be specific, factual, and concise.
        - Prefer details, numbers, project names, and technologies if present.
        `
        },
        {
          role: "user",
          content: `
      Use the context below to answer the question.

      Context:
      ${context}

      Question:
      ${message}

      Answer in 3–6 sentences max. Be specific.
      `
      }
    ]
  });

  return Response.json({
    reply: completion.choices[0].message.content
  });
}