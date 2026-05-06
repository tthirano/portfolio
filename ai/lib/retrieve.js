import { getMongoClient } from "@/ai/lib/mongodb";
import { embedText } from "userEmbed.js";

export async function retrieveRelevant(query) {
  const embedding = await embedText(query);

  const client = await getMongoClient(); 
  const db = client.db("portfolioDB");

  const results = await db.collection("portfolio_chunks").aggregate([
    {
      $vectorSearch: {
        index: "vector_index",
        path: "embedding",
        queryVector: embedding,
        numCandidates: 100,
        limit: 5
      }
    }
  ]).toArray();

  return results;
}