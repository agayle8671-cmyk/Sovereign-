import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, contracts, scopeItems } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

// Contract analysis schema
const ContractAnalysisSchema = z.object({
    summary: z.string().describe("Brief summary of the contract"),

    parties: z.object({
        client: z.object({
            name: z.string(),
            address: z.string().optional(),
        }),
        contractor: z.object({
            name: z.string(),
            address: z.string().optional(),
        }),
    }),

    financials: z.object({
        totalValue: z.number().nullable(),
        currency: z.string().default("USD"),
        paymentTerms: z.enum([
            "NET_15",
            "NET_30",
            "NET_45",
            "NET_60",
            "NET_90",
            "ON_COMPLETION",
            "MILESTONE",
            "OTHER",
        ]),
        paymentTermsRaw: z.string(),
        depositRequired: z.boolean(),
        depositAmount: z.number().nullable(),
    }),

    scope: z.array(
        z.object({
            description: z.string(),
            category: z.string(),
            deliverableType: z.string(),
            estimatedHours: z.number().nullable(),
            revisionLimits: z.number().nullable(),
        })
    ),

    dates: z.object({
        effectiveDate: z.string().nullable(),
        endDate: z.string().nullable(),
        milestones: z.array(
            z.object({
                name: z.string(),
                date: z.string(),
            })
        ),
    }),

    risks: z.array(
        z.object({
            clause: z.string().describe("The exact clause text"),
            category: z.enum([
                "IP_OWNERSHIP",
                "PAYMENT_TERMS",
                "SCOPE_AMBIGUITY",
                "LIABILITY",
                "TERMINATION",
                "NON_COMPETE",
                "INDEMNIFICATION",
                "CONFIDENTIALITY",
                "OTHER",
            ]),
            severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
            explanation: z.string(),
            recommendation: z.string(),
            suggestedRevision: z.string().optional(),
        })
    ),

    redFlags: z.array(z.string()),

    overallRiskScore: z.number().min(0).max(100),
});

export async function POST(req: NextRequest) {
    try {
        const { userId: clerkId } = await auth();
        if (!clerkId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get user
        const user = await db.query.users.findFirst({
            where: eq(users.clerkId, clerkId),
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Get file from form data
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Read file content
        const buffer = Buffer.from(await file.arrayBuffer());

        // For now, we'll simulate PDF extraction
        // In production, use pdf-parse or similar library
        const extractedText = await extractTextFromFile(buffer, file.type);

        // Analyze with AI
        const google = createGoogleGenerativeAI({
            apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY,
        });

        const { object: analysis } = await generateObject({
            model: google("gemini-1.5-pro-latest"),
            schema: ContractAnalysisSchema,
            system: `You are a contract analysis AI specialized in freelancer and independent contractor agreements.

Your role is to:
1. Extract all key terms and conditions
2. Identify risks and unfavorable clauses
3. Compare against industry standards
4. Suggest specific revisions for problematic clauses

Industry Benchmarks:
- Standard payment terms: NET-30
- IP transfer should only occur AFTER payment
- Revision limits: 2-3 rounds is standard
- Non-compete should be limited to 6-12 months max
- Indemnification should be mutual and capped

Be thorough but concise. Flag anything that deviates significantly from freelancer-friendly terms.
Calculate a risk score from 0-100 where 100 is safest.`,
            prompt: `Analyze this contract:\n\n${extractedText}`,
        });

        // Calculate weighted risk score
        const riskScore = calculateWeightedRiskScore(analysis.risks);
        analysis.overallRiskScore = riskScore;

        // Store in database
        const contractData = {
            userId: user.id,
            title: `Contract - ${analysis.parties.client.name}`,
            status: "pending_review" as const,
            originalFileName: file.name,
            parsedContent: extractedText,
            extractedTerms: analysis,
            riskScore: analysis.overallRiskScore,
            riskFlags: analysis.risks.filter(
                (r: any) => r.severity === "HIGH" || r.severity === "CRITICAL"
            ),
            paymentTerms: analysis.financials.paymentTerms as any, // Cast to enum type
            totalValue: analysis.financials.totalValue?.toString(),
            currency: analysis.financials.currency,
            startDate: analysis.dates.effectiveDate,
            endDate: analysis.dates.endDate,
        };

        const [contract] = await db
            .insert(contracts)
            .values(contractData)
            .returning();

        // Store scope items
        if (analysis.scope.length > 0) {
            await db.insert(scopeItems).values(
                analysis.scope.map((item) => ({
                    contractId: contract.id,
                    description: item.description,
                    category: item.category,
                    deliverableType: item.deliverableType,
                    estimatedHours: item.estimatedHours?.toString(),
                    revisionLimit: item.revisionLimits,
                    status: "pending" as const,
                }))
            );
        }

        return NextResponse.json({
            success: true,
            contractId: contract.id,
            ...analysis,
        });
    } catch (error) {
        console.error("Contract analysis error:", error);
        return NextResponse.json(
            { error: "Failed to analyze contract" },
            { status: 500 }
        );
    }
}

// Helper function to extract text from file
async function extractTextFromFile(
    buffer: Buffer,
    mimeType: string
): Promise<string> {
    // In production, use proper PDF/DOC parsing libraries
    // For now, return a placeholder for testing
    if (mimeType === "application/pdf") {
        // Use pdf-parse or similar
        // const pdfParse = require('pdf-parse');
        // const data = await pdfParse(buffer);
        // return data.text;
    }

    // Placeholder for demo
    return `
    SERVICE AGREEMENT

    This Agreement is entered into between:
    Client: Acme Technologies Inc.
    Contractor: [Your Name]

    SCOPE OF WORK:
    - Design and development of web application
    - 5 unique page designs
    - Responsive implementation
    - 2 rounds of revisions included

    PAYMENT TERMS:
    Total Project Fee: $15,000
    Payment Terms: Net-60 (Payment due 60 days after invoice)
    Deposit: 25% ($3,750) due upon signing

    INTELLECTUAL PROPERTY:
    All work product shall become the exclusive property of Client upon creation.
    Contractor assigns all rights, including copyright, to Client.

    CONFIDENTIALITY:
    Contractor agrees to maintain confidentiality for a period of 5 years.

    NON-COMPETE:
    Contractor agrees not to work with competing businesses for 2 years.

    LIABILITY:
    Contractor shall indemnify and hold harmless Client against any and all claims.

    TERMINATION:
    Either party may terminate with 7 days written notice.
    Upon termination, all work product transfers to Client regardless of payment status.
  `;
}

function calculateWeightedRiskScore(
    risks: z.infer<typeof ContractAnalysisSchema>["risks"]
): number {
    const severityWeights = {
        CRITICAL: 30,
        HIGH: 20,
        MEDIUM: 10,
        LOW: 5,
    };

    const categoryWeights: Record<string, number> = {
        IP_OWNERSHIP: 1.5,
        PAYMENT_TERMS: 1.3,
        LIABILITY: 1.2,
        INDEMNIFICATION: 1.2,
        TERMINATION: 1.0,
        SCOPE_AMBIGUITY: 1.0,
        NON_COMPETE: 0.8,
        CONFIDENTIALITY: 0.6,
        OTHER: 0.5,
    };

    let score = 100;

    for (const risk of risks) {
        const baseDeduction = severityWeights[risk.severity];
        const categoryMultiplier = categoryWeights[risk.category] || 1;
        score -= baseDeduction * categoryMultiplier;
    }

    return Math.max(0, Math.min(100, Math.round(score)));
}
