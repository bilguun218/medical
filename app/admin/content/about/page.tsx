import { AdminShell } from "@/components/admin/admin-shell";
import { AboutContentForm } from "@/components/admin/content/about-content-form";
import { ContentNav } from "@/components/admin/content/content-nav";
import { getCmsContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function AdminAboutContentPage() {
  const content = await getCmsContent("about");

  return (
    <AdminShell title="Контент: Бидний тухай" activePath="/admin/content/about">
      <ContentNav activePath="/admin/content/about" />
      <AboutContentForm initialValue={content} />
    </AdminShell>
  );
}
