-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: dfs_db
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.22.04.1

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
  `dataset_id` varchar(255) NOT NULL,
  `dataset_image_name` varchar(255) DEFAULT NULL,
  `dataset_image_status` varchar(255) DEFAULT NULL,
  `dataset_image_last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`dataset_image_id`,`dataset_id`),
  KEY `dataset_id` (`dataset_id`),
  CONSTRAINT `Dataset_image_ibfk_1` FOREIGN KEY (`dataset_id`) REFERENCES `Dataset_name` (`dataset_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Dataset_image`
--

LOCK TABLES `Dataset_image` WRITE;
/*!40000 ALTER TABLE `Dataset_image` DISABLE KEYS */;
INSERT INTO `Dataset_image` VALUES ('0','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 11:23:55'),('0','b7dc189c-cc55-4e24-aa63-5c21a1aa1641','sample_image.jpg','pending','2023-11-17 05:53:55'),('1','402298a4-dad1-40e7-b61c-80528ade3869','sample_image2.jpg','pending','2023-11-17 15:46:58'),('1','b7dc189c-cc55-4e24-aa63-5c21a1aa1641','sample_image2.jpg','pending','2023-11-17 10:16:58'),('10','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('11','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('12','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('13','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('14','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('15','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('16','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('17','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('18','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('19','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('2','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('20','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('21','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('22','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('23','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('24','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('25','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('26','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('27','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('28','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('29','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('3','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('30','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('31','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('32','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('4','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('5','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('6','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('7','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('8','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55'),('9','402298a4-dad1-40e7-b61c-80528ade3869','sample_image.jpg','pending','2023-11-17 05:53:55');
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
INSERT INTO `Dataset_label` VALUES ('black','#000000','402298a4-dad1-40e7-b61c-80528ade3869','2023-11-18 17:45:04'),('blue','#007bff','402298a4-dad1-40e7-b61c-80528ade3869','2023-11-18 17:53:08'),('green','#00ff62','402298a4-dad1-40e7-b61c-80528ade3869','2023-11-18 17:49:35'),('orange','#ff5900','402298a4-dad1-40e7-b61c-80528ade3869','2023-11-18 18:11:53'),('red','#ff0000','402298a4-dad1-40e7-b61c-80528ade3869','2023-11-18 17:45:47'),('white','#ffffff','402298a4-dad1-40e7-b61c-80528ade3869','2023-11-18 17:50:48'),('yellow','#d4ff00','402298a4-dad1-40e7-b61c-80528ade3869','2023-11-18 17:49:14');
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
INSERT INTO `Dataset_name` VALUES ('DepthFirstSearch','dfsteam@gmail.com','3b84d7b8-0ea0-4e47-9395-064f3db4a933','Checking','2023-12-06 13:45:30','2023-12-06 13:45:30'),('meet','amey.choudhary@research.iiit.ac.in','402298a4-dad1-40e7-b61c-80528ade3869','meet','2023-08-10 17:21:12','2023-08-10 17:21:12'),('abcd','amey.choudhary@research.iiit.ac.in','6ac85dfd-f24f-4fde-9d4f-a0a8e25ae64e','efgh','2023-10-24 09:53:56','2023-10-24 09:53:56'),('dfs_meet','amey.choudhary@research.iiit.ac.in','b7dc189c-cc55-4e24-aa63-5c21a1aa1641','dfs_meet','2023-08-21 16:41:31','2023-08-21 16:41:31'),('amey_db','amey.choudhary@research.iiit.ac.in','fa478a54-d9ad-4228-85d9-9c52877f69e3','test database ','2023-08-07 11:19:32','2023-08-07 11:19:32');
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
  `user_annotations_last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
  `user_annotations_region_id` varchar(255) NOT NULL,
  `user_annotations_region_color` varchar(255) DEFAULT NULL,
  `user_annotations_region_is_Complete` tinyint(1) DEFAULT NULL,
  `user_annotations_region_is_Editable` tinyint(1) DEFAULT NULL,
  `user_annotations_region_name` varchar(255) DEFAULT NULL,
  `user_annotation_region_comment` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `dataset_image_id` varchar(255) DEFAULT NULL,
  `user_annotations_region_last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_annotations_region_id`),
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
  `user_annotations_region_id` varchar(255) DEFAULT NULL,
  `region_point_x` int DEFAULT NULL,
  `region_point_y` int DEFAULT NULL,
  `user_annotations_region_point_last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `user_annotations_region_id` (`user_annotations_region_id`),
  CONSTRAINT `Mod_annotations_region_point_ibfk_1` FOREIGN KEY (`user_annotations_region_id`) REFERENCES `Mod_annotations_region` (`user_annotations_region_id`) ON DELETE CASCADE ON UPDATE CASCADE
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
INSERT INTO `User` VALUES ('amey.choudhary@research.iiit.ac.in','Permanent','2023-08-07 11:19:32'),('dfsteam@gmail.com','Permanent','2023-12-06 13:45:30'),('test@gmail.com','Permanent','2023-12-06 22:02:05');
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
INSERT INTO `User_annotations` VALUES ('amey.choudhary@research.iiit.ac.in','0','2023-12-06 17:43:23'),('amey.choudhary@research.iiit.ac.in','1','2023-12-06 16:19:01'),('amey.choudhary@research.iiit.ac.in','2','2023-12-06 16:20:35'),('dfsteam@gmail.com','0','2023-12-06 16:17:44'),('dfsteam@gmail.com','1','2023-12-06 16:19:01'),('dfsteam@gmail.com','2','2023-12-06 16:20:35'),('test@gmail.com','0','2023-12-06 16:17:44'),('test@gmail.com','1','2023-12-06 16:19:01'),('test@gmail.com','2','2023-12-06 16:20:35');
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
  `user_annotation_region_comment` varchar(255) DEFAULT NULL,
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
INSERT INTO `User_annotations_region` VALUES ('0a21b406-b466-4a02-bac0-fc674f1d2314','#007bff',1,1,'blue','','amey.choudhary@research.iiit.ac.in','2','2023-12-06 16:20:35'),('1e404b07-3ec5-4445-a991-5b3b71b1b54a','#007bff',1,1,'blue','','amey.choudhary@research.iiit.ac.in','0','2023-12-06 17:43:23'),('3413d09e-5255-4cb2-b936-a75bbad6ec38','#007bff',1,1,'blue','','amey.choudhary@research.iiit.ac.in','1','2023-12-06 16:19:01'),('44321e06-ec34-4db2-abcb-44f62f15a884','#ffffff',1,1,'white','','amey.choudhary@research.iiit.ac.in','0','2023-12-06 17:43:23'),('6067e4ff-b5cd-4d1d-a5af-6c41dbd823b2','#ffffff',1,1,'white','','amey.choudhary@research.iiit.ac.in','1','2023-12-06 16:19:01'),('6fb1ef20-a6cc-4005-ac71-bd3cede0cc15','#d4ff00',1,1,'yellow','','amey.choudhary@research.iiit.ac.in','2','2023-12-06 16:20:35'),('754f3293-83be-4992-8a38-d9053d12b32a','#ff0000',1,1,'red','cat','amey.choudhary@research.iiit.ac.in','1','2023-12-06 16:19:01'),('79482683-bbec-4cda-881c-08666cad3924','#00ff62',1,1,'green','','test@gmail.com','1','2023-12-06 16:19:01'),('8be1a7ac-925b-425a-b00d-edc333e32dc9','#00ff62',1,1,'green','','dfsteam@gmail.com','0','2023-12-06 16:17:44'),('907e13e5-1fcd-4184-b552-8bc2b51b836f','#d4ff00',1,1,'yellow','','amey.choudhary@research.iiit.ac.in','2','2023-12-06 16:20:35'),('910c53d6-979e-4c57-aefd-0de8d6d07dd6','#ff5900',1,1,'orange','','dfsteam@gmail.com','2','2023-12-06 16:20:35'),('949f6a1a-e06f-4026-b4ce-6a3b6aaf858d','#00ff62',1,1,'green','','dfsteam@gmail.com','2','2023-12-06 16:20:35'),('96ffc640-80b2-47e8-a87f-d639a1386c4a','#ff0000',1,1,'red','','dfsteam@gmail.com','0','2023-12-06 16:17:44'),('a80dbc0b-dcc5-4b9a-a94d-380fcb2abc30','#000000',1,1,'black','','test@gmail.com','1','2023-12-06 16:19:01'),('ab95386a-4daf-46b5-aaac-94edb545fafc','#ff0000',1,1,'red','','test@gmail.com','0','2023-12-06 16:17:44'),('aecd0238-848a-47e2-ad2b-509d1e8fedba','#ffffff',1,1,'white','','dfsteam@gmail.com','2','2023-12-06 16:20:35'),('c5b6215a-7001-475c-8416-6015dfbc333a','#ff5900',1,1,'orange','','test@gmail.com','0','2023-12-06 16:17:44'),('ca7d058a-a917-4a3a-8685-563c677a5284','#d4ff00',1,1,'yellow','','dfsteam@gmail.com','1','2023-12-06 16:19:01'),('cf61dad0-c6f3-48be-aa6d-c49f6f9a9438','#ff5900',1,1,'orange','','test@gmail.com','2','2023-12-06 16:20:35'),('f58049b7-17f5-4eaf-a2c3-9c8bd31606f8','#ff5900',1,1,'orange','','dfsteam@gmail.com','1','2023-12-06 16:19:01'),('fadb6572-2fed-47e5-87e1-02b2d2e45d5c','#ff0000',1,1,'red','','test@gmail.com','2','2023-12-06 16:20:35'),('fd93912b-31c4-422e-8971-e4a736f5322a','#00ff62',1,1,'green','','test@gmail.com','2','2023-12-06 16:20:35');
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
INSERT INTO `User_annotations_region_point` VALUES ('8be1a7ac-925b-425a-b00d-edc333e32dc9',137,72,'2023-12-06 16:17:44'),('8be1a7ac-925b-425a-b00d-edc333e32dc9',23,72,'2023-12-06 16:17:44'),('8be1a7ac-925b-425a-b00d-edc333e32dc9',23,11,'2023-12-06 16:17:44'),('8be1a7ac-925b-425a-b00d-edc333e32dc9',137,11,'2023-12-06 16:17:44'),('8be1a7ac-925b-425a-b00d-edc333e32dc9',137,72,'2023-12-06 16:17:44'),('c5b6215a-7001-475c-8416-6015dfbc333a',207,60,'2023-12-06 16:17:44'),('c5b6215a-7001-475c-8416-6015dfbc333a',110,60,'2023-12-06 16:17:44'),('c5b6215a-7001-475c-8416-6015dfbc333a',110,22,'2023-12-06 16:17:44'),('c5b6215a-7001-475c-8416-6015dfbc333a',207,22,'2023-12-06 16:17:44'),('c5b6215a-7001-475c-8416-6015dfbc333a',207,60,'2023-12-06 16:17:44'),('96ffc640-80b2-47e8-a87f-d639a1386c4a',121,9,'2023-12-06 16:17:44'),('96ffc640-80b2-47e8-a87f-d639a1386c4a',243,9,'2023-12-06 16:17:44'),('96ffc640-80b2-47e8-a87f-d639a1386c4a',243,35,'2023-12-06 16:17:44'),('96ffc640-80b2-47e8-a87f-d639a1386c4a',121,35,'2023-12-06 16:17:44'),('96ffc640-80b2-47e8-a87f-d639a1386c4a',121,9,'2023-12-06 16:17:44'),('ab95386a-4daf-46b5-aaac-94edb545fafc',43,92,'2023-12-06 16:17:44'),('ab95386a-4daf-46b5-aaac-94edb545fafc',57,37,'2023-12-06 16:17:44'),('ab95386a-4daf-46b5-aaac-94edb545fafc',127,76,'2023-12-06 16:17:44'),('ab95386a-4daf-46b5-aaac-94edb545fafc',92,120,'2023-12-06 16:17:44'),('ab95386a-4daf-46b5-aaac-94edb545fafc',42,91,'2023-12-06 16:17:44'),('754f3293-83be-4992-8a38-d9053d12b32a',172,29,'2023-12-06 16:19:01'),('754f3293-83be-4992-8a38-d9053d12b32a',87,29,'2023-12-06 16:19:01'),('754f3293-83be-4992-8a38-d9053d12b32a',87,135,'2023-12-06 16:19:01'),('754f3293-83be-4992-8a38-d9053d12b32a',172,135,'2023-12-06 16:19:01'),('754f3293-83be-4992-8a38-d9053d12b32a',172,29,'2023-12-06 16:19:01'),('ca7d058a-a917-4a3a-8685-563c677a5284',249,70,'2023-12-06 16:19:01'),('ca7d058a-a917-4a3a-8685-563c677a5284',179,70,'2023-12-06 16:19:01'),('ca7d058a-a917-4a3a-8685-563c677a5284',179,16,'2023-12-06 16:19:01'),('ca7d058a-a917-4a3a-8685-563c677a5284',249,16,'2023-12-06 16:19:01'),('ca7d058a-a917-4a3a-8685-563c677a5284',249,70,'2023-12-06 16:19:01'),('3413d09e-5255-4cb2-b936-a75bbad6ec38',37,19,'2023-12-06 16:19:01'),('3413d09e-5255-4cb2-b936-a75bbad6ec38',102,19,'2023-12-06 16:19:01'),('3413d09e-5255-4cb2-b936-a75bbad6ec38',102,82,'2023-12-06 16:19:01'),('3413d09e-5255-4cb2-b936-a75bbad6ec38',37,82,'2023-12-06 16:19:01'),('3413d09e-5255-4cb2-b936-a75bbad6ec38',37,19,'2023-12-06 16:19:01'),('a80dbc0b-dcc5-4b9a-a94d-380fcb2abc30',237,137,'2023-12-06 16:19:01'),('a80dbc0b-dcc5-4b9a-a94d-380fcb2abc30',158,137,'2023-12-06 16:19:01'),('a80dbc0b-dcc5-4b9a-a94d-380fcb2abc30',158,71,'2023-12-06 16:19:01'),('a80dbc0b-dcc5-4b9a-a94d-380fcb2abc30',237,71,'2023-12-06 16:19:01'),('a80dbc0b-dcc5-4b9a-a94d-380fcb2abc30',237,137,'2023-12-06 16:19:01'),('6067e4ff-b5cd-4d1d-a5af-6c41dbd823b2',116,43,'2023-12-06 16:19:01'),('6067e4ff-b5cd-4d1d-a5af-6c41dbd823b2',155,43,'2023-12-06 16:19:01'),('6067e4ff-b5cd-4d1d-a5af-6c41dbd823b2',155,126,'2023-12-06 16:19:01'),('6067e4ff-b5cd-4d1d-a5af-6c41dbd823b2',116,126,'2023-12-06 16:19:01'),('6067e4ff-b5cd-4d1d-a5af-6c41dbd823b2',116,43,'2023-12-06 16:19:01'),('79482683-bbec-4cda-881c-08666cad3924',131,60,'2023-12-06 16:19:01'),('79482683-bbec-4cda-881c-08666cad3924',21,60,'2023-12-06 16:19:01'),('79482683-bbec-4cda-881c-08666cad3924',21,36,'2023-12-06 16:19:01'),('79482683-bbec-4cda-881c-08666cad3924',131,36,'2023-12-06 16:19:01'),('79482683-bbec-4cda-881c-08666cad3924',131,60,'2023-12-06 16:19:01'),('f58049b7-17f5-4eaf-a2c3-9c8bd31606f8',230,113,'2023-12-06 16:19:01'),('f58049b7-17f5-4eaf-a2c3-9c8bd31606f8',53,113,'2023-12-06 16:19:01'),('f58049b7-17f5-4eaf-a2c3-9c8bd31606f8',53,48,'2023-12-06 16:19:01'),('f58049b7-17f5-4eaf-a2c3-9c8bd31606f8',230,48,'2023-12-06 16:19:01'),('f58049b7-17f5-4eaf-a2c3-9c8bd31606f8',230,113,'2023-12-06 16:19:01'),('910c53d6-979e-4c57-aefd-0de8d6d07dd6',190,130,'2023-12-06 16:20:35'),('910c53d6-979e-4c57-aefd-0de8d6d07dd6',32,130,'2023-12-06 16:20:35'),('910c53d6-979e-4c57-aefd-0de8d6d07dd6',32,55,'2023-12-06 16:20:35'),('910c53d6-979e-4c57-aefd-0de8d6d07dd6',190,55,'2023-12-06 16:20:35'),('910c53d6-979e-4c57-aefd-0de8d6d07dd6',190,130,'2023-12-06 16:20:35'),('949f6a1a-e06f-4026-b4ce-6a3b6aaf858d',155,27,'2023-12-06 16:20:35'),('949f6a1a-e06f-4026-b4ce-6a3b6aaf858d',270,27,'2023-12-06 16:20:35'),('949f6a1a-e06f-4026-b4ce-6a3b6aaf858d',270,73,'2023-12-06 16:20:35'),('949f6a1a-e06f-4026-b4ce-6a3b6aaf858d',155,73,'2023-12-06 16:20:35'),('949f6a1a-e06f-4026-b4ce-6a3b6aaf858d',155,27,'2023-12-06 16:20:35'),('cf61dad0-c6f3-48be-aa6d-c49f6f9a9438',223,19,'2023-12-06 16:20:35'),('cf61dad0-c6f3-48be-aa6d-c49f6f9a9438',254,19,'2023-12-06 16:20:35'),('cf61dad0-c6f3-48be-aa6d-c49f6f9a9438',254,144,'2023-12-06 16:20:35'),('cf61dad0-c6f3-48be-aa6d-c49f6f9a9438',223,144,'2023-12-06 16:20:35'),('cf61dad0-c6f3-48be-aa6d-c49f6f9a9438',223,19,'2023-12-06 16:20:35'),('fd93912b-31c4-422e-8971-e4a736f5322a',29,16,'2023-12-06 16:20:35'),('fd93912b-31c4-422e-8971-e4a736f5322a',112,16,'2023-12-06 16:20:35'),('fd93912b-31c4-422e-8971-e4a736f5322a',112,91,'2023-12-06 16:20:35'),('fd93912b-31c4-422e-8971-e4a736f5322a',29,91,'2023-12-06 16:20:35'),('fd93912b-31c4-422e-8971-e4a736f5322a',29,16,'2023-12-06 16:20:35'),('0a21b406-b466-4a02-bac0-fc674f1d2314',68,35,'2023-12-06 16:20:35'),('0a21b406-b466-4a02-bac0-fc674f1d2314',100,35,'2023-12-06 16:20:35'),('0a21b406-b466-4a02-bac0-fc674f1d2314',100,156,'2023-12-06 16:20:35'),('0a21b406-b466-4a02-bac0-fc674f1d2314',68,156,'2023-12-06 16:20:35'),('0a21b406-b466-4a02-bac0-fc674f1d2314',68,35,'2023-12-06 16:20:35'),('fadb6572-2fed-47e5-87e1-02b2d2e45d5c',49,68,'2023-12-06 16:20:35'),('fadb6572-2fed-47e5-87e1-02b2d2e45d5c',164,68,'2023-12-06 16:20:35'),('fadb6572-2fed-47e5-87e1-02b2d2e45d5c',164,150,'2023-12-06 16:20:35'),('fadb6572-2fed-47e5-87e1-02b2d2e45d5c',49,150,'2023-12-06 16:20:35'),('fadb6572-2fed-47e5-87e1-02b2d2e45d5c',49,68,'2023-12-06 16:20:35'),('6fb1ef20-a6cc-4005-ac71-bd3cede0cc15',210,67,'2023-12-06 16:20:35'),('6fb1ef20-a6cc-4005-ac71-bd3cede0cc15',167,67,'2023-12-06 16:20:35'),('6fb1ef20-a6cc-4005-ac71-bd3cede0cc15',167,15,'2023-12-06 16:20:35'),('6fb1ef20-a6cc-4005-ac71-bd3cede0cc15',210,15,'2023-12-06 16:20:35'),('6fb1ef20-a6cc-4005-ac71-bd3cede0cc15',210,67,'2023-12-06 16:20:35'),('907e13e5-1fcd-4184-b552-8bc2b51b836f',219,61,'2023-12-06 16:20:35'),('907e13e5-1fcd-4184-b552-8bc2b51b836f',266,61,'2023-12-06 16:20:35'),('907e13e5-1fcd-4184-b552-8bc2b51b836f',266,142,'2023-12-06 16:20:35'),('907e13e5-1fcd-4184-b552-8bc2b51b836f',219,142,'2023-12-06 16:20:35'),('907e13e5-1fcd-4184-b552-8bc2b51b836f',219,61,'2023-12-06 16:20:35'),('aecd0238-848a-47e2-ad2b-509d1e8fedba',133,28,'2023-12-06 16:20:35'),('aecd0238-848a-47e2-ad2b-509d1e8fedba',144,28,'2023-12-06 16:20:35'),('aecd0238-848a-47e2-ad2b-509d1e8fedba',144,164,'2023-12-06 16:20:35'),('aecd0238-848a-47e2-ad2b-509d1e8fedba',133,164,'2023-12-06 16:20:35'),('aecd0238-848a-47e2-ad2b-509d1e8fedba',133,28,'2023-12-06 16:20:35'),('1e404b07-3ec5-4445-a991-5b3b71b1b54a',80,38,'2023-12-06 17:43:23'),('1e404b07-3ec5-4445-a991-5b3b71b1b54a',121,38,'2023-12-06 17:43:23'),('1e404b07-3ec5-4445-a991-5b3b71b1b54a',121,157,'2023-12-06 17:43:23'),('1e404b07-3ec5-4445-a991-5b3b71b1b54a',80,157,'2023-12-06 17:43:23'),('1e404b07-3ec5-4445-a991-5b3b71b1b54a',80,38,'2023-12-06 17:43:23'),('44321e06-ec34-4db2-abcb-44f62f15a884',183,8,'2023-12-06 17:43:23'),('44321e06-ec34-4db2-abcb-44f62f15a884',251,8,'2023-12-06 17:43:23'),('44321e06-ec34-4db2-abcb-44f62f15a884',251,136,'2023-12-06 17:43:23'),('44321e06-ec34-4db2-abcb-44f62f15a884',183,136,'2023-12-06 17:43:23'),('44321e06-ec34-4db2-abcb-44f62f15a884',183,8,'2023-12-06 17:43:23');
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

-- Dump completed on 2023-12-06 23:42:19
