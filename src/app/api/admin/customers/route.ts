import { NextRequest, NextResponse } from "next/server";
import { getCollection, Customer, Order } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";

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
        { name: { $regex: s, $options: "i" } },
        { email: { $regex: s, $options: "i" } },
        { phone: { $regex: s, $options: "i" } },
      ];
    }

    const customersCol = await getCollection<Customer>("customers");
    const total = await customersCol.countDocuments(query);
    const skip = (page - 1) * limit;

    const customers = await customersCol
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      success: true,
      customers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error: any) {
    console.error("[Admin Get Customers Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch customers" },
      { status: 500 }
    );
  }
}
