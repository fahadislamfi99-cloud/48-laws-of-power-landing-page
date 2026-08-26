import { NextRequest, NextResponse } from "next/server";
import { getCollection, Order } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";
import { ObjectId } from "mongodb";
import crypto from "crypto";

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
    const { orderStatus, paymentStatus, notes, trxId, regenerateToken } = body;

    const ordersCol = await getCollection<Order>("orders");
    const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { orderNumber: id };

    const existing = await ordersCol.findOne(query);
    if (!existing) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    const updates: Partial<Order> = {
      updatedAt: new Date(),
    };

    if (orderStatus) updates.orderStatus = orderStatus;
    if (paymentStatus) updates.paymentStatus = paymentStatus;
    if (notes !== undefined) updates.notes = notes;
    if (trxId !== undefined) updates.trxId = trxId.trim().toUpperCase();

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
