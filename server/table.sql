CREATE TABLE IF NOT EXISTS `sam_prihlasky_2`(
    `ID` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `year` SMALLINT(5) UNSIGNED NOT NULL DEFAULT 2021,
    `appdate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    `status` ENUM('new', 'confirmed', 'paid') NOT NULL DEFAULT 'new',
    `name` VARCHAR(16) CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL,
    `sname` VARCHAR(16) CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL,
    `byear` SMALLINT(5) UNSIGNED NOT NULL,
    `email` VARCHAR(128) CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL,
    `address` VARCHAR(128) CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL,
    `accomodation` TINYINT(1) DEFAULT NULL,
    `appprogram` VARCHAR(64) CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL,
    `appfood` VARCHAR(64) CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL,
    `donation` SMALLINT(5) UNSIGNED DEFAULT NULL,
    `note` VARCHAR(256) CHARACTER SET utf8 COLLATE utf8_czech_ci DEFAULT NULL,
    `foodrestrict` VARCHAR(256) CHARACTER SET utf8 COLLATE utf8_czech_ci DEFAULT NULL,
    `price` float UNSIGNED NOT NULL,
    PRIMARY KEY (`ID`),
    UNIQUE KEY `names` (`year`, `email`, `name`, `sname`),
    UNIQUE KEY `full` (`year`, `email`, `name`, `sname`),
    INDEX `appstate` (`year`, `status`),
    INDEX `mail` (`year`, `email`),
    INDEX `name` (`name`),
    INDEX `sname` (`sname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
