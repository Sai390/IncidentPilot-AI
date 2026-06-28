import { generateResponse } from "./ai/ollama.js";

const prompt = `
Summarize this incident:

Registtaion  service is returning HTTP 500 errors.
Around 2,000 users are affected.
Priority is P1.
`;

const response = await generateResponse(prompt);

console.log("\n===== AI Response =====\n");
console.log(response);