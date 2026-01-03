import { VertexAI } from '@google-cloud/vertexai';

// Configuration from verified user snippet
const PROJECT_ID = 'gen-lang-client-0241457047';
const LOCATION = 'global';
const API_ENDPOINT = 'aiplatform.googleapis.com';
const MODEL_ID = 'gemini-3-flash-preview';

const vertex_ai = new VertexAI({
    project: PROJECT_ID,
    location: LOCATION,
    apiEndpoint: API_ENDPOINT
});

export const gemini3 = vertex_ai.preview.getGenerativeModel({
    model: MODEL_ID,
    generationConfig: {
        maxOutputTokens: 8192,
        temperature: 0.7
    }
});

export async function generateGemini3(prompt: string) {
    try {
        const result = await gemini3.generateContent(prompt);
        const response = result.response;
        return response.candidates?.[0]?.content?.parts?.[0]?.text || "";
    } catch (error) {
        console.error("Gemini 3 Generation Error:", error);
        throw error;
    }
}
