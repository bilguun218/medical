import { Settings } from "lucide-react";
import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
  return (
    <AdminShell title="Веб тохиргоо" activePath="/admin/settings">
      <Card>
        <CardHeader>
          <Settings className="h-5 w-5 text-teal" />
          <CardTitle>Веб тохиргоо</CardTitle>
          <CardDescription>Сайтын текст, медиа, цэс, холбоо барих мэдээлэл, хөл хэсгийн холбоос болон SEO-г Контент хэсгээс удирдана.</CardDescription>
        </CardHeader>
        <div className="px-6 pb-6">
          <Button asChild>
            <Link href="/admin/content/home">Контент нээх</Link>
          </Button>
        </div>
      </Card>
    </AdminShell>
  );
}
