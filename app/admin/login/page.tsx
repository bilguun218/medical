import Image from "next/image";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { auth } from "@/auth";
import { LoginForm } from "@/components/admin/login-form";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/admin/dashboard");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-4 py-12 text-white">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center justify-center gap-3">
          <span className="relative flex h-14 w-14 overflow-hidden rounded-xl border border-white/10 bg-white">
            <Image src="/brand/novytas-logo.png" alt="NOVYTAS" fill sizes="56px" className="object-cover" priority />
          </span>
          <div>
            <p className="text-xl font-semibold">NOVYTAS Админ</p>
            <p className="text-sm text-white/55">Дотоод удирдлагын систем</p>
          </div>
        </div>
        <Card className="border-white/10 bg-white text-slate-950">
          <CardHeader>
            <CardTitle>Админ нэвтрэх</CardTitle>
            <CardDescription>Үүсгэсэн админ эрхээр нэвтэрнэ үү.</CardDescription>
          </CardHeader>
          <div className="px-6 pb-6">
            <Suspense>
              <LoginForm />
            </Suspense>
          </div>
        </Card>
      </div>
    </main>
  );
}
