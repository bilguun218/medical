import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactInquirySchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = contactInquirySchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid inquiry data", fieldErrors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    const inquiry = await db.contactInquiry.create({
      data: {
        name: parsed.data.name,
        organization: parsed.data.organization || null,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        subject: parsed.data.subject,
        message: parsed.data.message,
        productId: parsed.data.productId || null
      }
    });

    return NextResponse.json({ id: inquiry.id }, { status: 201 });
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json({ error: "Unable to create inquiry" }, { status: 500 });
  }
}
