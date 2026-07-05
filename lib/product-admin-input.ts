import { Prisma } from "@prisma/client";
import type { z } from "zod";
import { parseProductSpecificationsInput } from "@/lib/product-specifications";
import type { productSchema } from "@/lib/validators";

type ProductInput = z.infer<typeof productSchema>;

function optionalText(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function specificationsForPrisma(value: unknown) {
  const parsed = parseProductSpecificationsInput(value);
  return parsed ? (parsed as Prisma.InputJsonValue) : Prisma.DbNull;
}

export function buildProductCreateData(data: ProductInput): Prisma.ProductUncheckedCreateInput {
  return {
    categoryId: data.categoryId,
    titleMn: data.titleMn,
    titleEn: optionalText(data.titleEn),
    tag: optionalText(data.tag),
    summaryMn: optionalText(data.summaryMn),
    summaryEn: optionalText(data.summaryEn),
    descriptionMn: optionalText(data.descriptionMn),
    descriptionEn: optionalText(data.descriptionEn),
    specifications: specificationsForPrisma(data.specifications),
    seoTitleMn: optionalText(data.seoTitleMn),
    seoTitleEn: optionalText(data.seoTitleEn),
    seoDescriptionMn: optionalText(data.seoDescriptionMn),
    seoDescriptionEn: optionalText(data.seoDescriptionEn),
    status: data.status,
    publishedAt: data.status === "PUBLISHED" ? new Date() : null
  };
}

export function buildProductUpdateData(data: Partial<ProductInput>): Prisma.ProductUncheckedUpdateInput {
  const update: Prisma.ProductUncheckedUpdateInput = {};

  if (data.categoryId !== undefined) update.categoryId = data.categoryId;
  if (data.titleMn !== undefined) update.titleMn = data.titleMn;
  if (data.titleEn !== undefined) update.titleEn = optionalText(data.titleEn);
  if (data.tag !== undefined) update.tag = optionalText(data.tag);
  if (data.summaryMn !== undefined) update.summaryMn = optionalText(data.summaryMn);
  if (data.summaryEn !== undefined) update.summaryEn = optionalText(data.summaryEn);
  if (data.descriptionMn !== undefined) update.descriptionMn = optionalText(data.descriptionMn);
  if (data.descriptionEn !== undefined) update.descriptionEn = optionalText(data.descriptionEn);
  if (data.specifications !== undefined) update.specifications = specificationsForPrisma(data.specifications);
  if (data.seoTitleMn !== undefined) update.seoTitleMn = optionalText(data.seoTitleMn);
  if (data.seoTitleEn !== undefined) update.seoTitleEn = optionalText(data.seoTitleEn);
  if (data.seoDescriptionMn !== undefined) update.seoDescriptionMn = optionalText(data.seoDescriptionMn);
  if (data.seoDescriptionEn !== undefined) update.seoDescriptionEn = optionalText(data.seoDescriptionEn);
  if (data.status !== undefined) {
    update.status = data.status;
    update.publishedAt = data.status === "PUBLISHED" ? new Date() : data.status === "DRAFT" ? null : undefined;
  }

  return update;
}
