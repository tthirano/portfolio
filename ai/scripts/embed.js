import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pipeline } from "@xenova/transformers";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// correct paths
const inputPath = path.join(__dirname, "../data/portfolio.json");
const outputPath = path.join(__dirname, "../data/embedded.json");

// load data
const raw = fs.readFileSync(inputPath, "utf-8");
const data = JSON.parse(raw);

console.log(`Loaded ${data.length} items`);

// load embedding model
console.log("Loading embedding model...");
const embedder = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2"
);

console.log("Model loaded");

// helper function
async function embedText(text) {
  const output = await embedder(text, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(output.data);
}

// main
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

  // save locally
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

  console.log("✅ Embeddings saved to embedded.json");
}

run();