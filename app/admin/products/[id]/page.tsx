import { notFound } from "next/navigation";
import { ProductForm, type AdminProductFormProduct } from "@/components/admin/product-form";
import { AdminShell } from "@/components/admin/admin-shell";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";

type PageProps = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

async function getData(id: string) {
  const [product, categories] = await Promise.all([
    db.product.findUnique({
      where: { id },
      include: {
        media: { include: { media: true }, orderBy: { sortOrder: "asc" } }
      }
    }),
    db.productCategory.findMany({ orderBy: { sortOrder: "asc" } })
  ]);

  return { product, categories };
}

function serializeProduct(product: NonNullable<Awaited<ReturnType<typeof getData>>["product"]>): AdminProductFormProduct {
  return {
    id: product.id,
    categoryId: product.categoryId,
    tag: product.tag,
    titleMn: product.titleMn,
    titleEn: product.titleEn,
    summaryMn: product.summaryMn,
    summaryEn: product.summaryEn,
    descriptionMn: product.descriptionMn,
    descriptionEn: product.descriptionEn,
    specifications: product.specifications,
    status: product.status,
    seoTitleMn: product.seoTitleMn,
    seoTitleEn: product.seoTitleEn,
    seoDescriptionMn: product.seoDescriptionMn,
    seoDescriptionEn: product.seoDescriptionEn,
    media: product.media.map((item) => ({
      id: item.id,
      role: item.role,
      media: {
        id: item.media.id,
        type: item.media.type,
        url: item.media.url,
        filename: item.media.filename
      }
    }))
  };
}

export default async function AdminProductEditPage({ params }: PageProps) {
  const { id } = await params;
  const { product, categories } = await getData(id);

  if (!product) {
    notFound();
  }

  return (
    <AdminShell title="Бүтээгдэхүүн засах" activePath="/admin/products">
      <Card>
        <CardHeader>
          <CardTitle>{product.titleMn}</CardTitle>
          <CardDescription>Техникийн үзүүлэлт, PDF хавсралт, зураг, SEO болон нийтлэх төлөвийг шинэчилнэ.</CardDescription>
        </CardHeader>
        <div className="px-6 pb-6">
          <ProductForm categories={categories} product={serializeProduct(product)} />
        </div>
      </Card>
    </AdminShell>
  );
}
