import { NextRequest, NextResponse } from "next/server";
import { getCollection, Order, Customer } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";
import crypto from "crypto";

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
    const paymentStatus = searchParams.get("paymentStatus") || "";
    const orderStatus = searchParams.get("orderStatus") || "";
    const paymentMethod = searchParams.get("paymentMethod") || "";

    const query: any = {};

    if (search.trim()) {
      const s = search.trim();
      query.$or = [
        { orderNumber: { $regex: s, $options: "i" } },
        { targetEmail: { $regex: s, $options: "i" } },
        { trxId: { $regex: s, $options: "i" } },
        { customerName: { $regex: s, $options: "i" } },
        { payerPhone: { $regex: s, $options: "i" } },
      ];
    }

    if (paymentStatus && paymentStatus !== "all") {
      query.paymentStatus = paymentStatus;
    }
    if (orderStatus && orderStatus !== "all") {
      query.orderStatus = orderStatus;
    }
    if (paymentMethod && paymentMethod !== "all") {
      query.paymentMethod = paymentMethod;
    }

    const ordersCol = await getCollection<Order>("orders");
    const total = await ordersCol.countDocuments(query);
    const skip = (page - 1) * limit;

    const orders = await ordersCol
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      success: true,
      orders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error: any) {
    console.error("[Admin Get Orders Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch orders" },
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
    const {
      customerName,
      targetEmail,
      customerPhone = "",
      amount = 999,
      paymentMethod = "bkash_manual",
      paymentStatus = "paid",
      orderStatus = "active",
      trxId = "",
      notes = "Manually created by admin",
    } = body;

    if (!targetEmail || !targetEmail.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Valid customer email is required" },
        { status: 400 }
      );
    }

    const orderNumber = `#PDF-${Math.floor(100000 + Math.random() * 900000)}`;
    const downloadToken = crypto.randomBytes(24).toString("hex");

    const ordersCol = await getCollection<Order>("orders");
    
    let pdfStatus: "pending" | "generated" | "failed" = "pending";
    let emailStatus: "pending" | "sent" | "failed" = "pending";
    let pdfBuffer: Buffer | undefined;

    const phoneForWatermark = customerPhone ? customerPhone.trim() : "01700000000";

    if (paymentStatus === "paid") {
      try {
        const { getOrGenerateWatermarkedPdf } = await import("@/lib/watermarkPdf");
        const wm = await getOrGenerateWatermarkedPdf({
          orderNumber,
          customerPhone: phoneForWatermark,
          customerEmail: targetEmail.trim().toLowerCase(),
        });
        pdfStatus = "generated";
        pdfBuffer = wm.fileBuffer;
      } catch (err) {
        console.error("[Manual Order PDF Gen Error]:", err);
        pdfStatus = "failed";
      }

      if (pdfStatus === "generated" && pdfBuffer) {
        try {
          const { sendPersonalizedBookEmail } = await import("@/lib/emailDelivery");
          const emailRes = await sendPersonalizedBookEmail({
            orderNumber,
            customerName: customerName || targetEmail.split("@")[0],
            customerEmail: targetEmail.trim().toLowerCase(),
            customerPhone: phoneForWatermark,
            trxId: trxId || "MANUAL-PAID",
            amount: Number(amount),
            downloadToken,
            watermarkedPdfBuffer: pdfBuffer,
          });
          if (emailRes.success) {
            emailStatus = "sent";
          }
        } catch (err) {
          console.error("[Manual Order Email Send Error]:", err);
        }
      }
    }

    const newOrder: Order = {
      orderNumber,
      productTitle: "The 48 Laws of Power (বাংলা অনুবাদ)",
      amount: Number(amount),
      paymentMethod,
      paymentStatus,
      orderStatus,
      trxId: trxId ? trxId.trim().toUpperCase() : undefined,
      targetEmail: targetEmail.trim().toLowerCase(),
      customerName: customerName ? customerName.trim() : targetEmail.split("@")[0],
      customerPhone: customerPhone ? customerPhone.trim() : undefined,
      downloadToken,
      downloadCount: 0,
      pdfStatus,
      pdfGeneratedAt: pdfStatus === "generated" ? new Date() : undefined,
      emailStatus,
      emailSentAt: emailStatus === "sent" ? new Date() : undefined,
      notes,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await ordersCol.insertOne(newOrder);

    // Upsert Customer CRM Record
    const customersCol = await getCollection<Customer>("customers");
    const existingCustomer = await customersCol.findOne({ email: newOrder.targetEmail });

    if (existingCustomer) {
      await customersCol.updateOne(
        { _id: existingCustomer._id },
        {
          $inc: {
            totalOrders: 1,
            totalSpent: newOrder.paymentStatus === "paid" ? newOrder.amount : 0,
          },
          $set: {
            name: newOrder.customerName || existingCustomer.name,
            phone: newOrder.customerPhone || existingCustomer.phone,
            updatedAt: new Date(),
          },
        }
      );
    } else {
      await customersCol.insertOne({
        name: newOrder.customerName,
        email: newOrder.targetEmail,
        phone: newOrder.customerPhone,
        totalOrders: 1,
        totalSpent: newOrder.paymentStatus === "paid" ? newOrder.amount : 0,
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Order created successfully",
      orderId: result.insertedId,
      orderNumber,
      downloadToken,
    });
  } catch (error: any) {
    console.error("[Admin Create Order Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
