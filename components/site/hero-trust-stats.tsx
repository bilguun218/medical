"use client";

import { BadgeCheck, Building2, Globe2, PackageCheck } from "lucide-react";

type StatIcon = "calendar" | "supplier" | "globe" | "products";

type HeroTrustStat = {
  icon: StatIcon;
  value: string;
  label: string;
};

const icons = {
  calendar: Building2,
  supplier: BadgeCheck,
  globe: Globe2,
  products: PackageCheck
};

export function HeroTrustStats({ items }: { items: HeroTrustStat[] }) {
  return (
    <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,12rem),1fr))] gap-3">
      {items.map((item) => {
        const Icon = icons[item.icon];

        return (
          <div
            key={`${item.value}-${item.label}`}
            className="group min-w-0 rounded-2xl border border-white/80 bg-white/78 p-4 shadow-subtle backdrop-blur-xl transition duration-300 hover:border-medical/20 hover:bg-white hover:shadow-premium dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-medical/10 text-medical transition duration-300 group-hover:bg-medical group-hover:text-white">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-safe text-base font-semibold leading-5 text-primary">{item.value}</p>
                <p className="text-safe mt-1 text-xs leading-4 text-slate-500">{item.label}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
