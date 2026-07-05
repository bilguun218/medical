import { NextResponse } from "next/server";
import { apiError, requireAdminSession } from "@/lib/admin";
import { db } from "@/lib/db";
import { articleSchema } from "@/lib/validators";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminSession();
    const { id } = await params;
    const payload = await request.json();
    const parsed = articleSchema.partial().safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const article = await db.article.update({
      where: { id },
      data: {
        ...parsed.data,
        categoryId: parsed.data.categoryId !== undefined ? parsed.data.categoryId || null : undefined,
        coverImageId: parsed.data.coverImageId !== undefined ? parsed.data.coverImageId || null : undefined,
        publishedAt:
          parsed.data.status === "PUBLISHED"
            ? parsed.data.publishedAt ? new Date(parsed.data.publishedAt) : new Date()
            : parsed.data.status === "DRAFT"
              ? null
              : parsed.data.publishedAt
                ? new Date(parsed.data.publishedAt)
                : undefined
      }
    });

    return NextResponse.json(article);
  } catch (error) {
    return apiError(error);
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminSession();
    const { id } = await params;
    await db.article.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
