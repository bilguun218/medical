import { z } from "zod";
import { advantages, company, compliance, compliancePrinciple } from "@/content/novytas";
import { editableSeoRoutes } from "@/lib/cms-routes";
import { db } from "@/lib/db";
import { dictionary, type Locale } from "@/lib/i18n";

const localizedTextSchema = z.object({
  mn: z.string().max(50000),
  en: z.string().max(50000)
});

const linkItemSchema = z.object({
  label: localizedTextSchema,
  href: z.string().max(2048),
  order: z.number().int().default(0),
  visible: z.boolean().default(true)
});

const socialLinkSchema = z.object({
  label: z.string().max(80),
  href: z.string().max(2048),
  order: z.number().int().default(0),
  visible: z.boolean().default(true)
});

export const homeContentSchema = z.object({
  heroTitle: localizedTextSchema,
  heroSubtitle: localizedTextSchema,
  heroDescription: localizedTextSchema,
  heroImage: z.string().max(2048),
  heroBackgroundImage: z.string().max(2048),
  primaryButtonText: localizedTextSchema,
  primaryButtonLink: z.string().max(2048),
  secondaryButtonText: localizedTextSchema,
  secondaryButtonLink: z.string().max(2048),
  introTitle: localizedTextSchema,
  introDescription: localizedTextSchema,
  operationsTitle: localizedTextSchema,
  operationsDescription: localizedTextSchema,
  whyTitle: localizedTextSchema,
  whyDescription: localizedTextSchema,
  contactTitle: localizedTextSchema,
  contactDescription: localizedTextSchema,
  contactButtonText: localizedTextSchema,
  contactButtonLink: z.string().max(2048)
});

export const aboutContentSchema = z.object({
  pageTitle: localizedTextSchema,
  pageSubtitle: localizedTextSchema,
  companyIntroduction: localizedTextSchema,
  companyDescription: localizedTextSchema,
  missionLead: localizedTextSchema,
  mission: localizedTextSchema,
  vision: localizedTextSchema,
  values: z.array(localizedTextSchema).max(12),
  advantages: z.array(z.object({ title: localizedTextSchema, body: localizedTextSchema })).max(12),
  compliancePrinciple: localizedTextSchema,
  compliance: z.array(z.object({ title: localizedTextSchema, body: localizedTextSchema })).max(12),
  companyHistory: localizedTextSchema,
  ceoMessage: localizedTextSchema,
  heroImage: z.string().max(2048),
  secondaryImage: z.string().max(2048)
});

export const contactContentSchema = z.object({
  pageTitle: localizedTextSchema,
  pageSubtitle: localizedTextSchema,
  infoTitle: localizedTextSchema,
  formTitle: localizedTextSchema,
  companyName: localizedTextSchema,
  address: localizedTextSchema,
  phoneNumbers: z.array(z.string().max(80)).max(10),
  email: z.string().max(160),
  website: z.string().max(2048),
  contactPerson: localizedTextSchema,
  businessHours: localizedTextSchema,
  googleMapsEmbedUrl: z.string().max(4096),
  facebook: z.string().max(2048),
  instagram: z.string().max(2048),
  linkedin: z.string().max(2048)
});

export const headerContentSchema = z.object({
  companyName: localizedTextSchema,
  logo: z.string().max(2048),
  darkLogo: z.string().max(2048),
  contactButtonLabel: localizedTextSchema,
  navItems: z.array(linkItemSchema.extend({ key: z.string().max(40) })).max(12)
});

export const footerContentSchema = z.object({
  copyright: localizedTextSchema,
  description: localizedTextSchema,
  contactHeading: localizedTextSchema,
  quickLinksHeading: localizedTextSchema,
  quickLinks: z.array(linkItemSchema).max(16),
  socialLinks: z.array(socialLinkSchema).max(8)
});

export const cmsSchemas = {
  home: homeContentSchema,
  about: aboutContentSchema,
  contact: contactContentSchema,
  header: headerContentSchema,
  footer: footerContentSchema
};

export type CmsKey = keyof typeof cmsSchemas;
export type HomeContent = z.infer<typeof homeContentSchema>;
export type AboutContent = z.infer<typeof aboutContentSchema>;
export type ContactContent = z.infer<typeof contactContentSchema>;
export type HeaderContent = z.infer<typeof headerContentSchema>;
export type FooterContent = z.infer<typeof footerContentSchema>;
export type CmsContentMap = {
  home: HomeContent;
  about: AboutContent;
  contact: ContactContent;
  header: HeaderContent;
  footer: FooterContent;
};

const text = (mn: string, en: string) => ({ mn, en });
const companyAddress = text(
  "Монгол Улс, Улаанбаатар хот, Сүхбаатар дүүрэг, 73/6-42",
  "Sukhbaatar District, 73/6-42, Ulaanbaatar, Mongolia"
);
const contactPerson = text("Ц. Номин-Эрдэнэ, Гүйцэтгэх захирал", "Ts. Nomin-Erdene, Chief Executive Officer");
const websiteUrl = "https://www.novytas.mn";
const companyProfileDetails = text(
  `<table><tbody><tr><th>Компанийн нэр</th><td>Новитас ХХК (Novytas LLC)</td></tr><tr><th>Байгуулагдсан он</th><td>2019 он</td></tr><tr><th>Үйл ажиллагааны чиглэл</th><td>Эмнэлгийн тоног төхөөрөмж, эм, эмнэлгийн хэрэгслийн импорт, худалдаа</td></tr><tr><th>Тусгай зөвшөөрөл</th><td>Эм ханган нийлүүлэх байгууллагын тусгай зөвшөөрөл; Эмнэлгийн хэрэгсэл, тоног төхөөрөмж ханган нийлүүлэх тусгай зөвшөөрөл</td></tr><tr><th>Регистрийн дугаар</th><td>6449808</td></tr><tr><th>Хаяг</th><td>Монгол Улс, Улаанбаатар хот, Сүхбаатар дүүрэг, 73/6-42</td></tr></tbody></table>`,
  `<table><tbody><tr><th>Company name</th><td>Novytas LLC</td></tr><tr><th>Established</th><td>2019</td></tr><tr><th>Business scope</th><td>Import and trade of medical equipment, medicines, and medical supplies</td></tr><tr><th>Special licenses</th><td>Pharmaceutical supply organization license; medical supplies and equipment supply license</td></tr><tr><th>Registration number</th><td>6449808</td></tr><tr><th>Address</th><td>Sukhbaatar District, 73/6-42, Ulaanbaatar, Mongolia</td></tr></tbody></table>`
);

export const cmsDefaults: CmsContentMap = {
  home: {
    heroTitle: text("НОВИТАС", "NOVYTAS"),
    heroSubtitle: text("NOVYTAS LLC", "NOVYTAS LLC"),
    heroDescription: text(
      "КОМПАНИЙН ТАНИЛЦУУЛГА\nЭмнэлгийн тоног төхөөрөмж • Эм, эмнэлгийн хэрэгсэл • Хүүхдийн эрүүл мэндийн бүтээгдэхүүн\nУлаанбаатар хот, 2026 он",
      "Company profile\nMedical equipment • Medicines and medical supplies • Children's health products\nUlaanbaatar, 2026"
    ),
    heroImage: "/brand/novytas-logo.png",
    heroBackgroundImage: "",
    primaryButtonText: text(dictionary.mn.actions.viewProducts, dictionary.en.actions.viewProducts),
    primaryButtonLink: "/products",
    secondaryButtonText: text(dictionary.mn.actions.learnMore, dictionary.en.actions.learnMore),
    secondaryButtonLink: "/about",
    introTitle: text("Бидний тухай", "About us"),
    introDescription: company.missionLead,
    operationsTitle: text("Үйл ажиллагааны үндсэн чиглэл", "Core areas of operation"),
    operationsDescription: company.summary,
    whyTitle: text(dictionary.mn.home.whyTitle, dictionary.en.home.whyTitle),
    whyDescription: company.vision,
    contactTitle: text("Хамтын ажиллагаа", "Partnership"),
    contactDescription: company.partnership,
    contactButtonText: text(dictionary.mn.actions.sendInquiry, dictionary.en.actions.sendInquiry),
    contactButtonLink: "/contact"
  },
  about: {
    pageTitle: text(dictionary.mn.about.title, dictionary.en.about.title),
    pageSubtitle: text(
      "Эмнэлгийн тоног төхөөрөмж • Эм, эмнэлгийн хэрэгсэл • Хүүхдийн эрүүл мэндийн бүтээгдэхүүн",
      "Medical equipment • Medicines and medical supplies • Children's health products"
    ),
    companyIntroduction: text("КОМПАНИЙН ТАНИЛЦУУЛГА", "Company profile"),
    companyDescription: company.summary,
    missionLead: company.missionLead,
    mission: company.mission,
    vision: company.vision,
    values: company.values.map((value) => text(value.mn, value.en)),
    advantages: advantages.map((item) => ({ title: item.title, body: item.body })),
    compliancePrinciple,
    compliance: compliance.map((item) => ({ title: item.title, body: item.body })),
    companyHistory: companyProfileDetails,
    ceoMessage: text("", ""),
    heroImage: "",
    secondaryImage: ""
  },
  contact: {
    pageTitle: text(dictionary.mn.contact.title, dictionary.en.contact.title),
    pageSubtitle: company.contactLine,
    infoTitle: text(dictionary.mn.contact.infoTitle, dictionary.en.contact.infoTitle),
    formTitle: text(dictionary.mn.contact.formTitle, dictionary.en.contact.formTitle),
    companyName: company.name,
    address: companyAddress,
    phoneNumbers: ["+976 99034752", "+976 72225222"],
    email: "Novytas8383@gmail.com",
    website: websiteUrl,
    contactPerson,
    businessHours: text("", ""),
    googleMapsEmbedUrl: "",
    facebook: "",
    instagram: "",
    linkedin: ""
  },
  header: {
    companyName: company.name,
    logo: "/brand/novytas-logo.png",
    darkLogo: "/brand/novytas-logo-white.png",
    contactButtonLabel: text(dictionary.mn.nav.contact, dictionary.en.nav.contact),
    navItems: [
      { key: "home", href: "", order: 0, visible: true, label: text(dictionary.mn.nav.home, dictionary.en.nav.home) },
      { key: "about", href: "/about", order: 1, visible: true, label: text(dictionary.mn.nav.about, dictionary.en.nav.about) },
      { key: "products", href: "/products", order: 2, visible: true, label: text(dictionary.mn.nav.products, dictionary.en.nav.products) },
      { key: "news", href: "/news", order: 3, visible: true, label: text(dictionary.mn.nav.news, dictionary.en.nav.news) },
      { key: "contact", href: "/contact", order: 4, visible: true, label: text(dictionary.mn.nav.contact, dictionary.en.nav.contact) }
    ]
  },
  footer: {
    copyright: company.sourceCityYear,
    description: company.contactLine,
    contactHeading: text(dictionary.mn.nav.contact, dictionary.en.nav.contact),
    quickLinksHeading: text("Шуурхай холбоос", "Quick links"),
    quickLinks: [
      { href: "/products", order: 0, visible: true, label: text(dictionary.mn.nav.products, dictionary.en.nav.products) },
      { href: "/about", order: 1, visible: true, label: text(dictionary.mn.nav.about, dictionary.en.nav.about) },
      { href: "/news", order: 2, visible: true, label: text(dictionary.mn.nav.news, dictionary.en.nav.news) },
      { href: "/contact", order: 3, visible: true, label: text(dictionary.mn.nav.contact, dictionary.en.nav.contact) }
    ],
    socialLinks: []
  }
};

export const seoRecordSchema = z.object({
  route: z.string().min(1).max(160),
  titleMn: z.string().max(220).optional().or(z.literal("")),
  titleEn: z.string().max(220).optional().or(z.literal("")),
  descriptionMn: z.string().max(500).optional().or(z.literal("")),
  descriptionEn: z.string().max(500).optional().or(z.literal("")),
  ogImage: z.string().max(2048).optional().or(z.literal("")),
  noIndex: z.boolean().default(false)
});

export const seoSettingsSchema = z.object({
  records: z.array(seoRecordSchema)
});

export type SeoRecord = z.infer<typeof seoRecordSchema>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeDefaults<T>(defaults: T, value: unknown): T {
  if (Array.isArray(defaults)) {
    return (Array.isArray(value) ? value : defaults) as T;
  }

  if (isRecord(defaults)) {
    const source = isRecord(value) ? value : {};
    const merged: Record<string, unknown> = {};

    for (const [key, defaultValue] of Object.entries(defaults)) {
      merged[key] = mergeDefaults(defaultValue, source[key]);
    }

    return merged as T;
  }

  return (value ?? defaults) as T;
}

function settingKey(key: CmsKey) {
  return `cms:${key}`;
}

export async function getCmsContent<K extends CmsKey>(key: K): Promise<CmsContentMap[K]> {
  try {
    const setting = await db.siteSetting.findUnique({ where: { key: settingKey(key) } });
    const merged = mergeDefaults(cmsDefaults[key], setting?.value);
    return cmsSchemas[key].parse(merged) as CmsContentMap[K];
  } catch {
    return cmsDefaults[key];
  }
}

export async function saveCmsContent<K extends CmsKey>(key: K, value: CmsContentMap[K]) {
  const parsed = cmsSchemas[key].parse(value);

  return db.siteSetting.upsert({
    where: { key: settingKey(key) },
    update: { value: parsed },
    create: { key: settingKey(key), value: parsed }
  });
}

export async function getSeoRecord(route: string) {
  try {
    return await db.seoSetting.findUnique({ where: { route } });
  } catch {
    return null;
  }
}

export async function getEditableSeoRecords(): Promise<SeoRecord[]> {
  const settings = await db.seoSetting.findMany({
    where: { route: { in: editableSeoRoutes.map((item) => item.route) } },
    orderBy: { route: "asc" }
  });

  return editableSeoRoutes.map((item) => {
    const setting = settings.find((record) => record.route === item.route);

    return {
      route: item.route,
      titleMn: setting?.titleMn ?? "",
      titleEn: setting?.titleEn ?? "",
      descriptionMn: setting?.descriptionMn ?? "",
      descriptionEn: setting?.descriptionEn ?? "",
      ogImage: setting?.ogImage ?? "",
      noIndex: setting?.noIndex ?? false
    };
  });
}

export async function saveSeoRecords(records: SeoRecord[]) {
  await Promise.all(
    records.map((record) =>
      db.seoSetting.upsert({
        where: { route: record.route },
        update: {
          titleMn: record.titleMn || null,
          titleEn: record.titleEn || null,
          descriptionMn: record.descriptionMn || null,
          descriptionEn: record.descriptionEn || null,
          ogImage: record.ogImage || null,
          noIndex: record.noIndex
        },
        create: {
          route: record.route,
          titleMn: record.titleMn || null,
          titleEn: record.titleEn || null,
          descriptionMn: record.descriptionMn || null,
          descriptionEn: record.descriptionEn || null,
          ogImage: record.ogImage || null,
          noIndex: record.noIndex
        }
      })
    )
  );
}

export function localized(value: { mn: string; en: string }, locale: Locale) {
  return value[locale];
}

export function localizedHref(href: string, locale: Locale) {
  if (!href) return `/${locale}`;
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) return href;
  return `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
}
