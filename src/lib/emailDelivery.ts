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
  packageType?: "bundle" | "48_laws" | "art_of_seduction";
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
    packageType = "bundle",
    watermarkedPdfBuffer,
  } = details;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const downloadUrl48Laws = `${baseUrl}/api/download/${downloadToken}?book=48_laws`;
  const downloadUrlSeduction = `${baseUrl}/api/download/${downloadToken}?book=art_of_seduction`;

  const isBundle = packageType === "bundle" || amount >= 180;
  const isSeductionOnly = packageType === "art_of_seduction";

  const fromAddress = `"The 48 Laws of Power & Seduction" <${process.env.GMAIL_USER || "fahadislam.fir@gmail.com"}>`;

  const htmlContent = `
<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>আপনার বইয়ের কপি প্রস্তুত</title>
</head>
<body style="margin: 0; padding: 0; background-color: #08080A; color: #F0EBE0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #08080A; padding: 30px 15px;">
    <tr>
      <td align="center">
        <!-- Container Card -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #121216; border: 1px solid #26262A; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.6);">
          
          <!-- Gold Accent Bar -->
          <tr>
            <td height="4" style="background: linear-gradient(90deg, #C8A45C, #E11D48, #C8A45C);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 35px 35px 20px 35px; text-align: center;">
              <span style="font-size: 11px; font-weight: 700; color: #C8A45C; letter-spacing: 2px; text-transform: uppercase; display: inline-block; margin-bottom: 8px;">
                অফিসিয়াল ডিজিটাল সংস্করণ • লাইফটাইম অ্যাক্সেস
              </span>
              <h1 style="margin: 0 0 10px 0; font-size: 24px; font-weight: 800; color: #F0EBE0; line-height: 1.3;">
                অভিনন্দন! আপনার অর্ডার সফল হয়েছে 🎉
              </h1>
              <p style="margin: 0; font-size: 14px; color: #B8B0A4; line-height: 1.6;">
                প্রিয় <strong>${customerName || "গ্রাহক"}</strong>, আপনার ফোন নম্বর (<span style="color: #C8A45C; font-weight: bold;">${customerPhone}</span>) দিয়ে ডিজিটাল কপি তৈরি করা হয়েছে।
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

                    ${
                      isBundle
                        ? `
                    <div style="margin-bottom: 12px;">
                      <a href="${downloadUrl48Laws}" target="_blank" style="display: block; background-color: #C8A45C; color: #08080A; text-decoration: none; font-size: 14px; font-weight: 800; padding: 12px 24px; border-radius: 10px; margin-bottom: 10px;">
                        📘 The 48 Laws of Power (৫০৯ পৃষ্ঠা)
                      </a>
                      <a href="${downloadUrlSeduction}" target="_blank" style="display: block; background-color: #E11D48; color: #FFFFFF; text-decoration: none; font-size: 14px; font-weight: 800; padding: 12px 24px; border-radius: 10px;">
                        📕 The Art of Seduction (৬৫০ পৃষ্ঠা)
                      </a>
                    </div>
                    `
                        : isSeductionOnly
                        ? `
                    <a href="${downloadUrlSeduction}" target="_blank" style="display: inline-block; background-color: #E11D48; color: #FFFFFF; text-decoration: none; font-size: 15px; font-weight: 800; padding: 14px 32px; border-radius: 12px;">
                      📥 The Art of Seduction PDF ডাউনলোড (৳${amount})
                    </a>
                    `
                        : `
                    <a href="${downloadUrl48Laws}" target="_blank" style="display: inline-block; background-color: #C8A45C; color: #08080A; text-decoration: none; font-size: 15px; font-weight: 800; padding: 14px 32px; border-radius: 12px;">
                      📥 The 48 Laws of Power PDF ডাউনলোড (৳${amount})
                    </a>
                    `
                    }

                    <p style="margin: 14px 0 0 0; font-size: 11px; color: #8A8278;">
                      (এই লিংকটি আপনার লাইফটাইম অ্যাক্সেসের জন্য সংরক্ষিত থাকবে)
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
                  <td style="color: #8A8278; padding: 6px 0; border-bottom: 1px solid #1C1C20;">অর্ডার প্যাকেজ</td>
                  <td align="right" style="color: #C8A45C; font-weight: bold; padding: 6px 0; border-bottom: 1px solid #1C1C20;">
                    ${isBundle ? "২-বুক মাস্টার বান্ডেল (48 Laws + Art of Seduction)" : isSeductionOnly ? "The Art of Seduction" : "The 48 Laws of Power"}
                  </td>
                </tr>
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

    const mailOptions = {
      from: fromAddress,
      to: customerEmail,
      subject: `আপনার কপি প্রস্তুত ⚡ ${isBundle ? "২-বুক মাস্টার বান্ডেল" : "ডিজিটাল বই PDF"} - #${orderNumber}`,
      html: htmlContent,
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
