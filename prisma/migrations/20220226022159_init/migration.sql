/*
  Warnings:

  - Added the required column `role` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customer` ADD COLUMN `role` ENUM('CUSTOMER', 'DEALER') NOT NULL;
