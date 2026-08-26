import { NextRequest, NextResponse } from "next/server";
import { getCollection, Customer, Order } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const customersCol = await getCollection<Customer>("customers");
    const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { email: id };

    const customer = await customersCol.findOne(query);
    if (!customer) {
      return NextResponse.json({ success: false, message: "Customer not found" }, { status: 404 });
    }

    const ordersCol = await getCollection<Order>("orders");
    const orders = await ordersCol
      .find({ targetEmail: customer.email })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      customer,
      orders,
    });
  } catch (error: any) {
    console.error("[Admin Get Customer Detail Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch customer" },
      { status: 500 }
    );
  }
}

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
    const { name, phone, status, notes } = body;

    const customersCol = await getCollection<Customer>("customers");
    const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { email: id };

    const updates: Partial<Customer> = {
      updatedAt: new Date(),
    };

    if (name) updates.name = name.trim();
    if (phone !== undefined) updates.phone = phone.trim();
    if (status) updates.status = status;
    if (notes !== undefined) updates.notes = notes;

    await customersCol.updateOne(query, { $set: updates });

    return NextResponse.json({ success: true, message: "Customer updated successfully" });
  } catch (error: any) {
    console.error("[Admin Update Customer Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update customer" },
      { status: 500 }
    );
  }
}
