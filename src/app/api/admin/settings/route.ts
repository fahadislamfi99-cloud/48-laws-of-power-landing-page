import { NextRequest, NextResponse } from "next/server";
import { getCollection, SiteSettings } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";
import { ensureDatabaseSeeded } from "@/lib/seed";

export async function GET() {
  try {
    await ensureDatabaseSeeded();
    const settingsCol = await getCollection<SiteSettings>("site_settings");
    const settings = await settingsCol.findOne({});

    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    console.error("[Admin Get Settings Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      supportWhatsapp,
      supportPhone,
      supportEmail,
      bkashPersonalNumber,
      telegramBotToken,
      telegramChatId,
      metaPixelId,
      metaAccessToken,
      downloadExpiryHours,
    } = body;

    const settingsCol = await getCollection<SiteSettings>("site_settings");
    const settings = await settingsCol.findOne({});

    const updates: Partial<SiteSettings> = {
      updatedAt: new Date(),
    };

    if (supportWhatsapp !== undefined) updates.supportWhatsapp = supportWhatsapp.trim();
    if (supportPhone !== undefined) updates.supportPhone = supportPhone.trim();
    if (supportEmail !== undefined) updates.supportEmail = supportEmail.trim();
    if (bkashPersonalNumber !== undefined) updates.bkashPersonalNumber = bkashPersonalNumber.trim();
    if (telegramBotToken !== undefined) updates.telegramBotToken = telegramBotToken.trim();
    if (telegramChatId !== undefined) updates.telegramChatId = telegramChatId.trim();
    if (metaPixelId !== undefined) updates.metaPixelId = metaPixelId.trim();
    if (metaAccessToken !== undefined) updates.metaAccessToken = metaAccessToken.trim();
    if (downloadExpiryHours !== undefined) updates.downloadExpiryHours = Number(downloadExpiryHours);

    if (settings) {
      await settingsCol.updateOne({ _id: settings._id }, { $set: updates });
    } else {
      await settingsCol.insertOne({
        supportWhatsapp: supportWhatsapp || "8801700000000",
        supportPhone: supportPhone || "+8801700000000",
        supportEmail: supportEmail || "support@48laws.com",
        bkashPersonalNumber: bkashPersonalNumber || "01700000000",
        downloadExpiryHours: 720,
        ...updates,
        updatedAt: new Date(),
      });
    }

    return NextResponse.json({ success: true, message: "Settings updated successfully" });
  } catch (error: any) {
    console.error("[Admin Update Settings Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update settings" },
      { status: 500 }
    );
  }
}
