"use client";

import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LocalizedInput, LocalizedTextarea, MediaField } from "@/components/admin/content/form-fields";
import { useContentSave } from "@/components/admin/content/use-content-save";
import type { HomeContent } from "@/lib/cms";
import { useState } from "react";

export function HomeContentForm({ initialValue }: { initialValue: HomeContent }) {
  const [content, setContent] = useState(initialValue);
  const { save, saving, message } = useContentSave("home");

  return (
    <form className="grid gap-6" onSubmit={(event) => { event.preventDefault(); void save(content); }}>
      <Card>
        <CardHeader>
          <CardTitle>Нүүрний баннер</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <LocalizedInput label="Баннерын гарчиг" value={content.heroTitle} onChange={(heroTitle) => setContent({ ...content, heroTitle })} />
          <LocalizedTextarea label="Баннерын дэд гарчиг" value={content.heroSubtitle} onChange={(heroSubtitle) => setContent({ ...content, heroSubtitle })} />
          <LocalizedTextarea label="Баннерын тайлбар" value={content.heroDescription} onChange={(heroDescription) => setContent({ ...content, heroDescription })} />
          <div className="grid gap-4 md:grid-cols-2">
            <MediaField label="Баннерын зураг" value={content.heroImage} onChange={(heroImage) => setContent({ ...content, heroImage })} />
            <MediaField label="Баннерын арын зураг" value={content.heroBackgroundImage} onChange={(heroBackgroundImage) => setContent({ ...content, heroBackgroundImage })} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <LocalizedInput label="Үндсэн товчны текст" value={content.primaryButtonText} onChange={(primaryButtonText) => setContent({ ...content, primaryButtonText })} />
            <div className="grid gap-2">
              <Label>Үндсэн товчны холбоос</Label>
              <Input value={content.primaryButtonLink} onChange={(event) => setContent({ ...content, primaryButtonLink: event.target.value })} />
            </div>
            <LocalizedInput label="Хоёрдогч товчны текст" value={content.secondaryButtonText} onChange={(secondaryButtonText) => setContent({ ...content, secondaryButtonText })} />
            <div className="grid gap-2">
              <Label>Хоёрдогч товчны холбоос</Label>
              <Input value={content.secondaryButtonLink} onChange={(event) => setContent({ ...content, secondaryButtonLink: event.target.value })} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Хэсгүүд</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <LocalizedInput label="Танилцуулгын гарчиг" value={content.introTitle} onChange={(introTitle) => setContent({ ...content, introTitle })} />
          <LocalizedTextarea label="Танилцуулгын тайлбар" value={content.introDescription} onChange={(introDescription) => setContent({ ...content, introDescription })} />
          <LocalizedInput label="Үйл ажиллагааны гарчиг" value={content.operationsTitle} onChange={(operationsTitle) => setContent({ ...content, operationsTitle })} />
          <LocalizedTextarea label="Үйл ажиллагааны тайлбар" value={content.operationsDescription} onChange={(operationsDescription) => setContent({ ...content, operationsDescription })} />
          <LocalizedInput label="Яагаад сонгох гарчиг" value={content.whyTitle} onChange={(whyTitle) => setContent({ ...content, whyTitle })} />
          <LocalizedTextarea label="Яагаад сонгох тайлбар" value={content.whyDescription} onChange={(whyDescription) => setContent({ ...content, whyDescription })} />
          <LocalizedInput label="Холбоо барих гарчиг" value={content.contactTitle} onChange={(contactTitle) => setContent({ ...content, contactTitle })} />
          <LocalizedTextarea label="Холбоо барих тайлбар" value={content.contactDescription} onChange={(contactDescription) => setContent({ ...content, contactDescription })} />
          <LocalizedInput label="Холбоо барих товчны текст" value={content.contactButtonText} onChange={(contactButtonText) => setContent({ ...content, contactButtonText })} />
          <div className="grid gap-2">
            <Label>Холбоо барих товчны холбоос</Label>
            <Input value={content.contactButtonLink} onChange={(event) => setContent({ ...content, contactButtonLink: event.target.value })} />
          </div>
        </CardContent>
      </Card>

      {message ? <p className="text-sm text-slate-500">{message}</p> : null}
      <Button type="submit" disabled={saving}>
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Хадгалах
      </Button>
    </form>
  );
}
