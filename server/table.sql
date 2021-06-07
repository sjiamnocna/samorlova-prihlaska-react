CREATE TABLE IF NOT EXISTS `sam_prihlasky`(
    `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `year` smallint(5) unsigned NOT NULL DEFAULT 2021,
    `appdate` datetime NOT NULL DEFAULT current_timestamp(),
    `status` enum('new','confirmed','paid') COLLATE utf8_czech_ci NOT NULL DEFAULT 'new',
    `name` varchar(16) COLLATE utf8_czech_ci NOT NULL,
    `sname` varchar(16) COLLATE utf8_czech_ci NOT NULL,
    `byear` smallint(5) unsigned NOT NULL,
    `email` varchar(64) COLLATE utf8_czech_ci NOT NULL,
    `address` varchar(128) COLLATE utf8_czech_ci NOT NULL,
    `accomodation` tinyint(1) DEFAULT NULL,
    `vegetarian` tinyint(1) DEFAULT NULL,
    `appdetail` varchar(64) COLLATE utf8_czech_ci NOT NULL,
    `donation` smallint(5) unsigned DEFAULT NULL,
    `note` varchar(256) COLLATE utf8_czech_ci DEFAULT NULL,
    `price` float unsigned NOT NULL,
    PRIMARY KEY (`ID`),
    UNIQUE KEY `year` (`year`,`email`,`name`,`sname`),
    INDEX `appstate` (`year`,`status`),
    INDEX `mail` (`year`,`email`),
    INDEX `name` (`name`),
    INDEX `sname` (`sname`)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_czech_ci;