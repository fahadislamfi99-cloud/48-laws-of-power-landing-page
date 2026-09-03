import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

export type BookType = "48_laws" | "art_of_seduction";

export interface WatermarkOptions {
  orderNumber: string;
  customerPhone: string;
  customerEmail?: string;
  bookType?: BookType;
  forceRegenerate?: boolean;
}

export interface WatermarkResult {
  success: boolean;
  filePath: string;
  fileBuffer: Buffer;
  pageCount: number;
  fileSize: number;
  fromCache: boolean;
  safeFilename: string;
  error?: string;
}

const GENERATED_DIR = process.env.VERCEL || process.env.NODE_ENV === "production"
  ? path.join("/tmp", "generated_pdfs")
  : path.join(process.cwd(), "storage", "generated_pdfs");

// Helper to ensure generated directory exists
function ensureGeneratedDir() {
  try {
    if (!fs.existsSync(GENERATED_DIR)) {
      fs.mkdirSync(GENERATED_DIR, { recursive: true });
    }
  } catch (err) {
    console.warn("[Watermark Dir Creation Warning]:", err);
  }
}

/**
 * Clean phone number for filenames
 */
export function sanitizePhone(phone: string): string {
  return phone.replace(/[^0-9+]/g, "").trim() || "01700000000";
}

/**
 * Generate or retrieve a personalized watermarked PDF for a verified order
 */
export async function getOrGenerateWatermarkedPdf(options: WatermarkOptions): Promise<WatermarkResult> {
  const { orderNumber, customerPhone, customerEmail, bookType = "48_laws", forceRegenerate = false } = options;

  ensureGeneratedDir();

  const cleanPhone = sanitizePhone(customerPhone);
  const cleanOrderNum = orderNumber.replace(/[^a-zA-Z0-9_-]/g, "");
  const cachedFileName = `order_${cleanOrderNum}_${cleanPhone}_${bookType}.pdf`;
  const cachedFilePath = path.join(GENERATED_DIR, cachedFileName);

  const safeFilename = bookType === "art_of_seduction"
    ? `The-Art-of-Seduction-Bangla-${cleanOrderNum}.pdf`
    : `The-48-Laws-of-Power-Bangla-${cleanOrderNum}.pdf`;

  // 1. Return cached copy if available and not forced to regenerate
  if (!forceRegenerate && fs.existsSync(cachedFilePath)) {
    try {
      const existingBuffer = fs.readFileSync(cachedFilePath);
      if (existingBuffer.length > 50000) {
        return {
          success: true,
          filePath: cachedFilePath,
          fileBuffer: existingBuffer,
          pageCount: bookType === "art_of_seduction" ? 480 : 509,
          fileSize: existingBuffer.length,
          fromCache: true,
          safeFilename,
        };
      }
    } catch (err) {
      console.warn("[Watermark Cache Read Warning]:", err);
    }
  }

  // 2. Validate Master PDF existence
  const masterFilename = bookType === "art_of_seduction"
    ? "bangla_art_of_seduction_v2.pdf"
    : "the_48_laws_of_power_bangla.pdf";
  const masterPath = path.join(process.cwd(), "storage", "master_pdf", masterFilename);

  if (!fs.existsSync(masterPath)) {
    console.error("[Master PDF Not Found]:", masterPath);
    throw new Error(`Master PDF file for ${bookType} is missing from storage.`);
  }

  try {
    const masterPdfBytes = fs.readFileSync(masterPath);
    const pdfDoc = await PDFDocument.load(masterPdfBytes, {
      ignoreEncryption: true,
    });

    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const pageCount = pages.length;

    const displayPhone = customerPhone.trim();
    const bookTitleLabel = bookType === "art_of_seduction" ? "The Art of Seduction" : "The 48 Laws of Power";
    const watermarkText = `Licensed to: ${displayPhone} | Order #${orderNumber} | ${bookTitleLabel}`;

    // 3. Apply personalized subtle watermark on every single page
    for (let i = 0; i < pageCount; i++) {
      const page = pages[i];
      const { width, height } = page.getSize();

      // Top Header Subtle License Banner (Non-intrusive)
      page.drawText(watermarkText, {
        x: 36,
        y: height - 18,
        size: 7.5,
        font: fontBold,
        color: rgb(0.45, 0.38, 0.22), // subtle gold-tinted charcoal
        opacity: 0.45,
      });

      // Bottom Footer Subtle License Banner
      page.drawText(`Licensed copy exclusively for: ${displayPhone} (${customerEmail || "Verified Buyer"})`, {
        x: 36,
        y: 12,
        size: 7,
        font: fontRegular,
        color: rgb(0.45, 0.38, 0.22),
        opacity: 0.45,
      });

      // Center Diagonal Semi-Transparent Security Watermark
      const centerFontSize = Math.min(width * 0.055, 30);
      const textWidth = fontBold.widthOfTextAtSize(displayPhone, centerFontSize);
      
      page.drawText(displayPhone, {
        x: (width - textWidth) / 2 - 20,
        y: height / 2 - 30,
        size: centerFontSize,
        font: fontBold,
        color: rgb(0.4, 0.4, 0.45),
        opacity: 0.065, // very subtle so it does not distract from reading
        rotate: degrees(35),
      });
    }

    // 4. Save and write to cache
    const modifiedBytes = await pdfDoc.save();
    const outputBuffer = Buffer.from(modifiedBytes);

    fs.writeFileSync(cachedFilePath, outputBuffer);

    return {
      success: true,
      filePath: cachedFilePath,
      fileBuffer: outputBuffer,
      pageCount,
      fileSize: outputBuffer.length,
      fromCache: false,
      safeFilename,
    };
  } catch (error: any) {
    console.error("[PDF Watermarking Error]:", error);
    throw new Error(`Failed to apply personalized watermark: ${error.message}`);
  }
}
