import { NextResponse } from "next/server";
import { getCollection, Order, Customer, BKashTransaction } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";

export async function POST() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // Role-based Access Control: Only super_admin can trigger destructive demo resets
    if (session.role !== "super_admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden: Only super_admin can perform full database resets." },
        { status: 403 }
      );
    }

    const ordersCol = await getCollection<Order>("orders");
    const customersCol = await getCollection<Customer>("customers");
    const txCol = await getCollection<BKashTransaction>("bkash_transactions");

    await Promise.all([
      ordersCol.deleteMany({}),
      customersCol.deleteMany({}),
      txCol.deleteMany({}),
    ]);

    return NextResponse.json({
      success: true,
      message: "Demo orders, transactions, and customer records reset successfully",
    });
  } catch (error: any) {
    console.error("[Admin Reset Demo Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to reset demo data" },
      { status: 500 }
    );
  }
}
