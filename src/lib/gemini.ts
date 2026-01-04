import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key (Check both standard and Railway variable names)
const apiKey = process.env.GOOGLE_API_KEY || process.env.GOOGLE_AI_KEY || "";
console.log("Gemini Helper: Using Env Key:", apiKey ? "Yes" : "No");
const genAI = new GoogleGenerativeAI(apiKey);

export async function getGeminiModel() {
    return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
}

export async function generateJSON(prompt: string) {
    const model = await getGeminiModel();

    // Enforce JSON output via prompt engineering and generation config if available
    // For Gemini Pro, we'll request JSON specifically in the prompt.
    const result = await model.generateContent(prompt + `\n\nReturn the result as valid JSON.`);
    const response = await result.response;
    const text = response.text();

    // Helper to clean markdown code blocks if Gemini wraps JSON in ```json ... ```
    let cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();

    // If cleaning isn't enough, find the first '{' and last '}'
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");

    if (firstBrace !== -1 && lastBrace !== -1) {
        cleaned = cleaned.substring(firstBrace, lastBrace + 1);
    }

    try {
        return JSON.parse(cleaned);
    } catch (e) {
        console.error("Failed to parse Gemini JSON:", text);
        throw new Error("Invalid JSON response from AI");
    }
}
