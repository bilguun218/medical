import { AdminShell } from "@/components/admin/admin-shell";
import { ContentNav } from "@/components/admin/content/content-nav";
import { HeaderContentForm } from "@/components/admin/content/header-content-form";
import { getCmsContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function AdminHeaderContentPage() {
  const content = await getCmsContent("header");

  return (
    <AdminShell title="Контент: Толгой хэсэг" activePath="/admin/content/header">
      <ContentNav activePath="/admin/content/header" />
      <HeaderContentForm initialValue={content} />
    </AdminShell>
  );
}
