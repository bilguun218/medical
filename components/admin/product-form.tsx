"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { productSchema } from "@/lib/validators";

function createSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}0-9-]+/gu, "")
    .replace(/^-+|-+$/g, "");
}

type ProductFormValues = z.infer<typeof productSchema>;

export function ProductForm({
  categories
}: {
  categories: Array<{ id: string; titleMn: string; titleEn: string; slug: string }>;
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      slug: "",
      categoryId: categories[0]?.id ?? "",
      tag: "",
      titleMn: "",
      titleEn: "",
      summaryMn: "",
      summaryEn: "",
      descriptionMn: "",
      descriptionEn: "",
      status: "DRAFT",
      seoTitleMn: "",
      seoTitleEn: "",
      seoDescriptionMn: "",
      seoDescriptionEn: ""
    }
  });

  const titleMn = form.watch("titleMn");

  useEffect(() => {
    const slugValue = form.getValues("slug");
    if (!slugValue || slugValue === createSlug(slugValue)) {
      form.setValue("slug", createSlug(titleMn));
    }
  }, [titleMn, form]);

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

    const response = await fetch("/api/admin/products", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      const errorMessage = payload?.error?.formErrors?.fieldErrors
        ? Object.entries(payload.error.formErrors.fieldErrors)
            .flatMap(([key, msgs]) => msgs.map((msg: string) => `${key}: ${msg}`))
            .join("; ")
        : payload?.error || "Хадгалах үед алдаа гарлаа.";
      setMessage(String(errorMessage));
      return;
    }

    form.reset();
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    router.refresh();
    setMessage("Бүтээгдэхүүнийг амжилттай хадгаллаа.");
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
      <div className="grid gap-4 md:grid-cols-3">
        <div className="grid gap-2">
          <Label>Slug</Label>
          <Input {...form.register("slug")} placeholder="Жишээ: icu-ventilator" />
          <p className="text-xs text-slate-500">Slug нь URL-д ашиглагдах товч нэр юм. Хоосон байвал систем автоматаар гаргана.</p>
        </div>
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
        <p className="text-sm text-slate-500">Зураг нэмэх боломжтой. Энэ алхам нь одоогоор локал хадгалалттай бөгөөд дараагийн алхмаар media системд холбогдоно.</p>
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
      {message ? <p className="text-sm text-slate-500">{message}</p> : null}
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Бүтээгдэхүүн хадгалах
      </Button>
    </form>
  );
}
