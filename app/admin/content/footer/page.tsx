import { AdminShell } from "@/components/admin/admin-shell";
import { ContentNav } from "@/components/admin/content/content-nav";
import { FooterContentForm } from "@/components/admin/content/footer-content-form";
import { getCmsContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function AdminFooterContentPage() {
  const content = await getCmsContent("footer");

  return (
    <AdminShell title="Контент: Хөл хэсэг" activePath="/admin/content/footer">
      <ContentNav activePath="/admin/content/footer" />
      <FooterContentForm initialValue={content} />
    </AdminShell>
  );
}
