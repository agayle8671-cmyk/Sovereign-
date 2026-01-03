const { AnthropicVertex } = require('@anthropic-ai/sdk');

// CONFIGURATION
const PROJECT_ID = process.env.GCP_PROJECT || 'gen-lang-client-0241457047';
const REGION = 'us-east5'; // Required region for Claude Opus 4.5 on Vertex
const MODEL_ID = 'claude-opus-4-5@20251101';

// Initialize Anthropic Vertex Client
const client = new AnthropicVertex({
  region: REGION,
  projectId: PROJECT_ID,
});

exports.analyzeFinancials = async (req, res) => {
  // 1. OPEN THE GATES (CORS)
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    const text = req.body.text || '';

    // 2. CALL CLAUDE OPUS 4.5
    const msg = await client.messages.create({
      model: MODEL_ID,
      max_tokens: 4000,
      system: `You are a Forensic Tax Auditor (Agent: Claude Opus 4.5).
Analyze the provided text for R&D Tax Credits with extreme precision.

RETURN JSON ONLY (no markdown, no preamble):
{
  "estimated_value": Number,
  "risk_score": Number,
  "findings": ["String", "String", "String"]
}`,
      messages: [
        { role: "user", content: `Analyze this tax data:\n\n${text.substring(0, 20000)}` }
      ],
    });

    // 3. EXTRACT AND SEND
    // Claude response structure: msg.content[0].text
    const responseText = msg.content[0].text;

    const cleanJson = responseText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    res.status(200).json(JSON.parse(cleanJson));

  } catch (err) {
    console.error("CRITICAL ERROR:", err);
    // 4. SAFETY NET: Return JSON even on crash, never HTML
    res.status(200).json({
      estimated_value: 0,
      risk_score: 0,
      findings: ["System Error: " + err.message]
    });
  }
};
