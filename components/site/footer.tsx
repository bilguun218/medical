import Image from "next/image";
import Link from "next/link";
import { Globe2, Mail, MapPin, Phone, ShieldCheck, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getCmsContent, localized, localizedHref } from "@/lib/cms";

export async function SiteFooter({ locale }: { locale: Locale }) {
  const [footer, header, contact] = await Promise.all([
    getCmsContent("footer"),
    getCmsContent("header"),
    getCmsContent("contact")
  ]);
  const quickLinks = footer.quickLinks.filter((item) => item.visible).sort((a, b) => a.order - b.order);
  const websiteHref = contact.website ? (contact.website.startsWith("http") ? contact.website : `https://${contact.website}`) : "";
  const websiteLabel = contact.website.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const contactLinks = [
    ...contact.phoneNumbers.filter(Boolean).map((phone) => ({ label: phone, href: `tel:${phone.replace(/\s+/g, "")}`, icon: Phone })),
    ...(contact.email ? [{ label: contact.email, href: `mailto:${contact.email}`, icon: Mail }] : []),
    ...(websiteHref ? [{ label: websiteLabel, href: websiteHref, icon: Globe2 }] : [])
  ];
  const contactText: Array<{ label: string; icon: LucideIcon }> = [];
  const address = localized(contact.address, locale);
  const contactPerson = localized(contact.contactPerson, locale);
  if (address) contactText.push({ label: address, icon: MapPin });
  if (contactPerson) contactText.push({ label: contactPerson, icon: UserRound });
  const socialLinks = footer.socialLinks
    .filter((item) => item.visible && item.href !== websiteHref)
    .sort((a, b) => a.order - b.order);

  return (
    <footer className="bg-[#071525] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
              <Image src={header.logo || "/brand/novytas-logo.png"} alt="NOVYTAS" fill sizes="48px" className="object-contain" />
            </span>
            <div>
              <p className="text-lg font-semibold tracking-normal">{localized(header.companyName, locale)}</p>
              <p className="mt-1 text-sm text-slate-300">{localized(footer.copyright, locale)}</p>
            </div>
          </div>
          <p className="mt-6 max-w-lg text-sm leading-7 text-slate-300">{localized(footer.description, locale)}</p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold text-slate-200">
            <ShieldCheck className="h-4 w-4 text-teal" />
            {locale === "mn" ? "ЭМЯ-ны тусгай зөвшөөрлийн хүрээнд" : "Operating under MOH licensing"}
          </div>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold text-white">{localized(footer.quickLinksHeading, locale)}</h2>
          <ul className="mt-5 grid gap-3 text-sm text-slate-300">
            {quickLinks.map((link) => (
              <li key={`${link.href}-${link.order}`}>
                <Link className="transition hover:text-white" href={localizedHref(link.href, locale)}>
                  {localized(link.label, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h2 className="text-sm font-semibold text-white">{localized(footer.contactHeading, locale)}</h2>
          <ul className="mt-5 grid gap-3 text-sm text-slate-300">
            {contactLinks.map((link) => (
              <li key={link.href}>
                <a className="group flex items-center gap-3 rounded-xl bg-white/[0.04] px-3 py-2.5 transition hover:bg-white/[0.08] hover:text-white" href={link.href}>
                  <link.icon className="h-4 w-4 shrink-0 text-teal" />
                  {link.label}
                </a>
              </li>
            ))}
            {contactText.map((item) => (
              <li key={item.label} className="flex items-start gap-3 rounded-xl bg-white/[0.04] px-3 py-2.5">
                <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                <span>{item.label}</span>
              </li>
            ))}
            {socialLinks.map((link) => (
              <li key={`${link.label}-${link.order}`}>
                {link.href ? (
                  <a className="transition hover:text-white" href={link.href}>
                    {link.label}
                  </a>
                ) : (
                  link.label
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 text-xs text-slate-400 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>{localized(footer.copyright, locale)}</p>
          <p>{localized(header.companyName, locale)}</p>
        </div>
      </div>
    </footer>
  );
}
