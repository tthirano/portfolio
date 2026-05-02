import fs from "fs";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

console.log("API KEY:", process.env.OPENAI_API_KEY);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const data = JSON.parse(fs.readFileSync("ai/data/portfolio.json"));

async function run() {
  const embedded = [];

  for (const item of data) {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: item.content
    });

    embedded.push({
      ...item,
      embedding: response.data[0].embedding
    });
  }

  fs.writeFileSync("data/embedded.json", JSON.stringify(embedded, null, 2));
}

run();