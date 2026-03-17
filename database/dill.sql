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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'cce9ab8c-c595-11f0-a547-f00a60c4b643:1-8213';

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_items`
--

DROP TABLE IF EXISTS `menu_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `menu` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `is_visible` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_items`
--

LOCK TABLES `menu_items` WRITE;
/*!40000 ALTER TABLE `menu_items` DISABLE KEYS */;
INSERT INTO `menu_items` VALUES (1,'main','Home','/',1,1,NULL,NULL),(2,'main','People','/people',2,1,NULL,NULL),(3,'main','Research','/research',3,1,NULL,NULL),(4,'main','Projects','/projects',4,1,NULL,NULL),(5,'main','Facilities','/facilities',5,1,NULL,NULL),(6,'main','Contact','/contact',6,1,NULL,NULL),(7,'footer','Home','/',1,1,NULL,NULL),(8,'footer','People','/people',2,1,NULL,NULL),(9,'footer','Research','/research',3,1,NULL,NULL),(10,'footer','Projects','/projects',4,1,NULL,NULL),(11,'footer','Facilities','/facilities',5,1,NULL,NULL),(12,'footer','Contact','/contact',6,1,NULL,NULL);
/*!40000 ALTER TABLE `menu_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2026_03_09_223712_create_people_table',1),(5,'2026_03_09_223712_create_products_table',1),(6,'2026_03_09_223712_create_projects_table',1),(7,'2026_03_09_232322_create_settings_table',1),(8,'2026_03_10_212252_create_pages_table',1),(9,'2026_03_10_213728_create_menu_items_table',1),(10,'2026_03_10_214253_create_news_table',1),(11,'2026_03_10_225217_create_personal_access_tokens_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `text` text COLLATE utf8mb4_unicode_ci,
  `date` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `is_visible` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,'Lab Construction Completed','Lab construction completed! Instruments warming and running. Looking forward to cutting-edge research.','February 2024','/images/news/lab-construction.jpg',1,1,NULL,NULL),(2,'NOGA Funding Accepted','A proposal project accepted for fund by NOGA company — studying highly-strong and highly conductive Aluminum alloys.','September 2023','/images/news/aluminum-alloys.jpg',2,1,NULL,NULL),(3,'New Lab Members Join DIIL','New members accepted to join DIIL starting from fall semester 2023: Dr. Gautam Kumar (Postdoc) and Ms. Saja Sarhan (MSc.).','August 2023','/images/news/new-members.jpg',3,1,NULL,NULL),(4,'ISF Grant Awarded','Proposal accepted for fund by ISF (Israel Science Foundation), including an equipment grant.','July 2023','/images/news/isf-grant.jpg',4,1,NULL,NULL),(5,'Max-Planck Partner Group','DIIL is declared as a Max-Planck partner group led by Dr. Hanna Bishara with Max-Planck-Institut für Eisenforschung.','May 2023','/images/news/max-planck.jpg',5,1,NULL,NULL);
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

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
  `is_published` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pages_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `people`
--

DROP TABLE IF EXISTS `people`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `people` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publications` tinyint(1) NOT NULL DEFAULT '0',
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'member',
  `alumni_topic` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `people`
--

LOCK TABLES `people` WRITE;
/*!40000 ALTER TABLE `people` DISABLE KEYS */;
INSERT INTO `people` VALUES (1,'Dr. Hanna Bishara','Lab Director & Principal Investigator','hbishara@tauex.tau.ac.il','Wolfson Building, Room 121','Faculty member in Materials Science and Engineering at TAU since July 2022. Spent 3.5 years in Max-Planck-Institut für Eisenforschung (Germany) as a postdoctoral researcher. PhD, MSc, and BSc in Materials Science and Engineering at Technion.','/images/people/hanna.avif',1,'member',NULL,1,NULL,NULL),(2,'Dr. Amram Azulay','Lab Engineer & Researcher','ami2@tauex.tau.ac.il',NULL,'Gained expertise in Materials Science and Engineering focusing on electronic and thermal transport properties of bulk thermoelectric oxides. Employing point defect engineering, phase mixture, and ball mill processing.','/images/people/amram.avif',1,'member',NULL,2,NULL,NULL),(3,'Dr. Gautam Kumar Pal','Postdoctoral Researcher','gautamkumar@tauex.tau.ac.il',NULL,'Investigating contact resistivity between functional alloy and conductive alloys through local electrical measurements. Studies the electrical-mechanical properties interplay in cast 6xxx Al-alloy.','/images/people/gautam.avif',1,'member',NULL,3,NULL,NULL),(4,'Saja Sarhan','MSc. Candidate','sajasarhan@tauex.tau.ac.il',NULL,'Completed bachelor studies in fall 2023 in Materials Science and Engineering at TAU. For her masters, studies the segregation and precipitation in Cu-Mn alloys and their impact on local physical properties of grain boundaries.','/images/people/saja.avif',0,'member',NULL,4,NULL,NULL),(5,'Omer Coriat','MSc. Candidate','omercoriat@tauex.tau.ac.il',NULL,'Investigates the local electrical properties of 3D printed 6xxx Al-alloys to reveal resistivity mechanisms and improve the mechanical-electrical interplay. Co-supervised with Dr. Vladimir Popov.','/images/people/omer.avif',0,'member',NULL,5,NULL,NULL),(6,'Michael Cohen','MSc. 2023',NULL,NULL,NULL,NULL,0,'alumni','Grain boundary segregation in Cu-Ni alloys',10,NULL,NULL),(7,'Yael Levi','BSc. Project 2023',NULL,NULL,NULL,NULL,0,'alumni','Thin film deposition and characterization',11,NULL,NULL),(8,'Daniel Stern','BSc. Project 2023',NULL,NULL,NULL,NULL,0,'alumni','Electrical measurements methodology',12,NULL,NULL);
/*!40000 ALTER TABLE `people` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `features` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Induction Melting Furnace','[\"Bulk alloy fabrication by induction melting\",\"Heating up to 2000 \\u00b0C\",\"High purity Ar atmosphere\",\"Graphite and copper dies \\u2013 volume ~20 cm\\u00b3\"]','/images/facilities/induction-melting-furnace.avif','Materials Fabrication',1,NULL,NULL),(2,'Magnetron Sputtering Machine','[\"Turbo pump, vacuum level\",\"Two active cathodes, dc + ac\",\"Substrate heating to 600\\u00b0C\"]','/images/facilities/magnetron-sputtering.avif','Materials Fabrication',2,NULL,NULL),(3,'Inert Atmosphere & Vacuum Tube Furnaces','[\"Annealing with high purity Ar\",\"Pre-vacuum of E-01 mbar\",\"Heating up to 1000\\u00b0C\",\"Ramp control\"]','/images/facilities/inert-tube-furnaces.avif','Heat Treatments',10,NULL,NULL),(4,'Vacuum Furnace','[\"Base pressure 10E-5 mbar\",\"Heating up to 1000\\u00b0C\",\"Self-designed (with a company)\"]','/images/facilities/vacuum-furnace.avif','Heat Treatments',11,NULL,NULL),(5,'Burnout Furnace','[\"Heating up to 1000\\u00b0C\",\"20 liter chamber\"]','/images/facilities/burnout-furnace.avif','Heat Treatments',12,NULL,NULL),(6,'Cold Rolling','[\"Rolling at planes starting from thickness of 8mm\",\"Automatic flow\",\"Control over the speed of advance\",\"Suitable for materials up to hardness 64\"]','/images/facilities/cold-rolling.avif','Mechanical Treatments',20,NULL,NULL),(7,'Multi Directional Forging','[\"100kN load cell\",\"Compression and three-point bending\",\"Load or displacement control\"]','/images/facilities/multi-directional-forging.avif','Mechanical Treatments',21,NULL,NULL),(8,'Cutting Wheel Disk','[\"Load cell to control feed rate\",\"Multiple disk materials\",\"Water-cooled cutting\"]','/images/facilities/cutting-wheel-disk.avif','Sample Preparation',30,NULL,NULL),(9,'Diamond Wire Saw','[\"Very smooth cut surface, minimal deformation\",\"Control of cutting force and wire speed\",\"Water-cooled\"]','/images/facilities/diamond-wire-saw.avif','Sample Preparation',31,NULL,NULL),(10,'Automatic Polishing Machine','[\"Control over time and speed\",\"From abrasive grinding to OPS polishing\",\"Wide range of polishing cloths and liquids\"]','/images/facilities/automatic-polishing-machine.avif','Sample Preparation',32,NULL,NULL),(11,'Vibro-polishing Machine','[\"Control of vibration frequency and force\",\"A range of polishing cloths and liquids\",\"Extremely smooth deformation free surfaces\"]','/images/facilities/vibro-polishing-machine.avif','Sample Preparation',33,NULL,NULL),(12,'Optical Microscope','[\"Up to 100x objective lenses\",\"Bright field and Dark field\",\"Multiple filters\",\"Camera features and image analyses\"]','/images/facilities/optical-microscope.avif','Material Characterization',40,NULL,NULL),(13,'Benchtop Scanning Electron Microscope (SEM)','[\"SE and BSE detectors\",\"EDS\",\"Large samples are also possible\",\"Variable vacuum level\"]','/images/facilities/benchtop-sem.avif','Material Characterization',41,NULL,NULL),(14,'Nano-probing Nano-manipulators System','[\"Perform local electrical measurements inside SEM\",\"Four independent probes\",\"Compatible with Phenom and Zeiss SEMs\",\"Nano-manipulators move at exact range between motors to nano scale\"]','/images/facilities/nano-probing.avif','Material Characterization',42,NULL,NULL),(15,'Keithley Devices','[\"Nano-Voltmeter\",\"Sensitive current generator\",\"Ability to measure fractions of mili Ohms in metals\"]','/images/facilities/keithley-devices.avif','Material Characterization',43,NULL,NULL),(16,'Probing Station','[\"Four probes, manually aligned\",\"Heating range to 680\\u00b0C, and cooling to liquid nitrogen\",\"Accurate temperature ramp control\",\"Suitable for Con. dap Pause method\"]','/images/facilities/probing-station.avif','Material Characterization',44,NULL,NULL),(17,'Nanoindenter','[\"Berkovich tip\",\"Linear arrays of nano-indentation\",\"From \\u00b5N up to 500 mN\"]','/images/facilities/nanoindenter.avif','Material Characterization',45,NULL,NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `summary` text COLLATE utf8mb4_unicode_ci,
  `detail` text COLLATE utf8mb4_unicode_ci,
  `funding` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `period` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'current',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'Microstructure-controlled contact resistivity between metallic contact and functional Heusler alloy','The project aims to study the microstructure evolution at the internal interfaces between functional-contact alloys, and investigate the related local electrical properties of the complex material system.','The interface between a functional alloy and the conductive alloy material is responsible for an enhanced electron scattering in devices. Microstructure plays a significant role in determining the contact resistance.','ISF 2023 (4 years project)',NULL,'current',1,NULL,NULL),(2,'Segregation vs. Precipitation: Local Electrical and Mechanical Properties','Here we study and separate the impact of atomic segregation and precipitate formation on the microstructure evolution and the physical properties.','The microstructure evolution of an alloy is dominantly affected by its chemistry and processing history. Usually alloying elements tend to accumulate on grain boundaries leading to either segregation or precipitation phenomena.','Max-Planck Partner group (5 years project)',NULL,'current',2,NULL,NULL),(3,'High-Conductivity High-Strength Aluminum Alloys','Aim is to locally investigate the contribution of individual defects\' segments to the electrical resistivity, and correlate it with the local microstructure characteristics.','Alloying is essential to enhance the mechanical strength of metals. However it is accompanied with an increased electron scattering by defects induced by the alloying elements.','NOGA company (1 year project)',NULL,'current',3,NULL,NULL),(4,'Grain Boundary Resistivity in Pure Copper','Developed novel SEM in-situ local electrical measurements to quantify the resistivity of individual grain boundaries in Cu, revealing the effect of boundary structure on electron scattering.',NULL,'Max-Planck-Institut für Eisenforschung','2019–2022','previous',10,NULL,NULL),(5,'Dislocation-Enhanced Conductivity in Rutile TiO₂','Demonstrated that nano-mechanical doping via dislocations can locally enhance the electrical conductivity in rutile TiO₂, opening pathways for defect-engineered oxide electronics.',NULL,'DFG Collaborative Research','2020–2022','previous',11,NULL,NULL),(6,'Dopant Segregation in NbCoSn Half-Heusler Thermoelectrics','Showed that dopant segregation to grain boundaries controls the electrical conductivity of n-type NbCo(Pt)Sn half-Heusler alloys, mediating thermoelectric performance.',NULL,'Max-Planck / CAS Collaboration','2019–2021','previous',12,NULL,NULL);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `settings_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'contact_name','Dr. Hanna Bishara',NULL,NULL),(2,'contact_email','hbishara@tauex.tau.ac.il',NULL,NULL),(3,'location_building','Wolfson Building',NULL,NULL),(4,'location_room','Room 121',NULL,NULL),(5,'location_faculty','Faculty of Engineering',NULL,NULL),(6,'location_university','Tel Aviv University',NULL,NULL),(7,'location_city','Tel Aviv',NULL,NULL),(8,'location_country','Israel',NULL,NULL);
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Test User','test@example.com','2026-03-11 08:47:27','$2y$12$dRU6Rz0aKEAJFsoXy6.Gge3hSy0r8C2KbZ/0lrydgpINtDnd6e9H.','y3Fsr9lHhn','2026-03-11 08:47:27','2026-03-11 08:47:27');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-11 12:47:43
