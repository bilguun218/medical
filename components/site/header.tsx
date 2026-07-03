"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { dictionary, otherLocale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { company } from "@/content/novytas";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "", key: "home" },
  { href: "/about", key: "about" },
  { href: "/products", key: "products" },
  { href: "/news", key: "news" },
  { href: "/contact", key: "contact" }
] as const;

export function SiteHeader({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();
  const dict = dictionary[locale];
  const alternate = otherLocale(locale);
  const alternatePath = pathname.replace(`/${locale}`, `/${alternate}`);

  useEffect(() => {
    function update() {
      setIsDark(document.documentElement.classList.contains("dark"));
    }
    update();
    const obs = new MutationObserver(() => update());
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/86 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="flex items-center gap-3" aria-label="NOVYTAS home">
          <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg border bg-transparent">
            <Image src={isDark ? "/brand/novytas-logo-white.png" : "/brand/novytas-logo.png"} alt="NOVYTAS" fill sizes="44px" className="object-contain" priority />
          </span>
          <span className="text-base font-semibold tracking-normal text-primary dark:text-white">{company.name[locale]}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const href = `/${locale}${item.href}`;
            const active = pathname === href;
            return (
              <Link
                key={item.key}
                href={href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground",
                  active && "bg-muted text-foreground"
                )}
              >
                {dict.nav[item.key]}
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
            <Link href={`/${locale}/contact`}>{dict.nav.contact}</Link>
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
        <div className="border-t bg-background lg:hidden">
          <nav className="mx-auto grid w-full max-w-7xl gap-1 px-4 py-4" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className="rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {dict.nav[item.key]}
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
