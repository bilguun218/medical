"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import type { Locale } from "@/lib/i18n";
import { dictionary } from "@/lib/i18n";
import { contactInquirySchema } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ContactFormValues = z.infer<typeof contactInquirySchema>;

export function ContactForm({
  locale,
  productId,
  defaultSubject = "",
  defaultMessage = "",
  submitLabel
}: {
  locale: Locale;
  productId?: string;
  defaultSubject?: string;
  defaultMessage?: string;
  submitLabel?: string;
}) {
  const dict = dictionary[locale];
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactInquirySchema),
    defaultValues: {
      name: "",
      organization: "",
      email: "",
      phone: "",
      subject: defaultSubject,
      message: defaultMessage,
      productId
    }
  });

  async function onSubmit(values: ContactFormValues) {
    setMessage(null);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      setMessage(dict.form.error);
      return;
    }

    form.reset();
    setMessage(dict.form.success);
  }

  return (
    <form className="grid gap-5" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <Label htmlFor="name">{dict.form.name}</Label>
        <Input id="name" {...form.register("name")} autoComplete="name" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="organization">{dict.form.organization}</Label>
        <Input id="organization" {...form.register("organization")} autoComplete="organization" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="email">{dict.form.email}</Label>
          <Input id="email" type="email" {...form.register("email")} autoComplete="email" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">{dict.form.phone}</Label>
          <Input id="phone" {...form.register("phone")} autoComplete="tel" />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="subject">{dict.form.subject}</Label>
        <Input id="subject" {...form.register("subject")} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">{dict.form.message}</Label>
        <Textarea id="message" {...form.register("message")} />
      </div>
      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {submitLabel ?? dict.actions.submit}
      </Button>
    </form>
  );
}
