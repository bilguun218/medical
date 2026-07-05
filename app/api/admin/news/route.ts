import { NextResponse } from "next/server";
import { apiError, requireAdminSession } from "@/lib/admin";
import { db } from "@/lib/db";
import { articleSchema } from "@/lib/validators";

export async function GET() {
  try {
    await requireAdminSession();
    const articles = await db.article.findMany({
      include: { category: true, author: true },
      orderBy: { updatedAt: "desc" }
    });
    return NextResponse.json(articles);
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireAdminSession();
    const payload = await request.json();
    const parsed = articleSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const article = await db.article.create({
      data: {
        ...parsed.data,
        categoryId: parsed.data.categoryId || null,
        coverImageId: parsed.data.coverImageId || null,
        authorId: session.user.id,
        titleEn: parsed.data.titleEn || null,
        excerptMn: parsed.data.excerptMn || null,
        excerptEn: parsed.data.excerptEn || null,
        bodyEn: parsed.data.bodyEn || null,
        seoTitleMn: parsed.data.seoTitleMn || null,
        seoTitleEn: parsed.data.seoTitleEn || null,
        seoDescriptionMn: parsed.data.seoDescriptionMn || null,
        seoDescriptionEn: parsed.data.seoDescriptionEn || null,
        publishedAt: parsed.data.status === "PUBLISHED" ? parsed.data.publishedAt ? new Date(parsed.data.publishedAt) : new Date() : null
      }
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
