import { getMongoClient } from "./mongodb.js";
import { embedText } from "./userEmbed.js";

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
        limit: 8,
        numCandidates: 200
      }
    }
  ]).toArray();

  return results;
}