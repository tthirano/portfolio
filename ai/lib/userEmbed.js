export async function embedText(text, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(
      "https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/pipeline/feature-extraction",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
      }
    );

    console.log("HF status:", res.status);
    const raw = await res.text();
    console.log("HF raw:", raw.slice(0, 300));

    const url = "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2";
    console.log("Fetching:", url);

    const data = JSON.parse(raw);

    if (Array.isArray(data)) return data;

    if (data.error?.includes("loading")) {
      await new Promise(r => setTimeout(r, 2000));
      continue;
    }

    throw new Error(data.error ?? "HF embedding failed");
  }

  throw new Error("HF model failed to load after retries");
}