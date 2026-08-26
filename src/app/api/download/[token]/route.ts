import { NextRequest, NextResponse } from "next/server";
import { getCollection, Order, Product } from "@/lib/mongodb";
import path from "path";
import fs from "fs";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token || token.length < 10) {
      return new NextResponse("Invalid download token", { status: 400 });
    }

    const ordersCol = await getCollection<Order>("orders");
    const order = await ordersCol.findOne({ downloadToken: token });

    if (!order) {
      return new NextResponse("Order not found or invalid token", { status: 404 });
    }

    if (order.paymentStatus !== "paid") {
      return new NextResponse("Access denied: Payment is pending verification", { status: 403 });
    }

    // Update download statistics
    await ordersCol.updateOne(
      { _id: order._id },
      {
        $inc: { downloadCount: 1 },
        $set: { lastDownloadAt: new Date() },
      }
    );

    // Get product file metadata
    const productsCol = await getCollection<Product>("products");
    const product = await productsCol.findOne({ isActive: true });

    // Check if custom cloud fileUrl is configured
    if (product?.fileUrl && product.fileUrl.startsWith("http")) {
      return NextResponse.redirect(product.fileUrl);
    }

    // Otherwise check for local file in public/downloads
    const localFilePath = path.join(process.cwd(), "public", "downloads", "the-48-laws-of-power-bangla.pdf");
    
    if (fs.existsSync(localFilePath)) {
      const fileBuffer = fs.readFileSync(localFilePath);
      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="The-48-Laws-of-Power-Bangla-Edition.pdf"',
          "Content-Length": String(fileBuffer.length),
        },
      });
    }

    // Fallback: Return a sample digital PDF book buffer if sample file not yet uploaded
    const samplePdfHeader = `%PDF-1.4\n1 0 obj\n<< /Title (The 48 Laws of Power Bangla Edition) /Author (Robert Greene) >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF`;
    return new NextResponse(samplePdfHeader, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="The-48-Laws-of-Power-Bangla.pdf"',
      },
    });
  } catch (error: any) {
    console.error("[Secure Download Error]:", error);
    return new NextResponse("Server error processing download", { status: 500 });
  }
}
