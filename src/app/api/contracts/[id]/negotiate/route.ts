import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, contracts } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { generateNegotiationEmail, ContractAnalysis } from "@/lib/ai/contract-analyzer";

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { userId: clerkId } = await auth();

        if (!clerkId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await db.query.users.findFirst({
            where: eq(users.clerkId, clerkId),
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const contract = await db.query.contracts.findFirst({
            where: and(
                eq(contracts.id, params.id),
                eq(contracts.userId, user.id)
            ),
        });

        if (!contract) {
            return NextResponse.json({ error: "Contract not found" }, { status: 404 });
        }

        const body = await req.json();
        const { selectedRiskIndices, tone = "professional" } = body;

        if (!selectedRiskIndices || !Array.isArray(selectedRiskIndices)) {
            return NextResponse.json(
                { error: "selectedRiskIndices is required" },
                { status: 400 }
            );
        }

        const analysis = contract.extractedTerms as ContractAnalysis;
        const selectedRisks = selectedRiskIndices.map(
            (i: number) => analysis.risks[i]
        ).filter(Boolean);

        if (selectedRisks.length === 0) {
            return NextResponse.json(
                { error: "No valid risks selected" },
                { status: 400 }
            );
        }

        const email = await generateNegotiationEmail(analysis, selectedRisks, tone);

        return NextResponse.json({ email });
    } catch (error) {
        console.error("Negotiation email error:", error);
        return NextResponse.json(
            { error: "Failed to generate negotiation email" },
            { status: 500 }
        );
    }
}
