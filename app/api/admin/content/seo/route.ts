import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { apiError, requireAdminSession } from "@/lib/admin";
import { saveSeoRecords, seoSettingsSchema } from "@/lib/cms";

export async function PATCH(request: Request) {
  try {
    await requireAdminSession();
    const payload = await request.json();
    const parsed = seoSettingsSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    await saveSeoRecords(parsed.data.records);
    revalidatePath("/admin/content/seo");
    revalidatePath("/", "layout");
    revalidatePath("/mn", "layout");
    revalidatePath("/en", "layout");
    revalidatePath("/mn/about");
    revalidatePath("/en/about");
    revalidatePath("/mn/contact");
    revalidatePath("/en/contact");
    revalidatePath("/mn/products");
    revalidatePath("/en/products");
    revalidatePath("/mn/news");
    revalidatePath("/en/news");

    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
