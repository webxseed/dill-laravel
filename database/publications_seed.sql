-- MySQL dump 10.13  Distrib 9.6.0, for macos15.7 (arm64)
--
-- Host: localhost    Database: dill
-- ------------------------------------------------------
-- Server version	9.6.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `publications`
--

DROP TABLE IF EXISTS `publications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `citation` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publications`
--

LOCK TABLES `publications` WRITE;
/*!40000 ALTER TABLE `publications` DISABLE KEYS */;
INSERT INTO `publications` VALUES (1,'H. Bishara, S. Lee, T. Brink, M. Ghidelli, G. Dehm: Understanding grain boundary electrical resistivity in Cu: the effect of boundary structure. ACS Nano 15 (10), 16607–16615 (2021).',1,'2026-03-17 11:42:57','2026-03-17 11:42:57'),(2,'H. Bishara, M. Ghidelli, G. Dehm: Approaches to measure the resistivity of grain boundaries in metals with high sensitivity and spatial resolution: a case study employing Cu. ACS Applied Electronic Materials 2 (7), 2049-2056 (2020).',2,'2026-03-17 11:42:57','2026-03-17 11:42:57'),(3,'T. Luo, F. Serrano-Sánchez, H. Bishara, S. Zhang, R. Bueno Villoro, J.J. Kuo, C. Felser, C. Scheu, G. J. Snyder, J. P. Best, G. Dehm, Y. Yu, D. Raabe, C. Fu, B. Gault: Dopant-segregation to grain boundaries controls electrical conductivity of n-type NbCo (Pt) Sn half-Heusler alloy mediating thermoelectric performance. Acta Materialia, 117147 (2021).',3,'2026-03-17 11:42:57','2026-03-17 11:42:57'),(4,'H. Bishara, H. Tsybenko, S. Nandy, Q.K. Muhammad, T. Frömling, X. Fang, J.P. Best, G. Dehm: Dislocation-enhanced electrical conductivity in rutile TiO2 accessed by nano-mechanical doping. Scripta Materialia, 212, 114543 (2022).',4,'2026-03-17 11:42:57','2026-03-17 11:42:57');
/*!40000 ALTER TABLE `publications` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-17 15:43:00
