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
-- Table structure for table `pages`
--

DROP TABLE IF EXISTS `pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pages` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `meta_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pages_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
INSERT INTO `pages` VALUES (1,'home','Home',NULL,'DIIL - Defects and Internal Interfaces Lab','Defects and Internal Interfaces Lab - Tel Aviv University',NULL,1,'2026-03-17 11:15:52','2026-03-17 11:15:52'),(2,'people','People',NULL,'Our Team - DIIL','Meet the team at the Defects and Internal Interfaces Lab',NULL,1,'2026-03-17 11:15:52','2026-03-17 11:15:52'),(3,'research','Research','<p><strong>DIIL</strong> studies local electron transport properties across microstructural defects in alloys and across internal interfaces between alloys.</p>\n\n<p class=\"font-medium\">The research strategy is:</p>\n\n<ul>\n  <li>In DIIL we grow bulk and thin film materials in a well-controlled manner to tune defects\' structures.</li>\n  <li>In DIIL we structurally characterize the defects.</li>\n  <li>In DIIL we study the local electrical and mechanical properties of individual defects and internal interfaces\' segments.</li>\n  <li>In DIIL we continuously develop the methodologies for local electrical characterization.</li>\n  <li>In DIIL we develop novel defect-design concepts.</li>\n</ul>\n\n<h2>Research Workflow</h2>\n\n<p>The research workflow consists of three main stages: Defect Preparation (Thin films · Bulk), Defect Characterization (Structural · Electrical · Mechanical), and Optimization (Materials & Interfaces).</p>','Research - DIIL','Our research focuses on electron transport properties across microstructural defects',NULL,1,'2026-03-17 11:15:52','2026-03-17 11:52:02'),(4,'projects','Projects',NULL,'Projects - DIIL','Current and previous research projects at DIIL',NULL,1,'2026-03-17 11:15:52','2026-03-17 11:15:52'),(5,'facilities','Facilities',NULL,'Facilities - DIIL','Lab equipment and instruments at DIIL',NULL,1,'2026-03-17 11:15:52','2026-03-17 11:15:52'),(6,'contact','Contact',NULL,'Contact - DIIL','Get in touch with the Defects and Internal Interfaces Lab',NULL,1,'2026-03-17 11:15:52','2026-03-17 11:15:52');
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-17 15:52:08
