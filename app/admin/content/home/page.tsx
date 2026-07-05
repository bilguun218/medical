import { AdminShell } from "@/components/admin/admin-shell";
import { ContentNav } from "@/components/admin/content/content-nav";
import { HomeContentForm } from "@/components/admin/content/home-content-form";
import { getCmsContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function AdminHomeContentPage() {
  const content = await getCmsContent("home");

  return (
    <AdminShell title="Контент: Нүүр" activePath="/admin/content/home">
      <ContentNav activePath="/admin/content/home" />
      <HomeContentForm initialValue={content} />
    </AdminShell>
  );
}
