import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { content } = body;

        // Use Real AI if Key is present, otherwise fallback (or error)
        // But user provided key, so we use it.
        const { generateJSON } = await import("@/lib/gemini");

        const prompt = `
            You are "The Guardian", an elite AI Legal Contract Analyst for freelancers.
            Analyze the following contract text for predatory terms.
            
            Contract Text:
            "${content || "No text provided"}"

            Crucial checks:
            1. Payment Terms > Net-30?
            2. IP Transfer (immediate vs upon payment)?
            3. Unlimited Liability?
            
            Return JSON:
            {
                "risk_score": number (0-100),
                "summary": "Short executive summary",
                "payment_terms": { "found": string, "recommendation": string, "status": "critical"|"safe" },
                "clauses": [
                    { "title": string, "text": string (quote), "risk": "High"|"Medium"|"Low", "explanation": string, "fix": string }
                ],
                "negotiation_email": "Draft a negotiation email based on findings"
            }
        `;

        console.log("Calling Gemini for Shield Core...");
        const analysis = await generateJSON(prompt);
        return NextResponse.json(analysis);

    } catch (error) {
        console.error("Shield Core Error:", error);
        return NextResponse.json({ error: "AI Analysis Failed" }, { status: 500 });
    }
}
