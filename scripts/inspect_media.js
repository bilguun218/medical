const { PrismaClient } = require('@prisma/client');
(async function () {
  const db = new PrismaClient();
  try {
    const media = await db.media.findMany({ orderBy: { createdAt: 'desc' } });
    const pm = await db.productMedia.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => []);
    const products = await db.product.findMany({ include: { media: { include: { media: true } } }, orderBy: { createdAt: 'desc' }, take: 10 });

    console.log('MEDIA', JSON.stringify(media, null, 2));
    console.log('\nPRODUCT_MEDIA', JSON.stringify(pm, null, 2));
    console.log('\nPRODUCTS (with media include)', JSON.stringify(products.map(p => ({ id: p.id, titleMn: p.titleMn, media: p.media.map(m => ({ id: m.id, mediaId: m.mediaId, role: m.role, media: m.media ? { id: m.media.id, url: m.media.url, filename: m.media.filename } : null })) })), null, 2));
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    await (new PrismaClient()).$disconnect().catch(()=>{});
    process.exit(0);
  }
})();
