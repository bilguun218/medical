import { join } from "node:path";
import * as pdfMake from "pdfmake";
import type { Content, TDocumentDefinitions, TFontDictionary } from "pdfmake/interfaces";
import type { getAdminInquiries } from "@/lib/inquiries";
import { inquiryStatusLabels } from "@/lib/inquiries";
import { formatDate } from "@/lib/utils";

type InquiryRecord = Awaited<ReturnType<typeof getAdminInquiries>>[number];
export type InquiryExportFormat = "word" | "excel" | "pdf";

function escapeHtml(value: string | null | undefined) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDateTime(value: Date | string) {
  return new Intl.DateTimeFormat("mn-MN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function productName(inquiry: InquiryRecord) {
  return inquiry.product?.titleMn || inquiry.product?.titleEn || "";
}

function inquiryRows(inquiry: InquiryRecord) {
  return [
    ["Төлөв", inquiryStatusLabels[inquiry.status]],
    ["Огноо", formatDateTime(inquiry.createdAt)],
    ["Нэр", inquiry.name],
    ["Байгууллага", inquiry.organization || "-"],
    ["Имэйл", inquiry.email],
    ["Утас", inquiry.phone || "-"],
    ["Бүтээгдэхүүн", productName(inquiry) || "-"],
    ["Гарчиг", inquiry.subject],
    ["Дэлгэрэнгүй", inquiry.message]
  ];
}

function officeDocument(title: string, body: string) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(title)}</title>
  <style>
    body { font-family: Arial, sans-serif; color: #111827; }
    h1 { font-size: 24px; }
    h2 { font-size: 18px; margin-top: 28px; }
    table { width: 100%; border-collapse: collapse; margin: 12px 0 24px; }
    th, td { border: 1px solid #d1d5db; padding: 8px; vertical-align: top; }
    th { background: #f3f4f6; text-align: left; }
  </style>
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  ${body}
</body>
</html>`;
}

export function createWordExport(inquiries: InquiryRecord[]) {
  const body = inquiries
    .map(
      (inquiry, index) => `
        <h2>${index + 1}. ${escapeHtml(inquiry.subject)}</h2>
        <table>
          <tbody>
            ${inquiryRows(inquiry)
              .map(([label, value]) => `<tr><th>${escapeHtml(label)}</th><td>${escapeHtml(value).replaceAll("\n", "<br />")}</td></tr>`)
              .join("")}
          </tbody>
        </table>
      `
    )
    .join("");

  return Buffer.from(`\ufeff${officeDocument("Санал хүсэлтүүд", body)}`, "utf8");
}

export function createExcelExport(inquiries: InquiryRecord[]) {
  const headings = ["#", "Төлөв", "Огноо", "Нэр", "Байгууллага", "Имэйл", "Утас", "Бүтээгдэхүүн", "Гарчиг", "Дэлгэрэнгүй"];
  const rows = inquiries
    .map(
      (inquiry, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${escapeHtml(inquiryStatusLabels[inquiry.status])}</td>
          <td>${escapeHtml(formatDateTime(inquiry.createdAt))}</td>
          <td>${escapeHtml(inquiry.name)}</td>
          <td>${escapeHtml(inquiry.organization || "")}</td>
          <td>${escapeHtml(inquiry.email)}</td>
          <td>${escapeHtml(inquiry.phone || "")}</td>
          <td>${escapeHtml(productName(inquiry))}</td>
          <td>${escapeHtml(inquiry.subject)}</td>
          <td>${escapeHtml(inquiry.message)}</td>
        </tr>
      `
    )
    .join("");
  const table = `
    <table>
      <thead><tr>${headings.map((heading) => `<th>${escapeHtml(heading)}</th>`).join("")}</tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;

  return Buffer.from(`\ufeff${officeDocument("Санал хүсэлтүүд", table)}`, "utf8");
}

export function createPdfExport(inquiries: InquiryRecord[]) {
  const fontRoot = join(process.cwd(), "node_modules", "pdfmake", "fonts", "Roboto");
  const fonts: TFontDictionary = {
    Roboto: {
      normal: join(fontRoot, "Roboto-Regular.ttf"),
      bold: join(fontRoot, "Roboto-Medium.ttf"),
      italics: join(fontRoot, "Roboto-Italic.ttf"),
      bolditalics: join(fontRoot, "Roboto-MediumItalic.ttf")
    }
  };
  pdfMake.addFonts(fonts);
  const content: Content[] = [
    { text: "Санал хүсэлтүүд", style: "header" } as Content,
    { text: `Татсан огноо: ${formatDate(new Date(), "mn")}`, style: "meta" } as Content
  ];

  for (const [index, inquiry] of inquiries.entries()) {
    content.push({ text: `${index + 1}. ${inquiry.subject}`, style: "subheader", margin: [0, 14, 0, 6] } as Content);
    content.push({
      table: {
        widths: ["28%", "72%"],
        body: inquiryRows(inquiry).map(([label, value]) => [
          { text: label, bold: true, fillColor: "#f3f4f6" },
          String(value ?? "")
        ])
      },
      layout: {
        hLineColor: () => "#d1d5db",
        vLineColor: () => "#d1d5db"
      }
    } as Content);
  }
  const definition: TDocumentDefinitions = {
    pageSize: "A4",
    pageMargins: [36, 42, 36, 42],
    defaultStyle: {
      font: "Roboto",
      fontSize: 10,
      lineHeight: 1.25
    },
    styles: {
      header: { fontSize: 20, bold: true, margin: [0, 0, 0, 8] },
      subheader: { fontSize: 13, bold: true },
      meta: { fontSize: 9, color: "#64748b" }
    },
    content
  };

  return pdfMake.createPdf(definition).getBuffer();
}

export function exportFileName(format: InquiryExportFormat, single = false) {
  const today = new Date().toISOString().slice(0, 10);
  const name = single ? "inquiry" : "inquiries";
  const extension = format === "word" ? "doc" : format === "excel" ? "xls" : "pdf";
  return `${name}-${today}.${extension}`;
}
