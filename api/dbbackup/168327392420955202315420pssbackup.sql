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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblBrands`
--

LOCK TABLES `tblBrands` WRITE;
/*!40000 ALTER TABLE `tblBrands` DISABLE KEYS */;
INSERT INTO `tblBrands` VALUES (6,'Others',''),(7,'s',''),(8,'a',''),(9,'c',''),(10,'fc','');
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblCategories`
--

LOCK TABLES `tblCategories` WRITE;
/*!40000 ALTER TABLE `tblCategories` DISABLE KEYS */;
INSERT INTO `tblCategories` VALUES (1,' ស៊ីម៉ងត៍',''),(2,'ក្ដាបន្ទះពេជ្រ សរ',''),(3,'ផ្លែរកាត់ដែក',''),(4,'ខ្សែរភ្លើងស',''),(5,'កង្ហាល',''),(6,'ទុលវីស',''),(7,'វីស',''),(8,'បំពងទីមជ័រ',''),(10,'ដែកគោល',''),(11,'ផ្លែរស្វានដែក',''),(12,'ក្រដាស់ខាត',''),(13,'ម៉ែត្រ',''),(14,'កង់លឿង',''),(15,'រូឡូ',''),(16,'ខាតច្រេស',''),(17,'កន្ត្រៃ','');
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
  `id` int(11) NOT NULL,
  `customerName` varchar(100) NOT NULL,
  `phoneNumber` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblCustomers`
--

LOCK TABLES `tblCustomers` WRITE;
/*!40000 ALTER TABLE `tblCustomers` DISABLE KEYS */;
INSERT INTO `tblCustomers` VALUES (1,'General\r\n','','',''),(47,'banana','097678950','',''),(60,'mony','0976789500','',''),(61,'Ton','0976789501','',''),(62,'Kids','0976789502','',''),(63,'monyw','097678950s','','59');
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
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblInvoice`
--

LOCK TABLES `tblInvoice` WRITE;
/*!40000 ALTER TABLE `tblInvoice` DISABLE KEYS */;
INSERT INTO `tblInvoice` VALUES (2,'PSS202342802',1,15.5,0),(3,'PSS202342803',1,15,0),(13,'PSS2023428013',1,12,0),(14,'PSS2023428014',1,15,0),(15,'PSS2023428015',1,15.5,0),(16,'PSS2023428016',1,67.5,0),(17,'PSS2023429017',1,3,0),(18,'PSS2023429018',1,0.5,0),(19,'PSS2023429019',2,5,0),(20,'PSS2023429020',1,3,0),(21,'PSS2023429021',1,0.5,0),(22,'PSS2023429022',1,5,0),(23,'PSS2023429023',1,5,0),(24,'PSS2023429024',2,5,0),(25,'PSS2023429025',1,0.5,0),(26,'PSS2023429026',1,3,0),(27,'PSS2023429027',1,5.5,0),(28,'PSS2023429028',2,5,0),(29,'PSS2023429029',2,5,0),(30,'PSS2023429030',1,8.5,0),(31,'PSS2023429031',1,67,0),(32,'PSS2023429032',1,78.5,0),(33,'PSS2023429033',2,93.5,0),(34,'PSS2023429034',1,93.5,0),(35,'PSS2023430035',1,6,0),(36,'PSS2023430036',2,93.5,0),(37,'PSS2023430037',1,8.5,0),(38,'PSS2023430038',1,50,41.5),(39,'PSS2023430039',1,50,14.5),(40,'PSS2023430040',1,10.5,0),(41,'PSS2023430041',1,93.5,0),(42,'PSS202352042',1,3,0),(43,'PSS202352043',2,3,0),(44,'PSS202352044',2,8.5,0),(45,'PSS202352045',1,15,0),(46,'PSS202352046',1,20,0),(47,'PSS202352047',1,0.5,0),(48,'PSS202352048',1,5,0),(49,'PSS202352049',1,20,0),(50,'PSS202352050',1,0.5,0),(51,'PSS202352051',1,0.5,0),(52,'PSS202352052',1,3,0),(53,'PSS202352053',1,15,0),(54,'PSS202352054',1,20,0),(55,'PSS202352055',1,10,0),(56,'PSS202352056',1,20,0),(57,'PSS202352057',2,30,0),(58,'PSS202352058',1,20,0),(59,'PSS202352059',2,0.5,0),(60,'PSS202352060',2,0.5,0),(61,'PSS202353061',2,93.5,0),(62,'PSS202353062',1,102.5,0),(63,'PSS202353063',1,199,0),(64,'PSS202355064',2,20.5,0),(65,'PSS202355065',2,8.5,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblPayments`
--

LOCK TABLES `tblPayments` WRITE;
/*!40000 ALTER TABLE `tblPayments` DISABLE KEYS */;
INSERT INTO `tblPayments` VALUES (2,'ABA'),(1,'Cash');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblProductUnits`
--

LOCK TABLES `tblProductUnits` WRITE;
/*!40000 ALTER TABLE `tblProductUnits` DISABLE KEYS */;
INSERT INTO `tblProductUnits` VALUES (2,'កញ្ជប់'),(3,'សន្លឹក'),(4,'គ្រាប់'),(5,'កញ្ចប់'),(6,'ក្រាម');
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblProducts`
--

LOCK TABLES `tblProducts` WRITE;
/*!40000 ALTER TABLE `tblProducts` DISABLE KEYS */;
INSERT INTO `tblProducts` VALUES (1,1,1,1,3,'000123','K Cement',184,4.75,5,'2023-05-03','images/1682133524872AB-Type-GB-Cement-White-Top.jpg','',1,10),(4,3,0,0,3,'0000001','ផ្លែរកាត់ដែក 1T',626,0.19,0.5,'2023-04-26','images/168249558994420230422103437_[fpdl.jpg','',1,20),(5,3,0,0,3,'000002',' ផ្លែរកាត់ដែក​​ 3.5T',115,1.72,3,'2023-04-26','images/1682495598953brand-beer.png','',1,5),(15,1,6,0,3,'942859','Apple',113,8,15,'2023-04-29','images/1682705730062520320.jpg','',1,10),(16,1,6,0,2,'0923984','Book',130,9,20,'2023-04-29','images/1682705771383AGRI-PIPE-2.png','',1,100),(17,1,6,0,2,'897382','Car',123,10,20,'2023-04-29','images/1682705804245purple-3-d0a31859.jpeg','',1,100),(18,2,6,0,2,'093759','Door',8,10,10,'2023-04-30','images/1682839005446AB-Type-GB-Cement-White-Top.jpg','',1,10),(19,1,6,0,3,'82375','Flag',220,10,20,'2023-04-30','images/1682839022220pipe.jpeg','',1,10);
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
INSERT INTO `tblSaleDetails` VALUES (2,1,1),(2,3,1),(2,4,1),(2,5,1),(3,1,1),(3,3,1),(3,5,1),(13,1,1),(14,1,1),(15,1,1),(16,4,1),(17,5,1),(18,1,1),(18,4,1),(19,1,1),(20,1,1),(21,1,1),(21,4,1),(21,5,1),(22,1,1),(22,4,2),(22,5,2),(22,15,1),(22,16,1),(22,17,1),(23,1,1),(23,4,1),(23,5,1),(23,16,1),(23,17,1),(23,18,1),(23,19,1),(24,1,1),(24,4,1),(24,5,1),(24,15,1),(24,16,1),(24,17,1),(24,18,1),(24,19,1),(25,1,1),(25,4,1),(25,5,1),(25,15,1),(25,16,1),(25,17,1),(25,18,1),(25,19,1),(26,1,1),(26,4,2),(27,1,1),(27,4,1),(27,5,1),(27,15,1),(27,16,1),(27,17,1),(27,18,1),(27,19,1),(28,1,1),(28,4,1),(28,5,1),(29,1,1),(29,4,1),(29,5,1),(30,1,1),(30,4,1),(30,15,2),(31,1,2),(31,4,1),(32,1,1),(32,4,1),(32,5,1),(32,15,1),(32,16,1),(32,17,1),(32,18,1),(32,19,1),(33,5,1),(34,5,1),(35,1,1),(35,4,1),(35,5,1),(36,15,1),(37,19,1),(38,4,1),(39,1,1),(40,17,1),(41,4,1),(42,4,1),(43,5,1),(44,15,1),(45,17,1),(46,18,1),(47,17,1),(48,15,2),(49,17,1),(50,4,1),(51,4,1),(52,1,1),(52,4,1),(52,5,1),(52,15,1),(52,16,1),(52,17,1),(52,18,1),(52,19,1),(53,1,2),(53,4,3),(53,5,2),(53,15,1),(53,16,1),(53,17,1),(53,18,1),(53,19,1),(54,1,2),(54,4,4),(54,5,4),(54,15,3),(54,16,1),(54,17,4),(54,18,1),(54,19,1),(55,1,1),(55,4,1),(55,15,1),(56,1,1),(56,4,1),(56,5,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblSales`
--

LOCK TABLES `tblSales` WRITE;
/*!40000 ALTER TABLE `tblSales` DISABLE KEYS */;
INSERT INTO `tblSales` VALUES (2,17,43,2,'2023-04-28',''),(3,17,43,12,'2023-04-28',''),(13,17,1,22,'2023-04-29',''),(14,17,1,23,'2023-04-29',''),(15,17,1,24,'2023-04-29',''),(16,17,1,25,'2023-04-29',''),(17,17,1,26,'2023-04-29',''),(18,17,1,27,'2023-04-29',''),(19,17,1,28,'2023-04-29',''),(20,17,1,29,'2023-04-29',''),(21,17,1,30,'2023-04-29',''),(22,17,1,31,'2023-04-29',''),(23,17,1,32,'2023-04-29',''),(24,17,1,33,'2023-04-29',''),(25,17,1,34,'2023-04-29',''),(26,17,1,35,'2023-04-30',''),(27,17,1,36,'2023-04-30',''),(28,17,55,37,'2023-04-30',''),(29,17,1,38,'2023-04-30',''),(30,17,1,39,'2023-04-30',''),(31,17,1,40,'2023-04-30',''),(32,17,1,41,'2023-04-30',''),(33,17,1,42,'2023-05-02',''),(34,17,1,43,'2023-05-02',''),(35,17,1,44,'2023-05-02',''),(36,17,1,45,'2023-05-02',''),(37,17,1,46,'2023-05-02',''),(38,17,1,47,'2023-05-02',''),(39,17,1,48,'2023-05-02',''),(40,17,1,49,'2023-05-02',''),(41,17,1,50,'2023-05-02',''),(42,17,1,51,'2023-05-02',''),(43,17,1,52,'2023-05-02',''),(44,17,1,53,'2023-05-02',''),(45,17,1,54,'2023-05-02',''),(46,17,1,55,'2023-05-02',''),(47,17,1,56,'2023-05-02',''),(48,17,1,57,'2023-05-02',''),(49,17,1,58,'2023-05-02',''),(50,17,1,59,'2023-05-02',''),(51,17,1,60,'2023-05-02',''),(52,17,1,61,'2023-05-03',''),(53,17,1,62,'2023-05-03',''),(54,17,1,63,'2023-05-03',''),(55,17,1,64,'2023-05-05',''),(56,17,1,65,'2023-05-05','');
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
INSERT INTO `tblStatus` VALUES (1,'enable'),(2,'disable');
/*!40000 ALTER TABLE `tblStatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblSupplies`
--

DROP TABLE IF EXISTS `tblSupplies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblSupplies` (
  `id` int(11) NOT NULL,
  `supName` varchar(250) NOT NULL,
  `companyName` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `phone` varchar(250) NOT NULL,
  `address` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblSupplies`
--

LOCK TABLES `tblSupplies` WRITE;
/*!40000 ALTER TABLE `tblSupplies` DISABLE KEYS */;
INSERT INTO `tblSupplies` VALUES (1,'mony','','','093225344',''),(2,'chea','','','093845050','');
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblUsers`
--

LOCK TABLES `tblUsers` WRITE;
/*!40000 ALTER TABLE `tblUsers` DISABLE KEYS */;
INSERT INTO `tblUsers` VALUES (17,1,1,'mony','$2b$10$WPf/.3yxA52Dx3fFFh3B.OFgKG0.UATz.RU9Zx2xcYAgPDrw6c/L.','','','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjE3LCJ1c2VybmFtZSI6Im1vbnkiLCJlbWFpbCI6IiIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY4MzI3MDM5NiwiZXhwIjoxNjgzMzU2Nzk2fQ.NaXaxnB9zYpg_1THfhLQgEPavZMM1trkBkFiemLe0-s'),(26,1,1,'chea','$2b$10$orn/fFbKdBwEDcuh7FtxmuLK106zcK1/IilQyRCocAsAuKRGtsQOS','chea@gmail.com','',NULL);
/*!40000 ALTER TABLE `tblUsers` ENABLE KEYS */;
UNLOCK TABLES;

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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-05 15:04:20
