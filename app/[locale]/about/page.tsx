import type { Metadata } from "next";
import { CheckCircle2, FileCheck2, HeartPulse, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MotionReveal } from "@/components/site/motion-reveal";
import { RichText } from "@/components/site/rich-text";
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
    getCmsContent("about"),
    getSeoRecord("/about")
  ]);
  return createMetadata({
    locale,
    path: `/${locale}/about`,
    title: localized(content.pageTitle, locale),
    description: localized(content.companyDescription, locale),
    ogImage: content.heroImage || content.secondaryImage || null,
    seo
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = getLocale(rawLocale);
  const dict = dictionary[locale];
  const content = await getCmsContent("about");

  return (
    <main className="page-reveal">
      <section className="premium-container premium-section">
        <MotionReveal>
          <Badge className="mb-6 w-fit">{localized(content.companyIntroduction, locale)}</Badge>
        </MotionReveal>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h1 className="text-balance text-5xl font-bold leading-[1.1] tracking-normal text-primary md:text-6xl">
              {localized(content.pageTitle, locale)}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{localized(content.pageSubtitle, locale)}</p>
          </div>
          <Card className="lg:col-span-7">
            <CardHeader>
              <CardTitle>{localized(content.companyIntroduction, locale)}</CardTitle>
              <CardDescription className="text-base leading-8">{localized(content.companyDescription, locale)}</CardDescription>
            </CardHeader>
          </Card>
        </div>
        {content.heroImage || content.secondaryImage ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[content.heroImage, content.secondaryImage].filter(Boolean).map((image) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={image} src={image} alt={localized(content.pageTitle, locale)} className="aspect-[16/9] w-full rounded-xl border object-cover" />
            ))}
          </div>
        ) : null}
      </section>

      <section className="premium-section bg-white/72">
        <div className="premium-container grid gap-6 lg:grid-cols-3">
          <Card className="premium-card-hover">
            <CardHeader>
              <HeartPulse className="h-6 w-6 text-teal" />
              <CardTitle>{dict.about.missionVision}</CardTitle>
              <CardDescription>{localized(content.missionLead, locale)}</CardDescription>
            </CardHeader>
          </Card>
          <Card className="premium-card-hover">
            <CardHeader>
              <CheckCircle2 className="h-6 w-6 text-teal" />
              <CardTitle>{locale === "mn" ? "Эрхэм зорилго" : "Mission"}</CardTitle>
              <CardDescription>{localized(content.mission, locale)}</CardDescription>
            </CardHeader>
          </Card>
          <Card className="premium-card-hover">
            <CardHeader>
              <ShieldCheck className="h-6 w-6 text-teal" />
              <CardTitle>{locale === "mn" ? "Алсын хараа" : "Vision"}</CardTitle>
              <CardDescription>{localized(content.vision, locale)}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section className="premium-section">
        <div className="premium-container grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <SectionHeading title={dict.about.values} description={localized(content.missionLead, locale)} />
          <div className="grid gap-4 sm:grid-cols-2">
            {content.values.map((value) => (
              <div key={value.mn} className="premium-card-hover rounded-2xl border border-slate-200/70 bg-white p-6 shadow-subtle">
                <p className="font-semibold">{localized(value, locale)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {localized(content.companyHistory, locale) || localized(content.ceoMessage, locale) ? (
        <section className="premium-section bg-white/72">
          <div className="premium-container grid gap-6 lg:grid-cols-2">
            {localized(content.companyHistory, locale) ? (
              <Card>
                <CardHeader>
                  <CardTitle>{locale === "mn" ? "Компанийн түүх" : "Company history"}</CardTitle>
                </CardHeader>
                <div className="px-6 pb-6">
                  <RichText html={localized(content.companyHistory, locale)} />
                </div>
              </Card>
            ) : null}
            {localized(content.ceoMessage, locale) ? (
              <Card>
                <CardHeader>
                  <CardTitle>{locale === "mn" ? "CEO мэндчилгээ" : "CEO message"}</CardTitle>
                </CardHeader>
                <div className="px-6 pb-6">
                  <RichText html={localized(content.ceoMessage, locale)} />
                </div>
              </Card>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="premium-section bg-white/72">
        <div className="premium-container">
          <SectionHeading title={dict.about.advantages} />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {content.advantages.map((item) => (
              <Card key={item.title.mn} className="premium-card-hover">
                <CardHeader>
                  <CardTitle className="text-base">{localized(item.title, locale)}</CardTitle>
                  <CardDescription>{localized(item.body, locale)}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section">
        <div className="premium-container">
          <SectionHeading title={dict.about.compliance} description={localized(content.compliancePrinciple, locale)} />
          <div className="mt-10 grid gap-4">
            {content.compliance.map((item) => (
              <Card key={item.title.mn} className="premium-card-hover">
                <CardHeader className="md:flex md:flex-row md:items-start md:gap-5">
                  <FileCheck2 className="h-6 w-6 shrink-0 text-teal" />
                  <div>
                    <CardTitle className="text-base">{localized(item.title, locale)}</CardTitle>
                    <CardDescription className="mt-2">{localized(item.body, locale)}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
