import { notFound } from "next/navigation";
import { ArticleForm } from "@/components/admin/article-form";
import { AdminShell } from "@/components/admin/admin-shell";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditArticlePage({ params }: PageProps) {
  const { id } = await params;
  const [article, categories] = await Promise.all([
    db.article.findUnique({ where: { id }, include: { coverImage: true } }),
    db.newsCategory.findMany({ orderBy: { titleMn: "asc" } })
  ]);

  if (!article) {
    notFound();
  }

  return (
    <AdminShell title="Мэдээ засах" activePath="/admin/news">
      <Card>
        <CardHeader>
          <CardTitle>{article.titleMn}</CardTitle>
          <CardDescription>Нийтлэлийн мэдээлэл, зураг, төлөв болон нийтлэх огноог засах.</CardDescription>
        </CardHeader>
        <div className="px-6 pb-6">
          <ArticleForm categories={categories} article={article} />
        </div>
      </Card>
    </AdminShell>
  );
}
