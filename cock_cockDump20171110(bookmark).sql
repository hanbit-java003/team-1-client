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
  PRIMARY KEY (`aaid`,`rid`,`article_id`)
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
  PRIMARY KEY (`arid`,`rid`,`uid`)
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
INSERT INTO `cc_article` VALUES (0,0,'국물이 끝내줌',NULL,0,0,'2017-10-24 10:27:08','2XlRehENs3kP'),(0,1,'정통일본우동',NULL,0,0,'2017-10-24 11:04:00','2XlRehENs3kP'),(0,2,'순대가 맛있음',NULL,0,0,'2017-10-24 11:54:43','2XlRehENs3kP'),(0,3,'그냥 짜장은 별로',NULL,0,0,'2017-10-24 11:59:33','2XlRehENs3kP'),(0,4,'저렴하고 맛있음',NULL,0,0,'2017-10-24 12:33:22','2XlRehENs3kP'),(0,5,'내 멋대로 조합',NULL,0,0,'2017-10-24 12:37:42','2XlRehENs3kP'),(0,6,'천원 올랐지만 괜춘',NULL,0,0,'2017-10-24 12:41:00','2XlRehENs3kP'),(0,7,'달달고소',NULL,0,0,'2017-10-24 12:46:49','2XlRehENs3kP'),(0,8,'큼지막',NULL,0,0,'2017-10-24 12:51:42','2XlRehENs3kP'),(0,9,'대왕돈까스 20분 안에 먹기 도전!',NULL,0,0,'2017-10-25 10:16:11','2XlRehENs3kP'),(0,10,'저렴하고 푸짐!',NULL,0,0,'2017-10-25 10:20:31','2XlRehENs3kP'),(0,11,'점점 창렬화되가는 곳! 이곳 우동은 역대 최악! 내가 다시 시켜먹으면 개다',NULL,0,0,'2017-10-25 10:29:08','2XlRehENs3kP'),(0,12,'숙주와 버섯이 듬뿍!',NULL,0,0,'2017-10-25 15:27:46','2XlRehENs3kP'),(0,13,'저렴하면서 맛도 좋음',NULL,0,0,'2017-10-25 15:39:15','2XlRehENs3kP'),(1,4,'치즈가 많음',NULL,0,0,'2017-10-25 15:20:56','2XlRehENs3kP'),(1,6,'돈코츠보다 담백한 국물',NULL,0,0,'2017-10-25 10:47:06','2XlRehENs3kP'),(1,12,'국물이 시원',NULL,0,0,'2017-10-25 15:29:14','2XlRehENs3kP'),(1,13,'새우가 큼지막하고 달달함',NULL,0,0,'2017-10-25 15:45:09','2XlRehENs3kP'),(2,4,'함박 돈까스 새우튀김',NULL,0,0,'2017-10-25 15:24:03','2XlRehENs3kP'),(2,6,'진하게 짜게 꼬들!',NULL,0,0,'2017-10-25 15:57:33','2XlRehENs3kP'),(2,13,'괜춘',NULL,0,0,'2017-10-25 15:46:42','2XlRehENs3kP'),(3,6,'질리지 않는 맛',NULL,0,0,'2017-10-25 16:01:38','2XlRehENs3kP'),(3,13,'굿굿 ',NULL,0,0,'2017-10-25 15:51:17','2XlRehENs3kP'),(4,6,'주말에만 먹을수 있다는!',NULL,0,0,'2017-10-25 16:18:04','2XlRehENs3kP'),(5,6,'쇼유라멘은 주말에만 판다네요\n평일에는 못먹어요\n',NULL,0,0,'2017-10-26 15:20:25','75FTQ69HMRYd');
/*!40000 ALTER TABLE `cc_article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cc_bookmark`
--

DROP TABLE IF EXISTS `cc_bookmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cc_bookmark` (
  `uid` varchar(200) NOT NULL,
  `rid` int(11) NOT NULL,
  PRIMARY KEY (`rid`),
  KEY `fk_cc_bookmark_cc_member1` (`uid`),
  CONSTRAINT `fk_cc_bookmark_cc_member1` FOREIGN KEY (`uid`) REFERENCES `cc_member` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_cc_bookmark_cc_rest1` FOREIGN KEY (`rid`) REFERENCES `cc_rest` (`rid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cc_bookmark`
--

LOCK TABLES `cc_bookmark` WRITE;
/*!40000 ALTER TABLE `cc_bookmark` DISABLE KEYS */;
INSERT INTO `cc_bookmark` VALUES ('2XlRehENs3kP',0),('2XlRehENs3kP',1),('2XlRehENs3kP',2),('2XlRehENs3kP',3),('2XlRehENs3kP',4),('2XlRehENs3kP',5),('2XlRehENs3kP',6),('2XlRehENs3kP',7);
/*!40000 ALTER TABLE `cc_bookmark` ENABLE KEYS */;
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
INSERT INTO `cc_file` VALUES ('art-13167480_231126383946010_332377340_n-7_0_0','/hanbit/webpack/cock-front/src/img/insert/art-13167480_231126383946010_332377340_n-7_0_0.jpg','image/jpeg',51784,'art-13167480_231126383946010_332377340_n-7_0_0.jpg'),('art-1371529649304-1_0_0','/hanbit/webpack/cock-front/src/img/insert/art-1371529649304-1_0_0.jpg','image/jpeg',86483,'art-1371529649304-1_0_0.jpg'),('art-15112164524_df17b671bf_b-3_0_0','/hanbit/webpack/cock-front/src/img/insert/art-15112164524_df17b671bf_b-3_0_0.jpg','image/jpeg',174160,'art-15112164524_df17b671bf_b-3_0_0.jpg'),('art-17332331_724414791069542_2826375848439840768_n-12_0_0','/hanbit/webpack/cock-front/src/img/insert/art-17332331_724414791069542_2826375848439840768_n-12_0_0.jpg','image/jpeg',132569,'art-17332331_724414791069542_2826375848439840768_n-12_0_0.jpg'),('art-17495006_406986759662434_8436300506560724992_n-9_0_0','/hanbit/webpack/cock-front/src/img/insert/art-17495006_406986759662434_8436300506560724992_n-9_0_0.jpg','image/jpeg',160208,'art-17495006_406986759662434_8436300506560724992_n-9_0_0.jpg'),('art-20150930_7703-0_0_1','/hanbit/webpack/cock-front/src/img/insert/art-20150930_7703-0_0_1.jpg','image/jpeg',160788,'art-20150930_7703-0_0_1.jpg'),('art-20161124_124925-5_0_0','/hanbit/webpack/cock-front/src/img/insert/art-20161124_124925-5_0_0.jpg','image/jpeg',208997,'art-20161124_124925-5_0_0.jpg'),('art-21433801_1875732762754746_7469709578200940544_n-4_2_0','/hanbit/webpack/cock-front/src/img/insert/art-21433801_1875732762754746_7469709578200940544_n-4_2_0.jpg','image/jpeg',128322,'art-21433801_1875732762754746_7469709578200940544_n-4_2_0.jpg'),('art-21820108_1737838573176763_4845528300291883008_n-12_1_0','/hanbit/webpack/cock-front/src/img/insert/art-21820108_1737838573176763_4845528300291883008_n-12_1_0.jpg','image/jpeg',113241,'art-21820108_1737838573176763_4845528300291883008_n-12_1_0.jpg'),('art-2574B339542BE51425D55E-2_0_0','/hanbit/webpack/cock-front/src/img/insert/art-2574B339542BE51425D55E-2_0_0.jpg','image/jpeg',66810,'art-2574B339542BE51425D55E-2_0_0.jpg'),('art-3-4_1_0','/hanbit/webpack/cock-front/src/img/insert/art-3-4_1_0.jpg','image/jpeg',54604,'art-3-4_1_0.jpg'),('art-704481_1499706426339_704481_1499706375860_16454-10_0_0','/hanbit/webpack/cock-front/src/img/insert/art-704481_1499706426339_704481_1499706375860_16454-10_0_0.jpg','image/jpeg',62962,'art-704481_1499706426339_704481_1499706375860_16454-10_0_0.jpg'),('art-DAFZZXhVwAEEDtj-6_2_0','/hanbit/webpack/cock-front/src/img/insert/art-DAFZZXhVwAEEDtj-6_2_0.jpg','image/jpeg',221958,'art-DAFZZXhVwAEEDtj-6_2_0.jpg'),('art-DSC06305-8_0_0','/hanbit/webpack/cock-front/src/img/insert/art-DSC06305-8_0_0.jpg','image/jpeg',667823,'art-DSC06305-8_0_0.jpg'),('art-DSC06911-0_0_0','/hanbit/webpack/cock-front/src/img/insert/art-DSC06911-0_0_0.jpg','image/jpeg',149762,'art-DSC06911-0_0_0.jpg'),('art-gora-6_0_0','/hanbit/webpack/cock-front/src/img/insert/art-gora-6_0_0.jpg','image/jpeg',110457,'art-gora-6_0_0.jpg'),('art-goramen_03-6_5_0','/hanbit/webpack/cock-front/src/img/insert/art-goramen_03-6_5_0.jpg','image/jpeg',156486,'art-goramen_03-6_5_0.jpg'),('art-image_473994301497832864187-11_0_0','/hanbit/webpack/cock-front/src/img/insert/art-image_473994301497832864187-11_0_0.jpg','image/jpeg',305817,'art-image_473994301497832864187-11_0_0.jpg'),('art-image_4972915231481601803125-0_1_0','/hanbit/webpack/cock-front/src/img/insert/art-image_4972915231481601803125-0_1_0.jpg','image/jpeg',115220,'art-image_4972915231481601803125-0_1_0.jpg'),('art-image_4972915231481601803125-4_0_0','/hanbit/webpack/cock-front/src/img/insert/art-image_4972915231481601803125-4_0_0.jpg','image/jpeg',115220,'art-image_4972915231481601803125-4_0_0.jpg'),('art-IMG_0464-003-6_3_0','/hanbit/webpack/cock-front/src/img/insert/art-IMG_0464-003-6_3_0.jpg','image/jpeg',156486,'art-IMG_0464-003-6_3_0.jpg'),('art-IMG_6592-6_1_0','/hanbit/webpack/cock-front/src/img/insert/art-IMG_6592-6_1_0.jpg','image/jpeg',72743,'art-IMG_6592-6_1_0.jpg'),('art-IMG_6601-6_4_0','/hanbit/webpack/cock-front/src/img/insert/art-IMG_6601-6_4_0.jpg','image/jpeg',76877,'art-IMG_6601-6_4_0.jpg'),('art-IMG_8529-13_3_0','/hanbit/webpack/cock-front/src/img/insert/art-IMG_8529-13_3_0.jpg','image/jpeg',98594,'art-IMG_8529-13_3_0.jpg'),('art-IMG_8530-13_0_0','/hanbit/webpack/cock-front/src/img/insert/art-IMG_8530-13_0_0.jpg','image/jpeg',123195,'art-IMG_8530-13_0_0.jpg'),('art-IMG_8531-13_2_0','/hanbit/webpack/cock-front/src/img/insert/art-IMG_8531-13_2_0.jpg','image/jpeg',87363,'art-IMG_8531-13_2_0.jpg'),('art-IMG_8532-13_1_0','/hanbit/webpack/cock-front/src/img/insert/art-IMG_8532-13_1_0.jpg','image/jpeg',111940,'art-IMG_8532-13_1_0.jpg'),('avatar-2XlRehENs3kP','/hanbit/webpack/cock-front/src/img/avatars/2XlRehENs3kP.jpg','image/jpeg',4231,'2XlRehENs3kP.jpg'),('avatar-75FTQ69HMRYd','/hanbit/webpack/cock-front/src/img/avatars/75FTQ69HMRYd.jpg','image/jpeg',7098,'75FTQ69HMRYd.jpg');
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
INSERT INTO `cc_img` VALUES (0,0,0,'/api/file/art-DSC06911-0_0_0'),(0,1,0,'/api/file/art-1371529649304-1_0_0'),(0,2,0,'/api/file/art-2574B339542BE51425D55E-2_0_0'),(0,3,0,'/api/file/art-15112164524_df17b671bf_b-3_0_0'),(0,4,0,'/api/file/art-image_4972915231481601803125-4_0_0'),(0,4,1,'/api/file/art-3-4_1_0'),(0,4,2,'/api/file/art-21433801_1875732762754746_7469709578200940544_n-4_2_0'),(0,5,0,'/api/file/art-20161124_124925-5_0_0'),(0,6,0,'/api/file/art-gora-6_0_0'),(0,6,1,'/api/file/art-IMG_6592-6_1_0'),(0,6,2,'/api/file/art-DAFZZXhVwAEEDtj-6_2_0'),(0,6,3,'/api/file/art-IMG_0464-003-6_3_0'),(0,6,4,'/api/file/art-IMG_6601-6_4_0'),(0,6,5,'/api/file/art-goramen_03-6_5_0'),(0,7,0,'/api/file/art-13167480_231126383946010_332377340_n-7_0_0'),(0,8,0,'/api/file/art-DSC06305-8_0_0'),(0,9,0,'/api/file/art-17495006_406986759662434_8436300506560724992_n-9_0_0'),(0,10,0,'/api/file/art-704481_1499706426339_704481_1499706375860_16454-10_0_0'),(0,11,0,'/api/file/art-image_473994301497832864187-11_0_0'),(0,12,0,'/api/file/art-17332331_724414791069542_2826375848439840768_n-12_0_0'),(0,12,1,'/api/file/art-21820108_1737838573176763_4845528300291883008_n-12_1_0'),(0,13,0,'/api/file/art-IMG_8530-13_0_0'),(0,13,1,'/api/file/art-IMG_8532-13_1_0'),(0,13,2,'/api/file/art-IMG_8531-13_2_0'),(0,13,3,'/api/file/art-IMG_8529-13_3_0'),(1,0,0,'/api/file/art-20150930_7703-0_0_1');
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
INSERT INTO `cc_member` VALUES ('2XlRehENs3kP','kch3338@naver.com','마블리','4bb995e9f4a0de4cc1eb9c9a593124186be27824e5a04d7a0e3c3c21258e85011a2836c818df0a24','2017-10-24 10:21:15',NULL),('75FTQ69HMRYd','qwer@qwer.com','qwer맨','ce35282346b5ab89920b3b0df1eee77588b4634c2eb8f1234800f7e9b5c9d79fddad4d95904d5aaf','2017-10-26 11:37:27',NULL),('rwyA5DgoUnKc','jmkjmk0629@naver.com','냐옹이','da5958154b7236b86da30fbe2d929c4db25f99eed061f773697a96903867fce575e50fee1ae77052','2017-11-10 12:44:42',NULL);
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
INSERT INTO `cc_member_detail` VALUES ('2XlRehENs3kP','','N','/api/file/avatar-2XlRehENs3kP',NULL),('75FTQ69HMRYd','','N','/api/file/avatar-75FTQ69HMRYd',NULL),('rwyA5DgoUnKc','','Y',NULL,NULL);
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
INSERT INTO `cc_menu` VALUES (1,0,0,0,163,196,'차돌박이 쌀국수',7500),(1,0,0,1,124,202,'차돌 양지 쌀국수',8000),(1,1,0,0,142,151,'가케우동',3900),(1,2,0,0,181,233,'순대국',7000),(1,3,0,0,81,174,'간짜장',6500),(1,4,0,0,149,210,'오리지널 함박',6500),(1,4,1,0,94,168,'치즈 듬뿍 함박 스테이크',8000),(1,4,2,0,174,315,'모듬 세트',11000),(1,5,0,0,226,173,'야채카레',6000),(1,6,0,0,21,62,'돈코츠 라멘',7000),(1,6,1,0,32,233,'고라면',8000),(1,6,2,0,70,113,'돈코츠라멘',7000),(1,6,3,0,177,219,'돈코츠라멘',7000),(1,6,4,0,208,238,'쇼유라멘',7000),(1,6,5,0,137,134,'쇼유라멘',7000),(1,7,0,0,116,52,'크림피넛치킨',16000),(1,8,0,0,187,174,'고등어구이',8500),(1,9,0,0,219,338,'대왕돈까스',15000),(1,10,0,0,242,326,'돼지불백',6000),(1,11,0,0,203,255,'가라아게동',7000),(1,12,0,0,107,332,'갑이다짬뽕',6000),(1,12,1,0,136,317,'환상백짬뽕',7000),(1,13,0,0,231,177,'새우팟타이',6500),(1,13,1,0,92,31,'꿍팟커리(왕새우)',8500),(1,13,2,0,139,213,'새우볶음밥',6000),(1,13,3,0,133,258,'베트남 소고기 쌀국수',6500),(2,1,0,0,68,28,'니쿠우동',6500),(2,5,0,0,36,40,'돈까스 토핑',3000);
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
INSERT INTO `cc_rest` VALUES (0,37.55662605051876,126.93523351103067,'미분당 신촌2호점',NULL),(1,37.55568647486719,126.93621134385467,'마루가메제면 신촌점',NULL),(2,37.556472954982894,126.9363583624363,'구월산',NULL),(3,37.55244557889617,126.93810448050499,'홍원',NULL),(4,37.558996864846385,126.93616256117821,'함박집',NULL),(5,37.55404464761884,126.93777725100517,'거북이의주방',NULL),(6,37.555353965907464,126.93269480019808,'고라멘',NULL),(7,37.55806343215456,126.93474367260933,'크리스터치킨',NULL),(8,37.55826117627507,126.93469472229481,'고삼이',NULL),(9,37.55632942763234,126.93711005151272,'돈까스대왕전',NULL),(10,37.551452522938504,126.9373507797718,'마포돼지불백',NULL),(11,37.554631531255524,126.93834587931633,'돈부리모노 2호점',NULL),(12,37.557291587178696,126.93784967064857,'갑이다짬뽕',NULL),(13,37.5571459350951,126.94187633693218,'방콕익스프레스 신촌2호점',NULL);
/*!40000 ALTER TABLE `cc_rest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cc_rest_detail`
--

DROP TABLE IF EXISTS `cc_rest_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cc_rest_detail` (
  `rid` int(11) NOT NULL,
  `address` varchar(150) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `operating` varchar(45) DEFAULT NULL,
  `signature` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`rid`),
  CONSTRAINT `fk_cc_rest_detail_cc_rest1` FOREIGN KEY (`rid`) REFERENCES `cc_rest` (`rid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cc_rest_detail`
--

LOCK TABLES `cc_rest_detail` WRITE;
/*!40000 ALTER TABLE `cc_rest_detail` DISABLE KEYS */;
INSERT INTO `cc_rest_detail` VALUES (0,'서울특별시 서대문구 신촌동 연세로5길 26-7','02-3141-9494','11:00 ~ 15:00, 17:00 ~ 21:00','차돌 양지 쌀국수'),(1,'서울특별시 서대문구 신촌동 신촌로 87-4','02-3144-3967','오전 11:00 ~ 오후 11:30','가케우동'),(2,'서울 서대문구 신촌로 87-22','02-336-2069','00:00 - 24:00','왕순대국밥'),(3,'서울특별시 마포구 백범로 23 (신수동)','02-704-9667','11:00 - 21:00','간짜장'),(4,'서울 서대문구 연세로11길 12','02-326-5830','11:00 ~ 21:00 일요일 휴무','치즈듬뿍 함박'),(5,'서울특별시 마포구 백범로1길 8-7(노고산동, 31-50) 지하 1층','02-701-0890','오전 10:00~오후 11:30','거북이 카레'),(6,'서울특별시 마포구 노고산동 54-80','02-336-8599','12:00 ~ 21:00 월,화 휴무','고라멘'),(7,'서울특별시 서대문구 창천동 53-19','02-324-9200','16:00 - 02:00','핫치킨'),(8,'서울특별시 서대문구 창천동 53-8','02-324-1403','오전 11:00~오후 10:00','고등어구이'),(9,'서울 서대문구 연세로 10','02-393-7772','11:00 - 22:00','대왕돈까스'),(10,'서울특별시 마포구 대흥동 백범로 36','02-2604-2300','10:00 ~ 20:30 일요일 휴무','돼지불백'),(11,'서울특별시 마포구 노고산동 33-19','02-703-8231','오전 11:00~오후 10:00','유케동'),(12,'서울특별시 서대문구 신촌동 연세로4길 19','02-312-2833','오전 11:00~오후 9:00','갑이다짬뽕'),(13,'서울 서대문구 연세로2길 93-7','02-6401-7793','11:30 - 15:00, 17:30 - 22:00','뿌팟퐁커리');
/*!40000 ALTER TABLE `cc_rest_detail` ENABLE KEYS */;
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
INSERT INTO `cc_tag` VALUES (0,0,0,'쌀국수'),(0,1,0,'우동'),(0,2,0,'순대국'),(0,3,0,'중식'),(0,4,0,'함박스테이크'),(0,4,1,'함박스테이크'),(0,4,2,'함박집'),(0,5,0,'카레'),(0,6,0,'고라멘'),(0,6,1,'고라멘'),(0,6,2,'고라멘'),(0,6,3,'고라멘'),(0,6,4,'쇼유라멘'),(0,6,5,'쇼유라멘'),(0,7,0,'치킨'),(0,8,0,'고삼이'),(0,9,0,'돈까스대왕전'),(0,10,0,'돼지불백'),(0,11,0,'가라아게동'),(0,12,0,'짬뽕'),(0,12,1,'백짬뽕'),(0,13,0,'팟타이'),(0,13,1,'방콕익스프레스'),(0,13,2,'새우볶음밥'),(0,13,3,'쌀국수'),(1,0,0,'미분당'),(1,1,0,'신촌맛집'),(1,2,0,'족발'),(1,3,0,'짜장면'),(1,4,0,'신촌맛집'),(1,4,1,'신촌맛집'),(1,4,2,'신촌맛집'),(1,5,0,'신촌맛집'),(1,6,0,'라멘'),(1,6,1,'신촌맛집'),(1,6,2,'돈코츠라멘'),(1,6,3,'돈코츠라멘'),(1,6,4,'고라멘'),(1,6,5,'라멘'),(1,7,0,'신촌맛집'),(1,8,0,'신촌맛집'),(1,9,0,'신촌맛집'),(1,10,0,'신촌맛집'),(1,12,0,'갑이다짬뽕'),(1,12,1,'짬뽕'),(1,13,0,'태국음식'),(1,13,1,'태국요리'),(1,13,2,'태국요리'),(1,13,3,'방콕익스프레스'),(2,0,0,'신촌맛집'),(2,1,0,'일본우동'),(2,2,0,'보쌈'),(2,3,0,'신촌맛집'),(2,6,0,'신촌맛집'),(2,6,1,'일본라멘'),(2,6,2,'신촌맛집'),(2,6,3,'일본라멘'),(2,6,4,'신촌맛집'),(2,6,5,'고라멘'),(2,7,0,'크림피넛치킨'),(2,8,0,'생선구이'),(2,9,0,'대왕돈까스'),(2,10,0,'서강대맛집'),(2,12,0,'신촌맛집'),(2,12,1,'갑이다짬뽕'),(2,13,0,'방콕익스프레스'),(2,13,1,'꿍팟커리'),(2,13,2,'방콕익스프레스'),(2,13,3,'신촌맛집'),(3,2,0,'구월산'),(3,6,0,'돈코츠라멘'),(3,6,3,'신촌맛집'),(3,12,1,'신촌맛집'),(3,13,0,'신촌맛집'),(3,13,2,'신촌맛집'),(4,2,0,'신촌맛집');
/*!40000 ALTER TABLE `cc_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emblem`
--

DROP TABLE IF EXISTS `emblem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emblem` (
  `name` varchar(100) NOT NULL,
  `img` varchar(150) NOT NULL,
  `how_achieve` varchar(300) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emblem`
--

LOCK TABLES `emblem` WRITE;
/*!40000 ALTER TABLE `emblem` DISABLE KEYS */;
INSERT INTO `emblem` VALUES ('article100','../img/emblem/moon.png','100 그릇 식사를 하셨습니다.'),('noodle','../img/emblem/noodle.png','면 요리를 엄청 좋아하시나 봐요.'),('rest100','../img/emblem/star.png','식당 100개를 입력하셨습니다.'),('signin','../img/emblem/confetti.png','회원가입을 축하합니다.');
/*!40000 ALTER TABLE `emblem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emblem_achive`
--

DROP TABLE IF EXISTS `emblem_achive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emblem_achive` (
  `uid` varchar(200) NOT NULL,
  `emblem_name` varchar(100) NOT NULL,
  PRIMARY KEY (`uid`),
  KEY `fk_member-emblem_table11_idx` (`emblem_name`),
  CONSTRAINT `fk_member-emblem_cc_member1` FOREIGN KEY (`uid`) REFERENCES `cc_member` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_member-emblem_table11` FOREIGN KEY (`emblem_name`) REFERENCES `emblem` (`name`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emblem_achive`
--

LOCK TABLES `emblem_achive` WRITE;
/*!40000 ALTER TABLE `emblem_achive` DISABLE KEYS */;
INSERT INTO `emblem_achive` VALUES ('2XlRehENs3kP','signin');
/*!40000 ALTER TABLE `emblem_achive` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emblem_member`
--

DROP TABLE IF EXISTS `emblem_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emblem_member` (
  `uid` varchar(200) NOT NULL,
  `regist_rest` int(11) DEFAULT '0',
  `regist_article` int(11) DEFAULT '0',
  `eat_noodle` int(11) DEFAULT '0',
  PRIMARY KEY (`uid`),
  CONSTRAINT `fk_member_achive_cc_member1` FOREIGN KEY (`uid`) REFERENCES `cc_member` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emblem_member`
--

LOCK TABLES `emblem_member` WRITE;
/*!40000 ALTER TABLE `emblem_member` DISABLE KEYS */;
INSERT INTO `emblem_member` VALUES ('2XlRehENs3kP',0,0,0);
/*!40000 ALTER TABLE `emblem_member` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-10 15:46:05
