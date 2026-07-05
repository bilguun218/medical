import { ImageIcon, Upload } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { MediaDeleteButton } from "@/components/admin/media-delete-button";
import { MediaLibraryUploader } from "@/components/admin/media-library-uploader";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function getMedia() {
  try {
    return await db.media.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return [];
  }
}

export default async function AdminMediaPage() {
  const media = await getMedia();

  return (
    <AdminShell title="Медиа сан" activePath="/admin/media">
      <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
        <Card>
          <CardHeader>
            <Upload className="h-5 w-5 text-teal" />
            <CardTitle>Файл оруулах</CardTitle>
            <CardDescription>Зураг, лого, баннер, PDF болон баримт бичгийг медиа санд хадгална.</CardDescription>
          </CardHeader>
          <div className="px-6 pb-6">
            <MediaLibraryUploader />
          </div>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Файлууд</CardTitle>
            <CardDescription>{media.length} файл</CardDescription>
          </CardHeader>
          <div className="grid gap-3 px-6 pb-6">
            {media.map((item) => (
              <div key={item.id} className="flex flex-col gap-3 rounded-lg border p-3 text-sm md:flex-row md:items-center md:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <ImageIcon className="h-4 w-4 text-teal" />
                  <div className="min-w-0">
                    <p className="truncate font-medium">{item.filename}</p>
                    <p className="text-slate-500">{item.type} · {formatDate(item.createdAt, "mn")}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 md:justify-end">
                  <Button variant="outline" size="sm" asChild>
                    <a href={item.url} target="_blank" rel="noreferrer">
                      Нээх
                    </a>
                  </Button>
                  <MediaDeleteButton id={item.id} filename={item.filename} />
                </div>
              </div>
            ))}
            {media.length === 0 ? <p className="py-8 text-center text-sm text-slate-500">Одоогоор медиа файл алга.</p> : null}
          </div>
        </Card>
      </div>
    </AdminShell>
  );
}
