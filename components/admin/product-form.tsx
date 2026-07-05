"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Loader2, Save } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { MediaDeleteButton } from "@/components/admin/media-delete-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { productSpecificationsForEditor } from "@/lib/product-specifications";
import { productSchema } from "@/lib/validators";

type ProductFormValues = z.infer<typeof productSchema>;

export type AdminProductFormProduct = {
  id: string;
  categoryId: string;
  tag: string | null;
  titleMn: string;
  titleEn: string | null;
  summaryMn: string | null;
  summaryEn: string | null;
  descriptionMn: string | null;
  descriptionEn: string | null;
  specifications: unknown;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  seoTitleMn: string | null;
  seoTitleEn: string | null;
  seoDescriptionMn: string | null;
  seoDescriptionEn: string | null;
  media: Array<{
    id: string;
    role: "GALLERY" | "DATASHEET" | "CERTIFICATE" | "BROCHURE";
    media: {
      id: string;
      type: "IMAGE" | "PDF" | "DOCUMENT";
      url: string;
      filename: string;
    };
  }>;
};

export function ProductForm({
  categories,
  product
}: {
  categories: Array<{ id: string; titleMn: string; titleEn: string }>;
  product?: AdminProductFormProduct;
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPdfFile, setSelectedPdfFile] = useState<File | null>(null);
  const existingImages = product?.media.filter((item) => item.media.type === "IMAGE") ?? [];
  const existingFiles = product?.media.filter((item) => item.media.type === "PDF" || item.role !== "GALLERY") ?? [];
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      categoryId: product?.categoryId ?? categories[0]?.id ?? "",
      tag: product?.tag ?? "",
      titleMn: product?.titleMn ?? "",
      titleEn: product?.titleEn ?? "",
      summaryMn: product?.summaryMn ?? "",
      summaryEn: product?.summaryEn ?? "",
      descriptionMn: product?.descriptionMn ?? "",
      descriptionEn: product?.descriptionEn ?? "",
      specifications: productSpecificationsForEditor(product?.specifications),
      status: product?.status ?? "DRAFT",
      seoTitleMn: product?.seoTitleMn ?? "",
      seoTitleEn: product?.seoTitleEn ?? "",
      seoDescriptionMn: product?.seoDescriptionMn ?? "",
      seoDescriptionEn: product?.seoDescriptionEn ?? ""
    }
  });

  async function onSubmit(values: ProductFormValues) {
    setMessage(null);

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    if (selectedPdfFile) {
      formData.append("pdf", selectedPdfFile);
    }

    const response = await fetch(product ? `/api/admin/products/${product.id}` : "/api/admin/products", {
      method: product ? "PATCH" : "POST",
      body: formData
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      const fieldErrors = payload?.error?.fieldErrors;
      const errorMessage = fieldErrors
        ? Object.entries(fieldErrors)
            .flatMap(([key, msgs]) => Array.isArray(msgs) ? msgs.map((msg) => `${key}: ${msg}`) : [])
            .join("; ")
        : payload?.error || "Хадгалах үед алдаа гарлаа.";
      setMessage(String(errorMessage));
      return;
    }

    if (!product) {
      form.reset();
    }
    setSelectedFile(null);
    setSelectedPdfFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (pdfInputRef.current) {
      pdfInputRef.current.value = "";
    }
    router.refresh();
    setMessage(product ? "Бүтээгдэхүүнийг амжилттай шинэчиллээ." : "Бүтээгдэхүүнийг амжилттай хадгаллаа.");
  }

  return (
    <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <Label>Ангилал</Label>
        <select className="h-11 rounded-lg border bg-white px-3 text-sm" {...form.register("categoryId")}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.titleMn}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label>Таг</Label>
          <Input {...form.register("tag")} placeholder="жишээ: ICU" />
        </div>
        <div className="grid gap-2">
          <Label>Төлөв</Label>
          <select className="h-11 rounded-lg border bg-white px-3 text-sm" {...form.register("status")}>
            <option value="DRAFT">Ноорог</option>
            <option value="PUBLISHED">Нийтлэгдсэн</option>
            <option value="ARCHIVED">Архивласан</option>
          </select>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label>Гарчиг (MN)</Label>
          <Input {...form.register("titleMn")} />
        </div>
        <div className="grid gap-2">
          <Label>Гарчиг (EN)</Label>
          <Input {...form.register("titleEn")} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label>Товч тайлбар (MN)</Label>
          <Textarea {...form.register("summaryMn")} />
        </div>
        <div className="grid gap-2">
          <Label>Товч тайлбар (EN)</Label>
          <Textarea {...form.register("summaryEn")} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label>Дэлгэрэнгүй тайлбар (MN)</Label>
          <Textarea {...form.register("descriptionMn")} />
        </div>
        <div className="grid gap-2">
          <Label>Дэлгэрэнгүй тайлбар (EN)</Label>
          <Textarea {...form.register("descriptionEn")} />
        </div>
      </div>
      <div className="grid gap-2">
        <Label>Техникийн үзүүлэлт</Label>
        <Textarea
          {...form.register("specifications")}
          className="min-h-40"
          placeholder={"Мөр бүрийг дараах хэлбэрээр бичнэ:\nЗагвар | NV-120\nХэмжээ | 120 x 80 x 60 мм\nБаталгаа | 12 сар"}
        />
        <p className="text-xs leading-5 text-slate-500">Мөр бүрийн зүүн талд үзүүлэлтийн нэр, баруун талд утгыг оруулна. `|`, `:` эсвэл `=` тэмдэг ашиглаж болно.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label>SEO гарчиг (MN)</Label>
          <Input {...form.register("seoTitleMn")} />
        </div>
        <div className="grid gap-2">
          <Label>SEO гарчиг (EN)</Label>
          <Input {...form.register("seoTitleEn")} />
        </div>
      </div>
      <div className="grid gap-2 rounded-lg border border-dashed border-slate-300 p-4">
        <Label>Бүтээгдэхүүний зураг</Label>
        <p className="text-sm text-slate-500">Зураг нэмэх боломжтой. Файл нь media сан руу хадгалагдаж бүтээгдэхүүнтэй холбогдоно.</p>
        {existingImages.length > 0 ? (
          <div className="grid gap-3 text-sm text-slate-600">
            {existingImages.map((item) => (
              <div key={item.id} className="flex flex-col gap-3 rounded-lg border bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg border bg-slate-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.media.url} alt={item.media.filename} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{item.media.filename}</p>
                    <a href={item.media.url} target="_blank" rel="noreferrer" className="text-xs text-teal hover:underline">
                      Нээх
                    </a>
                  </div>
                </div>
                <MediaDeleteButton id={item.media.id} filename={item.media.filename} />
              </div>
            ))}
          </div>
        ) : null}
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null;
            setSelectedFile(file);
            if (!file) {
              setImagePreview(null);
              return;
            }
            const reader = new FileReader();
            reader.onload = () => setImagePreview(typeof reader.result === "string" ? reader.result : null);
            reader.readAsDataURL(file);
          }}
        />
        {imagePreview ? <Image src={imagePreview} alt="Product preview" width={800} height={400} className="h-40 w-full rounded-lg object-cover" /> : null}
      </div>
      <div className="grid gap-2 rounded-lg border border-dashed border-slate-300 p-4">
        <Label>PDF хавсралт</Label>
        <p className="text-sm text-slate-500">Техникийн паспорт, datasheet, brochure зэрэг PDF файлыг хавсаргана.</p>
        {existingFiles.length > 0 ? (
          <div className="grid gap-2 text-sm text-slate-600">
            {existingFiles.map((item) => (
              <div key={item.id} className="flex flex-col gap-3 rounded-lg border bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
                <a href={item.media.url} target="_blank" rel="noreferrer" className="inline-flex min-w-0 items-center gap-2 hover:text-teal">
                  <FileText className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.media.filename}</span>
                </a>
                <MediaDeleteButton id={item.media.id} filename={item.media.filename} />
              </div>
            ))}
          </div>
        ) : null}
        <Input
          ref={pdfInputRef}
          type="file"
          accept="application/pdf,.pdf"
          onChange={(event) => {
            setSelectedPdfFile(event.target.files?.[0] ?? null);
          }}
        />
        {selectedPdfFile ? <p className="text-sm text-slate-500">Сонгосон файл: {selectedPdfFile.name}</p> : null}
      </div>
      {message ? <p className="text-sm text-slate-500">{message}</p> : null}
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        {product ? "Бүтээгдэхүүн шинэчлэх" : "Бүтээгдэхүүн хадгалах"}
      </Button>
    </form>
  );
}
