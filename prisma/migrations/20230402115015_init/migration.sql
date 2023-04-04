/*
  Warnings:

  - You are about to drop the column `name` on the `todos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `todos` DROP COLUMN `name`,
    ADD COLUMN `task` VARCHAR(191) NULL;
