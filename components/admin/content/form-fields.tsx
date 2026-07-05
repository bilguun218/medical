"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MediaUpload } from "@/components/admin/media-upload";
import { RichTextEditor } from "@/components/admin/rich-text-editor";

export type LocalizedValue = {
  mn: string;
  en: string;
};

export function LocalizedInput({
  label,
  value,
  onChange
}: {
  label: string;
  value: LocalizedValue;
  onChange: (value: LocalizedValue) => void;
}) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <div className="grid gap-3 md:grid-cols-2">
        <Input value={value.mn} onChange={(event) => onChange({ ...value, mn: event.target.value })} placeholder="MN" />
        <Input value={value.en} onChange={(event) => onChange({ ...value, en: event.target.value })} placeholder="EN" />
      </div>
    </div>
  );
}

export function LocalizedTextarea({
  label,
  value,
  onChange,
  rows
}: {
  label: string;
  value: LocalizedValue;
  onChange: (value: LocalizedValue) => void;
  rows?: number;
}) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <div className="grid gap-3 md:grid-cols-2">
        <Textarea value={value.mn} rows={rows} onChange={(event) => onChange({ ...value, mn: event.target.value })} placeholder="MN" />
        <Textarea value={value.en} rows={rows} onChange={(event) => onChange({ ...value, en: event.target.value })} placeholder="EN" />
      </div>
    </div>
  );
}

export function LocalizedRichText({
  label,
  value,
  onChange
}: {
  label: string;
  value: LocalizedValue;
  onChange: (value: LocalizedValue) => void;
}) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="grid gap-2">
          <p className="text-xs font-medium text-slate-500">MN</p>
          <RichTextEditor value={value.mn} onChange={(mn) => onChange({ ...value, mn })} />
        </div>
        <div className="grid gap-2">
          <p className="text-xs font-medium text-slate-500">EN</p>
          <RichTextEditor value={value.en} onChange={(en) => onChange({ ...value, en })} />
        </div>
      </div>
    </div>
  );
}

export function MediaField({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <MediaUpload value={value} onChange={(url) => onChange(url)} />
      <Input value={value} onChange={(event) => onChange(event.target.value)} placeholder="/uploads/image.jpg" />
    </div>
  );
}

export function LocalizedTextList({
  label,
  values,
  onChange
}: {
  label: string;
  values: LocalizedValue[];
  onChange: (values: LocalizedValue[]) => void;
}) {
  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between gap-3">
        <Label>{label}</Label>
        <Button type="button" variant="outline" size="sm" onClick={() => onChange([...values, { mn: "", en: "" }])}>
          <Plus className="h-4 w-4" />
          Нэмэх
        </Button>
      </div>
      {values.map((item, index) => (
        <div key={index} className="grid gap-3 rounded-lg border p-3">
          <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
            <Input value={item.mn} onChange={(event) => onChange(values.map((value, current) => current === index ? { ...value, mn: event.target.value } : value))} placeholder="MN" />
            <Input value={item.en} onChange={(event) => onChange(values.map((value, current) => current === index ? { ...value, en: event.target.value } : value))} placeholder="EN" />
            <Button type="button" variant="ghost" size="icon" onClick={() => onChange(values.filter((_, current) => current !== index))}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function LocalizedSectionList({
  label,
  values,
  onChange
}: {
  label: string;
  values: Array<{ title: LocalizedValue; body: LocalizedValue }>;
  onChange: (values: Array<{ title: LocalizedValue; body: LocalizedValue }>) => void;
}) {
  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between gap-3">
        <Label>{label}</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onChange([...values, { title: { mn: "", en: "" }, body: { mn: "", en: "" } }])}
        >
          <Plus className="h-4 w-4" />
          Нэмэх
        </Button>
      </div>
      {values.map((item, index) => (
        <div key={index} className="grid gap-3 rounded-lg border p-3">
          <LocalizedInput
            label="Гарчиг"
            value={item.title}
            onChange={(title) => onChange(values.map((value, current) => current === index ? { ...value, title } : value))}
          />
          <LocalizedTextarea
            label="Тайлбар"
            value={item.body}
            onChange={(body) => onChange(values.map((value, current) => current === index ? { ...value, body } : value))}
          />
          <div className="flex justify-end">
            <Button type="button" variant="ghost" size="sm" onClick={() => onChange(values.filter((_, current) => current !== index))}>
              <Trash2 className="h-4 w-4" />
              Устгах
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
