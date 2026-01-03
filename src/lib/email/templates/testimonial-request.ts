interface TestimonialRequestEmailProps {
    freelancerName: string;
    clientName: string;
    magicLink: string;
    projectName?: string;
}

export function testimonialRequestEmail({
    freelancerName,
    clientName,
    magicLink,
    projectName,
}: TestimonialRequestEmailProps): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Share Your Experience</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #171717; border-radius: 16px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #8b5cf6, #7c3aed); border-radius: 16px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 28px;">✨</span>
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                Share Your Experience
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 20px 40px 40px;">
              <p style="margin: 0 0 20px; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                Hi ${clientName},
              </p>
              <p style="margin: 0 0 20px; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                ${freelancerName} would love to hear about your experience working together${projectName ? ` on <strong style="color: #ffffff;">${projectName}</strong>` : ""}.
              </p>
              <p style="margin: 0 0 30px; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                Your feedback helps them improve and helps other clients make informed decisions. It only takes a minute!
              </p>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${magicLink}" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                      Share Your Feedback
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 30px 0 0; color: #737373; font-size: 14px; line-height: 1.6;">
                Or copy this link:<br>
                <a href="${magicLink}" style="color: #8b5cf6; word-break: break-all;">${magicLink}</a>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; background-color: #0f0f0f; border-top: 1px solid #262626;">
              <p style="margin: 0; color: #525252; font-size: 12px; text-align: center;">
                This link expires in 30 days and can only be used once.
              </p>
            </td>
          </tr>
        </table>
        
        <p style="margin: 20px 0 0; color: #525252; font-size: 12px;">
          Powered by <a href="https://sovereign.com" style="color: #8b5cf6; text-decoration: none;">Sovereign</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}
