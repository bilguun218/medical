"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MediaUpload } from "@/components/admin/media-upload";

export function MediaLibraryUploader() {
  const router = useRouter();
  const [value, setValue] = useState("");

  return (
    <MediaUpload
      value={value}
      accept="image/*,.pdf,.doc,.docx"
      onChange={(url) => {
        setValue(url);
        router.refresh();
      }}
    />
  );
}
