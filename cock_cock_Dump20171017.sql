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
INSERT INTO `cc_file` VALUES ('avatar-78Vg3aGWjegY','/hanbit/webpack/cock-front/src/img/avatars/78Vg3aGWjegY.jpg','image/jpeg',6909,'78Vg3aGWjegY.jpg'),('avatar-l848n4EFj6qq','/hanbit/webpack/cock-front/src/img/avatars/l848n4EFj6qq.jpg','image/jpeg',5181,'l848n4EFj6qq.jpg'),('avatar-RGlvMjTqxGd2','/hanbit/webpack/cock-front/src/img/avatars/RGlvMjTqxGd2.jpg','image/jpeg',4830,'RGlvMjTqxGd2.jpg'),('avatar-vWAZe5ymb7re','/hanbit/webpack/cock-front/src/img/avatars/vWAZe5ymb7re.jpg','image/jpeg',6909,'vWAZe5ymb7re.jpg'),('avatar-xjQEFYzSvsPd','/hanbit/webpack/cock-front/src/img/avatars/xjQEFYzSvsPd.jpg','image/jpeg',4830,'xjQEFYzSvsPd.jpg'),('avatar-ZOHL4yppGlnR','/hanbit/webpack/cock-front/src/img/avatars/ZOHL4yppGlnR.jpg','image/jpeg',6758,'ZOHL4yppGlnR.jpg');
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
INSERT INTO `cc_member` VALUES ('9WEpybUxfmUb','jmkjmk0629@naver.com','문기','c6a22b552c8caee36382dd1dc93b36ba049583b47d31bffa86eee003297a091d2390e4d29811ac2b','2017-10-16 12:31:01',NULL),('bulmzBAM3pUd','qwer@naver.com','메롱입니다아','c9080c3e16575642ac7cd00f801e5a2d1cbbf17b794ea1638457c6436fd5bac1a56dcff031c786e7','2017-10-16 12:37:25',NULL),('cPylL5Onjtth','jmk0629','바보','d8b7250b26e9ad7065fec24714f59e7299c7e0155da0e7e23b338a17c34f596c6c882d69d46d3e53','2017-10-13 09:53:15',NULL),('fejb1aeCIrdl','43242@yahoo.co.kr','안녕하세요','46ec7c2ad9665371bf179f93e30ccf89d410e4de0eb1e0f6dc9ec546ad701ee11dfbf26dcb878f42','2017-10-16 09:35:14',NULL),('TyHu9EL27akR','jmk0629@naver.co.kr','121','96d1e3a3647187307e45ab55da8c89fb7c26fbbc4a10697d36ebc559b0a8cdf3138f06ae74789cc0','2017-10-16 10:16:12',NULL),('vWAZe5ymb7re','jmk0629@naver.com','dsadsa','382bd14fcdbda9a0a2abd72b829727ee00ce8f3a3657477510010e47b214a33031737c2a5936c42b','2017-10-16 09:21:00',NULL),('WOkBFCzXwcWM','jmk0629@naver.co.kk','111','cb1f611d15967b65d2263568135b4494a83869a4548cedebb5f1cb0c5d7d10565293744e09ef7809','2017-10-16 10:18:06',NULL),('ZYtv6jaaFRiP','11111dsa@naver.com','11','9e7444e19524d65aa04cc28baca0944b0b9f9b1aebb4025aeed02c06d2c62341d3b51980e6256e21','2017-10-16 12:27:06',NULL);
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
INSERT INTO `cc_member_detail` VALUES ('vWAZe5ymb7re','','Y','/api/file/avatar-vWAZe5ymb7re',NULL);
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-17  9:11:07
