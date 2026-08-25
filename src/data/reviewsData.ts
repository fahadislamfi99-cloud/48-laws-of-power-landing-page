export interface ReviewItem {
  id: number;
  name: string;
  location: string;
  role?: string;
  comment: string;
  rating: number;
  date: string;
}

export const reviewsList: ReviewItem[] = [
  {
    id: 1,
    name: "রিয়াদ আহমেদ",
    location: "ঢাকা",
    role: "কর্পোরেট এক্সিকিউটিভ",
    comment: "“এই বই আমার চিন্তাভাবনার ধরন পাল্টে দিয়েছে। মানুষের স্বভাব বুঝতে চোখ খুলে দিয়েছে।”",
    rating: 5,
    date: "৩ দিন আগে"
  },
  {
    id: 2,
    name: "তানভীর হাসান",
    location: "চট্টগ্রাম",
    role: "ব্যবসায়ী",
    comment: "“অসাধারণ রাজনৈতিক ও মনস্তাত্ত্বিক নীতি। জীবনের অনেক পরিস্থিতিতে কাজে করে।”",
    rating: 5,
    date: "১ সপ্তাহ আগে"
  },
  {
    id: 3,
    name: "নাহিদ জামান",
    location: "রাজশাহী",
    role: "বিশ্ববিদ্যালয় শিক্ষক",
    comment: "“বাংলা অনুবাদ দারুণ হয়েছে। প্রতিটি চ্যাপ্টার অত্যন্ত সাবলীল ও সহজবোধ্য। সবারই পড়া উচিত!”",
    rating: 5,
    date: "২ সপ্তাহ আগে"
  }
];
