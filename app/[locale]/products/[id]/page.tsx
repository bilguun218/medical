import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Download, FileText, ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/forms/contact-form";
import { MotionReveal } from "@/components/site/motion-reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { db } from "@/lib/db";
import { dictionary, getLocale } from "@/lib/i18n";
import { productSpecificationRows } from "@/lib/product-specifications";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ locale: string; id: string }> };

async function getProduct(id: string) {
  try {
    return await db.product.findUnique({
      where: { id },
      include: { category: true, media: { include: { media: true }, orderBy: { sortOrder: "asc" } } }
    });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, id } = await params;
  const locale = getLocale(rawLocale);
  const product = await getProduct(id);
  const title = product ? (locale === "mn" ? product.seoTitleMn || product.titleMn : product.seoTitleEn || product.titleEn || product.titleMn) : dictionary[locale].products.title;
  const description = product
    ? locale === "mn"
      ? product.seoDescriptionMn || product.summaryMn || undefined
      : product.seoDescriptionEn || product.summaryEn || product.summaryMn || undefined
    : undefined;
  return createMetadata({ locale, path: `/${locale}/products/${id}`, title, description });
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { locale: rawLocale, id } = await params;
  const locale = getLocale(rawLocale);
  const dict = dictionary[locale];
  const product = await getProduct(id);

  if (!product || product.status !== "PUBLISHED") {
    notFound();
  }

  const title = locale === "mn" ? product.titleMn : product.titleEn || product.titleMn;
  const summary = locale === "mn" ? product.summaryMn : product.summaryEn || product.summaryMn;
  const description = locale === "mn" ? product.descriptionMn : product.descriptionEn || product.descriptionMn;
  const quoteSubject = locale === "mn" ? `Үнийн санал авах: ${title}` : `Request a quote: ${title}`;
  const quoteMessage =
    locale === "mn"
      ? `Сайн байна уу. ${title} бүтээгдэхүүний үнийн санал, нийлүүлэлтийн нөхцөл болон дэлгэрэнгүй мэдээлэл авах хүсэлтэй байна.`
      : `Hello. I would like to receive a price quote, supply terms, and detailed information for ${title}.`;
  const images = product.media.filter((item) => item.media.type === "IMAGE");
  const files = product.media.filter((item) => item.media.type === "PDF" || item.role !== "GALLERY");
  const specifications = productSpecificationRows(product.specifications);

  return (
    <main className="page-reveal premium-container premium-section">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        <div className="grid gap-4 lg:col-span-5">
          <div className="group flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.5rem] border border-slate-200/70 bg-white shadow-premium">
            {images[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={images[0].media.url} alt={title} className="premium-image h-full w-full object-cover" />
            ) : (
              <ImageIcon className="h-12 w-12 text-muted-foreground" />
            )}
          </div>
        </div>

        <MotionReveal className="lg:col-span-7">
          <Badge className="mb-4 w-fit">{locale === "mn" ? product.category.titleMn : product.category.titleEn}</Badge>
          <h1 className="text-balance text-4xl font-bold leading-[1.12] text-primary md:text-5xl">{title}</h1>
          {summary ? <p className="mt-5 text-lg leading-8 text-muted-foreground">{summary}</p> : null}
          {description ? <div className="mt-8 whitespace-pre-line text-base leading-8 text-muted-foreground">{description}</div> : null}
          <div className="mt-8">
            <Button asChild>
              <a href="#quote-request">{dict.products.quoteButton}</a>
            </Button>
          </div>
        </MotionReveal>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <Card className="premium-card-hover">
          <CardHeader>
            <CardTitle>{dict.products.technicalSpecs}</CardTitle>
          </CardHeader>
          <CardContent>
            {specifications.length > 0 ? (
              <dl className="grid overflow-hidden rounded-xl border border-slate-200/70 text-sm">
                {specifications.map((item) => (
                  <div key={`${item.label}-${item.value}`} className="grid gap-2 border-b border-slate-200/70 p-4 last:border-b-0 sm:grid-cols-[0.42fr_1fr]">
                    <dt className="font-semibold text-primary">{item.label}</dt>
                    <dd className="leading-6 text-muted-foreground">{item.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <CardDescription>{dict.products.emptyBody}</CardDescription>
            )}
          </CardContent>
        </Card>
        <Card className="premium-card-hover">
          <CardHeader>
            <CardTitle>{dict.products.attachments}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {files.length > 0 ? (
              files.map((file) => (
                <a key={file.id} className="flex items-center gap-3 rounded-xl border border-slate-200/70 p-3 text-sm font-medium transition hover:bg-muted" href={file.media.url} target="_blank" rel="noreferrer">
                  <Download className="h-4 w-4 text-teal" />
                  {file.media.filename}
                </a>
              ))
            ) : (
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                {dict.products.emptyBody}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <section id="quote-request" className="mt-14 scroll-mt-24 rounded-[1.5rem] border border-slate-200/70 bg-white p-6 shadow-premium md:p-8">
        <SectionHeading title={dict.products.inquiryTitle} description={`${title} - ${dict.products.quoteDescription}`} />
        <div className="mt-8 max-w-2xl">
          <ContactForm
            locale={locale}
            productId={product.id}
            defaultSubject={quoteSubject}
            defaultMessage={quoteMessage}
            submitLabel={dict.actions.sendInquiry}
          />
        </div>
      </section>
    </main>
  );
}
