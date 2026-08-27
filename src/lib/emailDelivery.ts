import nodemailer from "nodemailer";
import { siteConfig } from "@/data/siteConfig";

export interface EmailOrderDetails {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  trxId: string;
  amount: number;
  downloadToken: string;
  watermarkedPdfBuffer?: Buffer;
}

export interface EmailDeliveryResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Creates nodemailer transport using Gmail SMTP credentials
 */
function createTransporter() {
  const user = process.env.GMAIL_USER || "fahadislam.fir@gmail.com";
  const pass = process.env.GMAIL_APP_PASSWORD || "czvojassurzubgyt";

  if (!user || !pass) {
    console.warn("[Gmail SMTP Warning]: GMAIL_USER or GMAIL_APP_PASSWORD is not set.");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Sends personalized digital book PDF to customer's Gmail
 */
export async function sendPersonalizedBookEmail(details: EmailOrderDetails): Promise<EmailDeliveryResult> {
  const {
    orderNumber,
    customerName,
    customerEmail,
    customerPhone,
    trxId,
    amount,
    downloadToken,
    watermarkedPdfBuffer,
  } = details;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const secureDownloadUrl = `${baseUrl}/api/download/${downloadToken}`;

  const fromAddress = `"The 48 Laws of Power (বাংলা)" <${process.env.GMAIL_USER || "fahadislam.fir@gmail.com"}>`;

  const htmlContent = `
<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>আপনার কপি প্রস্তুত - The 48 Laws of Power</title>
</head>
<body style="margin: 0; padding: 0; background-color: #08080A; color: #F0EBE0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #08080A; padding: 30px 15px;">
    <tr>
      <td align="center">
        <!-- Container Card -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #121216; border: 1px solid #26262A; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.6);">
          
          <!-- Gold Accent Bar -->
          <tr>
            <td height="4" style="background: linear-gradient(90deg, #C8A45C, #E6CA85, #C8A45C);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 35px 35px 20px 35px; text-align: center;">
              <span style="font-size: 11px; font-weight: 700; color: #C8A45C; letter-spacing: 2px; text-transform: uppercase; display: inline-block; margin-bottom: 8px;">
                অফিসিয়াল ডিজিটাল সংস্করণ • লাইফটাইম অ্যাক্সেস
              </span>
              <h1 style="margin: 0 0 10px 0; font-size: 24px; font-weight: 800; color: #F0EBE0; line-height: 1.3;">
                অভিনন্দন! আপনার বইটি প্রস্তুত 🎉
              </h1>
              <p style="margin: 0; font-size: 14px; color: #B8B0A4; line-height: 1.6;">
                প্রিয় <strong>${customerName || "গ্রাহক"}</strong>, &ldquo;The 48 Laws of Power&rdquo; (বাংলা অনুবাদ) সংগ্রহের জন্য ধন্যবাদ। আপনার ফোন নম্বর (<span style="color: #C8A45C; font-weight: bold;">${customerPhone}</span>) দিয়ে পার্সোনালাইজড কপি তৈরি করা হয়েছে।
              </p>
            </td>
          </tr>

          <!-- Download Action Box -->
          <tr>
            <td style="padding: 10px 35px 25px 35px; text-align: center;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #18181F; border: 1px solid #C8A45C; border-radius: 18px; padding: 25px 20px;">
                <tr>
                  <td align="center">
                    <p style="margin: 0 0 16px 0; font-size: 13px; color: #D1C9BC;">
                      নিচের বাটনে ক্লিক করে সরাসরি যেকোনো ডিভাইসে সম্পূর্ণ PDF ডাউনলোড করুন:
                    </p>
                    <a href="${secureDownloadUrl}" target="_blank" style="display: inline-block; background-color: #C8A45C; color: #08080A; text-decoration: none; font-size: 15px; font-weight: 800; padding: 14px 32px; border-radius: 12px; box-shadow: 0 4px 20px rgba(200,164,92,0.3);">
                      📥 সম্পূর্ণ PDF ডাউনলোড করুন (৳${amount})
                    </a>
                    <p style="margin: 14px 0 0 0; font-size: 11px; color: #8A8278;">
                      (এই ইমেইলের সাথেও সরাসরি PDF ফাইলটি সংযুক্ত করা আছে)
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Order Summary Details -->
          <tr>
            <td style="padding: 0 35px 25px 35px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0A0A0D; border: 1px solid #222226; border-radius: 16px; padding: 18px 20px; font-size: 13px;">
                <tr>
                  <td style="color: #8A8278; padding: 6px 0; border-bottom: 1px solid #1C1C20;">অর্ডার নম্বর</td>
                  <td align="right" style="color: #C8A45C; font-weight: bold; font-family: monospace; padding: 6px 0; border-bottom: 1px solid #1C1C20;">${orderNumber}</td>
                </tr>
                <tr>
                  <td style="color: #8A8278; padding: 6px 0; border-bottom: 1px solid #1C1C20;">Transaction ID</td>
                  <td align="right" style="color: #F0EBE0; font-family: monospace; padding: 6px 0; border-bottom: 1px solid #1C1C20;">${trxId}</td>
                </tr>
                <tr>
                  <td style="color: #8A8278; padding: 6px 0; border-bottom: 1px solid #1C1C20;">পেমেন্ট ফোন</td>
                  <td align="right" style="color: #F0EBE0; font-weight: 600; padding: 6px 0; border-bottom: 1px solid #1C1C20;">${customerPhone}</td>
                </tr>
                <tr>
                  <td style="color: #8A8278; padding: 6px 0;">পরিশোধিত মূল্য</td>
                  <td align="right" style="color: #34C759; font-weight: bold; padding: 6px 0;">৳${amount} BDT (পরিশোধিত)</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Security Note -->
          <tr>
            <td style="padding: 0 35px 30px 35px; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #7A7268; line-height: 1.6;">
                🔒 এই কপিটি কেবল আপনার ব্যক্তিগত ব্যবহারের জন্য লাইসেন্সকৃত। প্রতিটি পৃষ্ঠায় আপনার ফোন নম্বরের ডিজিটাল ওয়াটারমার্ক রয়েছে। বইটি কারো সাথে শেয়ার বা প্রকাশ করা আইনত দণ্ডনীয়।
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 35px; background-color: #09090C; border-top: 1px solid #1E1E22; text-align: center; font-size: 12px; color: #8A8278;">
              <p style="margin: 0 0 6px 0;">
                যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন: <a href="mailto:${process.env.GMAIL_USER || "fahadislam.fir@gmail.com"}" style="color: #C8A45C; text-decoration: none;">${process.env.GMAIL_USER || "fahadislam.fir@gmail.com"}</a>
              </p>
              <p style="margin: 0; font-size: 11px; color: #5A544C;">
                © ${new Date().getFullYear()} ${siteConfig.bookTitle}. সর্বস্বত্ব সংরক্ষিত।
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  try {
    const transporter = createTransporter();

    const attachments: any[] = [];

    // Attach PDF directly if buffer provided (standard email attachment)
    if (watermarkedPdfBuffer && watermarkedPdfBuffer.length > 0) {
      attachments.push({
        filename: "The-48-Laws-of-Power-Bangla.pdf",
        content: watermarkedPdfBuffer,
        contentType: "application/pdf",
      });
    }

    const mailOptions = {
      from: fromAddress,
      to: customerEmail,
      subject: `আপনার কপি প্রস্তুত ⚡ The 48 Laws of Power (বাংলা অনুবাদ PDF) - #${orderNumber}`,
      html: htmlContent,
      attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("[Email Delivery Success]:", { to: customerEmail, messageId: info.messageId });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error: any) {
    console.error("[Email Delivery Error]:", error);
    return {
      success: false,
      error: error.message || "Failed to send email via Gmail SMTP",
    };
  }
}
