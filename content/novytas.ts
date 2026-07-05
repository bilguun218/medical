import type { Locale } from "@/lib/i18n";

type LocalizedText = Record<Locale, string>;

export const company = {
  name: {
    mn: "Новитас ХХК",
    en: "NOVYTAS LLC"
  },
  brand: "NOVYTAS",
  sourceTitle: {
    mn: "Компанийн танилцуулга",
    en: "Company profile"
  },
  sourceCityYear: {
    mn: "Улаанбаатар хот, 2026 он",
    en: "Ulaanbaatar, 2026"
  },
  establishedYear: 2019,
  tagline: {
    mn: "Таны эрүүл мэндийн найдвартай түнш",
    en: "Your trusted healthcare partner"
  },
  summary: {
    mn:
      "Новитас ХХК нь 2019 онд байгуулагдсан бөгөөд эмнэлгийн тоног төхөөрөмж, эм, эмнэлгийн хэрэгслийн импорт, худалдаа, түгээлтийн чиглэлээр салбартаа мэргэшсэн компани юм. Бид Эрүүл мэндийн яамны тусгай зөвшөөрлийн хүрээнд олон улсын чанарын стандартад нийцсэн баталгаат эх сурвалжуудаас эмнэлгийн хэрэгсэл, тоног төхөөрөмж, эмийн болон эмийн бус хэрэгцээт барааг ханган нийлүүлж байна.",
    en:
      "NOVYTAS LLC was established in 2019 and specializes in the import, trade, and distribution of medical equipment, medicines, and medical supplies. Under the special license of the Ministry of Health, the company supplies medical supplies, equipment, pharmaceutical and non-pharmaceutical healthcare products from verified sources that meet international quality standards."
  },
  missionLead: {
    mn:
      "Бидний эрхэм зорилго бол олон улсын стандартад нийцсэн чанарын өндөр баталгаатай эрүүл мэндийн бүтээгдэхүүнийг Монголын зах зээлд хүргэж, иргэдийн, ялангуяа хүүхдийн эрүүл мэндэд бодит хувь нэмэр оруулах явдал юм.",
    en:
      "Our mission is to bring high-quality healthcare products that meet international standards to the Mongolian market and make a real contribution to public health, especially children's health."
  },
  mission: {
    mn: "Олон улсын чанарын стандартад нийцсэн эрүүл мэндийн бүтээгдэхүүнийг Монголын хэрэглэгчдэд хүртээмжтэй үнээр хүргэх.",
    en: "Deliver healthcare products that meet international quality standards to Mongolian consumers at accessible prices."
  },
  vision: {
    mn: "Хүүхдийн эрүүл мэнд, амьсгалын зам, дархлаа дэмжих бүтээгдэхүүний салбарт Монголдоо тэргүүлэгч, итгэл хүлээсэн нийлүүлэгч болох.",
    en: "Become Mongolia's leading and trusted supplier in children's health, respiratory, and immune support products."
  },
  values: [
    { mn: "Чанар", en: "Quality" },
    { mn: "Найдвартай байдал", en: "Reliability" },
    { mn: "Ил тод байдал", en: "Transparency" },
    { mn: "Хэрэглэгчийн эрүүл мэндийг эн тэргүүнд тавих зарчим", en: "Putting customer health first" }
  ],
  partnership: {
    mn:
      "Бид эмнэлэг, клиник, эмийн сангийн сүлжээ, түгээлтийн байгууллагуудтай урт хугацааны, харилцан ашигтай түншлэлийг эрхэмлэн ажилладаг. Гадаадын үйлдвэрлэгч, нийлүүлэгчдийн хувьд Монголын зах зээлд албан ёсны төлөөлөгч, дистрибьютерээр ажиллах бүрэн боломжтой.",
    en:
      "We value long-term, mutually beneficial partnerships with hospitals, clinics, pharmacy chains, and distribution organizations. For foreign manufacturers and suppliers, NOVYTAS has the capability to act as an official representative and distributor in the Mongolian market."
  },
  contactLine: {
    mn: "Новитас ХХК — Таны эрүүл мэндийн найдвартай түнш",
    en: "NOVYTAS LLC — Your trusted healthcare partner"
  }
} as const;

export const productCategories = [
  {
    sortOrder: 1,
    title: {
      mn: "Эмнэлгийн тоног төхөөрөмж",
      en: "Medical equipment"
    },
    description: {
      mn:
        "Эмнэлэг, клиникүүдэд зориулсан оношилгоо, эмчилгээний тоног төхөөрөмжийн импорт, нийлүүлэлт, баталгаат засвар үйлчилгээ.",
      en:
        "Import, supply, and warranty-backed maintenance of diagnostic and treatment equipment for hospitals and clinics."
    }
  },
  {
    sortOrder: 2,
    title: {
      mn: "Эм, эмнэлгийн хэрэгсэл",
      en: "Medicines and medical supplies"
    },
    description: {
      mn:
        "АНУ, Англи, Япон, Хятад, Солонгос, Франц, Швед, Герман зэрэг улсын нэр хүндтэй үйлдвэрлэгчдийн насанд хүрэгчид болон хүүхдэд зориулсан эм, дархлаа дэмжих, эрүүл мэндийг тэтгэх эмчилгээний бэлдмэл, эмнэлгийн хэрэгсэл, асаргаа сувилгааны зэрэг бүтээгдэхүүнийг албан ёсны сувгаар импортлон худалдаалж, эмийн сан, эмнэлгүүдэд түгээх.",
      en:
        "Official import, sale, and distribution to pharmacies and hospitals of medicines for adults and children, immune support and health-supporting therapeutic products, medical supplies, and care products from reputable manufacturers in countries including the United States, United Kingdom, Japan, China, Korea, France, Sweden, and Germany."
    }
  },
  {
    sortOrder: 3,
    title: {
      mn: "Хүүхдийн эрүүл мэндийн бүтээгдэхүүн",
      en: "Children's health products"
    },
    description: {
      mn:
        "Хүүхдийн эрүүл мэнд, амьсгалын зам, дархлаа дэмжих бүтээгдэхүүний чиглэл нь компанийн алсын хараанд туссан гол салбар юм.",
      en:
        "Children's health, respiratory, and immune support products are a key focus area reflected in the company's vision."
    }
  }
] as const;

export const advantages = [
  {
    title: { mn: "Давхар тусгай зөвшөөрөл", en: "Dual special licensing" },
    body: {
      mn: "Эм болон эмнэлгийн хэрэгслийн аль алиныг нэг байгууллагаас нийлүүлэх боломж.",
      en: "The ability to supply both medicines and medical supplies from one organization."
    }
  },
  {
    title: { mn: "Олон улсын шууд хамтын ажиллагаа", en: "Direct international cooperation" },
    body: {
      mn: "Олон улсын нийлүүлэгчидтэй шууд хамтын ажиллагаа, албан ёсны гарал үүслийн баталгаа.",
      en: "Direct cooperation with international suppliers and official proof of origin."
    }
  },
  {
    title: { mn: "Бүртгэл, зөвшөөрлийн баталгаажуулалт", en: "Registration and permit compliance" },
    body: {
      mn: "ЭМЯ-ны бүртгэл, зөвшөөрлийн журмын дагуу бүрэн баталгаажсан бүтээгдэхүүн.",
      en: "Products fully verified under Ministry of Health registration and permit procedures."
    }
  },
  {
    title: { mn: "Зах зээлийн судалгаанд суурилсан сонголт", en: "Market research based selection" },
    body: {
      mn: "Зах зээлийн судалгаанд суурилсан, Монголын нөхцөлд тохирсон бүтээгдэхүүний сонголт.",
      en: "Product selection based on market research and suited to Mongolian conditions."
    }
  },
  {
    title: { mn: "Борлуулалтын дараах үйлчилгээ", en: "After-sales service" },
    body: {
      mn: "Мэргэжлийн зөвлөгөө, борлуулалтын дараах найдвартай үйлчилгээ.",
      en: "Professional consultation and reliable after-sales service."
    }
  }
] as const;

export const compliance = [
  {
    title: {
      mn: "НҮБ-ын Хүүхдийн эрхийн тухай конвенц",
      en: "UN Convention on the Rights of the Child"
    },
    body: {
      mn:
        "Конвенцид нийцүүлэн хүүхдийн эсэн мэнд амьдрах, эрүүл өсөж хөгжих эрхийг хангахад чиглэсэн, аюулгүй, чанартай бүтээгдэхүүнийг л нийлүүлнэ.",
      en:
        "In line with the Convention, NOVYTAS supplies only safe, quality products aimed at supporting children's survival, health, and development."
    }
  },
  {
    title: {
      mn: "Нялх, балчир хүүхдийн хүнсний тухай хууль",
      en: "Law on Food for Infants and Young Children"
    },
    body: {
      mn:
        "Импортлох бүтээгдэхүүн бүр стандарт, тусгай шаардлагыг бүрэн хангасан байх бөгөөд шошго, сав баглаа боодлын мэдээллийг монгол хэлээр, ил тод байлгах. Нялх хүүхдийн хүнс, хооллох хэрэгслийн зар сурталчилгааны хязгаарлалтыг мөрдөнө.",
      en:
        "Every imported product must fully meet standards and special requirements, with label and packaging information provided transparently in Mongolian. Advertising restrictions for infant food and feeding tools are observed."
    }
  },
  {
    title: { mn: "Эм, эмнэлгийн хэрэгслийн тухай хууль", en: "Law on Medicines and Medical Devices" },
    body: {
      mn: "Эм, эмнэлгийн хэрэгслийг ЭМЯ-ны улсын бүртгэлд бүртгүүлж, тусгай зөвшөөрлийн хүрээнд импортлон нийлүүлнэ.",
      en: "Medicines and medical devices are registered with the Ministry of Health and imported under the scope of special licenses."
    }
  },
  {
    title: {
      mn: "Хүнсний бүтээгдэхүүний аюулгүй байдлыг хангах тухай хууль",
      en: "Law on Food Product Safety"
    },
    body: {
      mn:
        "Импортын бүтээгдэхүүний аюулгүйн үзүүлэлт нь Монгол Улсын болон олон улсад хүлээн зөвшөөрөгдсөн шаардлагад нийцсэн байна.",
      en:
        "Safety indicators of imported products comply with Mongolian and internationally recognized requirements."
    }
  },
  {
    title: { mn: "Хүүхдийн эрхийн тухай хууль", en: "Law on Child Rights" },
    body: {
      mn:
        "Хүүхдийн эрүүл, аюулгүй орчинд өсөж хөгжих эрхийг дээдэлж, бүтээгдэхүүний сонголт, мэдээлэл, үйлчилгээндээ хүүхдийн эрх ашгийг эн тэргүүнд тавина.",
      en:
        "NOVYTAS respects children's right to grow in a healthy and safe environment and puts children's interests first in product selection, information, and services."
    }
  }
] as const;

export const compliancePrinciple = {
  mn:
    "Новитас ХХК нь Монгол Улсын 1990 онд нэгдэн орсон НҮБ-ын Хүүхдийн эрхийн тухай конвенцийг үйл ажиллагааныхаа суурь зарчим болгон баримталдаг. Конвенцийн 3 дугаар зүйлд заасан “хүүхдийн язгуур эрх ашгийг юуны өмнө харгалзах” зарчим, 24 дүгээр зүйлд заасан хүүхдийн эрүүл мэндээ хамгаалуулах эрхийг бүтээгдэхүүний сонголт, чанарын хяналт, мэдээллийн ил тод байдалдаа тусган хэрэгжүүлдэг. Үүний зэрэгцээ Монгол Улсын дараах хууль тогтоомжийн шаардлагыг чанд мөрдөнө:",
  en:
    "NOVYTAS LLC follows the UN Convention on the Rights of the Child, which Mongolia joined in 1990, as a foundational operating principle. The company reflects the principle of prioritizing the best interests of the child stated in Article 3 and children's right to health protection stated in Article 24 through product selection, quality control, and transparent information."
} as const satisfies LocalizedText;

export const sourceCountries = [
  { mn: "АНУ", en: "United States" },
  { mn: "Англи", en: "United Kingdom" },
  { mn: "Япон", en: "Japan" },
  { mn: "Хятад", en: "China" },
  { mn: "Солонгос", en: "Korea" },
  { mn: "Франц", en: "France" },
  { mn: "Швед", en: "Sweden" },
  { mn: "Герман", en: "Germany" }
] as const;

export function tText(text: LocalizedText, locale: Locale) {
  return text[locale];
}
