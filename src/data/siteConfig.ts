export interface SiteConfig {
  bookTitle: string;
  bookTitleEn: string;
  bookSubtitle: string;
  author: string;
  authorEn: string;
  translator: string;
  price: number;
  originalPrice: number;
  currency: string;
  currencySymbol: string;
  fileFormat: string;
  fileSize: string;
  pages: number;
  language: string;
  deviceSupport: string;
  deliveryMethod: string;
  bkashNumber: string;
  nagadNumber: string;
  rocketNumber: string;
  supportPhone: string;
  supportWhatsapp: string;
  metaPixelId: string;
}

export const siteConfig: SiteConfig = {
  bookTitle: "দ্য ৪৮ লজ অফ পাওয়ার (বাংলা অনুবাদ)",
  bookTitleEn: "The 48 Laws of Power (Bengali Edition)",
  bookSubtitle: "ক্ষমতা, প্রভাব ও মানুষের মনস্তত্ত্ব বোঝার ৪৮টি নীতি",
  author: "রবার্ট গ্রিন",
  authorEn: "Robert Greene",
  translator: "ফাহাদ ইসলাম",
  price: 149,
  originalPrice: 500,
  currency: "BDT",
  currencySymbol: "৳",
  fileFormat: "হাই-রেজোলিউশন সার্চেবল ডিজিটাল PDF",
  fileSize: "৬ মেগাবাইট (ক্রিস্টাল ক্লিয়ার টাইপসেটিং)",
  pages: 509,
  language: "সম্পূর্ণ ও নির্ভুল বাংলা অনুবাদ",
  deviceSupport: "স্মার্টফোন, ট্যাবলেট, আইপ্যাড, ল্যাপটপ ও কম্পিউটার",
  deliveryMethod: "পেমেন্টের সাথে সাথে তাৎক্ষণিক ডাউনলোড + ইমেইল ও হোয়াটসঅ্যাপে কপি প্রদান",
  bkashNumber: "01700000000",
  nagadNumber: "01700000000",
  rocketNumber: "01700000000",
  supportPhone: "+8801700000000",
  supportWhatsapp: "8801700000000",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "4300801780063322",
};
