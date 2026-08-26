import { NextRequest, NextResponse } from "next/server";
import { getCollection, FAQItem } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { question, answer, category, orderIndex, isActive } = body;

    const faqsCol = await getCollection<FAQItem>("faqs");
    const query = { _id: new ObjectId(id) };

    const updates: Partial<FAQItem> = {
      updatedAt: new Date(),
    };

    if (question !== undefined) updates.question = question.trim();
    if (answer !== undefined) updates.answer = answer.trim();
    if (category !== undefined) updates.category = category;
    if (orderIndex !== undefined) updates.orderIndex = Number(orderIndex);
    if (isActive !== undefined) updates.isActive = Boolean(isActive);

    const result = await faqsCol.updateOne(query, { $set: updates });

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "FAQ updated successfully" });
  } catch (error: any) {
    console.error("[Admin Update FAQ Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update FAQ" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const faqsCol = await getCollection<FAQItem>("faqs");
    const query = { _id: new ObjectId(id) };

    const result = await faqsCol.deleteOne(query);

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "FAQ deleted successfully" });
  } catch (error: any) {
    console.error("[Admin Delete FAQ Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete FAQ" },
      { status: 500 }
    );
  }
}
