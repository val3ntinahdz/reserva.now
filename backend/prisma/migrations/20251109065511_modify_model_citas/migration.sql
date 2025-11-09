/*
  Warnings:

  - You are about to drop the column `debitAmount` on the `Cita` table. All the data in the column will be lost.
  - You are about to drop the column `incomingPaymentId` on the `Cita` table. All the data in the column will be lost.
  - You are about to drop the column `quoteId` on the `Cita` table. All the data in the column will be lost.
  - You are about to drop the column `receiveAmount` on the `Cita` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cita" DROP COLUMN "debitAmount",
DROP COLUMN "incomingPaymentId",
DROP COLUMN "quoteId",
DROP COLUMN "receiveAmount";
