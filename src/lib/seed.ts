import bcrypt from "bcryptjs";
import { getCollection, AdminUser, Product, FAQItem, SiteSettings } from "./mongodb";
import { faqList } from "@/data/faqData";
import { siteConfig } from "@/data/siteConfig";

export async function ensureDatabaseSeeded() {
  try {
    const adminsCol = await getCollection<AdminUser>("admins");
    const adminCount = await adminsCol.countDocuments();

    if (adminCount === 0) {
      const passwordHash = await bcrypt.hash("admin123456", 12);
      await adminsCol.insertOne({
        username: "admin",
        email: "admin@48laws.com",
        passwordHash,
        name: "Super Admin",
        role: "super_admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log("[DB Seed] Created default super admin: admin / admin123456");
    }

    const productsCol = await getCollection<Product>("products");
    const productCount = await productsCol.countDocuments();

    if (productCount === 0) {
      await productsCol.insertOne({
        slug: "the-48-laws-of-power-bangla",
        title: siteConfig.bookTitle,
        titleEn: siteConfig.bookTitleEn,
        subtitle: siteConfig.bookSubtitle,
        price: siteConfig.price,
        originalPrice: siteConfig.originalPrice,
        discountPercent: Math.round(((siteConfig.originalPrice - siteConfig.price) / siteConfig.originalPrice) * 100),
        fileName: "the-48-laws-of-power-bangla.pdf",
        fileSize: "6 MB",
        fileUrl: "/downloads/the-48-laws-of-power-bangla.pdf",
        pages: siteConfig.pages || 509,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log("[DB Seed] Created default digital product");
    } else {
      await productsCol.updateMany(
        { price: { $gt: 500 } },
        {
          $set: {
            price: siteConfig.price,
            originalPrice: siteConfig.originalPrice,
            discountPercent: Math.round(((siteConfig.originalPrice - siteConfig.price) / siteConfig.originalPrice) * 100),
            updatedAt: new Date(),
          },
        }
      );
    }

    const faqsCol = await getCollection<FAQItem>("faqs");
    const faqCount = await faqsCol.countDocuments();

    if (faqCount === 0 && faqList.length > 0) {
      const initialFaqs: FAQItem[] = faqList.map((f, idx) => ({
        question: f.question,
        answer: f.answer,
        category: "general",
        orderIndex: idx,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      await faqsCol.insertMany(initialFaqs);
      console.log(`[DB Seed] Inserted ${faqList.length} FAQs`);
    }

    const settingsCol = await getCollection<SiteSettings>("site_settings");
    const settingsCount = await settingsCol.countDocuments();

    if (settingsCount === 0) {
      await settingsCol.insertOne({
        supportWhatsapp: siteConfig.supportWhatsapp,
        supportPhone: siteConfig.supportPhone,
        supportEmail: "support@48laws.com",
        bkashPersonalNumber: siteConfig.bkashNumber,
        telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || "",
        telegramChatId: process.env.TELEGRAM_CHAT_ID || "",
        metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
        metaAccessToken: process.env.META_ACCESS_TOKEN || "",
        downloadExpiryHours: 720, // 30 days
        updatedAt: new Date(),
      });
      console.log("[DB Seed] Created default site settings");
    }

    // Seed POWER50 Coupon
    const couponsCol = await getCollection("coupons");
    const power50Coupon = await couponsCol.findOne({ code: "POWER50" });
    if (!power50Coupon) {
      await couponsCol.insertOne({
        code: "POWER50",
        discountType: "fixed",
        discountValue: 50,
        usedCount: 0,
        isActive: true,
        createdAt: new Date(),
      });
      console.log("[DB Seed] Created default POWER50 coupon (৳50 OFF)");
    }

    // Seed Promotional Banner
    const promoCol = await getCollection("promo_banners");
    const promoCount = await promoCol.countDocuments();
    if (promoCount === 0) {
      await promoCol.insertOne({
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
      });
      console.log("[DB Seed] Created default promotional banner");
    }
  } catch (error) {
    console.error("[DB Seed Error]:", error);
  }
}
