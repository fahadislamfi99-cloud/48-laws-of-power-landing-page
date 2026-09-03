import { NextRequest, NextResponse } from "next/server";
import { getCollection, Order } from "@/lib/mongodb";
import { getOrGenerateWatermarkedPdf, BookType } from "@/lib/watermarkPdf";
import { validateDownloadToken } from "@/lib/validation";
import { checkRateLimit, RATE_LIMIT_CONFIGS, getClientIp } from "@/lib/rateLimit";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    // 1. Strict Token Format Validation
    const tokenValidation = validateDownloadToken(token);
    if (!tokenValidation.isValid) {
      return new NextResponse("Invalid or corrupted download token.", { status: 400 });
    }
    const cleanToken = tokenValidation.token;

    // 2. Rate Limiting Check (20 requests per 5 minutes per token/IP)
    const clientIp = getClientIp(req);
    const rateLimitKey = `${cleanToken}_${clientIp}`;
    const rateLimit = checkRateLimit("pdf_download", rateLimitKey, RATE_LIMIT_CONFIGS.DOWNLOAD);

    if (!rateLimit.allowed) {
      return new NextResponse(
        `Download limit exceeded. Please wait ${rateLimit.resetSeconds} seconds before requesting your PDF again.`,
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.resetSeconds),
          },
        }
      );
    }

    // 3. Database Order Authorization Check
    const ordersCol = await getCollection<Order>("orders");
    const order = await ordersCol.findOne({ downloadToken: cleanToken });

    if (!order) {
      return new NextResponse("Order record not found or download link expired.", { status: 404 });
    }

    // Security Guard: Payment must be fully verified and paid
    if (order.paymentStatus !== "paid") {
      return new NextResponse("Access denied: Payment verification is pending or incomplete.", { status: 403 });
    }

    // Determine authorized Book Type
    const requestedBook = req.nextUrl.searchParams.get("book");
    const isBundle = order.packageType === "bundle" || order.productTitle?.includes("বান্ডেল") || order.amount >= 180;
    const isSeductionOnly = order.packageType === "art_of_seduction" || order.productTitle?.includes("Seduction");

    let targetBookType: BookType = "48_laws";

    if (isBundle) {
      targetBookType = requestedBook === "art_of_seduction" ? "art_of_seduction" : "48_laws";
    } else if (isSeductionOnly) {
      targetBookType = "art_of_seduction";
    } else {
      targetBookType = "48_laws";
    }

    const customerPhone = order.customerPhone || order.payerPhone || "01700000000";

    // 4. Retrieve or dynamically generate the personalized watermarked PDF
    const watermarkResult = await getOrGenerateWatermarkedPdf({
      orderNumber: order.orderNumber,
      customerPhone,
      customerEmail: order.targetEmail,
      bookType: targetBookType,
    });

    // 5. Update Download Audit Stats in Database
    await ordersCol.updateOne(
      { _id: order._id },
      {
        $inc: { downloadCount: 1 },
        $set: {
          lastDownloadAt: new Date(),
          pdfStatus: "generated",
          pdfGeneratedAt: order.pdfGeneratedAt || new Date(),
        },
      }
    );

    return new NextResponse(new Uint8Array(watermarkResult.fileBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${watermarkResult.safeFilename}"`,
        "Content-Length": String(watermarkResult.fileSize),
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error: any) {
    console.error("[Secure Watermarked Download Error]:", error);
    return new NextResponse("An error occurred while preparing your personalized book. Please try again or contact support.", { status: 500 });
  }
}
