"use client";

import { Loader2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type UploadedMedia = {
  id: string;
  url: string;
  filename: string;
  type: string;
};

export function MediaUpload({
  value,
  onChange,
  accept = "image/*",
  name
}: {
  value?: string;
  onChange: (url: string, media?: UploadedMedia) => void;
  accept?: string;
  name?: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const isImage = value ? /\.(png|jpe?g|gif|webp|avif|svg)$/i.test(value) : false;

  async function upload(file: File) {
    setUploading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/media", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        setMessage(payload?.error ? String(payload.error) : "Файл оруулахад алдаа гарлаа.");
        return;
      }

      const media = await response.json().catch(() => null) as UploadedMedia | null;

      if (!media?.url) {
        setMessage("Файл орсон боловч серверээс файлын URL ирсэнгүй.");
        return;
      }

      onChange(media.url, media);
      setMessage(media.filename);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Файл оруулахад алдаа гарлаа.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="grid gap-3">
      {name ? <input type="hidden" name={name} value={value ?? ""} readOnly /> : null}
      {value && isImage ? (
        <div className="relative h-32 w-full overflow-hidden rounded-lg border bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="h-full w-full object-contain" />
        </div>
      ) : null}
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          ref={fileInputRef}
          type="file"
          accept={accept}
          disabled={uploading}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              void upload(file);
            }
          }}
        />
        <Button type="button" variant="outline" disabled={uploading} onClick={() => fileInputRef.current?.click()}>
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          Оруулах
        </Button>
      </div>
      {message ? <p className="text-xs text-slate-500">{message}</p> : null}
    </div>
  );
}
