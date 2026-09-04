import { NextRequest, NextResponse } from "next/server";
import { getCollection, Order, ProfitLossSettings, AdminLog } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const range = searchParams.get("range") || "all";
    const customStart = searchParams.get("startDate");
    const customEnd = searchParams.get("endDate");

    // 1. Fetch saved Profit/Loss settings
    const settingsCol = await getCollection<ProfitLossSettings>("profit_loss_settings");
    let settings = await settingsCol.findOne({});

    if (!settings) {
      settings = {
        adSpendUSD: 0,
        taxRatePercent: 15,
        exchangeRate: 130,
        otherCostsBDT: 0,
        gatewayFeePercent: 1.5,
        updatedAt: new Date(),
      } as any;
    }

    // 2. Determine date filter query
    const now = new Date();
    const query: any = { paymentStatus: "paid" };

    if (range === "today") {
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      query.createdAt = { $gte: startOfDay };
    } else if (range === "yesterday") {
      const startOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
      const endOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      query.createdAt = { $gte: startOfYesterday, $lt: endOfYesterday };
    } else if (range === "last7days") {
      const past7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      query.createdAt = { $gte: past7 };
    } else if (range === "last30days") {
      const past30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      query.createdAt = { $gte: past30 };
    } else if (range === "thismonth") {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      query.createdAt = { $gte: startOfMonth };
    } else if (range === "custom" && customStart && customEnd) {
      query.createdAt = {
        $gte: new Date(customStart),
        $lte: new Date(customEnd),
      };
    }

    // 3. Fetch paid orders matching criteria
    const ordersCol = await getCollection<Order>("orders");
    const paidOrders = await ordersCol.find(query).sort({ createdAt: -1 }).toArray();

    // 4. Calculate Sales Metrics
    const totalSalesCount = paidOrders.length;
    const totalRevenueBDT = paidOrders.reduce((acc, order) => acc + (Number(order.amount) || 0), 0);
    
    let bundleSalesCount = 0;
    let singleSalesCount = 0;

    paidOrders.forEach((o) => {
      const amt = Number(o.amount) || 0;
      if (o.packageType === "bundle" || amt >= 199) {
        bundleSalesCount++;
      } else {
        singleSalesCount++;
      }
    });

    // 5. Calculate Ad Spend & Expense Metrics
    const adSpendUSD = Number(settings?.adSpendUSD) || 0;
    const taxRatePercent = Number(settings?.taxRatePercent) ?? 15;
    const exchangeRate = Number(settings?.exchangeRate) || 130;
    const otherCostsBDT = Number(settings?.otherCostsBDT) || 0;
    const gatewayFeePercent = Number(settings?.gatewayFeePercent) ?? 1.5;

    const taxAmountUSD = adSpendUSD * (taxRatePercent / 100);
    const totalAdSpendUSDWithTax = adSpendUSD + taxAmountUSD;

    const baseAdSpendBDT = Math.round(adSpendUSD * exchangeRate);
    const taxAmountBDT = Math.round(taxAmountUSD * exchangeRate);
    const totalAdCostBDT = Math.round(totalAdSpendUSDWithTax * exchangeRate);

    const gatewayFeesBDT = Math.round(totalRevenueBDT * (gatewayFeePercent / 100));
    const totalExpensesBDT = totalAdCostBDT + gatewayFeesBDT + otherCostsBDT;

    const netProfitBDT = totalRevenueBDT - totalExpensesBDT;

    // 6. Unit Economics & Efficiency Ratios
    const revenuePerSale = totalSalesCount > 0 ? Math.round(totalRevenueBDT / totalSalesCount) : 0;
    const adCostPerSale = totalSalesCount > 0 ? Math.round(totalAdCostBDT / totalSalesCount) : 0;
    const totalCostPerSale = totalSalesCount > 0 ? Math.round(totalExpensesBDT / totalSalesCount) : 0;
    const profitPerSale = totalSalesCount > 0 ? Math.round(netProfitBDT / totalSalesCount) : 0;

    const profitMarginPercent = totalRevenueBDT > 0 ? Number(((netProfitBDT / totalRevenueBDT) * 100).toFixed(2)) : 0;
    const roas = totalAdCostBDT > 0 ? Number((totalRevenueBDT / totalAdCostBDT).toFixed(2)) : 0;
    const roiPercent = totalExpensesBDT > 0 ? Number(((netProfitBDT / totalExpensesBDT) * 100).toFixed(2)) : 0;
    const breakEvenOrders = revenuePerSale > 0 ? Math.ceil(totalExpensesBDT / revenuePerSale) : 0;

    // 7. Group daily revenue for charts
    const dailyMap: Record<string, { date: string; revenue: number; orders: number }> = {};
    const daysToShow = range === "last7days" ? 7 : range === "last30days" ? 30 : 14;

    for (let i = daysToShow - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      dailyMap[key] = { date: key, revenue: 0, orders: 0 };
    }

    paidOrders.forEach((order) => {
      const key = new Date(order.createdAt).toISOString().split("T")[0];
      if (dailyMap[key]) {
        dailyMap[key].revenue += Number(order.amount) || 0;
        dailyMap[key].orders += 1;
      }
    });

    const dailyTrend = Object.values(dailyMap);

    return NextResponse.json({
      success: true,
      data: {
        settings: {
          adSpendUSD,
          taxRatePercent,
          exchangeRate,
          otherCostsBDT,
          gatewayFeePercent,
          notes: settings?.notes || "",
          updatedAt: settings?.updatedAt || new Date(),
        },
        calculations: {
          adSpendUSD,
          taxRatePercent,
          taxAmountUSD: Number(taxAmountUSD.toFixed(2)),
          totalAdSpendUSDWithTax: Number(totalAdSpendUSDWithTax.toFixed(2)),
          exchangeRate,
          baseAdSpendBDT,
          taxAmountBDT,
          totalAdCostBDT,
          gatewayFeesBDT,
          otherCostsBDT,
          totalExpensesBDT,
          totalRevenueBDT,
          netProfitBDT,
          totalSalesCount,
          bundleSalesCount,
          singleSalesCount,
          revenuePerSale,
          adCostPerSale,
          totalCostPerSale,
          profitPerSale,
          profitMarginPercent,
          roas,
          roiPercent,
          breakEvenOrders,
        },
        dailyTrend,
        filteredRange: range,
      },
    });
  } catch (error: any) {
    console.error("[Admin Profit/Loss GET Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to calculate profit & loss" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { adSpendUSD, taxRatePercent, exchangeRate, otherCostsBDT, gatewayFeePercent, notes } = body;

    const cleanAdSpendUSD = Math.max(0, Number(adSpendUSD) || 0);
    const cleanTaxRate = Math.max(0, Math.min(100, Number(taxRatePercent) ?? 15));
    const cleanExchangeRate = Math.max(1, Number(exchangeRate) || 130);
    const cleanOtherCosts = Math.max(0, Number(otherCostsBDT) || 0);
    const cleanGatewayFee = Math.max(0, Math.min(10, Number(gatewayFeePercent) ?? 1.5));
    const cleanNotes = typeof notes === "string" ? notes.slice(0, 500) : "";

    const updateDoc: Partial<ProfitLossSettings> = {
      adSpendUSD: cleanAdSpendUSD,
      taxRatePercent: cleanTaxRate,
      exchangeRate: cleanExchangeRate,
      otherCostsBDT: cleanOtherCosts,
      gatewayFeePercent: cleanGatewayFee,
      notes: cleanNotes,
      updatedAt: new Date(),
    };

    const settingsCol = await getCollection<ProfitLossSettings>("profit_loss_settings");
    await settingsCol.updateOne({}, { $set: updateDoc }, { upsert: true });

    // Audit Log
    const logsCol = await getCollection<AdminLog>("admin_logs");
    await logsCol.insertOne({
      adminId: session.adminId || "admin",
      adminName: session.username || "Admin",
      action: "UPDATE_PROFIT_LOSS_SETTINGS",
      entity: "profit_loss_settings",
      details: `AdSpend=$${cleanAdSpendUSD}, Tax=${cleanTaxRate}%, Rate=${cleanExchangeRate}, OtherCosts=৳${cleanOtherCosts}`,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Profit & loss configuration saved successfully.",
      settings: updateDoc,
    });
  } catch (error: any) {
    console.error("[Admin Profit/Loss PUT Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update settings" },
      { status: 500 }
    );
  }
}
