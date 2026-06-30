const html = document.documentElement;
const header = document.querySelector("[data-header]");
const mobileToggle = document.querySelector("[data-mobile-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const megaToggle = document.querySelector("[data-mega-toggle]");
const megaMenu = document.querySelector("[data-mega-menu]");
const searchOverlay = document.querySelector("[data-search-overlay]");
const searchInput = document.querySelector("[data-search-input]");
const searchResults = document.querySelector("[data-search-results]");
const openSearchButtons = document.querySelectorAll("[data-open-search]");
const closeSearchButtons = document.querySelectorAll("[data-close-search]");
const themeButtons = document.querySelectorAll("[data-theme-toggle]");
const languageButtons = document.querySelectorAll("[data-language-toggle]");
const newsletterForms = document.querySelectorAll("form.newsletter");
const actionButtons = document.querySelectorAll("[data-action]");

const searchData = [
  { title: "ICU Ventilation System", type: "Product", url: "product-detail.html" },
  { title: "Surgical Suite Planning", type: "Solution", url: "index.html#solutions" },
  { title: "Diagnostic Imaging", type: "Category", url: "products.html" },
  { title: "ISO and CE Certificates", type: "Download", url: "product-detail.html#downloads" },
  { title: "Technical Service Request", type: "Support", url: "contact.html" },
  { title: "Healthcare Projects", type: "Portfolio", url: "index.html#projects" }
];

const originalTextNodes = new WeakMap();
const originalAttributes = new WeakMap();

const translations = {
  mn: {
    "Home": "Нүүр",
    "About": "Бидний тухай",
    "Products": "Бүтээгдэхүүн",
    "Solutions": "Шийдэл",
    "Projects": "Төслүүд",
    "Contact": "Холбоо барих",
    "Contact NOVITAS": "NOVITAS-тай холбогдох",
    "Product portfolio": "Бүтээгдэхүүний багц",
    "Certified systems for every clinical department.": "Клиникийн бүх тасагт зориулсан баталгаажсан системүүд.",
    "Diagnostic Imaging": "Оношилгооны дүрс оношилгоо",
    "Surgery & Operating Room": "Мэс засал ба хагалгааны өрөө",
    "ICU & Patient Monitoring": "Эрчимт эмчилгээ ба өвчтөний мониторинг",
    "Laboratory & Sterilization": "Лаборатори ба ариутгал",
    "Fast paths": "Шуурхай холбоос",
    "Featured ventilator": "Онцлох амьсгалын аппарат",
    "Compare products": "Бүтээгдэхүүн харьцуулах",
    "Certificates": "Сертификат",
    "Request a quote": "Үнийн санал авах",
    "Request Quote": "Үнийн санал авах",
    "Featured system": "Онцлох систем",
    "NVT-900 ICU Ventilation Platform": "NVT-900 эрчимт эмчилгээний амьсгалын платформ",
    "Advanced respiratory support with commissioning and lifecycle service.": "Ашиглалтад оруулах болон ашиглалтын мөчлөгийн үйлчилгээтэй дэвшилтэт амьсгалын дэмжлэг.",
    "Healthcare technology partner": "Эрүүл мэндийн технологийн түнш",
    "Clinical systems for hospitals that expect precision.": "Нарийвчлал шаарддаг эмнэлгүүдэд зориулсан клиникийн системүүд.",
    "NOVITAS supplies certified medical equipment, installation, training, and technical support for healthcare providers building modern, resilient care environments.": "NOVITAS нь орчин үеийн, найдвартай тусламж үйлчилгээний орчин бүрдүүлж буй байгууллагуудад баталгаажсан эмнэлгийн тоног төхөөрөмж, суурилуулалт, сургалт, техникийн дэмжлэг нийлүүлдэг.",
    "Explore Products": "Бүтээгдэхүүн үзэх",
    "Request Consultation": "Зөвлөгөө авах",
    "CE / ISO aligned": "CE / ISO шаардлагад нийцсэн",
    "Technical service": "Техникийн үйлчилгээ",
    "Global partner network": "Олон улсын түншийн сүлжээ",
    "Clinical uptime": "Клиникийн тасралтгүй ажиллагаа",
    "Service readiness target across deployed systems.": "Суурилуулсан системүүдийн үйлчилгээний бэлэн байдлын зорилт.",
    "System health": "Системийн төлөв",
    "Delivery scope": "Нийлүүлэлтийн хамрах хүрээ",
    "Plan. Supply. Install. Support.": "Төлөвлөх. Нийлүүлэх. Суурилуулах. Дэмжих.",
    "Company introduction": "Компанийн танилцуулга",
    "A trusted bridge between world-class medical technology and clinical performance.": "Дэлхийн түвшний эмнэлгийн технологи ба клиникийн үр дүнг холбох найдвартай гүүр.",
    "NOVITAS helps hospitals, clinics, and diagnostic centers choose, procure, deploy, and maintain equipment with a level of clarity expected from a global healthcare enterprise.": "NOVITAS нь эмнэлэг, клиник, оношилгооны төвүүдэд тоног төхөөрөмж сонгох, худалдан авах, нэвтрүүлэх, засвар үйлчилгээ хийх үйл явцыг олон улсын байгууллагын түвшний тодорхой байдалтайгаар дэмждэг.",
    "The company combines product expertise with technical service, regulatory awareness, training, and long-term support, giving healthcare leaders one reliable partner across the equipment lifecycle.": "Компани нь бүтээгдэхүүний мэдлэг, техникийн үйлчилгээ, зохицуулалтын ойлголт, сургалт, урт хугацааны дэмжлэгийг нэгтгэн эрүүл мэндийн байгууллагын удирдлагуудад тоног төхөөрөмжийн бүх мөчлөгт найдвартай түнш болдог.",
    "Certified product sourcing": "Баталгаажсан бүтээгдэхүүн нийлүүлэлт",
    "Clinical training": "Клиникийн сургалт",
    "Installation support": "Суурилуулалтын дэмжлэг",
    "Clinical categories": "Клиникийн ангилал",
    "Products sourced": "Сонгон нийлүүлсэн бүтээгдэхүүн",
    "Technical response": "Техникийн хариу",
    "Partner brands": "Түнш брэндүүд",
    "Why choose NOVITAS": "Яагаад NOVITAS гэж",
    "Designed for procurement confidence and clinical continuity.": "Худалдан авалтын итгэлцэл ба клиникийн тасралтгүй ажиллагаанд зориулан бүтээгдсэн.",
    "Every interaction is structured around clarity, compliance, and long-term reliability.": "Бүх харилцаа тодорхой байдал, нийцэл, урт хугацааны найдвартай ажиллагаанд төвлөрдөг.",
    "Verified quality": "Баталгаажсан чанар",
    "Equipment portfolios are selected for certification readiness, safety, and dependable manufacturer support.": "Тоног төхөөрөмжийн багцыг сертификатын бэлэн байдал, аюулгүй ажиллагаа, үйлдвэрлэгчийн найдвартай дэмжлэгт тулгуурлан сонгодог.",
    "Global supply network": "Олон улсын нийлүүлэлтийн сүлжээ",
    "Partner relationships and category expertise help teams source the right system without unnecessary delays.": "Түншийн харилцаа, ангиллын мэдлэг нь зөв системийг илүү хурдан сонгон нийлүүлэхэд тусалдаг.",
    "Lifecycle service": "Ашиглалтын мөчлөгийн үйлчилгээ",
    "Installation, commissioning, training, preventive maintenance, and support are treated as one continuous program.": "Суурилуулалт, ашиглалтад оруулах, сургалт, урьдчилан сэргийлэх засвар, дэмжлэгийг нэг тасралтгүй хөтөлбөр гэж үздэг.",
    "Procurement clarity": "Худалдан авалтын тодорхой байдал",
    "Clear documentation, product comparison, specifications, and quote workflows reduce decision friction.": "Тодорхой баримт бичиг, бүтээгдэхүүний харьцуулалт, техникийн үзүүлэлт, үнийн саналын урсгал нь шийдвэр гаргалтыг хялбарчилдаг.",
    "Hospital-ready planning": "Эмнэлэгт бэлэн төлөвлөлт",
    "Solutions are considered in the context of rooms, departments, utilities, training, and operational workflows.": "Шийдлийг өрөө, тасаг, инженерийн шугам, сургалт, үйл ажиллагааны урсгалтай уялдуулан төлөвлөдөг.",
    "Responsive support": "Шуурхай дэмжлэг",
    "Structured support channels make service requests, spare parts, and engineer coordination easier to manage.": "Зохион байгуулалттай дэмжлэгийн сувгууд нь үйлчилгээний хүсэлт, сэлбэг, инженерийн зохицуулалтыг хялбар болгодог.",
    "Medical categories": "Эмнэлгийн ангиллууд",
    "Clinical departments, organized for fast product discovery.": "Бүтээгдэхүүн хурдан олоход зориулан зохион байгуулсан клиникийн тасгууд.",
    "View Catalog": "Каталог үзэх",
    "Imaging": "Дүрс оношилгоо",
    "Ultrasound, C-arm, monitors": "ЭХО, C-arm, монитор",
    "Surgery": "Мэс засал",
    "OR lights, tables, anesthesia": "Хагалгааны гэрэл, ширээ, мэдээгүйжүүлэг",
    "ICU": "Эрчимт эмчилгээ",
    "Ventilation and monitoring": "Амьсгалын дэмжлэг ба мониторинг",
    "Respiratory": "Амьсгалын дэмжлэг",
    "Oxygen and care systems": "Хүчилтөрөгч ба тусламжийн систем",
    "Featured products": "Онцлох бүтээгдэхүүн",
    "Equipment selected for high-demand clinical environments.": "Өндөр шаардлагатай клиникийн орчинд сонгосон тоног төхөөрөмж.",
    "Product pages are built for fast comparison, quote requests, documentation, and technical review.": "Бүтээгдэхүүний хуудсуудыг хурдан харьцуулалт, үнийн санал, баримт бичиг, техникийн үнэлгээнд зориулан бүтээсэн.",
    "ICU / Respiratory": "Эрчимт эмчилгээ / Амьсгал",
    "Advanced respiratory support with commissioning, training, and maintenance programs.": "Ашиглалтад оруулах, сургалт, засвар үйлчилгээний хөтөлбөртэй дэвшилтэт амьсгалын дэмжлэг.",
    "ArcVision Mobile C-Arm": "ArcVision зөөврийн C-Arm",
    "Fluoroscopy solution for surgical and orthopedic workflows.": "Мэс засал болон гэмтлийн ажлын урсгалд зориулсан флюороскопийн шийдэл.",
    "View details": "Дэлгэрэнгүй",
    "Monitoring": "Мониторинг",
    "VitaLine Patient Monitor": "VitaLine өвчтөний монитор",
    "Multiparameter monitoring for critical care and recovery units.": "Эрчимт эмчилгээ болон сэргээх тасагт зориулсан олон үзүүлэлттэй мониторинг.",
    "Brands": "Брэндүүд",
    "A curated partner ecosystem for modern healthcare delivery.": "Орчин үеийн эрүүл мэндийн тусламжид зориулсан сонгомол түншийн экосистем.",
    "The identity system keeps partner presentation quiet and corporate, avoiding noisy logo walls.": "Түншийн танилцуулгыг цэгцтэй, байгууллагын түвшинд хадгалж, хэт ачаалалтай логоны ханыг зайлсхийсэн.",
    "Healthcare solutions": "Эрүүл мэндийн шийдлүүд",
    "More than distribution: complete department enablement.": "Зөвхөн нийлүүлэлт биш: тасгийн бүрэн чадамжийг бүрдүүлэх шийдэл.",
    "NOVITAS supports procurement teams from planning through post-installation performance.": "NOVITAS нь төлөвлөлтөөс эхлэн суурилуулалтын дараах ажиллагаа хүртэл худалдан авалтын багийг дэмждэг.",
    "Hospital setup": "Эмнэлгийн тохижуулалт",
    "Equipment planning, sourcing, installation, and commissioning for new departments.": "Шинэ тасагт зориулсан тоног төхөөрөмжийн төлөвлөлт, нийлүүлэлт, суурилуулалт, ашиглалтад оруулалт.",
    "Diagnostic centers": "Оношилгооны төвүүд",
    "Imaging, lab, examination, and patient flow systems for high-throughput care.": "Өндөр ачаалалтай тусламжид зориулсан дүрс оношилгоо, лаборатори, үзлэг, өвчтөний урсгалын систем.",
    "ICU modernization": "Эрчимт эмчилгээний шинэчлэл",
    "Ventilation, monitoring, critical care beds, and staff training programs.": "Амьсгалын аппарат, мониторинг, эрчимт эмчилгээний ор, ажилтны сургалтын хөтөлбөр.",
    "Surgical suite planning": "Хагалгааны өрөөний төлөвлөлт",
    "Operating tables, lights, anesthesia, C-arm, and sterile workflow equipment.": "Хагалгааны ширээ, гэрэл, мэдээгүйжүүлэг, C-arm, ариун урсгалын тоног төхөөрөмж.",
    "Solution workflow": "Шийдлийн ажлын урсгал",
    "Clinical requirement review": "Клиникийн шаардлагын үнэлгээ",
    "Technical specification and quote": "Техникийн үзүүлэлт ба үнийн санал",
    "Supply, installation, training": "Нийлүүлэлт, суурилуулалт, сургалт",
    "Support and preventive service": "Дэмжлэг ба урьдчилан сэргийлэх үйлчилгээ",
    "Evidence of delivery across critical healthcare environments.": "Чухал эрүүл мэндийн орчинд хэрэгжүүлсэн ажлын нотолгоо.",
    "Start a Project": "Төсөл эхлүүлэх",
    "Surgical modernization": "Мэс заслын шинэчлэл",
    "Integrated surgical imaging suite": "Нэгдсэн мэс заслын дүрс оношилгооны өрөө",
    "A complete operating room technology package including mobile C-arm, surgical display, installation support, and user training.": "Зөөврийн C-arm, мэс заслын дэлгэц, суурилуулалтын дэмжлэг, хэрэглэгчийн сургалтыг багтаасан хагалгааны өрөөний бүрэн технологийн багц.",
    "OR equipment": "Хагалгааны өрөөний тоног төхөөрөмж",
    "Training": "Сургалт",
    "Service plan": "Үйлчилгээний төлөвлөгөө",
    "Partners and testimonials": "Түншүүд ба сэтгэгдэл",
    "Built for long-term healthcare relationships.": "Урт хугацааны эрүүл мэндийн хамтын ажиллагаанд зориулсан.",
    "The experience prioritizes decision support for executives, product depth for biomedical teams, and simple contact paths for urgent support.": "Энэхүү туршлага нь удирдлагад шийдвэрийн дэмжлэг, биоанагаахын багт бүтээгдэхүүний гүн мэдээлэл, яаралтай дэмжлэгт энгийн холбоо барих замыг нэн тэргүүнд тавьдаг.",
    "“NOVITAS gave our procurement team the clarity we needed and our clinical team the training to adopt new systems with confidence.”": "“NOVITAS манай худалдан авалтын багт хэрэгтэй тодорхой мэдээллийг, клиникийн багт шинэ системийг итгэлтэй ашиглах сургалтыг өгсөн.”",
    "Chief Operations Officer, Regional Medical Center": "Үйл ажиллагаа хариуцсан захирал, Бүсийн эмнэлгийн төв",
    "Latest news": "Сүүлийн мэдээ",
    "Insights from healthcare technology and clinical operations.": "Эрүүл мэндийн технологи ба клиникийн үйл ажиллагааны нийтлэлүүд.",
    "Technology": "Технологи",
    "How lifecycle support protects clinical uptime": "Ашиглалтын мөчлөгийн дэмжлэг клиникийн тасралтгүй ажиллагааг хэрхэн хамгаалдаг вэ",
    "A practical look at service planning, spare parts, and preventive maintenance.": "Үйлчилгээний төлөвлөлт, сэлбэг, урьдчилан сэргийлэх засварын практик тойм.",
    "Planning a modern operating suite": "Орчин үеийн хагалгааны өрөө төлөвлөх нь",
    "Equipment considerations for surgical lighting, imaging, anesthesia, and flow.": "Мэс заслын гэрэлтүүлэг, дүрс оношилгоо, мэдээгүйжүүлэг, урсгалд анхаарах тоног төхөөрөмжийн асуудлууд.",
    "Procurement": "Худалдан авалт",
    "What to compare before requesting a quote": "Үнийн санал авахаас өмнө юуг харьцуулах вэ",
    "A concise checklist for specifications, certificates, training, and warranty.": "Техникийн үзүүлэлт, сертификат, сургалт, баталгаанд зориулсан товч шалгах жагсаалт.",
    "Ready to plan your next clinical technology upgrade?": "Дараагийн клиникийн технологийн шинэчлэлээ төлөвлөхөд бэлэн үү?",
    "Talk with NOVITAS about product selection, technical requirements, installation, and quote preparation.": "Бүтээгдэхүүн сонголт, техникийн шаардлага, суурилуулалт, үнийн саналын талаар NOVITAS-тай ярилцаарай.",
    "Browse Products": "Бүтээгдэхүүн үзэх",
    "Premium medical equipment distribution and healthcare technology solutions for modern clinical environments.": "Орчин үеийн клиникийн орчинд зориулсан премиум эмнэлгийн тоног төхөөрөмжийн нийлүүлэлт ба эрүүл мэндийн технологийн шийдлүүд.",
    "Join": "Бүртгүүлэх",
    "Company": "Компани",
    "Timeline": "Цаг хугацааны түүх",
    "Catalog": "Каталог",
    "Featured Product": "Онцлох бүтээгдэхүүн",
    "Categories": "Ангилал",
    "Downloads": "Татаж авах",
    "Hospital Setup": "Эмнэлгийн тохижуулалт",
    "ICU Modernization": "Эрчимт эмчилгээний шинэчлэл",
    "Surgical Suites": "Хагалгааны өрөөнүүд",
    "Service Support": "Үйлчилгээний дэмжлэг",
    "Business hours": "Ажлын цаг",
    "Quote shortcut": "Үнийн саналын товчлол",
    "© 2026 NOVITAS Healthcare Technology. All rights reserved.": "© 2026 NOVITAS Healthcare Technology. Бүх эрх хуулиар хамгаалагдсан.",
    "Product listing": "Бүтээгдэхүүний жагсаалт",
    "Medical equipment catalog built for confident comparison.": "Итгэлтэй харьцуулалт хийхэд зориулсан эмнэлгийн тоног төхөөрөмжийн каталог.",
    "Search certified healthcare systems by clinical category, brand, and technical requirement, then move directly into documentation or quote workflows.": "Баталгаажсан эрүүл мэндийн системүүдийг клиникийн ангилал, брэнд, техникийн шаардлагаар хайж, шууд баримт бичиг эсвэл үнийн саналын урсгал руу шилжинэ.",
    "Filters": "Шүүлтүүр",
    "Refine the catalog by clinical category and partner brand.": "Каталогийг клиникийн ангилал болон түнш брэндээр нарийвчлан шүүнэ.",
    "Category": "Ангилал",
    "ICU & Respiratory": "Эрчимт эмчилгээ ба амьсгал",
    "Diagnostic Imaging": "Оношилгооны дүрс оношилгоо",
    "Lab": "Лаборатори",
    "Sterilization": "Ариутгал",
    "Brand": "Брэнд",
    "Certification": "Баталгаажуулалт",
    "CE marked": "CE тэмдэглэгээтэй",
    "ISO supported": "ISO дэмжлэгтэй",
    "Warranty included": "Баталгаа багтсан",
    "Need Help Choosing?": "Сонголтод тусламж хэрэгтэй юу?",
    "Recommended": "Санал болгосон",
    "ArcVision Mobile C-Arm": "ArcVision зөөврийн C-Arm",
    "Fluoroscopy for orthopedic, trauma, and surgical workflows.": "Ортопед, гэмтэл, мэс заслын ажлын урсгалд зориулсан флюороскопи.",
    "LumaOR Surgical Light System": "LumaOR мэс заслын гэрлийн систем",
    "Shadow-managed LED lighting for operating rooms and procedure suites.": "Хагалгааны болон процедурын өрөөнд зориулсан сүүдэр багасгасан LED гэрэлтүүлэг.",
    "AseptiPro Sterilization Unit": "AseptiPro ариутгалын төхөөрөмж",
    "Central sterile processing support for small and mid-size facilities.": "Жижиг, дунд байгууллагын төв ариутгалын боловсруулалтын дэмжлэг.",
    "HemaCore Lab Analyzer": "HemaCore лабораторийн анализатор",
    "Diagnostic analyzer package with installation and operator onboarding.": "Суурилуулалт болон операторын сургалттай оношилгооны анализаторын багц.",
    "Details": "Дэлгэрэнгүй",
    "Quote workflow": "Үнийн саналын урсгал",
    "Need specifications, lead time, or a package quote?": "Техникийн үзүүлэлт, нийлүүлэх хугацаа эсвэл багц үнийн санал хэрэгтэй юу?",
    "NOVITAS can prepare product comparisons and technical documentation for procurement review.": "NOVITAS нь худалдан авалтын үнэлгээнд зориулан бүтээгдэхүүний харьцуулалт болон техникийн баримт бичиг бэлтгэнэ.",
    "Product detail": "Бүтээгдэхүүний дэлгэрэнгүй",
    "An advanced respiratory support system for critical care departments, supplied with installation, training, warranty, and preventive service options.": "Эрчимт эмчилгээний тасагт зориулсан, суурилуулалт, сургалт, баталгаа, урьдчилан сэргийлэх үйлчилгээний сонголттой дэвшилтэт амьсгалын дэмжлэгийн систем.",
    "Overview": "Тойм",
    "Specifications": "Үзүүлэлт",
    "Service": "Үйлчилгээ",
    "Clinical Overview": "Клиникийн тойм",
    "The NVT-900 is positioned for critical care departments requiring stable respiratory support, intuitive operation, and dependable technical service. NOVITAS supports the product through requirement review, supply coordination, installation, commissioning, user onboarding, and service planning.": "NVT-900 нь тогтвортой амьсгалын дэмжлэг, ойлгомжтой ажиллагаа, найдвартай техникийн үйлчилгээ шаарддаг эрчимт эмчилгээний тасгуудад зориулагдсан. NOVITAS нь шаардлагын үнэлгээ, нийлүүлэлтийн зохицуулалт, суурилуулалт, ашиглалтад оруулалт, хэрэглэгчийн сургалт, үйлчилгээний төлөвлөлтөөр бүтээгдэхүүнийг дэмждэг.",
    "Critical care ventilation": "Эрчимт эмчилгээний амьсгалын дэмжлэг",
    "Monitoring integration": "Мониторингийн уялдаа",
    "Technical Specifications": "Техникийн үзүүлэлт",
    "Ventilation modes": "Амьсгалын горимууд",
    "Display": "Дэлгэц",
    "Patient type": "Өвчтөний төрөл",
    "Alarms": "Дохио",
    "Power": "Тэжээл",
    "Warranty": "Баталгаа",
    "Downloads & Certificates": "Татаж авах материал ба сертификат",
    "NVT-900 Product Brochure": "NVT-900 бүтээгдэхүүний танилцуулга",
    "CE Declaration Summary": "CE мэдэгдлийн хураангуй",
    "Technical Specification Sheet": "Техникийн үзүүлэлтийн хуудас",
    "Download": "Татах",
    "Service & Warranty": "Үйлчилгээ ба баталгаа",
    "NOVITAS supports deployment with biomedical coordination, acceptance testing, operator training, preventive maintenance, spare parts support, and service documentation. Optional extended service plans can be included in the quote.": "NOVITAS нь биоанагаахын зохицуулалт, хүлээн авах туршилт, операторын сургалт, урьдчилан сэргийлэх засвар, сэлбэгийн дэмжлэг, үйлчилгээний баримт бичгээр нэвтрүүлэлтийг дэмждэг. Нэмэлт уртасгасан үйлчилгээний төлөвлөгөөг үнийн саналд багтааж болно.",
    "High-performance respiratory support for critical care environments.": "Эрчимт эмчилгээний орчинд зориулсан өндөр гүйцэтгэлтэй амьсгалын дэмжлэг.",
    "Availability": "Бэлэн байдал",
    "Quote based": "Үнийн саналд үндэслэнэ",
    "Lead time": "Нийлүүлэх хугацаа",
    "4-8 weeks": "4-8 долоо хоног",
    "24 months": "24 сар",
    "On-site": "Газар дээр",
    "Quotes can include installation, training, accessories, and preventive maintenance.": "Үнийн саналд суурилуулалт, сургалт, дагалдах хэрэгсэл, урьдчилан сэргийлэх засвар багтаж болно.",
    "Related products": "Холбоотой бүтээгдэхүүн",
    "Complete the critical care environment.": "Эрчимт эмчилгээний орчныг бүрэн болгоно.",
    "Multiparameter monitoring for ICU and recovery.": "Эрчимт эмчилгээ ба сэргээх тасагт зориулсан олон үзүүлэлттэй мониторинг.",
    "CareMotion ICU Bed": "CareMotion эрчимт эмчилгээний ор",
    "Electric bed system for critical care departments.": "Эрчимт эмчилгээний тасагт зориулсан цахилгаан орны систем.",
    "Oxygen Therapy Package": "Хүчилтөрөгчийн эмчилгээний багц",
    "Accessories and oxygen support equipment.": "Дагалдах хэрэгсэл ба хүчилтөрөгчийн дэмжлэгийн тоног төхөөрөмж.",
    "View": "Үзэх",
    "About NOVITAS": "NOVITAS-ийн тухай",
    "Healthcare technology, delivered with enterprise discipline.": "Эрүүл мэндийн технологийг байгууллагын түвшний сахилга баттайгаар хүргэнэ.",
    "NOVITAS exists to help healthcare organizations make confident technology decisions, deploy certified systems, and maintain clinical continuity through reliable service.": "NOVITAS нь эрүүл мэндийн байгууллагуудад технологийн итгэлтэй шийдвэр гаргах, баталгаажсан систем нэвтрүүлэх, найдвартай үйлчилгээгээр клиникийн тасралтгүй ажиллагааг хадгалахад туслахын тулд ажилладаг.",
    "Company story": "Компанийн түүх",
    "Built for hospitals that need precision before, during, and after procurement.": "Худалдан авалтын өмнө, явцад, дараа нарийвчлал шаарддаг эмнэлгүүдэд зориулав.",
    "The company combines distributor agility with the rigor of an international healthcare partner: product research, manufacturer coordination, documentation, installation planning, training, and technical service.": "Компани нь нийлүүлэгчийн хурдтай ажиллагааг олон улсын эрүүл мэндийн түншийн нягт нямбай байдалтай хослуулдаг: бүтээгдэхүүний судалгаа, үйлдвэрлэгчийн зохицуулалт, баримт бичиг, суурилуулалтын төлөвлөлт, сургалт, техникийн үйлчилгээ.",
    "NOVITAS is designed around the reality of clinical operations, where equipment choices affect staff workflows, patient safety, maintenance complexity, and long-term cost of ownership.": "NOVITAS нь тоног төхөөрөмжийн сонголт ажилтны ажлын урсгал, өвчтөний аюулгүй байдал, засвар үйлчилгээний төвөгшил, эзэмшлийн урт хугацааны өртөгт нөлөөлдөг клиникийн бодит үйл ажиллагаанд тулгуурлан бүтээгдсэн.",
    "Mission": "Эрхэм зорилго",
    "Make advanced medical technology easier to choose, deploy, and support.": "Дэвшилтэт эмнэлгийн технологийг сонгох, нэвтрүүлэх, дэмжих үйл явцыг хялбар болгох.",
    "Vision": "Алсын хараа",
    "Become a regional benchmark for healthcare equipment distribution and lifecycle service.": "Эмнэлгийн тоног төхөөрөмжийн нийлүүлэлт ба ашиглалтын мөчлөгийн үйлчилгээнд бүс нутгийн жишиг болох.",
    "Promise": "Амлалт",
    "Every project should feel clear, accountable, and clinically grounded.": "Төсөл бүр тодорхой, хариуцлагатай, клиникийн үндэслэлтэй байх ёстой.",
    "A company shaped by category depth and service maturity.": "Ангиллын гүн мэдлэг, үйлчилгээний төлөвшлөөр бүрэлдсэн компани.",
    "Foundation": "Үүсгэн байгуулалт",
    "NOVITAS begins with a focus on critical care equipment and reliable procurement support.": "NOVITAS нь эрчимт эмчилгээний тоног төхөөрөмж, найдвартай худалдан авалтын дэмжлэгт төвлөрөн эхэлсэн.",
    "Portfolio expansion": "Багцын өргөжилт",
    "Diagnostic imaging, operating room, laboratory, and sterilization categories are added.": "Дүрс оношилгоо, хагалгааны өрөө, лаборатори, ариутгалын ангиллууд нэмэгдсэн.",
    "Technical service program": "Техникийн үйлчилгээний хөтөлбөр",
    "Installation, training, preventive maintenance, and spare parts workflows become core services.": "Суурилуулалт, сургалт, урьдчилан сэргийлэх засвар, сэлбэгийн урсгалууд үндсэн үйлчилгээ болсон.",
    "Solution delivery": "Шийдэл хэрэгжүүлэлт",
    "NOVITAS starts packaging department-level solutions for ICU, operating room, and diagnostic centers.": "NOVITAS нь эрчимт эмчилгээ, хагалгааны өрөө, оношилгооны төвүүдэд тасгийн түвшний шийдлийн багц боловсруулж эхэлсэн.",
    "Enterprise identity": "Байгууллагын түвшний дүр төрх",
    "The company evolves into a premium healthcare technology partner with modern digital procurement tools.": "Компани орчин үеийн дижитал худалдан авалтын хэрэгсэлтэй премиум эрүүл мэндийн технологийн түнш болон хөгжсөн.",
    "Core values": "Үндсэн үнэт зүйлс",
    "The principles behind every product recommendation.": "Бүтээгдэхүүний зөвлөмж бүрийн цаадах зарчим.",
    "Precision": "Нарийвчлал",
    "Technical details and clinical requirements are handled with care.": "Техникийн дэлгэрэнгүй мэдээлэл ба клиникийн шаардлагыг анхааралтай авч үздэг.",
    "Responsibility": "Хариуцлага",
    "Recommendations consider safety, service, warranty, and long-term performance.": "Зөвлөмжүүд нь аюулгүй байдал, үйлчилгээ, баталгаа, урт хугацааны гүйцэтгэлийг харгалзан үздэг.",
    "Innovation": "Инноваци",
    "Modern systems are selected for measurable clinical and operational value.": "Орчин үеийн системүүдийг хэмжигдэхүйц клиникийн болон үйл ажиллагааны үнэ цэнээр сонгодог.",
    "Partnership": "Түншлэл",
    "Hospitals, manufacturers, and engineers work from a shared plan.": "Эмнэлэг, үйлдвэрлэгч, инженерүүд нэг төлөвлөгөөний дагуу ажилладаг.",
    "Care": "Халамж",
    "Every system exists to support people delivering and receiving healthcare.": "Систем бүр эрүүл мэндийн тусламж үзүүлж, авч буй хүмүүсийг дэмжихийн төлөө оршдог.",
    "Leadership": "Удирдлага",
    "A multidisciplinary team for clinical, technical, and commercial decisions.": "Клиник, техник, бизнесийн шийдвэрт зориулсан олон чиглэлийн баг.",
    "Executive Director": "Гүйцэтгэх захирал",
    "Leads strategy, manufacturer partnerships, and institutional relationships.": "Стратеги, үйлдвэрлэгчийн түншлэл, байгууллагын харилцааг удирддаг.",
    "Clinical Solutions Lead": "Клиникийн шийдлийн удирдагч",
    "Aligns equipment portfolios with hospital workflows and clinical requirements.": "Тоног төхөөрөмжийн багцыг эмнэлгийн ажлын урсгал, клиникийн шаардлагатай уялдуулдаг.",
    "Service Operations Lead": "Үйлчилгээний үйл ажиллагааны удирдагч",
    "Oversees installation, preventive maintenance, spare parts, and technical response.": "Суурилуулалт, урьдчилан сэргийлэх засвар, сэлбэг, техникийн хариуг хариуцдаг.",
    "Office and achievements": "Оффис ба амжилтууд",
    "Designed to support complex healthcare decisions.": "Эрүүл мэндийн салбарын төвөгтэй шийдвэрийг дэмжихээр бүтээгдсэн.",
    "NOVITAS combines product documentation, partner coordination, technical service readiness, and project delivery into one clear experience for healthcare institutions.": "NOVITAS нь бүтээгдэхүүний баримт бичиг, түншийн зохицуулалт, техникийн үйлчилгээний бэлэн байдал, төслийн хэрэгжүүлэлтийг эрүүл мэндийн байгууллагад нэг тодорхой туршлага болгон нэгтгэдэг.",
    "Project delivery": "Төслийн хэрэгжүүлэлт",
    "Technical training": "Техникийн сургалт",
    "Start a quote, service request, or partnership conversation.": "Үнийн санал, үйлчилгээний хүсэлт эсвэл түншлэлийн яриагаа эхлүүлээрэй.",
    "Reach the right team quickly. NOVITAS routes product inquiries, technical service, and business development requests through one clear contact experience.": "Зөв багтай хурдан холбогдоорой. NOVITAS бүтээгдэхүүний лавлагаа, техникийн үйлчилгээ, бизнес хөгжлийн хүсэлтийг нэг тодорхой холбоо барих урсгалаар чиглүүлдэг.",
    "For fastest response, include department, product category, desired quantity, installation location, and expected timeline.": "Хамгийн хурдан хариу авахын тулд тасаг, бүтээгдэхүүний ангилал, хүссэн тоо хэмжээ, суурилуулах байршил, төлөвлөсөн хугацааг оруулна уу.",
    "Product specs": "Бүтээгдэхүүний үзүүлэлт",
    "How to reach us.": "Бидэнтэй холбогдох сувгууд.",
    "Support channels": "Дэмжлэгийн сувгууд",
    "Sales and quotes": "Борлуулалт ба үнийн санал",
    "Mon-Fri, 09:00-18:00": "Даваа-Баасан, 09:00-18:00",
    "Technical support": "Техникийн дэмжлэг",
    "Response routing for service cases": "Үйлчилгээний тохиолдлыг зөв багт чиглүүлэх",
    "General inquiry": "Ерөнхий лавлагаа",
    "Partnerships and company information": "Түншлэл ба компанийн мэдээлэл",
    "Monday to Friday": "Даваагаас Баасан",
    "09:00-18:00 Asia/Ulaanbaatar": "09:00-18:00 Asia/Ulaanbaatar",
    "Send a request": "Хүсэлт илгээх",
    "Tell us what you need.": "Танд юу хэрэгтэйг бидэнд хэлээрэй.",
    "Request type": "Хүсэлтийн төрөл",
    "Select request": "Хүсэлт сонгох",
    "Request a quote": "Үнийн санал авах",
    "Technical service": "Техникийн үйлчилгээ",
    "Product documentation": "Бүтээгдэхүүний баримт бичиг",
    "Partnership": "Түншлэл",
    "Full name": "Овог нэр",
    "Organization": "Байгууллага",
    "Email": "Имэйл",
    "Phone": "Утас",
    "Message": "Мессеж",
    "Submit Request": "Хүсэлт илгээх",
    "Branches and map": "Салбар ба газрын зураг",
    "Office access for sales, projects, and service coordination.": "Борлуулалт, төсөл, үйлчилгээний зохицуулалтад зориулсан оффисын мэдээлэл.",
    "Ulaanbaatar Head Office": "Улаанбаатар төв оффис",
    "Healthcare technology showroom, procurement support, and technical service coordination.": "Эрүүл мэндийн технологийн танилцуулгын өрөө, худалдан авалтын дэмжлэг, техникийн үйлчилгээний зохицуулалт.",
    "Address": "Хаяг",
    "Sukhbaatar District": "Сүхбаатар дүүрэг",
    "Hours": "Цагийн хуваарь",
    "Support": "Дэмжлэг",
    "By appointment": "Урьдчилан цаг авч",
    "Schedule Visit": "Уулзалт товлох",
    "Head Office": "Төв оффис",
    "Sales, procurement, partnerships, and executive meetings.": "Борлуулалт, худалдан авалт, түншлэл, удирдлагын уулзалтууд.",
    "Service Desk": "Үйлчилгээний төв",
    "Support routing, service requests, spare parts, and engineer scheduling.": "Дэмжлэгийн чиглүүлэлт, үйлчилгээний хүсэлт, сэлбэг, инженерийн цагийн зохицуулалт.",
    "Demo Sessions": "Демо уулзалт",
    "Product demonstrations and technical discussions by appointment.": "Бүтээгдэхүүний танилцуулга, техникийн хэлэлцүүлгийг цаг товлон зохион байгуулна.",
    "ICU Ventilation System": "Эрчимт эмчилгээний амьсгалын систем",
    "Surgical Suite Planning": "Хагалгааны өрөөний төлөвлөлт",
    "ISO and CE Certificates": "ISO ба CE сертификатууд",
    "Technical Service Request": "Техникийн үйлчилгээний хүсэлт",
    "Healthcare Projects": "Эрүүл мэндийн төслүүд",
    "Product": "Бүтээгдэхүүн",
    "Solution": "Шийдэл",
    "Download": "Татах",
    "Portfolio": "Портфолио",
    "Thank you. NOVITAS sales support will prepare a response shortly.": "Баярлалаа. NOVITAS-ийн борлуулалтын баг удахгүй хариу бэлтгэнэ.",
    "Thank you for subscribing to NOVITAS updates.": "NOVITAS-ийн шинэчлэлд бүртгүүлсэнд баярлалаа.",
    "Search products, certificates, solutions": "Бүтээгдэхүүн, сертификат, шийдэл хайх",
    "Email for updates": "Мэдээлэл авах имэйл",
    "Search by product, brand, or category": "Бүтээгдэхүүн, брэнд, ангиллаар хайх",
    "Your name": "Таны нэр",
    "Hospital or company": "Эмнэлэг эсвэл компани",
    "name@example.com": "name@example.com",
    "Share product names, quantities, department, timeline, or service issue.": "Бүтээгдэхүүний нэр, тоо хэмжээ, тасаг, хугацаа эсвэл үйлчилгээний асуудлаа бичнэ үү.",
    "Switch to light mode": "Гэрэл горим руу шилжих",
    "Switch to dark mode": "Харанхуй горим руу шилжих",
    "Product gallery image": "Бүтээгдэхүүний зургийн галерей"
  }
};

function t(value) {
  const key = String(value || "").trim();
  return translations.mn[key] || key;
}

function translateTextNode(node, language) {
  if (!originalTextNodes.has(node)) originalTextNodes.set(node, node.nodeValue);
  const original = originalTextNodes.get(node);
  const trimmed = original.trim();
  if (!trimmed) return;
  const translated = language === "mn" ? translations.mn[trimmed] : null;
  if (!translated) {
    node.nodeValue = original;
    return;
  }
  node.nodeValue = original.replace(trimmed, translated);
}

function translateAttribute(element, attribute, language) {
  if (!element.hasAttribute(attribute)) return;
  let originals = originalAttributes.get(element);
  if (!originals) {
    originals = {};
    originalAttributes.set(element, originals);
  }
  if (!Object.prototype.hasOwnProperty.call(originals, attribute)) {
    originals[attribute] = element.getAttribute(attribute);
  }
  const original = originals[attribute];
  const translated = language === "mn" ? translations.mn[original] : null;
  element.setAttribute(attribute, translated || original);
}

function setLanguage(language) {
  const nextLanguage = language === "mn" ? "mn" : "en";
  html.lang = nextLanguage === "mn" ? "mn" : "en";
  html.dataset.language = nextLanguage;
  localStorage.setItem("novitas-language", nextLanguage);

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || ["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => translateTextNode(node, nextLanguage));

  document.querySelectorAll("[placeholder], [aria-label], [title]").forEach((element) => {
    translateAttribute(element, "placeholder", nextLanguage);
    translateAttribute(element, "aria-label", nextLanguage);
    translateAttribute(element, "title", nextLanguage);
  });

  languageButtons.forEach((button) => {
    button.dataset.lang = nextLanguage === "mn" ? "MN" : "EN";
    button.textContent = nextLanguage === "mn" ? "MN" : "EN";
    button.setAttribute("aria-label", nextLanguage === "mn" ? "Switch to English" : "Монгол хэл рүү шилжих");
  });

  renderSearchResults(searchInput?.value || "");
}

function setHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 8);
}

function closeMega() {
  if (!megaMenu || !megaToggle) return;
  megaMenu.classList.remove("is-visible");
  megaToggle.setAttribute("aria-expanded", "false");
}

function openSearch() {
  if (!searchOverlay) return;
  searchOverlay.classList.add("is-open");
  document.body.classList.add("is-locked");
  renderSearchResults("");
  window.setTimeout(() => searchInput?.focus(), 40);
}

function closeSearch() {
  if (!searchOverlay) return;
  searchOverlay.classList.remove("is-open");
  document.body.classList.remove("is-locked");
}

function renderSearchResults(query) {
  if (!searchResults) return;
  const normalized = query.trim().toLowerCase();
  const results = searchData.filter((item) => {
    const localized = `${t(item.title)} ${t(item.type)}`.toLowerCase();
    return !normalized || `${item.title} ${item.type}`.toLowerCase().includes(normalized) || localized.includes(normalized);
  });
  searchResults.innerHTML = results.map((item) => `
    <a class="search-result" href="${item.url}">
      <span>
        <strong>${html.dataset.language === "mn" ? t(item.title) : item.title}</strong>
        <small class="text-small">${html.dataset.language === "mn" ? t(item.type) : item.type}</small>
      </span>
      <i data-lucide="arrow-up-right"></i>
    </a>
  `).join("");
  if (window.lucide) window.lucide.createIcons();
}

function setTheme(theme) {
  html.dataset.theme = theme;
  localStorage.setItem("novitas-theme", theme);
  themeButtons.forEach((button) => {
    button.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  });
}

function initTheme() {
  const saved = localStorage.getItem("novitas-theme");
  const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  setTheme(saved || preferred);
}

function initLanguageToggles() {
  const saved = localStorage.getItem("novitas-language") || "en";
  setLanguage(saved);

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(html.dataset.language === "mn" ? "en" : "mn");
    });
  });
}

function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.dataset.done) return;
      entry.target.dataset.done = "true";
      const target = Number(entry.target.dataset.count || 0);
      const suffix = entry.target.dataset.suffix || "";
      const duration = 1300;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        entry.target.textContent = `${Math.round(target * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => observer.observe(counter));
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  items.forEach((item) => observer.observe(item));
}

function initTabs() {
  const tabButtons = document.querySelectorAll("[data-tab-target]");
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tabTarget;
      document.querySelectorAll("[data-tab-target]").forEach((control) => {
        control.classList.toggle("is-active", control === button);
      });
      document.querySelectorAll("[data-tab-panel]").forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.tabPanel === target);
      });
    });
  });
}

function initGallery() {
  const mainImage = document.querySelector("[data-gallery-main]");
  const thumbButtons = document.querySelectorAll("[data-gallery-thumb]");
  if (!mainImage || !thumbButtons.length) return;

  thumbButtons.forEach((button) => {
    button.addEventListener("click", () => {
      mainImage.src = button.dataset.galleryThumb;
      mainImage.alt = button.querySelector("img")?.alt || "Product gallery image";
      thumbButtons.forEach((control) => control.classList.remove("is-active"));
      button.classList.add("is-active");
    });
  });
}

function initCatalogFilters() {
  const catalog = document.querySelector("[data-catalog-grid]");
  if (!catalog) return;

  const cards = [...catalog.querySelectorAll("[data-product-card]")];
  const search = document.querySelector("[data-catalog-search]");
  const sort = document.querySelector("[data-catalog-sort]");
  const checks = [...document.querySelectorAll("[data-filter]")];

  function applyFilters() {
    const query = (search?.value || "").trim().toLowerCase();
    const active = checks.filter((check) => check.checked).map((check) => check.value);

    cards.forEach((card) => {
      const haystack = `${card.dataset.name} ${card.dataset.category} ${card.dataset.brand} ${t(card.dataset.name)} ${t(card.dataset.category)}`.toLowerCase();
      const matchesQuery = !query || haystack.includes(query);
      const matchesFilter = !active.length || active.includes(card.dataset.category) || active.includes(card.dataset.brand);
      card.style.display = matchesQuery && matchesFilter ? "" : "none";
    });

    const visible = cards.filter((card) => card.style.display !== "none");
    const sorted = visible.sort((a, b) => {
      if (sort?.value === "brand") return a.dataset.brand.localeCompare(b.dataset.brand);
      if (sort?.value === "category") return a.dataset.category.localeCompare(b.dataset.category);
      return a.dataset.rank.localeCompare(b.dataset.rank);
    });
    sorted.forEach((card) => catalog.appendChild(card));
  }

  search?.addEventListener("input", applyFilters);
  sort?.addEventListener("change", applyFilters);
  checks.forEach((check) => check.addEventListener("change", applyFilters));
}

function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  const status = document.querySelector("[data-form-status]");
  if (!form || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = "Thank you. NOVITAS sales support will prepare a response shortly.";
    status.textContent = html.dataset.language === "mn" ? t(message) : message;
    form.reset();
  });
}

function initNewsletterForms() {
  newsletterForms.forEach((form) => {
    const status = document.createElement("div");
    status.className = "newsletter-status text-small";
    form.append(status);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const message = "Thank you for subscribing to NOVITAS updates.";
      status.textContent = html.dataset.language === "mn" ? t(message) : message;
      form.reset();
    });
  });
}

function initActionButtons() {
  actionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      const card = button.closest("[data-product-card]");
      const product = card?.dataset.name || "product";
      if (action === "compare") {
        window.location.href = `contact.html?request=compare&product=${encodeURIComponent(product)}`;
      }
      if (action === "download") {
        window.location.href = "product-detail.html#downloads";
      }
    });
  });
}

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();
initTheme();
initLanguageToggles();
initCounters();
initReveal();
initTabs();
initGallery();
initCatalogFilters();
initContactForm();
initNewsletterForms();
initActionButtons();

mobileToggle?.addEventListener("click", () => {
  const isOpen = navMenu?.classList.toggle("is-open");
  header?.classList.toggle("is-open", Boolean(isOpen));
  mobileToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

megaToggle?.addEventListener("click", () => {
  const isVisible = megaMenu?.classList.toggle("is-visible");
  megaToggle.setAttribute("aria-expanded", String(Boolean(isVisible)));
});

document.addEventListener("click", (event) => {
  if (!megaMenu || !megaToggle) return;
  const target = event.target;
  if (!megaMenu.contains(target) && !megaToggle.contains(target)) closeMega();
});

openSearchButtons.forEach((button) => button.addEventListener("click", openSearch));
closeSearchButtons.forEach((button) => button.addEventListener("click", closeSearch));
searchOverlay?.addEventListener("click", (event) => {
  if (event.target === searchOverlay) closeSearch();
});
searchInput?.addEventListener("input", (event) => renderSearchResults(event.target.value));

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setTheme(html.dataset.theme === "dark" ? "light" : "dark");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSearch();
    closeMega();
  }
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openSearch();
  }
});

if (window.lucide) window.lucide.createIcons();
