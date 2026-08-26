import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    admin: {
      id: session.adminId,
      username: session.username,
      email: session.email,
      name: session.name,
      role: session.role,
    },
  });
}
