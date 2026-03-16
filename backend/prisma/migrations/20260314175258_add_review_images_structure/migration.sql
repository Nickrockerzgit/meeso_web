-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_detail` TEXT NOT NULL,
    `price` DOUBLE NOT NULL,
    `old_price` DOUBLE NULL DEFAULT 0,
    `rating` DOUBLE NULL DEFAULT 0,
    `total_ratings` INTEGER NULL DEFAULT 0,
    `total_reviews` INTEGER NULL DEFAULT 0,
    `shop_name` VARCHAR(191) NOT NULL,
    `shop_followers` INTEGER NULL DEFAULT 0,
    `shop_total_products` INTEGER NULL DEFAULT 0,
    `shop_rating` DOUBLE NULL DEFAULT 0,
    `shop_total_ratings` INTEGER NULL DEFAULT 0,
    `highlights` JSON NULL,
    `image_url_1` VARCHAR(191) NULL,
    `image_url_2` VARCHAR(191) NULL,
    `image_url_3` VARCHAR(191) NULL,
    `image_url_4` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductReview` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `rating` DECIMAL(3, 1) NOT NULL,
    `comment` TEXT NULL,
    `reviewerName` VARCHAR(100) NULL,
    `helpful` INTEGER NOT NULL DEFAULT 0,
    `reviewImageUrl` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `ProductReview_productId_idx`(`productId`),
    INDEX `ProductReview_rating_idx`(`rating`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AppSetting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `setting_key` VARCHAR(191) NOT NULL,
    `setting_value` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AppSetting_setting_key_key`(`setting_key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserCard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_no` VARCHAR(191) NOT NULL,
    `card_no` VARCHAR(191) NOT NULL,
    `exp_month` VARCHAR(191) NOT NULL,
    `exp_year` VARCHAR(191) NOT NULL,
    `cvv` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductReview` ADD CONSTRAINT `ProductReview_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
