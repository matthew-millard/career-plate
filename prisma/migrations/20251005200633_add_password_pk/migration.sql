-- AlterTable
ALTER TABLE "public"."Password" ADD CONSTRAINT "Password_pkey" PRIMARY KEY ("userId");

-- DropIndex
DROP INDEX "public"."Password_userId_key";
