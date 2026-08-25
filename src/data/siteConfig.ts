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
  deliveryChargeDhaka: number;
  deliveryChargeOutside: number;
  freeDeliveryPromo: boolean;
  phone: string;
  whatsapp: string;
  metaPixelId: string;
  pages: number;
  coverType: string;
  paperType: string;
  language: string;
  publisher: string;
}

export const siteConfig: SiteConfig = {
  bookTitle: "দ্য ৪৮ ল অব পাওয়ার",
  bookTitleEn: "The 48 Laws of Power",
  bookSubtitle: "ক্ষমতা, প্রভাব ও মানুষের মনস্তত্ত্ব বোঝার ৪৮টি নীতি",
  author: "রবার্ট গ্রিন",
  authorEn: "Robert Greene",
  price: 999,
  originalPrice: 1500,
  currency: "BDT",
  currencySymbol: "৳",
  deliveryChargeDhaka: 60,
  deliveryChargeOutside: 120,
  freeDeliveryPromo: true, // Limited promo: Free shipping
  phone: "+8801700000000",
  whatsapp: "8801700000000",
  metaPixelId: "YOUR_PIXEL_ID",
  pages: 452,
  coverType: "হার্ডকভার / প্রিমিয়াম পেপারব্যাক",
  paperType: "80 GSM প্রিমিয়াম ক্রিম পেপার",
  language: "বাংলা অনুবাদ (সম্পূর্ণ ও নির্ভুল)",
  publisher: "রুপান্তর প্রকাশনী",
};

export const bangladeshDistricts: Record<string, string[]> = {
  "ঢাকা বিভাগ": [
    "ঢাকা", "গাজীপুর", "নারায়ণগঞ্জ", "টাঙ্গাইল", "নরসিংদী", 
    "মুন্সীগঞ্জ", "মানিকগঞ্জ", "ফরিদপুর", "গোপালগঞ্জ", "মাদারীপুর", 
    "রাজবাড়ী", "শরীয়তপুর", "কিশোরগঞ্জ"
  ],
  "চট্টগ্রাম বিভাগ": [
    "চট্টগ্রাম", "কক্সবাজার", "কুমিল্লা", "ফেনী", "ব্রাহ্মণবাড়িয়া", 
    "নোয়াখালী", "চাঁদপুর", "লক্ষ্মীপুর", "খাগড়াছড়ি", "রাঙ্গামাটি", "বান্দরবান"
  ],
  "রাজশাহী বিভাগ": [
    "রাজশাহী", "বগুড়া", "পাবনা", "সিরাজগঞ্জ", "নওগাঁ", "নাটোর", "জয়পুরহাট", "চাঁপাইনবাবগঞ্জ"
  ],
  "খুলনা বিভাগ": [
    "খুলনা", "যশোর", "কুষ্টিয়া", "ঝিনাইদহ", "সাতক্ষীরা", "বাগেরহাট", "চুয়াডাঙ্গা", "মেহেরপুর", "নড়াইল", "মাগুরা"
  ],
  "বরিশাল বিভাগ": [
    "বরিশাল", "পটুয়াখালী", "ভোলা", "পিরোজপুর", "বরগুনা", "ঝালকাঠি"
  ],
  "সিলেট বিভাগ": [
    "সিলেট", "মৌলভীবাজার", "হবিগঞ্জ", "সুনামগঞ্জ"
  ],
  "রংপুর বিভাগ": [
    "রংপুর", "দিনাজপুর", "গাইবান্ধা", "কুড়িগ্রাম", "নীলফামারী", "লালমনিরহাট", "ঠাকুরগাঁও", "পঞ্চগড়"
  ],
  "ময়মনসিংহ বিভাগ": [
    "ময়মনসিংহ", "জামালপুর", "নেত্রকোণা", "শেরপুর"
  ]
};
