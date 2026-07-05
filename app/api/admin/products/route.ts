import { NextResponse } from "next/server";
import { apiError, requireAdminSession } from "@/lib/admin";
import { db } from "@/lib/db";
import { saveMediaUpload } from "@/lib/media";
import { buildProductCreateData } from "@/lib/product-admin-input";
import { productSchema } from "@/lib/validators";

function getUploadFile(formData: FormData, key: string) {
  const value = formData.get(key);
  return value instanceof File && value.size > 0 ? value : null;
}

function isPdfFile(file: File) {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

async function attachProductMedia(productId: string, file: File, role: "GALLERY" | "DATASHEET", sortOrder: number, titleMn: string, titleEn?: string) {
  const media = await saveMediaUpload(file, {
    altMn: titleMn,
    altEn: titleEn || titleMn
  });

  await db.productMedia.create({
    data: {
      productId,
      mediaId: media.id,
      role,
      sortOrder
    }
  });
}

export async function GET() {
  try {
    await requireAdminSession();
    const products = await db.product.findMany({
      include: { category: true, media: { include: { media: true } } },
      orderBy: { updatedAt: "desc" }
    });
    return NextResponse.json(products);
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();

    const contentType = request.headers.get("content-type") || "";
    let payload: Record<string, unknown> = {};
    let uploadedFile: File | null = null;
    let uploadedPdf: File | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      uploadedFile = getUploadFile(formData, "image");
      uploadedPdf = getUploadFile(formData, "pdf");

      for (const [key, value] of formData.entries()) {
        if (typeof value === "string") {
          payload[key] = value;
        }
      }
    } else {
      payload = await request.json();
    }

    const parsed = productSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    if (uploadedPdf && !isPdfFile(uploadedPdf)) {
      return NextResponse.json({ error: "PDF файл сонгоно уу." }, { status: 400 });
    }

    const product = await db.product.create({
      data: buildProductCreateData(parsed.data)
    });

    if (uploadedFile) {
      await attachProductMedia(product.id, uploadedFile, "GALLERY", 0, parsed.data.titleMn, parsed.data.titleEn);
    }

    if (uploadedPdf) {
      await attachProductMedia(product.id, uploadedPdf, "DATASHEET", 1, parsed.data.titleMn, parsed.data.titleEn);
    }

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
