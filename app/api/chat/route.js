import { retrieveRelevant } from "@/ai/lib/retrieve";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();
    const docs = await retrieveRelevant(message);
    const context = docs?.map(d => d.content).join("\n\n");

    console.log("DOCS:", docs);
    console.log("CONTEXT:", context);

    const isProd = process.env.NODE_ENV === "production";

    let reply;

    if (isProd) {
      const completion = await groq.chat.completions.create({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: "You are Tyler, a CS student.",
          },
          {
            role: "user",
            content: `
              Context:
              ${context}

              Question:
              ${message}
            `,
          },
        ],
      });

      reply = completion.choices[0].message.content;

    } else {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "phi3:mini",
          prompt: `
            You are Tyler Hirano, a management information systmes and computer science student.

            ONLY use the provided context to answer the question.
            If the context does NOT contain the answer, say:
            "I don't have enough information to answer that."

            Do NOT make up information.

            Context:
            ${context}

            Question:
            ${message}

            Answer:
            `,
            stream: false
        }),
      });

      console.log("CONTEXT:", context);
      const data = await response.json();
      reply = data.response;
    }

    return Response.json({ reply });

  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}