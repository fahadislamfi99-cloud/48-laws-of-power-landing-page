export interface SiteConfig {
  bookTitle: string;
  bookTitleEn: string;
  bookSubtitle: string;
  author: string;
  authorEn: string;
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
  bookTitle: "দ্য ৪৮ ল অব পাওয়ার (ডিজিটাল পিডিএফ সংস্করণ)",
  bookTitleEn: "The 48 Laws of Power (Digital PDF Edition)",
  bookSubtitle: "ক্ষমতা, প্রভাব ও মানুষের মনস্তত্ত্ব বোঝার ৪৮টি নীতি",
  author: "রবার্ট গ্রিন",
  authorEn: "Robert Greene",
  price: 999,
  originalPrice: 1500,
  currency: "BDT",
  currencySymbol: "৳",
  fileFormat: "হাই-রেজোলিউশন ইন্টারেক্টিভ PDF (Searchable)",
  fileSize: "৩৬ মেগাবাইট (আল্ট্রা ক্লিয়ার ফন্ট)",
  pages: 452,
  language: "বাংলা অনুবাদ (সম্পূর্ণ ও নির্ভুল)",
  deviceSupport: "স্মার্টফোন, ট্যাবলেট, আইপ্যাড, ল্যাপটপ ও কম্পিউটার",
  deliveryMethod: "পেমেন্টের সাথে সাথে তাৎক্ষণিক ডাউনলোড + ইমেইল ও হোয়াটসঅ্যাপ ডেলিভারি",
  bkashNumber: "01700000000",
  nagadNumber: "01700000000",
  rocketNumber: "01700000000",
  supportPhone: "+8801700000000",
  supportWhatsapp: "8801700000000",
  metaPixelId: "YOUR_PIXEL_ID",
};
