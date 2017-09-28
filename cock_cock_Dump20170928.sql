-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: cock_cock
-- ------------------------------------------------------
-- Server version	5.7.18-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cc_alert_article`
--

DROP TABLE IF EXISTS `cc_alert_article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cc_alert_article` (
  `aaid` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `uid` varchar(45) NOT NULL,
  `report` varchar(100) NOT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`aaid`),
  KEY `fk_cc_alert_article_cc_article1_idx` (`article_id`,`rid`),
  CONSTRAINT `fk_cc_alert_article_cc_article1` FOREIGN KEY (`article_id`, `rid`) REFERENCES `cc_article` (`article_id`, `rid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cc_alert_article`
--

LOCK TABLES `cc_alert_article` WRITE;
/*!40000 ALTER TABLE `cc_alert_article` DISABLE KEYS */;
/*!40000 ALTER TABLE `cc_alert_article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cc_alert_rest`
--

DROP TABLE IF EXISTS `cc_alert_rest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cc_alert_rest` (
  `arid` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  `uid` varchar(100) NOT NULL,
  `report` varchar(100) NOT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`arid`),
  KEY `fk_cc_alert_rest_cc_rest1_idx` (`rid`),
  CONSTRAINT `fk_cc_alert_rest_cc_rest1` FOREIGN KEY (`rid`) REFERENCES `cc_rest` (`rid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cc_alert_rest`
--

LOCK TABLES `cc_alert_rest` WRITE;
/*!40000 ALTER TABLE `cc_alert_rest` DISABLE KEYS */;
/*!40000 ALTER TABLE `cc_alert_rest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cc_article`
--

DROP TABLE IF EXISTS `cc_article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cc_article` (
  `article_id` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  `comment` varchar(500) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `like` int(11) DEFAULT NULL,
  `hate` int(11) DEFAULT NULL,
  `write_dt` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`article_id`,`rid`),
  KEY `fk_cc_article_cc_rest_idx` (`rid`),
  CONSTRAINT `fk_cc_article_rid` FOREIGN KEY (`rid`) REFERENCES `cc_rest` (`rid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cc_article`
--

LOCK TABLES `cc_article` WRITE;
/*!40000 ALTER TABLE `cc_article` DISABLE KEYS */;
/*!40000 ALTER TABLE `cc_article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cc_img`
--

DROP TABLE IF EXISTS `cc_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cc_img` (
  `img_id` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `path` varchar(150) NOT NULL,
  PRIMARY KEY (`img_id`,`rid`,`article_id`),
  KEY `fk_cc_img_cc_article1_idx` (`article_id`,`rid`),
  CONSTRAINT `fk_cc_img_cc_article1` FOREIGN KEY (`article_id`, `rid`) REFERENCES `cc_article` (`article_id`, `rid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cc_img`
--

LOCK TABLES `cc_img` WRITE;
/*!40000 ALTER TABLE `cc_img` DISABLE KEYS */;
/*!40000 ALTER TABLE `cc_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cc_menu`
--

DROP TABLE IF EXISTS `cc_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cc_menu` (
  `id` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `img_id` int(11) NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  `menu` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cc_menu`
--

LOCK TABLES `cc_menu` WRITE;
/*!40000 ALTER TABLE `cc_menu` DISABLE KEYS */;
/*!40000 ALTER TABLE `cc_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cc_rest`
--

DROP TABLE IF EXISTS `cc_rest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cc_rest` (
  `rid` int(11) NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `name` varchar(45) NOT NULL,
  `status` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`rid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cc_rest`
--

LOCK TABLES `cc_rest` WRITE;
/*!40000 ALTER TABLE `cc_rest` DISABLE KEYS */;
/*!40000 ALTER TABLE `cc_rest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cc_tag`
--

DROP TABLE IF EXISTS `cc_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cc_tag` (
  `tag_id` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `tag` varchar(45) NOT NULL,
  PRIMARY KEY (`tag_id`,`rid`,`article_id`),
  KEY `fk_cc_tag_cc_article1_idx` (`article_id`,`rid`),
  CONSTRAINT `fk_cc_tag_cc_article1` FOREIGN KEY (`article_id`, `rid`) REFERENCES `cc_article` (`article_id`, `rid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cc_tag`
--

LOCK TABLES `cc_tag` WRITE;
/*!40000 ALTER TABLE `cc_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `cc_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'cock_cock'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-09-28 16:44:26
