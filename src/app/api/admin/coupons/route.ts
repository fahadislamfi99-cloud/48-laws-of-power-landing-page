import { NextRequest, NextResponse } from "next/server";
import { getCollection, Coupon } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const couponsCol = await getCollection<Coupon>("coupons");
    const coupons = await couponsCol.find().sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ success: true, coupons });
  } catch (error: any) {
    console.error("[Admin Get Coupons Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch coupons" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { code, discountType = "fixed", discountValue, minOrderAmount = 0, maxUses, expiresAt } = body;

    if (!code || !discountValue) {
      return NextResponse.json(
        { success: false, message: "Coupon code and discount value are required" },
        { status: 400 }
      );
    }

    const cleanCode = code.trim().toUpperCase();
    const couponsCol = await getCollection<Coupon>("coupons");

    const existing = await couponsCol.findOne({ code: cleanCode });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "A coupon with this code already exists" },
        { status: 400 }
      );
    }

    const newCoupon: Coupon = {
      code: cleanCode,
      discountType,
      discountValue: Number(discountValue),
      minOrderAmount: Number(minOrderAmount) || 0,
      maxUses: maxUses ? Number(maxUses) : undefined,
      usedCount: 0,
      expiresAt: expiresAt ? new Date(expiresAt) : undefined,
      isActive: true,
      createdAt: new Date(),
    };

    await couponsCol.insertOne(newCoupon);

    return NextResponse.json({ success: true, message: "Coupon created successfully", coupon: newCoupon });
  } catch (error: any) {
    console.error("[Admin Create Coupon Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create coupon" },
      { status: 500 }
    );
  }
}
