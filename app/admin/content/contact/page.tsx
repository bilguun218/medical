import { AdminShell } from "@/components/admin/admin-shell";
import { ContactContentForm } from "@/components/admin/content/contact-content-form";
import { ContentNav } from "@/components/admin/content/content-nav";
import { getCmsContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function AdminContactContentPage() {
  const content = await getCmsContent("contact");

  return (
    <AdminShell title="Контент: Холбоо барих" activePath="/admin/content/contact">
      <ContentNav activePath="/admin/content/contact" />
      <ContactContentForm initialValue={content} />
    </AdminShell>
  );
}
