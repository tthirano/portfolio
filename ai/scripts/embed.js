import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pipeline } from "@xenova/transformers";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, "../data/portfolio.json");
const outputPath = path.join(__dirname, "../data/embedded.json");

const raw = fs.readFileSync(inputPath, "utf-8");
const data = JSON.parse(raw);

console.log(`Loaded ${data.length} items`);

console.log("Loading embedding model...");
const embedder = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2"
);

console.log("Model loaded");

async function embedText(text) {
  const output = await embedder(text, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(output.data);
}

async function run() {
  const results = [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    console.log(`Embedding (${i + 1}/${data.length}): ${item.title}`);

    const embedding = await embedText(item.content);

    results.push({
      ...item,
      embedding,
    });
  }

  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

  console.log("Embeddings saved to embedded.json");
}

run();