import { NextRequest, NextResponse } from "next/server";
import { getCollection, Product } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";
import { ensureDatabaseSeeded } from "@/lib/seed";

export async function GET() {
  try {
    await ensureDatabaseSeeded();
    const productsCol = await getCollection<Product>("products");
    const product = await productsCol.findOne({});

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error("[Admin Get Product Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch product" },
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
      title,
      titleEn,
      subtitle,
      price,
      originalPrice,
      discountPercent,
      fileName,
      fileSize,
      fileUrl,
      pages,
      isActive,
    } = body;

    const productsCol = await getCollection<Product>("products");
    const product = await productsCol.findOne({});

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    const updates: Partial<Product> = {
      updatedAt: new Date(),
    };

    if (title !== undefined) updates.title = title.trim();
    if (titleEn !== undefined) updates.titleEn = titleEn.trim();
    if (subtitle !== undefined) updates.subtitle = subtitle.trim();
    if (price !== undefined) updates.price = Number(price);
    if (originalPrice !== undefined) updates.originalPrice = Number(originalPrice);
    if (discountPercent !== undefined) updates.discountPercent = Number(discountPercent);
    if (fileName !== undefined) updates.fileName = fileName.trim();
    if (fileSize !== undefined) updates.fileSize = fileSize.trim();
    if (fileUrl !== undefined) updates.fileUrl = fileUrl.trim();
    if (pages !== undefined) updates.pages = Number(pages);
    if (isActive !== undefined) updates.isActive = Boolean(isActive);

    await productsCol.updateOne({ _id: product._id }, { $set: updates });

    return NextResponse.json({
      success: true,
      message: "Product details updated successfully",
    });
  } catch (error: any) {
    console.error("[Admin Update Product Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update product" },
      { status: 500 }
    );
  }
}
