import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { apiError, requireAdminSession } from "@/lib/admin";
import { db } from "@/lib/db";
import { productCategorySchema } from "@/lib/validators";

function revalidateCategoryPaths() {
  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
  revalidatePath("/mn/products");
  revalidatePath("/en/products");
}

export async function GET() {
  try {
    await requireAdminSession();
    const categories = await db.productCategory.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }]
    });

    return NextResponse.json(categories);
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const payload = await request.json();
    const parsed = productCategorySchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const category = await db.productCategory.create({
      data: {
        titleMn: parsed.data.titleMn,
        titleEn: parsed.data.titleEn || parsed.data.titleMn,
        descriptionMn: parsed.data.descriptionMn || null,
        descriptionEn: parsed.data.descriptionEn || null,
        sortOrder: parsed.data.sortOrder
      }
    });

    revalidateCategoryPaths();

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
