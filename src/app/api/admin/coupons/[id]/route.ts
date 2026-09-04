import { NextRequest, NextResponse } from "next/server";
import { getCollection, Coupon, PromotionalBanner } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { isActive, discountValue, discountType, maxUses, expiresAt } = body;

    const couponsCol = await getCollection<Coupon>("coupons");
    const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { code: id };

    const existingCoupon = await couponsCol.findOne(query);
    if (!existingCoupon) {
      return NextResponse.json({ success: false, message: "Coupon not found" }, { status: 404 });
    }

    const updates: Partial<Coupon> = {};
    if (isActive !== undefined) updates.isActive = Boolean(isActive);
    if (discountValue !== undefined) updates.discountValue = Number(discountValue);
    if (discountType !== undefined) updates.discountType = discountType;
    if (maxUses !== undefined) updates.maxUses = Number(maxUses);
    if (expiresAt !== undefined) updates.expiresAt = expiresAt ? new Date(expiresAt) : undefined;

    await couponsCol.updateOne(query, { $set: updates });

    // Sync Promo Banner if this coupon is used as promo banner coupon
    if (isActive === false && existingCoupon.code) {
      const promoCol = await getCollection<PromotionalBanner>("promo_banners");
      await promoCol.updateMany(
        { couponCode: existingCoupon.code },
        { $set: { isEnabled: false } }
      );
    }

    return NextResponse.json({ success: true, message: "Coupon updated successfully" });
  } catch (error: any) {
    console.error("[Admin Update Coupon Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update coupon" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const couponsCol = await getCollection<Coupon>("coupons");
    const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { code: id };

    const existingCoupon = await couponsCol.findOne(query);
    if (!existingCoupon) {
      return NextResponse.json({ success: false, message: "Coupon not found" }, { status: 404 });
    }

    await couponsCol.deleteOne(query);

    // Sync Promo Banner: disable if deleted
    if (existingCoupon.code) {
      const promoCol = await getCollection<PromotionalBanner>("promo_banners");
      await promoCol.updateMany(
        { couponCode: existingCoupon.code },
        { $set: { isEnabled: false } }
      );
    }

    return NextResponse.json({ success: true, message: "Coupon deleted successfully" });
  } catch (error: any) {
    console.error("[Admin Delete Coupon Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete coupon" },
      { status: 500 }
    );
  }
}
