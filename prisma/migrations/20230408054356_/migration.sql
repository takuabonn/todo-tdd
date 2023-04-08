-- AlterTable
ALTER TABLE `todos` ADD COLUMN `created_at` DATETIME(3) NULL,
    ADD COLUMN `is_completed` BOOLEAN NOT NULL DEFAULT false;
