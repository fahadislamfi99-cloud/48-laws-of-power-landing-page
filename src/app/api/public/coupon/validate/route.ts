import { NextRequest, NextResponse } from "next/server";
import { getCollection, Coupon } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { code, amount } = await req.json();

    if (!code) {
      return NextResponse.json({ success: false, message: "Coupon code is required" }, { status: 400 });
    }

    const cleanCode = code.trim().toUpperCase();
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

    const currentAmount = Number(amount) || 999;
    let discount = 0;
    if (coupon.discountType === "percentage") {
      discount = Math.round((currentAmount * coupon.discountValue) / 100);
    } else {
      discount = coupon.discountValue;
    }

    const finalAmount = Math.max(1, currentAmount - discount);

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
