import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/embedded.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI missing in .env.local");
}

async function run() {
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db("portfolioDB");
  const collection = db.collection("portfolio_chunks");

  console.log(`Loaded ${data.length} documents`);

  await collection.deleteMany({});
  console.log("Cleared old data");

  await collection.insertMany(data);
  console.log("Data inserted!");

  await client.close();
  process.exit(0);
}

run().catch((err) => {
  console.error("Error inserting data:", err);
  process.exit(1);
});