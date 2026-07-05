import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { productCategories } from "@/content/novytas";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME ?? "NOVYTAS Admin";

  if (!email || !password || password === "replace-this-password") {
    throw new Error("Set ADMIN_EMAIL and a strong ADMIN_PASSWORD before seeding.");
  }

  await prisma.user.upsert({
    where: { email },
    update: { name, role: "SUPER_ADMIN" },
    create: {
      email,
      name,
      role: "SUPER_ADMIN",
      passwordHash: await bcrypt.hash(password, 12)
    }
  });

  for (const category of productCategories) {
    const existingCategory = await prisma.productCategory.findFirst({
      where: { titleMn: category.title.mn }
    });

    if (existingCategory) {
      await prisma.productCategory.update({
        where: { id: existingCategory.id },
        data: {
          titleMn: category.title.mn,
          titleEn: category.title.en,
          descriptionMn: category.description.mn,
          descriptionEn: category.description.en,
          sortOrder: category.sortOrder
        }
      });
    } else {
      await prisma.productCategory.create({
        data: {
          titleMn: category.title.mn,
          titleEn: category.title.en,
          descriptionMn: category.description.mn,
          descriptionEn: category.description.en,
          sortOrder: category.sortOrder
        }
      });
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
