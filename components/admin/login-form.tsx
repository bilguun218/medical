"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, LogIn } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(event.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false
    });
    setLoading(false);

    if (response?.error) {
      setError("Имэйл эсвэл нууц үг буруу байна.");
      return;
    }

    router.push(params.get("callbackUrl") || "/admin/dashboard");
    router.refresh();
  }

  return (
    <form className="grid gap-5" onSubmit={onSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="email">Имэйл</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Нууц үг</Label>
        <Input id="password" name="password" type="password" autoComplete="current-password" required />
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Button type="submit" disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
        Нэвтрэх
      </Button>
    </form>
  );
}
