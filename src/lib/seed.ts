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
        discountPercent: 34,
        fileName: "the-48-laws-of-power-bangla.pdf",
        fileSize: "36 MB",
        fileUrl: "/downloads/the-48-laws-of-power-bangla.pdf",
        pages: siteConfig.pages || 452,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log("[DB Seed] Created default digital product");
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
  } catch (error) {
    console.error("[DB Seed Error]:", error);
  }
}
