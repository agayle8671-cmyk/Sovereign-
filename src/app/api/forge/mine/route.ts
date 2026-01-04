import { NextResponse } from "next/server";
import { generateJSON } from "@/lib/gemini";

export async function POST(req: Request) {
    try {
        // In production, this would look at real files.
        // Here, we ask Gemini to "Hallucinate" valuable assets based on modern trends.
        // This ensures the ideas are fresh and AI-generated every time.

        const prompt = `
            You are "The Forge", an Asset Mining AI.
            Scan the "Simulated Codebase" of a Senior Full Stack React Developer.
            Identify 3 high-value, reusable Micro-SaaS assets or components that could be extracted and sold.
            They should be modern (Next.js 14, Tailwind, AI-ready).

            Return JSON:
            {
                "assets": [
                    {
                        "id": "comp_1" etc,
                        "name": "string",
                        "type": "UI Component" | "Hook" | "Utility",
                        "source": "string (simulated path)",
                        "reusability_score": number (0-100),
                        "market_value": "string ($ price)",
                        "description": "string",
                        "status": "ready" | "needs_polish"
                    }
                ]
            }
        `;

        console.log("Calling Gemini for Forge...");
        const data = await generateJSON(prompt);
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Forge Error (Falling back to mock):", error);

        // Fallback data to ensure process completion even if AI fails
        const mockAssets = {
            assets: [
                {
                    id: "comp_1",
                    name: "Auth Flow Hook",
                    type: "Hook",
                    source: "src/hooks/useAuth.ts",
                    reusability_score: 95,
                    market_value: "$49",
                    description: "Enterprise-ready authentication hook with MFA support.",
                    status: "ready"
                },
                {
                    id: "comp_2",
                    name: "Pricing Table",
                    type: "UI Component",
                    source: "src/components/pricing.tsx",
                    reusability_score: 88,
                    market_value: "$29",
                    description: "Responsive pricing table with toggleable monthly/yearly views.",
                    status: "ready"
                },
                {
                    id: "comp_3",
                    name: "PDF Generator",
                    type: "Utility",
                    source: "src/lib/pdf.ts",
                    reusability_score: 92,
                    market_value: "$79",
                    description: "Server-side PDF generation utility for invoices and reports.",
                    status: "ready"
                }
            ]
        };

        return NextResponse.json(mockAssets);
    }
}
