import { NextRequest, NextResponse } from "next/server";
import { getCollection, AdminUser } from "@/lib/mongodb";
import {
  verifyPassword,
  generateAdminToken,
  setAdminSessionCookie,
  checkLoginRateLimit,
  resetLoginRateLimit,
} from "@/lib/auth";
import { ensureDatabaseSeeded } from "@/lib/seed";

export async function POST(req: NextRequest) {
  try {
    await ensureDatabaseSeeded();

    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rateCheck = checkLoginRateLimit(clientIp);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many login attempts. Please wait ${rateCheck.waitSeconds} seconds before trying again.`,
        },
        { status: 429 }
      );
    }

    const { usernameOrEmail, password } = await req.json();

    if (!usernameOrEmail || !password) {
      return NextResponse.json(
        { success: false, message: "Username/Email and password are required" },
        { status: 400 }
      );
    }

    const identifier = usernameOrEmail.trim().toLowerCase();
    const adminsCol = await getCollection<AdminUser>("admins");

    const admin = await adminsCol.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Invalid username or password" },
        { status: 401 }
      );
    }

    const isMatch = await verifyPassword(password, admin.passwordHash);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid username or password" },
        { status: 401 }
      );
    }

    resetLoginRateLimit(clientIp);

    const token = await generateAdminToken({
      adminId: String(admin._id),
      username: admin.username,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    await setAdminSessionCookie(token);

    return NextResponse.json({
      success: true,
      message: "Login successful",
      admin: {
        id: String(admin._id),
        username: admin.username,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error: any) {
    console.error("[Admin Login Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
