import { NextRequest, NextResponse } from "next/server";
import { getCollection, Product, Order } from "@/lib/mongodb";
import { createBKashPayment } from "@/lib/bkash";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, couponCode } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Valid Gmail address is required" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const productsCol = await getCollection<Product>("products");
    const product = await productsCol.findOne({ isActive: true });

    let amount = product ? Number(product.price) : 999;
    const productTitle = product ? product.title : "The 48 Laws of Power (বাংলা অনুবাদ)";

    // Apply coupon if provided
    if (couponCode) {
      const couponsCol = await getCollection("coupons");
      const coupon = await couponsCol.findOne({
        code: couponCode.trim().toUpperCase(),
        isActive: true,
      });

      if (coupon) {
        if (coupon.discountType === "percentage") {
          amount = Math.max(1, Math.round(amount * (1 - coupon.discountValue / 100)));
        } else {
          amount = Math.max(1, amount - coupon.discountValue);
        }
      }
    }

    const timestamp = Date.now();
    const invoiceNumber = `PDF-${timestamp}`;
    const orderNumber = `#PDF-${Math.floor(100000 + Math.random() * 900000)}`;

    const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "";
    const proto = req.headers.get("x-forwarded-proto") || "https";
    const origin =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (host ? `${proto}://${host}` : "http://localhost:3000");

    const callbackURL = `${origin.replace(/\/$/, "")}/api/bkash/callback`;

    const paymentResponse = await createBKashPayment({
      amount,
      invoiceNumber,
      payerReference: cleanEmail,
      callbackURL,
    });

    const downloadToken = crypto.randomBytes(24).toString("hex");

    // Save pending order to MongoDB
    const ordersCol = await getCollection<Order>("orders");
    await ordersCol.insertOne({
      orderNumber,
      productTitle,
      amount,
      paymentMethod: "bkash_gateway",
      paymentStatus: "pending",
      orderStatus: "pending_activation",
      targetEmail: cleanEmail,
      customerName: cleanEmail.split("@")[0],
      downloadToken,
      downloadCount: 0,
      notes: `bKash PaymentID: ${paymentResponse.paymentID || ""}, Invoice: ${invoiceNumber}`,
      metadata: {
        paymentID: paymentResponse.paymentID,
        invoiceNumber,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      bkashURL: paymentResponse.bkashURL,
      paymentID: paymentResponse.paymentID,
      invoiceNumber,
      orderNumber,
      amount,
    });
  } catch (error: any) {
    console.error("[bKash Create Payment Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to initialize bKash payment" },
      { status: 500 }
    );
  }
}
