// import { retrieveRelevant } from "@/ai/lib/retrieve";

// export async function POST(req) {
//   const { message } = await req.json();

//   const docs = await retrieveRelevant(message);

//   const context = docs
//     .map(d => d.content)
//     .join("\n\n");

//   const response = await fetch("http://localhost:11434/api/generate", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       model: "llama3",
//       prompt: `
// You are Tyler, a CS student.

// Answer like you're talking to a recruiter.

// - Be concise
// - Be confident
// - Reference real projects when possible
// - Don't make things up

// Context:
// ${context}

// Question:
// ${message}
//       `,
//       stream: false
//     })
//   });

//   const data = await response.json();

//   return Response.json({ reply: data.response });
// }