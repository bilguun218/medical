import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { apiError, requireAdminSession } from "@/lib/admin";
import { db } from "@/lib/db";
import { productCategorySchema } from "@/lib/validators";

type RouteContext = { params: Promise<{ id: string }> };

function revalidateCategoryPaths() {
  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
  revalidatePath("/mn/products");
  revalidatePath("/en/products");
}

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    await requireAdminSession();
    const { id } = await params;
    const category = await db.productCategory.findUnique({
      where: { id },
      include: { _count: { select: { products: true } } }
    });

    return category ? NextResponse.json(category) : NextResponse.json({ error: "Not found" }, { status: 404 });
  } catch (error) {
    return apiError(error);
  }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    await requireAdminSession();
    const { id } = await params;
    const payload = await request.json();
    const parsed = productCategorySchema.partial().safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const category = await db.productCategory.update({
      where: { id },
      data: {
        titleMn: parsed.data.titleMn,
        titleEn: parsed.data.titleEn !== undefined ? parsed.data.titleEn || parsed.data.titleMn : undefined,
        descriptionMn: parsed.data.descriptionMn !== undefined ? parsed.data.descriptionMn || null : undefined,
        descriptionEn: parsed.data.descriptionEn !== undefined ? parsed.data.descriptionEn || null : undefined,
        sortOrder: parsed.data.sortOrder
      }
    });

    revalidateCategoryPaths();

    return NextResponse.json(category);
  } catch (error) {
    return apiError(error);
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    await requireAdminSession();
    const { id } = await params;
    const productCount = await db.product.count({ where: { categoryId: id } });

    if (productCount > 0) {
      return NextResponse.json(
        { error: "Энэ ангилалд бүтээгдэхүүн холбогдсон байна. Эхлээд бүтээгдэхүүнүүдийн ангиллыг солино уу." },
        { status: 409 }
      );
    }

    await db.productCategory.delete({ where: { id } });
    revalidateCategoryPaths();

    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
