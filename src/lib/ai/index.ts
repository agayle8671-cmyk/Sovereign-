import { createGoogleGenerativeAI } from "@ai-sdk/google";

const apiKey = process.env.GOOGLE_AI_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || "dummy-key";

// Only throw if we try to use it and it's missing (though createGoogleGenerativeAI might handle that)
// For build time, we want to avoid crashing
if (!process.env.GOOGLE_AI_KEY && !process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    console.warn("GOOGLE_AI_KEY is not set. AI features will not work.");
}

export const google = createGoogleGenerativeAI({
    apiKey,
});

// Default model for contract analysis
// Default model for contract analysis
// Default model for contract analysis
export const contractAnalysisModel = google("gemini-2.0-flash-exp");


// For longer documents or more complex analysis
export const contractAnalysisModelPro = google("gemini-1.5-pro");

// OpenRouter configuration if using transforms
export const openRouterConfig = {
    transforms: ["middle-out"], // Compress prompts that exceed context size
};
