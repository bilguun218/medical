const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

(async function() {
  const db = new PrismaClient();
  try {
    const productId = process.argv[2];
    if (!productId) {
      console.error('Usage: node scripts/attach_image_to_product.js <product-id>');
      process.exit(1);
    }

    const src = path.join(process.cwd(), 'public', 'brand', 'novytas-logo.png');
    if (!fs.existsSync(src)) {
      console.error('Source image not found:', src);
      process.exit(1);
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    fs.mkdirSync(uploadsDir, { recursive: true });

    const fileName = `${Date.now()}-novytas-logo.png`;
    const dest = path.join(uploadsDir, fileName);
    fs.copyFileSync(src, dest);
    const stat = fs.statSync(dest);

    const product = await db.product.findUnique({ where: { id: productId } });
    if (!product) {
      console.error('Product not found for id', productId);
      process.exit(1);
    }

    const media = await db.media.create({
      data: {
        type: 'IMAGE',
        url: `/uploads/${fileName}`,
        filename: fileName,
        altMn: product.titleMn,
        altEn: product.titleEn || product.titleMn,
        mimeType: 'image/png',
        size: stat.size
      }
    });

    await db.productMedia.create({
      data: {
        productId: product.id,
        mediaId: media.id,
        role: 'GALLERY',
        sortOrder: 0
      }
    });

    console.log('Attached image', media.url, 'to product', productId);
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    await db.$disconnect().catch(()=>{});
    process.exit(0);
  }
})();
