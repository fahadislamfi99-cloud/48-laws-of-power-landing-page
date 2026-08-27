import { NextResponse } from "next/server";
import { getCollection, PromotionalBanner } from "@/lib/mongodb";
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

    return NextResponse.json({
      success: true,
      banner: {
        isEnabled: banner.isEnabled,
        badgeText: banner.badgeText || "বিশেষ অফার 🎁",
        title: banner.title || "আজই পাচ্ছেন ৳৫০ ছাড়",
        subtitle: banner.subtitle || "The 48 Laws of Power (বাংলা অনুবাদ)",
        description: banner.description || "৩,০০০ বছরের মানব মনস্তত্ত্ব ও ক্ষমতার রণকৌশল শিখুন বিশেষ ডিসকাউন্টে। সীমিত সময়ের জন্য প্রযোজ্য।",
        couponCode: banner.couponCode || "POWER50",
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
