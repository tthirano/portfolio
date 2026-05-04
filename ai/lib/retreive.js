import clientPromise from "../../lib/mongodb.js";
import { embedText } from "./embed.js";

export async function retrieveRelevant(query) {
  const embedding = await embedText(query);

  const client = await clientPromise;
  const db = client.db("portfolioDB");

  const results = await db.collection("portfolio_chunks").aggregate([
    {
      $vectorSearch: {
        index: "_id", 
        path: "embedding",
        queryVector: embedding,
        numCandidates: 100,
        limit: 5
      }
    }
  ]).toArray();

  return results;
}