-- -------------------------------------------------------------
-- TablePlus 4.6.0(406)
--
-- https://tableplus.com/
--
-- Database: tipsters_app
-- Generation Time: 2022-03-14 21:44:15.6990
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `taxonomies`;
CREATE TABLE `taxonomies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  `position` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `code` (`code`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `user_deports`;
CREATE TABLE `user_deports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `taxonomyId` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

INSERT INTO `taxonomies` (`id`, `group`, `type`, `name`, `code`, `slug`, `description`, `active`, `position`, `createdAt`, `updatedAt`) VALUES
(1, 'system', 'platform', 'gestor', 'gestor', 'gestor', NULL, 1, 1, '2022-03-13 22:04:44', '2022-03-13 22:04:44'),
(2, 'system', 'platform', 'app', 'app', 'app', NULL, 1, 2, '2022-03-13 22:04:44', '2022-03-13 22:04:44'),
(3, 'system', 'role', 'Usuario', 'system-role-default-user', 'system-role-default-user', NULL, 1, 1, '2022-03-13 22:06:05', '2022-03-13 22:06:05'),
(4, 'system', 'role', 'Tipster', 'system-role-tipster-user', 'system-role-tipster-user', NULL, 1, 2, '2022-03-13 22:06:05', '2022-03-13 22:06:05'),
(5, 'tags', 'deport', 'Futbol', 'futbol', 'futbol', '', 1, 1, '2022-03-14 06:37:36', '2022-03-14 06:37:36'),
(6, 'tags', 'deport', 'Basquet', 'basquet', 'basquet', '', 1, 2, '2022-03-14 06:41:56', '2022-03-14 06:41:56');

INSERT INTO `user_deports` (`id`, `userId`, `taxonomyId`, `createdAt`, `updatedAt`) VALUES
(2, 1, 6, NULL, NULL),
(3, 1, 5, NULL, NULL);

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role_id`, `createdAt`, `updatedAt`) VALUES
(1, 'test1', 'test1@gmail.com', '$2a$10$S9C2nm.4oBtU9umi7k2emedXbKJ.etYBpn6/ZgQskpaYCyAFbtTA6', 4, '2022-03-14 07:01:57', '2022-03-14 07:01:57');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;