"use client";

import { useState } from "react";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LocalizedInput, LocalizedTextarea } from "@/components/admin/content/form-fields";
import { useContentSave } from "@/components/admin/content/use-content-save";
import type { FooterContent } from "@/lib/cms";

export function FooterContentForm({ initialValue }: { initialValue: FooterContent }) {
  const [content, setContent] = useState(initialValue);
  const { save, saving, message } = useContentSave("footer");

  return (
    <form className="grid gap-6" onSubmit={(event) => { event.preventDefault(); void save(content); }}>
      <Card>
        <CardHeader>
          <CardTitle>Хөл хэсгийн контент</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <LocalizedTextarea label="Хөл хэсгийн тайлбар" value={content.description} onChange={(description) => setContent({ ...content, description })} />
          <LocalizedInput label="Зохиогчийн эрх" value={content.copyright} onChange={(copyright) => setContent({ ...content, copyright })} />
          <LocalizedInput label="Шуурхай холбоосын гарчиг" value={content.quickLinksHeading} onChange={(quickLinksHeading) => setContent({ ...content, quickLinksHeading })} />
          <LocalizedInput label="Холбоо барих гарчиг" value={content.contactHeading} onChange={(contactHeading) => setContent({ ...content, contactHeading })} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Шуурхай холбоосууд</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex justify-end">
            <Button type="button" variant="outline" size="sm" onClick={() => setContent({ ...content, quickLinks: [...content.quickLinks, { label: { mn: "", en: "" }, href: "/", order: content.quickLinks.length, visible: true }] })}>
              <Plus className="h-4 w-4" />
              Нэмэх
            </Button>
          </div>
          {content.quickLinks.map((item, index) => (
            <div key={index} className="grid gap-3 rounded-lg border p-3">
              <div className="grid gap-3 md:grid-cols-[1fr_1fr_120px_auto]">
                <Input value={item.label.mn} onChange={(event) => setContent({ ...content, quickLinks: content.quickLinks.map((link, current) => current === index ? { ...link, label: { ...link.label, mn: event.target.value } } : link) })} placeholder="MN нэр" />
                <Input value={item.label.en} onChange={(event) => setContent({ ...content, quickLinks: content.quickLinks.map((link, current) => current === index ? { ...link, label: { ...link.label, en: event.target.value } } : link) })} placeholder="EN нэр" />
                <Input type="number" value={item.order} onChange={(event) => setContent({ ...content, quickLinks: content.quickLinks.map((link, current) => current === index ? { ...link, order: Number(event.target.value) } : link) })} />
                <Button type="button" variant="ghost" size="icon" onClick={() => setContent({ ...content, quickLinks: content.quickLinks.filter((_, current) => current !== index) })}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                <Input value={item.href} onChange={(event) => setContent({ ...content, quickLinks: content.quickLinks.map((link, current) => current === index ? { ...link, href: event.target.value } : link) })} placeholder="/products" />
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <input type="checkbox" checked={item.visible} onChange={(event) => setContent({ ...content, quickLinks: content.quickLinks.map((link, current) => current === index ? { ...link, visible: event.target.checked } : link) })} />
                  Харагдах
                </label>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Сошиал холбоосууд</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex justify-end">
            <Button type="button" variant="outline" size="sm" onClick={() => setContent({ ...content, socialLinks: [...content.socialLinks, { label: "", href: "", order: content.socialLinks.length, visible: true }] })}>
              <Plus className="h-4 w-4" />
              Нэмэх
            </Button>
          </div>
          {content.socialLinks.map((item, index) => (
            <div key={index} className="grid gap-3 rounded-lg border p-3 md:grid-cols-[1fr_1fr_120px_auto_auto]">
              <Input value={item.label} onChange={(event) => setContent({ ...content, socialLinks: content.socialLinks.map((link, current) => current === index ? { ...link, label: event.target.value } : link) })} placeholder="Facebook" />
              <Input value={item.href} onChange={(event) => setContent({ ...content, socialLinks: content.socialLinks.map((link, current) => current === index ? { ...link, href: event.target.value } : link) })} placeholder="https://" />
              <Input type="number" value={item.order} onChange={(event) => setContent({ ...content, socialLinks: content.socialLinks.map((link, current) => current === index ? { ...link, order: Number(event.target.value) } : link) })} />
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <input type="checkbox" checked={item.visible} onChange={(event) => setContent({ ...content, socialLinks: content.socialLinks.map((link, current) => current === index ? { ...link, visible: event.target.checked } : link) })} />
                Харагдах
              </label>
              <Button type="button" variant="ghost" size="icon" onClick={() => setContent({ ...content, socialLinks: content.socialLinks.filter((_, current) => current !== index) })}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
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
