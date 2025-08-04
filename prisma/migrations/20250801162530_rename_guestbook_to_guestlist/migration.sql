/*
  Warnings:

  - You are about to drop the `GuestBook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."GuestBook";

-- CreateTable
CREATE TABLE "public"."GuestList" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuestList_pkey" PRIMARY KEY ("id")
);
