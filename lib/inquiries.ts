import type { InquiryStatus, Prisma } from "@prisma/client";
import { db } from "@/lib/db";

const inquiryStatuses = ["NEW", "IN_REVIEW", "REPLIED", "CLOSED"] as const satisfies InquiryStatus[];

export const inquiryStatusLabels: Record<InquiryStatus, string> = {
  NEW: "Шинэ",
  IN_REVIEW: "Хянаж байна",
  REPLIED: "Хариулсан",
  CLOSED: "Хаасан"
};

export type InquiryQuery = {
  q?: string | null;
  status?: string | null;
  id?: string | null;
};

export function normalizeInquiryStatus(status?: string | null): InquiryStatus | undefined {
  return inquiryStatuses.includes(status as InquiryStatus) ? (status as InquiryStatus) : undefined;
}

export function buildInquiryWhere({ q, status, id }: InquiryQuery): Prisma.ContactInquiryWhereInput {
  const normalizedStatus = normalizeInquiryStatus(status);
  const search = q?.trim();

  return {
    ...(id ? { id } : {}),
    ...(normalizedStatus ? { status: normalizedStatus } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } },
            { organization: { contains: search, mode: "insensitive" } },
            { subject: { contains: search, mode: "insensitive" } },
            { message: { contains: search, mode: "insensitive" } }
          ]
        }
      : {})
  };
}

export function getAdminInquiries(query: InquiryQuery = {}) {
  return db.contactInquiry.findMany({
    where: buildInquiryWhere(query),
    include: {
      product: {
        include: { category: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });
}

export function getAdminInquiry(id: string) {
  return db.contactInquiry.findUnique({
    where: { id },
    include: {
      product: {
        include: { category: true }
      }
    }
  });
}
