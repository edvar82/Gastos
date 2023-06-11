/*
  Warnings:

  - Added the required column `data` to the `Contas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contas" ADD COLUMN     "data" TIMESTAMP(3) NOT NULL;
