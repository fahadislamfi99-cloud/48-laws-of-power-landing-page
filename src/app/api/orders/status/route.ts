import { NextRequest, NextResponse } from "next/server";
import { getCollection, Order } from "@/lib/mongodb";
import { getOrGenerateWatermarkedPdf } from "@/lib/watermarkPdf";
import { sendPersonalizedBookEmail } from "@/lib/emailDelivery";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token || token.length < 8) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 400 });
    }

    const ordersCol = await getCollection<Order>("orders");
    const order = await ordersCol.findOne({ downloadToken: token });

    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    const customerPhone = order.customerPhone || order.payerPhone || "01700000000";

    let pdfStatus = order.pdfStatus || "pending";
    let emailStatus = order.emailStatus || "pending";
    let pdfBuffer: Buffer | undefined;

    // If paid and PDF not yet generated, generate now
    if (order.paymentStatus === "paid" && pdfStatus !== "generated") {
      try {
        const wm = await getOrGenerateWatermarkedPdf({
          orderNumber: order.orderNumber,
          customerPhone,
          customerEmail: order.targetEmail,
        });
        pdfStatus = "generated";
        pdfBuffer = wm.fileBuffer;

        await ordersCol.updateOne(
          { _id: order._id },
          {
            $set: {
              pdfStatus: "generated",
              pdfGeneratedAt: new Date(),
            },
          }
        );
      } catch (err: any) {
        console.error("[Order Status PDF Gen Error]:", err);
        pdfStatus = "failed";
      }
    }

    // If paid, PDF is ready and Email not yet sent, send now
    if (order.paymentStatus === "paid" && pdfStatus === "generated" && emailStatus !== "sent") {
      try {
        if (!pdfBuffer) {
          const wm = await getOrGenerateWatermarkedPdf({
            orderNumber: order.orderNumber,
            customerPhone,
            customerEmail: order.targetEmail,
          });
          pdfBuffer = wm.fileBuffer;
        }

        const emailRes = await sendPersonalizedBookEmail({
          orderNumber: order.orderNumber,
          customerName: order.customerName,
          customerEmail: order.targetEmail,
          customerPhone,
          trxId: order.trxId || "PAID",
          amount: order.amount,
          downloadToken: order.downloadToken,
          watermarkedPdfBuffer: pdfBuffer,
        });

        if (emailRes.success) {
          emailStatus = "sent";
          await ordersCol.updateOne(
            { _id: order._id },
            {
              $set: {
                emailStatus: "sent",
                emailSentAt: new Date(),
              },
            }
          );
        } else {
          emailStatus = "failed";
        }
      } catch (err: any) {
        console.error("[Order Status Email Send Error]:", err);
        emailStatus = "failed";
      }
    }

    return NextResponse.json({
      success: true,
      order: {
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerEmail: order.targetEmail,
        customerPhone,
        amount: order.amount,
        paymentStatus: order.paymentStatus,
        trxId: order.trxId || "PAID",
        pdfStatus,
        emailStatus,
        downloadCount: order.downloadCount || 0,
        downloadToken: order.downloadToken,
        createdAt: order.createdAt,
      },
    });
  } catch (error: any) {
    console.error("[Order Status API Error]:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
