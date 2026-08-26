import { NextRequest, NextResponse } from "next/server";
import { getCollection, BKashTransaction } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";
import { queryBKashPayment } from "@/lib/bkash";

export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "15", 10);
    const search = searchParams.get("search") || "";

    const query: any = {};
    if (search.trim()) {
      const s = search.trim();
      query.$or = [
        { paymentID: { $regex: s, $options: "i" } },
        { trxID: { $regex: s, $options: "i" } },
        { customerMsisdn: { $regex: s, $options: "i" } },
        { merchantInvoiceNumber: { $regex: s, $options: "i" } },
      ];
    }

    const txCol = await getCollection<BKashTransaction>("bkash_transactions");
    const total = await txCol.countDocuments(query);
    const skip = (page - 1) * limit;

    const transactions = await txCol
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      success: true,
      transactions,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error: any) {
    console.error("[Admin Payments Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

// Query bKash gateway directly for a paymentID
export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { paymentID } = await req.json();
    if (!paymentID) {
      return NextResponse.json({ success: false, message: "PaymentID is required" }, { status: 400 });
    }

    const data = await queryBKashPayment({ paymentID });
    return NextResponse.json({ success: true, result: data });
  } catch (error: any) {
    console.error("[Admin bKash Query Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to query bKash payment" },
      { status: 500 }
    );
  }
}
