"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { CmsKey } from "@/lib/cms";

export function useContentSave(key: CmsKey) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function save(value: unknown) {
    setSaving(true);
    setMessage(null);

    const response = await fetch(`/api/admin/content/${key}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value)
    });

    setSaving(false);

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setMessage(payload?.error ? String(payload.error) : "Контент хадгалах боломжгүй байна.");
      return false;
    }

    router.refresh();
    setMessage("Хадгаллаа.");
    return true;
  }

  return { save, saving, message };
}
