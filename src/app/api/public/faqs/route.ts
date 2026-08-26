import { NextResponse } from "next/server";
import { getCollection, FAQItem } from "@/lib/mongodb";
import { ensureDatabaseSeeded } from "@/lib/seed";

export async function GET() {
  try {
    await ensureDatabaseSeeded();
    const faqsCol = await getCollection<FAQItem>("faqs");
    const faqs = await faqsCol
      .find({ isActive: true })
      .sort({ orderIndex: 1, createdAt: 1 })
      .toArray();

    return NextResponse.json({ success: true, faqs });
  } catch (error: any) {
    console.error("[Public FAQs API Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch faqs" },
      { status: 500 }
    );
  }
}
