import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, FileSpreadsheet, FileText, Mail, Phone } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { InquiryDeleteButton } from "@/components/admin/inquiry-delete-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminInquiry, inquiryStatusLabels } from "@/lib/inquiries";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ id: string }> };

function formatDateTime(value: Date | string) {
  return new Intl.DateTimeFormat("mn-MN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function exportHref(id: string, format: "word" | "excel" | "pdf") {
  return `/api/admin/inquiries/export?format=${format}&id=${id}`;
}

function DetailRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="grid gap-1 rounded-lg border bg-white p-4 md:grid-cols-[180px_1fr] md:gap-4">
      <dt className="text-sm font-semibold text-slate-600">{label}</dt>
      <dd className="whitespace-pre-line text-sm leading-6 text-slate-900">{value || "-"}</dd>
    </div>
  );
}

export default async function AdminInquiryDetailPage({ params }: PageProps) {
  const { id } = await params;
  const inquiry = await getAdminInquiry(id);

  if (!inquiry) {
    notFound();
  }

  const productTitle = inquiry.product?.titleMn || inquiry.product?.titleEn || "";
  const productCategory = inquiry.product?.category?.titleMn || inquiry.product?.category?.titleEn || "";

  return (
    <AdminShell title="Санал хүсэлтийн дэлгэрэнгүй" activePath="/admin/inquiries">
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <Button asChild variant="outline" size="sm">
          <Link href="/admin/inquiries">
            <ArrowLeft className="h-4 w-4" />
            Буцах
          </Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <a href={exportHref(inquiry.id, "word")}>
            <FileText className="h-4 w-4" />
            Word татах
          </a>
        </Button>
        <Button asChild variant="outline" size="sm">
          <a href={exportHref(inquiry.id, "excel")}>
            <FileSpreadsheet className="h-4 w-4" />
            Excel татах
          </a>
        </Button>
        <Button asChild variant="outline" size="sm">
          <a href={exportHref(inquiry.id, "pdf")}>
            <Download className="h-4 w-4" />
            PDF татах
          </a>
        </Button>
        <InquiryDeleteButton id={inquiry.id} redirectTo="/admin/inquiries" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <CardTitle>{inquiry.subject}</CardTitle>
                <CardDescription>{formatDateTime(inquiry.createdAt)}</CardDescription>
              </div>
              <Badge className="w-fit">{inquiryStatusLabels[inquiry.status]}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-3">
              <DetailRow label="Нэр" value={inquiry.name} />
              <DetailRow label="Байгууллага" value={inquiry.organization} />
              <DetailRow label="Имэйл" value={inquiry.email} />
              <DetailRow label="Утас" value={inquiry.phone} />
              <DetailRow label="Бүтээгдэхүүн" value={productTitle} />
              <DetailRow label="Ангилал" value={productCategory} />
              <DetailRow label="Мессеж" value={inquiry.message} />
            </dl>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Холбоо барих</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              <a className="flex items-center gap-2 text-medical hover:underline" href={`mailto:${inquiry.email}`}>
                <Mail className="h-4 w-4" />
                {inquiry.email}
              </a>
              {inquiry.phone ? (
                <a className="flex items-center gap-2 text-medical hover:underline" href={`tel:${inquiry.phone.replace(/\s+/g, "")}`}>
                  <Phone className="h-4 w-4" />
                  {inquiry.phone}
                </a>
              ) : null}
            </CardContent>
          </Card>

          {inquiry.product ? (
            <Card>
              <CardHeader>
                <CardTitle>Бүтээгдэхүүн</CardTitle>
                <CardDescription>{productCategory}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-semibold">{productTitle}</p>
                <Button asChild className="mt-4" variant="outline" size="sm">
                  <Link href={`/mn/products/${inquiry.product.id}`}>Сайт дээр харах</Link>
                </Button>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </AdminShell>
  );
}
