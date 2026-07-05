import Link from "next/link";
import { Download, Eye, FileSpreadsheet, FileText, MessageSquare } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { InquiryDeleteButton } from "@/components/admin/inquiry-delete-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAdminInquiries, inquiryStatusLabels } from "@/lib/inquiries";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

type PageProps = { searchParams: Promise<{ q?: string; status?: string }> };

async function getInquiries(q?: string, status?: string) {
  try {
    return await getAdminInquiries({ q, status });
  } catch {
    return [];
  }
}

function exportHref(format: "word" | "excel" | "pdf", q?: string, status?: string) {
  const params = new URLSearchParams({ format });
  if (q) params.set("q", q);
  if (status) params.set("status", status);
  return `/api/admin/inquiries/export?${params.toString()}`;
}

export default async function AdminInquiriesPage({ searchParams }: PageProps) {
  const { q, status } = await searchParams;
  const inquiries = await getInquiries(q, status);

  return (
    <AdminShell title="Санал хүсэлт" activePath="/admin/inquiries">
      <Card>
        <CardHeader>
          <CardTitle>Санал хүсэлтүүд</CardTitle>
          <CardDescription>Төлөвөөр шүүх эсвэл илгээгч, гарчигаар хайх.</CardDescription>
        </CardHeader>
        <div className="px-6 pb-6">
          <div className="mb-5 flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm">
              <a href={exportHref("word", q, status)}>
                <FileText className="h-4 w-4" />
                Word татах
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href={exportHref("excel", q, status)}>
                <FileSpreadsheet className="h-4 w-4" />
                Excel татах
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href={exportHref("pdf", q, status)}>
                <Download className="h-4 w-4" />
                PDF татах
              </a>
            </Button>
          </div>
          <form className="mb-5 grid gap-3 md:grid-cols-[1fr_180px_auto]">
            <Input name="q" defaultValue={q ?? ""} placeholder="Хайх" />
            <select name="status" defaultValue={status ?? ""} className="h-11 rounded-lg border bg-white px-3 text-sm">
              <option value="">Бүх төлөв</option>
              <option value="NEW">Шинэ</option>
              <option value="IN_REVIEW">Хянаж байна</option>
              <option value="REPLIED">Хариулсан</option>
              <option value="CLOSED">Хаасан</option>
            </select>
            <Button type="submit">Шүүх</Button>
          </form>
          <div className="grid gap-4">
            {inquiries.map((inquiry) => (
              <div key={inquiry.id} className="rounded-xl border p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-teal" />
                      <p className="font-semibold">{inquiry.subject}</p>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                      {inquiry.name} · {inquiry.email} · {formatDate(inquiry.createdAt, "mn")}
                    </p>
                    {inquiry.product ? (
                      <p className="mt-1 text-sm text-slate-500">
                        Бүтээгдэхүүн: {inquiry.product.titleMn || inquiry.product.titleEn}
                      </p>
                    ) : null}
                    <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-600">{inquiry.message}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{inquiryStatusLabels[inquiry.status]}</Badge>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/inquiries/${inquiry.id}`}>
                        <Eye className="h-4 w-4" />
                        Дэлгэрэнгүй
                      </Link>
                    </Button>
                    <InquiryDeleteButton id={inquiry.id} />
                  </div>
                </div>
              </div>
            ))}
            {inquiries.length === 0 ? <p className="py-8 text-center text-sm text-slate-500">Одоогоор санал хүсэлт алга.</p> : null}
          </div>
        </div>
      </Card>
    </AdminShell>
  );
}
