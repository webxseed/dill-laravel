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
-- Table structure for table `site_configs`
--

DROP TABLE IF EXISTS `site_configs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `site_configs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `site_configs_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_configs`
--

LOCK TABLES `site_configs` WRITE;
/*!40000 ALTER TABLE `site_configs` DISABLE KEYS */;
INSERT INTO `site_configs` VALUES (1,'home_hero_subtitle','Tel Aviv University','2026-03-17 11:59:10','2026-03-17 11:59:10'),(2,'home_hero_title','Defects and Internal Interfaces Lab','2026-03-17 11:59:10','2026-03-17 11:59:10'),(3,'home_hero_description','Investigating the local electrical properties of individual defects and internal interface segments with respect to their microstructure.','2026-03-17 11:59:10','2026-03-17 11:59:10'),(4,'home_about_label','About the Lab','2026-03-17 11:59:10','2026-03-17 11:59:10'),(5,'home_about_title','Advancing Materials Science','2026-03-17 11:59:10','2026-03-17 11:59:10'),(6,'home_about_description','The Defects and Internal Interfaces Lab (DIIL) studies local electron transport properties across microstructural defects in alloys and across interfaces between metallic materials.','2026-03-17 11:59:10','2026-03-17 11:59:10'),(7,'home_team_label','Our Team','2026-03-17 11:59:10','2026-03-17 11:59:10'),(8,'home_team_title','People of DIIL','2026-03-17 11:59:10','2026-03-17 11:59:10'),(9,'home_team_description','A multidisciplinary team dedicated to advancing our understanding of defects and interfaces.','2026-03-17 11:59:10','2026-03-17 11:59:10'),(10,'home_news_label','Updates','2026-03-17 11:59:10','2026-03-17 11:59:10'),(11,'home_news_title','News & Announcements','2026-03-17 11:59:10','2026-03-17 11:59:10'),(12,'home_cta_title','Interested in Collaborating?','2026-03-17 11:59:10','2026-03-17 11:59:10'),(13,'home_cta_description','DIIL welcomes excellent PhD candidates, postdocs, and collaborators. Get in touch to explore opportunities.','2026-03-17 11:59:10','2026-03-17 11:59:10');
/*!40000 ALTER TABLE `site_configs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-17 16:06:37
