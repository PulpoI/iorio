-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 29, 2023 at 09:41 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `iorio`
--

-- --------------------------------------------------------

--
-- Table structure for table `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `descripcion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `categoria`
--

INSERT INTO `categoria` (`id`, `nombre`, `descripcion`) VALUES
(1, 'Videos', 'Videos de Ricardo Iorio'),
(2, 'Tatuajes', 'Tatuajes referidos a Ricardo Iorio'),
(3, 'Anecdotas', 'Sobre RIcarduti'),
(4, 'Anecdotas', 'Sobre RIcarduti'),
(5, 'Anecdotas', 'Sobre RIcarduti'),
(6, 'Anecdotas', 'Sobre RIcarduti'),
(7, 'Anecdotas', 'Sobre RIcarduti');

-- --------------------------------------------------------

--
-- Table structure for table `contenido_subido`
--

CREATE TABLE `contenido_subido` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `categoria_id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `tipo_contenido` enum('fotografia','video','texto','audio') NOT NULL,
  `enlace` varchar(255) NOT NULL,
  `estado` enum('pendiente','aprobado','rechazado') NOT NULL DEFAULT 'pendiente',
  `fecha_subida` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `correo` varchar(30) NOT NULL,
  `contraseña` varchar(106) NOT NULL,
  `foto_perfil` varchar(255) NOT NULL,
  `es_admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `correo`, `contraseña`, `foto_perfil`, `es_admin`) VALUES
(1, 'adm-pablo', 'pablod.dev@gmail.com', '97f4bcfdb420fb3e5747b1db2ef46158', '', 1),
(2, 'Usuario de prueba', 'user@gmail.com', '25d55ad283aa400af464c76d713c07ad', '', 0),
(4, 'Ricardrda', 'richarsadasdasdd@gmail.com', '12345678', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `usuario_token`
--

CREATE TABLE `usuario_token` (
  `id` int(11) NOT NULL,
  `usuario_id` int(45) DEFAULT NULL,
  `token` varchar(45) DEFAULT NULL,
  `estado` varchar(45) CHARACTER SET armscii8 COLLATE armscii8_bin DEFAULT NULL,
  `fecha` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `usuario_token`
--

INSERT INTO `usuario_token` (`id`, `usuario_id`, `token`, `estado`, `fecha`) VALUES
(1, 1, '255d919cf002ebb950135cbb4c0bc186', 'Active', '2023-10-28 00:46:00'),
(2, 1, '2ab793849bfb910ead0f0eecc0b423bc', 'Active', '2023-10-28 00:46:00'),
(3, 1, '3825823a7ac358ad6095716d63ee87a1', 'Active', '2023-10-28 00:46:00'),
(4, 1, '5c6d9a2dae5da4e55e1d22b6bee60a1e', 'Active', '2023-10-28 00:46:00'),
(5, 1, 'b3566204ada9038b6c0308963c48fd5b', 'Active', '2023-10-28 00:46:00'),
(6, 1, 'a1d4eb80755caf27a2d266f5e28fbf12', 'Active', '2023-10-28 00:46:00'),
(7, 1, 'aab2bb04057694de86476e8d52502e03', 'Activo', '2023-10-28 01:56:00'),
(8, 2, '114271e17dcc61b0cd4fad6ae6d30194', 'Activo', '2023-10-29 21:18:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contenido_subido`
--
ALTER TABLE `contenido_subido`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contenido_fk_usuario` (`usuario_id`),
  ADD KEY `contenido_fk_categoria` (`categoria_id`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuario_token`
--
ALTER TABLE `usuario_token`
  ADD PRIMARY KEY (`id`),
  ADD KEY `token_fk_usuario` (`usuario_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `contenido_subido`
--
ALTER TABLE `contenido_subido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `usuario_token`
--
ALTER TABLE `usuario_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contenido_subido`
--
ALTER TABLE `contenido_subido`
  ADD CONSTRAINT `contenido_fk_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contenido_fk_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `usuario_token`
--
ALTER TABLE `usuario_token`
  ADD CONSTRAINT `token_fk_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario_token` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
