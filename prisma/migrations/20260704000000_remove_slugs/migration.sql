-- DropIndex
DROP INDEX IF EXISTS "ProductCategory_slug_key";
DROP INDEX IF EXISTS "Product_slug_key";
DROP INDEX IF EXISTS "NewsCategory_slug_key";
DROP INDEX IF EXISTS "Article_slug_key";

-- AlterTable
ALTER TABLE "ProductCategory" DROP COLUMN IF EXISTS "slug";
ALTER TABLE "Product" DROP COLUMN IF EXISTS "slug";
ALTER TABLE "NewsCategory" DROP COLUMN IF EXISTS "slug";
ALTER TABLE "Article" DROP COLUMN IF EXISTS "slug";
