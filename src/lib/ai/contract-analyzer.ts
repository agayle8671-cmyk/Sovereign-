import { generateObject } from "ai";
import { z } from "zod";
import { contractAnalysisModel } from "./index";

// Schema for contract analysis output
export const ContractAnalysisSchema = z.object({
    summary: z.string().describe("Brief 2-3 sentence summary of the contract"),

    parties: z.object({
        client: z.object({
            name: z.string(),
            role: z.string().optional(),
        }),
        contractor: z.object({
            name: z.string(),
            role: z.string().optional(),
        }),
    }),

    contractType: z.enum([
        "SERVICE_AGREEMENT",
        "NDA",
        "EMPLOYMENT",
        "CONSULTING",
        "LICENSING",
        "PARTNERSHIP",
        "OTHER",
    ]),

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
            "UPFRONT",
            "OTHER",
        ]),
        paymentTermsRaw: z.string().describe("Exact payment terms from contract"),
        depositRequired: z.boolean(),
        depositPercentage: z.number().nullable(),
        latePaymentPenalty: z.string().nullable(),
    }),

    scope: z.array(
        z.object({
            description: z.string(),
            category: z.enum([
                "DELIVERABLE",
                "SERVICE",
                "MILESTONE",
                "REVISION",
                "SUPPORT",
                "OTHER",
            ]),
            isQuantified: z.boolean(),
            quantity: z.string().nullable(),
        })
    ),

    timeline: z.object({
        startDate: z.string().nullable(),
        endDate: z.string().nullable(),
        duration: z.string().nullable(),
        milestones: z.array(
            z.object({
                name: z.string(),
                date: z.string().nullable(),
                description: z.string().nullable(),
            })
        ),
    }),

    risks: z.array(
        z.object({
            clause: z.string().describe("The exact problematic clause text"),
            category: z.enum([
                "IP_OWNERSHIP",
                "PAYMENT_TERMS",
                "SCOPE_AMBIGUITY",
                "LIABILITY",
                "TERMINATION",
                "NON_COMPETE",
                "INDEMNIFICATION",
                "CONFIDENTIALITY",
                "UNLIMITED_REVISIONS",
                "WORK_FOR_HIRE",
                "KILL_FEE",
                "OTHER",
            ]),
            severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
            explanation: z.string().describe("Why this is risky for the freelancer"),
            recommendation: z.string().describe("What to do about it"),
            suggestedRevision: z
                .string()
                .nullable()
                .describe("Suggested replacement clause language"),
        })
    ),

    positives: z.array(
        z.object({
            clause: z.string(),
            description: z.string(),
        })
    ).describe("Good clauses that protect the freelancer"),

    missingClauses: z.array(
        z.object({
            clause: z.string(),
            importance: z.enum(["RECOMMENDED", "IMPORTANT", "CRITICAL"]),
            suggestedLanguage: z.string(),
        })
    ).describe("Important clauses that are missing from the contract"),

    overallRiskScore: z
        .number()
        .min(0)
        .max(100)
        .describe("100 = safest, 0 = most risky"),

    negotiationPriority: z.array(z.string()).describe(
        "Top 3-5 items to negotiate, in order of importance"
    ),
});

export type ContractAnalysis = z.infer<typeof ContractAnalysisSchema>;

const SYSTEM_PROMPT = `You are an expert contract analyst specializing in freelance and independent contractor agreements. Your job is to protect freelancers from unfavorable contract terms.

ANALYSIS GUIDELINES:

1. **Payment Terms Benchmarks**:
   - NET-30 is standard and acceptable
   - NET-45+ is unfavorable (flag as MEDIUM risk)
   - NET-60+ is highly unfavorable (flag as HIGH risk)
   - NET-90 is unacceptable (flag as CRITICAL risk)
   - No deposit on large projects is risky

2. **IP/Work Product Red Flags**:
   - "All work product becomes client property upon creation" - CRITICAL
   - "Work for hire" without payment protection - HIGH
   - IP transfers before payment - CRITICAL
   - Client owns unused concepts/drafts - HIGH
   - No portfolio rights - MEDIUM

3. **Scope Red Flags**:
   - "Unlimited revisions" - CRITICAL
   - Vague deliverables without quantities - HIGH  
   - No revision limits specified - MEDIUM
   - Scope changes without change orders - HIGH

4. **Liability Red Flags**:
   - Unlimited indemnification - CRITICAL
   - No liability cap - HIGH
   - Indemnification not mutual - MEDIUM
   - Contractor liable for third-party actions - HIGH

5. **Termination Red Flags**:
   - Client can terminate without payment for work done - CRITICAL
   - No kill fee - MEDIUM
   - Work transfers on termination regardless of payment - CRITICAL
   - Very short notice period (< 7 days) - MEDIUM

6. **Non-Compete Red Flags**:
   - > 12 months duration - HIGH
   - > 6 months for project-based work - MEDIUM
   - Overly broad geographic/industry scope - HIGH
   - Prevents working in your field - CRITICAL

7. **Missing Clauses to Flag**:
   - No late payment penalties
   - No kill fee/cancellation terms
   - No IP retention until payment
   - No revision limits
   - No scope change process
   - No dispute resolution

Always explain risks in plain language and provide specific, actionable recommendations.
Calculate the risk score based on:
- Start at 100
- CRITICAL issues: -25 points each
- HIGH issues: -15 points each  
- MEDIUM issues: -8 points each
- LOW issues: -3 points each
- Missing important clauses: -5 points each
- Minimum score: 0`;

export async function analyzeContract(
    contractText: string
): Promise<ContractAnalysis> {
    const { object } = await generateObject({
        model: contractAnalysisModel,
        schema: ContractAnalysisSchema,
        system: SYSTEM_PROMPT,
        prompt: `Analyze this contract and identify all risks, issues, and recommendations:

---CONTRACT START---
${contractText}
---CONTRACT END---

Provide a thorough analysis focusing on protecting the freelancer/contractor.`,
    });

    return object;
}

export async function generateNegotiationEmail(
    analysis: ContractAnalysis,
    selectedRisks: ContractAnalysis["risks"],
    tone: "professional" | "friendly" | "firm" = "professional"
): Promise<string> {
    const { text } = await import("ai").then((m) =>
        m.generateText({
            model: contractAnalysisModel,
            system: `You are an expert negotiation coach for freelancers. Write professional, persuasive emails that protect the freelancer's interests while maintaining good client relationships.

Tone: ${tone}
- professional: Formal, business-like, focuses on industry standards
- friendly: Warm but still professional, emphasizes partnership
- firm: Direct, confident, emphasizes non-negotiables`,
            prompt: `Write a negotiation email for a freelancer who needs to address these contract issues:

Contract Summary: ${analysis.summary}

Issues to Address:
${selectedRisks
                    .map(
                        (r, i) => `${i + 1}. ${r.category}: ${r.explanation}
   Recommendation: ${r.recommendation}
   Suggested revision: ${r.suggestedRevision || "N/A"}`
                    )
                    .join("\n\n")}

Write a complete email that:
1. Thanks them for the contract
2. Expresses enthusiasm about the project
3. Addresses each issue diplomatically
4. Proposes specific alternatives
5. Invites discussion
6. Maintains a positive, collaborative tone

Do not use placeholder text - write the complete email.`,
        })
    );

    return text;
}
