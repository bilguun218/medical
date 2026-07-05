"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MediaField } from "@/components/admin/content/form-fields";
import { editableSeoRoutes } from "@/lib/cms-routes";
import type { SeoRecord } from "@/lib/cms";

export function SeoContentForm({ initialValue }: { initialValue: SeoRecord[] }) {
  const router = useRouter();
  const [records, setRecords] = useState(initialValue);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function save() {
    setSaving(true);
    setMessage(null);

    const response = await fetch("/api/admin/content/seo", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ records })
    });

    setSaving(false);

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setMessage(payload?.error ? String(payload.error) : "SEO хадгалах боломжгүй байна.");
      return;
    }

    router.refresh();
    setMessage("Хадгаллаа.");
  }

  return (
    <form className="grid gap-6" onSubmit={(event) => { event.preventDefault(); void save(); }}>
      {records.map((record, index) => {
        const route = editableSeoRoutes.find((item) => item.route === record.route);

        return (
          <Card key={record.route}>
            <CardHeader>
              <CardTitle>{route?.label ?? record.route}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label>SEO гарчиг MN</Label>
                  <Input value={record.titleMn ?? ""} onChange={(event) => setRecords(records.map((item, current) => current === index ? { ...item, titleMn: event.target.value } : item))} />
                </div>
                <div className="grid gap-2">
                  <Label>SEO гарчиг EN</Label>
                  <Input value={record.titleEn ?? ""} onChange={(event) => setRecords(records.map((item, current) => current === index ? { ...item, titleEn: event.target.value } : item))} />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label>SEO тайлбар MN</Label>
                  <Input value={record.descriptionMn ?? ""} onChange={(event) => setRecords(records.map((item, current) => current === index ? { ...item, descriptionMn: event.target.value } : item))} />
                </div>
                <div className="grid gap-2">
                  <Label>SEO тайлбар EN</Label>
                  <Input value={record.descriptionEn ?? ""} onChange={(event) => setRecords(records.map((item, current) => current === index ? { ...item, descriptionEn: event.target.value } : item))} />
                </div>
              </div>
              <MediaField label="Сошиал харагдах зураг" value={record.ogImage ?? ""} onChange={(ogImage) => setRecords(records.map((item, current) => current === index ? { ...item, ogImage } : item))} />
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <input
                  type="checkbox"
                  checked={record.noIndex}
                  onChange={(event) => setRecords(records.map((item, current) => current === index ? { ...item, noIndex: event.target.checked } : item))}
                />
                Индексжүүлэхгүй
              </label>
            </CardContent>
          </Card>
        );
      })}

      {message ? <p className="text-sm text-slate-500">{message}</p> : null}
      <Button type="submit" disabled={saving}>
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Хадгалах
      </Button>
    </form>
  );
}
