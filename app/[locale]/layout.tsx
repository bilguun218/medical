import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { JsonLd } from "@/components/site/json-ld";
import { getCmsContent } from "@/lib/cms";
import { getLocale, isLocale, locales } from "@/lib/i18n";
import { organizationJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = getLocale(rawLocale);
  const header = await getCmsContent("header");

  return (
    <div className="site-shell min-h-screen">
      <JsonLd data={organizationJsonLd(locale)} />
      <SiteHeader locale={locale} content={header} />
      {children}
      <SiteFooter locale={locale} />
    </div>
  );
}
