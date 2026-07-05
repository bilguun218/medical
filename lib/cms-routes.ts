import type { Locale } from "@/lib/i18n";

export const editableSeoRoutes = [
  { route: "/", label: "Нүүр", path: (locale: Locale) => `/${locale}` },
  { route: "/about", label: "Бидний тухай", path: (locale: Locale) => `/${locale}/about` },
  { route: "/contact", label: "Холбоо барих", path: (locale: Locale) => `/${locale}/contact` },
  { route: "/products", label: "Бүтээгдэхүүн", path: (locale: Locale) => `/${locale}/products` },
  { route: "/news", label: "Мэдээ", path: (locale: Locale) => `/${locale}/news` }
] as const;
