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
type ContactFieldName = keyof ContactFormValues;

const formCopy = {
  mn: {
    validationError: "Мэдээллээ шалгаад дахин илгээнэ үү.",
    networkError: "Сүлжээний алдаа гарлаа. Түр хүлээгээд дахин оролдоно уу.",
    fields: {
      name: "Нэрээ 2-оос дээш тэмдэгтээр оруулна уу.",
      email: "Зөв имэйл хаяг оруулна уу.",
      subject: "Гарчгийг 3-аас дээш тэмдэгтээр оруулна уу.",
      message: "Дэлгэрэнгүй мэдээллийг 10-аас дээш тэмдэгтээр оруулна уу."
    }
  },
  en: {
    validationError: "Please check the highlighted fields and try again.",
    networkError: "A network error occurred. Please try again shortly.",
    fields: {
      name: "Enter a name with at least 2 characters.",
      email: "Enter a valid email address.",
      subject: "Enter a subject with at least 3 characters.",
      message: "Enter a message with at least 10 characters."
    }
  }
} as const;

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
  const copy = formCopy[locale];
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);

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
    setNotice(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        setNotice({ type: "error", text: dict.form.error });
        return;
      }

      form.reset();
      setNotice({ type: "success", text: dict.form.success });
    } catch {
      setNotice({ type: "error", text: copy.networkError });
    }
  }

  function onInvalid() {
    setNotice({ type: "error", text: copy.validationError });
  }

  function FieldError({ name }: { name: ContactFieldName }) {
    if (!form.formState.errors[name]) {
      return null;
    }

    const text = copy.fields[name as keyof typeof copy.fields] ?? copy.validationError;
    return (
      <p id={`${name}-error`} className="text-xs font-medium text-red-600 dark:text-red-400" role="alert">
        {text}
      </p>
    );
  }

  return (
    <form className="grid gap-5" onSubmit={form.handleSubmit(onSubmit, onInvalid)} noValidate>
      <div className="grid gap-2">
        <Label htmlFor="name">{dict.form.name}</Label>
        <Input
          id="name"
          {...form.register("name")}
          autoComplete="name"
          aria-invalid={Boolean(form.formState.errors.name)}
          aria-describedby={form.formState.errors.name ? "name-error" : undefined}
        />
        <FieldError name="name" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="organization">{dict.form.organization}</Label>
        <Input id="organization" {...form.register("organization")} autoComplete="organization" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="email">{dict.form.email}</Label>
          <Input
            id="email"
            type="email"
            {...form.register("email")}
            autoComplete="email"
            aria-invalid={Boolean(form.formState.errors.email)}
            aria-describedby={form.formState.errors.email ? "email-error" : undefined}
          />
          <FieldError name="email" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">{dict.form.phone}</Label>
          <Input id="phone" {...form.register("phone")} autoComplete="tel" />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="subject">{dict.form.subject}</Label>
        <Input
          id="subject"
          {...form.register("subject")}
          aria-invalid={Boolean(form.formState.errors.subject)}
          aria-describedby={form.formState.errors.subject ? "subject-error" : undefined}
        />
        <FieldError name="subject" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">{dict.form.message}</Label>
        <Textarea
          id="message"
          {...form.register("message")}
          aria-invalid={Boolean(form.formState.errors.message)}
          aria-describedby={form.formState.errors.message ? "message-error" : undefined}
        />
        <FieldError name="message" />
      </div>
      {notice ? (
        <p className={notice.type === "success" ? "text-sm font-medium text-teal" : "text-sm font-medium text-red-600 dark:text-red-400"}>
          {notice.text}
        </p>
      ) : null}
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {submitLabel ?? dict.actions.submit}
      </Button>
    </form>
  );
}
