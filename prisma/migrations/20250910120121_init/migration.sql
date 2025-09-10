-- CreateTable
CREATE TABLE "td_post" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content_type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "featured_image" JSONB,
    "images" JSONB,
    "files" JSONB,
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_important" BOOLEAN NOT NULL DEFAULT false,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "td_post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "td_partner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logo_image" JSONB NOT NULL,
    "link" TEXT,
    "description" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "td_partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "td_admin_account" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "td_admin_account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "td_member" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "photo_url" TEXT,
    "bio" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "td_member_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "td_post_slug_key" ON "td_post"("slug");

-- CreateIndex
CREATE INDEX "td_post_category_is_active_idx" ON "td_post"("category", "is_active");

-- CreateIndex
CREATE INDEX "td_post_content_type_is_active_idx" ON "td_post"("content_type", "is_active");

-- CreateIndex
CREATE INDEX "td_partner_is_active_sort_order_idx" ON "td_partner"("is_active", "sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "td_admin_account_user_id_key" ON "td_admin_account"("user_id");

-- CreateIndex
CREATE INDEX "td_member_is_active_sort_order_idx" ON "td_member"("is_active", "sort_order");
