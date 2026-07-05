import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { apiError, requireAdminSession } from "@/lib/admin";
import { db } from "@/lib/db";
import { saveMediaUpload } from "@/lib/media";

export async function GET() {
  try {
    await requireAdminSession();
    const media = await db.media.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(media);
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const media = await saveMediaUpload(file, {
      altMn: formData.get("altMn")?.toString(),
      altEn: formData.get("altEn")?.toString()
    });

    revalidatePath("/admin/media");
    return NextResponse.json(media, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
