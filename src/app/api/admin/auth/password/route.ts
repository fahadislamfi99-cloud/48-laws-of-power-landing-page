import { NextRequest, NextResponse } from "next/server";
import { getCollection, AdminUser } from "@/lib/mongodb";
import { getAdminSession, verifyPassword, hashPassword } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function PUT(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { name, email, currentPassword, newPassword } = await req.json();
    const adminsCol = await getCollection<AdminUser>("admins");

    const admin = await adminsCol.findOne({ _id: new ObjectId(session.adminId) });
    if (!admin) {
      return NextResponse.json({ success: false, message: "Admin user not found" }, { status: 404 });
    }

    const updates: Partial<AdminUser> = {
      updatedAt: new Date(),
    };

    if (name) updates.name = name.trim();
    if (email) updates.email = email.trim().toLowerCase();

    // If changing password, verify current password first
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { success: false, message: "Current password is required to set a new password" },
          { status: 400 }
        );
      }

      const isMatch = await verifyPassword(currentPassword, admin.passwordHash);
      if (!isMatch) {
        return NextResponse.json(
          { success: false, message: "Current password is incorrect" },
          { status: 400 }
        );
      }

      if (newPassword.length < 6) {
        return NextResponse.json(
          { success: false, message: "New password must be at least 6 characters" },
          { status: 400 }
        );
      }

      updates.passwordHash = await hashPassword(newPassword);
    }

    await adminsCol.updateOne({ _id: admin._id }, { $set: updates });

    return NextResponse.json({
      success: true,
      message: "Profile and security updated successfully",
    });
  } catch (error: any) {
    console.error("[Admin Password Update Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update profile" },
      { status: 500 }
    );
  }
}
