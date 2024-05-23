-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : dim. 21 avr. 2024 à 17:18
-- Version du serveur : 8.0.30
-- Version de PHP : 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `node.js`
--

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `pseudo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `pseudo`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'Taylor Swift', 'taylor-swift-official@gmail.com', '326798A', '2024-04-20 11:52:57.000', '2024-04-20 11:52:57.000'),
(2, 'Theo', 'theo.christodoux@gmail.com', '$2b$10$p1DpjLNnqrPQhUt.UCqASunC9HiMm1f.m3oHWjmKO2JToHdTzhqZK', '2024-04-20 12:00:01.626', '2024-04-20 12:00:01.626'),
(3, 'Host', 'host.chris@gmail.com', '$2b$10$8VLLaaD0b03OpkVz.hGgA.vl4JM0nq.3Ws3sX3UfbpxJ2HMMTRyua', '2024-04-20 12:17:00.853', '2024-04-20 12:17:00.853'),
(4, 'Mad', 'mad.chris@gmail.com', '$2b$10$V5yCRyMEUeZYEjEXJUBBpucALNamDMabRzMaxzevhsCc/t4799asq', '2024-04-20 16:38:18.292', '2024-04-20 16:38:18.292'),
(5, 'John', 'john.marks@gmail.com', '$2b$10$qkE/e1lvAgRMnNDmY0Qggu.IWOmAK1UaD/ON8bJGSCP0c/oi/mdXq', '2024-04-20 18:21:43.808', '2024-04-20 18:21:43.808'),
(6, 'Jake', 'jake.collins@gmail.com', '$2b$10$mXlnP.PrrDccT9J2gjY92eFnVh9fYXuY1QHAIGYIsM43v2P6gJnSy', '2024-04-21 11:41:47.549', '2024-04-21 11:41:47.549'),
(7, 'Bill', 'bill.collins@gmail.com', '$2b$10$xbQ/Bp6ErKMh0MjR5RNRG.RuVNszkg9eOpjLoc2PqWYVZOx/kb5q6', '2024-04-21 11:45:31.948', '2024-04-21 11:45:31.948'),
(9, 'Marko', 'Marko@gmail.com', '$2b$10$oWRF6ogMoFeIGaHVi4qqyeDvBddq9bAg8JEAtp.98pp4Pb8XElYqu', '2024-04-21 12:15:33.201', '2024-04-21 12:15:33.201');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
