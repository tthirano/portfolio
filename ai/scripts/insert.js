import clientPromise from "../lib/mongodb.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/embedded.json");

const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

async function run() {
  try {
    const client = await clientPromise;
    const db = client.db("portfolioDB");
    const collection = db.collection("portfolio_chunks");

    console.log(`Loaded ${data.length} documents`);

    await collection.deleteMany({});
    console.log("Cleared old data");

    await collection.insertMany(data);
    console.log("Data inserted!");

    process.exit(0);
  } catch (err) {
    console.error("Error inserting data:", err);
    process.exit(1);
  }
}

run();