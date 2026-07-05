"use client";

import { useState } from "react";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LocalizedInput, MediaField } from "@/components/admin/content/form-fields";
import { useContentSave } from "@/components/admin/content/use-content-save";
import type { HeaderContent } from "@/lib/cms";

export function HeaderContentForm({ initialValue }: { initialValue: HeaderContent }) {
  const [content, setContent] = useState(initialValue);
  const { save, saving, message } = useContentSave("header");

  return (
    <form className="grid gap-6" onSubmit={(event) => { event.preventDefault(); void save(content); }}>
      <Card>
        <CardHeader>
          <CardTitle>Брэнд</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <LocalizedInput label="Компанийн нэр" value={content.companyName} onChange={(companyName) => setContent({ ...content, companyName })} />
          <div className="grid gap-4 md:grid-cols-2">
            <MediaField label="Лого" value={content.logo} onChange={(logo) => setContent({ ...content, logo })} />
            <MediaField label="Харанхуй горимын лого" value={content.darkLogo} onChange={(darkLogo) => setContent({ ...content, darkLogo })} />
          </div>
          <LocalizedInput label="Холбоо барих товчны нэр" value={content.contactButtonLabel} onChange={(contactButtonLabel) => setContent({ ...content, contactButtonLabel })} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Цэс</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setContent({
                ...content,
                navItems: [...content.navItems, { key: `custom-${Date.now()}`, href: "/", order: content.navItems.length, visible: true, label: { mn: "", en: "" } }]
              })}
            >
              <Plus className="h-4 w-4" />
              Нэмэх
            </Button>
          </div>
          {content.navItems.map((item, index) => (
            <div key={item.key} className="grid gap-3 rounded-lg border p-3">
              <div className="grid gap-3 md:grid-cols-[1fr_1fr_120px_auto]">
                <Input
                  value={item.label.mn}
                  onChange={(event) => setContent({ ...content, navItems: content.navItems.map((nav, current) => current === index ? { ...nav, label: { ...nav.label, mn: event.target.value } } : nav) })}
                  placeholder="MN нэр"
                />
                <Input
                  value={item.label.en}
                  onChange={(event) => setContent({ ...content, navItems: content.navItems.map((nav, current) => current === index ? { ...nav, label: { ...nav.label, en: event.target.value } } : nav) })}
                  placeholder="EN нэр"
                />
                <Input
                  type="number"
                  value={item.order}
                  onChange={(event) => setContent({ ...content, navItems: content.navItems.map((nav, current) => current === index ? { ...nav, order: Number(event.target.value) } : nav) })}
                  placeholder="Дараалал"
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => setContent({ ...content, navItems: content.navItems.filter((_, current) => current !== index) })}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                <Input
                  value={item.href}
                  onChange={(event) => setContent({ ...content, navItems: content.navItems.map((nav, current) => current === index ? { ...nav, href: event.target.value } : nav) })}
                  placeholder="/about"
                />
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <input
                    type="checkbox"
                    checked={item.visible}
                    onChange={(event) => setContent({ ...content, navItems: content.navItems.map((nav, current) => current === index ? { ...nav, visible: event.target.checked } : nav) })}
                  />
                  Харагдах
                </label>
              </div>
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
