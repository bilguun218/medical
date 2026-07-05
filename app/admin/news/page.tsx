import Link from "next/link";
import { ArticleForm } from "@/components/admin/article-form";
import { AdminShell } from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

async function getData() {
  try {
    const [articles, categories] = await Promise.all([
      db.article.findMany({ include: { category: true, coverImage: true }, orderBy: { updatedAt: "desc" } }),
      db.newsCategory.findMany({ orderBy: { titleMn: "asc" } })
    ]);
    return { articles, categories };
  } catch {
    return { articles: [], categories: [] };
  }
}

async function deleteArticle(formData: FormData) {
  "use server";
  const id = formData.get("id")?.toString();
  if (!id) return;
  await db.article.delete({ where: { id } });
  revalidatePath("/admin/news");
}

async function toggleArticleStatus(formData: FormData) {
  "use server";
  const id = formData.get("id")?.toString();
  const status = formData.get("status")?.toString() === "PUBLISHED" ? "PUBLISHED" : "DRAFT";
  if (!id) return;
  await db.article.update({
    where: { id },
    data: {
      status,
      publishedAt: status === "PUBLISHED" ? new Date() : null
    }
  });
  revalidatePath("/admin/news");
  revalidatePath("/mn/news");
  revalidatePath("/en/news");
}

export default async function AdminNewsPage() {
  const { articles, categories } = await getData();

  return (
    <AdminShell title="Мэдээ" activePath="/admin/news">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Мэдээ нэмэх</CardTitle>
            <CardDescription>Ноорог/нийтлэх төлөвтэй, SEO мета мэдээлэлтэй, хоёр хэлний нийтлэл үүсгэх боломжтой.</CardDescription>
          </CardHeader>
          <div className="px-6 pb-6">
            <ArticleForm categories={categories} />
          </div>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Мэдээний бүртгэл</CardTitle>
            <CardDescription>{articles.length} нийт бичлэг</CardDescription>
          </CardHeader>
          <div className="overflow-x-auto px-6 pb-6">
            <table className="w-full text-left text-sm">
              <thead className="border-b text-slate-500">
                <tr>
                  <th className="py-3">Гарчиг</th>
                  <th className="py-3">Ангилал</th>
                  <th className="py-3">Төлөв</th>
                  <th className="py-3">Үйлдэл</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id} className="border-b last:border-0">
                    <td className="py-3 font-medium">{article.titleMn}</td>
                    <td className="py-3 text-slate-500">{article.category?.titleMn ?? "Ангилалгүй"}</td>
                    <td className="py-3">
                      <Badge>{article.status}</Badge>
                    </td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-2">
                        <Button type="button" variant="outline" size="sm" asChild>
                          <Link href={`/admin/news/${article.id}`}>Засах</Link>
                        </Button>
                        <form action={toggleArticleStatus}>
                          <input type="hidden" name="id" value={article.id} />
                          <input type="hidden" name="status" value={article.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED"} />
                          <Button type="submit" variant="outline" size="sm">
                            {article.status === "PUBLISHED" ? "Нуух" : "Нийтлэх"}
                          </Button>
                        </form>
                        <form action={deleteArticle}>
                        <input type="hidden" name="id" value={article.id} />
                        <Button type="submit" variant="destructive" size="sm">
                          Устгах
                        </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
                {articles.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-slate-500">
                      Одоогоор мэдээ алга.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminShell>
  );
}
