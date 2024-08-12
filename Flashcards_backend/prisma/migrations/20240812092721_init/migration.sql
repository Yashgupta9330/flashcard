/*
  Warnings:

  - You are about to drop the column `category` on the `flashcard` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `flashcard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `flashcard` DROP COLUMN `category`,
    DROP COLUMN `level`;
