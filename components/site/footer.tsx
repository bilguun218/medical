import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { dictionary } from "@/lib/i18n";
import { company, productCategories, tText } from "@/content/novytas";

export function SiteFooter({ locale }: { locale: Locale }) {
  const dict = dictionary[locale];

  return (
    <footer className="border-t bg-muted/45">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border bg-transparent">
              <Image src="/brand/novytas-logo.png" alt="NOVYTAS" fill sizes="48px" className="object-contain" />
            </span>
            <div>
              <p className="font-semibold text-primary dark:text-white">{company.name[locale]}</p>
              <p className="text-sm text-muted-foreground">{company.tagline[locale]}</p>
            </div>
          </div>
          <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground">{company.summary[locale]}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold">{dict.nav.products}</h2>
          <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
            {productCategories.map((category) => (
              <li key={category.slug}>
                <Link className="hover:text-foreground" href={`/${locale}/products?category=${category.slug}`}>
                  {tText(category.title, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold">{dict.nav.contact}</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{company.contactLine[locale]}</p>
          <Link className="mt-5 inline-flex text-sm font-semibold text-medical hover:underline" href="/admin">
            {dict.nav.admin}
          </Link>
        </div>
      </div>
      <div className="border-t py-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 text-xs text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>{company.sourceCityYear[locale]}</p>
          <p>{company.name[locale]}</p>
        </div>
      </div>
    </footer>
  );
}
