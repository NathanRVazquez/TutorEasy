/*
  Warnings:

  - Added the required column `topic` to the `SessionInsights` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SessionInsights" ADD COLUMN     "topic" TEXT NOT NULL;
