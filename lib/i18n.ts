export const locales = ["mn", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "mn";

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "mn" ? "en" : "mn";
}

export const dictionary = {
  mn: {
    localeName: "MN",
    alternateLocaleName: "EN",
    nav: {
      home: "Нүүр",
      about: "Бидний тухай",
      products: "Бүтээгдэхүүн",
      news: "Мэдээ",
      contact: "Холбоо барих",
      admin: "Админ"
    },
    actions: {
      learnMore: "Дэлгэрэнгүй",
      viewProducts: "Каталог үзэх",
      sendInquiry: "Санал хүсэлт илгээх",
      submit: "Илгээх",
      search: "Хайх",
      filter: "Шүүх",
      back: "Буцах",
      signIn: "Нэвтрэх",
      save: "Хадгалах",
      publish: "Нийтлэх",
      draft: "Ноорог",
      delete: "Устгах",
      edit: "Засах"
    },
    home: {
      eyebrow: "Эрүүл мэндийн бүтээгдэхүүний албан ёсны нийлүүлэлт",
      title: "NOVYTAS ХХК",
      subtitle:
        "Олон улсын чанарын стандартад нийцсэн баталгаат эх сурвалжуудаас эмнэлгийн хэрэгсэл, тоног төхөөрөмж, эмийн болон эмийн бус хэрэгцээт барааг ханган нийлүүлдэг мэргэшсэн компани.",
      introTitle: "Монголын эрүүл мэндийн зах зээлд чанар, ил тод байдлыг хүргэнэ",
      operationsTitle: "Үйл ажиллагааны чиглэл",
      whyTitle: "Яагаад NOVYTAS",
      statsTitle: "Эх сурвалж дээрх гол үзүүлэлт",
      latestNews: "Сүүлийн мэдээ",
      noNews: "Одоогоор нийтлэгдсэн мэдээ байхгүй.",
      contactTitle: "Хамтын ажиллагаа эхлүүлэх"
    },
    about: {
      title: "Бидний тухай",
      subtitle: "Компанийн танилцуулгын эх файлд туссан албан мэдээлэл.",
      missionVision: "Эрхэм зорилго, алсын хараа",
      values: "Үнэт зүйлс",
      compliance: "Хууль, эрх зүйн нийцэл",
      advantages: "Давуу тал",
      partnership: "Хамтын ажиллагаа"
    },
    products: {
      title: "Бүтээгдэхүүний каталог",
      subtitle:
        "Каталогийн бүтээгдэхүүнүүд админ системээр баталгаажин нийтлэгдсэний дараа энд харагдана.",
      categories: "Ангилал",
      emptyTitle: "Нийтлэгдсэн бүтээгдэхүүн алга",
      emptyBody:
        "Эх файлд тодорхой бүтээгдэхүүний нэр, зураг, техникийн үзүүлэлт, PDF хавсралт агуулаагүй тул зохиомол мэдээлэл оруулаагүй.",
      technicalSpecs: "Техникийн үзүүлэлт",
      attachments: "PDF хавсралт",
      inquiryTitle: "Үнийн санал авах",
      quoteButton: "Үнийн санал авах",
      quoteDescription: "Энэ бүтээгдэхүүний үнэ, нөхцөл болон дэлгэрэнгүй мэдээлэл авах хүсэлтээ илгээнэ үү."
    },
    news: {
      title: "Мэдээ мэдээлэл",
      subtitle: "Нийтлэлүүд админ системээс нийтлэгдэнэ.",
      emptyTitle: "Нийтлэл алга",
      emptyBody: "Эх файлд мэдээний бодит нийтлэл агуулаагүй тул зохиомол мэдээ нийтлээгүй.",
      category: "Ангилал"
    },
    contact: {
      title: "Холбоо барих",
      subtitle: "Санал хүсэлт болон хамтын ажиллагааны хүсэлт илгээх.",
      infoTitle: "Албан мэдээлэл",
      formTitle: "Санал хүсэлт",
      mapUnavailable: "Газрын зургийн мэдээлэл эх файлд байхгүй.",
      hoursUnavailable: "Ажлын цагийн мэдээлэл эх файлд байхгүй.",
      phoneUnavailable: "Утасны мэдээлэл эх файлд байхгүй.",
      emailUnavailable: "Имэйлийн мэдээлэл эх файлд байхгүй."
    },
    form: {
      name: "Нэр",
      organization: "Байгууллага",
      email: "Имэйл",
      phone: "Утас",
      subject: "Гарчиг",
      message: "Дэлгэрэнгүй мэдээлэл",
      success: "Таны санал хүсэлтийг хүлээн авлаа.",
      error: "Илгээх үед алдаа гарлаа."
    },
    admin: {
      title: "NOVYTAS Admin",
      loginTitle: "Админ системд нэвтрэх",
      dashboard: "Dashboard",
      products: "Бүтээгдэхүүн",
      categories: "Ангилал",
      news: "Мэдээ",
      inquiries: "Хүсэлтүүд",
      media: "Медиа сан",
      settings: "Веб тохиргоо",
      seo: "SEO тохиргоо",
      profile: "Профайл",
      protected: "Дотоод удирдлагын систем",
      empty: "Одоогоор өгөгдөл байхгүй."
    }
  },
  en: {
    localeName: "EN",
    alternateLocaleName: "MN",
    nav: {
      home: "Home",
      about: "About",
      products: "Products",
      news: "News",
      contact: "Contact",
      admin: "Admin"
    },
    actions: {
      learnMore: "Learn more",
      viewProducts: "View catalog",
      sendInquiry: "Send request",
      submit: "Submit",
      search: "Search",
      filter: "Filter",
      back: "Back",
      signIn: "Sign in",
      save: "Save",
      publish: "Publish",
      draft: "Draft",
      delete: "Delete",
      edit: "Edit"
    },
    home: {
      eyebrow: "Official healthcare product supply",
      title: "NOVYTAS LLC",
      subtitle:
        "A specialized company supplying medical devices, equipment, pharmaceutical and non-pharmaceutical healthcare products from verified sources that meet international quality standards.",
      introTitle: "Bringing quality and transparency to Mongolia's healthcare market",
      operationsTitle: "Core areas of operation",
      whyTitle: "Why NOVYTAS",
      statsTitle: "Key facts from the source document",
      latestNews: "Latest news",
      noNews: "No published news yet.",
      contactTitle: "Start a partnership"
    },
    about: {
      title: "About us",
      subtitle: "Official information reflected in the company profile source document.",
      missionVision: "Mission and vision",
      values: "Values",
      compliance: "Legal compliance",
      advantages: "Advantages",
      partnership: "Partnership"
    },
    products: {
      title: "Product catalog",
      subtitle:
        "Catalog items will appear here after they are reviewed and published from the admin system.",
      categories: "Categories",
      emptyTitle: "No published products",
      emptyBody:
        "The source document does not contain specific product names, images, technical specifications, or PDF attachments, so no fabricated records were added.",
      technicalSpecs: "Technical specifications",
      attachments: "PDF attachments",
      inquiryTitle: "Request a quote",
      quoteButton: "Request a quote",
      quoteDescription: "Send a request to receive pricing, terms, and detailed information for this product."
    },
    news: {
      title: "News",
      subtitle: "Articles are published from the admin system.",
      emptyTitle: "No articles",
      emptyBody: "The source document does not contain actual news articles, so no fabricated news was added.",
      category: "Category"
    },
    contact: {
      title: "Contact",
      subtitle: "Send inquiries and partnership requests.",
      infoTitle: "Official information",
      formTitle: "Request form",
      mapUnavailable: "Map information is not provided in the source document.",
      hoursUnavailable: "Business hours are not provided in the source document.",
      phoneUnavailable: "Phone information is not provided in the source document.",
      emailUnavailable: "Email information is not provided in the source document."
    },
    form: {
      name: "Name",
      organization: "Organization",
      email: "Email",
      phone: "Phone",
      subject: "Subject",
      message: "Message",
      success: "Your request has been received.",
      error: "Something went wrong while sending."
    },
    admin: {
      title: "NOVYTAS Admin",
      loginTitle: "Sign in to admin",
      dashboard: "Dashboard",
      products: "Products",
      categories: "Categories",
      news: "News",
      inquiries: "Inquiries",
      media: "Media library",
      settings: "Site settings",
      seo: "SEO settings",
      profile: "Profile",
      protected: "Internal management system",
      empty: "No data yet."
    }
  }
} as const;

export type Dictionary = (typeof dictionary)[Locale];
