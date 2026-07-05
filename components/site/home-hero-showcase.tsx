"use client";

import { BadgeCheck, CheckCircle2, ShieldCheck, Truck, Wrench } from "lucide-react";
import Image from "next/image";

type BadgeIcon = "check" | "shield" | "truck" | "service";

type ShowcaseBadge = {
  icon: BadgeIcon;
  label: string;
};

const badgeIcons = {
  check: CheckCircle2,
  shield: ShieldCheck,
  truck: Truck,
  service: Wrench
};

export function HomeHeroShowcase({
  imageSrc,
  imageAlt,
  eyebrow,
  portfolioLabel,
  badges
}: {
  imageSrc: string;
  imageAlt: string;
  eyebrow: string;
  portfolioLabel: string;
  badges: ShowcaseBadge[];
}) {
  return (
    <div className="relative mx-auto w-full max-w-[520px] lg:ml-auto">
      <div className="home-showcase-card group relative overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/76 p-4 shadow-premium backdrop-blur-2xl dark:border-white/10 dark:bg-white/10 md:p-5">
        <div className="pointer-events-none absolute inset-x-10 top-0 h-28 rounded-full bg-medical/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-12 h-48 w-48 rounded-full bg-teal/10 blur-3xl" />

        <div className="relative mb-4 flex items-center justify-between gap-4 rounded-2xl border border-white/70 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
          <div className="min-w-0">
            <p className="text-safe text-xs font-semibold uppercase tracking-[0.08em] text-teal">{eyebrow}</p>
            <p className="text-safe mt-1 text-sm font-semibold text-primary">{portfolioLabel}</p>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white shadow-subtle">
            <BadgeCheck className="h-5 w-5" />
          </span>
        </div>

        <div className="home-showcase-image-frame relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.25rem] border border-slate-200/70 bg-white/86 p-5 shadow-inner dark:border-white/10 dark:bg-white/5 md:p-7">
          <div className="pointer-events-none absolute inset-5 rounded-[1rem] border border-medical/10" />
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={680}
            height={520}
            priority
            unoptimized={imageSrc.startsWith("http")}
            className="relative z-10 h-full w-full object-contain drop-shadow-[0_24px_34px_rgba(11,47,85,0.16)]"
          />
        </div>

        <div className="relative mt-4 grid gap-2 sm:grid-cols-2">
          {badges.map((badge) => {
            const Icon = badgeIcons[badge.icon];

            return (
              <div
                key={badge.label}
                className="flex min-w-0 items-start gap-2 rounded-2xl border border-white/80 bg-white/72 px-3 py-2 text-xs font-semibold leading-4 text-primary shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/10"
              >
                <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal" />
                <span className="text-safe min-w-0">{badge.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
