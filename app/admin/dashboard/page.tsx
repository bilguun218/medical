import { Activity, Boxes, MessageSquare, Newspaper } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getMetrics() {
  try {
    const [products, articles, inquiries, newInquiries] = await Promise.all([
      db.product.count(),
      db.article.count(),
      db.contactInquiry.count(),
      db.contactInquiry.count({ where: { status: "NEW" } })
    ]);
    return { products, articles, inquiries, newInquiries };
  } catch {
    return { products: 0, articles: 0, inquiries: 0, newInquiries: 0 };
  }
}

export default async function DashboardPage() {
  const metrics = await getMetrics();

  return (
    <AdminShell title="Хяналтын самбар" activePath="/admin/dashboard">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Бүтээгдэхүүн", value: metrics.products, icon: Boxes },
          { label: "Нийтлэл", value: metrics.articles, icon: Newspaper },
          { label: "Санал хүсэлт", value: metrics.inquiries, icon: MessageSquare },
          { label: "Шинэ санал хүсэлт", value: metrics.newInquiries, icon: Activity }
        ].map((item) => (
          <Card key={item.label}>
            <CardHeader>
              <item.icon className="h-5 w-5 text-teal" />
              <CardTitle className="text-3xl">{item.value}</CardTitle>
              <CardDescription>{item.label}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Үйл ажиллагааны хүрээ</CardTitle>
          <CardDescription>
            Бүтээгдэхүүний каталог, мэдээний нийтлэл, холбоо барих санал хүсэлт, медиа мета мэдээлэл, SEO бүртгэл, тохиргоог Prisma-ар PostgreSQL дээр загварчилсан.
          </CardDescription>
        </CardHeader>
      </Card>
    </AdminShell>
  );
}
