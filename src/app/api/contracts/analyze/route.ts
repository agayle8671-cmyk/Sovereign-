import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, contracts, scopeItems } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { analyzeContract } from "@/lib/ai/contract-analyzer";
import { parseDocument } from "@/lib/ai/document-parser";
import { triggerEvent, getUserChannel } from "@/lib/pusher/server";

export const maxDuration = 60; // Allow up to 60 seconds for analysis

export async function POST(req: NextRequest) {
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

        // Get file from form data
        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const clientId = formData.get("clientId") as string | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Validate file size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json(
                { error: "File too large. Maximum size is 10MB." },
                { status: 400 }
            );
        }

        // Parse document
        let contractText: string;
        const buffer = Buffer.from(await file.arrayBuffer());

        try {
            contractText = await parseDocument(buffer, file.type);
        } catch (error) {
            return NextResponse.json(
                { error: error instanceof Error ? error.message : "Failed to parse document" },
                { status: 400 }
            );
        }

        if (!contractText || contractText.trim().length < 100) {
            return NextResponse.json(
                { error: "Could not extract enough text from the document. Please try a different file." },
                { status: 400 }
            );
        }

        // Analyze with AI
        let analysis;
        try {
            analysis = await analyzeContract(contractText);
        } catch (error) {
            console.error("AI analysis error:", error);
            return NextResponse.json(
                { error: "Failed to analyze contract. Please try again." },
                { status: 500 }
            );
        }

        // Generate title from analysis
        const title = `${analysis.contractType.replace(/_/g, " ")} - ${analysis.parties.client.name}`;

        // Save to database
        const [contract] = await db
            .insert(contracts)
            .values({
                userId: user.id,
                clientId: clientId || null,
                title,
                status: "pending_review",
                originalFileName: file.name,
                parsedContent: contractText,
                extractedTerms: analysis as any,
                riskScore: analysis.overallRiskScore,
                riskFlags: analysis.risks as any,
                totalValue: analysis.financials.totalValue?.toString() || null,
                currency: analysis.financials.currency,
            })
            .returning();

        // Save scope items
        if (analysis.scope.length > 0) {
            await db.insert(scopeItems).values(
                analysis.scope.map((item) => ({
                    contractId: contract.id,
                    description: item.description,
                    category: item.category,
                    deliverableType: item.category,
                    status: "pending" as const,
                }))
            );
        }

        // Trigger Real-time Event
        await triggerEvent(
            getUserChannel(user.id),
            "contract:analyzed",
            {
                contractId: contract.id,
                title: contract.title,
                riskScore: analysis.overallRiskScore,
                riskCount: analysis.risks.length,
            }
        );

        return NextResponse.json({
            success: true,
            contractId: contract.id,
            analysis,
        });
    } catch (error) {
        console.error("Contract analysis error:", error);
        return NextResponse.json(
            { error: "An unexpected error occurred" },
            { status: 500 }
        );
    }
}
