import { UserCircle } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/auth";

export default async function AdminProfilePage() {
  const session = await auth();

  return (
    <AdminShell title="Профайл" activePath="/admin/profile">
      <Card>
        <CardHeader>
          <UserCircle className="h-5 w-5 text-teal" />
          <CardTitle>{session?.user?.name ?? "Админ хэрэглэгч"}</CardTitle>
          <CardDescription>{session?.user?.email}</CardDescription>
        </CardHeader>
      </Card>
    </AdminShell>
  );
}
