-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
--
-- Host: localhost    Database: dfs_db
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.20.04.1

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
-- Table structure for table `Dataset_image`
--

DROP TABLE IF EXISTS `Dataset_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Dataset_image` (
  `dataset_image_id` varchar(255) NOT NULL,
  `dataset_id` varchar(255) DEFAULT NULL,
  `dataset_image_name` varchar(255) DEFAULT NULL,
  `dataset_image_status` varchar(255) DEFAULT NULL,
  `dataset_image_last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`dataset_image_id`),
  KEY `dataset_id` (`dataset_id`),
  CONSTRAINT `Dataset_image_ibfk_1` FOREIGN KEY (`dataset_id`) REFERENCES `Dataset_name` (`dataset_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Dataset_image`
--

LOCK TABLES `Dataset_image` WRITE;
/*!40000 ALTER TABLE `Dataset_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `Dataset_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Dataset_image_url`
--

DROP TABLE IF EXISTS `Dataset_image_url`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Dataset_image_url` (
  `dataset_image_id` varchar(255) NOT NULL,
  `dataset_image_url` varchar(255) DEFAULT NULL,
  `dataset_image_url_last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`dataset_image_id`),
  CONSTRAINT `Dataset_image_url_ibfk_1` FOREIGN KEY (`dataset_image_id`) REFERENCES `Dataset_image` (`dataset_image_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Dataset_image_url`
--

LOCK TABLES `Dataset_image_url` WRITE;
/*!40000 ALTER TABLE `Dataset_image_url` DISABLE KEYS */;
/*!40000 ALTER TABLE `Dataset_image_url` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Dataset_label`
--

DROP TABLE IF EXISTS `Dataset_label`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Dataset_label` (
  `dataset_label_name` varchar(255) NOT NULL,
  `dataset_label_color` varchar(255) DEFAULT NULL,
  `dataset_id` varchar(255) NOT NULL,
  `dataset_label_last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`dataset_id`,`dataset_label_name`),
  CONSTRAINT `Dataset_label_ibfk_1` FOREIGN KEY (`dataset_id`) REFERENCES `Dataset_name` (`dataset_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Dataset_label`
--

LOCK TABLES `Dataset_label` WRITE;
/*!40000 ALTER TABLE `Dataset_label` DISABLE KEYS */;
INSERT INTO `Dataset_label` VALUES ('dummy','#17d93e','402298a4-dad1-40e7-b61c-80528ade3869','2023-09-25 19:21:25'),('pink','#d9209f','402298a4-dad1-40e7-b61c-80528ade3869','2023-09-25 19:22:33'),('dummy','#000000','fa478a54-d9ad-4228-85d9-9c52877f69e3','2023-08-17 13:27:57');
/*!40000 ALTER TABLE `Dataset_label` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Dataset_name`
--

DROP TABLE IF EXISTS `Dataset_name`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Dataset_name` (
  `dataset_name` varchar(255) DEFAULT NULL,
  `dataset_created_by` varchar(255) DEFAULT NULL,
  `dataset_id` varchar(255) NOT NULL,
  `dataset_desc` varchar(1000) DEFAULT NULL,
  `dataset_created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataset_last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`dataset_id`),
  KEY `dataset_created_by` (`dataset_created_by`),
  CONSTRAINT `Dataset_name_ibfk_1` FOREIGN KEY (`dataset_created_by`) REFERENCES `User` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Dataset_name`
--

LOCK TABLES `Dataset_name` WRITE;
/*!40000 ALTER TABLE `Dataset_name` DISABLE KEYS */;
INSERT INTO `Dataset_name` VALUES ('meet','amey.choudhary@research.iiit.ac.in','402298a4-dad1-40e7-b61c-80528ade3869','meet','2023-08-10 17:21:12','2023-08-10 17:21:12'),('dfs_meet','amey.choudhary@research.iiit.ac.in','b7dc189c-cc55-4e24-aa63-5c21a1aa1641','dfs_meet','2023-08-21 16:41:31','2023-08-21 16:41:31'),('amey_db','amey.choudhary@research.iiit.ac.in','fa478a54-d9ad-4228-85d9-9c52877f69e3','test database ','2023-08-07 11:19:32','2023-08-07 11:19:32');
/*!40000 ALTER TABLE `Dataset_name` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Image_comment`
--

DROP TABLE IF EXISTS `Image_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Image_comment` (
  `comment_id` varchar(255) NOT NULL,
  `dataset_image_id` varchar(255) DEFAULT NULL,
  `commented_by` varchar(255) DEFAULT NULL,
  `comment_content` varchar(10000) DEFAULT NULL,
  `comment_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `dataset_image_id` (`dataset_image_id`),
  CONSTRAINT `Image_comment_ibfk_1` FOREIGN KEY (`dataset_image_id`) REFERENCES `Dataset_image` (`dataset_image_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Image_comment`
--

LOCK TABLES `Image_comment` WRITE;
/*!40000 ALTER TABLE `Image_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Image_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Mod_annotations`
--

DROP TABLE IF EXISTS `Mod_annotations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Mod_annotations` (
  `user_id` varchar(255) NOT NULL,
  `dataset_image_id` varchar(255) NOT NULL,
  `mod_annotations_last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`dataset_image_id`),
  KEY `dataset_image_id` (`dataset_image_id`),
  CONSTRAINT `Mod_annotations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Mod_annotations_ibfk_2` FOREIGN KEY (`dataset_image_id`) REFERENCES `Dataset_image` (`dataset_image_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Mod_annotations`
--

LOCK TABLES `Mod_annotations` WRITE;
/*!40000 ALTER TABLE `Mod_annotations` DISABLE KEYS */;
/*!40000 ALTER TABLE `Mod_annotations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Mod_annotations_region`
--

DROP TABLE IF EXISTS `Mod_annotations_region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Mod_annotations_region` (
  `mod_annotations_region_id` varchar(255) NOT NULL,
  `mod_annotations_region_color` varchar(255) DEFAULT NULL,
  `mod_annotations_region_is_Complete` tinyint(1) DEFAULT NULL,
  `mod_annotations_region_is_Editable` tinyint(1) DEFAULT NULL,
  `mod_annotations_region_name` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `dataset_image_id` varchar(255) DEFAULT NULL,
  `mod_annotations_region_last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`mod_annotations_region_id`),
  KEY `user_id` (`user_id`,`dataset_image_id`),
  CONSTRAINT `Mod_annotations_region_ibfk_1` FOREIGN KEY (`user_id`, `dataset_image_id`) REFERENCES `Mod_annotations` (`user_id`, `dataset_image_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Mod_annotations_region`
--

LOCK TABLES `Mod_annotations_region` WRITE;
/*!40000 ALTER TABLE `Mod_annotations_region` DISABLE KEYS */;
/*!40000 ALTER TABLE `Mod_annotations_region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Mod_annotations_region_point`
--

DROP TABLE IF EXISTS `Mod_annotations_region_point`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Mod_annotations_region_point` (
  `mod_annotations_region_id` varchar(255) DEFAULT NULL,
  `region_point_x` int DEFAULT NULL,
  `region_point_y` int DEFAULT NULL,
  `mod_annotations_region_point_last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `mod_annotations_region_id` (`mod_annotations_region_id`),
  CONSTRAINT `Mod_annotations_region_point_ibfk_1` FOREIGN KEY (`mod_annotations_region_id`) REFERENCES `Mod_annotations_region` (`mod_annotations_region_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Mod_annotations_region_point`
--

LOCK TABLES `Mod_annotations_region_point` WRITE;
/*!40000 ALTER TABLE `Mod_annotations_region_point` DISABLE KEYS */;
/*!40000 ALTER TABLE `Mod_annotations_region_point` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `user_id` varchar(255) NOT NULL,
  `user_type` varchar(255) DEFAULT NULL,
  `user_last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('amey.choudhary@research.iiit.ac.in','Permanent','2023-08-07 11:19:32');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_annotations`
--

DROP TABLE IF EXISTS `User_annotations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User_annotations` (
  `user_id` varchar(255) NOT NULL,
  `dataset_image_id` varchar(255) NOT NULL,
  `user_annotations_last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`dataset_image_id`),
  KEY `dataset_image_id` (`dataset_image_id`),
  CONSTRAINT `User_annotations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `User_annotations_ibfk_2` FOREIGN KEY (`dataset_image_id`) REFERENCES `Dataset_image` (`dataset_image_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_annotations`
--

LOCK TABLES `User_annotations` WRITE;
/*!40000 ALTER TABLE `User_annotations` DISABLE KEYS */;
/*!40000 ALTER TABLE `User_annotations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_annotations_region`
--

DROP TABLE IF EXISTS `User_annotations_region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User_annotations_region` (
  `user_annotations_region_id` varchar(255) NOT NULL,
  `user_annotations_region_color` varchar(255) DEFAULT NULL,
  `user_annotations_region_is_Complete` tinyint(1) DEFAULT NULL,
  `user_annotations_region_is_Editable` tinyint(1) DEFAULT NULL,
  `user_annotation_region_name` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `dataset_image_id` varchar(255) DEFAULT NULL,
  `user_annotations_region_last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_annotations_region_id`),
  KEY `user_id` (`user_id`,`dataset_image_id`),
  CONSTRAINT `User_annotations_region_ibfk_1` FOREIGN KEY (`user_id`, `dataset_image_id`) REFERENCES `User_annotations` (`user_id`, `dataset_image_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_annotations_region`
--

LOCK TABLES `User_annotations_region` WRITE;
/*!40000 ALTER TABLE `User_annotations_region` DISABLE KEYS */;
/*!40000 ALTER TABLE `User_annotations_region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_annotations_region_point`
--

DROP TABLE IF EXISTS `User_annotations_region_point`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User_annotations_region_point` (
  `user_annotations_region_id` varchar(255) DEFAULT NULL,
  `region_point_x` int DEFAULT NULL,
  `region_point_y` int DEFAULT NULL,
  `user_annotations_region_point_last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `user_annotations_region_id` (`user_annotations_region_id`),
  CONSTRAINT `User_annotations_region_point_ibfk_1` FOREIGN KEY (`user_annotations_region_id`) REFERENCES `User_annotations_region` (`user_annotations_region_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_annotations_region_point`
--

LOCK TABLES `User_annotations_region_point` WRITE;
/*!40000 ALTER TABLE `User_annotations_region_point` DISABLE KEYS */;
/*!40000 ALTER TABLE `User_annotations_region_point` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-26  1:30:03
