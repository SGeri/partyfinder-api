-- CreateTable
CREATE TABLE `Party` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `organizer` VARCHAR(255) NOT NULL,
    `locationDisplay` VARCHAR(255) NOT NULL,
    `locationCoords` VARCHAR(255) NOT NULL,
    `date` DATETIME NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `link` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
