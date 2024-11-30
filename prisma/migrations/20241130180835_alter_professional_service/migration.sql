/*
  Warnings:

  - You are about to alter the column `price` on the `professional_services` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "professional_services" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;
