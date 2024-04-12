-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 10, 2024 at 05:34 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

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

CREATE TABLE `categories` (
  `categoryId` smallint(5) NOT NULL,
  `categoryName` text NOT NULL,
  `createdBy` smallint(5) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`categoryId`, `categoryName`, `createdBy`, `createdAt`) VALUES
(1, 'Gaming', 15, '2024-04-10 12:03:15'),
(2, 'Medical', 16, '2024-04-10 12:03:52'),
(3, 'Laptop', 15, '2024-04-10 12:45:01'),
(4, 'TV', 15, '2024-04-06 07:33:59'),
(5, 'Smartphone', 15, '2024-04-06 10:59:45'),
(6, 'Earbuds', 15, '2024-04-06 12:45:35'),
(7, 'Appliances', 15, '2024-04-06 14:38:16');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productId` smallint(5) NOT NULL,
  `productName` text NOT NULL,
  `productDesc` text NOT NULL,
  `productPrice` int(15) NOT NULL,
  `categoryId` smallint(5) NOT NULL,
  `createdBy` int(5) NOT NULL,
  `productImages` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productId`, `productName`, `productDesc`, `productPrice`, `categoryId`, `createdBy`, `productImages`) VALUES
(11, 'AirPods Pro (2nd generation)', 'Custom high-excursion Apple driver\r\nCustom high dynamic range amplifier\r\nAdaptive Audio1\r\nActive Noise Cancellation\r\nTransparency mode\r\nConversation Awareness1\r\nPersonalised Volume1\r\nLoud Noise Reduction\r\nVent system for pressure equalisation\r\nPersonalised Spatial Audio with dynamic head tracking2\r\nAdaptive EQ', 24990, 1, 15, '[\"e6360a125298e584-airpods pro.jpeg\",\"63457c6f57ea3e28-airpods__ea3kvnhxv96q_large.jpg\"]'),
(12, 'MacBook Pro', 'Apple M3 chip with 8-core CPU, 10-core GPU, 16-core Neural Engine\r\n8GB unified memory\r\n512GB SSD storage\r\n35.97 cm (14.2\") Liquid Retina XDR display²\r\n70W USB-C Power Adapter\r\nTwo Thunderbolt / USB 4 ports, HDMI port, SDXC card slot, headphone jack, MagSafe 3 port\r\nBacklit Magic Keyboard with Touch ID - US English', 180000, 3, 15, '[\"849a637c7937ea2c-mbp14-spacegray-gallery2-202310.jpeg\"]'),
(13, 'iPhone 15 Pro', 'Apple iPhone 15 Pro mobile was launched on 12th September 2023. The phone comes with a 120 Hz refresh rate 6.10-inch touchscreen display offering a resolution of 1179x2556 pixels at a pixel density of 460 pixels per inch (ppi). Apple iPhone 15 Pro is powered by a hexa-core Apple A17 Pro processor. It comes with 8GB of RAM. The Apple iPhone 15 Pro supports wireless charging.', 134900, 5, 15, '[\"ac4ca9373341bf03-iphone-15-pro-finish-select-202309-6-1inch_AV1.jpeg\",\"ed373598efe6eec6-iphone-15-pro-finish-select-202309-6-1inch_AV2_GEO_EMEA.jpeg\"]');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` tinyint(2) NOT NULL,
  `roleName` tinytext NOT NULL,
  `userId` smallint(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`, `userId`) VALUES
(12, 'user', 15),
(13, 'admin', 16),
(14, 'user', 17),
(15, 'user', 18),
(16, 'user', 19),
(17, 'user', 20),
(18, 'user', 21);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` smallint(5) NOT NULL,
  `firstName` tinytext NOT NULL,
  `lastName` tinytext NOT NULL,
  `email` tinytext NOT NULL,
  `password` text NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `hobbies` tinytext NOT NULL,
  `roleName` tinytext NOT NULL,
  `profilePic` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `gender`, `hobbies`, `roleName`, `profilePic`, `createdAt`) VALUES
(15, 'Pankaj', 'Kumar', 'pk@gmail.com', '$2b$10$55rC/0vt7jKhAU587fi3D.gJsGVYIDDzginsmvkJk0hpa9fTEYL9e', 'Male', 'Coding, Cricket, Gaming', 'user', '9b30a0ddeb804c2c-372497217777264 (1).png', '2024-04-10 11:19:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `email` (`email`) USING HASH;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `categoryId` smallint(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productId` smallint(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` tinyint(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` smallint(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
