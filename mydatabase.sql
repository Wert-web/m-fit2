-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: my_database
-- ------------------------------------------------------
-- Server version	8.4.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `asig`
--

DROP TABLE IF EXISTS `asig`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asig` (
  `id_asig` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `time` int NOT NULL,
  `document_url` varchar(255) DEFAULT NULL,
  `visibility` tinyint(1) NOT NULL,
  `description` text,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id_asig`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asig`
--

LOCK TABLES `asig` WRITE;
/*!40000 ALTER TABLE `asig` DISABLE KEYS */;
INSERT INTO `asig` VALUES (1,'Asig 1',2,'../../uploads/text.txt',1,NULL,NULL),(2,'Asig 1.5',2,'../../uploads/text.txt',1,NULL,'2024-12-05'),(3,'Asig 1.5',2,'../../uploads/text.txt',1,NULL,'2024-12-05');
/*!40000 ALTER TABLE `asig` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `block`
--

DROP TABLE IF EXISTS `block`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `block` (
  `id_block` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `visibility` tinyint(1) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id_block`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `block_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `block`
--

LOCK TABLES `block` WRITE;
/*!40000 ALTER TABLE `block` DISABLE KEYS */;
INSERT INTO `block` VALUES (1,2,1,'bloque1','bloque para novatos',NULL),(2,2,1,'bloque2','ewq','2024-12-05');
/*!40000 ALTER TABLE `block` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `block_asig`
--

DROP TABLE IF EXISTS `block_asig`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `block_asig` (
  `id_block_asig` int NOT NULL AUTO_INCREMENT,
  `id_block` int NOT NULL,
  `id_asig` int NOT NULL,
  `id_user` int NOT NULL,
  PRIMARY KEY (`id_block_asig`),
  KEY `id_block` (`id_block`),
  KEY `id_asig` (`id_asig`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `block_asig_ibfk_1` FOREIGN KEY (`id_block`) REFERENCES `block` (`id_block`) ON DELETE CASCADE,
  CONSTRAINT `block_asig_ibfk_2` FOREIGN KEY (`id_asig`) REFERENCES `asig` (`id_asig`) ON DELETE CASCADE,
  CONSTRAINT `block_asig_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `block_asig`
--

LOCK TABLES `block_asig` WRITE;
/*!40000 ALTER TABLE `block_asig` DISABLE KEYS */;
INSERT INTO `block_asig` VALUES (1,1,1,2),(2,2,2,2),(3,1,3,2);
/*!40000 ALTER TABLE `block_asig` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class` (
  `id_class` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `id_user` int NOT NULL,
  `visibility` tinyint(1) NOT NULL,
  `date` date NOT NULL,
  `description` text,
  PRIMARY KEY (`id_class`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `class_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (1,'',2,1,'2024-12-05',NULL),(2,'',2,0,'2024-12-05',NULL),(3,'',2,1,'2024-12-05',NULL),(4,'Novatos2',2,1,'2024-12-05',NULL),(5,'Novatos3',2,1,'2024-12-05','awdwaw');
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_block`
--

DROP TABLE IF EXISTS `class_block`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_block` (
  `id_class_block` int NOT NULL AUTO_INCREMENT,
  `id_class` int NOT NULL,
  `id_block` int NOT NULL,
  `id_user` int NOT NULL,
  PRIMARY KEY (`id_class_block`),
  KEY `id_class` (`id_class`),
  KEY `id_block` (`id_block`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `class_block_ibfk_1` FOREIGN KEY (`id_class`) REFERENCES `class` (`id_class`) ON DELETE CASCADE,
  CONSTRAINT `class_block_ibfk_2` FOREIGN KEY (`id_block`) REFERENCES `block` (`id_block`) ON DELETE CASCADE,
  CONSTRAINT `class_block_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_block`
--

LOCK TABLES `class_block` WRITE;
/*!40000 ALTER TABLE `class_block` DISABLE KEYS */;
INSERT INTO `class_block` VALUES (1,4,1,2);
/*!40000 ALTER TABLE `class_block` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_user`
--

DROP TABLE IF EXISTS `class_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_user` (
  `id_class_user` int NOT NULL AUTO_INCREMENT,
  `id_class` int NOT NULL,
  `id_user` int NOT NULL,
  PRIMARY KEY (`id_class_user`),
  KEY `id_class` (`id_class`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `class_user_ibfk_1` FOREIGN KEY (`id_class`) REFERENCES `class` (`id_class`) ON DELETE CASCADE,
  CONSTRAINT `class_user_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_user`
--

LOCK TABLES `class_user` WRITE;
/*!40000 ALTER TABLE `class_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `class_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'sdasd','dsadsa',1),(2,'José Alonso Cano Ramos','123456',1),(3,'hhh','123456',1),(4,'hhh','da',1),(5,'hhh','da',1),(6,'hhh','da',1),(7,'hhh','dawdaw',1),(8,'hhh','daw',1),(9,'awd','dwa',1),(10,'awd','dwa',1),(11,'awd','dwa',1),(12,'awd','awd',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-05 20:09:37
