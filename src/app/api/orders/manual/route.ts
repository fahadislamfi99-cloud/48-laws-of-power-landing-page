import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

/**
 * Public manual order creation is disabled for payment integrity.
 * Manual orders can only be created by verified admins via /api/admin/orders.
 */
export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      {
        success: false,
        message: "Public manual order submission is disabled. All purchases must be completed via official verified bKash payment gateway.",
      },
      { status: 403 }
    );
  }

  return NextResponse.json(
    {
      success: false,
      message: "Please use the Admin Dashboard (/admin/orders) to create verified manual orders.",
    },
    { status: 400 }
  );
}
