"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { HeaderContent } from "@/lib/cms";
import type { Locale } from "@/lib/i18n";
import { dictionary, otherLocale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { cn } from "@/lib/utils";

function withLocale(href: string, locale: Locale) {
  if (!href) return `/${locale}`;
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) return href;
  return `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
}

export function SiteHeader({ locale, content }: { locale: Locale; content: HeaderContent }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const dict = dictionary[locale];
  const alternate = otherLocale(locale);
  const alternatePath = pathname.replace(`/${locale}`, `/${alternate}`);
  const navItems = content.navItems
    .filter((item) => item.visible)
    .sort((a, b) => a.order - b.order);
  const logo = content.logo || "/brand/novytas-logo.png";

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition duration-300 ease-out",
        scrolled || open
          ? "border-b border-slate-200/70 bg-white/88 shadow-[0_12px_35px_rgba(11,47,85,0.06)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/88"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <Link href={`/${locale}`} className="flex items-center gap-3" aria-label="NOVYTAS home">
          <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-slate-200/70 bg-white/80 shadow-sm">
            <Image src={logo} alt="NOVYTAS" fill sizes="40px" className="object-contain" priority />
          </span>
          <span className="text-base font-semibold tracking-normal text-primary">{content.companyName[locale]}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const href = withLocale(item.href, locale);
            const active = pathname === href;
            return (
              <Link
                key={item.key}
                href={href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground",
                  active && "bg-white text-primary shadow-sm dark:bg-white/10 dark:text-white"
                )}
              >
                {item.label[locale]}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href={alternatePath}>{dict.alternateLocaleName}</Link>
          </Button>
          <ThemeToggle />
          <Button size="sm" asChild>
            <Link href={`/${locale}/contact`}>{content.contactButtonLabel[locale] || dict.nav.contact}</Link>
          </Button>
        </div>

        <button
          type="button"
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg border lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t bg-white/96 backdrop-blur-xl lg:hidden dark:border-slate-800/80 dark:bg-slate-950/96">
          <nav className="mx-auto grid w-full max-w-7xl gap-1 px-4 py-4" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={withLocale(item.href, locale)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {item.label[locale]}
              </Link>
            ))}
            <div className="mt-3 flex items-center gap-2 border-t pt-3">
              <Button variant="outline" size="sm" asChild>
                <Link href={alternatePath}>{dict.alternateLocaleName}</Link>
              </Button>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
