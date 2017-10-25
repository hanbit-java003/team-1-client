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
  `likes` int(11) DEFAULT NULL,
  `hate` int(11) DEFAULT NULL,
  `write_dt` varchar(45) DEFAULT NULL,
  `uid` varchar(45) NOT NULL,
  PRIMARY KEY (`article_id`,`rid`),
  KEY `fk_cc_article_cc_rest_idx` (`rid`),
  KEY `fk_cc_article_uid_idx` (`uid`),
  CONSTRAINT `fk_cc_article_rid` FOREIGN KEY (`rid`) REFERENCES `cc_rest` (`rid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_cc_article_uid` FOREIGN KEY (`uid`) REFERENCES `cc_member` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cc_article`
--

LOCK TABLES `cc_article` WRITE;
/*!40000 ALTER TABLE `cc_article` DISABLE KEYS */;
INSERT INTO `cc_article` VALUES (0,1,'comment','',0,0,'171009','3HgHeOlylIZR'),(0,2,'testtest',NULL,0,0,'2017-10-19 17:21:38','3HgHeOlylIZR');
/*!40000 ALTER TABLE `cc_article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cc_file`
--

DROP TABLE IF EXISTS `cc_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cc_file` (
  `file_id` varchar(100) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `content_type` varchar(100) NOT NULL,
  `content_length` bigint(20) NOT NULL,
  `file_name` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`file_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cc_file`
--

LOCK TABLES `cc_file` WRITE;
/*!40000 ALTER TABLE `cc_file` DISABLE KEYS */;
INSERT INTO `cc_file` VALUES ('art-duch-1_0_0','/hanbit2/webpack/team-1-front/src/img/insert/art-duch-1_0_0.jpg','image/jpeg',30318,'art-duch-1_0_0.jpg'),('art-guam-dolphin-cruise_5-2_0_1','/hanbit2/webpack/team-1-front/src/img/insert/art-guam-dolphin-cruise_5-2_0_1.jpg','image/jpeg',780831,'art-guam-dolphin-cruise_5-2_0_1.jpg'),('art-guam-dolphin-cruise_6-2_0_0','/hanbit2/webpack/team-1-front/src/img/insert/art-guam-dolphin-cruise_6-2_0_0.jpg','image/jpeg',777835,'art-guam-dolphin-cruise_6-2_0_0.jpg'),('art-jeju-1_0_1','/hanbit2/webpack/team-1-front/src/img/insert/art-jeju-1_0_1.jpg','image/jpeg',435717,'art-jeju-1_0_1.jpg');
/*!40000 ALTER TABLE `cc_file` ENABLE KEYS */;
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
INSERT INTO `cc_img` VALUES (0,1,0,'/api/file/art-duch-1_0_0'),(0,2,0,'/api/file/art-guam-dolphin-cruise_6-2_0_0'),(1,1,0,'/api/file/art-jeju-1_0_1'),(1,2,0,'/api/file/art-guam-dolphin-cruise_5-2_0_1');
/*!40000 ALTER TABLE `cc_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cc_member`
--

DROP TABLE IF EXISTS `cc_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cc_member` (
  `uid` varchar(200) NOT NULL,
  `email` varchar(300) NOT NULL,
  `nick` varchar(100) NOT NULL,
  `password` varchar(300) NOT NULL,
  `create_dt` varchar(45) NOT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `nick_UNIQUE` (`nick`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cc_member`
--

LOCK TABLES `cc_member` WRITE;
/*!40000 ALTER TABLE `cc_member` DISABLE KEYS */;
INSERT INTO `cc_member` VALUES ('3HgHeOlylIZR','asdf','asdf','f1f71c7547f55014e50f203cb117d005a1b85516a3988c0561d462be99dce4ae80f297f514fa2c0e','2017-10-12 15:01:24',NULL),('4Vnu0lJqziqC','1','1','682ce59dd2d6dcfaee3319cc26d98da8174fbcbe3a443992d2e53b9a779bf8e38e087d77e506f7c5','2017-10-12 15:41:30',NULL),('RGlvMjTqxGd2','JMK1234','뭉기1','c61bdb40ce6e7293b7b78ccbf84705a9b53b61c6516b76e7dcdfa87a636a6509b28523e8323e62f9','2017-10-10 09:15:13',NULL),('ZOHL4yppGlnR','jmk0629','뭉기','d3e409c25f79ab5fdb94606c98e8e7dbcf1e9921bfbe187d7786fb65c5c21efefb741d169f98852f','2017-10-10 09:12:11',NULL);
/*!40000 ALTER TABLE `cc_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cc_member_detail`
--

DROP TABLE IF EXISTS `cc_member_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cc_member_detail` (
  `uid` varchar(200) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `info` char(1) NOT NULL DEFAULT 'N',
  `avatar` varchar(200) DEFAULT NULL,
  `food` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  KEY `fk_cc_member_detail_cc_member1_idx` (`uid`),
  CONSTRAINT `fk_cc_member_detail_cc_member1` FOREIGN KEY (`uid`) REFERENCES `cc_member` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cc_member_detail`
--

LOCK TABLES `cc_member_detail` WRITE;
/*!40000 ALTER TABLE `cc_member_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `cc_member_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cc_member_detail_feat`
--

DROP TABLE IF EXISTS `cc_member_detail_feat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cc_member_detail_feat` (
  `uid` varchar(200) NOT NULL,
  `icon` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `text` varchar(45) DEFAULT NULL,
  `id` varchar(45) DEFAULT NULL,
  `eid` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  CONSTRAINT `fk_table1_cc_member_detail1` FOREIGN KEY (`uid`) REFERENCES `cc_member_detail` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cc_member_detail_feat`
--

LOCK TABLES `cc_member_detail_feat` WRITE;
/*!40000 ALTER TABLE `cc_member_detail_feat` DISABLE KEYS */;
/*!40000 ALTER TABLE `cc_member_detail_feat` ENABLE KEYS */;
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
  `price` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`,`rid`,`article_id`,`img_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cc_menu`
--

LOCK TABLES `cc_menu` WRITE;
/*!40000 ALTER TABLE `cc_menu` DISABLE KEYS */;
INSERT INTO `cc_menu` VALUES (0,1,0,0,10,10,'img0_menu0',1000),(0,1,0,1,10,10,'img1_menu0',2000),(0,2,0,0,116,93,'test',1000),(0,2,0,1,104,113,'test2',2000),(1,1,0,1,40,40,'img1_menu1',3000),(1,2,0,0,185,29,'test3',3000);
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
INSERT INTO `cc_rest` VALUES (1,37.55232,126.937588,'title',''),(2,37.55190971308509,126.93756937980652,'ㅁㄴㅇㄹ',NULL);
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
INSERT INTO `cc_tag` VALUES (0,1,0,'tag1'),(0,2,0,'test'),(1,1,0,'tag1');
/*!40000 ALTER TABLE `cc_tag` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-25 10:28:39
