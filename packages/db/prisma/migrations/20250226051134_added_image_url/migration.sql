/*
  Warnings:

  - You are about to drop the column `prompts` on the `OutputImages` table. All the data in the column will be lost.
  - Added the required column `prompt` to the `OutputImages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OutputImages" DROP COLUMN "prompts",
ADD COLUMN     "prompt" TEXT NOT NULL;
