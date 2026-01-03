import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject, generateText } from "ai";
import { z } from "zod";
import { db } from "@/lib/db";
import { contracts, clients, users } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

// Initialize Gemini client 
// Note: This will use the API Key if provided. 
// For Vertex AI (without API key), ensure GOOGLE_VERTEX_PROJECT and GOOGLE_VERTEX_LOCATION 
// are set in the environment, and the SDK will likely use ADC.
const google = createGoogleGenerativeAI({
    apiKey:
        process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY,
});

// Define schemas for structured outputs
export const BrainInsightsSchema = z.object({
    forensic: z.object({
        riskLevel: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
        summary: z.string(),
        keyFindings: z.array(z.string()),
        actionItems: z.array(z.string()),
    }),
    financial: z.object({
        outlook: z.enum(["POSITIVE", "NEUTRAL", "NEGATIVE"]),
        projectedRevenue: z.string(),
        opportunityAreas: z.array(z.string()),
    }),
});

export type BrainInsights = z.infer<typeof BrainInsightsSchema>;

export class SovereignBrain {
    private model: any;

    constructor() {
        // Use gemini-1.5-flash for speed and stability
        this.model = google("gemini-1.5-flash");
    }

    /**
     * Generates high-level forensic and financial insights based on the user's
     * recent contracts and client activity.
     */
    async generateInsights(userId: string): Promise<BrainInsights> {
        try {
            // 1. Context Gathering
            const [userContracts, userClients] = await Promise.all([
                db.query.contracts.findMany({
                    where: eq(contracts.userId, userId),
                    orderBy: [desc(contracts.createdAt)],
                    limit: 5,
                }),
                db.query.clients.findMany({
                    where: eq(clients.userId, userId),
                    limit: 10,
                }),
            ]);

            const context = {
                recentContracts: userContracts.map((c) => ({
                    title: c.title,
                    value: c.totalValue,
                    status: c.status,
                    riskScore: c.riskScore,
                    riskFlags: c.riskFlags,
                    date: c.createdAt,
                })),
                clients: userClients.map((c) => ({
                    name: c.name,
                    company: c.company,
                    healthScore: c.healthScore,
                    totalRevenue: c.totalRevenue,
                })),
            };

            // 2. AI Analysis
            const { object } = await generateObject({
                model: this.model,
                schema: BrainInsightsSchema,
                system: `You are the Sovereign Brain, an advanced autonomous business operations AI for independent professionals. 
        
        Your capabilities:
        - Forensic Analysis: Detect legal risks, scope creep patterns, and client red flags.
        - Financial Intelligence: Project revenue, identify growth opportunities, and optimize pricing.
        
        Analyze the provided context (recent contracts and clients) to generate strategic insights. 
        Be concise, direct, and actionable. Avoid generic advice.`,
                prompt: `Analyze this business readiness state:\n${JSON.stringify(
                    context,
                    null,
                    2
                )}`,
            });

            return object;
        } catch (error) {
            console.error("Sovereign Brain Error:", error);
            // Return a safe fallback if AI fails
            return {
                forensic: {
                    riskLevel: "LOW",
                    summary: "Unable to generate real-time analysis.",
                    keyFindings: ["System is currently offline or disconnected."],
                    actionItems: ["Check back later."],
                },
                financial: {
                    outlook: "NEUTRAL",
                    projectedRevenue: "N/A",
                    opportunityAreas: [],
                },
            };
        }
    }

    /**
     * General purpose chat method for specific queries
     */
    async chat(message: string, context?: any) {
        const { text } = await generateText({
            model: this.model,
            system: "You are Sovereign, a helpful assistant for freelancers.",
            prompt: `Context: ${JSON.stringify(context)}\n\nQuery: ${message}`,
        });
        return text;
    }
}

// Singleton instance
export const brain = new SovereignBrain();
