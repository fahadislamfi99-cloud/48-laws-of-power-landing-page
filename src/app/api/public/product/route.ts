import { NextResponse } from "next/server";
import { getCollection, Product, SiteSettings } from "@/lib/mongodb";
import { ensureDatabaseSeeded } from "@/lib/seed";
import { siteConfig } from "@/data/siteConfig";

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
        title: siteConfig.bookTitle,
        titleEn: siteConfig.bookTitleEn,
        subtitle: siteConfig.bookSubtitle,
        price: siteConfig.price,
        originalPrice: siteConfig.originalPrice,
        discountPercent: Math.round(((siteConfig.originalPrice - siteConfig.price) / siteConfig.originalPrice) * 100),
        pages: siteConfig.pages,
        fileSize: siteConfig.fileSize,
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
