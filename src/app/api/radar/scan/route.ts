import { NextResponse } from "next/server";

export async function POST(req: Request) {
    // SIMULATION: The "Radar" Agent
    // In production, this would connect to Gmail/Slack API and use NLP to analyze sentiment.

    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate analysis

    // Mock Sentiment Results
    const clients = [
        {
            id: "client_1",
            name: "Acme Corp",
            sentiment_score: 92, // High (Happy)
            trend: "up",
            last_interaction: "2 hours ago",
            risk_factors: [],
            opportunity: "Upsell Ready: They are consistently praising the design. Good time to pitch the Mobile App add-on.",
            status: "healthy"
        },
        {
            id: "client_2",
            name: "TechStart Inc",
            sentiment_score: 45, // Low (Unhappy)
            trend: "down",
            last_interaction: "4 days ago",
            risk_factors: ["Delayed Response", "Passive Aggressive Tone", "Scope Creep mentions"],
            opportunity: "Churn Risk: Send a 'Value Drop' (status video) immediately to re-engage.",
            status: "at_risk"
        },
        {
            id: "client_3",
            name: "Global Media",
            sentiment_score: 75, // Neutral
            trend: "stable",
            last_interaction: "1 day ago",
            risk_factors: ["Budget Constraints mentioned"],
            opportunity: "Maintenance Mode: Schedule a check-in call to solidify the relationship.",
            status: "stable"
        }
    ];

    return NextResponse.json({ clients });
}
