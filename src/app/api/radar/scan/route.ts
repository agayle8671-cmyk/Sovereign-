import { NextResponse } from "next/server";
import { generateJSON } from "@/lib/gemini";

export async function POST(req: Request) {
    try {
        // In a real app, this would read emails/Slack. 
        // For this demo, we feed Gemini a "Simulated Context" of a difficult client.
        const prompt = `
            You are "The Radar", a Client Intelligence Officer.
            Analyze the following recent email history from a client "Apex Corp":
            
            "Hey, we need these changes by EOD. Also, I don't think we should pay for the last milestone since it was late (even though we delayed requirements). Let's hop on a call."

            Analyze sentiment, predict churn risk, and draft a "Battlecard" for the freelancer.
            
            Return JSON:
            {
                "clients": [
                    {
                        "id": "apex_corp",
                        "name": "Apex Corp",
                        "sentiment_score": number (0-100, 100 is happy),
                        "status": "Healthy" | "At Risk" | "Critical",
                        "trend": "up" | "down" | "stable",
                        "last_interaction": "2 hours ago",
                        "risk_factors": ["string"],
                        "opportunity": "string",
                        "battlecard": {
                            "scenario": "string",
                            "strategy": "string",
                            "script": "string (what to say on the call)"
                        }
                    }
                ]
            }
        `;

        console.log("Calling Gemini for Radar...");
        const analysis = await generateJSON(prompt);
        return NextResponse.json(analysis);
    } catch (error) {
        console.error("Radar Error:", error);
        return NextResponse.json({ error: "Radar Scan Failed" }, { status: 500 });
    }
}
