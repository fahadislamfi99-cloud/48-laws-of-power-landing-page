import { NextRequest, NextResponse } from "next/server";
import { getCollection, Order } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";
import { ObjectId } from "mongodb";
import crypto from "crypto";
import { getOrGenerateWatermarkedPdf } from "@/lib/watermarkPdf";
import { sendPersonalizedBookEmail } from "@/lib/emailDelivery";

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
    const {
      orderStatus,
      paymentStatus,
      notes,
      trxId,
      customerPhone,
      regenerateToken,
      action,
    } = body;

    const ordersCol = await getCollection<Order>("orders");
    const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { orderNumber: id };

    const existing = await ordersCol.findOne(query);
    if (!existing) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    const phone = customerPhone || existing.customerPhone || existing.payerPhone || "01700000000";

    // Action 1: Regenerate Personalized Watermarked PDF
    if (action === "regenerate_pdf") {
      try {
        const wmResult = await getOrGenerateWatermarkedPdf({
          orderNumber: existing.orderNumber,
          customerPhone: phone,
          customerEmail: existing.targetEmail,
          forceRegenerate: true,
        });

        await ordersCol.updateOne(query, {
          $set: {
            pdfStatus: "generated",
            pdfGeneratedAt: new Date(),
            customerPhone: phone,
            updatedAt: new Date(),
          },
        });

        return NextResponse.json({
          success: true,
          message: `Personalized PDF regenerated successfully (${(wmResult.fileSize / 1024 / 1024).toFixed(2)} MB, phone: ${phone})`,
          pdfStatus: "generated",
        });
      } catch (err: any) {
        console.error("[Admin PDF Regeneration Error]:", err);
        return NextResponse.json({ success: false, message: `PDF Generation Failed: ${err.message}` }, { status: 500 });
      }
    }

    // Action 2: Resend PDF via Gmail SMTP
    if (action === "resend_email") {
      try {
        const wmResult = await getOrGenerateWatermarkedPdf({
          orderNumber: existing.orderNumber,
          customerPhone: phone,
          customerEmail: existing.targetEmail,
        });

        const emailResult = await sendPersonalizedBookEmail({
          orderNumber: existing.orderNumber,
          customerName: existing.customerName,
          customerEmail: existing.targetEmail,
          customerPhone: phone,
          trxId: existing.trxId || "PAID",
          amount: existing.amount,
          downloadToken: existing.downloadToken,
          watermarkedPdfBuffer: wmResult.fileBuffer,
        });

        if (emailResult.success) {
          await ordersCol.updateOne(query, {
            $set: {
              emailStatus: "sent",
              emailSentAt: new Date(),
              updatedAt: new Date(),
            },
          });
          return NextResponse.json({
            success: true,
            message: `Email with personalized PDF successfully delivered to ${existing.targetEmail}`,
            emailStatus: "sent",
          });
        } else {
          return NextResponse.json({
            success: false,
            message: `Email Delivery Failed: ${emailResult.error}`,
          }, { status: 500 });
        }
      } catch (err: any) {
        console.error("[Admin Email Resend Error]:", err);
        return NextResponse.json({ success: false, message: `Email Send Error: ${err.message}` }, { status: 500 });
      }
    }

    // Standard Order Updates
    const updates: Partial<Order> = {
      updatedAt: new Date(),
    };

    if (orderStatus) updates.orderStatus = orderStatus;
    if (paymentStatus) updates.paymentStatus = paymentStatus;
    if (notes !== undefined) updates.notes = notes;
    if (trxId !== undefined) updates.trxId = trxId.trim().toUpperCase();
    if (customerPhone !== undefined) updates.customerPhone = customerPhone.trim();

    if (regenerateToken) {
      updates.downloadToken = crypto.randomBytes(24).toString("hex");
    }

    await ordersCol.updateOne(query, { $set: updates });

    return NextResponse.json({
      success: true,
      message: "Order updated successfully",
      downloadToken: updates.downloadToken || existing.downloadToken,
    });
  } catch (error: any) {
    console.error("[Admin Update Order Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update order" },
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
    const ordersCol = await getCollection<Order>("orders");
    const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { orderNumber: id };

    const result = await ordersCol.deleteOne(query);

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Order deleted successfully" });
  } catch (error: any) {
    console.error("[Admin Delete Order Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete order" },
      { status: 500 }
    );
  }
}
