import type { Metadata } from "next";
import Link from "next/link";
import { existsSync } from "fs";
import path from "path";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  FileText,
  ImageIcon,
  Stethoscope
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeroTrustStats } from "@/components/site/hero-trust-stats";
import { HomeHeroShowcase } from "@/components/site/home-hero-showcase";
import { MotionReveal } from "@/components/site/motion-reveal";
import { PartnerMarquee } from "@/components/site/partner-marquee";
import { SectionHeading } from "@/components/site/section-heading";
import {
  advantages,
  company,
  sourceCountries,
  tText
} from "@/content/novytas";
import { getCmsContent, getSeoRecord, localized, localizedHref } from "@/lib/cms";
import { db } from "@/lib/db";
import { dictionary, getLocale } from "@/lib/i18n";
import { getProductCategoryOptions } from "@/lib/product-categories";
import { createMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type PageProps = { params: Promise<{ locale: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = getLocale(rawLocale);
  const [content, seo, latestMediaImage] = await Promise.all([
    getCmsContent("home"),
    getSeoRecord("/"),
    getLatestMediaImageUrl()
  ]);
  const ogImage = await resolveHeroImage([content.heroImage, latestMediaImage, "/brand/novytas-logo.png"]);

  return createMetadata({
    locale,
    path: `/${locale}`,
    title: localized(content.heroTitle, locale),
    description: localized(content.heroSubtitle, locale),
    ogImage,
    seo
  });
}

async function getLatestArticles() {
  try {
    return await db.article.findMany({
      where: { status: "PUBLISHED" },
      include: { category: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: 3
    });
  } catch {
    return [];
  }
}

async function getFeaturedProducts() {
  try {
    return await db.product.findMany({
      where: { status: "PUBLISHED" },
      include: {
        category: true,
        media: { include: { media: true }, orderBy: { sortOrder: "asc" } }
      },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: 3
    });
  } catch {
    return [];
  }
}

async function getLatestMediaImageUrl() {
  try {
    const media = await db.media.findFirst({
      where: { type: "IMAGE" },
      orderBy: { createdAt: "desc" }
    });

    return media?.url ?? "";
  } catch {
    return "";
  }
}

function publicAssetExists(src: string) {
  if (!src || src.startsWith("http") || src.startsWith("//")) {
    return Boolean(src);
  }

  if (!src.startsWith("/") || src.includes("..")) {
    return false;
  }

  return existsSync(path.join(process.cwd(), "public", src.replace(/^\/+/, "")));
}

async function resolveHeroImage(imageCandidates: string[]) {
  for (const image of imageCandidates) {
    if (publicAssetExists(image)) {
      return image;
    }
  }

  return "/brand/novytas-logo.png";
}

export default async function HomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = getLocale(rawLocale);
  const dict = dictionary[locale];
  const [categories, content, latestArticles, featuredProducts, latestMediaImage] = await Promise.all([
    getProductCategoryOptions(),
    getCmsContent("home"),
    getLatestArticles(),
    getFeaturedProducts(),
    getLatestMediaImageUrl()
  ]);
  const firstFeaturedProductImage = featuredProducts
    .flatMap((product) => product.media)
    .find((item) => item.media.type === "IMAGE")?.media.url ?? "";
  const heroImage = await resolveHeroImage([
    content.heroImage,
    firstFeaturedProductImage,
    latestMediaImage,
    "/brand/novytas-logo.png"
  ]);
  const heroStats = [
    { icon: "calendar" as const, value: `${company.establishedYear}`, label: locale === "mn" ? "оноос хойш" : "since" },
    { icon: "supplier" as const, value: locale === "mn" ? "Албан ёсны" : "Official", label: locale === "mn" ? "нийлүүлэгч" : "supplier" },
    { icon: "globe" as const, value: `${sourceCountries.length}+`, label: locale === "mn" ? "импортлогч улс" : "source countries" },
    { icon: "products" as const, value: "1000+", label: locale === "mn" ? "нийлүүлсэн бүтээгдэхүүн" : "supplied products" }
  ];
  const heroBadges = [
    { icon: "check" as const, label: locale === "mn" ? "Албан ёсны нийлүүлэгч" : "Official supplier" },
    { icon: "shield" as const, label: locale === "mn" ? "Баталгаат бүтээгдэхүүн" : "Warranty-backed products" },
    { icon: "truck" as const, label: locale === "mn" ? "Улсын хэмжээнд хүргэлт" : "Nationwide delivery" },
    { icon: "service" as const, label: locale === "mn" ? "Засвар үйлчилгээ" : "Maintenance service" }
  ];
  const partnerSources = sourceCountries.map((country) => tText(country, locale));

  return (
    <main className="page-reveal">
      <section
        className="home-hero-shell relative isolate overflow-hidden"
        style={content.heroBackgroundImage ? { backgroundImage: `url(${content.heroBackgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
      >
        <div className="pointer-events-none absolute left-[8%] top-20 h-72 w-72 rounded-full bg-medical/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[16%] top-10 h-56 w-56 rounded-full bg-teal/10 blur-3xl" />
        <div className="home-hero-geometry pointer-events-none absolute inset-0" />
        <div className="premium-container relative z-10 grid items-center gap-8 pb-8 pt-7 md:pb-10 md:pt-10 lg:min-h-[560px] lg:grid-cols-12 lg:gap-8 lg:py-12">
          <MotionReveal className="lg:col-span-6">
            <Badge className="mb-4 w-fit border-white/80 bg-white/78 shadow-sm backdrop-blur-xl">{dict.home.eyebrow}</Badge>
            <h1 className="max-w-4xl text-balance text-4xl font-bold leading-[1.04] tracking-normal text-primary md:text-5xl lg:text-[60px]">
              {localized(content.heroTitle, locale)}
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-xl font-semibold leading-8 text-slate-700">{localized(content.heroSubtitle, locale)}</p>
            {localized(content.heroDescription, locale) ? (
              <p className="mt-4 max-w-2xl whitespace-pre-line text-pretty text-base leading-8 text-slate-500">{localized(content.heroDescription, locale)}</p>
            ) : null}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="rounded-2xl px-6 shadow-premium" asChild>
                <Link href={localizedHref(content.primaryButtonLink, locale)}>
                  {localized(content.primaryButtonText, locale)}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-2xl border-white/80 bg-white/78 px-6 shadow-sm backdrop-blur-xl" asChild>
                <Link href={localizedHref(content.secondaryButtonLink, locale)}>{localized(content.secondaryButtonText, locale)}</Link>
              </Button>
            </div>
            <HeroTrustStats items={heroStats} />
          </MotionReveal>

          <div className="lg:col-span-6">
            <HomeHeroShowcase
              imageSrc={heroImage}
              imageAlt={company.name[locale]}
              eyebrow={locale === "mn" ? "Баталгаатай сонголт" : "Verified selection"}
              portfolioLabel={locale === "mn" ? "Эмнэлгийн тоног төхөөрөмжийн багц" : "Medical equipment portfolio"}
              badges={heroBadges}
            />
          </div>
        </div>
      </section>

      <PartnerMarquee label={locale === "mn" ? "Олон улсын эх сурвалж" : "Global source network"} items={partnerSources} />

      <section className="py-14 md:py-16 lg:py-20">
        <div className="premium-container">
          <MotionReveal>
            <SectionHeading
              eyebrow={locale === "mn" ? "Ангиллууд" : "Categories"}
              title={localized(content.operationsTitle, locale)}
              description={localized(content.operationsDescription, locale)}
            />
          </MotionReveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {categories.map((category, index) => (
              <MotionReveal key={category.id ?? category.title.mn} style={{ transitionDelay: `${index * 45}ms` }}>
                <Card className="premium-card-hover group h-full overflow-hidden">
                  <CardHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/[0.08] text-primary">
                      <Stethoscope className="h-5 w-5" />
                    </div>
                    <CardTitle>{tText(category.title, locale)}</CardTitle>
                    <CardDescription>{tText(category.description, locale)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link className="inline-flex items-center gap-2 text-sm font-semibold text-medical" href={category.id ? `/${locale}/products?category=${category.id}` : `/${locale}/products`}>
                      {dict.actions.viewProducts}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 lg:py-20 bg-white/72">
        <div className="premium-container">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <MotionReveal>
              <SectionHeading
                eyebrow={locale === "mn" ? "Онцлох" : "Featured"}
                title={locale === "mn" ? "Онцлох бүтээгдэхүүнүүд" : "Featured products"}
                description={locale === "mn" ? "Нийтлэгдсэн бүтээгдэхүүнүүдээс сүүлийн нэмэгдсэн сонголтууд." : "Recently published product selections from the catalog."}
              />
            </MotionReveal>
            <Button variant="outline" asChild>
              <Link href={`/${locale}/products`}>
                {dict.actions.viewProducts}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          {featuredProducts.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {featuredProducts.map((product, index) => {
                const title = locale === "mn" ? product.titleMn : product.titleEn || product.titleMn;
                const summary = locale === "mn" ? product.summaryMn : product.summaryEn || product.summaryMn;
                const image = product.media.find((item) => item.media.type === "IMAGE")?.media;

                return (
                  <MotionReveal key={product.id} style={{ transitionDelay: `${index * 45}ms` }}>
                    <Card className="premium-card-hover group h-full overflow-hidden">
                      <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-white">
                        {image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={image.url} alt={locale === "mn" ? image.altMn ?? title : image.altEn ?? title} className="premium-image h-full w-full object-cover" />
                        ) : (
                          <ImageIcon className="h-10 w-10 text-slate-300" />
                        )}
                      </div>
                      <CardHeader>
                        <Badge className="w-fit">{locale === "mn" ? product.category.titleMn : product.category.titleEn}</Badge>
                        <CardTitle>{title}</CardTitle>
                        {summary ? <CardDescription>{summary}</CardDescription> : null}
                        <Link className="inline-flex items-center gap-2 text-sm font-semibold text-medical" href={`/${locale}/products/${product.id}`}>
                          {dict.actions.learnMore}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </CardHeader>
                    </Card>
                  </MotionReveal>
                );
              })}
            </div>
          ) : (
            <Card className="mt-8">
              <CardHeader>
                <FileText className="h-8 w-8 text-teal" />
                <CardTitle>{dict.products.emptyTitle}</CardTitle>
                <CardDescription>{dict.products.emptyBody}</CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </section>

      <section className="premium-section">
        <div className="premium-container grid gap-12 lg:grid-cols-12 lg:items-center">
          <MotionReveal className="lg:col-span-5">
            <SectionHeading
              eyebrow={localized(content.introTitle, locale)}
              title={localized(content.whyTitle, locale)}
              description={localized(content.whyDescription, locale)}
            />
            <Button className="mt-8" variant="outline" asChild>
              <Link href={`/${locale}/about`}>
                {dict.actions.learnMore}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </MotionReveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {advantages.slice(0, 4).map((item, index) => (
              <MotionReveal key={item.title.mn} style={{ transitionDelay: `${index * 40}ms` }}>
                <div className="premium-card-hover h-full rounded-2xl border border-slate-200/70 bg-white p-6 shadow-subtle">
                  <BadgeCheck className="h-5 w-5 text-teal" />
                  <h3 className="mt-4 text-lg font-semibold text-primary">{tText(item.title, locale)}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{tText(item.body, locale)}</p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section bg-white/72">
        <div className="premium-container">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <MotionReveal>
              <SectionHeading
                eyebrow={locale === "mn" ? "Мэдээ" : "News"}
                title={dict.home.latestNews}
                description={locale === "mn" ? "Компанийн мэдээ, бүтээгдэхүүний шинэчлэл болон хамтын ажиллагааны мэдээлэл." : "Company updates, product notes, and partnership information."}
              />
            </MotionReveal>
            <Button variant="outline" asChild>
              <Link href={`/${locale}/news`}>
                {dict.actions.learnMore}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          {latestArticles.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {latestArticles.map((article, index) => {
                const title = locale === "mn" ? article.titleMn : article.titleEn || article.titleMn;
                const excerpt = locale === "mn" ? article.excerptMn : article.excerptEn || article.excerptMn;

                return (
                  <MotionReveal key={article.id} style={{ transitionDelay: `${index * 45}ms` }}>
                    <Card className="premium-card-hover h-full">
                      <CardHeader>
                        <p className="text-xs font-semibold text-slate-500">
                          {article.publishedAt ? formatDate(article.publishedAt, locale) : ""}
                          {article.category ? ` · ${locale === "mn" ? article.category.titleMn : article.category.titleEn}` : ""}
                        </p>
                        <CardTitle>{title}</CardTitle>
                        {excerpt ? <CardDescription>{excerpt}</CardDescription> : null}
                        <Link className="inline-flex items-center gap-2 text-sm font-semibold text-medical" href={`/${locale}/news/${article.id}`}>
                          {dict.actions.learnMore}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </CardHeader>
                    </Card>
                  </MotionReveal>
                );
              })}
            </div>
          ) : (
            <Card className="mt-12">
              <CardHeader>
                <CardTitle>{dict.news.emptyTitle}</CardTitle>
                <CardDescription>{dict.home.noNews}</CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </section>

      <section className="premium-section">
        <div className="premium-container">
          <MotionReveal>
            <div className="grid gap-8 rounded-[1.5rem] bg-primary p-8 text-white shadow-premium md:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/80">
                  <CheckCircle2 className="h-4 w-4 text-teal" />
                  {locale === "mn" ? "Албан ёсны нийлүүлэлт" : "Official supply"}
                </div>
                <h2 className="text-balance text-3xl font-semibold leading-[1.2] md:text-4xl">{localized(content.contactTitle, locale)}</h2>
                <p className="mt-4 max-w-3xl text-base leading-7 text-white/78">{localized(content.contactDescription, locale)}</p>
              </div>
              <Button variant="teal" size="lg" asChild>
                <Link href={localizedHref(content.contactButtonLink, locale)}>
                  {localized(content.contactButtonText, locale)}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </MotionReveal>
        </div>
      </section>
    </main>
  );
}
