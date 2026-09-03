import { NextRequest, NextResponse } from "next/server";
import { getCollection, Coupon, Product } from "@/lib/mongodb";
import { sanitizeString } from "@/lib/validation";
import { checkRateLimit, RATE_LIMIT_CONFIGS, getClientIp } from "@/lib/rateLimit";
import { siteConfig } from "@/data/siteConfig";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check (20 requests per minute per IP)
    const clientIp = getClientIp(req);
    const rateLimit = checkRateLimit("coupon_validate", clientIp, RATE_LIMIT_CONFIGS.COUPON_CHECK);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, message: "Too many coupon attempts. Please wait a moment." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { code, amount: clientAmount } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json({ success: false, message: "Coupon code is required" }, { status: 400 });
    }

    const cleanCode = sanitizeString(code, 25).toUpperCase();
    const couponsCol = await getCollection<Coupon>("coupons");
    const coupon = await couponsCol.findOne({ code: cleanCode, isActive: true });

    if (!coupon) {
      return NextResponse.json({ success: false, message: "অবৈধ বা মেয়াদোত্তীর্ণ কুপন কোড" }, { status: 404 });
    }

    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return NextResponse.json({ success: false, message: "এই কুপনের মেয়াদ শেষ হয়ে গেছে" }, { status: 400 });
    }

    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      return NextResponse.json({ success: false, message: "এই কুপনের ব্যবহারের সীমা শেষ" }, { status: 400 });
    }

    // Determine base price
    const productsCol = await getCollection<Product>("products");
    const product = await productsCol.findOne({ isActive: true });
    const baseAmount = clientAmount && typeof clientAmount === "number" && clientAmount > 0
      ? clientAmount
      : (product ? Math.max(1, Number(product.price)) : siteConfig.price);

    let discount = 0;
    if (coupon.discountType === "percentage") {
      discount = Math.round((baseAmount * Math.min(100, Math.max(1, coupon.discountValue))) / 100);
    } else {
      discount = Math.max(0, coupon.discountValue);
    }

    const finalAmount = Math.max(1, baseAmount - discount);

    return NextResponse.json({
      success: true,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      discountAmount: discount,
      finalAmount,
      message: `কুপন সফল! ৳${discount} ছাড় প্রযোজ্য হয়েছে।`,
    });
  } catch (error: any) {
    console.error("[Coupon Validate Error]:", error);
    return NextResponse.json({ success: false, message: "কুপন যাচাইকরণে ত্রুটি" }, { status: 500 });
  }
}
