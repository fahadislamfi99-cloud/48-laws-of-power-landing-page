import { NextRequest, NextResponse } from "next/server";
import { getCollection, Product, Order } from "@/lib/mongodb";
import { createBKashPayment } from "@/lib/bkash";
import { validateEmail, validatePhone, sanitizeString } from "@/lib/validation";
import { checkRateLimit, RATE_LIMIT_CONFIGS, getClientIp } from "@/lib/rateLimit";
import { siteConfig } from "@/data/siteConfig";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check (10 requests per minute per IP)
    const clientIp = getClientIp(req);
    const rateLimit = checkRateLimit("bkash_create", clientIp, RATE_LIMIT_CONFIGS.PAYMENT_INIT);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many payment requests. Please wait ${rateLimit.resetSeconds} seconds before trying again.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.resetSeconds),
          },
        }
      );
    }

    const body = await req.json();
    const { email, phone, couponCode, packageType } = body;

    // 2. Strict Input Validation
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      return NextResponse.json(
        { success: false, message: emailValidation.error || "Valid email is required" },
        { status: 400 }
      );
    }
    const cleanEmail = emailValidation.email;

    let cleanPhone = "";
    if (phone) {
      const phoneValidation = validatePhone(phone);
      if (phoneValidation.isValid) {
        cleanPhone = phoneValidation.phone;
      }
    }

    // 3. Enforce Server-Side Price based on Package Selection
    const selectedPkg = packageType === "48_laws" || packageType === "art_of_seduction" ? packageType : "bundle";
    let amount = selectedPkg === "bundle" ? 199 : 149;
    const productTitle = selectedPkg === "bundle"
      ? "The 48 Laws of Power + The Art of Seduction (২-বুক মাস্টার বান্ডেল)"
      : selectedPkg === "art_of_seduction"
      ? "The Art of Seduction (বাংলা সংস্করণ)"
      : "The 48 Laws of Power (বাংলা সংস্করণ)";

    // 4. Server-Side Coupon Validation
    if (couponCode && typeof couponCode === "string") {
      const cleanCoupon = sanitizeString(couponCode, 20).toUpperCase();
      const couponsCol = await getCollection("coupons");
      const coupon = await couponsCol.findOne({
        code: cleanCoupon,
        isActive: true,
      });

      if (coupon) {
        if (coupon.discountType === "percentage") {
          const discount = Math.min(100, Math.max(1, Number(coupon.discountValue)));
          amount = Math.max(1, Math.round(amount * (1 - discount / 100)));
        } else {
          const discount = Math.max(0, Number(coupon.discountValue));
          amount = Math.max(1, amount - discount);
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

    // 5. Initialize Payment with bKash Gateway Bridge
    const paymentResponse = await createBKashPayment({
      amount,
      invoiceNumber,
      payerReference: cleanEmail,
      callbackURL,
    });

    if (!paymentResponse.bkashURL || !paymentResponse.paymentID) {
      console.error("[bKash Create Init Error]:", paymentResponse);
      return NextResponse.json(
        {
          success: false,
          message: paymentResponse.statusMessage || "Failed to initialize bKash gateway session.",
        },
        { status: 502 }
      );
    }

    // 6. Cryptographically Secure Download Token (48-char hex)
    const downloadToken = crypto.randomBytes(24).toString("hex");

    // 7. Save Pending Order in MongoDB
    const ordersCol = await getCollection<Order>("orders");
    await ordersCol.insertOne({
      orderNumber,
      packageType: selectedPkg,
      productTitle,
      amount,
      paymentMethod: "bkash_gateway",
      paymentStatus: "pending",
      orderStatus: "pending_activation",
      targetEmail: cleanEmail,
      customerName: cleanEmail.split("@")[0],
      customerPhone: cleanPhone || undefined,
      downloadToken,
      downloadCount: 0,
      notes: `bKash PaymentID: ${paymentResponse.paymentID}, Invoice: ${invoiceNumber}`,
      metadata: {
        paymentID: paymentResponse.paymentID,
        invoiceNumber,
        clientIp,
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
      { success: false, message: "Internal server error initializing payment." },
      { status: 500 }
    );
  }
}
