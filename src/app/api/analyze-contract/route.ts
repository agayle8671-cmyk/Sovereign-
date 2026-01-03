import { NextResponse } from "next/server";

export async function POST(req: Request) {
    // SIMULATION MODE: In a real app, this would parse the PDF and call Vertex AI.
    // For the demo/MVP, we simulate the "Relentless Lawyer" AI.

    const body = await req.json();
    const { content } = body; // In production this would be the file content

    // Simulate AI processing time (human perception of "thinking")
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Determine response based on simulated content triggers (mocking intelligence)
    // If the user uploads anything, we return a standard "Predatory Contract" analysis 
    // to demonstrate the value proposition.

    const mockAnalysis = {
        risk_score: 85, // High Risk
        summary: "This contract contains 3 clauses that significantly threaten your cash flow and IP ownership. Immediate negotiation recommended.",
        payment_terms: {
            found: "Net-90",
            recommendation: "Net-30",
            status: "critical"
        },
        clauses: [
            {
                title: "Intellectual Property Transfer",
                text: "All work product shall be the sole property of the Client upon creation.",
                risk: "High",
                explanation: "This 'Work for Hire' clause strips you of your portfolio rights. You cannot display this work in your portfolio.",
                fix: "Amend to: 'Client receives ownership upon full payment. Contractor retains right to display in portfolio.'"
            },
            {
                title: "Payment Schedule",
                text: "Payment shall be made 90 days after receipt of valid invoice.",
                risk: "Critical",
                explanation: "Net-90 terms effectively finance the client's business with your labor. This creates a 3-month cash flow gap.",
                fix: "Counter-offer: 'Net-30' or '50% Upfront, 50% upon Completion'."
            },
            {
                title: "Indemnification",
                text: "Contractor agrees to indemnify Client against all claims, unlimited.",
                risk: "Medium",
                explanation: "Unlimited liability puts your personal assets at risk.",
                fix: "Cap liability at the total contract value."
            }
        ],
        negotiation_email: `Subject: Review of Agreement - Proposed Adjustments

Hi [Client Name],

I've reviewed the agreement and I'm practically ready to sign. However, there are three standard commercial terms I need to align with my policy:

1. Payment Terms: My standard terms are Net-30. Net-90 places undue cash flow pressure on my independent business.
2. Portfolio Rights: I need to retain the non-exclusive right to display this work in my portfolio for self-promotion.
3. Liability: I've capped the indemnification at the contract value, which is standard for independent contractors.

I've attached a redlined version with these small tweaks. If these work for you, I can sign today.

Best,
[Your Name]`
    };

    return NextResponse.json(mockAnalysis);
}
