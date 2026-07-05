"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { MediaUpload } from "@/components/admin/media-upload";
import { MediaDeleteButton } from "@/components/admin/media-delete-button";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { articleSchema } from "@/lib/validators";

type ArticleFormValues = z.infer<typeof articleSchema>;

function formatDateTimeLocal(value?: Date | string | null) {
  if (!value) return "";
  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 16);
}

type ArticleFormArticle = {
  id: string;
  categoryId: string | null;
  coverImageId: string | null;
  coverImage?: { url: string } | null;
  titleMn: string;
  titleEn: string | null;
  excerptMn: string | null;
  excerptEn: string | null;
  bodyMn: string;
  bodyEn: string | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  publishedAt: Date | string | null;
  seoTitleMn: string | null;
  seoTitleEn: string | null;
  seoDescriptionMn: string | null;
  seoDescriptionEn: string | null;
};

export function ArticleForm({
  categories,
  article
}: {
  categories: Array<{ id: string; titleMn: string; titleEn: string }>;
  article?: ArticleFormArticle;
}) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState(article?.coverImage?.url ?? "");
  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      categoryId: article?.categoryId ?? "",
      coverImageId: article?.coverImageId ?? "",
      titleMn: article?.titleMn ?? "",
      titleEn: article?.titleEn ?? "",
      excerptMn: article?.excerptMn ?? "",
      excerptEn: article?.excerptEn ?? "",
      bodyMn: article?.bodyMn ?? "",
      bodyEn: article?.bodyEn ?? "",
      status: article?.status ?? "DRAFT",
      publishedAt: formatDateTimeLocal(article?.publishedAt),
      seoTitleMn: article?.seoTitleMn ?? "",
      seoTitleEn: article?.seoTitleEn ?? "",
      seoDescriptionMn: article?.seoDescriptionMn ?? "",
      seoDescriptionEn: article?.seoDescriptionEn ?? ""
    }
  });

  async function onSubmit(values: ArticleFormValues) {
    setMessage(null);
    const response = await fetch(article ? `/api/admin/news/${article.id}` : "/api/admin/news", {
      method: article ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      setMessage("Нийтлэл хадгалах боломжгүй байна.");
      return;
    }

    if (!article) {
      form.reset();
      setCoverImageUrl("");
    }
    router.refresh();
    setMessage(article ? "Нийтлэл шинэчлэгдлээ." : "Нийтлэл хадгалагдлаа.");
  }

  const bodyMn = form.watch("bodyMn");
  const bodyEn = form.watch("bodyEn");
  const currentCoverImageId = form.watch("coverImageId");

  return (
    <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label>Төлөв</Label>
          <select className="h-11 rounded-lg border bg-white px-3 text-sm" {...form.register("status")}>
            <option value="DRAFT">Ноорог</option>
            <option value="PUBLISHED">Нийтлэгдсэн</option>
            <option value="ARCHIVED">Архивласан</option>
          </select>
        </div>
        <div className="grid gap-2">
          <Label>Нийтлэх огноо</Label>
          <Input type="datetime-local" {...form.register("publishedAt")} />
        </div>
      </div>
      <div className="grid gap-2">
        <Label>Ангилал</Label>
        <select className="h-11 rounded-lg border bg-white px-3 text-sm" {...form.register("categoryId")}>
          <option value="">Ангилалгүй</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.titleMn}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-2 rounded-lg border border-dashed border-slate-300 p-4">
        <Label>Онцлох зураг</Label>
        <input type="hidden" {...form.register("coverImageId")} />
        <MediaUpload
          value={coverImageUrl}
          onChange={(url, media) => {
            setCoverImageUrl(url);
            form.setValue("coverImageId", media?.id ?? "", { shouldValidate: true, shouldDirty: true });
          }}
        />
        {currentCoverImageId ? (
          <div>
            <MediaDeleteButton
              id={currentCoverImageId}
              filename="Онцлох зураг"
              onDeleted={() => {
                setCoverImageUrl("");
                form.setValue("coverImageId", "", { shouldValidate: true, shouldDirty: true });
              }}
            />
          </div>
        ) : null}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label>Гарчиг MN</Label>
          <Input {...form.register("titleMn")} />
        </div>
        <div className="grid gap-2">
          <Label>Гарчиг EN</Label>
          <Input {...form.register("titleEn")} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label>Товч тайлбар MN</Label>
          <Textarea {...form.register("excerptMn")} />
        </div>
        <div className="grid gap-2">
          <Label>Товч тайлбар EN</Label>
          <Textarea {...form.register("excerptEn")} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label>Контент MN</Label>
          <RichTextEditor value={bodyMn} onChange={(value) => form.setValue("bodyMn", value, { shouldValidate: true, shouldDirty: true })} minHeight="min-h-72" />
        </div>
        <div className="grid gap-2">
          <Label>Контент EN</Label>
          <RichTextEditor value={bodyEn ?? ""} onChange={(value) => form.setValue("bodyEn", value, { shouldValidate: true, shouldDirty: true })} minHeight="min-h-72" />
        </div>
      </div>
      {message ? <p className="text-sm text-slate-500">{message}</p> : null}
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Нийтлэл хадгалах
      </Button>
    </form>
  );
}
