import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/utils";
import { company } from "@/content/novytas";

type SeoInput = {
  locale: Locale;
  path: string;
  title?: string;
  description?: string;
  ogImage?: string | null;
  seo?: {
    titleMn?: string | null;
    titleEn?: string | null;
    descriptionMn?: string | null;
    descriptionEn?: string | null;
    ogImage?: string | null;
    noIndex?: boolean | null;
  } | null;
};

export function createMetadata({ locale, path, title, description, ogImage, seo }: SeoInput): Metadata {
  const seoTitle = locale === "mn" ? seo?.titleMn : seo?.titleEn;
  const seoDescription = locale === "mn" ? seo?.descriptionMn : seo?.descriptionEn;
  const pageTitle = seoTitle || title ? `${seoTitle || title} | ${company.brand}` : `${company.name[locale]} | ${company.tagline[locale]}`;
  const pageDescription = seoDescription || description || company.summary[locale];
  const url = absoluteUrl(path);
  const image = seo?.ogImage || ogImage || "/brand/novytas-logo.png";

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: pageTitle,
    description: pageDescription,
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
    alternates: {
      canonical: url,
      languages: {
        mn: absoluteUrl(path.replace(/^\/en/, "/mn")),
        en: absoluteUrl(path.replace(/^\/mn/, "/en"))
      }
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: company.brand,
      locale: locale === "mn" ? "mn_MN" : "en_US",
      type: "website",
      images: [
        {
          url: absoluteUrl(image),
          width: 1200,
          height: 1200,
          alt: company.name[locale]
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [absoluteUrl(image)]
    }
  };
}

export function organizationJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name[locale],
    legalName: company.name[locale],
    foundingDate: String(company.establishedYear),
    logo: absoluteUrl("/brand/novytas-logo.png"),
    description: company.summary[locale],
    address: {
      "@type": "PostalAddress",
      addressLocality: locale === "mn" ? "Улаанбаатар хот" : "Ulaanbaatar",
      addressCountry: "MN"
    }
  };
}
