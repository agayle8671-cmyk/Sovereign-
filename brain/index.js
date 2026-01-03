const { VertexAI } = require('@google-cloud/vertexai');

// CONFIGURATION
const PROJECT_ID = 'gen-lang-client-0241457047';
const MODEL_ID = 'gemini-3-flash-preview';

// 1. FORCE GLOBAL ENDPOINT
// This is the secret sauce. Without this, it defaults to us-central1 and fails.
const vertex_ai = new VertexAI({
  project: PROJECT_ID,
  location: 'global',
  apiEndpoint: 'aiplatform.googleapis.com'
});

exports.analyzeFinancials = async (req, res) => {
  // 2. OPEN THE GATES (CORS)
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    const text = req.body.text || '';

    // 3. INITIALIZE GEMINI 3 (Thinking Model)
    const generativeModel = vertex_ai.preview.getGenerativeModel({
      model: MODEL_ID,
      generationConfig: {
        maxOutputTokens: 8192,
        temperature: 0.7
      }
    });

    const prompt = `
      You are a Forensic Tax Auditor (Agent: Gemini-3). 
      Analyze this text for R&D Tax Credits.
      
      RETURN JSON ONLY:
      {
        "estimated_value": Number,
        "risk_score": Number,
        "findings": ["String", "String", "String"]
      }
      
      TEXT: ${text.substring(0, 20000)}
    `;

    const result = await generativeModel.generateContent(prompt);
    const response = result.response;

    // 4. CLEAN & SEND
    const cleanJson = response.candidates[0].content.parts[0].text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    res.status(200).json(JSON.parse(cleanJson));

  } catch (err) {
    console.error("CRITICAL ERROR:", err);
    // 5. SAFETY NET: Return JSON even on crash, never HTML
    res.status(200).json({
      estimated_value: 0,
      risk_score: 0,
      findings: ["System Error: " + err.message]
    });
  }
};
