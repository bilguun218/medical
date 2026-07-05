import { ProductForm } from "@/components/admin/product-form";
import { AdminShell } from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getData() {
  try {
    const [products, categories] = await Promise.all([
      db.product.findMany({ include: { category: true }, orderBy: { updatedAt: "desc" } }),
      db.productCategory.findMany({ orderBy: { sortOrder: "asc" } })
    ]);
    return { products, categories };
  } catch {
    return { products: [], categories: [] };
  }
}

async function deleteProduct(formData: FormData) {
  "use server";
  const id = formData.get("id")?.toString();
  if (!id) return;
  await db.product.delete({ where: { id } });
  revalidatePath("/admin/products");
}

export default async function AdminProductsPage() {
  const { products, categories } = await getData();

  return (
    <AdminShell title="Бүтээгдэхүүн" activePath="/admin/products">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Бүтээгдэхүүн нэмэх</CardTitle>
            <CardDescription>Хоёр хэлний контент, ноорог/нийтлэх төлөв, SEO талбар, зураг болон PDF холбоос зэрэг оруулах боломжтой.</CardDescription>
          </CardHeader>
          <div className="px-6 pb-6">
            {categories.length > 0 ? (
              <ProductForm categories={categories} />
            ) : (
              <p className="text-sm text-slate-500">Бүтээгдэхүүн нэмэхээс өмнө ангилал үүсгэх шаардлагатай.</p>
            )}
          </div>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Бүтээгдэхүүний бүртгэл</CardTitle>
            <CardDescription>{products.length} нийт бичлэг</CardDescription>
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
                {products.map((product) => (
                  <tr key={product.id} className="border-b last:border-0">
                    <td className="py-3 font-medium">{product.titleMn}</td>
                    <td className="py-3 text-slate-500">{product.category.titleMn}</td>
                    <td className="py-3">
                      <Badge>{product.status}</Badge>
                    </td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/products/${product.id}`}>Засах</Link>
                        </Button>
                        <form action={deleteProduct}>
                          <input type="hidden" name="id" value={product.id} />
                          <Button type="submit" variant="destructive" size="sm">
                            Устгах
                          </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-500">
                      Одоогоор бүтээгдэхүүн алга.
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
