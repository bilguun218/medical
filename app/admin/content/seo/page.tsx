import { AdminShell } from "@/components/admin/admin-shell";
import { ContentNav } from "@/components/admin/content/content-nav";
import { SeoContentForm } from "@/components/admin/content/seo-content-form";
import { getEditableSeoRecords } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function AdminSeoContentPage() {
  const records = await getEditableSeoRecords();

  return (
    <AdminShell title="Контент: SEO" activePath="/admin/content/seo">
      <ContentNav activePath="/admin/content/seo" />
      <SeoContentForm initialValue={records} />
    </AdminShell>
  );
}
