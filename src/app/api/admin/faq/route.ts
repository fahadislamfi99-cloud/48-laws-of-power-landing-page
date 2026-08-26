import { NextRequest, NextResponse } from "next/server";
import { getCollection, FAQItem } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";
import { ensureDatabaseSeeded } from "@/lib/seed";

export async function GET() {
  try {
    await ensureDatabaseSeeded();
    const faqsCol = await getCollection<FAQItem>("faqs");
    const faqs = await faqsCol.find().sort({ orderIndex: 1, createdAt: 1 }).toArray();

    return NextResponse.json({ success: true, faqs });
  } catch (error: any) {
    console.error("[Admin Get FAQs Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch FAQs" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { question, answer, category = "general", orderIndex } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { success: false, message: "Question and answer are required" },
        { status: 400 }
      );
    }

    const faqsCol = await getCollection<FAQItem>("faqs");
    const count = await faqsCol.countDocuments();

    const newFaq: FAQItem = {
      question: question.trim(),
      answer: answer.trim(),
      category,
      orderIndex: orderIndex !== undefined ? Number(orderIndex) : count,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await faqsCol.insertOne(newFaq);

    return NextResponse.json({
      success: true,
      message: "FAQ created successfully",
      faq: { ...newFaq, _id: result.insertedId },
    });
  } catch (error: any) {
    console.error("[Admin Create FAQ Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create FAQ" },
      { status: 500 }
    );
  }
}
