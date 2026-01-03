import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set - emails will be logged only");
}

export const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

export async function sendEmail({
    to,
    subject,
    html,
    from = "Sovereign <noreply@yourdomain.com>",
}: {
    to: string;
    subject: string;
    html: string;
    from?: string;
}) {
    if (!resend) {
        console.log("=== EMAIL (not sent - no API key) ===");
        console.log("To:", to);
        console.log("Subject:", subject);
        console.log("HTML:", html);
        console.log("=====================================");
        return { success: true, id: "dev-mode" };
    }

    try {
        const { data, error } = await resend.emails.send({
            from,
            to,
            subject,
            html,
        });

        if (error) {
            throw error;
        }

        return { success: true, id: data?.id };
    } catch (error) {
        console.error("Email send error:", error);
        throw error;
    }
}
