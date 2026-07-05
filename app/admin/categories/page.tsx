import { AdminShell } from "@/components/admin/admin-shell";
import { CategoryManager } from "@/components/admin/category-manager";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getCategories() {
  try {
    const categories = await db.productCategory.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }]
    });

    return categories.map((category) => ({
      id: category.id,
      titleMn: category.titleMn,
      titleEn: category.titleEn,
      descriptionMn: category.descriptionMn,
      descriptionEn: category.descriptionEn,
      sortOrder: category.sortOrder,
      productCount: category._count.products
    }));
  } catch {
    return [];
  }
}

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <AdminShell title="Ангилал" activePath="/admin/categories">
      <CategoryManager categories={categories} />
    </AdminShell>
  );
}
