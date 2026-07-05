"use client";

import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LocalizedInput,
  LocalizedRichText,
  LocalizedSectionList,
  LocalizedTextarea,
  LocalizedTextList,
  MediaField
} from "@/components/admin/content/form-fields";
import { useContentSave } from "@/components/admin/content/use-content-save";
import type { AboutContent } from "@/lib/cms";

export function AboutContentForm({ initialValue }: { initialValue: AboutContent }) {
  const [content, setContent] = useState(initialValue);
  const { save, saving, message } = useContentSave("about");

  return (
    <form className="grid gap-6" onSubmit={(event) => { event.preventDefault(); void save(content); }}>
      <Card>
        <CardHeader>
          <CardTitle>Хуудасны эхлэл</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <LocalizedInput label="Хуудасны гарчиг" value={content.pageTitle} onChange={(pageTitle) => setContent({ ...content, pageTitle })} />
          <LocalizedTextarea label="Хуудасны дэд гарчиг" value={content.pageSubtitle} onChange={(pageSubtitle) => setContent({ ...content, pageSubtitle })} />
          <LocalizedInput label="Компанийн танилцуулга" value={content.companyIntroduction} onChange={(companyIntroduction) => setContent({ ...content, companyIntroduction })} />
          <LocalizedTextarea label="Компанийн тайлбар" value={content.companyDescription} onChange={(companyDescription) => setContent({ ...content, companyDescription })} />
          <div className="grid gap-4 md:grid-cols-2">
            <MediaField label="Бидний тухай зураг" value={content.heroImage} onChange={(heroImage) => setContent({ ...content, heroImage })} />
            <MediaField label="Нэмэлт зураг" value={content.secondaryImage} onChange={(secondaryImage) => setContent({ ...content, secondaryImage })} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Эрхэм зорилго, алсын хараа, үнэт зүйлс</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <LocalizedTextarea label="Эрхэм зорилго, алсын харааны тайлбар" value={content.missionLead} onChange={(missionLead) => setContent({ ...content, missionLead })} />
          <LocalizedTextarea label="Эрхэм зорилго" value={content.mission} onChange={(mission) => setContent({ ...content, mission })} />
          <LocalizedTextarea label="Алсын хараа" value={content.vision} onChange={(vision) => setContent({ ...content, vision })} />
          <LocalizedTextList label="Үнэт зүйлс" values={content.values} onChange={(values) => setContent({ ...content, values })} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Дэлгэрэнгүй контент</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <LocalizedRichText label="Компанийн түүх" value={content.companyHistory} onChange={(companyHistory) => setContent({ ...content, companyHistory })} />
          <LocalizedRichText label="Гүйцэтгэх захирлын мэндчилгээ" value={content.ceoMessage} onChange={(ceoMessage) => setContent({ ...content, ceoMessage })} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Нэмэлт хэсгүүд</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <LocalizedSectionList label="Давуу талууд" values={content.advantages} onChange={(advantages) => setContent({ ...content, advantages })} />
          <LocalizedTextarea label="Хууль, эрх зүйн нийцлийн тайлбар" value={content.compliancePrinciple} onChange={(compliancePrinciple) => setContent({ ...content, compliancePrinciple })} />
          <LocalizedSectionList label="Хууль, эрх зүйн нийцэл" values={content.compliance} onChange={(compliance) => setContent({ ...content, compliance })} />
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
