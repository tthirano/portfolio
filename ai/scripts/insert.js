import clientPromise from "../lib/mongodb.js";
import fs from "fs";

const data = JSON.parse(fs.readFileSync("data/embedded.json"));

async function run() {
  const client = await clientPromise;
  const db = client.db("portfolioDB");

  await db.collection("portfolio_chunks").insertMany(data);

  console.log("Data inserted!");
}

run();