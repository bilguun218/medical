"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InquiryDeleteButton({
  id,
  redirectTo
}: {
  id: string;
  redirectTo?: string;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function deleteInquiry() {
    if (!window.confirm("Энэ санал хүсэлтийг устгах уу?")) return;

    setDeleting(true);
    const response = await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });

    setDeleting(false);

    if (!response.ok) {
      alert("Устгах үед алдаа гарлаа.");
      return;
    }

    if (redirectTo) {
      router.push(redirectTo);
      router.refresh();
      return;
    }

    router.refresh();
  }

  return (
    <Button type="button" variant="destructive" size="sm" onClick={deleteInquiry} disabled={deleting}>
      {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
      Устгах
    </Button>
  );
}
