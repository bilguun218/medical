import type { Metadata } from "next";
import { Clock, Globe2, Mail, MapPinned, Phone, UserRound } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/forms/contact-form";
import { MotionReveal } from "@/components/site/motion-reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { getCmsContent, getSeoRecord, localized } from "@/lib/cms";
import { dictionary, getLocale } from "@/lib/i18n";
import { createMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = getLocale(rawLocale);
  const [content, seo] = await Promise.all([
    getCmsContent("contact"),
    getSeoRecord("/contact")
  ]);
  return createMetadata({
    locale,
    path: `/${locale}/contact`,
    title: localized(content.pageTitle, locale),
    description: localized(content.pageSubtitle, locale),
    seo
  });
}

export default async function ContactPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = getLocale(rawLocale);
  const dict = dictionary[locale];
  const content = await getCmsContent("contact");
  const websiteHref = content.website ? (content.website.startsWith("http") ? content.website : `https://${content.website}`) : "";
  const websiteLabel = content.website.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const contactCards = [
    ...content.phoneNumbers.filter(Boolean).map((phone) => ({ icon: Phone, text: phone, href: `tel:${phone.replace(/\s+/g, "")}` })),
    ...(content.email ? [{ icon: Mail, text: content.email, href: `mailto:${content.email}` }] : []),
    ...(websiteHref ? [{ icon: Globe2, text: websiteLabel, href: websiteHref }] : []),
    ...(localized(content.contactPerson, locale) ? [{ icon: UserRound, text: localized(content.contactPerson, locale), href: "" }] : []),
    ...(localized(content.businessHours, locale) ? [{ icon: Clock, text: localized(content.businessHours, locale), href: "" }] : []),
    ...(localized(content.address, locale) ? [{ icon: MapPinned, text: localized(content.address, locale), href: "" }] : [])
  ];
  const socialLinks = [
    content.facebook ? { label: "Facebook", href: content.facebook } : null,
    content.instagram ? { label: "Instagram", href: content.instagram } : null,
    content.linkedin ? { label: "LinkedIn", href: content.linkedin } : null
  ].filter(Boolean) as Array<{ label: string; href: string }>;

  return (
    <main className="page-reveal premium-container premium-section">
      <MotionReveal>
        <SectionHeading title={localized(content.pageTitle, locale)} description={localized(content.pageSubtitle, locale)} />
      </MotionReveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          <Card className="premium-card-hover">
            <CardHeader>
              <CardTitle>{localized(content.infoTitle, locale)}</CardTitle>
              <CardDescription>{localized(content.companyName, locale)}</CardDescription>
            </CardHeader>
          </Card>
          {contactCards.map((item) => (
            <Card key={item.text} className="premium-card-hover bg-white">
              <CardHeader className="flex flex-row items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal/10">
                  <item.icon className="h-5 w-5 text-teal" />
                </span>
                <CardDescription>
                  {item.href ? <a href={item.href} className="hover:text-foreground">{item.text}</a> : item.text}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
          {socialLinks.length > 0 ? (
            <Card className="premium-card-hover bg-white">
              <CardHeader>
                <CardTitle>{locale === "mn" ? "Сошиал холбоос" : "Social links"}</CardTitle>
                <CardDescription className="flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <a key={link.href} href={link.href} className="font-semibold text-medical hover:underline">
                      {link.label}
                    </a>
                  ))}
                </CardDescription>
              </CardHeader>
            </Card>
          ) : null}
          {content.googleMapsEmbedUrl ? (
            <iframe
              src={content.googleMapsEmbedUrl}
              className="h-72 w-full rounded-xl border"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : null}
        </div>

        <Card className="shadow-premium">
          <CardHeader>
            <CardTitle>{localized(content.formTitle, locale)}</CardTitle>
            <CardDescription>{localized(content.pageSubtitle, locale)}</CardDescription>
          </CardHeader>
          <div className="px-6 pb-6">
            <ContactForm locale={locale} submitLabel={dict.actions.sendInquiry} />
          </div>
        </Card>
      </div>
    </main>
  );
}
