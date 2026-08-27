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
        badgeText: "বিশেষ অফার 🎁",
        title: "আজই পাচ্ছেন ৳৫০ ছাড়",
        subtitle: "The 48 Laws of Power (বাংলা অনুবাদ)",
        description: "৩,০০০ বছরের মানব মনস্তত্ত্ব ও ক্ষমতার রণকৌশল শিখুন বিশেষ ডিসকাউন্টে। সীমিত সময়ের জন্য অফারটি সক্রিয় রয়েছে।",
        couponCode: "POWER50",
        discountAmount: 50,
        discountType: "fixed",
        ctaText: "অফারটি ব্যবহার করুন",
        offerTag: "৳৫০ OFF",
        imageUrl: "/images/promo-power-strategy.jpg",
        displayDelaySeconds: 4,
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
    if (!cleanCouponCode) {
      return NextResponse.json(
        { success: false, message: "Valid coupon code is required." },
        { status: 400 }
      );
    }

    const cleanDiscountAmount = Math.max(1, Math.min(10000, Number(discountAmount) || 50));
    const cleanDiscountType = discountType === "percentage" ? "percentage" : "fixed";

    const updateDoc: Partial<PromotionalBanner> = {
      isEnabled: Boolean(isEnabled),
      badgeText: sanitizeString(badgeText, 50) || "বিশেষ অফার 🎁",
      title: sanitizeString(title, 100) || "আজই পাচ্ছেন ৳৫০ ছাড়",
      subtitle: sanitizeString(subtitle, 100) || "The 48 Laws of Power (বাংলা অনুবাদ)",
      description: sanitizeString(description, 300) || "৩,০০০ বছরের মানব মনস্তত্ত্ব ও ক্ষমতার রণকৌশল শিখুন বিশেষ ডিসকাউন্টে।",
      couponCode: cleanCouponCode,
      discountAmount: cleanDiscountAmount,
      discountType: cleanDiscountType,
      ctaText: sanitizeString(ctaText, 50) || "অফারটি ব্যবহার করুন",
      offerTag: sanitizeString(offerTag, 30) || (cleanDiscountType === "fixed" ? `৳${cleanDiscountAmount} OFF` : `${cleanDiscountAmount}% OFF`),
      imageUrl: sanitizeString(imageUrl, 300) || "/images/promo-power-strategy.jpg",
      displayDelaySeconds: Math.max(0, Math.min(60, Number(displayDelaySeconds) ?? 4)),
      cooldownHours: Math.max(1, Math.min(720, Number(cooldownHours) ?? 24)),
      updatedAt: new Date(),
    };

    const promoCol = await getCollection<PromotionalBanner>("promo_banners");
    await promoCol.updateOne({}, { $set: updateDoc }, { upsert: true });

    // Automatic Coupon Sync: Ensure the coupon exists and is updated in the coupons collection
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
