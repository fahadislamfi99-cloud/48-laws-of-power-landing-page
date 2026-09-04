import { NextResponse } from "next/server";
import { getCollection, PromotionalBanner, Coupon } from "@/lib/mongodb";
import { ensureDatabaseSeeded } from "@/lib/seed";

export async function GET() {
  try {
    await ensureDatabaseSeeded();
    const promoCol = await getCollection<PromotionalBanner>("promo_banners");
    const banner = await promoCol.findOne({});

    if (!banner || !banner.isEnabled) {
      return NextResponse.json({
        success: true,
        banner: {
          isEnabled: false,
        },
      });
    }

    // Optional coupon check: only validate if a non-empty couponCode is explicitly configured
    if (banner.couponCode && banner.couponCode.trim()) {
      const couponsCol = await getCollection<Coupon>("coupons");
      const coupon = await couponsCol.findOne({
        code: banner.couponCode.trim().toUpperCase(),
      });

      const isExpired = coupon?.expiresAt ? new Date(coupon.expiresAt).getTime() < Date.now() : false;
      const isMaxedOut = coupon?.maxUses ? (coupon.usedCount || 0) >= coupon.maxUses : false;

      if (!coupon || !coupon.isActive || isExpired || isMaxedOut) {
        // If the coupon specifically attached to the banner is inactive, hide the promo banner
        return NextResponse.json({
          success: true,
          banner: {
            isEnabled: false,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      banner: {
        isEnabled: true,
        badgeText: banner.badgeText || "🔥 স্পেশাল মাস্টার বান্ডেল অফার",
        title: banner.title || "দুটি পাওয়ার মাস্টারক্লাস বই একসাথে মাত্র ৳১৯৯",
        subtitle: banner.subtitle || "The 48 Laws of Power + The Art of Seduction",
        description: banner.description || "আলাদা কিনলে ৳১৪৯ + ৳১৪৯ = ৳২৯৮। আজকের স্পেশাল কম্বো বান্ডেলে ১,১৫৯+ পৃষ্ঠার দুটি সম্পূর্ণ বই পাচ্ছেন মাত্র ৳১৯৯-এ (৳৯৯ নিশ্চিত ছাড়)!",
        couponCode: banner.couponCode || "",
        discountAmount: banner.discountAmount || 99,
        discountType: banner.discountType || "fixed",
        ctaText: banner.ctaText || "২-বুক মাস্টার বান্ডেল কিনুন (৳১৯৯)",
        offerTag: banner.offerTag || "৳৯৯ OFF",
        imageUrl: banner.imageUrl || "/images/promo-power-strategy.webp",
        displayDelaySeconds: banner.displayDelaySeconds ?? 3,
        cooldownHours: banner.cooldownHours ?? 24,
      },
    });
  } catch (error: any) {
    console.error("[Public Promo Banner API Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch promotional banner" },
      { status: 500 }
    );
  }
}
