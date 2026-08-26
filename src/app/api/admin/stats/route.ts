import { NextResponse } from "next/server";
import { getCollection, Order, Customer, BKashTransaction } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const ordersCol = await getCollection<Order>("orders");
    const customersCol = await getCollection<Customer>("customers");
    const transactionsCol = await getCollection<BKashTransaction>("bkash_transactions");

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const [
      totalOrders,
      paidOrders,
      todayPaidOrders,
      pendingOrders,
      totalCustomers,
      recentOrders,
      recentCustomers,
      recentTransactions,
    ] = await Promise.all([
      ordersCol.countDocuments(),
      ordersCol.find({ paymentStatus: "paid" }).toArray(),
      ordersCol.find({ paymentStatus: "paid", createdAt: { $gte: startOfToday } }).toArray(),
      ordersCol.countDocuments({ paymentStatus: "pending" }),
      customersCol.countDocuments(),
      ordersCol.find().sort({ createdAt: -1 }).limit(6).toArray(),
      customersCol.find().sort({ createdAt: -1 }).limit(5).toArray(),
      transactionsCol.find().sort({ createdAt: -1 }).limit(5).toArray(),
    ]);

    const totalRevenue = paidOrders.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);
    const todayRevenue = todayPaidOrders.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);

    // Calculate last 7 days revenue trend
    const last7DaysMap: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      last7DaysMap[key] = 0;
    }

    paidOrders.forEach((o) => {
      const dateKey = new Date(o.createdAt).toISOString().split("T")[0];
      if (last7DaysMap[dateKey] !== undefined) {
        last7DaysMap[dateKey] += Number(o.amount) || 0;
      }
    });

    const revenueTrend = Object.entries(last7DaysMap).map(([date, amount]) => ({
      date,
      amount,
    }));

    return NextResponse.json({
      success: true,
      stats: {
        totalRevenue,
        todayRevenue,
        totalOrders,
        paidOrdersCount: paidOrders.length,
        todayPaidOrdersCount: todayPaidOrders.length,
        pendingOrdersCount: pendingOrders,
        totalCustomers,
      },
      revenueTrend,
      recentOrders,
      recentCustomers,
      recentTransactions,
    });
  } catch (error: any) {
    console.error("[Admin Stats Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
