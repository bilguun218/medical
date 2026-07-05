import { NextResponse } from "next/server";
import { apiError, requireAdminSession } from "@/lib/admin";
import { db } from "@/lib/db";
import { saveMediaUpload } from "@/lib/media";
import { buildProductUpdateData } from "@/lib/product-admin-input";
import { productSchema } from "@/lib/validators";

function getUploadFile(formData: FormData, key: string) {
  const value = formData.get(key);
  return value instanceof File && value.size > 0 ? value : null;
}

function isPdfFile(file: File) {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

async function attachProductMedia(productId: string, file: File, role: "GALLERY" | "DATASHEET", sortOrder: number, titleMn?: string, titleEn?: string) {
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

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminSession();
    const { id } = await params;
    const product = await db.product.findUnique({
      where: { id },
      include: { category: true, media: { include: { media: true } } }
    });
    return product ? NextResponse.json(product) : NextResponse.json({ error: "Not found" }, { status: 404 });
  } catch (error) {
    return apiError(error);
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminSession();
    const { id } = await params;
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

    const parsed = productSchema.partial().safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    if (uploadedPdf && !isPdfFile(uploadedPdf)) {
      return NextResponse.json({ error: "PDF файл сонгоно уу." }, { status: 400 });
    }

    const product = await db.product.update({
      where: { id },
      data: buildProductUpdateData(parsed.data)
    });

    const currentMediaCount = await db.productMedia.count({ where: { productId: id } });

    if (uploadedFile) {
      await attachProductMedia(id, uploadedFile, "GALLERY", currentMediaCount, parsed.data.titleMn, parsed.data.titleEn);
    }

    if (uploadedPdf) {
      await attachProductMedia(id, uploadedPdf, "DATASHEET", currentMediaCount + (uploadedFile ? 1 : 0), parsed.data.titleMn, parsed.data.titleEn);
    }

    return NextResponse.json(product);
  } catch (error) {
    return apiError(error);
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminSession();
    const { id } = await params;
    await db.product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
