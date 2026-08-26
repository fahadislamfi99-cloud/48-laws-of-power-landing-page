import { NextRequest, NextResponse } from "next/server";
import { getCollection, Order, Customer, Product } from "@/lib/mongodb";
import { sendTelegramOrderNotification } from "@/lib/telegram";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, trxId, couponCode } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "অনুগ্রহ করে আপনার সঠিক জিমেইল আইডি দিন" },
        { status: 400 }
      );
    }

    if (!trxId || trxId.trim().length < 6) {
      return NextResponse.json(
        { success: false, message: "অনুগ্রহ করে সঠিক বিকাশ ট্রানজেকশন আইডি (TrxID) দিন" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanTrxId = trxId.trim().toUpperCase();

    const ordersCol = await getCollection<Order>("orders");

    // 1. Anti-Duplicate Check
    const duplicateOrder = await ordersCol.findOne({
      trxId: cleanTrxId,
      paymentStatus: "paid",
    });

    if (duplicateOrder) {
      return NextResponse.json(
        {
          success: false,
          message: `❌ এই Transaction ID (${cleanTrxId}) দিয়ে ইতোমধ্যে একটি অর্ডার সম্পন্ন হয়েছে!`,
        },
        { status: 400 }
      );
    }

    // 2. Fetch Product Price
    const productsCol = await getCollection<Product>("products");
    const product = await productsCol.findOne({ isActive: true });
    let amount = product ? Number(product.price) : 999;
    const productTitle = product ? product.title : "The 48 Laws of Power (বাংলা অনুবাদ)";

    // Apply coupon if valid
    if (couponCode) {
      const couponsCol = await getCollection("coupons");
      const coupon = await couponsCol.findOne({
        code: couponCode.trim().toUpperCase(),
        isActive: true,
      });

      if (coupon) {
        if (coupon.discountType === "percentage") {
          amount = Math.max(1, Math.round(amount * (1 - coupon.discountValue / 100)));
        } else {
          amount = Math.max(1, amount - coupon.discountValue);
        }
      }
    }

    const orderNumber = `#PDF-${Math.floor(100000 + Math.random() * 900000)}`;
    const downloadToken = crypto.randomBytes(24).toString("hex");

    // 3. Insert Paid Order into MongoDB
    const newOrder: Order = {
      orderNumber,
      productTitle,
      amount,
      paymentMethod: "bkash_manual",
      paymentStatus: "paid",
      orderStatus: "active",
      trxId: cleanTrxId,
      targetEmail: cleanEmail,
      customerName: cleanEmail.split("@")[0],
      downloadToken,
      downloadCount: 0,
      notes: `Manual bKash Send Money TrxID: ${cleanTrxId}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await ordersCol.insertOne(newOrder);

    // 4. Upsert Customer CRM Record
    const customersCol = await getCollection<Customer>("customers");
    const existingCustomer = await customersCol.findOne({ email: cleanEmail });

    if (existingCustomer) {
      await customersCol.updateOne(
        { _id: existingCustomer._id },
        {
          $inc: { totalOrders: 1, totalSpent: amount },
          $set: { updatedAt: new Date() },
        }
      );
    } else {
      await customersCol.insertOne({
        name: cleanEmail.split("@")[0],
        email: cleanEmail,
        totalOrders: 1,
        totalSpent: amount,
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // 5. Send Telegram Notification
    sendTelegramOrderNotification({
      orderNumber,
      customerName: cleanEmail.split("@")[0],
      customerEmail: cleanEmail,
      amount,
      paymentMethod: "bKash (Send Money Manual)",
      trxId: cleanTrxId,
      status: "সফল (Manual TrxID Submitted)",
    }).catch((err) => console.error("[Telegram Error]:", err));

    return NextResponse.json({
      success: true,
      message: "পেমেন্ট সফলভাবে গ্রহণ করা হয়েছে!",
      orderNumber,
      downloadToken,
      amount,
      email: cleanEmail,
    });
  } catch (error: any) {
    console.error("[Manual Order Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "অর্ডার প্রক্রিয়াকরণে ত্রুটি হয়েছে" },
      { status: 500 }
    );
  }
}
