export interface SeducerArchetype {
  id: string;
  nameEn: string;
  nameBn: string;
  tagline: string;
  shortDesc: string;
  psychologicalHook: string;
  iconName: string;
  historicalExample: string;
}

export interface SeductionLesson {
  id: string;
  titleBn: string;
  titleEn: string;
  category: string;
  readTime: string;
  summary: string;
  content: string[];
  takeaway: string;
}

export const SEDUCER_ARCHETYPES: SeducerArchetype[] = [
  {
    id: "siren",
    nameEn: "The Siren",
    nameBn: "দ্য সাইরেন",
    tagline: "অপ্রতিরোধ্য মোহ ও মুক্তির প্রতীক",
    shortDesc: "পুরুষের সামাজিক দায়িত্ব ও যুক্তির শৃঙ্খল ভেঙে তাকে বিশুদ্ধ আনন্দ ও কল্পনার জগতে বশীভূত করার ক্ষমতা।",
    psychologicalHook: "দায়িত্বের চাপে নিষ্পেষিত মানুষের অবদমিত আকাঙ্ক্ষাকে জাগিয়ে তোলে।",
    iconName: "Flame",
    historicalExample: "ক্লিওপেট্রা, মেরিলিন মনরো",
  },
  {
    id: "rake",
    nameEn: "The Rake",
    nameBn: "দ্য রেক",
    tagline: "তীব্র আবেগ ও বিপজ্জনক রোমাঞ্চ",
    shortDesc: "যে নারী অবহেলা ও একঘেয়েমিতে ক্লান্ত, তার জন্য নিজেকে সর্বস্ব দিয়ে পাওয়ার তীব্র অনুভূতি সৃষ্টি করে।",
    psychologicalHook: "নারীর কাঙ্ক্ষিত হওয়ার গভীর মনস্তাত্ত্বিক ক্ষুধা মেটায়।",
    iconName: "Zap",
    historicalExample: "ক্যাসানোভা, লর্ড বায়রন",
  },
  {
    id: "ideal_lover",
    nameEn: "The Ideal Lover",
    nameBn: "দ্য আইডিয়াল লাভার",
    tagline: "অপূর্ণ স্বপ্নের প্রতিফলনকারী শিল্পী",
    shortDesc: "মানুষের তারুণ্যের হারিয়ে যাওয়া স্বপ্ন ও কল্পনার রূপ ধারণ করে এক মায়াবী পরিবেশ সৃষ্টি করে।",
    psychologicalHook: "বাস্তবতার রূঢ়তায় আঘাতপ্রাপ্ত মানুষের মনের ভেতরের অপূর্ণ আদর্শকে রূপ দেয়।",
    iconName: "Heart",
    historicalExample: "রুডলফ ভ্যালেন্টিনো, মাদাম দ্য পম্পাদ্যুর",
  },
  {
    id: "dandy",
    nameEn: "The Dandy",
    nameBn: "দ্য ড্যান্ডি",
    tagline: "স্বতন্ত্র, মুক্ত ও রহস্যময় ব্যক্তিত্ব",
    shortDesc: "সামাজিক সীমাবদ্ধতার বাইরে গিয়ে নিজের নিয়ম নিজে তৈরি করে অন্যের মনে তীব্র কৌতূহল ও মোহ তৈরি করে।",
    psychologicalHook: "মানুষের অবদমিত স্বাধীনতার আকাঙ্ক্ষাকে উদ্দীপ্ত করে।",
    iconName: "Sparkles",
    historicalExample: "অস্কার ওয়াইল্ড, বিউ ব্রুমেল",
  },
  {
    id: "natural",
    nameEn: "The Natural",
    nameBn: "দ্য ন্যাচারাল",
    tagline: "শৈশবের নির্ভেজাল সারল্য ও স্বতঃস্ফূর্ততা",
    shortDesc: "কৃত্রিমতাহীনতা ও আন্তরিকতার মাধ্যমে মানুষের মনের প্রতিরোধ ও অবিশ্বাস মুহূর্তেই ভেঙে দেয়।",
    psychologicalHook: "সবার মনে লুকিয়ে থাকা শৈশবের সোনালী স্মৃতির নস্টালজিয়া জাগিয়ে তোলে।",
    iconName: "Smile",
    historicalExample: "চার্লি চ্যাপলিন",
  },
  {
    id: "coquette",
    nameEn: "The Coquette",
    nameBn: "দ্য কোকেট",
    tagline: "আশা ও হতাশার নিরন্তর দোলাচল",
    shortDesc: "কখনো পরম উষ্ণতা, আবার কখনো শীতল উদাসীনতা দেখিয়ে শিকারকে সম্পূর্ণ নিজের নিয়ন্ত্রণে রাখে।",
    psychologicalHook: "অপেক্ষার অনিশ্চয়তা মানুষের আসক্তি বহুগুণ বাড়িয়ে দেয়।",
    iconName: "Compass",
    historicalExample: "মাদাম রেকামিয়ের",
  },
  {
    id: "charmer",
    nameEn: "The Charmer",
    nameBn: "দ্য চার্মার",
    tagline: "অহংকার তুষ্ট করে মুগ্ধ করার জাদুকর",
    shortDesc: "নিজের কথা না বলে সম্পূর্ণ মনোযোগ অন্যের উপর দিয়ে তার আত্মতৃপ্তি ও আত্মমর্যাদাকে বশীভূত করে।",
    psychologicalHook: "মানুষের সবচেয়ে বড় দুর্বলতা হলো তার প্রশংসা ও স্বীকৃতির ক্ষুধা।",
    iconName: "SmilePlus",
    historicalExample: "বেনজামিন ডিজরেইলি",
  },
  {
    id: "charismatic",
    nameEn: "The Charismatic",
    nameBn: "দ্য ক্যারিসম্যাটিক",
    tagline: "দৃঢ় আত্মবিশ্বাস ও চৌম্বকীয় দৃষ্টি",
    shortDesc: "এক অভ্যন্তরীণ রহস্যময় আত্মবিশ্বাস ও উদ্দেশ্যের স্পষ্টতা দিয়ে মানুষকে নিজের দিকে টেনে নেওয়ার ক্ষমতা।",
    psychologicalHook: "দিশাহীন মানুষ সর্বদা একজন শক্তিশালী ব্যক্তিত্বের আশ্রয় খোঁজে।",
    iconName: "Eye",
    historicalExample: "জেএফ কেনেডি, ইভিতা পেরন",
  },
  {
    id: "star",
    nameEn: "The Star",
    nameBn: "দ্য স্টার",
    tagline: "উজ্জ্বল, অধরা ও স্বপ্নিল রূপ",
    shortDesc: "দূরত্ব বজায় রেখে মানুষের কল্পনায় বেঁচে থাকার শৈল্পিক চাতুর্য, যা তাকে চিরকাল আকর্ষণের কেন্দ্রে রাখে।",
    psychologicalHook: "দৈনন্দিন একঘেয়েমি থেকে মানুষকে স্বপ্নের রূপকথার জগতে নিয়ে যায়।",
    iconName: "Star",
    historicalExample: "মার্লিন ডিয়েট্রিশ",
  },
];

export const SEDUCTION_SAMPLE_LESSONS: SeductionLesson[] = [
  {
    id: "lesson_1",
    titleBn: "নিরাপত্তার মিথ্যা অনুভূতি তৈরি করুন (Create a False Sense of Security)",
    titleEn: "Create a False Sense of Security",
    category: "Phase 1: আকর্ষণ ও মনস্তাত্ত্বিক প্রবেশ",
    readTime: "২ মিনিট পাঠ",
    summary: "সরাসরি নিজের উদ্দেশ্য প্রকাশ করলে মানুষ সতর্ক হয়ে যায়। প্রথমে বন্ধু বা সহযাত্রীর ছদ্মবেশে তাদের মনস্তাত্ত্বিক প্রতিরোধ ভেঙে দিন।",
    content: [
      "আপনি যদি কারও উপর প্রভাব বিস্তার করতে চান এবং শুরুতেই নিজের উদ্দেশ্য সরাসরি বুঝিয়ে দেন, তবে অপরপক্ষের মস্তিষ্কে একটি শক্তিশালী প্রতিরক্ষা প্রাচীর (Defense Mechanism) গড়ে ওঠে। তারা সতর্ক হয়ে যায়।",
      "প্রলোভন ও সম্মোহন শিল্পের প্রধান কৌশল হলো: শিকারকে কখনোই বুঝতে দেবেন না যে তাকে প্রলুব্ধ করা হচ্ছে। প্রথমে নিরপেক্ষ বন্ধু বা নির্দোষ শুভাকাঙ্ক্ষীর রূপ ধরুন।",
      "যখন মানুষ আপনাকে হুমকিহীন এবং নিরাপদ মনে করবে, তখন তাদের সমস্ত মানসিক গার্ড ও আত্মরক্ষা ব্যবস্থা শিথিল হয়ে যাবে। একবার সেই প্রাচীর ভেঙে গেলে, তাদের মনের ভেতরে যে কোনো ধারণা বা প্রভাব সহজেই প্রতিষ্ঠা করা সম্ভব।",
      "ঐতিহাসিক উদাহরণ: প্যারিসের সালঁয় বিখ্যাত সিডিউসার ভালমোর স্ট্র্যাটেজি ছিল প্রথমে বন্ধুত্ব স্থাপন করে মানুষের ভেতরের গোপন আকাঙ্ক্ষা ও মানসিক শূন্যতা জানা, এবং সঠিক মুহূর্তে নিজের চূড়ান্ত প্রভাব বিস্তার করা।"
    ],
    takeaway: "নীতি: প্রত্যক্ষ আক্রমণ মানুষকে প্রতিরোধ করতে শেখায়; পরোক্ষ বন্ধুত্বের মোড়ক মানুষের অবচেতনকে উন্মুক্ত করে দেয়।"
  },
  {
    id: "lesson_2",
    titleBn: "মুগ্ধতার অদৃশ্য শিল্প: অন্যের অহংকারকে তুষ্ট করুন (The Art of Charming)",
    titleEn: "Master the Art of Insinuation",
    category: "Phase 2: চার্মারের মনস্তত্ত্ব",
    readTime: "২ মিনিট পাঠ",
    summary: "নিজের প্রশংসা পাওয়ার চেষ্টা সবচেয়ে বড় ভুল। বরং অন্যের কথা গভীর মনোযোগ দিয়ে শুনুন এবং তাদের আত্মমর্যাদাকে বাড়িয়ে তুলুন।",
    content: [
      "অধিকাংশ মানুষ অন্যের সাথে কথা বলার সময় শুধু নিজের অভিজ্ঞতা, নিজের যোগ্যতা আর নিজের অহংকার জাহির করতে ব্যস্ত থাকে। এতে তারা সাময়িক স্বস্তি পেলেও অন্যের উপর কোনো বাস্তব প্রভাব ফেলতে পারে না।",
      "একজন চার্মার (The Charmer) সম্পূর্ণ উল্টো পথে হাঁটেন। তিনি নিজের বিষয়ে কথা বলেন না। তিনি অন্যের দিকে গভীর মনোযোগ দেন, তাদের ছোটখাটো বিষয়গুলো লক্ষ্য করেন এবং এমন এক পরিবেশ তৈরি করেন যেখানে অপর ব্যক্তি নিজেকে অসাধারণ মনে করে।",
      "মানুষ সেই ব্যক্তির প্রতি সবচেয়ে বেশি আকৃষ্ট হয়, যার সান্নিধ্যে সে নিজেকে সবচেয়ে মূল্যবান ও ক্ষমতাবান অনুভব করে।",
      "এই মনস্তত্ত্ব রাজনীতি, পেশাদার জীবন এবং ব্যক্তিগত সম্পর্কের ক্ষেত্রে অপরিসীম ক্ষমতা এনে দেয়।"
    ],
    takeaway: "নীতি: নিজের বড়ত্ব জাহির না করে অন্যের আত্মমর্যাদাকে মহিমান্বিত করুন—পুরো নিয়ন্ত্রণ আপনার হাতে চলে আসবে।"
  }
];

export const BUNDLE_DETAILS = {
  bundleNameBn: "রবার্ট গ্রিনের সম্পূর্ণ মনস্তত্ত্ব ও পাওয়ার বান্ডেল",
  bundleNameEn: "The Complete Robert Greene Dual Masterclass",
  singlePrice: 149,
  bundlePrice: 199,
  combinedOriginalPrice: 298,
  savingsAmount: 99,
  books: [
    {
      id: "48_laws",
      titleBn: "The 48 Laws of Power (বাংলা সংস্করণ)",
      titleEn: "The 48 Laws of Power",
      pages: 509,
      size: "6 MB",
      mockupImg: "/images/book-mockup.png",
      webpImg: "/images/book-mockup.webp",
      tagline: "ক্ষমতা অর্জন, রক্ষা এবং শত্রুর কৌশল বোঝার ৪৮টি অমোঘ নীতি",
      accentColor: "#C8A45C",
    },
    {
      id: "art_of_seduction",
      titleBn: "The Art of Seduction (বাংলা সংস্করণ)",
      titleEn: "The Art of Seduction",
      pages: 480,
      size: "12 MB",
      mockupImg: "/images/the-art-of-seduction-book-mockup.png",
      webpImg: "/images/the-art-of-seduction-book-mockup.png",
      tagline: "আকর্ষণ, মনস্তাত্ত্বিক বশ্যতা ও প্রভাব বিস্তারের চূড়ান্ত গাইড",
      accentColor: "#E11D48",
    }
  ]
};
