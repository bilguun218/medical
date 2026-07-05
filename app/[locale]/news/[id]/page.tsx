import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { MotionReveal } from "@/components/site/motion-reveal";
import { RichText } from "@/components/site/rich-text";
import { db } from "@/lib/db";
import { dictionary, getLocale } from "@/lib/i18n";
import { createMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ locale: string; id: string }> };

async function getArticle(id: string) {
  try {
    return await db.article.findUnique({
      where: { id },
      include: { category: true, coverImage: true, author: true }
    });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, id } = await params;
  const locale = getLocale(rawLocale);
  const article = await getArticle(id);
  const title = article ? (locale === "mn" ? article.seoTitleMn || article.titleMn : article.seoTitleEn || article.titleEn || article.titleMn) : dictionary[locale].news.title;
  const description = article
    ? locale === "mn"
      ? article.seoDescriptionMn || article.excerptMn || undefined
      : article.seoDescriptionEn || article.excerptEn || article.excerptMn || undefined
    : undefined;
  return createMetadata({ locale, path: `/${locale}/news/${id}`, title, description, ogImage: article?.coverImage?.url });
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { locale: rawLocale, id } = await params;
  const locale = getLocale(rawLocale);
  const article = await getArticle(id);

  if (!article || article.status !== "PUBLISHED") {
    notFound();
  }

  const title = locale === "mn" ? article.titleMn : article.titleEn || article.titleMn;
  const body = locale === "mn" ? article.bodyMn : article.bodyEn || article.bodyMn;

  return (
    <main className="page-reveal premium-container premium-section">
      <article className="mx-auto max-w-4xl">
        <MotionReveal className="mb-8">
          <div className="mb-6 flex flex-wrap gap-3">
          {article.category ? <Badge>{locale === "mn" ? article.category.titleMn : article.category.titleEn}</Badge> : null}
          {article.publishedAt ? <Badge>{formatDate(article.publishedAt, locale)}</Badge> : null}
          </div>
          <h1 className="text-balance text-4xl font-bold leading-[1.12] text-primary md:text-5xl">{title}</h1>
        </MotionReveal>
        {article.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={article.coverImage.url} alt={title} className="mt-10 aspect-[16/9] w-full rounded-[1.5rem] object-cover shadow-premium" />
        ) : null}
        <RichText html={body} className="mt-10" />
      </article>
    </main>
  );
}
