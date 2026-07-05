"use client";

import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function MediaDeleteButton({
  id,
  filename,
  onDeleted
}: {
  id: string;
  filename: string;
  onDeleted?: () => void;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function deleteMedia() {
    const confirmed = window.confirm(`"${filename}" файлыг устгах уу? Энэ үйлдлийг буцаах боломжгүй.`);
    if (!confirmed) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        window.alert(payload?.error || "Файл устгах үед алдаа гарлаа.");
        return;
      }

      if (payload?.warning) {
        window.alert(payload.warning);
      }

      onDeleted?.();
      router.refresh();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Button type="button" variant="destructive" size="sm" onClick={deleteMedia} disabled={deleting}>
      {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
      Устгах
    </Button>
  );
}
