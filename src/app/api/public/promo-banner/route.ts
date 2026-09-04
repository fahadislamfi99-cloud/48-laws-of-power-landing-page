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

    // Double-check coupon validity in the coupons collection
    if (banner.couponCode) {
      const couponsCol = await getCollection<Coupon>("coupons");
      const coupon = await couponsCol.findOne({
        code: banner.couponCode.trim().toUpperCase(),
      });

      // If coupon doesn't exist, is inactive, or expired, banner must be considered disabled
      const isExpired = coupon?.expiresAt ? new Date(coupon.expiresAt).getTime() < Date.now() : false;
      const isMaxedOut = coupon?.maxUses ? (coupon.usedCount || 0) >= coupon.maxUses : false;

      if (!coupon || !coupon.isActive || isExpired || isMaxedOut) {
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
        badgeText: banner.badgeText || "বিশেষ অফার 🎁",
        title: banner.title || "আজই পাচ্ছেন ৳৫০ ছাড়",
        subtitle: banner.subtitle || "The 48 Laws of Power (বাংলা অনুবাদ)",
        description: banner.description || "৩,০০০ বছরের মানব মনস্তত্ত্ব ও ক্ষমতার রণকৌশল শিখুন বিশেষ ডিসকাউন্টে। সীমিত সময়ের জন্য প্রযোজ্য।",
        couponCode: banner.couponCode,
        discountAmount: banner.discountAmount || 50,
        discountType: banner.discountType || "fixed",
        ctaText: banner.ctaText || "অফারটি ব্যবহার করুন",
        offerTag: banner.offerTag || "৳৫০ OFF",
        imageUrl: banner.imageUrl || "/images/promo-power-strategy.jpg",
        displayDelaySeconds: banner.displayDelaySeconds ?? 4,
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
