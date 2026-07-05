import { z } from "zod";

export const contactInquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  organization: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(60).optional().or(z.literal("")),
  subject: z.string().trim().min(3).max(180),
  message: z.string().trim().min(10).max(5000),
  productId: z.string().trim().optional().or(z.literal(""))
});

export const productSchema = z.object({
  categoryId: z.string().min(1),
  tag: z.string().min(2).max(80).optional().or(z.literal("")),
  titleMn: z.string().min(2).max(220),
  titleEn: z.string().max(220).optional().or(z.literal("")),
  summaryMn: z.string().max(1000).optional().or(z.literal("")),
  summaryEn: z.string().max(1000).optional().or(z.literal("")),
  descriptionMn: z.string().max(10000).optional().or(z.literal("")),
  descriptionEn: z.string().max(10000).optional().or(z.literal("")),
  specifications: z.string().max(20000).optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  seoTitleMn: z.string().max(220).optional().or(z.literal("")),
  seoTitleEn: z.string().max(220).optional().or(z.literal("")),
  seoDescriptionMn: z.string().max(500).optional().or(z.literal("")),
  seoDescriptionEn: z.string().max(500).optional().or(z.literal(""))
});

export const productCategorySchema = z.object({
  titleMn: z.string().trim().min(2).max(220),
  titleEn: z.string().trim().max(220).optional().or(z.literal("")),
  descriptionMn: z.string().trim().max(2000).optional().or(z.literal("")),
  descriptionEn: z.string().trim().max(2000).optional().or(z.literal("")),
  sortOrder: z.coerce.number().int().min(0).max(10000).default(0)
});

export const articleSchema = z.object({
  categoryId: z.string().optional().or(z.literal("")),
  coverImageId: z.string().optional().or(z.literal("")),
  titleMn: z.string().min(2).max(220),
  titleEn: z.string().max(220).optional().or(z.literal("")),
  excerptMn: z.string().max(700).optional().or(z.literal("")),
  excerptEn: z.string().max(700).optional().or(z.literal("")),
  bodyMn: z.string().min(10).max(50000),
  bodyEn: z.string().max(50000).optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  publishedAt: z.string().optional().or(z.literal("")),
  seoTitleMn: z.string().max(220).optional().or(z.literal("")),
  seoTitleEn: z.string().max(220).optional().or(z.literal("")),
  seoDescriptionMn: z.string().max(500).optional().or(z.literal("")),
  seoDescriptionEn: z.string().max(500).optional().or(z.literal(""))
});
