-- CreateTable
CREATE TABLE "td_board" (
    "id" SERIAL NOT NULL,
    "boardType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "images" JSONB,
    "files" JSONB,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "td_board_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "td_board_boardType_isActive_idx" ON "td_board"("boardType", "isActive");
