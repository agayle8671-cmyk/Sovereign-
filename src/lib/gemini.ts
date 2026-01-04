import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const apiKey = process.env.GOOGLE_API_KEY || "";
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
    const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();

    try {
        return JSON.parse(cleaned);
    } catch (e) {
        console.error("Failed to parse Gemini JSON:", text);
        throw new Error("Invalid JSON response from AI");
    }
}
