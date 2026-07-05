import { NextResponse } from "next/server";
import { z } from "zod";
import { apiError, requireAdminSession } from "@/lib/admin";
import { db } from "@/lib/db";

const statusSchema = z.object({
  status: z.enum(["NEW", "IN_REVIEW", "REPLIED", "CLOSED"])
});

function missingIdResponse() {
  return NextResponse.json(
    { error: "Missing inquiry id" },
    { status: 400 }
  );
}

async function updateInquiryStatus(request: Request, id: string) {
  const payload = await request.json();
  const parsed = statusSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid status",
        details: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const inquiry = await db.contactInquiry.update({
    where: { id },
    data: {
      status: parsed.data.status
    }
  });

  return NextResponse.json(inquiry);
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminSession();
    const { id } = await params;

    if (!id) return missingIdResponse();

    const inquiry = await db.contactInquiry.findUnique({
      where: { id },
      include: {
        product: {
          include: { category: true }
        }
      }
    });

    if (!inquiry) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json(inquiry);
  } catch (error) {
    return apiError(error);
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminSession();
    const { id } = await params;

    if (!id) return missingIdResponse();

    return updateInquiryStatus(request, id);
  } catch (error: unknown) {
    console.error("PATCH /contactInquiry error:", error);

    return apiError(error);
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminSession();
    const { id } = await params;

    if (!id) return missingIdResponse();

    return updateInquiryStatus(request, id);
  } catch (error: unknown) {
    console.error("PUT /contactInquiry error:", error);

    return apiError(error);
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminSession();
    const { id } = await params;

    if (!id) return missingIdResponse();

    await db.contactInquiry.delete({ where: { id } });

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    console.error("DELETE /contactInquiry error:", error);

    return apiError(error);
  }
}
