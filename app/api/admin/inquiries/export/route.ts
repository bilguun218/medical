import { apiError, requireAdminSession } from "@/lib/admin";
import { createExcelExport, createPdfExport, createWordExport, exportFileName, type InquiryExportFormat } from "@/lib/inquiry-exports";
import { getAdminInquiries } from "@/lib/inquiries";

const formats = ["word", "excel", "pdf"] as const;

function contentType(format: InquiryExportFormat) {
  if (format === "word") return "application/msword; charset=utf-8";
  if (format === "excel") return "application/vnd.ms-excel; charset=utf-8";
  return "application/pdf";
}

export async function GET(request: Request) {
  try {
    await requireAdminSession();
    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format") as InquiryExportFormat | null;

    if (!format || !formats.includes(format)) {
      return Response.json({ error: "Invalid export format" }, { status: 400 });
    }

    const id = searchParams.get("id");
    const inquiries = await getAdminInquiries({
      id,
      q: id ? null : searchParams.get("q"),
      status: id ? null : searchParams.get("status")
    });
    const body =
      format === "word"
        ? createWordExport(inquiries)
        : format === "excel"
          ? createExcelExport(inquiries)
          : await createPdfExport(inquiries);

    return new Response(new Uint8Array(body), {
      headers: {
        "Content-Type": contentType(format),
        "Content-Disposition": `attachment; filename="${exportFileName(format, Boolean(id))}"`,
        "Cache-Control": "no-store"
      }
    });
  } catch (error) {
    return apiError(error);
  }
}
