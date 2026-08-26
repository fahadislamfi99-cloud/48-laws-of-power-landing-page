import { NextResponse } from "next/server";
import { getCollection, Product, SiteSettings } from "@/lib/mongodb";
import { ensureDatabaseSeeded } from "@/lib/seed";

export async function GET() {
  try {
    await ensureDatabaseSeeded();
    const productsCol = await getCollection<Product>("products");
    const settingsCol = await getCollection<SiteSettings>("site_settings");

    const [product, settings] = await Promise.all([
      productsCol.findOne({ isActive: true }),
      settingsCol.findOne({}),
    ]);

    return NextResponse.json({
      success: true,
      product: product || {
        title: "দ্য ৪৮ লজ অফ পাওয়ার (বাংলা অনুবাদ)",
        titleEn: "The 48 Laws of Power (Bengali Edition)",
        subtitle: "ক্ষমতা, প্রভাব ও মানুষের মনস্তত্ত্ব বোঝার ৪৮টি নীতি",
        price: 999,
        originalPrice: 1500,
        discountPercent: 34,
        pages: 452,
        fileSize: "৩৬ মেগাবাইট",
      },
      settings: {
        supportWhatsapp: settings?.supportWhatsapp || "8801700000000",
        bkashNumber: settings?.bkashPersonalNumber || "01700000000",
      },
    });
  } catch (error: any) {
    console.error("[Public Product API Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch product" },
      { status: 500 }
    );
  }
}
