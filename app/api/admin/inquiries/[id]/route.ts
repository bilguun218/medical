import { NextResponse } from "next/server";
import { z } from "zod";
import { apiError, requireAdminSession } from "@/lib/admin";
import { db } from "@/lib/db";

const statusSchema = z.object({
  status: z.enum(["NEW", "IN_REVIEW", "REPLIED", "CLOSED"])
});

type RouteContext = {
  params: { id: string };
};

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    // 1. Auth check (admin only)
    await requireAdminSession();

    // 2. Parse request body
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

    // 3. Validate id exists
    if (!params?.id) {
      return NextResponse.json(
        { error: "Missing inquiry id" },
        { status: 400 }
      );
    }

    // 4. Update DB
    const inquiry = await db.contactInquiry.update({
      where: { id: params.id },
      data: {
        status: parsed.data.status
      }
    });

    // 5. Return result
    return NextResponse.json(inquiry);
  } catch (error: unknown) {
    console.error("PATCH /contactInquiry error:", error);

    return apiError(error);
  }
}