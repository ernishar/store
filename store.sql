-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 12, 2024 at 06:24 AM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `store`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `categoryId` smallint NOT NULL AUTO_INCREMENT,
  `categoryName` text COLLATE utf8mb4_general_ci NOT NULL,
  `createdBy` smallint NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`categoryId`, `categoryName`, `createdBy`, `createdAt`) VALUES
(1, 'Mobile Phone', 19, '2024-04-12 04:04:59'),
(2, 'Laptop', 19, '2024-04-12 04:05:44'),
(3, 'Television', 19, '2024-04-12 04:05:53'),
(4, 'Books', 19, '2024-04-12 04:06:05'),
(5, 'Mobile Accessories', 19, '2024-04-12 06:01:42');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `productId` smallint NOT NULL AUTO_INCREMENT,
  `productName` text COLLATE utf8mb4_general_ci NOT NULL,
  `productDesc` text COLLATE utf8mb4_general_ci NOT NULL,
  `productPrice` int NOT NULL,
  `categoryId` smallint NOT NULL,
  `createdBy` int NOT NULL,
  `productImages` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`productId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productId`, `productName`, `productDesc`, `productPrice`, `categoryId`, `createdBy`, `productImages`) VALUES
(1, 'Iphone 15', 'The iPhone 15 and iPhone 15 Plus are smartphones designed, developed, and marketed by Apple Inc. ', 669999, 1, 19, '[\"963b112326de29ae-apple-iphone-15-1.jpg\",\"1c4501a043cf6ff2-gsmarena_005.jpg\",\"99f478b6bd3e7da7-apple-iphone-15-4.jpg\"]'),
(2, 'MSI Laptop Modern 14', 'World-leading gaming laptop brand - MSI, offers unrivaled gaming experience: from thin & light to top performance, and RGB lighting!', 50000, 2, 19, '[\"89d9e0408d12c74c-Laptop3.jpg\",\"81eb077260eb9e7b-Laptop2.jpg\",\"83a6f821178be1e6-Laptop1.jpg\"]'),
(3, 'Samsung LED', 'SAMSUNG 32-inch Class LED Smart FHD TV 1080P (UN32N5300AFXZA, 2018 Model), Black', 25000, 3, 19, '[\"810f226edb27e529-LED3.jpg\",\"633dfe060d6f7313-LED2.jpg\",\"3fbdd22376ec3959-LED 1.jpg\"]');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `roleId` tinyint NOT NULL AUTO_INCREMENT,
  `roleName` tinytext COLLATE utf8mb4_general_ci NOT NULL,
  `userId` smallint NOT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`, `userId`) VALUES
(1, 'user', 19),
(2, 'user', 20),
(3, 'user', 21),
(4, 'user', 22);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `userId` smallint NOT NULL AUTO_INCREMENT,
  `firstName` tinytext COLLATE utf8mb4_general_ci NOT NULL,
  `lastName` tinytext COLLATE utf8mb4_general_ci NOT NULL,
  `email` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` text COLLATE utf8mb4_general_ci NOT NULL,
  `gender` enum('Male','Female') COLLATE utf8mb4_general_ci NOT NULL,
  `hobbies` tinytext COLLATE utf8mb4_general_ci NOT NULL,
  `roleName` tinytext COLLATE utf8mb4_general_ci NOT NULL,
  `profilePic` text COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `gender`, `hobbies`, `roleName`, `profilePic`, `createdAt`) VALUES
(19, 'Nishar', 'Alam', 'nishar@gmail.com', '$2b$10$kFkataqWQKwIIex7Oz9AuOay2S3APdAv3rlA1/iWIYUXxmF.PxRPi', 'Male', 'coding, Cricket', 'user', 'e5b55b44cb766a19-nishar.png', '2024-04-12 03:57:08'),
(21, 'Nishar', 'Alam', 'nisharalam@gmail.com', '$2b$10$CNZMttwWvrPbjp68DR5lkeePCO9TLa9zHtzQ0SLmbiOH/LOe79gvm', 'Male', 'Cricket, Coding', 'user', 'null', '2024-04-12 04:38:18'),
(22, 'Nishar', 'Alam', 'nalam.netclues@gmail.com', '$2b$10$11IgMMMp3ZZiD.eHhOfxYuJvLHFxWvTozh1fvQWOSugI92EswMz3e', 'Male', 'Cricket, Coding', 'user', '3beafcf48fc2ee01-1711689385685-img.png', '2024-04-12 04:46:33');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
