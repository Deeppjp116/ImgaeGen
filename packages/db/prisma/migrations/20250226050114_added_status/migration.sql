/*
  Warnings:

  - Added the required column `prompts` to the `OutputImages` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PromptStatusEnum" AS ENUM ('Pending', 'Success', 'Failed');

-- AlterTable
ALTER TABLE "OutputImages" ADD COLUMN     "prompts" TEXT NOT NULL,
ADD COLUMN     "status" "PromptStatusEnum" NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE "PackPrompts" ADD COLUMN     "outputImagesId" TEXT;

-- AddForeignKey
ALTER TABLE "PackPrompts" ADD CONSTRAINT "PackPrompts_outputImagesId_fkey" FOREIGN KEY ("outputImagesId") REFERENCES "OutputImages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
