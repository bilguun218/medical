import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import type { MediaType } from "@prisma/client";
import { del, put } from "@vercel/blob";
import { db } from "@/lib/db";

const maxUploadSize = 10 * 1024 * 1024;

function sanitizeFileName(name: string) {
  const ext = path.extname(name || "asset").toLowerCase();
  const base =
    path
      .basename(name || "asset", ext)
      .replace(/[^a-zA-Z0-9._-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "asset";

  return `${Date.now()}-${base.slice(0, 80)}${ext || ".bin"}`;
}

function getMediaType(mimeType: string): MediaType {
  if (mimeType.startsWith("image/")) return "IMAGE";
  if (mimeType === "application/pdf") return "PDF";
  return "DOCUMENT";
}

function shouldUseBlobStorage() {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
      (process.env.VERCEL && process.env.BLOB_STORE_ID)
  );
}

function isVercelBlobUrl(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.hostname.endsWith(".blob.vercel-storage.com");
  } catch {
    return false;
  }
}

export async function saveMediaUpload(file: File, metadata?: { altMn?: string; altEn?: string }) {
  if (file.size <= 0) {
    throw new Error("Uploaded file is empty.");
  }

  if (file.size > maxUploadSize) {
    throw new Error("Uploaded file is larger than 10MB.");
  }

  if (shouldUseBlobStorage()) {
    const fileName = sanitizeFileName(file.name || "asset");
    const blob = await put(`uploads/${fileName}`, file, {
      access: "public",
      addRandomSuffix: true,
      contentType: file.type || "application/octet-stream"
    });

    return db.media.create({
      data: {
        type: getMediaType(file.type || "application/octet-stream"),
        url: blob.url,
        filename: file.name || fileName,
        altMn: metadata?.altMn || null,
        altEn: metadata?.altEn || null,
        mimeType: file.type || "application/octet-stream",
        size: file.size
      }
    });
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const fileName = sanitizeFileName(file.name || "asset");
  const filePath = path.join(uploadDir, fileName);
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, bytes);

  return db.media.create({
    data: {
      type: getMediaType(file.type || "application/octet-stream"),
      url: `/uploads/${fileName}`,
      filename: file.name || fileName,
      altMn: metadata?.altMn || null,
      altEn: metadata?.altEn || null,
      mimeType: file.type || "application/octet-stream",
      size: file.size
    }
  });
}

export async function deleteStoredMediaFile(url: string) {
  if (isVercelBlobUrl(url)) {
    await del(url);
    return;
  }

  if (!url.startsWith("/uploads/")) {
    return;
  }

  const uploadRoot = path.resolve(process.cwd(), "public", "uploads");
  const filePath = path.resolve(uploadRoot, url.replace(/^\/uploads\//, ""));
  const normalizedRoot = uploadRoot.endsWith(path.sep) ? uploadRoot : `${uploadRoot}${path.sep}`;

  if (!filePath.startsWith(normalizedRoot)) {
    return;
  }

  try {
    await unlink(filePath);
  } catch (error) {
    const code = error instanceof Error && "code" in error ? (error as NodeJS.ErrnoException).code : undefined;
    if (code !== "ENOENT") {
      throw error;
    }
  }
}

export const deleteLocalMediaFile = deleteStoredMediaFile;
