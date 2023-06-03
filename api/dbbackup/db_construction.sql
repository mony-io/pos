-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for osx10.10 (x86_64)
--
-- Host: localhost    Database: db_construction
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary table structure for view `getallproducts`
--

DROP TABLE IF EXISTS `getallproducts`;
/*!50001 DROP VIEW IF EXISTS `getallproducts`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `getallproducts` AS SELECT
 1 AS `product_id`,
  1 AS `product_name`,
  1 AS `product_code`,
  1 AS `categoryName`,
  1 AS `brandName`,
  1 AS `unit`,
  1 AS `unit_price`,
  1 AS `price`,
  1 AS `qty`,
  1 AS `reorder_number`,
  1 AS `product_image` */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `tblBrands`
--

DROP TABLE IF EXISTS `tblBrands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblBrands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `brandName` varchar(200) NOT NULL,
  `desc` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `brandName` (`brandName`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblBrands`
--

LOCK TABLES `tblBrands` WRITE;
/*!40000 ALTER TABLE `tblBrands` DISABLE KEYS */;
INSERT INTO `tblBrands` VALUES (1,'ផ្សេងៗ',''),(2,'ISI',''),(3,'SCG',''),(4,'Chip-Mong',''),(5,'Hatari','');
/*!40000 ALTER TABLE `tblBrands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblCategories`
--

DROP TABLE IF EXISTS `tblCategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblCategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(250) NOT NULL,
  `desc` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblCategories`
--

LOCK TABLES `tblCategories` WRITE;
/*!40000 ALTER TABLE `tblCategories` DISABLE KEYS */;
INSERT INTO `tblCategories` VALUES (1,'លួស',''),(2,'សុីម៉ង',''),(3,'ដែក',''),(4,'ផ្លែរកាត់ដែក',''),(5,'ជក់',''),(6,'វីស',''),(7,'បំពងទីបជ័រ',''),(8,'កង់លឿង',''),(9,'រូឡូ',''),(10,'ផ្លែរស្វាន',''),(11,'កន្ត្រៃ',''),(12,'ក្បាលផ្សា',''),(13,'ស្លាបព្រាឈូសថ្នាំ',''),(14,'កង្ហាល',''),(15,'សោសូឡិច',''),(16,'អំពូលភ្លើង',''),(17,'ម៉ែត្រ',''),(18,'ធូកផ្សារ','');
/*!40000 ALTER TABLE `tblCategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblCurrency`
--

DROP TABLE IF EXISTS `tblCurrency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblCurrency` (
  `cur_id` int(11) NOT NULL AUTO_INCREMENT,
  `cur_kh` float NOT NULL,
  `cur_dollar` float NOT NULL,
  PRIMARY KEY (`cur_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblCurrency`
--

LOCK TABLES `tblCurrency` WRITE;
/*!40000 ALTER TABLE `tblCurrency` DISABLE KEYS */;
INSERT INTO `tblCurrency` VALUES (1,4150,1);
/*!40000 ALTER TABLE `tblCurrency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblCustomers`
--

DROP TABLE IF EXISTS `tblCustomers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblCustomers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customerName` varchar(100) NOT NULL,
  `phoneNumber` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblCustomers`
--

LOCK TABLES `tblCustomers` WRITE;
/*!40000 ALTER TABLE `tblCustomers` DISABLE KEYS */;
INSERT INTO `tblCustomers` VALUES (1,'General',NULL,NULL,NULL),(2,'mony','0976789501','',''),(3,'chea','0976789502','','');
/*!40000 ALTER TABLE `tblCustomers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblInvoice`
--

DROP TABLE IF EXISTS `tblInvoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblInvoice` (
  `invoice_id` int(11) NOT NULL AUTO_INCREMENT,
  `invoice_number` varchar(250) DEFAULT NULL,
  `payment_id` int(11) NOT NULL,
  `amount` float NOT NULL,
  `money_change` float NOT NULL,
  PRIMARY KEY (`invoice_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblInvoice`
--

LOCK TABLES `tblInvoice` WRITE;
/*!40000 ALTER TABLE `tblInvoice` DISABLE KEYS */;
INSERT INTO `tblInvoice` VALUES (2,'PSS202352902',3,106.5,0),(3,'PSS202352903',2,119,0.25),(4,'PSS202352904',3,100.5,0),(5,'PSS202352905',2,100,0),(6,'PSS202352906',2,2,0),(7,'PSS202352907',3,2,0);
/*!40000 ALTER TABLE `tblInvoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblPayments`
--

DROP TABLE IF EXISTS `tblPayments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblPayments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `payment_type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `payment_type` (`payment_type`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblPayments`
--

LOCK TABLES `tblPayments` WRITE;
/*!40000 ALTER TABLE `tblPayments` DISABLE KEYS */;
INSERT INTO `tblPayments` VALUES (2,'ABA'),(3,'Aceleda'),(1,'Cash');
/*!40000 ALTER TABLE `tblPayments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblProductUnits`
--

DROP TABLE IF EXISTS `tblProductUnits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblProductUnits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unit` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblProductUnits`
--

LOCK TABLES `tblProductUnits` WRITE;
/*!40000 ALTER TABLE `tblProductUnits` DISABLE KEYS */;
INSERT INTO `tblProductUnits` VALUES (1,'តោន'),(2,'ការ៉ុង'),(3,'សន្លឺក'),(4,'គីឡូ'),(5,'កញ្ចប់'),(6,'មម'),(7,'ដើម'),(8,'ដ៉ំ'),(9,'ម៉ែត្រ'),(10,'កេស'),(11,'ខាំ');
/*!40000 ALTER TABLE `tblProductUnits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblProducts`
--

DROP TABLE IF EXISTS `tblProducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblProducts` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `brand_id` int(11) DEFAULT 0,
  `sub_id` int(11) DEFAULT 0,
  `unit_id` int(11) NOT NULL DEFAULT 0,
  `product_code` varchar(100) DEFAULT NULL,
  `product_name` varchar(200) DEFAULT NULL,
  `qty` int(11) DEFAULT 0,
  `unit_price` float DEFAULT 0,
  `price` float DEFAULT 0,
  `exp_date` date DEFAULT NULL,
  `product_image` varchar(250) DEFAULT NULL,
  `desc` varchar(250) DEFAULT NULL,
  `status` int(11) DEFAULT 0,
  `reorder_number` int(11) DEFAULT 0,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `product_name` (`product_name`),
  UNIQUE KEY `product_code` (`product_code`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblProducts`
--

LOCK TABLES `tblProducts` WRITE;
/*!40000 ALTER TABLE `tblProducts` DISABLE KEYS */;
INSERT INTO `tblProducts` VALUES (1,2,0,1,1,'KC000123','K Cement',78,94,100,'2023-05-29','images/16852960914012023-05-17 00.jpg','',1,10),(2,5,0,1,7,'P000123','ជក់',105,0.25,0.5,'2023-05-29','images/16852960220812023-05-16 22.jpg','',1,10),(3,14,0,1,6,'F000123','កង្ហាល',117,6,10,'2023-05-29','images/16852960032602023-05-16 22.jpg','',1,10),(4,8,0,0,9,'0000242','កង់លឿង 8ហ៊ុន',1020,1,1.75,'2023-05-29','images/16852959917482023-05-16 22.jpg','',1,10),(5,12,0,1,8,'K000123','ខ្សែភ្លើងភ្លោះស',1021,10,13,'2023-05-29','images/16852959763982023-05-16 22.jpg','',1,10),(6,5,0,1,7,'000143','រឡោ',121,4,6,'2023-05-29','images/16852959601572023-05-16 22.jpg','',1,10),(7,3,0,1,7,'001234','ត្រចៀកធ្វារ',1024,1,2,'2023-05-29','images/16852959416982023-05-16 22.jpg','',1,10),(8,16,0,1,7,'000102','អំពូល',120,1,2,'2023-05-29','images/16852959111822023-05-16 22.jpg','',1,10),(9,1,0,1,8,'091201','លួស',126,4,6,'2023-05-29','images/16852958907812023-05-16 22.jpg','',1,10),(10,10,0,1,7,'091239','ផ្លែស្វាន',126,4,6,'2023-05-29','images/16852958694542023-05-16 22.jpg','',1,10),(11,4,0,1,7,'001243','ផ្លែរកាត់ឈើ',128,4,7,'2023-05-29','images/16852958479882023-05-16 22.jpg','',1,10),(12,1,0,1,8,'092142','លួសដុំ',129,20,35,'2023-05-29','images/16852958334562023-05-16 22.jpg','',1,10),(13,4,0,1,8,'009239','ផ្លែរកាត់ដែក​ 3.5T(HD)',33,2,4,'2023-05-29','images/16852958203522023-05-16 22.jpg','',1,10),(14,3,0,1,3,'028340','សង្ក័សី',33,1.75,2.5,'2023-05-29','images/16852957987922023-05-16 22.jpg','',1,10),(15,5,0,1,7,'923859','ជក់តូច',33,2,3,'2023-05-29','images/16852957772322023-05-16 22.jpg','',1,10),(16,2,0,1,10,'981249','ឈីរ៉ា',31,1,2,'2023-05-29','images/16852957474032023-05-16 22.jpg','',1,10),(17,7,0,0,7,'238742','ដំណទុយោ',32,2,3,'2023-05-29','images/1685295719080pipe2.jpg','',1,10),(18,4,0,1,8,'398493','ផ្លែរកាត់ដែក 3.5T',24,1.5,3,'2023-05-29','images/16852956596492023-05-16 22.jpg','',1,10),(19,2,0,1,1,'192403','Conch ',24,100,120,'2023-05-29','images/1685295640750f13.jpg','',1,10),(20,2,0,1,1,'274934','Insee-Diamond',32,100,120,'2023-05-29','images/1685295608916insee-diamond.jpg','',1,10),(21,7,0,1,7,'320959','បំពងទីបជ័រ-SCG(100)',20,12.5,17.5,'2023-05-29','images/1685295547067Tips4.jpg','',1,10);
/*!40000 ALTER TABLE `tblProducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblRoles`
--

DROP TABLE IF EXISTS `tblRoles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblRoles` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblRoles`
--

LOCK TABLES `tblRoles` WRITE;
/*!40000 ALTER TABLE `tblRoles` DISABLE KEYS */;
INSERT INTO `tblRoles` VALUES (1,'Admin'),(2,'user');
/*!40000 ALTER TABLE `tblRoles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblSaleDetails`
--

DROP TABLE IF EXISTS `tblSaleDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblSaleDetails` (
  `sale_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `qty_sales` int(11) NOT NULL,
  PRIMARY KEY (`sale_id`,`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblSaleDetails`
--

LOCK TABLES `tblSaleDetails` WRITE;
/*!40000 ALTER TABLE `tblSaleDetails` DISABLE KEYS */;
INSERT INTO `tblSaleDetails` VALUES (2,1,1),(2,2,1),(2,9,1),(3,1,1),(3,2,1),(3,3,1),(3,4,1),(3,13,1),(3,14,1),(4,1,1),(4,2,1),(5,1,1),(6,16,1),(7,8,1);
/*!40000 ALTER TABLE `tblSaleDetails` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_qty` AFTER INSERT ON `tblSaleDetails` FOR EACH ROW UPDATE tblProducts SET qty = qty-new.qty_sales WHERE product_id = new.product_id */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_sale` AFTER UPDATE ON `tblSaleDetails` FOR EACH ROW BEGIN
    UPDATE tblProducts SET tblProducts.qty = (tblProducts.qty+OLD.qty_sales)-NEW.qty_sales;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `delete_sale` AFTER DELETE ON `tblSaleDetails` FOR EACH ROW BEGIN
   UPDATE tblProducts SET tblProducts.qty = tblProducts.qty + OLD.qty_sales;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `tblSales`
--

DROP TABLE IF EXISTS `tblSales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblSales` (
  `sale_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `invoice_id` int(11) NOT NULL,
  `sale_date` date NOT NULL,
  `desc` varchar(250) NOT NULL,
  PRIMARY KEY (`sale_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblSales`
--

LOCK TABLES `tblSales` WRITE;
/*!40000 ALTER TABLE `tblSales` DISABLE KEYS */;
INSERT INTO `tblSales` VALUES (2,17,1,2,'2023-05-29',''),(3,17,2,3,'2023-05-29',''),(4,17,1,4,'2023-05-29',''),(5,17,1,5,'2023-05-29',''),(6,17,1,6,'2023-05-29',''),(7,17,1,7,'2023-05-29','');
/*!40000 ALTER TABLE `tblSales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblStatus`
--

DROP TABLE IF EXISTS `tblStatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblStatus` (
  `id` int(11) NOT NULL,
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblStatus`
--

LOCK TABLES `tblStatus` WRITE;
/*!40000 ALTER TABLE `tblStatus` DISABLE KEYS */;
INSERT INTO `tblStatus` VALUES (1,'Enable'),(2,'Disable');
/*!40000 ALTER TABLE `tblStatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblSupplies`
--

DROP TABLE IF EXISTS `tblSupplies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblSupplies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `supName` varchar(250) NOT NULL,
  `companyName` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `phone` varchar(250) NOT NULL,
  `address` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblSupplies`
--

LOCK TABLES `tblSupplies` WRITE;
/*!40000 ALTER TABLE `tblSupplies` DISABLE KEYS */;
INSERT INTO `tblSupplies` VALUES (1,'chea','','','093322432',''),(2,'sokha','','','093322433',''),(3,'ton','','','093322437','');
/*!40000 ALTER TABLE `tblSupplies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblUsers`
--

DROP TABLE IF EXISTS `tblUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblUsers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `status_id` int(11) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(250) NOT NULL,
  `email` varchar(200) DEFAULT NULL,
  `phone_number` varchar(100) DEFAULT NULL,
  `token` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblUsers`
--

LOCK TABLES `tblUsers` WRITE;
/*!40000 ALTER TABLE `tblUsers` DISABLE KEYS */;
INSERT INTO `tblUsers` VALUES (17,1,1,'mony','$2b$10$DbUFChVk.gPqVB1oqImY0OXtI2xaVkJvJLuqqty2p7/09bnALsZwy','rysarakmony6101@gmail.com','','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjE3LCJ1c2VybmFtZSI6Im1vbnkiLCJlbWFpbCI6InJ5c2FyYWttb255NjEwMUBnbWFpbC5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2ODUyOTA2MzQsImV4cCI6MTY4NTM3NzAzNH0.TNK2YfnHZuoRqF6drXA8dHE5gSrZn21Eqehsg83uq8M'),(26,1,1,'chea','$2b$10$sAImGeEb1cx0M9m4aEQLp.ly5EPpAoWPbRGC8s0CjQe1.t5CSuppu','chea@gmail.com','',NULL),(27,2,1,'dara','$2b$10$gvt6DNt3NHiVhMNfSvNAA.8hfgi.RaSLUs3G2VTu1Vc5qhApFcBrO','chea9999@gmail.com','','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjI3LCJpYXQiOjE2ODUyOTAwNjgsImV4cCI6MTY4NTI5MDI0OH0.ZbrF2qjQEeXGGtmbuhsaSxLywCcNo4kucxXcOr5bDJg');
/*!40000 ALTER TABLE `tblUsers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `v_chartdayreports`
--

DROP TABLE IF EXISTS `v_chartdayreports`;
/*!50001 DROP VIEW IF EXISTS `v_chartdayreports`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_chartdayreports` AS SELECT
 1 AS `totalAmount`,
  1 AS `Day` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_productreports`
--

DROP TABLE IF EXISTS `v_productreports`;
/*!50001 DROP VIEW IF EXISTS `v_productreports`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_productreports` AS SELECT
 1 AS `product_id`,
  1 AS `product_code`,
  1 AS `product_name`,
  1 AS `qty`,
  1 AS `unit`,
  1 AS `cost`,
  1 AS `revenue`,
  1 AS `profit` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_todaysale`
--

DROP TABLE IF EXISTS `v_todaysale`;
/*!50001 DROP VIEW IF EXISTS `v_todaysale`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_todaysale` AS SELECT
 1 AS `product_code`,
  1 AS `product_name`,
  1 AS `qty`,
  1 AS `cost`,
  1 AS `revenue`,
  1 AS `profit`,
  1 AS `sale_date` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_totalpaymenttoday`
--

DROP TABLE IF EXISTS `v_totalpaymenttoday`;
/*!50001 DROP VIEW IF EXISTS `v_totalpaymenttoday`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_totalpaymenttoday` AS SELECT
 1 AS `totalAmount`,
  1 AS `payment_type` */;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `getallproducts`
--

/*!50001 DROP VIEW IF EXISTS `getallproducts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `getallproducts` AS select `tblproducts`.`product_id` AS `product_id`,`tblproducts`.`product_name` AS `product_name`,`tblproducts`.`product_code` AS `product_code`,`tblcategories`.`categoryName` AS `categoryName`,`tblbrands`.`brandName` AS `brandName`,`tblproductunits`.`unit` AS `unit`,`tblproducts`.`unit_price` AS `unit_price`,`tblproducts`.`price` AS `price`,`tblproducts`.`qty` AS `qty`,`tblproducts`.`reorder_number` AS `reorder_number`,`tblproducts`.`product_image` AS `product_image` from (((`tblproducts` left join `tblcategories` on(`tblproducts`.`category_id` = `tblcategories`.`id`)) left join `tblbrands` on(`tblproducts`.`brand_id` = `tblbrands`.`id`)) left join `tblproductunits` on(`tblproducts`.`unit_id` = `tblproductunits`.`id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_chartdayreports`
--

/*!50001 DROP VIEW IF EXISTS `v_chartdayreports`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_chartdayreports` AS select sum(`tblinvoice`.`amount`) AS `totalAmount`,date_format(`tblsales`.`sale_date`,'%a') AS `Day` from (`tblsales` join `tblinvoice` on(`tblinvoice`.`invoice_id` = `tblsales`.`invoice_id`)) group by date_format(`tblsales`.`sale_date`,'%a') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_productreports`
--

/*!50001 DROP VIEW IF EXISTS `v_productreports`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_productreports` AS select `tblproducts`.`product_id` AS `product_id`,`tblproducts`.`product_code` AS `product_code`,`tblproducts`.`product_name` AS `product_name`,sum(`tblsaledetails`.`qty_sales`) AS `qty`,`tblproductunits`.`unit` AS `unit`,sum(`tblsaledetails`.`qty_sales`) * `tblproducts`.`unit_price` AS `cost`,sum(`tblsaledetails`.`qty_sales`) * `tblproducts`.`price` AS `revenue`,sum(`tblsaledetails`.`qty_sales`) * `tblproducts`.`price` - sum(`tblsaledetails`.`qty_sales`) * `tblproducts`.`unit_price` AS `profit` from ((`tblsaledetails` left join `tblproducts` on(`tblsaledetails`.`product_id` = `tblproducts`.`product_id`)) join `tblproductunits` on(`tblproducts`.`unit_id` = `tblproductunits`.`id`)) group by `tblsaledetails`.`product_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_todaysale`
--

/*!50001 DROP VIEW IF EXISTS `v_todaysale`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_todaysale` AS select `tblproducts`.`product_code` AS `product_code`,`tblproducts`.`product_name` AS `product_name`,concat(sum(`tblsaledetails`.`qty_sales`),' ( ',`tblproductunits`.`unit`,' ) ') AS `qty`,sum(`tblsaledetails`.`qty_sales`) * `tblproducts`.`unit_price` AS `cost`,sum(`tblsaledetails`.`qty_sales`) * `tblproducts`.`price` AS `revenue`,sum(`tblsaledetails`.`qty_sales`) * `tblproducts`.`price` - sum(`tblsaledetails`.`qty_sales`) * `tblproducts`.`unit_price` AS `profit`,curdate() AS `sale_date` from (((`tblsales` join `tblsaledetails` on(`tblsaledetails`.`sale_id` = `tblsales`.`sale_id`)) join `tblproducts` on(`tblsaledetails`.`product_id` = `tblproducts`.`product_id`)) left join `tblproductunits` on(`tblproducts`.`unit_id` = `tblproductunits`.`id`)) where `tblsales`.`sale_date` = curdate() group by `tblproducts`.`product_code` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_totalpaymenttoday`
--

/*!50001 DROP VIEW IF EXISTS `v_totalpaymenttoday`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_totalpaymenttoday` AS select sum(`tblinvoice`.`amount`) AS `totalAmount`,`tblpayments`.`payment_type` AS `payment_type` from ((`tblinvoice` join `tblsales` on(`tblsales`.`invoice_id` = `tblinvoice`.`invoice_id`)) join `tblpayments` on(`tblpayments`.`id` = `tblinvoice`.`payment_id`)) where `tblsales`.`sale_date` = curdate() group by `tblpayments`.`payment_type` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-29 11:33:59
