import { NextRequest, NextResponse } from "next/server";
import { getCollection, PromotionalBanner, Coupon, AdminLog } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";
import { sanitizeString } from "@/lib/validation";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const promoCol = await getCollection<PromotionalBanner>("promo_banners");
    let banner = await promoCol.findOne({});

    if (!banner) {
      banner = {
        isEnabled: true,
        badgeText: "🔥 স্পেশাল মাস্টার বান্ডেল অফার",
        title: "দুটি পাওয়ার মাস্টারক্লাস বই একসাথে মাত্র ৳১৯৯",
        subtitle: "The 48 Laws of Power + The Art of Seduction",
        description: "আলাদা কিনলে ৳১৪৯ + ৳১৪৯ = ৳২৯৮। আজকের স্পেশাল কম্বো বান্ডেলে ১,১৫৯+ পৃষ্ঠার দুটি সম্পূর্ণ বই পাচ্ছেন মাত্র ৳১৯৯-এ (৳৯৯ নিশ্চিত ছাড়)!",
        couponCode: "",
        discountAmount: 99,
        discountType: "fixed",
        ctaText: "২-বুক মাস্টার বান্ডেল কিনুন (৳১৯৯)",
        offerTag: "৳৯৯ OFF",
        imageUrl: "/images/promo-power-strategy.webp",
        displayDelaySeconds: 3,
        cooldownHours: 24,
        updatedAt: new Date(),
      } as any;
    }

    return NextResponse.json({
      success: true,
      banner,
    });
  } catch (error: any) {
    console.error("[Admin Promo Banner GET Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch banner settings" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      isEnabled,
      badgeText,
      title,
      subtitle,
      description,
      couponCode,
      discountAmount,
      discountType,
      ctaText,
      offerTag,
      imageUrl,
      displayDelaySeconds,
      cooldownHours,
    } = body;

    const cleanCouponCode = sanitizeString(couponCode, 25).toUpperCase().replace(/\s+/g, "");

    const cleanDiscountAmount = Math.max(0, Math.min(10000, Number(discountAmount) || 0));
    const cleanDiscountType = discountType === "percentage" ? "percentage" : "fixed";

    const updateDoc: Partial<PromotionalBanner> = {
      isEnabled: Boolean(isEnabled),
      badgeText: sanitizeString(badgeText, 50) || "🔥 স্পেশাল মাস্টার বান্ডেল অফার",
      title: sanitizeString(title, 100) || "দুটি পাওয়ার মাস্টারক্লাস বই একসাথে মাত্র ৳১৯৯",
      subtitle: sanitizeString(subtitle, 100) || "The 48 Laws of Power + The Art of Seduction",
      description: sanitizeString(description, 300) || "আলাদা কিনলে ৳১৪৯ + ৳১৪৯ = ৳২৯৮। আজকের স্পেশাল কম্বো বান্ডেলে ১,১৫৯+ পৃষ্ঠার দুটি সম্পূর্ণ বই পাচ্ছেন মাত্র ৳১৯৯-এ (৳১০০ নিশ্চিত ছাড়)!",
      couponCode: cleanCouponCode,
      discountAmount: cleanDiscountAmount,
      discountType: cleanDiscountType,
      ctaText: sanitizeString(ctaText, 50) || "২-বুক মাস্টার বান্ডেল কিনুন (৳১৯৯)",
      offerTag: sanitizeString(offerTag, 30) || (cleanDiscountType === "fixed" ? `৳${cleanDiscountAmount || 100} OFF` : `${cleanDiscountAmount}% OFF`),
      imageUrl: sanitizeString(imageUrl, 300) || "/images/promo-power-strategy.webp",
      displayDelaySeconds: Math.max(0, Math.min(60, Number(displayDelaySeconds) ?? 5)),
      cooldownHours: Math.max(1, Math.min(720, Number(cooldownHours) ?? 24)),
      updatedAt: new Date(),
    };

    const promoCol = await getCollection<PromotionalBanner>("promo_banners");
    await promoCol.updateOne({}, { $set: updateDoc }, { upsert: true });

    // Optional Coupon Sync: If coupon code is provided, sync the coupon
    if (cleanCouponCode) {
      const couponsCol = await getCollection<Coupon>("coupons");
      await couponsCol.updateOne(
        { code: cleanCouponCode },
        {
          $set: {
            code: cleanCouponCode,
            discountType: cleanDiscountType,
            discountValue: cleanDiscountAmount,
            isActive: Boolean(isEnabled),
          },
          $setOnInsert: {
            usedCount: 0,
            createdAt: new Date(),
          },
        },
        { upsert: true }
      );
    }

    // Audit Log
    const logsCol = await getCollection<AdminLog>("admin_logs");
    await logsCol.insertOne({
      adminId: session.adminId || "admin",
      adminName: session.username || "Admin",
      action: "UPDATE_PROMO_BANNER",
      entity: "promo_banners",
      details: `Banner ${isEnabled ? "Enabled" : "Disabled"}: Code=${cleanCouponCode}, Discount=${cleanDiscountAmount} (${cleanDiscountType})`,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Promotional banner and coupon settings updated successfully.",
      banner: updateDoc,
    });
  } catch (error: any) {
    console.error("[Admin Promo Banner PUT Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update promotional banner" },
      { status: 500 }
    );
  }
}
