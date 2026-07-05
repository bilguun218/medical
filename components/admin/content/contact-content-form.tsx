"use client";

import { useState } from "react";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LocalizedInput, LocalizedTextarea } from "@/components/admin/content/form-fields";
import { useContentSave } from "@/components/admin/content/use-content-save";
import type { ContactContent } from "@/lib/cms";

export function ContactContentForm({ initialValue }: { initialValue: ContactContent }) {
  const [content, setContent] = useState(initialValue);
  const { save, saving, message } = useContentSave("contact");

  return (
    <form className="grid gap-6" onSubmit={(event) => { event.preventDefault(); void save(content); }}>
      <Card>
        <CardHeader>
          <CardTitle>Холбоо барих хуудас</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <LocalizedInput label="Хуудасны гарчиг" value={content.pageTitle} onChange={(pageTitle) => setContent({ ...content, pageTitle })} />
          <LocalizedTextarea label="Хуудасны дэд гарчиг" value={content.pageSubtitle} onChange={(pageSubtitle) => setContent({ ...content, pageSubtitle })} />
          <LocalizedInput label="Мэдээллийн гарчиг" value={content.infoTitle} onChange={(infoTitle) => setContent({ ...content, infoTitle })} />
          <LocalizedInput label="Маягтын гарчиг" value={content.formTitle} onChange={(formTitle) => setContent({ ...content, formTitle })} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Компанийн холбоо барих мэдээлэл</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <LocalizedInput label="Компанийн нэр" value={content.companyName} onChange={(companyName) => setContent({ ...content, companyName })} />
          <LocalizedTextarea label="Хаяг" value={content.address} onChange={(address) => setContent({ ...content, address })} />
          <LocalizedInput label="Холбоо барих хүн" value={content.contactPerson} onChange={(contactPerson) => setContent({ ...content, contactPerson })} />
          <LocalizedTextarea label="Ажлын цаг" value={content.businessHours} onChange={(businessHours) => setContent({ ...content, businessHours })} />
          <div className="grid gap-2">
            <div className="flex items-center justify-between gap-3">
              <Label>Утасны дугаарууд</Label>
              <Button type="button" variant="outline" size="sm" onClick={() => setContent({ ...content, phoneNumbers: [...content.phoneNumbers, ""] })}>
                <Plus className="h-4 w-4" />
                Нэмэх
              </Button>
            </div>
            {content.phoneNumbers.map((phone, index) => (
              <div key={index} className="grid gap-2 md:grid-cols-[1fr_auto]">
                <Input value={phone} onChange={(event) => setContent({ ...content, phoneNumbers: content.phoneNumbers.map((item, current) => current === index ? event.target.value : item) })} />
                <Button type="button" variant="ghost" size="icon" onClick={() => setContent({ ...content, phoneNumbers: content.phoneNumbers.filter((_, current) => current !== index) })}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="grid gap-2">
            <Label>Имэйл</Label>
            <Input value={content.email} onChange={(event) => setContent({ ...content, email: event.target.value })} />
          </div>
          <div className="grid gap-2">
            <Label>Вэб сайт</Label>
            <Input value={content.website} onChange={(event) => setContent({ ...content, website: event.target.value })} />
          </div>
          <div className="grid gap-2">
            <Label>Google Maps оруулах холбоос</Label>
            <Input value={content.googleMapsEmbedUrl} onChange={(event) => setContent({ ...content, googleMapsEmbedUrl: event.target.value })} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Сошиал холбоосууд</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="grid gap-2">
            <Label>Facebook</Label>
            <Input value={content.facebook} onChange={(event) => setContent({ ...content, facebook: event.target.value })} />
          </div>
          <div className="grid gap-2">
            <Label>Instagram</Label>
            <Input value={content.instagram} onChange={(event) => setContent({ ...content, instagram: event.target.value })} />
          </div>
          <div className="grid gap-2">
            <Label>LinkedIn</Label>
            <Input value={content.linkedin} onChange={(event) => setContent({ ...content, linkedin: event.target.value })} />
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
