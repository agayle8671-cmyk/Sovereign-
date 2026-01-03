
const { VertexAI } = require('@google-cloud/vertexai');

// CONFIGURATION FROM USER
const PROJECT_ID = 'gen-lang-client-0241457047';
const MODEL_ID = 'gemini-3-flash-preview';
const LOCATION = 'global';
const API_ENDPOINT = 'aiplatform.googleapis.com';

console.log(`Initializing VertexAI with Project: ${PROJECT_ID}, Location: ${LOCATION}, Endpoint: ${API_ENDPOINT}`);

// 1. FORCE GLOBAL ENDPOINT
const vertex_ai = new VertexAI({
    project: PROJECT_ID,
    location: LOCATION,
    apiEndpoint: API_ENDPOINT
});

async function verifyConnection() {
    try {
        console.log(`Connecting to model: ${MODEL_ID}...`);
        // 3. INITIALIZE GEMINI 3
        const generativeModel = vertex_ai.preview.getGenerativeModel({
            model: MODEL_ID,
            generationConfig: {
                maxOutputTokens: 1024,
                temperature: 0.7
            }
        });

        const prompt = "What is your exact model name and version? Are you Gemini 1.5, 2.0, or 3.0? Be precise.";

        console.log("Sending prompt...");
        const result = await generativeModel.generateContent(prompt);
        const response = result.response;

        if (response && response.candidates && response.candidates.length > 0) {
            console.log("\n--- SUCCESS ---");
            console.log("Model Response:", response.candidates[0].content.parts[0].text);
            console.log("----------------\n");
        } else {
            console.log("Received response structure but no candidates.");
            console.log(JSON.stringify(response, null, 2));
        }

    } catch (err) {
        console.error("\n--- CRITICAL ERROR ---");
        console.error(err);
        console.error("----------------------\n");
        process.exit(1);
    }
}

verifyConnection();
