import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { apiError, requireAdminSession } from "@/lib/admin";
import { cmsSchemas, saveCmsContent, type CmsKey } from "@/lib/cms";

const keys = Object.keys(cmsSchemas) as CmsKey[];

function revalidateContent(key: CmsKey) {
  revalidatePath("/admin/content");
  revalidatePath(`/admin/content/${key}`);
  revalidatePath("/", "layout");
  revalidatePath("/mn", "layout");
  revalidatePath("/en", "layout");
  revalidatePath("/mn/about");
  revalidatePath("/en/about");
  revalidatePath("/mn/contact");
  revalidatePath("/en/contact");
}

export async function PATCH(request: Request, { params }: { params: Promise<{ key: string }> }) {
  try {
    await requireAdminSession();
    const { key: rawKey } = await params;

    if (!keys.includes(rawKey as CmsKey)) {
      return NextResponse.json({ error: "Unknown content section." }, { status: 404 });
    }

    const key = rawKey as CmsKey;
    const payload = await request.json();
    const parsed = cmsSchemas[key].safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    await saveCmsContent(key, parsed.data as never);
    revalidateContent(key);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
