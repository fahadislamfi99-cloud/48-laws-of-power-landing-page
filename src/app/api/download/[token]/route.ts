import { NextRequest, NextResponse } from "next/server";
import { getCollection, Order } from "@/lib/mongodb";
import { getOrGenerateWatermarkedPdf } from "@/lib/watermarkPdf";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token || token.length < 8) {
      return new NextResponse("Invalid or missing download token", { status: 400 });
    }

    const ordersCol = await getCollection<Order>("orders");
    const order = await ordersCol.findOne({ downloadToken: token });

    if (!order) {
      return new NextResponse("Order record not found or invalid token", { status: 404 });
    }

    // Security Check: Only verified paid orders can download
    if (order.paymentStatus !== "paid") {
      return new NextResponse("Access denied: Payment verification is pending or failed.", { status: 403 });
    }

    const customerPhone = order.customerPhone || order.payerPhone || "01700000000";

    // Retrieve or dynamically generate the personalized watermarked PDF
    const watermarkResult = await getOrGenerateWatermarkedPdf({
      orderNumber: order.orderNumber,
      customerPhone,
      customerEmail: order.targetEmail,
    });

    // Update download statistics and state in DB
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

    const safeOrderNum = order.orderNumber.replace(/[^a-zA-Z0-9_-]/g, "");
    const safeFilename = `The-48-Laws-of-Power-Bangla-${safeOrderNum}.pdf`;

    return new NextResponse(new Uint8Array(watermarkResult.fileBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeFilename}"`,
        "Content-Length": String(watermarkResult.fileSize),
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error: any) {
    console.error("[Secure Watermarked Download Error]:", error);
    return new NextResponse(`Server error delivering personalized book: ${error.message}`, { status: 500 });
  }
}
