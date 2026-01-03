import { createGoogleGenerativeAI } from "@ai-sdk/google";

if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set");
}

export const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

// Default model for contract analysis
export const contractAnalysisModel = google("gemini-2.0-flash-001");

// For longer documents or more complex analysis
export const contractAnalysisModelPro = google("gemini-1.5-pro");
