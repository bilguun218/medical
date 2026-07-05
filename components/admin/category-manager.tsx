"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2, FolderTree, Loader2, Plus, Save, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { productCategorySchema } from "@/lib/validators";

type CategoryFormValues = z.infer<typeof productCategorySchema>;

export type AdminCategory = {
  id: string;
  titleMn: string;
  titleEn: string;
  descriptionMn: string | null;
  descriptionEn: string | null;
  sortOrder: number;
  productCount: number;
};

function getApiErrorMessage(payload: unknown) {
  if (!payload || typeof payload !== "object" || !("error" in payload)) {
    return "Ангилал хадгалах үед алдаа гарлаа.";
  }

  const error = (payload as { error?: unknown }).error;

  if (typeof error === "string") {
    return error;
  }

  if (error && typeof error === "object" && "fieldErrors" in error) {
    const fieldErrors = (error as { fieldErrors?: Record<string, string[] | undefined> }).fieldErrors;
    const messages = Object.entries(fieldErrors ?? {}).flatMap(([key, values]) =>
      values?.map((value) => `${key}: ${value}`) ?? []
    );

    if (messages.length > 0) {
      return messages.join("; ");
    }
  }

  return "Ангилал хадгалах үед алдаа гарлаа.";
}

export function CategoryManager({ categories }: { categories: AdminCategory[] }) {
  const router = useRouter();
  const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const nextSortOrder = categories.reduce((max, category) => Math.max(max, category.sortOrder), 0) + 1;
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(productCategorySchema),
    defaultValues: {
      titleMn: "",
      titleEn: "",
      descriptionMn: "",
      descriptionEn: "",
      sortOrder: nextSortOrder
    }
  });

  function resetForm() {
    setEditingCategory(null);
    form.reset({
      titleMn: "",
      titleEn: "",
      descriptionMn: "",
      descriptionEn: "",
      sortOrder: nextSortOrder
    });
  }

  function startEditing(category: AdminCategory) {
    setMessage(null);
    setEditingCategory(category);
    form.reset({
      titleMn: category.titleMn,
      titleEn: category.titleEn,
      descriptionMn: category.descriptionMn ?? "",
      descriptionEn: category.descriptionEn ?? "",
      sortOrder: category.sortOrder
    });
  }

  async function onSubmit(values: CategoryFormValues) {
    setMessage(null);
    const wasEditing = Boolean(editingCategory);
    const response = await fetch(editingCategory ? `/api/admin/categories/${editingCategory.id}` : "/api/admin/categories", {
      method: editingCategory ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setMessage(getApiErrorMessage(payload));
      return;
    }

    if (wasEditing) {
      resetForm();
    } else {
      setEditingCategory(null);
      form.reset({
        titleMn: "",
        titleEn: "",
        descriptionMn: "",
        descriptionEn: "",
        sortOrder: Math.max(nextSortOrder, values.sortOrder) + 1
      });
    }

    router.refresh();
    setMessage(wasEditing ? "Ангилал шинэчлэгдлээ." : "Ангилал нэмэгдлээ.");
  }

  async function deleteCategory(category: AdminCategory) {
    if (!window.confirm(`"${category.titleMn}" ангиллыг устгах уу?`)) {
      return;
    }

    setMessage(null);
    setDeletingId(category.id);
    const response = await fetch(`/api/admin/categories/${category.id}`, { method: "DELETE" });
    setDeletingId(null);

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setMessage(getApiErrorMessage(payload));
      return;
    }

    if (editingCategory?.id === category.id) {
      resetForm();
    }

    router.refresh();
    setMessage("Ангилал устгагдлаа.");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle>{editingCategory ? "Ангилал засах" : "Ангилал нэмэх"}</CardTitle>
              <CardDescription>Бүтээгдэхүүний каталогт харагдах монгол, англи нэр болон тайлбарыг удирдана.</CardDescription>
            </div>
            {editingCategory ? (
              <Button type="button" variant="outline" size="icon" onClick={resetForm} aria-label="Засах үйлдлийг цуцлах">
                <X className="h-4 w-4" />
              </Button>
            ) : null}
          </div>
        </CardHeader>
        <form className="grid gap-4 px-6 pb-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label>Нэр (MN)</Label>
              <Input {...form.register("titleMn")} />
              {form.formState.errors.titleMn ? <p className="text-xs text-red-600">{form.formState.errors.titleMn.message}</p> : null}
            </div>
            <div className="grid gap-2">
              <Label>Нэр (EN)</Label>
              <Input {...form.register("titleEn")} />
              {form.formState.errors.titleEn ? <p className="text-xs text-red-600">{form.formState.errors.titleEn.message}</p> : null}
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Эрэмбэ</Label>
            <Input type="number" min={0} max={10000} {...form.register("sortOrder", { valueAsNumber: true })} />
            {form.formState.errors.sortOrder ? <p className="text-xs text-red-600">{form.formState.errors.sortOrder.message}</p> : null}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label>Тайлбар (MN)</Label>
              <Textarea {...form.register("descriptionMn")} />
              {form.formState.errors.descriptionMn ? <p className="text-xs text-red-600">{form.formState.errors.descriptionMn.message}</p> : null}
            </div>
            <div className="grid gap-2">
              <Label>Тайлбар (EN)</Label>
              <Textarea {...form.register("descriptionEn")} />
              {form.formState.errors.descriptionEn ? <p className="text-xs text-red-600">{form.formState.errors.descriptionEn.message}</p> : null}
            </div>
          </div>
          {message ? <p className="text-sm text-slate-500">{message}</p> : null}
          <div className="flex flex-wrap gap-2">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : editingCategory ? (
                <Save className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              {editingCategory ? "Ангилал шинэчлэх" : "Ангилал нэмэх"}
            </Button>
            {editingCategory ? (
              <Button type="button" variant="outline" onClick={resetForm}>
                <X className="h-4 w-4" />
                Болих
              </Button>
            ) : null}
          </div>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ангиллын бүртгэл</CardTitle>
          <CardDescription>{categories.length} нийт ангилал</CardDescription>
        </CardHeader>
        <div className="overflow-x-auto px-6 pb-6">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b text-slate-500">
              <tr>
                <th className="py-3">Эрэмбэ</th>
                <th className="py-3">Ангилал</th>
                <th className="py-3">EN</th>
                <th className="py-3">Бүтээгдэхүүн</th>
                <th className="py-3">Үйлдэл</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b align-top last:border-0">
                  <td className="py-4 text-slate-500">{category.sortOrder}</td>
                  <td className="max-w-72 py-4">
                    <div className="flex gap-3">
                      <FolderTree className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                      <div className="min-w-0">
                        <p className="font-medium">{category.titleMn}</p>
                        {category.descriptionMn ? <p className="mt-1 line-clamp-2 text-slate-500">{category.descriptionMn}</p> : null}
                      </div>
                    </div>
                  </td>
                  <td className="max-w-64 py-4 text-slate-600">
                    <p className="font-medium">{category.titleEn}</p>
                    {category.descriptionEn ? <p className="mt-1 line-clamp-2 text-slate-500">{category.descriptionEn}</p> : null}
                  </td>
                  <td className="py-4">
                    <Badge>{category.productCount}</Badge>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-wrap gap-2">
                      <Button type="button" variant="outline" size="sm" onClick={() => startEditing(category)}>
                        <Edit2 className="h-4 w-4" />
                        Засах
                      </Button>
                      <Button type="button" variant="destructive" size="sm" disabled={deletingId === category.id} onClick={() => deleteCategory(category)}>
                        {deletingId === category.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                        Устгах
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    Одоогоор ангилал алга.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
