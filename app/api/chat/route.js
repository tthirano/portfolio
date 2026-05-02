import { NextResponse } from "next/server";
import OpenAI from "openai";
import clientPromise from "@/lib/mongodb";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "No message provided" }, { status: 400 });
    }

    // 1. Embed the user query
    const embeddingRes = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: message,
    });

    const queryEmbedding = embeddingRes.data[0].embedding;

    // 2. Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("portfolioDB");

    // 3. Vector search (retrieve top chunks)
    const results = await db.collection("portfolio_chunks").aggregate([
      {
        $vectorSearch: {
          queryVector: queryEmbedding,
          path: "embedding",
          numCandidates: 100,
          limit: 5,
          index: "default",
        },
      },
      {
        $project: {
          content: 1,
          title: 1,
          type: 1,
          score: { $meta: "vectorSearchScore" },
        },
      },
    ]).toArray();

    // 4. Build context from retrieved chunks
    const context = results
      .map((doc, i) => `[${i + 1}] ${doc.title}: ${doc.content}`)
      .join("\n\n");

    // 5. Create prompt
    const systemPrompt = `
You are Tyler Hirano answering questions about your background, projects, and experience.

Use ONLY the information provided below.
Do NOT make up information.
If the answer is not in the context, say you don't have that information.

Be:
- Clear
- Concise
- Slightly technical when appropriate
- Confident but not arrogant

Context:
${context}
`;

    // 6. Generate response
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;

    // 7. Return response (+ sources for bonus points)
    return NextResponse.json({
      reply,
      sources: results.map((r) => ({
        title: r.title,
        type: r.type,
        score: r.score,
      })),
    });

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}