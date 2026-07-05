import { NextResponse } from "next/server";
import { apiError, requireAdminSession } from "@/lib/admin";
import { getAdminInquiries } from "@/lib/inquiries";

export async function GET(request: Request) {
  try {
    await requireAdminSession();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;
    const q = searchParams.get("q") || undefined;
    const inquiries = await getAdminInquiries({ q, status });
    return NextResponse.json(inquiries);
  } catch (error) {
    return apiError(error);
  }
}
