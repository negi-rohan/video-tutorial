-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.5.50


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema tutorialsdb
--

CREATE DATABASE IF NOT EXISTS tutorialsdb;
USE tutorialsdb;

--
-- Definition of table `answers`
--

DROP TABLE IF EXISTS `answers`;
CREATE TABLE `answers` (
  `id` int(70) unsigned NOT NULL AUTO_INCREMENT,
  `questionId` int(70) unsigned NOT NULL,
  `answerText` text NOT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  `ansKey` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=530 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `answers`
--

/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
INSERT INTO `answers` (`id`,`questionId`,`answerText`,`isDeleted`,`ansKey`) VALUES 
 (1,1,'<p>1 and 2 only</p>',0,'a'),
 (2,1,'<p> 4 only</p>',0,'b'),
 (3,6,'opt1',0,'a'),
 (4,7,'opt2',0,'a'),
 (5,15,'<p>option 3.1</p>',0,'a'),
 (6,15,'<p>option 3.2</p>',0,'b'),
 (7,16,'<p>option 4.1</p>',0,'a'),
 (8,16,'<p>option 4.2</p>',0,'b'),
 (9,1,'<p>option 3</p>',1,NULL),
 (12,6,'<p>opt2</p>',0,'b'),
 (14,7,'<p>opt3</p>',0,'b'),
 (16,1,'<p> 2 and 4 only</p>',0,'c'),
 (17,1,'<p> 1, 2, 3 and 4 only</p>',0,'d'),
 (18,20,'<p>1 and 2 only</p>',0,'a'),
 (19,20,'<p> 2, 3 and 4 only</p>',0,'b'),
 (20,20,'<p> 1, 2 and 3</p>',0,'c'),
 (21,20,'<p> 1, 2, 3 and 4</p>',0,'d'),
 (22,21,'<p>1 Only</p>',0,'a'),
 (23,21,'<p>1 and 3 Only</p>',0,'b'),
 (24,21,'<p>1, 2 and 3</p>',0,'c'),
 (25,21,'<p>None of the above</p>',0,'d'),
 (115,44,'<p>Coromandal</p>',0,'a'),
 (116,44,'<p>Karnataka Coast</p>',0,'b'),
 (117,44,'<p>Malabar</p>',0,'c'),
 (118,44,'<p>Konkan</p>',0,'d'),
 (119,45,'<p>Andhra Pradesh</p>',0,'a'),
 (120,45,'<p>Assam</p>',0,'b'),
 (121,45,'<p>Uttar Pradesh</p>',0,'c'),
 (122,45,'<p>Karnataka</p>',0,'d'),
 (123,46,'<p>1</p>',0,'a'),
 (124,46,'<p>2</p>',0,'b'),
 (125,46,'<p>3</p>',0,'c'),
 (126,47,'<p>Coromandal</p>',0,'d'),
 (127,47,'<p>Karnataka Coast</p>',0,'a'),
 (128,47,'<p>Malabar</p>',0,'b'),
 (129,47,'<p>Konkan</p>',0,'c'),
 (130,48,'<p>Andhra Pradesh</p>',0,'d'),
 (131,48,'<p>Assam</p>',0,'a'),
 (132,48,'<p>Uttar Pradesh</p>',0,'b'),
 (133,48,'<p>Karnataka</p>',0,'c'),
 (134,49,'<p>Movement by Justice Party under E.V Ramaswamy for separate country for Tamils.</p>',0,'d'),
 (135,49,'<p>Nationalist movement against autocratic rule in princely states</p>',0,'a'),
 (136,49,'<p>Nationalist movement against repression by British to collect revenue in Bengal at the time of drought.</p>',0,'b'),
 (137,49,'<p>Movement against Brahmin domination in Malabar region.</p>',0,'c'),
 (138,50,'<p>Andhra Pradesh</p>',0,'d'),
 (139,50,'<p>Assam</p>',0,'a'),
 (140,50,'<p>Uttar Pradesh</p>',0,'b'),
 (141,50,'<p>Karnataka</p>',0,'c'),
 (142,51,'<p>Provide free LPG Connection to women below poverty line</p>',0,'d'),
 (143,51,'<p>Electrify all rural villages having a population of over 2500 by 2020</p>',0,'a'),
 (144,51,'<p>Support Higher education of Girl child by providing a monetary allowance after 18 years of age.</p>',0,'b'),
 (145,51,'<p>Provide free primary education to girl child and increase female literacy</p>',0,'c'),
 (146,52,'<p>d)         3              4              2              1</p>',0,'d'),
 (147,52,'<p>a)         1              2              4              3</p>',0,'a'),
 (148,52,'<p>b)         1              4              2              3</p>',0,'b'),
 (149,52,'<p>c)         3              2              4              1</p>',0,'c'),
 (150,53,'<p>All of the above</p>',0,'d'),
 (151,53,'<p>1 only</p>',0,'a'),
 (152,53,'<p>2 only</p>',0,'b'),
 (153,53,'<p>1 and 2 only</p>',0,'c'),
 (154,54,'<p>1, 2, 3 and 4</p>',0,'d'),
 (155,54,'<p>1 and 2 only</p>',0,'a'),
 (156,54,'<p>1, 3 and 4 only</p>',0,'b'),
 (157,54,'<p>1, 2 and 4 only</p>',0,'c'),
 (158,55,'<p>Alauddin Khilji</p>',0,'d'),
 (159,55,'<p>Shamsudin Illtumish</p>',0,'a'),
 (160,55,'<p>Qutubdin Aibak</p>',0,'b'),
 (161,55,'<p>Ghiyassudin Balban</p>',0,'c'),
 (162,56,'<p>1, 2 and 3</p>',0,'d'),
 (163,56,'<p>1 and 2 only</p>',0,'a'),
 (164,56,'<p>2 and 3 only</p>',0,'b'),
 (165,56,'<p>2 only</p>',0,'c'),
 (166,57,'<p>2, 3 and 5 only</p>',0,'d'),
 (167,57,'<p>1, 2, 3 and 4 only</p>',0,'a'),
 (168,57,'<p>2, 3, 4 and 5 only</p>',0,'b'),
 (169,57,'<p>1, 3 and 5 only</p>',0,'c'),
 (170,58,'<p>1 and 4 only</p>',0,'d'),
 (171,58,'<p>1 and 3 only</p>',0,'a'),
 (172,58,'<p>2 and 4 only</p>',0,'b'),
 (173,58,'<p>3 and 4 only</p>',0,'c'),
 (174,59,'<p>1, 2 and 3</p>',0,'d'),
 (175,59,'<p>1 and 2 only</p>',0,'a'),
 (176,59,'<p>2 and 3 only</p>',0,'b'),
 (177,59,'<p>1 and 3 only</p>',0,'c'),
 (178,60,'<p>1, 2 and 3</p>',0,'d'),
 (179,60,'<p>3 only</p>',0,'a'),
 (180,60,'<p>1 and 2 only</p>',0,'b'),
 (181,60,'<p>2 and 3 only</p>',0,'c'),
 (182,61,'<p>Neither 1 nor 2</p>',0,'d'),
 (183,61,'<p>1 only</p>',0,'a'),
 (184,61,'<p>2 only</p>',0,'b'),
 (185,61,'<p>Both 1 and 2</p>',0,'c'),
 (186,62,'<p>1, 2, 3 and 5 only</p>',0,'d'),
 (187,62,'<p>1, 3, 4 and 5 only</p>',0,'a'),
 (188,62,'<p>2 and 3 only</p>',0,'b'),
 (189,62,'<p>1, 2, 4 and 5 only</p>',0,'c'),
 (190,63,'<p>Neither 1 nor 2</p>',0,'d'),
 (191,63,'<p>1 only</p>',0,'a'),
 (192,63,'<p>2 only</p>',0,'b'),
 (193,63,'<p>Both 1 and 2</p>',0,'c'),
 (194,64,'<p>) 1, 2 and 3</p>',0,'d'),
 (195,64,'<p>) 1 only</p>',0,'a'),
 (196,64,'<p>1 and 3 only</p>',0,'b'),
 (197,64,'<p>2 and 3 only</p>',0,'c'),
 (198,65,'<p>1, 2 and 3</p>',0,'d'),
 (199,65,'<p>1 and 3 only</p>',0,'a'),
 (200,65,'<p>1 and 2 only</p>',0,'b'),
 (201,65,'<p>) 2 and 3 only</p>',0,'c'),
 (202,66,'<p>2 and 3 only</p>',0,'d'),
 (203,66,'<p>1 and 2 only</p>',0,'a'),
 (204,66,'<p>) 1, 2 and 4 only</p>',0,'b'),
 (205,66,'<p>1, 3 and 4 only</p>',0,'c'),
 (206,67,'<p>1, 2 and 3</p>',0,'d'),
 (207,67,'<p>1 and 3 only</p>',0,'a'),
 (208,67,'<p>1 and 2 only</p>',0,'b'),
 (209,67,'<p>2 and 3 only</p>',0,'c'),
 (210,68,'<p>1, 2 and 4 only</p>',0,'d'),
 (211,68,'<p>1, 2 and 3 only</p>',0,'a'),
 (212,68,'<p>2, 3 and 4 only</p>',0,'b'),
 (213,68,'<p>1 and 3 only</p>',0,'c'),
 (214,69,'<p>) Russia</p>',0,'d'),
 (215,69,'<p>China</p>',0,'a'),
 (216,69,'<p>) United States of America</p>',0,'b'),
 (217,69,'<p>India</p>',0,'c'),
 (218,70,'<p>1, 2, 3 and 4</p>',0,'d'),
 (219,70,'<p>1 and 4 only</p>',0,'a'),
 (220,70,'<p>2 and 4 only</p>',0,'b'),
 (221,70,'<p>1, 2 and 3 only</p>',0,'c'),
 (222,71,'<p>Neither 1 nor 2</p>',0,'d'),
 (223,71,'<p>Both 1 and 2</p>',0,'a'),
 (224,71,'<p>1 only</p>',0,'b'),
 (225,71,'<p>2 only</p>',0,'c'),
 (226,72,'<p>Reprieve</p>',0,'d'),
 (227,72,'<p>Commutation</p>',0,'a'),
 (228,72,'<p>Remission</p>',0,'b'),
 (229,72,'<p>Respite</p>',0,'c'),
 (230,73,'<p>Neither 1 nor 2</p>',0,'d'),
 (231,73,'<p>1 only</p>',0,'a'),
 (232,73,'<p>2 only</p>',0,'b'),
 (233,73,'<p>) Both 1 and 2</p>',0,'c'),
 (234,74,'<p>France</p>',0,'d'),
 (235,74,'<p>European Union</p>',0,'a'),
 (236,74,'<p>) Japan</p>',0,'b'),
 (237,74,'<p>United States</p>',0,'c'),
 (238,75,'<p>Muhammad Shah</p>',0,'d'),
 (239,75,'<p>Aurangzeb</p>',0,'a'),
 (240,75,'<p>Ahmad Shah</p>',0,'b'),
 (241,75,'<p>Bahadur Shah</p>',0,'c'),
 (242,76,'<p>Tanjore Painting</p>',0,'d'),
 (243,76,'<p>Kalamkari</p>',0,'a'),
 (244,76,'<p>) Phulkari</p>',0,'b'),
 (245,76,'<p>Zardozi</p>',0,'c'),
 (246,77,'<p>1, 2 and 3</p>',0,'d'),
 (247,77,'<p>1 and 2 only</p>',0,'a'),
 (248,77,'<p>2 and 3 only</p>',0,'b'),
 (249,77,'<p>1 and 3 only</p>',0,'c'),
 (250,78,'<p>) 1, 2 and 3</p>',0,'d'),
 (251,78,'<p>1 only</p>',0,'a'),
 (252,78,'<p>1 and 2 only</p>',0,'b'),
 (253,78,'<p>2 and 3 only</p>',0,'c'),
 (254,79,'<p>) 1, 2 and 3</p>',0,'d'),
 (255,79,'<p>1 and 2 only</p>',0,'a'),
 (256,79,'<p>2 and 3 only</p>',0,'b'),
 (257,79,'<p>1 and 3 only</p>',0,'c'),
 (258,80,'<p>) 1, 2 and 3</p>',0,'d'),
 (259,80,'<p>1 and 2 only</p>',0,'a'),
 (260,80,'<p>2 and 3 only</p>',0,'b'),
 (261,80,'<p>1 and 3 only</p>',0,'c'),
 (262,81,'<p>Neither 1 nor 2</p>',0,'d'),
 (263,81,'<p>1 only</p>',0,'a'),
 (264,81,'<p>2 only</p>',0,'b'),
 (265,81,'<p>Both 1 and 2</p>',0,'c'),
 (266,82,'<p>Neither 1 nor 2</p>',0,'d'),
 (267,82,'<p>1 only</p>',0,'a'),
 (268,82,'<p>) 2 only</p>',0,'b'),
 (269,82,'<p>Both 1 and 2</p>',0,'c'),
 (270,83,'<p>) All of the above</p>',0,'d'),
 (271,83,'<p>1 and 2 only</p>',0,'a'),
 (272,83,'<p>) 3 only</p>',0,'b'),
 (273,83,'<p>1 and 3 only</p>',0,'c'),
 (274,84,'<p>1, 3 and 4 only</p>',0,'d'),
 (275,84,'<p>1, 2 and 4 only</p>',0,'a'),
 (276,84,'<p>) 2, 3 and 4 only</p>',0,'b'),
 (277,84,'<p>4 only</p>',0,'c'),
 (278,85,'<p>) 4 only</p>',0,'d'),
 (279,85,'<p>1 and 4 only</p>',0,'a'),
 (280,85,'<p>, 2 and 4 only</p>',0,'b'),
 (281,85,'<p>) 2 and 3 only</p>',0,'c'),
 (282,86,'<p>Integrated Scheme of Oilseeds, Pulses, Oil Palm and Maize</p>',0,'d'),
 (283,86,'<p>Bringing Green Revolution to Eastern India</p>',0,'a'),
 (284,86,'<p>National Mission for Protein Supplements</p>',0,'b'),
 (285,86,'<p>Saffron Mission</p>',0,'c'),
 (286,87,'<p>Neither 1 nor 2</p>',0,'d'),
 (287,87,'<p>) 1 only</p>',0,'a'),
 (288,87,'<p>2 only</p>',0,'b'),
 (289,87,'<p>) Both 1 and 2</p>',0,'c'),
 (290,88,'<p>Neither 1 nor 2</p>',0,'d'),
 (291,88,'<p>1 only</p>',0,'a'),
 (292,88,'<p>2 only</p>',0,'b'),
 (293,88,'<p>Both 1 and 2</p>',0,'c'),
 (294,89,'<p>Neither 1 nor 2</p>',0,'d'),
 (295,89,'<p>) 1 only</p>',0,'a'),
 (296,89,'<p>2 only</p>',0,'b'),
 (297,89,'<p>Both 1 and 2</p>',0,'c'),
 (298,90,'<p>None of the above</p>',0,'d'),
 (299,90,'<p>1, 2 and 3</p>',0,'a'),
 (300,90,'<p>) 1 only</p>',0,'b'),
 (301,90,'<p>) 1 and 3 only</p>',0,'c'),
 (302,91,'<p>) 1 and 4 only</p>',0,'d'),
 (303,91,'<p>1 and 3 only</p>',0,'a'),
 (304,91,'<p>) 2 and 3 only</p>',0,'b'),
 (305,91,'<p>2 and 4 only</p>',0,'c'),
 (306,92,'<p>d) Buddhism preaches truth as being multi faceted and ever changing.</p>',0,'d'),
 (307,92,'<p>a) Charvaka is a materialistic philosophy and is often known as the philosophy of the masses</p>',0,'a'),
 (308,92,'<p>b) Sankhya School explains the creation of the world by a Param Brahma</p>',0,'b'),
 (309,92,'<p>c) Jainas accept Vedas as religious documents that contain ultimate truth</p>',0,'c'),
 (310,93,'<p>4 only</p>',0,'d'),
 (311,93,'<p>1 and 4 only</p>',0,'a'),
 (312,93,'<p>2, 3 and 4 only</p>',0,'b'),
 (313,93,'<p>) 1, 2, 3 and 4</p>',0,'c'),
 (314,94,'<p>Neither 1 nor 2</p>',0,'d'),
 (315,94,'<p>1 only</p>',0,'a'),
 (316,94,'<p>2 only</p>',0,'b'),
 (317,94,'<p>) Both are correct</p>',0,'c'),
 (318,95,'<p>) 1, 2, 3 and 4</p>',0,'d'),
 (319,95,'<p>) 1 and 2 only</p>',0,'a'),
 (320,95,'<p>1, 2 and 3 only</p>',0,'b'),
 (321,95,'<p>) 1, 3 and 4 only</p>',0,'c'),
 (322,96,'<p>1, 2, 3 and 4</p>',0,'d'),
 (323,96,'<p>3 and 4 only</p>',0,'a'),
 (324,96,'<p>2, 3 and 4 only</p>',0,'b'),
 (325,96,'<p>) 1, 2 and 3 only</p>',0,'c'),
 (326,97,'<p>Neither 1 nor 2</p>',0,'d'),
 (327,97,'<p>1 only</p>',0,'a'),
 (328,97,'<p>2 only</p>',0,'b'),
 (329,97,'<p>Both 1 and 2</p>',0,'c'),
 (330,98,'<p>) Neither 1 nor 2</p>',0,'d'),
 (331,98,'<p>1 only</p>',0,'a'),
 (332,98,'<p>2 only</p>',0,'b'),
 (333,98,'<p>Both 1 and 2</p>',0,'c'),
 (334,99,'<p>1, 2 and 3</p>',0,'d'),
 (335,99,'<p>) 1 and 2 only</p>',0,'a'),
 (336,99,'<p>2 only</p>',0,'b'),
 (337,99,'<p>) 2 and 3 only</p>',0,'c'),
 (338,100,'<p>Measures taken by G-33 countries in WTO</p>',0,'d'),
 (339,100,'<p>Drug Pricing Policy</p>',0,'a'),
 (340,100,'<p>Ranking of higher education institutions</p>',0,'b'),
 (341,100,'<p>) List of countries with weak Intellectual Property Rights</p>',0,'c'),
 (342,101,'<p>India</p>',0,'d'),
 (343,101,'<p>China</p>',0,'a'),
 (344,101,'<p>Brazil</p>',0,'b'),
 (345,101,'<p>Zermany</p>',0,'c'),
 (346,102,'<p>1, 2 and 3</p>',0,'d'),
 (347,102,'<p>1 and 2 only</p>',0,'a'),
 (348,102,'<p>2 and 3 only</p>',0,'b'),
 (349,102,'<p>1 and 3 only</p>',0,'c'),
 (350,103,'<p>1, 2 and 3</p>',0,'d'),
 (351,103,'<p>1 and 2 only</p>',0,'a'),
 (352,103,'<p>) 2 and 3 only</p>',0,'b'),
 (353,103,'<p>) 1 and 3 only</p>',0,'c'),
 (354,104,'<p>1, 2 and 3</p>',0,'d'),
 (355,104,'<p>) 1 only</p>',0,'a'),
 (356,104,'<p>3 only</p>',0,'b'),
 (357,104,'<p>) 1 and 3 only</p>',0,'c'),
 (358,105,'<p>Right to form co-operatives</p>',0,'d'),
 (359,105,'<p>) Right to freedom of religion</p>',0,'a'),
 (360,105,'<p>) Right to Constitutional remedies</p>',0,'b'),
 (361,105,'<p>) Right Against Untouchability</p>',0,'c'),
 (362,106,'<p>Neither 1 nor 2</p>',0,'d'),
 (363,106,'<p>1 only</p>',0,'a'),
 (364,106,'<p>2 only</p>',0,'b'),
 (365,106,'<p>Both 1 and 2</p>',0,'c'),
 (366,107,'<p>) Moving to a low carbon growth trajectory.</p>',0,'d'),
 (367,107,'<p>Planting Tress across the entire stretch of National Highways</p>',0,'a'),
 (368,107,'<p>) Using Plastic waste and bottles to pave roads</p>',0,'b'),
 (369,107,'<p>Creating a comprehensive framework for minority education</p>',0,'c'),
 (370,108,'<p>1, 2 and 3</p>',0,'d'),
 (371,108,'<p>1 only</p>',0,'a'),
 (372,108,'<p>1 and 2 only</p>',0,'b'),
 (373,108,'<p>1 and 3 only</p>',0,'c'),
 (374,109,'<p>3 only</p>',0,'d'),
 (375,109,'<p>)  1 only</p>',0,'a'),
 (376,109,'<p>)  1 and 2 only</p>',0,'b'),
 (377,109,'<p>2 only</p>',0,'c'),
 (378,110,'<p>Commercial Agriculture</p>',0,'d'),
 (379,110,'<p>a) Nomadic Herding</p>',0,'a'),
 (380,110,'<p>Livestock Ranching</p>',0,'b'),
 (381,110,'<p>Intensive Subsistence Agriculture</p>',0,'c'),
 (382,111,'<p>None of the Above</p>',0,'d'),
 (383,111,'<p>1 only</p>',0,'a'),
 (384,111,'<p>) 2 only</p>',0,'b'),
 (385,111,'<p>Both 1 and 2</p>',0,'c'),
 (386,112,'<p>1, 2 and 3</p>',0,'d'),
 (387,112,'<p>1 and 2 only</p>',0,'a'),
 (388,112,'<p>3 only</p>',0,'b'),
 (389,112,'<p>2 and 3 only</p>',0,'c'),
 (390,113,'<p>1, 2, 3 and 4</p>',0,'d'),
 (391,113,'<p>1, 3 and 4 only</p>',0,'a'),
 (392,113,'<p>, 3 and 4 only</p>',0,'b'),
 (393,113,'<p>) 1, 2 and 3 only</p>',0,'c'),
 (394,114,'<p>None of the above</p>',0,'d'),
 (395,114,'<p>1 and 2 only</p>',0,'a'),
 (396,114,'<p>) 2 and 3 only</p>',0,'b'),
 (397,114,'<p>) 1, 2 and 3 only</p>',0,'c'),
 (398,115,'<p>Neither 1 nor 2</p>',0,'d'),
 (399,115,'<p>) 1 only</p>',0,'a'),
 (400,115,'<p>2 only</p>',0,'b'),
 (401,115,'<p>Both 1 and 2</p>',0,'c'),
 (402,116,'<p>)  Neither 1 nor 2</p>',0,'d'),
 (403,116,'<p>)   1 only</p>',0,'a'),
 (404,116,'<p>)   2 only</p>',0,'b'),
 (405,116,'<p>)   Both 1 and 2</p>',0,'c'),
 (406,117,'<p>) Neither 1 nor 2</p>',0,'d'),
 (407,117,'<p>) 1 only</p>',0,'a'),
 (408,117,'<p>) 2 only</p>',0,'b'),
 (409,117,'<p>Both 1 and 2</p>',0,'c'),
 (410,118,'<p>1, 2, 3 and 4</p>',0,'d'),
 (411,118,'<p>1 and 3 only</p>',0,'a'),
 (412,118,'<p>1, 3 and 4 only</p>',0,'b'),
 (413,118,'<p>3 and 4 only</p>',0,'c'),
 (414,119,'<p>All of the Above are benefits of Cloud Computing</p>',0,'d'),
 (415,119,'<p>Cloud computing provides optimum use of resources</p>',0,'a'),
 (416,119,'<p>Cloud computing provides higher degree of privacy and security over conventional methods</p>',0,'b'),
 (417,119,'<p>Cloud Computing reduces the cost of infrastructure for end users</p>',0,'c'),
 (418,120,'<p>) There is an excess of foreign exchange reserves in the economy leading to excess money supply</p>',0,'d'),
 (419,120,'<p>People want to hold only cash because prices are falling everyday</p>',0,'a'),
 (420,120,'<p>People want to hold only cash because there is too much of liquidity in the economy</p>',0,'b'),
 (421,120,'<p>) The rate of interest is so low that no one wants to hold interest bearing assets and people wants to hold cash</p>',0,'c'),
 (422,121,'<p>Only 2 and 3</p>',0,'d'),
 (423,121,'<p>Only 1</p>',0,'a'),
 (424,121,'<p>)   Only 1 and 2</p>',0,'b'),
 (425,121,'<p>Only 1 and 3</p>',0,'c'),
 (426,122,'<p>1, 2, 3 and 4</p>',0,'d'),
 (427,122,'<p>) 1 and 2  only</p>',0,'a'),
 (428,122,'<p>1, 3 and 4 only</p>',0,'b'),
 (429,122,'<p>) 1, 2 and 3 only</p>',0,'c'),
 (430,123,'<p>2 and 4 only</p>',0,'d'),
 (431,123,'<p>1 and 2 only</p>',0,'a'),
 (432,123,'<p>1, 2 and 3 only</p>',0,'b'),
 (433,123,'<p>2 only</p>',0,'c'),
 (434,124,'<p>Neither 1 nor 2</p>',0,'d'),
 (435,124,'<p>1 only</p>',0,'a'),
 (436,124,'<p>)  2 only</p>',0,'b'),
 (437,124,'<p>Both 1 and 2</p>',0,'c'),
 (438,125,'<p>Neither 1 nor 2</p>',0,'d'),
 (439,125,'<p>1 only</p>',0,'a'),
 (440,125,'<p>2 only</p>',0,'b'),
 (441,125,'<p>Both 1 and 2</p>',0,'c'),
 (442,126,'<p>None of the above</p>',0,'d'),
 (443,126,'<p>1 and 2 only</p>',0,'a'),
 (444,126,'<p>2 and 3 only</p>',0,'b'),
 (445,126,'<p>3 only</p>',0,'c'),
 (446,127,'<p>) None of the above</p>',0,'d'),
 (447,127,'<p>1 and 3 only</p>',0,'a'),
 (448,127,'<p>) 1 only</p>',0,'b'),
 (449,127,'<p>3 only</p>',0,'c'),
 (450,128,'<p>2 and 4 only</p>',0,'d'),
 (451,128,'<p>1, 2 and 4 only</p>',0,'a'),
 (452,128,'<p>2, 3 and 4 only</p>',0,'b'),
 (453,128,'<p>3 and 4 only</p>',0,'c'),
 (454,129,'<p>)   1, 2 and 3</p>',0,'d'),
 (455,129,'<p>)   1 only</p>',0,'a'),
 (456,129,'<p>2 only</p>',0,'b'),
 (457,129,'<p>3 only</p>',0,'c'),
 (458,130,'<p>) 1, 2, 3 and 4 only</p>',0,'d'),
 (459,130,'<p>1, 2 and 3 only</p>',0,'a'),
 (460,130,'<p>1, 2 and 4 only</p>',0,'b'),
 (461,130,'<p>) 1, 3 and 4 only</p>',0,'c'),
 (462,131,'<p>2, 3 and 4 only</p>',0,'d'),
 (463,131,'<p>) 1, 2 and 3 only</p>',0,'a'),
 (464,131,'<p>1, 3 and 4 only</p>',0,'b'),
 (465,131,'<p>1, 2, 3 and 4</p>',0,'c'),
 (466,132,'<p>) Ceiling on holdings</p>',0,'d'),
 (467,132,'<p>Wealth Tax</p>',0,'a'),
 (468,132,'<p>Cash transfer to poor</p>',0,'b'),
 (469,132,'<p>Capital Gains Tax</p>',0,'c'),
 (470,133,'<p>The President cannot compel the Prime Minister to give the information he has.</p>',0,'d'),
 (471,133,'<p>It is the duty of the Prime Minister to communicate all decisions of the Council of Ministers to the President; whenever he requires</p>',0,'a'),
 (472,133,'<p>The Prime Minister need not communicate all decisions to the President.</p>',0,'b'),
 (473,133,'<p>It is not obligatory on the part of Prime Minister to communicate the decision to the President.</p>',0,'c'),
 (474,134,'<p>1, 2 and 3 only</p>',0,'d'),
 (475,134,'<p>1 and 2 only</p>',0,'a'),
 (476,134,'<p>3 and 4 only</p>',0,'b'),
 (477,134,'<p>) 1, 2 and 4 only</p>',0,'c'),
 (478,135,'<p>) 1 and 2 only</p>',0,'d'),
 (479,135,'<p>2 only</p>',0,'a'),
 (480,135,'<p>1 and 3 only</p>',0,'b'),
 (481,135,'<p>) 1, 2 and 3</p>',0,'c'),
 (482,136,'<p>) 2, 3 and 4 only</p>',0,'d'),
 (483,136,'<p>1, 2 and 3 only</p>',0,'a'),
 (484,136,'<p>1, 2 and 4 only</p>',0,'b'),
 (485,136,'<p>) 1, 3 and 4 only</p>',0,'c'),
 (486,137,'<p>) 1, 2 and 3</p>',0,'d'),
 (487,137,'<p>1 only</p>',0,'a'),
 (488,137,'<p>1 and 3 only</p>',0,'b'),
 (489,137,'<p>1 and 2 only</p>',0,'c'),
 (490,138,'<p>) 1, 2 and 3</p>',0,'d'),
 (491,138,'<p>3 only</p>',0,'a'),
 (492,138,'<p>1 and 2 only</p>',0,'b'),
 (493,138,'<p>2 and 3 only</p>',0,'c'),
 (494,139,'<p>A working population that must support a larger number of dependents.</p>',0,'d'),
 (495,139,'<p>Increasing returns to natural resources, with a direct impact on average food consumption</p>',0,'a'),
 (496,139,'<p>Increased urbanisation and congestion</p>',0,'b'),
 (497,139,'<p>A higher labour force growth rate and higher unemployment</p>',0,'c'),
 (498,140,'<p>Bhutan</p>',0,'d'),
 (499,140,'<p>Japan</p>',0,'a'),
 (500,140,'<p>China</p>',0,'b'),
 (501,140,'<p>Europe</p>',0,'c'),
 (502,141,'<p>) 1, 2 and 3 only</p>',0,'d'),
 (503,141,'<p>1 only</p>',0,'a'),
 (504,141,'<p>1 and 2 only</p>',0,'b'),
 (505,141,'<p>) 2 only</p>',0,'c'),
 (506,142,'<p>)   1, 2, 3 and 4</p>',0,'d'),
 (507,142,'<p>)   Only 1 and 2</p>',0,'a'),
 (508,142,'<p>Only 2 and 3</p>',0,'b'),
 (509,142,'<p>Only 1, 2 and 4</p>',0,'c'),
 (510,143,'<p>Neither 1 nor 2</p>',0,'a'),
 (511,143,'<p>1 only</p>',0,'b'),
 (512,143,'<p>2 only</p>',0,'c'),
 (513,143,'<p>Both 1 and 2</p>',0,'d'),
 (514,144,'<p>Reservoirs</p>',0,'d'),
 (515,144,'<p>a) Mangroves</p>',0,'a'),
 (516,144,'<p>Paddy Fields</p>',0,'b'),
 (517,144,'<p>) Lakes</p>',0,'c'),
 (518,145,'<p>) None of the above</p>',0,'a'),
 (519,145,'<p>1 only</p>',0,'b'),
 (520,145,'<p>2 only</p>',0,'c'),
 (521,145,'<p>Both 1 and 2</p>',0,'d'),
 (522,146,'<p>For election to the Village Panchayat, a candidate must be 21 years of age</p>',0,'d'),
 (523,146,'<p>) It consists of members elected by the Gram Sabha from amongst themselves</p>',0,'a'),
 (524,146,'<p>If a member of the scheduled Caste and a women member are not elected to it, the government itself nominates them</p>',0,'b'),
 (525,146,'<p>For election to the Village Panchayat, a candidate need not be a resident of the same village but his name should be in the voter’s list.</p>',0,'c'),
 (526,147,'<p>None of the above</p>',0,'a'),
 (527,147,'<p>) 1 and 2 only</p>',0,'b'),
 (528,147,'<p>1 and 3 only</p>',0,'c'),
 (529,147,'<p>) 2 and 3 only</p>',0,'d');
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;


--
-- Definition of table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(70) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` (`id`,`name`) VALUES 
 (1,'Categoyr1'),
 (2,'Category2'),
 (3,'Category3'),
 (4,'Category4'),
 (5,'Category 5'),
 (6,'Category 6'),
 (7,'Category 7');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;


--
-- Definition of table `course_subscription`
--

DROP TABLE IF EXISTS `course_subscription`;
CREATE TABLE `course_subscription` (
  `id` int(70) unsigned NOT NULL AUTO_INCREMENT,
  `courseId` int(70) unsigned NOT NULL,
  `userId` int(70) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `course_subscription`
--

/*!40000 ALTER TABLE `course_subscription` DISABLE KEYS */;
INSERT INTO `course_subscription` (`id`,`courseId`,`userId`) VALUES 
 (3,11,8),
 (4,11,8);
/*!40000 ALTER TABLE `course_subscription` ENABLE KEYS */;


--
-- Definition of table `course_unit_lesson_r`
--

DROP TABLE IF EXISTS `course_unit_lesson_r`;
CREATE TABLE `course_unit_lesson_r` (
  `id` int(70) unsigned NOT NULL AUTO_INCREMENT,
  `courseId` int(70) unsigned NOT NULL,
  `unitId` int(70) unsigned NOT NULL,
  `lessonId` int(70) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `course_unit_lesson_r`
--

/*!40000 ALTER TABLE `course_unit_lesson_r` DISABLE KEYS */;
INSERT INTO `course_unit_lesson_r` (`id`,`courseId`,`unitId`,`lessonId`) VALUES 
 (1,7,2,1),
 (2,7,2,2),
 (3,6,3,3),
 (4,11,28,4),
 (5,11,28,5);
/*!40000 ALTER TABLE `course_unit_lesson_r` ENABLE KEYS */;


--
-- Definition of table `courses`
--

DROP TABLE IF EXISTS `courses`;
CREATE TABLE `courses` (
  `id` int(70) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `demoVideo` varchar(255) DEFAULT NULL,
  `duration` int(10) unsigned DEFAULT NULL,
  `color_code` varchar(45) DEFAULT NULL,
  `subscriptionFee` varchar(45) DEFAULT NULL,
  `filePath` varchar(255) DEFAULT NULL,
  `categoryId` int(10) unsigned DEFAULT NULL,
  `fileName` varchar(100) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  `demoPoster` varchar(255) DEFAULT NULL,
  `validTo` varchar(45) DEFAULT NULL,
  `shortDescription` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `courses`
--

/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` (`id`,`name`,`description`,`demoVideo`,`duration`,`color_code`,`subscriptionFee`,`filePath`,`categoryId`,`fileName`,`isDeleted`,`demoPoster`,`validTo`,`shortDescription`) VALUES 
 (2,'Current Affairs','National and internation news','rtmp://s3lejcc6sgsgde.cloudfront.net/cfx/st/Sequence-01.mp4',10,'#D9EDF7','100','http://localhost:3000\\filesPath\\f-UapplpSqxb7U2MiOu2mQsP.pdf',1,'Node.js Design Patterns - Casciaro, Mario [PDF][StormRG].pdf',0,'https://s3-ap-southeast-1.amazonaws.com/flavido-encodes/rising/2nd+May.jpg','2016-09-19T18:30:00.000Z',NULL),
 (5,'Gk','GK','http://d38mgtvgmsvii9.cloudfront.net/rising/3MayCurrAff/3MayCurrAff.m3u8',20,'#F2DEDE','200','',2,'',0,'https://s3-ap-southeast-1.amazonaws.com/flavido-encodes/rising/3rd+May.jpg','',NULL),
 (6,'History','This course will be taken by Tariq Anwar. It will be 24 hour course covering Ancient India, Modern India, World History and India Since Independence','http://d38mgtvgmsvii9.cloudfront.net/rising/4JulyRisingCurrAff-Rev1/4JulyRisingCurrAff-Rev1.m3u8',10,'#20898C','150','',0,'',0,'http://i.imgur.com/t1nI8bJ.jpg','',NULL),
 (7,'Civil','<p>This is a course on General knowledge for Civil Services Examination 2017. People preparing for the exam need to register for the course.</p><p>Course Schedule:</p><p>Class 1 : 1st August</p><p>Class 2 : 2nd August</p><p>Classes till Novemeber</p>','//www.youtube.com/v/ylLzyHk54Z0',30,'#F092B0','300','',3,'',0,'null','',NULL),
 (11,'Economics','Economics world wide','',NULL,'#B2D3BA',NULL,'',3,'',0,NULL,NULL,NULL),
 (12,'GK Optional','as asd asd adsad',NULL,NULL,NULL,'12','',NULL,'',0,NULL,NULL,NULL),
 (13,'qweqwe','zcsxcce wr werwe rew wer we',NULL,NULL,NULL,'12','',NULL,'',0,NULL,NULL,NULL),
 (14,'qwewqewq','dksvj fewfj fjf wef kjwf',NULL,NULL,NULL,'12','',NULL,'',0,NULL,NULL,NULL),
 (15,'HG sdf','jnjmnmn.jn.n.n.n',NULL,NULL,NULL,'78','',NULL,'',0,NULL,NULL,NULL);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;


--
-- Definition of table `courses_instructor`
--

DROP TABLE IF EXISTS `courses_instructor`;
CREATE TABLE `courses_instructor` (
  `id` int(70) unsigned NOT NULL AUTO_INCREMENT,
  `courseId` int(70) unsigned NOT NULL,
  `userId` int(70) unsigned NOT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_index` (`userId`,`courseId`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `courses_instructor`
--

/*!40000 ALTER TABLE `courses_instructor` DISABLE KEYS */;
INSERT INTO `courses_instructor` (`id`,`courseId`,`userId`,`isDeleted`) VALUES 
 (13,2,8,0),
 (14,2,7,0),
 (39,7,8,0),
 (40,8,10,0),
 (41,9,10,0),
 (42,10,10,0),
 (49,11,10,0),
 (65,5,10,0);
/*!40000 ALTER TABLE `courses_instructor` ENABLE KEYS */;


--
-- Definition of table `lesson_comments`
--

DROP TABLE IF EXISTS `lesson_comments`;
CREATE TABLE `lesson_comments` (
  `id` int(70) unsigned NOT NULL AUTO_INCREMENT,
  `lessonId` int(70) unsigned NOT NULL,
  `comments` varchar(255) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` int(10) unsigned NOT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lesson_comments`
--

/*!40000 ALTER TABLE `lesson_comments` DISABLE KEYS */;
INSERT INTO `lesson_comments` (`id`,`lessonId`,`comments`,`timestamp`,`userId`,`isDeleted`) VALUES 
 (1,1,'qwer tyu iop','2016-06-29 17:05:41',8,0),
 (2,1,'asasd adasdsad asdsadsa asdasdsad','2016-06-29 17:05:41',9,0),
 (3,1,'fxvtfbdfbf fgb vfbgcvb gf','2016-06-29 17:05:41',8,0),
 (4,1,'qwere dgh hjkmj','2016-06-29 17:47:11',9,0),
 (5,1,'This is good','2016-06-29 17:57:19',8,0),
 (6,1,'Thats good','2016-06-29 18:59:13',8,0),
 (8,2,'sgfsdgd','2016-06-30 01:07:00',8,0),
 (9,1,'Just like that','2016-06-30 13:12:44',8,0),
 (10,1,'just for fun','2016-06-30 13:18:17',8,0),
 (11,1,'its fun','2016-07-05 14:53:42',9,0),
 (12,4,'sfsdf','2016-08-04 14:23:44',8,0);
/*!40000 ALTER TABLE `lesson_comments` ENABLE KEYS */;


--
-- Definition of table `lesson_files`
--

DROP TABLE IF EXISTS `lesson_files`;
CREATE TABLE `lesson_files` (
  `id` int(70) unsigned NOT NULL AUTO_INCREMENT,
  `lessonId` int(70) unsigned NOT NULL,
  `filePath` varchar(255) NOT NULL,
  `fileName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lesson_files`
--

/*!40000 ALTER TABLE `lesson_files` DISABLE KEYS */;
INSERT INTO `lesson_files` (`id`,`lessonId`,`filePath`,`fileName`) VALUES 
 (1,1,'text.txt','text.txt'),
 (2,1,'pdffile.pdf','pdffile.pdf'),
 (3,3,'text1.pdf','text1.pdf'),
 (4,2,'http://localhost:3000\\filesPath\\2Xw-5z8rIPi1XXnHDkNyFgM9.pdf','Node.js Design Patterns - Casciaro, Mario [PDF][StormRG].pdf'),
 (5,2,'http://localhost:3000\\filesPath\\SfLpxqqD-JLNAAcvnM0DJ_6x.pdf','Node.js Recipes - Cory Gackenheimer.pdf');
/*!40000 ALTER TABLE `lesson_files` ENABLE KEYS */;


--
-- Definition of table `lessons`
--

DROP TABLE IF EXISTS `lessons`;
CREATE TABLE `lessons` (
  `id` int(70) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `video` varchar(255) DEFAULT NULL,
  `air_date` varchar(20) DEFAULT NULL,
  `duration` int(100) unsigned DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  `poster` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lessons`
--

/*!40000 ALTER TABLE `lessons` DISABLE KEYS */;
INSERT INTO `lessons` (`id`,`name`,`description`,`video`,`air_date`,`duration`,`isDeleted`,`poster`) VALUES 
 (1,'lesson1 of 1','this is the lesson 1','http://d38mgtvgmsvii9.cloudfront.net/rising/4JulyRisingCurrAff-Rev1/4JulyRisingCurrAff-Rev1.m3u8',NULL,10,0,'http://i.imgur.com/t1nI8bJ.jpg'),
 (2,'lesson2','This is the lesson 2','//www.youtube.com/v/ylLzyHk54Z0',NULL,10,0,'https://s3-ap-southeast-1.amazonaws.com/flavido-encodes/rising/2nd+May.jpg'),
 (3,'lesson3','This is the lesson 3',NULL,NULL,10,0,NULL),
 (4,'Lesson4','Lesson number 4','Video link',NULL,14,0,NULL),
 (5,'Class 1','Description',NULL,NULL,12,0,NULL);
/*!40000 ALTER TABLE `lessons` ENABLE KEYS */;


--
-- Definition of table `payment_details`
--

DROP TABLE IF EXISTS `payment_details`;
CREATE TABLE `payment_details` (
  `id` int(70) unsigned NOT NULL AUTO_INCREMENT,
  `payment_request_id` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `purpose` varchar(40) DEFAULT NULL,
  `amount` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `userId` int(70) unsigned DEFAULT NULL,
  `courseId` int(70) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `payment_details`
--

/*!40000 ALTER TABLE `payment_details` DISABLE KEYS */;
INSERT INTO `payment_details` (`id`,`payment_request_id`,`phone`,`purpose`,`amount`,`email`,`fullName`,`userId`,`courseId`) VALUES 
 (7,'fcae0d9e73c44b1d9af333b2ae01f380','9900015910','Subscription: Udit Negi for Gk','200','negi.udit@gmail.com','Udit Negi',8,5),
 (8,'365ff08b333b47178bc7936aab0ebf7b','9900015910','Subscription: Udit Negi for Gk','200','negi.udit@gmail.com','Udit Negi',8,5),
 (9,'06e6a62653bc4471bb88e59e2833ff5e','9900015910','Subscription: Udit Negi for Gk','200','negi.udit@gmail.com','Udit Negi',8,5),
 (10,'d846952c8c9142e0bca812feeab40528','9900015910','Subscription: Udit Negi for Gk','200','negi.udit@gmail.com','Udit Negi',8,5),
 (11,'a9e758f54a81426ab4c82a0dd5635d97','9900015910','Payment stud: 8cour: 5','200','negi.udit@gmail.com','Udit Negi',8,5);
/*!40000 ALTER TABLE `payment_details` ENABLE KEYS */;


--
-- Definition of table `payment_log`
--

DROP TABLE IF EXISTS `payment_log`;
CREATE TABLE `payment_log` (
  `id` int(70) unsigned NOT NULL AUTO_INCREMENT,
  `payment_request_id` varchar(255) DEFAULT NULL,
  `payment_id` varchar(255) DEFAULT NULL,
  `fees` varchar(100) DEFAULT NULL,
  `mac` varchar(255) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `payment_log`
--

/*!40000 ALTER TABLE `payment_log` DISABLE KEYS */;
INSERT INTO `payment_log` (`id`,`payment_request_id`,`payment_id`,`fees`,`mac`,`status`) VALUES 
 (6,'fcae0d9e73c44b1d9af333b2ae01f380',NULL,NULL,NULL,'Pending'),
 (8,'8b6080c3e97149d684f2d7cf05792313','MOJO5369558911814992','3.80','800b13088cb9704fe55d8cec77ef9615097526f1','Credit'),
 (9,'b0da0313f418443a9b01d7c9cf3b957c','MOJO2391764479175223','3.80','0d3f1e7920f973160b572a80279cb73cc2ed9ddb','Credit'),
 (10,'365ff08b333b47178bc7936aab0ebf7b',NULL,NULL,NULL,'Pending'),
 (11,'06e6a62653bc4471bb88e59e2833ff5e',NULL,NULL,NULL,'Pending'),
 (12,'d846952c8c9142e0bca812feeab40528',NULL,NULL,NULL,'Pending'),
 (13,'a9e758f54a81426ab4c82a0dd5635d97',NULL,NULL,NULL,'Pending');
/*!40000 ALTER TABLE `payment_log` ENABLE KEYS */;


--
-- Definition of table `question_questionpaper`
--

DROP TABLE IF EXISTS `question_questionpaper`;
CREATE TABLE `question_questionpaper` (
  `id` int(70) unsigned NOT NULL AUTO_INCREMENT,
  `questionPaperId` int(70) unsigned NOT NULL,
  `questionId` int(70) unsigned NOT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Combo` (`questionPaperId`,`questionId`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question_questionpaper`
--

/*!40000 ALTER TABLE `question_questionpaper` DISABLE KEYS */;
INSERT INTO `question_questionpaper` (`id`,`questionPaperId`,`questionId`,`isDeleted`) VALUES 
 (1,1,1,0),
 (2,1,5,0),
 (3,1,14,0),
 (7,2,1,0),
 (8,2,5,0),
 (9,1,20,0),
 (10,1,21,0),
 (11,1,44,0),
 (12,1,45,0),
 (13,3,1,0),
 (14,1,49,0),
 (15,1,50,0),
 (16,1,51,0),
 (17,1,52,0),
 (18,1,53,0),
 (19,1,54,0),
 (20,1,55,0),
 (21,1,56,0),
 (22,1,57,0),
 (23,1,58,0),
 (24,1,59,0),
 (25,1,60,0),
 (26,1,61,0),
 (27,1,62,0),
 (28,1,63,0),
 (29,1,64,0),
 (30,1,65,0),
 (31,1,66,0),
 (32,1,67,0),
 (33,1,68,0),
 (34,1,69,0),
 (35,1,70,0),
 (36,1,71,0),
 (37,1,72,0),
 (38,1,73,0),
 (39,1,74,0),
 (40,1,75,0),
 (41,1,76,0),
 (42,1,77,0),
 (43,1,78,0),
 (44,1,79,0),
 (45,1,80,0),
 (46,1,81,0),
 (47,1,82,0),
 (48,1,83,0),
 (49,1,84,0),
 (50,1,85,0),
 (51,1,86,0),
 (52,1,87,0),
 (53,1,88,0),
 (54,1,89,0),
 (55,1,90,0),
 (56,1,91,0),
 (57,1,92,0),
 (58,1,93,0),
 (59,1,94,0),
 (60,1,95,0),
 (61,1,96,0),
 (62,1,97,0),
 (63,1,98,0),
 (64,1,99,0),
 (65,1,100,0),
 (66,1,101,0),
 (67,1,102,0),
 (68,1,103,0),
 (69,1,104,0),
 (70,1,105,0),
 (71,1,106,0),
 (72,1,107,0),
 (73,1,108,0),
 (74,1,109,0),
 (75,1,110,0),
 (76,1,111,0),
 (77,1,112,0),
 (78,1,113,0),
 (79,1,114,0),
 (80,1,115,0),
 (81,1,116,0),
 (82,1,117,0),
 (83,1,118,0),
 (84,1,119,0),
 (85,1,120,0),
 (86,1,121,0),
 (87,1,122,0),
 (88,1,123,0),
 (89,1,124,0),
 (90,1,125,0),
 (91,1,126,0),
 (92,1,127,0),
 (93,1,128,0),
 (94,1,129,0),
 (95,1,130,0),
 (96,1,131,0),
 (97,1,132,0),
 (98,1,133,0),
 (99,1,134,0),
 (100,1,135,0),
 (101,1,136,0),
 (102,1,137,0),
 (103,1,138,0),
 (104,1,139,0),
 (105,1,140,0),
 (106,1,141,0),
 (107,1,142,0),
 (108,1,143,0),
 (109,1,144,0),
 (110,1,145,0),
 (111,1,146,0),
 (112,1,147,0);
/*!40000 ALTER TABLE `question_questionpaper` ENABLE KEYS */;


--
-- Definition of table `questionpapers`
--

DROP TABLE IF EXISTS `questionpapers`;
CREATE TABLE `questionpapers` (
  `id` int(70) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questionpapers`
--

/*!40000 ALTER TABLE `questionpapers` DISABLE KEYS */;
INSERT INTO `questionpapers` (`id`,`name`,`isDeleted`) VALUES 
 (1,'QuestionPaper1',0),
 (2,'Question Paper 2',0),
 (3,'Question Paper',0);
/*!40000 ALTER TABLE `questionpapers` ENABLE KEYS */;


--
-- Definition of table `questions`
--

DROP TABLE IF EXISTS `questions`;
CREATE TABLE `questions` (
  `id` int(70) unsigned NOT NULL AUTO_INCREMENT,
  `question` text NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  `parentQuestionId` int(70) unsigned DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  `explanation` text,
  `correctAnswer` varchar(45) DEFAULT NULL,
  `subjectId` int(70) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questions`
--

/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` (`id`,`question`,`type`,`parentQuestionId`,`isDeleted`,`explanation`,`correctAnswer`,`subjectId`) VALUES 
 (1,'<p> With reference to the Directive Principles of StatePolicy, which of the following were added by an amendment to the Constitution of India?</p><p>1. To make provisions for just and humane conditions forwork and maternity relief</p><p>2. To prohibit slaughter of cows, calves and other <span>milch</span> and drought cattle</p><p>3. To promote cottage industries on an individual orco-operation basis in rural areas.</p><p>4. To secure opportunities for healthy development ofchildren</p><p>Select the correct answer using the codes given below:</p>','MCQ',NULL,0,'<p>Explanation: This was added by the 42<sup>nd</sup> Amendment Act of 1976 along with three other DPSPs to the original list. The others were part of the original Constitution</p>','c',1),
 (5,'<p>Passege</p>','Passage',NULL,0,NULL,'',2),
 (6,'<p>Child question 1</p>','PassageChild',5,0,'<p>explanation 1</p>','a',NULL),
 (7,'<p>Child question 2</p>','PassageChild',5,0,'<p>Explanation 2</p>','a',NULL),
 (14,'<p>Passege 2</p>','Passage',NULL,0,NULL,'',3),
 (15,'<p>Child question 3</p>','PassageChild',14,0,'<p>Explanation 3</p>','b',NULL),
 (16,'<p>child question 4</p>','PassageChild',14,0,'<p>explanaton 4</p>','a',NULL),
 (20,'<p> With reference to Money Bill, consider the following statements:</p><p>1. It can be introduced in either house of the Parliament.</p><p>2. It must be endorsed by the Speaker of the <span>Lok</span> Sabha.</p><p>3. Prior recommendation of the President is required.</p><p>4. No joint sitting is permitted to pass a Money Bill.</p><p>Select the correct statement using the codes given below:</p>','MCQ',NULL,0,'<p>Explanation: A Money Bill can only be introduced in the Lok Sabha and for its introduction, recommendation of the President is mandatory. The Bill passed by Lok Sabha has to be passed by Rajya Sabha within 14 days or else, the bill is deemed to be passed, hence no joint sitting is required.</p>','b',2),
 (21,'<p>Which of the following criteria would change a registered party into National Party?<br/><br/>1. Securing 4% of votes polled in four or more states, and it should have 4 MPs in Lok Sabha.<br/><br/>2. Securing 6% of votes polled in a state and winning at least 2 seats in the Legislative Assembly.<br/><br/>3. At least 9 MPs in Lok Sabha and these MPs are elected from at least 3 different states.<br/><br/>Select the correct statement using the codes given below.<br/></p>','MCQ',NULL,0,'<p style=\"color: rgb(51, 51, 51);text-align: justify;\">Explanation: Statement 2 is a criteria to be a State Party, not a National Party. So, statement 2 is incorrect.<br/><br/>Statement 1 is also incorrect as Securing 6% of votes polled in four or more states changes Party into National Party.<br/>Statement 3 is also incorrect as at least 11 MPs in Lok Sabha required across 3 different states to become a national Party.<br/><br/>As per Election Commission, Criteria is as follow:<br/>A political party shall be eligible to be recognised as a National Party if :-<br/><br/>(i) it secures at least six percent(6%) of the valid votes polled in any four or more states, at a general election to the House of the People or, to the State Legislative Assembly; and<br/><br/>(ii) in addition, it wins at least four seats in the House of the People from any State or States.<br/><br/>OR<br/><br/>It wins at least two percent (2%) seats in the House o the People (i.e., 11 seats in the existing House having 543 members), and these members are elected from at least three different States.<br/><br/>A political party shall be entitled to be recognised as a State Party, if:-<br/><br/>(i) it secures at least six percent (6%) of the valid votes polled in the State at a general election, either to the House of the People or to the Legislative Assembly of the State concerned; and<br/><br/>(ii) In addition, it wins at least two seats in the Legislative Assembly of the State concerned.<br/><br/>OR<br/><br/>It wins at least three percent (3%) of the total number of seats in the Legislative Assembly of the State, or at least three seats in the Assembly, whichever is more.<br/></p>','d',3),
 (44,'<p>The Northern part of Western coastal Plain of India is also known as</p>','MCQ',NULL,0,'<p><strong>All of the above statements are correct. However , Note that in the Paris Agreement, to the CBDR principle, a phrase has been added. D</strong>efinition of CBDR has been expanded and it now includes the phrase “in the light of different national circumstances”. It appears to have diluted the notion of hitherto “historical responsibility” of the developed countries. How this is going to break the wall between developed and developing countries, is yet to be seen.</p><p><strong>Some Details -</strong></p><p><strong>Objectives of Paris Agreement</strong></p><p> The Paris Agreement sets an over-arching target of keeping the emissions in control so that either the rise in global temperature remains below 2°C by the turn of 21st century or as low as 1.5°C. To achieve this goal, the countries will need to peak their emissions and then bring them down. The other purposes of Paris Agreement are as follows: Increasing ability to adapt to the adverse impacts of the climate change and foster climate change resilience Making finance flows consistent with the pathway towards low greenhouse gas emissions and climate-resilient development.</p><p><strong>Emission Reduction Action Under the Paris Agreement</strong>,- developed countries will have to take emission reduction targets and actions but unlike the Kyoto Protocol – where such targets were mandatory; they shall be able to determine the nature and quantum of these targets nationally. Thus, each individual country is to contribute individually in the form of so called Nationally Determined Contributions (NDCs). As of now, the first set of such actions has been provided by more than 180 countries in the form of “Intended Nationally Determined Contributions (INDCs). When the Paris Agreement becomes operation in 2020, these targets will be called Nationally Determined Contributions (NDCs).</p><p><strong>Climate Finance</strong> Similar to Kyoto Protocol, the developed countries will need to provide finance to the developing countries for emission reduction actions as well as adaptation. The amount set by Paris Agreement is at least USD 100 billion per year from 2020 onward. However, as of now, there is no consensus on what exactly makes climate finance. The countries will have to demarcate the details of these. Further, the Paris Agreement also provides that the developing countries can also voluntarily fund other developing countries. </p><p><strong>Climate Change Adaptation:</strong> One of the objectives of the Paris Agreement is to increase the ability to adapt to the adverse impacts of the climate change and foster climate change resilience. The developing countries shall be able to seek funds from developed world in this direction. </p><p><strong>Review Mechanism:</strong> The Paris Agreement provides that every five year, there shall be an assessment of how the emission reduction actions of all the countries are able to succeed towards achieving the goal of keeping global temperatures under control. Every fifth year, the assessment will also be made on kind and volume of funds. Technology Mechanism Paris agreement has set up a technology mechanism, which would help the countries to cooperate in developing and deploying clean technologies. However, this would face some issues of intellectual property rights of existing clean technologies. </p><p><strong>Market mechanism</strong> Countries are open to become part of existing global market-based mechanisms to reduce the emissions. The agreement would allow a global carbon-trade which shall provide the countries chance to take credit for emission reduction by making payments for the same in the countries where reduction is cheaper to achieve. </p><p><strong>The difference between Kyoto Protocol and Paris Agreement</strong> in this context is that earlier / currently, such trade exsists in limited regions and countries and Paris agreement might have a chance to make it a global market place. </p><p><strong>Transparency As per the Paris Agreement</strong>,: a uniform system will be built for the countries to report what they have been doing towards the fight against climate change. It will also track the achievements of the countries towards Nationally Determined Contributions. However, there are no punitive actions for non-compliance of such reporting. </p><p><strong>Three Key Issues :</strong></p><p>There are three key issues looming large over the Paris Agreement viz. maintaining the difference between developing and developed countries; issue of climate finance and loss &amp; damage; and mitigation. </p><p><strong>1. Maintaining the difference between developing and developed countries</strong> </p><p>The world is divided into two factions or rich and poor / developed and developing countries over climate change negotiations. An important principle in this context called common but differentiated responsibility (CBDR) was enshrined in the Principle 7 of the Rio Declaration. This principle implies that the interest of all countries towards sustainable environment are common, but due to the historical reasons, the developed countries have done more damage to the climate and thus, the responsibility towards climate change is “differentiated”.</p><p> It implies that while all countries should take sustainable development actions, the developed countries have to take the leading role in environmental protection, as they have contributed the most to environmental problems. Also they should support developing countries with finance and technology in their sustainable development efforts. India has always held that the eradication of poverty should be the overarching goal of sustainable development. </p><p>India together with other developing countries has played an instrumental role in establishing CBDR as a principle. In the Paris agreement, definition of CBDR has been expanded and it now includes the phrase “in the light of different national circumstances”. It appears to have diluted the notion of hitherto “historical responsibility” of the developed countries. How this is going to break the wall between developed and developing countries, is yet to be seen. </p><p><strong>2. Issue of Climate Finance and Loss &amp; Damage</strong></p><p><strong> </strong>The Paris Agreement maintains that the developed countries would keep providing support to the developing countries through the finance, technology and capacity building to the tune of at least USD 100 billion per year from 2020 onward. Further, the developed countries are required to provide transparent information also on support to developing countries and biennially communicate their plans for mobilisation of additional finance. The onus to mobilize these funds cannot be placed entirely on bilateral assistance and the Green Climate Fund. The developing countries would need to virtually de-link the greenhouse gas emissions from economic growth and devise innovative ways to mobilize funds. </p><p><strong>3. Mitigation</strong> Towards mitigation, the developed countries are needed to take lead in setting absolute emission reduction targets. However, the developing countries are “encouraged to move over time towards economy-wide emission reduction or limitation targets in the light of different national circumstances”. Under this so called “enhanced transparency framework”, all the countries are required to provide updates on their achievements towards NDCs. There might be some practical problem in the periodical review or global stocktake for developing and least developed countries.</p>','c',1),
 (45,'<p>Tatipaka Oil Refinery is located in the state of</p>','MCQ',NULL,0,'','d',2),
 (46,'<p>Question qwe</p>','MCQ',NULL,1,NULL,'b',NULL),
 (47,'<p>The Northern part of Western coastal Plain of India is also known as</p>','MCQ',NULL,0,'','c',NULL),
 (48,'<p>Tatipaka Oil Refinery is located in the state of</p>','MCQ',NULL,0,'','d',NULL),
 (49,'<p>In the course of India\'s struggle for freedom movement, Praja Mandal Movement was related to</p>','MCQ',NULL,0,'','c',NULL),
 (50,'<p>Tatipaka Oil Refinery is located in the state of</p>','MCQ',NULL,0,'','d',NULL),
 (51,'<p>The purpose of Ujjwala Yojana is to</p>','MCQ',NULL,0,'Pradhan Mantri UjjwalaYojana scheme has been launched for providing Free LPG connections to Women from BPL Households.','d',NULL),
 (52,'<p>Match the following sets of pairs:A. Kailas Temple, Ellora                                1. Chandellas\r\nB. Rathas, Mahabalipuram                           2. Narshimhavarman II\r\nC. Shore Temple, Mahabalipuram              3. Krishna I\r\nD. Khajuraho temple                                      4. Narshimhavarman I\r\nSelect the correct answer using the codes given below:</p>','MCQ',NULL,0,'Aim of the scheme is providing 5 crore free cooking (LPG) connections to BPL families over the next three years.','d',NULL),
 (53,'<p>Consider the following statements:1. Simon commission had recommended changes in the diarchy system introduced in 1919.\r\n2. Communal Electorate System was introduced by GoI Act, 1919.\r\nSelect the correct answer using the codes given below:</p>','MCQ',NULL,0,'Ministry of Petroleum and Natural Gas will implement this scheme.','a',NULL),
 (54,'<p>Which of the following are referred to as the Qualitative tools of Monetary Policy?1. Consumer Credit Regulation.\r\n2. Selective Credit Control.\r\n3. Open Market Operations.\r\n4. Moral Suasion.\r\nSelect the correct options using the code given below:</p>','MCQ',NULL,0,'Hence option “d” is right.','c',NULL),
 (55,'<p>Consider the following :Consider the following :\r\n1. Introduction of silver coin and copper coin.\r\n2. Organisation of Iqta System.\r\n3. Set up of official nobility of slaves\r\nWhich among the following rulers of medieval India was responsible for introducing the above?</p>','MCQ',NULL,0,'Mentor Note: This is an example of easy question. If you are unable to correctly solve such questions, you will need to revise Current Affairs well.','a',NULL),
 (56,'<p>Which among the following is/are the basic pillars of Social Progress Index (SPI)?Basic needs for survival,  Access to building blocks to improve living conditions. Access to opportunity to pursue goals and ambitions.,</p>','MCQ',NULL,0,'Social Progress index (SPI) is published by the nonprofit Social Progress Imperative. SPImeasures the extent to which countries provide for the social and environmental needs of their citizens.','d',NULL),
 (57,'<p>Which among the following will be supported through Bharat Innovation Fund?  Health Care,Sanitation,  Digital Technologies,Space Technologies, Life Sciences</p>','MCQ',NULL,0,'- The Bharat Fund is a public-private-academia partnership set up by Indian Institute of Management (IIM) Ahmedabad’s Centre for Innovation Incubation and Entrepreneurship (CIIE). The objective of the fund, inter-alia, is to support and provide funding (grants, seed capital, venture capital) and business support to innovation-driven start-ups that solve real problems faced by the masses of India through technology-enabled and rapidly scalable solutions and will focus on – healthcare and life-sciences (including biotech, medical devises), sustainability (energy, agriculture, environment, water), and digital technologies (especially in manufacturing, design).','c',NULL),
 (58,'<p>Consider the following statements regarding Unified Payment System (UPS). It is a mobile interface., t will allow fund transfer using a virtual id with a limit of Rs. 2 lakh., It can work on personal computers also.,  It can be used for e-commerce transactions also.</p>','MCQ',NULL,0,'The Unified Payment Interface (UPI), which aims to move the country towards a more cashless model. Developed by The National Payment Corporation of India (NPCI), the payment interface is expected to be a game changer','d',NULL),
 (59,'<p>Consider the following statements regarding ARIES telescope.  It is built by Indian – Belgian collaboration.,  It is a ground based optical telescope., t will be used to study star structure and their magnetic fields.</p>','MCQ',NULL,0,'- India’s largest ground-based optical telescope, in Devasthal in Uttarakhand, will be switched on March 30. The telescope is the product of an Indo-Belgian collaborative effort, assisted by the Russian Academy of Sciences, thatwas kicked off in 2007. It is going to be operated by the Aryabhatta Research Institute of Observational Sciences (ARIES), an autonomous research body under the Department of Science and Technology.','d',NULL),
 (60,'<p>Which of the following statement(s) is/are correct about ‘‘Suspended Particulate Matter (SPM)’’, a major air pollutant?         1. Major source of SPM are: vehicles, power plants, construction activities, oil refinery etc.                                                                  2. Oxides of iron, aluminium, manganese, zinc and other metals have adverse effect due to deposition of dust on plants and causes biochemical and metabolic dysfunction.                                3. Tetraethyl lead if inhaled leads to severe nephrological and haematological disorders.</p>','MCQ',NULL,0,':- Sources of atmospheric particulate matter:- Burning of wood, coal, oil and gaseous fuels; burning of coal refuse, agricultural refuse, and municipal solid waste; fly-ash emissions from power plants; smelting and mining activities; asbestos factories; metallurgical industries; ceramic industries; glass industries; cement industries.','d',NULL),
 (61,'<p>The declining population of Vultures has been a major concern for environment. Which of the following steps are being taken for the conservation of Vultures?                                                       1.  Ban on diclofenac for both human and veterinary use.                  2.  Creating Vulture Restaurants                                                        Which of the above statement(s) is/are correct?</p>','MCQ',NULL,0,'A vulture restaurant is a site where carrion is deposited for endangered vultures to feed on. The survival of vultures in some areas is threatened by a variety of circumstances, including loss of habitat and diminishing food sources. In a Vulture Restraunt, it is ensured that the meat is uncontaminated.','b',NULL),
 (62,'<p>Which provisions of the Constitution can be amended by a simple majority of the Parliament?                                                  1. Formation of new states\r\n2. Representation of states in Parliament\r\n3. Citizenship acquisition and termination\r\n4. Fifth Schedule\r\n5. Sixth Schedule</p>','MCQ',NULL,0,'There are three types of bills that seek to amend the Constitution,1. Bills that are passed by Parliament by Simple Majority.\r\n2. Bills that have to be passed by Parliament by Special Majority.\r\n3. Bills that have to be passed by Special Majority and also to be ratified by not less than one-half of the State Legislatures.\r\nBills that are passed by Parliament by Simple Majority\r\nSuch Bills are not deemed as ‘Constitution Amendment Bills’ within the meaning of Article 368. These bills are passed by both Houses of Parliament by a simple majority of members present and voting. It consists of:\r\na. Admission or establishment of new States, formation of new States, and alteration of areas, boundaries or names of existing States. Bills relating to such matters require the recommendation of the President for introduction.\r\nb. Creation or abolition of Legislative Councils in the States. Bills relating to such matters require the prior adoption of necessary resolution by the State Legislative Assembly concerned.\r\nc. Administration and control of Scheduled Areas and Scheduled Tribes.\r\nd. Administration of Tribal Areas in the States of Assam, Meghalaya, Tripura and Mizoram.\r\nBills that have to be passed by Parliament by Special Majority\r\nThe procedure for such bills is prescribed under Article 368 (2) of the Constitution. These can be introduced in either House of Parliament. Also, such bills can never be treated as Money Bills or Financial Bills. Thus, no recommendation of President is needed for introducing these bills.\r\nThese bills have to be passed by a majority of the ‘total membership’ of that House and by a majority of not less than two-thirds of the members of that House ‘present and voting’.\r\nI. “Total membership” means the total number of members comprising the House irrespective of whether there are vacancies or absentees on any account.\r\nII. “Present and voting”, means members who vote for “ayes” or for “noes”. Members who are present in the House and vote “abstention” either through the electronic vote recorder or on a voting slip or in any other manner, are not treated as “present and voting.”\r\nBills that have to be passed by Special Majority and also to be ratified by not less than one-half of the State Legislatures\r\nThis comprises of Constitutional Amendment Bills which seek to make any change in articles relating to:\r\na. The Election of the President.\r\nb. The extent of the Executive Power of the Union and the States.\r\nc. The Supreme Court and the High Courts.\r\nd. Any of the Lists in the Seventh Schedule.\r\ne. The representation of States in Parliament.','a',NULL),
 (63,'<p>Which among the following statement(s) is/are correct about Globally Important Agricultural Heritage Systems GIAHS)?            . It has been started by UNESCO.\r\n2.  Koraput (Odisha) and Pampore region (Kashmir valley) are recognised as GIAHS sites\r\nSelect the correct answer using the codes given below:</p>','MCQ',NULL,0,'GIAHS started by FAO in 2002. Purpose of GIAHS is to create public awareness, safeguard world agricultural heritage sites.           GIAHS was founded against a background of an overemphasis on productivity by modern agriculture that resulted in environmental problems such deforestation and water pollution throughout the globe, causing destruction of unique local cultures, landscapes and biodiversity.\r\nAlso, Sites recognised in India are :-\r\nKoraput, Odisha State\r\n• This region has rich biodiversity, growing several varieties of paddy, millets, pulses, oilseeds, vegetables.\r\n• Region primarily a tribal district inhabited by khonds, bonda tribes practicing poddhu (shifting) cultivation.\r\n• Shifting cultivation – loss of forest cover = hurting the biodiversity.\r\n• Soil erosion, Soil degradation, habitat loss.\r\n• Illiteracy, large family, small farm holding size.\r\n• The socio-economic indicators are very poor here nearly 84% living in abject poverty.\r\nKashmir Valley,Pampore region Saffron Heritage Site of Kashmir in India\r\n• Grains such as maize, rice, rajmah/lentils, fruit and vegetable crops and pulses.\r\n• A set of unique low-tillage traditional agricultural practices are carried\r\n• During the fallow period, growth of fruit, fodder and mulberry trees along the farm boundaries (Agro-forestry) is practiced, thereby maintaining traditional agro-biodiversity.\r\nProblems\r\no Loss of productivity due to the lack of agricultural management practices\r\no Climate change vulnerabilities, water scarcity and weather vagaries\r\no Efforts from the younger generation to appreciate and conserve heritage systems absent.\r\nKuttanad:\r\n• Kuttanad is a delta region of about 900 sq. km situated in the west coast of Kerala State, India.\r\n• Unique feature: Below sea level rice cultivation site, only such system in India.\r\n• Farmers of Kuttanad have developed and mastered the spectacular technique of below sea level cultivation over 150 year ago.\r\n• They made this system unique as it contributes remarkably well to the conservation of biodiversity and ecosystem services including several livelihood services for local communities.','b',NULL),
 (64,'<p>Which of the following committees of the constituent assembly is/are correctly matched?                                                                        Which of the following committees of the constituent assembly is/are correctly matched?\r\n           Committees                            :               Chairman\r\n1. Provincial constitution                    :               Sardar Patel\r\n2. Rules and procedures                     :               Jawaharlal Nehru\r\n3. States committee                             :               Dr. Rajendra Prasad\r\nSelect the correct answer from the codes below:</p>','MCQ',NULL,0,'Sardar Patel was chairman of Provincial Constitution Committee and Advisory Committee on Fundamental Rights     Jawaharlal Nehru was chairman of Union Constitution Committee.\r\nRajendra Prasad was chairman of Committee on the Rules of Procedure Committee.\r\nHence option “a” is right','a',NULL),
 (65,'<p>Which among the following can be termed as achievements of Bhakti and Sufi Movements?                                                                1. Bhaktism reformed Hinduism while Sufism liberalised Islam\r\n2. Development of regional languages\r\n3. A cultural synthesis which transformed a Muslim rule in India to national government under Akbar.\r\nSelect the correct answer using the codes given below:</p>','MCQ',NULL,0,'','d',NULL),
 (66,'<p>Consider the following statements regarding Dispute Settlement Board (DSB) of WTO                                                                             Consider the following statements regarding Dispute Settlement Board (DSB) of WTO\r\n1. The General Council of WTO acts like a Dispute Settlement Board.\r\n2. DSB takes up the dispute only after 60 days of time is given to the disputants to resolve the dispute among themselves\r\n3. Its decision is final and cannot be challenged\r\n4. It does not pronounce any specific punishment if, after ruling, the erring nation does not rectify the issues.\r\nWhich of the following statements given above is/are correct?</p>','MCQ',NULL,0,'DSB is a session of the General Council of the WTO i.e., all of the representatives of the WTO member governments.                Under the Uruguay Round Agreements, a party may request consultations to resolve the conflict through informal negotiations. If consultations fail to yield mutually acceptable outcomes after 60 days, Members may request the establishment of a panel to resolve the dispute.\r\nOption 3 is incorrect\r\nIf a Member does not comply with rulings, the DSB can authorize the complainant to suspend commitments and concessions to the violating Member. No specific punishment is mentioned.\r\nHence option “b” is correct\r\nSubject:\r\nEconomy','b',NULL),
 (67,'<p>Consider following statements                                                           1.  Oceans have more effects on windward sea coasts.\r\n2.  Terrestrial currents affect temperature of closed terrestrial regions up to a great extent.\r\n3.  Cold currents have more effects in tropic regions in summer season.\r\nWhich of the above statements are correct?</p>','MCQ',NULL,0,'All are correct facts/explanations and need to be understood. Read concepts from GC LEONG.','d',NULL),
 (68,'<p>Which of the following are a part of the Capital Expenditure by the govt.?                                                                                             Which of the following are a part of the Capital Expenditure by the govt.?\r\n1. Loans disbursed by the government.\r\n2. Grants given by the govt. to the foreign countries.\r\n3. Expenditure on general services like railways, education etc.\r\n4. Interest repayment by the govt. on the borrowings made in the past.\r\nSelect the correct option using the codes given below:</p>','MCQ',NULL,0,'Capital expenditure is an expense which earns profit over a longer period of time. It either increases assets or decreases liability.           Capital expenditure includes:-\r\nInvestment on shares or loans by central government to state governments, foreign government and government companies.\r\nGrants do not create assets or reduce liability.\r\nExpenditure on railway and education is an investment which earns profit in longer run.\r\nInterest repayment does not form part of capital expenditure.\r\nHence option “c” is right\r\nSubject:\r\nEconomy','c',NULL),
 (69,'<p>Recently “Freedom of Navigation” operation was conducted by which of the following countries?</p>','MCQ',NULL,0,'United States Navy has staged its third freedom of navigation operation (FONOP) in the South China Sea.  US started these operations when China started building artificial islands in the disputed Spratly chain.\r\nHence option “b” is right.\r\nSubject:\r\nCurrent Affairs','b',NULL),
 (70,'<p>Which among the following are the significances of presence of humidity in atmosphere?                                                                   1.  Indicator of possible capacity of atmosphere for rainfall.\r\n2.  Active controller of heat radiated by earth.\r\n3.  Determining the quantity of collected latent heat in atmosphere for development of storm.\r\n4.  It affects the rate of cooling of human body.\r\nSelect the correct answer using the codes given below:</p>','MCQ',NULL,0,'Level of humidity in the atmosphere is one of the most important indicator rainfall predictions. Water vapor is transparent to most incoming solar energy But it absorbs the infrared energy emitted (radiated) upward by the earth\'s surface.\r\nWater vapor in the atmosphere contains latent energy. During transpiration or evaporation, this latent heat is removed from surface liquid, cooling the earth\'s surface. Hence more the vapor, higher will be latent energy in the atmosphere for potential storm formation.\r\nHuman body uses evaporative cooling as the primary mechanism to regulate temperature, under humid conditions rate of evaporation is lesser compared to dry conditions.\r\nSubject:\r\nGeography','d',NULL),
 (71,'<p>Consider the following statements:                                                       Consider the following statements:\r\n1.  Marine National Park in Gujarat is meant to protect coral reefs and extensive mudflats also.\r\n2.  Sanctuaries like Chilka Lake in Odisha and Point Calimere in Tamil Nadu are to protect coastal ecosystem.\r\nWhich of the above statements) is/are true?</p>','MCQ',NULL,0,'Marine National Park in Gujarat protects shallow area in the sea, islands, coral reefs and extensive mudflats. Two important sanctuaries meant for preservation of coastal ecosystems are the Chilka Lake in Odisha and PointCalimere in Tamil Nadu.','a',NULL),
 (72,'<p>When a President pardons by giving lesser punishment, due to some special fact like disability or pregnancy, it is known as</p>','MCQ',NULL,0,'The Constitution of India vests sovereign power in the President and governors. The governance in the Centre and states are carried out in the name of President and Governor respectively. A President is empowered with the power to pardon under Article 72 of the Indian Constitution. Article 72 says that the President shall have the power to grant pardons, reprieves, respites or remissions of punishment or to suspend, remit or commute the sentence of any person convicted of any offence. The meaning of these terms is as follows:','b',NULL),
 (73,'<p>Consider the following statements:                                                            1. The flow of the rivers draining the Central Highlands is from northeast to southwest.\r\n2. The Central Highlands are wider in the west but narrower in the east.\r\nWhich of the statements given above is/are incorrect?</p>','MCQ',NULL,0,'Is incorrect. The part of the peninsular plateau lying to the north of the Narmada river covering a major area of the Malwa plateau is known as the Central Highlands. The flow of the rivers draining this region, namely the Chambal, the Sind, the Betwa and Ken is from southwest to northeast','a',NULL),
 (74,'<p>The terms ‘Digital Helmet Mounted Display’ and ‘Joint Biological Tactical Detection System’ were in news recently in context of India’s bilateral relations with</p>','MCQ',NULL,0,'','c',NULL),
 (75,'<p>After death of which of the following Mughal empire, ambitious nobles became direct contenders for power for the first time in the history of Mughal politics?</p>','MCQ',NULL,0,'','c',NULL),
 (76,'<p>Vari-da-bagh, Bawan bagh are the varieties of which among the following art form?</p>','MCQ',NULL,0,'PHULKARI –Why in news?          To celebrate the spirit of its people, Concept 1469 and art historian Alka Pande have come together to organise the third edition of ‘Mela Phulkari: Threads of Punjab’ in Delhi\r\nThe origin of this art can be traced back to the 15th century AD.\r\n•         It is a form of craft in which embroidery is done in a simple and sparse design over shawls and dupattas.\r\n•         In some cases where the design is worked over very closely, covering the material entirely, it is called bagh (a garden of flowers).\r\n•  The threads used were of a silk yarn called pat.\r\n•  Phulkari and baghs are worn by women across Punjab during marriages, festivals and other joyous occasions.\r\nVarieties: There are different varieties of phulkaris and baghs made in Punjab.\r\n•   The Chope :\r\n•   Vari-da-bagh (bagh of the trousseau)\r\n•  Bawan bagh\r\n•  Darshan dwar','b',NULL),
 (77,'<p>Which among the following can be used for the purpose of Green House Gas removal from the atmosphere?                            1. Afforestation\r\n2. Biochar\r\n3. Space Sunshade\r\nSelect the correct answer using the codes given below:</p>','MCQ',NULL,0,'Climate engineering refers to the deliberate and large scale intervention in the Earth’s climate system with the aim of limiting adverse climate change  • Generally two categories of engineering solutions:\r\nGreenhouse gas removal: Examples\r\n•  Carbon capture and storage (CCS), where some of the carbon dioxide being emitted by coal-fired power stations is recaptured by physically sucking it in and transporting it elsewhere (like oilfields) to be sequestered underground.\r\n•  Biochar which is created by pyrolysis of biomass\r\n• Enhanced weathering involves a chemical approach to remove carbon dioxide involving land or ocean based techniques. Examples of land based enhanced weathering techniques are in-situ carbonation of silicates.\r\n• Afforestation\r\nManagement of Sunlight: Here the plan is to reduce global warming by cutting down the heat absorbed by our planet from the sun. Examples:\r\n• Stratospheric aerosol injection (SAI): SAI involves spraying into the stratosphere fine, light-coloured particles designed to reflect back part of the solar radiation before it reaches and warms the earth. Sulphur Dioxide gas is used for the process.\r\n• Cirrus cloud manipulation: Here the cirrus clouds are removed or thinned so that their long-wave trapping capacity is reduced and thus cools the surface.\r\n• Marine cloud brightening: The low warm clouds which are highly reflective to sunlight are modified to increase their reflectivity.\r\n• Space sunshade: Obstructing sunrays with space based mirrors\r\n• Using pale-coloured roofing material or growing high albedo crops.','a',NULL),
 (78,'<p>With reference to the Mountbatten Plan, which of the following statements is/are correct?                                                                   1. Partition of India was accepted\r\n2. Dominion Status to both India & Pakistan was granted\r\n3. Right to secede from British Commonwealth was given.\r\nSelect the correct answer using the codes given below:</p>','MCQ',NULL,0,'The British government proposed a plan announced on 3 June 1947 (Mountbattern Plan) that included these principles               • Principle of Partition of India was accepted by the British Government.\r\n• Successor governments would be given dominion status.\r\n• Implicit right to secede from the British Commonwealth.\r\nFun fact : UPSC had asked a question in Mains to write a short note on June 3 plan. Most candidates could not answer because they were not aware that June 3 Plan was the Mountbattern Plan. Now you know.\r\nSubject:\r\nHistory','d',NULL),
 (79,'<p>Consider the following statements with regard to Ethics Committee in Parliament: 1. There is one ethics committee for both the houses of Parliament.\r\n2. The ethics committee were for first time created in 1972 under the regime of Indira Gandhi.\r\n3. It seeks to address the discontent of general public with Parliament.\r\nSelect the incorrect statement(s) using the codes given below:</p>','MCQ',NULL,0,'Both the houses of parliament have a permanent standing committee on ethics.','d',NULL),
 (80,'<p>Which among the following statement(s) is/are correct about Nicobar Flying Fox?                                                                              1. Nicobar flying fox is endemic to India.\r\n2. It is a critically endangered species.\r\n3. It is threatened by habitat loss due to forest clearing.\r\nSelect the correct answer using the codes given below:</p>','MCQ',NULL,0,'Nicobar flying fox is a species of flying fox. Its natural habitats are subtropical or tropical moist lowland forests and subtropical or tropical swamps. It is threatened by habitat loss due to forest clearing.        Nicobar flying fox is a species of flying fox. Its natural habitats are subtropical or tropical moist lowland forests and subtropical or tropical swamps. It is threatened by habitat loss due to forest clearing.','c',NULL),
 (81,'<p>Consider the following statement(s) regarding Tara Bhagavathi:       Consider the following statement(s) regarding Tara Bhagavathi:\r\n1. She is a Buddhist Goddess considered a form of Kali.\r\n2. With decline of Buddhism in South India the followers got absorbed into Hindu cult of Shakti\r\nSelect the correct statement(s) using the codes given below:</p>','MCQ',NULL,0,'Zara Bhagwati is a part of Vajrayana sect of Buddhism. With decline of Buddhism in South India the followers got absorbed into Hindu cult of Shakti or the female goddess of Power.','c',NULL),
 (82,'<p>Consider the following statements:1. A person born in India between 26th Jan 1950 and 1st July 1987 is Indian national irrespective of the nationality of his parents.\r\n2. A person born in India after 1st July 1987 is citizen only if both his parents are/were Indian nationals at time of his birth.\r\nSelect the correct answer using the codes below:</p>','MCQ',NULL,0,'Requisites for Citizenship Acquisition of Indian Citizenship (IC)\r\nIndian citizenship can be acquired by birth, descent, registration and naturalization. The conditions and procedure for acquisition of Indian citizenship as per the provision of the Citizenship Act, 1955 are given below:\r\n(1) By Birth \r\n• A person born in India on or after 26th January 1950 but before 1st July, 1987 is citizen of India by birth irrespective of the nationality of his parents.\r\n• A person born in India on or after 1st July,1987 but before 3rd December, 2004 is\r\nconsidered citizen of India by birth if either of his parents is a citizen of India at the time of his birth.\r\n• A person born in India on or after 3rd December, 2004 is considered citizen of India by birth if both the parents are citizens of India or one of the parents is a citizen of India and the other is not an illegal migrant at the time of his birth.\r\nAn?illegal migrant? as defined in section 2(1)(b) of the Act is a foreigner who entered India.\r\n(i) Without a valid passport or other prescribed travel documents: or\r\n(ii) With a valid passport or other prescribed travel documents but remains in India beyond the permitted period of time.\r\n(2) By Descent \r\n• A person born outside India on or after 26th January 1950 but before 10th December 1992\r\nis a citizen of India by descent, if his father was a citizen of India by birth at the time of his birth. In case the father was a citizen of India by descent only, that person shall not be a citizen of India, unless his birth is registered at an Indian Consulate within one year from the date of birth or with the permission of the Central Government, after the expiry of the said period.\r\n• A person born outside India on or after 10th December 1992 but before 3rd December, 2004, is considered as a citizen of India if either of his parents was a citizen of India by birth at the time of his birth. In case either of the parents was a citizen of India by descent, that person shall not be a citizen of India, unless his birth is registered at an Indian Consulate within one year from the date of birth or with the permission of the Central Government, after the expiry of the said period.\r\n• A person born outside India on or after 3rd Decmber, 2004 shall not be a citizen of India, unless the parents declare that the minor does not hold passport of another country and his birth is registered at an Indian consulate within one year of the date of birth or with the permission of the Central Government, after the expiry of the said period.\r\nProcedure\r\nApplication for registration of the birth of a minor child to an Indian consulate and shall be accompanied by an undertaking in writing from the parents of such minor child that he does not hold the passport of another country.\r\n(3) By Registration\r\nIndian Citizenship by registration can be acquired (not illegal migrant) by: -\r\n• Persons of Indian origin who are ordinarily resident in India for SEVEN YEARS before making application under section 5(1)(a) (throughout the period of twelve months immediately before making application and for SIX YEARS in the aggregate in the EIGHT YEARS preceding the twelve months). \r\n• Persons of Indian origin who are ordinarily resident in any country or place outside undivided India \r\n© Persons who are married to a citizen of India and who are ordinarily resident in India for SEVEN YEARS (as mentioned at (a) above) before making application under section 5(1)(c). \r\n• Minor children whose both parents are Indian citizens under section 5(1)(d). \r\n• Persons of full age whose both parents are registered as citizens of India under section 5(1)(a) or section 6(1) can acquire Indian citizenship \r\n• Persons of full age who or either of the parents were earlier citizen of Independent India and residing in India for ONE YEAR immediately before making application \r\n• Persons of full age and capacity who has been registered as anOVERSEAS CITIZEN OF INDIA (OCI) for five years and residing in India forONE YEAR before making application \r\nClarification: A person shall be deemed to be a Person of Indian origin if he, or either of his parents, was born in undivided India or in such other territory which became part of India after the 15th day of August, 1947.\r\n(4) By Registration (Section 5(4))\r\nAny minor child can be registered as a citizen of India under Section 5(4), if the Central Government is satisfied that there are ?special circumstances? justifying such registration. Each case would be considered on merits. \r\nSubject:\r\nPolity','a',NULL),
 (83,'<p>Which of the following is/are included in the Preamble of Indian constitution?\r\n1. Equality of status\r\n2. Financial Equality\r\n3. Equality of opportunity\r\nSelect the correct answer using the codes given below:</p>','MCQ',NULL,0,'Preamble envisages that no section of the society enjoys special privileges, i.e. government must strive for equality of status and individuals are provided with adequate opportunities without any discrimination i.e. equality of opportunities.\r\nHence option “c” is correct.\r\nSubject:\r\nPolity','c',NULL),
 (84,'<p>Which of the following are associated with the tenure of Lord Ripon?\r\n1. First Factory Act\r\n2. Establishment of Indian National Congress.\r\n3. Repeal of Vernacular Press Act, 1878\r\n4. Ilbert Bill controversy\r\nSelect the correct answer using the codes given below:</p>','MCQ',NULL,0,'Reforms by Lord Ripon:-\r\nVernacular Press Act of 1882 was repealed, during his tenure.\r\nRipon left India in December 1884. Congress came into being after that.\r\nFirst Factory Act was passed in 1881 to improve the condition of the factory labourers.\r\nControversial Ilbert Bill issue marked Ripon\'s administration. Ilbert, introduced a bill banning the protected status of the white and seeking equality of all subjects in the eye of law.\r\nHence option d is correct.\r\nSubject:\r\nHistory','d',NULL),
 (85,'<p>Consider the following statements regarding the effects of Inflation\r\n1. Inflation results in appreciation of the value of the currency in the economy.\r\n2. Due to high inflation, lenders benefit and borrowers suffer.\r\n3. Rising inflation indicates low aggregate demand in the economy.\r\n4. Rising inflation in an economy may result in increasing the exports.\r\nWhich of the statements given above is/are correct?</p>','MCQ',NULL,0,'Inflation generally means depreciation (or loss) in the value of money i.e. for the same amount of money you will be now able to purchase lesser goods;\r\nInflation generally means gain to the borrowers as the money they have to return to creditors the value of money is depreciated. The money when borrowed had higher value than it has during the time of inflation. Hence the creditors loose the value of money they have lended.\r\nInflation is generally escalated by high aggregate demand in the society creating a demand – supply mismatch.\r\nDuring inflation, when the value of currency depreciates the exporters have better realization of income making exports attractive.','d',NULL),
 (86,'<p>Which of the following is not a component of Rashtriya Krishi Vikas Yojana?</p>','MCQ',NULL,0,'Sub schemes under RKVY:-\r\n» Bringing Green Revolution to Eastern India (BGREI)\r\n» Additional Fodder Development Programme(AFDP)\r\n» Vidarbha Intensive Irrigation Development Programme (VIIDP)\r\n» Saffron Mission\r\n» National Mission for Protein Supplement (NMPS)\r\n» Guidelines for fisheries under the NMPS\r\n» Guidelines for Dairy Development under the NMPS\r\n» Guidelines for Pig Development (Piggery) under the NMPS\r\n» Guidelines for Goat Development (Goatery) under the NMPS\r\n» Crop Diversification','d',NULL),
 (87,'<p>Consider the following statements about Arya Samaj:\r\n1. It repudiated caste system and the fourfold Varna division.\r\n2. It started a Shudhi movement to reconvert people to Hinduism.\r\nWhich of the statements given above is/are correct?</p>','MCQ',NULL,0,'Arya Samaj did not repudiate the fourfold varna system and therefore statement one is wrong. However it repudiated the caste system.\r\nStatement 2 is correct as it started a shuddhi movement to reconvert people to Hinduism.','b',NULL),
 (88,'<p>Due to their extensive rice cultivation, some regions may be contributing to global warming. To what possible reason(s) is this attributed to?\r\n1. The anaerobic conditions associated with rice cultivation cause the emission of methane.\r\n2. When nitrogen based fertilizers are used, nitrous oxide is emitted from the cultivated soil.\r\nWhich of the statements given above is/are correct?</p>','MCQ',NULL,0,'Rice agriculture is a big source of atmospheric methane. Warm, waterlogged soil of rice paddies provides ideal conditions for methanogenesis.\r\nNitrogen-based fertilizer stimulates microbes in the soil to convert nitrogen to nitrous oxide at a faster rate than normal, leading to increased level of nitrous oxide.','c',NULL),
 (89,'<p>Consider the following statements regarding Ahrar movement of 1910 -\r\n1. It supported the loyalist politics of the Aligarh school towards the Britishers.\r\n2. Its political activities were directed against Hindus and the National Congress, and not against the foreign rulers.\r\nWhich of the statements given above is/are correct?</p>','MCQ',NULL,0,'na','c',NULL),
 (90,'<p>Which among the following cannot be attributed as a reason(s) for decline in population of pollinators?\r\n1. Changing nature of agriculture\r\n2. Habitat loss\r\n3. Pathogens\r\nSelect the correct answer using the codes given below:</p>','MCQ',NULL,0,'Pollination is a process in which pollen is transferred to the female reproductive organs of seed plants, thereby enabling fertilization and reproduction. It is very important for food supply.\r\nImportance of pollinators\r\n• Pollinators are important to growing fruits, vegetables and cash crops though not so much for cereal crops.\r\n• Food output worth more than $250 depend on pollinators especially industries like coffee, fruits\r\nReasons for the decline\r\n• Changing nature of agriculture with reduced diversity and wild flowers for pollinators to use as food\r\n• Pesticide use\r\n• Habitat loss to cities\r\n• Disease, parasites and pathogens\r\n• Global warming','d',NULL),
 (91,'<p>Which among the following pairs of Upavedas and associated Vedas is not correctly matched?\r\n1. Ayurveda – Rigveda\r\n2. Gandharaveda – Atharva Veda\r\n3. Shilpveda – Sama Veda\r\n4. Dhanurveda – Yajur Veda\r\nSelect the correct answer using the codes given below:</p>','MCQ',NULL,0,'There are four Upvedas:-\r\nArthveda (science of sociology and economics) is related to Rigveda\r\nDhanurveda (science of defense and war and the making of its related appliances) is related to Yajurveda.\r\nGandharvaveda (science of music, both singing and instrumental) is related to Samveda.\r\nAyurveda (the medical science) is related to Atharvaveda.','b',NULL),
 (92,'<p>Select the correct statements from the below about Schools of Indian Philosophy</p>','MCQ',NULL,0,'Charvakaisphilosophy of Indian school of materialists who rejected the notion of an afterworld, karma, liberation (moksha), the authority of the sacred scriptures, the Vedas, and the immortality of the self.\r\nSamkhya is dualistic realism. It is dualistic because it advocates two ultimate realities: Prakriti, matter and Purusha, self (spirit). Samkhya is realism as it considers that both matter and spirit are equally real.\r\nJainas does not uphold the authority of the Vedas and does not accept the existence of God.\r\nIt is not Buddhism, but Jainism that preaches that truth , or ultimate reality is multi faceted. This is known asAnekantvada - Aneka - meaning many. The Jains denote it by the story of the elephant and the six blind men. When six blind men feel an elephant, the one who touches the tail says an elephant is like a snake, the one who touches the elephants legs feels that elephant is like a pillar and so on. However, a man who has clear vision knows that the blind men are only describing a part of the elephant, and an elephant is not like a snake or a pillar. Similarly , reality has many facets, and mortal beings , like the blind men can see only parts o fit. \r\n\r\nBuddhism teaches four noble truths:-\r\n• 1.First truth is that life is suffering.\r\n• 2.Second truth is that suffering is caused by craving and aversion.\r\n• 3.Third truth is that suffering can be overcome and happiness can be attained.\r\n• 4.Fourth truth is that the Noble 8-fold Path is the path which leads to the end of suffering','a',NULL),
 (93,'<p>Which of the following social reformers contributed to the cause of Widow remarriage?\r\n1. Vishnu Shastri Pandit\r\n2. Jyotiba Phule\r\n3. Karsondas Mulji\r\n4. Ishwar Chandra Vidyasagar\r\nSelect the correct answer using the codes given below.</p>','MCQ',NULL,0,'Ishwar Chandra Vidyasagar was one of the foremost advocate of widow remarriage in India.\r\nVishnu ShastriPandit founded the Widow Remarriage Association in the 1850s.\r\nJyotibaphulewas against child-marriage and supported widow remarriage. He opened a home where widows could safely give birth and care for the infants.\r\nKarsandasMuljiwas repudiated by his family because of his views on widow remarriage. He started The Satya prakash in Gujarati in 1852 to advocate widow remarriage.','c',NULL),
 (94,'<p>Joint sitting of the two houses can take place if\r\n1. An ordinary bill is pending in other house for more than 6 months.\r\n2. Constitutional amendment bill has been rejected by other house.\r\nSelect the correct answer from the codes below:</p>','MCQ',NULL,0,'Joint sitting can take place if more than six months have been elapse from the date of the reception of the Bill by the other House without the Bill being passed by it.\r\nIn case of any disagreement between the two Houses of Parliament on a Constitution Amendment Bill, there cannot be a joint sitting of the Houses of Parliament, as article 368 of the Constitution requires each House to pass the Bill by the prescribed special majority.','c',NULL),
 (95,'<p>Which among the following can be termed as Money Bill?\r\n1. A bill dealing with imposition, remission, alteration or regulation of tax\r\n2. A bill dealing with regulation of the borrowing of money or the giving of any guarantee by the Government of India;\r\n3. A bill dealing with appropriation of money out of the consolidated Fund of India;\r\n4. A bill providing for the imposition of fines or fees\r\nSelect the correct answer using the codes given below.</p>','MCQ',NULL,0,'Money bills are bills which exclusively contain provisions for Imposition and abolition of taxes, regulation of borrowing by the government, for appropriation of moneys out of the Consolidated Fund, etc., are certified as Money Bills.\r\nBut a bill shall not be deemed to be a Money Bill by reason only that it provides for the imposition of fines or other pecuniary penalties','b',NULL),
 (96,'<p>With reference to Citizenship Act, 1955; A person can acquire Indian Citizenship by\r\n1. Naturalization\r\n2. By descent\r\n3. By incorporation of territory\r\n4. By registration\r\nSelect the correct answer using the codes given below.</p>','MCQ',NULL,0,'','d',NULL),
 (97,'<p>Consider the following statements With reference to Biological Oxygen Demand (BOD) and Chemical Oxygen Demand (COD):\r\n1. BOD is a measurement of consumed oxygen by aquatic microorganisms to decompose organic matter.\r\n2. COD refers to the requirement of dissolved oxygen for the oxidation of organic constituents.\r\nWhich of the statements given above is/are correct?</p>','MCQ',NULL,0,'1 only . Biochemical oxygen demand (BOD) (also called biological oxygen demand) is the amount of dissolved oxygen needed (i. e., demanded) by aerobic biological organisms to break down organic material present in a given water sample at certain temperature over a specific time period.\r\nCOD (Chemical Oxygen Demand) is the amount of oxygen required to degenerate all poution in a chemical way (by adding oxidising agents and heating). In general with chemical destruction you can remove more polution than with the biological way.\r\nAs BOD is only a measurement of consumed oxygen by aquatic microorganisms to decompose or oxidize organic matter and COD refers the requirement of dissolved oxygen for the oxidation of organic and inorganic constituents both. Hence COD must be greater than BOD.','a',NULL),
 (98,'<p>Consider the following statements\r\n1. India is the first country to buy Australian Uranium without being a signatory to nuclear non proliferation Treaty.\r\n2. Uranium is key to the second stage of India\'s 3 stage Nuclear Program\r\nSelect the correct statement from the codes given below</p>','MCQ',NULL,0,'The India - Australia Nuclear deal means that Indian has become the first country to buy yellowcake / Uranium from Australia without being a signatory to NPT.\r\nUranium is needed for the first stage of India\'s Nuclear Program. The second stages used MOX made from Plutonium. The third stage uses Thorium, of which we have reserves.','a',NULL),
 (99,'<p>Consider the following statements regarding the recently announced Monetary Policy Committee:\r\n1. The committee will have 5 members, three appointed by the RBI and two nominated by the external selection committee.\r\n2. Members of the committee appointed by the search committee shall hold office for a period of four years.\r\n3. India will be the first country to have a Monetary Policy Committee.\r\nWhich of the statements given above is/are correct?</p>','MCQ',NULL,0,'The government has announced the composition of the monetary policy committee (MPC) which will be mandated with the task of guiding interest rates in the economy.\r\nThe proposed committee will have six members, with three appointed by the Reserve Bank of India (RBI) and the remaining nominated by an external selection committee. The RBI governor will have the casting vote in case of a tie.\r\nAccording to the Finance Bill, the committee will consist of the RBI governor, the deputy governor in charge of monetary policy and one official nominated by the central bank.\r\nThe other three members will be appointed by the central government through a search committee, said the Finance Bill. This search committee will comprise of the cabinet secretary, the secretary of the Department of Economic Affairs, the RBI governor and three experts in the field of economics or banking as nominated by the central government.\r\nThe members of the MPC appointed by the search committee shall hold office for a period of four years and shall not be eligible for re-appointment, said the government.\r\nThe idea to set up a monetary policy committee was mooted by an RBI-appointed committee led by deputy governor Urjit Patel in February 2014. The bank’s internal panel had recommended a five-member committee where three members would be from the RBI and two external members would be appointed by the RBI governor and the deputy governor in-charge. It was also suggested that the governor would have a casting vote in case of a tie.\r\nThe issue took a controversial turn after the government put out a draft Indian Financial Code in July 2015, suggesting a different composition of the committee. The code, which the government later distanced itself from, suggested a seven-member committee, with four members being appointed by the government.\r\nThe final composition announced by the government seems to tread the middle path as it tries to address concerns over excessive government influence over monetary policy in the country. The government, however, has reserved the right to send its views to the monetary policy committee, if needed.\r\nThe monetary policy committee framework will replace the current system where the RBI governor and his internal team have complete control over monetary policy decisions. While a technical advisory committee advises the RBI on monetary policy decisions, the central bank is under no obligation to accept its recommendations.\r\nWith the introduction of the monetary policy committee, the RBI will follow a system similar to the one followed by most global central banks.\r\nSubject:\r\nEconomy','b',NULL),
 (100,'<p>Special 301 report which was recently in the news is related to</p>','MCQ',NULL,0,'Special 301 Report is prepared annually by the Office of the United States Trade Representative (USTR) under Section 301.\r\nReport annually identify a list of \"Priority Foreign Countries\", those countries judged to have inadequate intellectual property laws. In addition, the report contains a Priority Watch List and a Watch List.','c',NULL),
 (101,'<p>Which country recently unveiled its first Big Passenger Jet recently?</p>','MCQ',NULL,0,'Currently Passenger Jets are largely made by two companies only - Boeing & Airbus. It is very expensive to manufacture Passenger Jets and as R & D in aviation takes place makes emerging of new companies very difficult. China has recently unveiled its first indigenously made large passenger Jet.','a',NULL),
 (102,'<p>Consider the following statements about the Hemis National Park:\r\n1. It is a high altitude national park in the upper Siang district of Arunachal Pradesh.\r\n2. It is the only national park in India north of the Himalayas.\r\n3. It has high density of snow leopards.\r\nWhich of the statements given above is/are correct?</p>','MCQ',NULL,0,'1 is incorrect. Hemis National Park is a high altitude national park in the eastern Ladakh region of the state of Jammu and Kashmir in India. Statement 2 is correct. It is the only national park in India north of the Himalayas. Statement 3 is correct. It has high density of snow leopards','b',NULL),
 (103,'<p>Which among the following statement(s) is/are true about TREASORES project?\r\n1. It is associated with large area large scale production of organic optoelectronics devices.\r\n2. Electrodes used are made up of Indium Tin Oxide.\r\n3. It will provide for better mechanical flexibility and broad spectral usability.\r\nSelect the correct answer using the codes given below</p>','MCQ',NULL,0,'Why in news?\r\nResearches in Europe have developed a new technology - transparent electrodes and barrier material. It can be used in the next generation of flexible optoelectronics devices like tough panels, LEDs, solar cells etc .\r\nWhat is it?\r\n•  TREASORES stands for Transparent Electrodes for large area large scale production of organic optoelectronics devices.\r\n•  Currently, Indium Tin oxide (ITO) is widely used as electrodes in opto-electrical devices.\r\n•  Transparent Organic Electrode -It uses electrodes made of organic polymers which are made of combination of molecules unlike ITO electrodes which are made of combination of two atoms\r\n•  The only concern as of now is the efficiency and charge mobility (because atoms are neatly arranged in ITO electrodes unlike organic electrodes).\r\nAdvantages of using Transparent Organic Electrodes\r\n•  Organic electrodes have their building blocks as molecules which being larger than atoms are easier to work with.\r\n•  Low cost\r\n•  Better mechanical flexibility\r\n•  Broad spectral usability.\r\n•  Including TRANSPARENT BARRIERS would prevent moisture and oxygen entry from reaching sensitive organic electronic devices.\r\n•  Therefore a combination of transparent organic electrode and barrier could be a boon for solar industry in terms of cost and flexibility of devices.','c',NULL),
 (104,'<p>Consider the following statements about Mediterranean Type of Climate\r\n1. It is found between 30 - 40 degrees latitude\r\n2. It occurs only in the Northern Hemisphere\r\n3. It is known for dry summers and wet winters.\r\nSelect the correct statements from the choices given below</p>','MCQ',NULL,0,'Mediterranean climate is found between the 30 and 45 degree latitudes. This climate is often found on the western sides of continents. Mediterranean climate gets its name from the climate found around the Mediterranean Sea.\r\nMediterranean climate is very mild (few extreme temperatures), so it really on has 2 seasons: summer and winter. Summers are longer than winter, and the winter is very mild. Very few places experience snow in a Mediterranean climate. The seasonal changes are due to changes in ocean currents and water temperature.\r\nThe climate is known for warm to hot, dry summers and mild to cool, wet winters. Winter temperatures are usually between 30 and 65 degrees. Summer months all average above 50 degrees. The warmest month averages about 72 degrees. The cause of this climate is directly related to large bodies of water such as the Mediterranean Sea and ocean currents. During the summer, cold currents keep the climate mild and dry. Ocean currents shift as the seasons change. During the winter the water that was warmed up all summer moves in and keeps the land warm and often brings rain.\r\nMediterranean climate is a fairly dry climate. Almost no rain falls during the summer, so most of the rain falls during the cooler winter. The summer experiences cold ocean currents that bring dry air and no precipitation. During the winter the currents shift and warmer, moist air brings rain to these areas. Snow can fall in higher elevation areas or places that are farther north. Mediterranean climates receive around 20 inches of annual (yearly) rainfall.\r\nVegetation: Plants in Mediterranean climate must be able to survive long dry summers. Evergreens such as Pine and Cypress trees are mixed with deciduous tress such as some Oaks. Fruit trees and vines such as grapes, figs, olives, and citrus fruits grow well here. Other plants include what are called scrub, which include small shrubs, grasses, and herbs.\r\nAnimals: In order to survive here, animals must be able to live in rugged land and not depend too much on large areas of grass to graze. The natural wildlife found here include goats and sheep. These animal graze, but eat a wide variety of plants compared to cows who rely on grasses. Rabbits, jackels, and lynx can also be found here.','c',NULL),
 (105,'<p>Which of the following rights are not enjoyed by a foreign citizen residing in India?</p>','MCQ',NULL,0,'Only following fundamental rights are available to foreign nationals:\r\nArticle 14 - Right to equality before law and equal protection of laws\r\nArticle 20 - Right to protection in respect of conviction for offences\r\nArticle 21- Right to protection of life and personal liberty\r\nArticle 21A - Right to elementary education\r\nArticle 22 - Right to protection against arrest and detention in certain cases\r\nArticle 23 - Prohibition of traffic in human beings and forced labour\r\nArticle 24 - Prohibition of employment of children in factories etc.,\r\nArticle 25 - Right to freedom of conscience and free profession, practice and propagation of religion\r\nArticle 26 - Right to freedom to manage religious affairs\r\nArticle 27 - Right to freedom from payment of taxes for promotion of any religion\r\nArticle 28 - Right to freedom from attending religious instruction or worship in certain educational institutions','d',NULL);
INSERT INTO `questions` (`id`,`question`,`type`,`parentQuestionId`,`isDeleted`,`explanation`,`correctAnswer`,`subjectId`) VALUES 
 (106,'<p>Increased level of carbon dioxide in the atmosphere would impact the plants in many ways. These can be:\r\n1. Decrease in photosynthetic productivity of plants.\r\n2. Proliferation of weeds.\r\nSelect the correct answer using the codes given below.</p>','MCQ',NULL,0,'Increased CO2 concentration in the atmosphere may increase photosynthetic productivity of plants. This in turn produces more organic matter. \r\nWeeds may proliferate rapidly and that too at the expense of useful plants.','b',NULL),
 (107,'<p>The Green Road Initiative, recently in news, is associated with</p>','MCQ',NULL,0,'','b',NULL),
 (108,'<p>Consider the following statements\r\n1. Predatory Dumping of goods is destroying competition by selling goods at low prices and then increasing prices after elimination of competition.\r\n2. Sporadic dumping means selling goods at a low price in foreign country to offload inventory\r\n3. Persistent dumping means selling products at a lower price in the foreign market due to difference in elasticity of demand in home and foreign market.\r\nWhich of the above are correct?\r\n\r\n Consider the following statements\r\n1. Predatory Dumping of goods is destroying competition by selling goods at low prices and then increasing prices after elimination of competition.\r\n2. Sporadic dumping means selling goods at a low price in foreign country to offload inventory\r\n3. Persistent dumping means selling products at a lower price in the foreign market due to difference in elasticity of demand in home and foreign market.\r\nWhich of the above are correct?</p>','MCQ',NULL,0,'In Predatory Dumping foreign companies or governments price their products below market values in an attempt to drive out domestic competition.\r\nSporadic dumping is an occasional dumping of a product whereby the seller wants to get rid of surplus stocks.\r\nIn Persistent Dumping, domestic monopolists maximize their benefits by selling the commodity at a higher price in the domestic market than internationally. It is due to the difference in demand elasticity of products in different markets. Good can be sold with a lower price where the demand elasticity is high; and with a higher price where demand elasticity is low.','d',NULL),
 (109,'<p>Which of the following statement(s) is/are incorrect in the context of Lakes in India?\r\n1. Chilka is the biggest lagoon lake of the country.\r\n2. Ashtamudi, the biggest salt water lake of India is in Kerala.\r\n3. Vembanad Lake is the longest lake of India.\r\nSelect the correct answer using the codes given below:</p>','MCQ',NULL,0,'This is any easy question which should be answered by every candidate.\r\nYou do not need to have read any text for this. A basic study of Indian Agriculture system will tell you this. This question has been based on a previous year paper.','d',NULL),
 (110,'<p>In India, the type of agriculture can be said to be</p>','MCQ',NULL,0,'','',NULL),
 (111,'<p>Consider the following statements\r\n1. The Sargent Report first recommended for introduction of free and compulsory education for children from 6 to 11 years\r\n2. The English Education Act of 1835 allocated funds for furthering education in English Language in British India\r\nSelect the correct statements from the choices given below</p>','MCQ',NULL,0,'','c',NULL),
 (112,'<p>) Consider the following statements regarding ordinary bills.\r\n1. It can be kept for maximum 3 months by Rajya Sabha.\r\n2. Rajya Sabha has power to amend it but cannot reject it.\r\n3. It can only be introduced by a minister or a private member.\r\nSelect the correct statement using the codes below:</p>','MCQ',NULL,0,'If second House does not take any action for six months, a deadlock is deemed to have taken place. And joint sitting can be summoned by president.\r\nSecond house may reject the bill altogether.\r\nOrdinary bill can be introduced either by a minister or by any other member. The member who wants to introduce the bill has to ask for the leave of the House.','b',NULL),
 (113,'<p>Which of the following is/are the functions of Reserve Bank of India (RBI)?\r\n1. It is the distributing agent of all the currency and coins issued by the government\r\n2. It announces the monetary and fiscal policy for the economy\r\n3. It grants licences to set up new banks\r\n4. It helps in stabilising the exchange rate of rupee\r\nSelect the correct options using the codes given below:</p>','MCQ',NULL,0,'Main Functions of RBI:-\r\n• It formulates implements and monitors the monetary policy.\r\n• RBI is Regulator and supervisor of the financial system.\r\n• Manager of Foreign Exchange\r\n• Issuer of currency:\r\n• RBI Perform wide range of promotional functions to support national objectives.\r\n• Banker to the Government\r\n• Banker to banks','a',NULL),
 (114,'<p>Consider the following statements regarding the Financial Action Task Force (FATF).\r\n1. It gives recommendation on preventing money laundering as well as terrorism financing.\r\n2. India is a full time member of FATF\r\n3. It has no authority to place sanctions on countries violating laws related to money laundering and terrorism financing\r\nWhich of the statements given above is/are incorrect:</p>','MCQ',NULL,0,'The Financial Action Task Force (FATF) is an inter-governmental body established in 1989. The objectives of the FATF are to set standards and promote effective implementation of legal, regulatory and operational measures for combating money laundering, terrorist financing.\r\nFATF is just a policy-making body which works to generate the necessary political will to bring about national legislative and regulatory reforms in these areas. Thus it cannot place sanctions on non-complaint countries.\r\nIndia had become Observer at FATF in the year 2006. Since then, India has been working towards full-fledged Membership of FATF. Now India has become a full-fledged member of Financial Action Task Force (FATF).','d',NULL),
 (115,'<p>With reference to Sundri, a dominant mangrove tree species of the Sundarbans, consider the following statements:\r\n1. It is highly valued for its timber\r\n2. The IUCN has assessed it as being endangered.\r\nWhich of the statements given above is/are correct?</p>','MCQ',NULL,0,'Sundri is dominant mangrove tree species of the Sundarbans of Bangladesh and India, and comprises about 70% of the trees in the area. it is a major timber-producing tree. It is threatened by over-harvesting, water diversions in the Ganges Basin, fluctuations in salinity due to upstream and coastal development and top dying disease. The International Union for Conservation of Nature has assessed it as being endangered','c',NULL),
 (116,'<p>Which of the following statement(s) are incorrect in the context of sedimentary and metamorphic rocks?\r\n 1)  Different  layers  are  found  in  between sedimentary  rocks  whereas  layers  are  not found in metamorphic rocks like in sedimentary rocks.\r\n 2)  Sedimentary rocks do not contain remains of organism whereas metamorphic rocks contain remains of organisms.\r\nSelect the correct answer using the codes given below:</p>','MCQ',NULL,0,'Sedimentary rocks contain remains of living beings and vegetation but not in metamorphic rocks.','b',NULL),
 (117,'<p>Consider the following statements\r\n1. Bhutan was the first country to come up with Gross National Happiness Index\r\n2. Bhutan is the World\'s first carbon negative country\r\nSelect the correct statements from the codes given below</p>','MCQ',NULL,0,'Bhutan is not merely carbon neutral, it’s also a carbon sink—making it one of the few countries in the world to have negative carbon emissions. According to recent figures, the country emits around 1.5 million tonnes of carbon annually, while its forests absorb over 6 million tonnes. Bhutan is aiming for zero net greenhouse gas emissions, zero-waste by 2030 and to grow 100 percent organic food by 2020. The Himalayan nation is currently 72 percent forested and the constitution requires that no less than 60 percent of it remains forested.\r\nBhutan also refuses to judge its success on Gross Domestic Product, instead using an index that measures Gross National Happiness.\r\nBhutan’s Gross National Happiness index gives the natural world a central place in the making of public policy, and environmental protection is a core guiding principle in Bhutan’s constitution','c',NULL),
 (118,'<p>Which of the following are challenges for skill development in India?\r\n1. Low literacy rate\r\n2. Cultural Diversity of the country\r\n3. Geographical distance between skill centers and human resources\r\n4. Lack of placement linkages\r\nSelect the correct statements from the codes given below</p>','MCQ',NULL,0,'All of these are challenged to Skill Development in India. Low Literacy levels are conventional problems responsible for skill development as inter alia,  a written curriculum becomes difficult to disseminate. Geographical Distance and Placement Linkages have been listed by the Economic Survey as challenges to Skill Development.\r\nCultural Diversity of India makes it difficult to have a centralised curriculum or a single type of skill to be disseminated at the National Level. For example different regions, communities, tribes and people have very different existing specialization and cultural preferences. So government has to plan very different kind of skills development programs for diverse kind of people.\r\nFor example, Nayi Mazil Scheme is directed towards people educated in Madarsas which may not be applicable in other communities.','d',NULL),
 (119,'<p>Which of the following are not the benefits of Cloud Computing?</p>','MCQ',NULL,0,'Cloud Computing simply means the practice of using a network of remote servers hosted on the Internet to store, manage, and process data, rather than a local server or a personal computer.\r\nAn example would be using Dropbox , where all your information is saved remotely on the cloud and available from anywhere.\r\nCloud computing provides optimum use of resources. This is because unused resources such disk space, CPU etc are sold or provided in smaller units to large number of users.\r\nCloud computing provides higher degree of privacy and security over conventional methods is incorrect. The biggest issue with cloud computing is that since you do not own a separate server or resource but are merely sharing a part of the resource which is being shared with a large number of users, privacy concerns remain. Think of it like having your own office/flat, vs having a shared office/ shared flat with another organisation/people. Having one\'s own office/flat offers more privacy as compared to having a shared office/flat.\r\nCloud Computing reduces the cost of infrastructure for end users is correct. You only pay for what you use and costs are brought down.','b',NULL),
 (120,'<p>Liquidity Trap is a situation in which</p>','MCQ',NULL,0,'By definition, A liquidity trap is a situation, described in Keynesian Economics, in which injections of cash into the private banking system by a central bank fail to decrease interest rates and hence make monetary policy ineffective. \r\nHence, The rate of interest is so low that no one wants to hold interest bearing assets and people wants to hold cash. Option C is correct','c',NULL),
 (121,'<p>Tamil Nadu coast in rainy season remains dry. Its reason(s) is/are:\r\n1.  Tamil Nadu coast is parallel to monsoon winds of Bay of Bengal.\r\n2.  This is located at shadow region of Arabian Sea branch of South-West Monsoon.\r\n3.  Oceanic climate affects Tamil Nadu coast.\r\nWhich of the above statements) is/are correct?</p>','MCQ',NULL,0,'Oceanic Climate does not contribute for dryness of Tamil Nadu coast in rainy season.','b',NULL),
 (122,'<p>A political party is recognized by the Election Commission only if:\r\n1. It has been engaged in political activity for a continuous period of 5 years.\r\n2. It has returned at least one member of the Lok Sabha for every 25 members of that house or any fraction of that number elected from that state.\r\n3. It has polled not less than six percent of the total number of valid votes polled by all contesting candidates at the general elections.\r\n4. It has contested election in four or more states in three consecutive general elections.\r\nSelect the correct answer using the codes given below.</p>','MCQ',NULL,0,'Criteria for recognition of a party:-\r\n• 1.If party has been engaged in political activity for a continuous period of five years.\r\n• 2.Party has won 1 Loksabha seat for every 25 Lok Sabha seat allotted for the State.\r\n• 3.Party has polled minimum of 6% of votes in a State and in addition it has won 1 Lok Sabha or 2 Legislative Assembly seats.\r\n• 4.At a General Election to Lok Sabha or Legislative Assembly, the party has polled 8% of votes in a State.\r\n4th option is not a condition included in the criteria.\r\nNote that if a Political Party is recognised in 4 or more states, then it gets the Status of National Party\r\nSubject:\r\nPolity','c',NULL),
 (123,'<p>The members of the Inter-state council are:\r\n1. Six cabinet ministers nominated to it.\r\n2. Chief Ministers of all States\r\n3. Secretaries of Union Ministers\r\n4. Governors of all states\r\nSelect the correct answer using the codes given below.</p>','MCQ',NULL,0,'Inter-State Counc il shall consist of:-\r\n• 1.Prime Minister - Chairman\r\n• 2.Chief Ministers of all States -Member\r\n• 3.Chief Ministers of Union Territories having a Legislative Assembly and Administrators of UTs not having a Legislative Assembly - Member\r\n• 4.Six Union Ministers of Cabinet rank in the Union Council of Ministers nominated by the Prime Minister – Member\r\nGovernors and secretaries are not included in council.','a',NULL),
 (124,'<p>)  Which of the following statements is/are correct?\r\n 1. Plain of Indus, Ganga and Brahmaputra is a land convergent trough.\r\n 2. Indian Peninsular plain is basically formed by gneiss and granite.\r\nWhich of the above statements) is/are correct?</p>','MCQ',NULL,0,'There was a shallow trough or geosyncline in between the Himalayas and the Deccan plateau during the latter geological period of the formation of the Himalayas.\r\nAfter the upliftment of the Himalayas, sediments and debris brought down by the rivers, began to accumulate there to form the vast alluvial plain of northern India.\r\nPeninsular plateau is formed of highly stable block composed mostly of the Archaean gneisses and schists.','c',NULL),
 (125,'<p>Consider the following statements about Indian State of Forest Report 2015.\r\n1. Maximum increase in forest cover has been observed under Very Dense Forest category.\r\n2. Mangrove cover has increased as compared to the last forest report.\r\nWhich of the statement(s) given above is/are correct?</p>','MCQ',NULL,0,'The India State of Forest Report (ISFR) 2015 states that the majority of the increase in forest cover has been observed in open forest category mainly outside forest areas, followed by Very Dense Forest.\r\nIn world’s total mangrove vegetation, India’s share stands at 3%. Currently Mangrove cover in India is 4740 km² which is 0.14 % of the country’s geographical area. Sundarbans in West Bengal accounts for almost half of the total area. As compared to 2013 there is a net increase of 112 sq km in the mangrove cover.\r\nRead Summary below\r\nSubject:\r\nEnvironment & Biodiversity','b',NULL),
 (126,'<p>Consider the following statements regarding the Communal Award\r\n1. It declared the Sikhs, Christians and Depressed classes as minorities.\r\n2. It was rejected by the congress\r\n3. It lead to the signing of Poona Pact which was accepted by the British govt. as amendment to the communal award.\r\nWhich of the statements given above is/are correct:</p>','MCQ',NULL,0,'It declared the Depressed classes as minorities entitled to separate electorate and thus separated them from rest of the Hindus.\r\nThe Congress decided to neither accept it nor reject it.','c',NULL),
 (127,'<p>Which among the following set of pairs are incorrectly matched?\r\n       National Parks                                    Associated Primary Wildlife \r\n1. Keoladeo National Park      -          Wild Buffalo\r\n2. Manas National Park          -           Tiger \r\n3. Bandipur National Park     -           Nilgiri Tahr\r\nSelect the correct answer using the codes given</p>','MCQ',NULL,0,'Keoladeo National Park is a bird sanctuary earlier known as Bharatpur Bird Scantuary. It is an avifaunascantuary.\r\nBandipur National Park is Tiger reserve.','a',NULL),
 (128,'<p>Consider the following statement regarding the Civil Disobedience Movement\r\n1. It saw a massive participation by the Muslims, almost similar to that of Non-Cooperation Movement.\r\n2. Many major labour upsurges collided with Civil Disobedience Movement.\r\n3. Congress was organisationally stronger at the time of Civil Disobedience Movement.\r\n4. There was a massive participation by peasants and business groups\r\nWhich of the statements given above is/are correct?</p>','MCQ',NULL,0,'Participation of Muslims in Civil Disobedience Movement was not at the scale of non-cooperation movement at all. The Khilafat movement started as movement for restoration of the Khalifa for Muslims. Mahatma Gandhi decided to use this movement to brings Muslims into the National Struggle ( for which he would be criticised then and later ). Muslim participation was very high then.\r\nBut in the CDM, the Muslim Participation was nowhere like the Khilafat Movement.\r\nOption 2 is incorrect.\r\nCongress was stronger at the time of CDM.\r\nThere were more participation of women ,businessmen and other section of society in CDM than NCM.','c',NULL),
 (129,'<p>Which among the following is/are the appropriate condition(s) required for Condensation?\r\n1.  When temperature of air decreases to dew point, volume remaining constant.\r\n2.  When volume of air increases without increasing quantity of heat.\r\n3.  When more water vapour is added through vaporisation.\r\nWhich of the following statements) is/are correct</p>','MCQ',NULL,0,'Condensation is transition from vapor phase to liquid phase.\r\nThe lower the air temperature, the smaller the maximum possible capacity for vapour. When air is cooled, relative humidity increases, until at a particular temperature, called the dew point, the air becomes saturated.\r\nFurther cooling below the dew point will induce condensation of the excess water vapour.\r\nBoth air temperature and absolute humidity will determine what type of condensation will occur when the air is cooled.\r\nCondensation will form on any object when thetemperature of the object is at or below the dewpoint temperature of the air surrounding the object.','d',NULL),
 (130,'<p>Which of the following roles are played by flood plains in enviornment ?\r\n1. Flood protection\r\n2. Recharge of Aquifiers\r\n3. Increase in Soil Fertility\r\n4. Improvement in water quality\r\nSelect the correct answer using the codes given below:</p>','MCQ',NULL,0,':- Benefits of the flood plains are:-\r\n• Flood Protection\r\n• Recharged Aquifers\r\n• Improved Water Quality\r\n• Accumulation of fertile soil brought by river from other places\r\n• Improved Wildlife Habitat\r\n• Recreational Industries','d',NULL),
 (131,'<p>Which among the following can be termed as benefits of categorisation of polluting industries using colour coding?\r\n1. Greater Scrutiny\r\n2. Ease of doing business\r\n3. Easier financing\r\n4. Better site selection\r\nSelect the correct answer using the codes given below:</p>','MCQ',NULL,0,'Benefits of colour coding of polluting industries.\r\n• This would place the heavily polluting industries under greater scrutiny.\r\n• Low polluting industries would be saved from unnecessary hassles of periodic renewals. Thus, it would facilitate ease of doing business.\r\n• Better site selection for new red category industries as they will not be allowed in ecologically sensitive areas.\r\n• Colour coding would enable easier financing for environmental friendly industries.','c',NULL),
 (132,'<p>Which among the following can be considered as a direct method to reduce economic inequalities?</p>','MCQ',NULL,0,'Cash transfer to poor is the most direct way to reduce economic inequality. Other methods provided in the options also reduce inequality, but providing benefit to poor depends further on government that how it decides to spend revenue earned through taxes. Economists also argue that taxing the rich may not help reduce inequality as it leads to evasion.\r\nCash Transfer is the most suitable option.','b',NULL),
 (133,'<p>)  Which of the following statement is correct?</p>','MCQ',NULL,0,'• 1.communicate to the President all decisions of the Council of Ministers relating to the administration of the affairs of the Union and proposals for legislation;\r\n• 2.Or any decision regarding the above as president may ask.\r\n• 3.Any matter brought by president to the notice of council, which was taken by ministers but has not been considered by council.\r\nPrime Minister is duty bound to communicate all the decisions of his Council of Ministers in respect of the concerned affairs to the president.','a',NULL),
 (134,'<p>Which among the following is/are costs of inflation?\r\n1. Inflation weakens the creation of credit and capital markets.\r\n2. Inflation distorts business behaviour, especially investment behaviour\r\n3. Inflation increases the prices of foreign goods relative to domestic goods.\r\n4. Inflation imposes a tax on the holders of the money\r\nSelect the correct answer using the codes given below:</p>','MCQ',NULL,0,'Inflation has a major distorting effect on investment behaviour as people tends to invest more in physical instruments like gold, real estate etc. rather than in financial instruments. This leads to weaker capital/credit creation in the market.\r\nAlso, with inflation there is a chance of bracket creep which pushes an individual income to higher tax bracket without actual increment in the value of money thus imposing an extra tax on individual income. Also, the value of money forgone due to inflation when a person holds money is known as Inflation Tax.\r\nThere is no direct relationship between the prices of foreign goods and inflation in a country','c',NULL),
 (135,'<p>Which of the following acts were directly involved with the causes for Revolt of 1857?\r\n1. Religious Disabilities Act, 1856.\r\n2. General Service Enlistment Act, 1856.\r\n3. Charter Act of 1853.\r\nSelect the correct answer using the codes given below:</p>','MCQ',NULL,0,'Religious Disabilities Act, 1856 modified Hindu customs, for instance declaring that a change of religion did not debar a son from inheriting the property of his heathen father.It was considered an interference in the social and religious domains of Indian society by outsiders.\r\nGeneral Service Enlistment Act, 1856, declared that all future recruits to the Bengal Army would have to give an undertaking to serve anywhere their services might be required by the Government. This caused resentment.\r\nCharter Act of 1853 was not responsible for Revolt of 1857.','d',NULL),
 (136,'<p>Under which of the following circumstances an elected member of Parliament may be disqualified on the ground of defection?\r\n1. If he voluntarily gives up his membership of a political party.\r\n2. Ife he votes or abstains from voting contrary to any direction issued by his political party without prior permission of the political party.\r\n3. If he speaks against the political party.\r\n4. If he joins a political party other than the party on whose ticket he contested and got elected.\r\nSelect the correct statement using the codes given below.</p>','MCQ',NULL,0,'Member of Parliament may be disqualified on the following grounds:-\r\nIf he voluntarilygives up his membership of such political party or votes or abstains from voting in the House contrary toany direction of such party.\r\nThere is no rule of disqualification when any MP speaks against his party.\r\nif he joins anypolitical party after his election.','b',NULL),
 (137,'<p>Which of the following are the benefits accrued to a site listed under the Ramsar List of Wetlands of International Importance ?\r\n1. It adds tourism value to the site\r\n2. It provides for exchange of best conservation practices \r\n3. It enables sites to receive funds through the Small Grants Funds set up under the Ramsar Convention\r\nSelect the correct answer using the codes given below.</p>','MCQ',NULL,0,'It adds tourism value to the site\r\nIt provides for exchange of best conservation practices\r\nIt enables sites to receive funds through the Small Grants Funds set up under the Ramsar Convention\r\nThe Parties to the Convention established the Small Grants Fund (SGF) in 1990 to help developing countries support the conservation and wise use of wetland resources, and the sustainable development of communities which depend on them and care for them. Since then, the Fund has provided over eight million Swiss Francs to over 240 projects from 110 countries.\r\nSubject:\r\nEnvironment & Biodiversity','d',NULL),
 (138,'<p>Consider the following statements regarding civil services\r\n1. Warren Hastings separated administrative and commercial branches of civil services.\r\n2. Cornwallis separated the posts of civil judge and the collector.\r\n3. Statutory Civil service was introduced by Lord Lytton\r\nSelect the correct answer using the codes given below.</p>','MCQ',NULL,0,'Post of District Magistrate (also called District Collector) was first created in 1772, under Warren Hastings. Administrative and commercial branches of civil services was separated.\r\nDuring the period of Cornwallis, Collectors were striped of the judicial functions. Reorganization of the revenue courts took place during his period.\r\nStatutory Civil Services was introduced by Lytton in 1879. Now candidates had to appear and pass the civil services examination which began to be held in England.','d',NULL),
 (139,'<p>Which among the following is not a possible cost of high fertility rates and rapid population growth?</p>','MCQ',NULL,0,'Increasing return to natural resources means better efficiency in usage of natural resources. While the second part of option a is correct the first half is something that cannot be directly related and has more of a dependence on technology advancement than increase in population.','a',NULL),
 (140,'<p>) According to the World Malaria report 2015 of WHO which of the following recently became the first to wipe out Malaria completely?</p>','MCQ',NULL,0,'Europe was declared Malaria free by WHO in its World Malaria Report 2015. Particular region or country is declared Malaria free by WHO after it has zero locally acquired malaria cases for at least three consecutive years.','c',NULL),
 (141,'<p>Which of the following are advantages of Zero tillage farming?\r\n1. It reduces the cost of labour, fuel and irrigation\r\n2. It reduces the use of herbicides and weed management\r\n3. It helps retain soil moisture and reduces irrigation cost\r\nSelect the correct answer using the codes given below:</p>','MCQ',NULL,0,'No-till or zero tillage agriculture is part of the practice of conservation agriculture.\r\nIt is a way of growing annual crops (from year to year) without disturbing the soil unlike traditional forms of agriculture that use tillage.\r\nTillage is the use of ploughs and other implements to prepare the soil for planting. Tilling the soil removes weeds and shapes the soil into rows for crop plants.\r\nHowever, there are some undesirable effects of tillage. These are listed below:\r\nSoil compaction\r\n• Disruption of soil microbes\r\n• Loss of organic matter\r\n•  Soil erosion where the topsoil is washed or blown away\r\n•  Increased evaporation of water\r\nThese are negated when a no-till farming is used.\r\nNo-till has advantages as listed below:\r\n•  Reduced labour costs\r\n•  Reduced fuels costs\r\n•  Reduced machinery costs\r\n•  Reduced irrigation\r\n•  Increased yields due to higher water infiltration and storage capacity\r\n•  Less erosion\r\n•  Improvement in soil quality•','d',NULL),
 (142,'<p>The low level of salinity near to equatorial circle compared to everywhere else can be attributed to:\r\n1.  Heavy Rainfall\r\n2.  High relative humidity\r\n3.  Sky covered with cloud\r\n4.  Condition of Doldrum.\r\nSelect the correct answer using the codes given below:</p>','MCQ',NULL,0,'No-till or zero tillage agriculture is part of the practice of conservation agriculture.\r\nIt is a way of growing annual crops (from year to year) without disturbing the soil unlike traditional forms of agriculture that use tillage.\r\nTillage is the use of ploughs and other implements to prepare the soil for planting. Tilling the soil removes weeds and shapes the soil into rows for crop plants.\r\nHowever, there are some undesirable effects of tillage. These are listed below:\r\nSoil compaction\r\n• Disruption of soil microbes\r\n• Loss of organic matter\r\n•  Soil erosion where the topsoil is washed or blown away\r\n•  Increased evaporation of water\r\nThese are negated when a no-till farming is used.\r\nNo-till has advantages as listed below:\r\n•  Reduced labour costs\r\n•  Reduced fuels costs\r\n•  Reduced machinery costs\r\n•  Reduced irrigation\r\n•  Increased yields due to higher water infiltration and storage capacity\r\n•  Less erosion\r\n•  Improvement in soil quality•','d',NULL),
 (143,'<p>Consider the statement regarding Sir Creek Dispute, 96-km estuary between India and Pakistan, cutting through where Gujarat State and Sindh province meet:</p><p>1. Pakistan claims the entire Sir Creek based on a 1914 agreement signed between the government of Sindh and rulers of Kutch</p><p>.2. India claims that the boundary lies mid-channel, as was depicted in a map in 1925 and implemented with pillars placed to mark the boundary.</p><p>Select the correct statement(s) using the codes given below:</p>','MCQ',NULL,0,'Sir Creek, called Baan Ganga locally, is a 96 kilometers long estuary in the marshes of the Rann of Katch, situated on the border between India’s Gujarat and Pakistan’s Sindh.\r\nPakistan lays claim to the entire creek as per paragraphs 9 and 10 of the Sind Government Resolution of 1914. Resolutiondemarcated the boundaries, included the creek as part of Sindh.\r\nWhile India sticks to its position that the boundary lies mid-channel as depicted in another map drawn in 1925, and implemented by the installation of mid-channel pillars back in 1924.','c',NULL),
 (144,'<p>Which of the following make the highest contribution to the wetland habitat of India?</p>','MCQ',NULL,0,'Of total wetland habitats. About 70% of this comprises areas under paddy cultivation.','b',NULL),
 (145,'<p>The proposals of the Cabinet Mission did not include:</p><p>1. Formation of a Constituent Assembly</p><p>2. Creation of a sovereign Pakistan with six Muslim-majority provinces</p><p>Select the correct answer using the code given below:</p>','MCQ',NULL,0,'Proposals of cabinet mission included:-\r\n• A united Dominion of India would be given independence. Central government would be empowered to handle nationwide affairs, such as defense, currency, and diplomacy.\r\n• Rest of powers and responsibility would belong to the provinces.\r\n• Muslim-majority provinces would be grouped, with Sind, Punjab,Baluchistan and North-West Frontier Province forming one group.\r\n• Bengal and Assam would form another group.\r\n• Hindu-majority provinces in central and southern India would form another group.\r\n• Provided for formation of the constituent assembly on democratic principle of population.\r\n• Cabinet rejected the Muslim league’s demand for a separate Pakistan.','b',NULL),
 (146,'<p>Which of the following is not true about the Village Panchayats?</p>','MCQ',NULL,0,'','a',NULL),
 (147,'<p>Consider the following statement.</p><p>1. Chalcolithic  Age  in  India  was  marked  by the  use  of  copper  and  stone.</p><p>2. Microlith is the tool marked in Palaeolithic Age.</p><p>3. The earliest known agrarian settlement in the Indian subcontinent come from the west of the Indus system.</p><p>Which of the above statement(s) is/are correct?</p>','MCQ',NULL,0,'1&3 , in second statement it is Mesolithic Age which is  marked  by  microliths  (very  small  tools).Chalcolithic cultures  extended  from  the Chotanagpur plateau to the upper Gangetic','b',NULL);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;


--
-- Definition of table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
CREATE TABLE `subjects` (
  `id` int(70) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subjects`
--

/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` (`id`,`name`) VALUES 
 (1,'Current Affairs'),
 (2,'social Science'),
 (3,'History');
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;


--
-- Definition of table `test_user_answer`
--

DROP TABLE IF EXISTS `test_user_answer`;
CREATE TABLE `test_user_answer` (
  `id` int(70) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(70) unsigned NOT NULL,
  `testId` int(70) unsigned NOT NULL,
  `questionId` int(70) unsigned NOT NULL,
  `answer` varchar(45) DEFAULT NULL,
  `isMarked` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `combo` (`userId`,`testId`,`questionId`)
) ENGINE=InnoDB AUTO_INCREMENT=10596 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `test_user_answer`
--

/*!40000 ALTER TABLE `test_user_answer` DISABLE KEYS */;
INSERT INTO `test_user_answer` (`id`,`userId`,`testId`,`questionId`,`answer`,`isMarked`) VALUES 
 (155,8,2,1,'a',0),
 (156,8,2,6,'a',0),
 (157,8,2,7,'',0),
 (158,8,2,15,'a',0),
 (159,8,2,16,'b',0),
 (160,8,2,20,'a',0),
 (209,8,4,1,'b',0),
 (210,8,4,6,'a',1),
 (211,8,4,7,'a',0),
 (212,8,4,15,'a',0),
 (213,8,4,16,'b',0),
 (214,8,4,20,'a',0),
 (269,21,4,1,'b',0),
 (270,21,4,6,'b',0),
 (271,21,4,7,'b',1),
 (272,21,4,15,'b',1),
 (273,21,4,16,'b',0),
 (274,21,4,20,'b',0),
 (347,22,4,1,'a',0),
 (348,22,4,6,'b',0),
 (349,22,4,7,'a',0),
 (350,22,4,15,'',0),
 (351,22,4,16,'',0),
 (352,22,4,20,'',0),
 (371,11,4,1,'a',0),
 (372,11,4,6,'b',0),
 (373,11,4,7,'a',0),
 (374,11,4,15,'b',0),
 (375,11,4,16,'a',0),
 (376,11,4,20,'b',0),
 (413,20,4,1,'b',0),
 (414,20,4,6,'b',0),
 (415,20,4,7,'b',0),
 (416,20,4,15,'b',0),
 (417,20,4,16,'b',0),
 (418,20,4,20,'b',0),
 (461,8,7,1,'c',0),
 (462,8,7,6,'b',0),
 (463,8,7,7,'b',0),
 (464,8,7,15,'a',0),
 (465,8,7,16,'b',0),
 (466,8,7,20,'c',0),
 (509,21,6,1,'b',0),
 (510,21,6,6,'a',0),
 (511,21,6,7,'a',0),
 (512,21,6,15,'b',0),
 (513,21,6,16,'b',0),
 (514,21,6,20,'b',0),
 (611,8,6,1,'c',1),
 (612,8,6,6,'a',0),
 (613,8,6,7,'b',0),
 (614,8,6,15,'b',0),
 (615,8,6,16,'',0),
 (616,8,6,20,'',0),
 (617,8,4,21,'',0),
 (624,8,4,44,'',0),
 (625,8,4,45,'',0),
 (633,9,6,1,'',0),
 (634,9,6,6,'',0),
 (635,9,6,7,'',0),
 (636,9,6,15,'',0),
 (637,9,6,16,'',0),
 (638,9,6,20,'',0),
 (639,9,6,21,'',0),
 (640,9,6,44,'',0),
 (641,9,6,45,'',0),
 (642,9,7,1,'',0),
 (643,9,7,6,'',0),
 (644,9,7,7,'',0),
 (645,9,7,15,'',0),
 (646,9,7,16,'',0),
 (647,9,7,20,'',0),
 (648,9,7,21,'',0),
 (649,9,7,44,'',0),
 (650,9,7,45,'',0),
 (651,8,6,21,'',0),
 (652,8,6,44,'',0),
 (653,8,6,45,'a',0),
 (669,8,6,49,'d',0),
 (670,8,6,50,'b',0),
 (671,8,6,51,'b',0),
 (672,8,6,52,'a',0),
 (673,8,6,53,'a',0),
 (674,8,6,54,'b',0),
 (675,8,6,55,'a',0),
 (676,8,6,56,'a',0),
 (677,8,6,57,'b',0),
 (678,8,6,58,'a',0),
 (679,8,6,59,'a',0),
 (680,8,6,60,'a',0),
 (681,8,6,61,'',0),
 (682,8,6,62,'',0),
 (683,8,6,63,'',0),
 (684,8,6,64,'',0),
 (685,8,6,65,'',0),
 (686,8,6,66,'',0),
 (687,8,6,67,'',0),
 (688,8,6,68,'',0),
 (689,8,6,69,'',0),
 (690,8,6,70,'',0),
 (691,8,6,71,'',0),
 (692,8,6,72,'',0),
 (693,8,6,73,'',0),
 (694,8,6,74,'',0),
 (695,8,6,75,'',0),
 (696,8,6,76,'',0),
 (697,8,6,77,'',0),
 (698,8,6,78,'',0),
 (699,8,6,79,'',0),
 (700,8,6,80,'',0),
 (701,8,6,81,'',0),
 (702,8,6,82,'',0),
 (703,8,6,83,'',0),
 (704,8,6,84,'',0),
 (705,8,6,85,'',0),
 (706,8,6,86,'',0),
 (707,8,6,87,'',0),
 (708,8,6,88,'',0),
 (709,8,6,89,'',0),
 (710,8,6,90,'',0),
 (711,8,6,91,'',0),
 (712,8,6,92,'',0),
 (713,8,6,93,'',0),
 (714,8,6,94,'',0),
 (715,8,6,95,'',0),
 (716,8,6,96,'',0),
 (717,8,6,97,'',0),
 (718,8,6,98,'',0),
 (719,8,6,99,'',0),
 (720,8,6,100,'',0),
 (721,8,6,101,'',0),
 (722,8,6,102,'',0),
 (723,8,6,103,'',0),
 (724,8,6,104,'',0),
 (725,8,6,105,'',0),
 (726,8,6,106,'',0),
 (727,8,6,107,'',0),
 (728,8,6,108,'',0),
 (729,8,6,109,'',0),
 (730,8,6,110,'',0),
 (731,8,6,111,'',0),
 (732,8,6,112,'',0),
 (733,8,6,113,'',0),
 (734,8,6,114,'',0),
 (735,8,6,115,'',0),
 (736,8,6,116,'',0),
 (737,8,6,117,'',0),
 (738,8,6,118,'',0),
 (739,8,6,119,'a',0),
 (740,8,6,120,'',0),
 (741,8,6,121,'',0),
 (742,8,6,122,'',0),
 (743,8,6,123,'',0),
 (744,8,6,124,'',0),
 (745,8,6,125,'',0),
 (746,8,6,126,'',0),
 (747,8,6,127,'',0),
 (748,8,6,128,'',0),
 (749,8,6,129,'',0),
 (750,8,6,130,'',0),
 (751,8,6,131,'',0),
 (752,8,6,132,'',0),
 (753,8,6,133,'',0),
 (754,8,6,134,'',0),
 (755,8,6,135,'',0),
 (756,8,6,136,'',0),
 (757,8,6,137,'',0),
 (758,8,6,138,'',0),
 (759,8,6,139,'',0),
 (760,8,6,140,'',0),
 (761,8,6,141,'',0),
 (762,8,6,142,'',0),
 (763,8,6,143,'',0),
 (764,8,6,144,'',0),
 (765,8,6,145,'',0),
 (766,8,6,146,'',0),
 (767,8,6,147,'',0),
 (2721,8,4,49,'',0),
 (2722,8,4,50,'',0),
 (2723,8,4,51,'',0),
 (2724,8,4,52,'',0),
 (2725,8,4,53,'',0),
 (2726,8,4,54,'',0),
 (2727,8,4,55,'',0),
 (2728,8,4,56,'',0),
 (2729,8,4,57,'',0),
 (2730,8,4,58,'',0),
 (2731,8,4,59,'',0),
 (2732,8,4,60,'',0),
 (2733,8,4,61,'',0),
 (2734,8,4,62,'',0),
 (2735,8,4,63,'',0),
 (2736,8,4,64,'',0),
 (2737,8,4,65,'',0),
 (2738,8,4,66,'',0),
 (2739,8,4,67,'',0),
 (2740,8,4,68,'',0),
 (2741,8,4,69,'',0),
 (2742,8,4,70,'',0),
 (2743,8,4,71,'',0),
 (2744,8,4,72,'',0),
 (2745,8,4,73,'',0),
 (2746,8,4,74,'',0),
 (2747,8,4,75,'',0),
 (2748,8,4,76,'',0),
 (2749,8,4,77,'',0),
 (2750,8,4,78,'',0),
 (2751,8,4,79,'',0),
 (2752,8,4,80,'',0),
 (2753,8,4,81,'',0),
 (2754,8,4,82,'',0),
 (2755,8,4,83,'',0),
 (2756,8,4,84,'',0),
 (2757,8,4,85,'',0),
 (2758,8,4,86,'',0),
 (2759,8,4,87,'',0),
 (2760,8,4,88,'',0),
 (2761,8,4,89,'',0),
 (2762,8,4,90,'',0),
 (2763,8,4,91,'',0),
 (2764,8,4,92,'',0),
 (2765,8,4,93,'',0),
 (2766,8,4,94,'',0),
 (2767,8,4,95,'',0),
 (2768,8,4,96,'',0),
 (2769,8,4,97,'',0),
 (2770,8,4,98,'',0),
 (2771,8,4,99,'',0),
 (2772,8,4,100,'',0),
 (2773,8,4,101,'',0),
 (2774,8,4,102,'',0),
 (2775,8,4,103,'',0),
 (2776,8,4,104,'',0),
 (2777,8,4,105,'',0),
 (2778,8,4,106,'',0),
 (2779,8,4,107,'',0),
 (2780,8,4,108,'',0),
 (2781,8,4,109,'',0),
 (2782,8,4,110,'',0),
 (2783,8,4,111,'',0),
 (2784,8,4,112,'',0),
 (2785,8,4,113,'',0),
 (2786,8,4,114,'',0),
 (2787,8,4,115,'',0),
 (2788,8,4,116,'',0),
 (2789,8,4,117,'',0),
 (2790,8,4,118,'',0),
 (2791,8,4,119,'',0),
 (2792,8,4,120,'',0),
 (2793,8,4,121,'',0),
 (2794,8,4,122,'',0),
 (2795,8,4,123,'',0),
 (2796,8,4,124,'',0),
 (2797,8,4,125,'',0),
 (2798,8,4,126,'',0),
 (2799,8,4,127,'',0),
 (2800,8,4,128,'',0),
 (2801,8,4,129,'',0),
 (2802,8,4,130,'',0),
 (2803,8,4,131,'',0),
 (2804,8,4,132,'',0),
 (2805,8,4,133,'',0),
 (2806,8,4,134,'',0),
 (2807,8,4,135,'',0),
 (2808,8,4,136,'',0),
 (2809,8,4,137,'',0),
 (2810,8,4,138,'',0),
 (2811,8,4,139,'',0),
 (2812,8,4,140,'',0),
 (2813,8,4,141,'',0),
 (2814,8,4,142,'',0),
 (2815,8,4,143,'',0),
 (2816,8,4,144,'',0),
 (2817,8,4,145,'',0),
 (2818,8,4,146,'',0),
 (2819,8,4,147,'',0),
 (2820,22,6,1,'',0),
 (2821,22,6,6,'',0),
 (2822,22,6,7,'',0),
 (2823,22,6,15,'',0),
 (2824,22,6,16,'',0),
 (2825,22,6,20,'a',0),
 (2826,22,6,21,'',0),
 (2827,22,6,44,'',0),
 (2828,22,6,45,'',0),
 (2829,22,6,49,'',0),
 (2830,22,6,50,'',0),
 (2831,22,6,51,'',0),
 (2832,22,6,52,'',0),
 (2833,22,6,53,'',0),
 (2834,22,6,54,'',0),
 (2835,22,6,55,'',0),
 (2836,22,6,56,'',0),
 (2837,22,6,57,'',0),
 (2838,22,6,58,'',0),
 (2839,22,6,59,'',0),
 (2840,22,6,60,'',0),
 (2841,22,6,61,'',0),
 (2842,22,6,62,'',0),
 (2843,22,6,63,'',0),
 (2844,22,6,64,'',0),
 (2845,22,6,65,'',0),
 (2846,22,6,66,'',0),
 (2847,22,6,67,'',0),
 (2848,22,6,68,'',0),
 (2849,22,6,69,'',0),
 (2850,22,6,70,'',0),
 (2851,22,6,71,'',0),
 (2852,22,6,72,'',0),
 (2853,22,6,73,'',0),
 (2854,22,6,74,'',0),
 (2855,22,6,75,'',0),
 (2856,22,6,76,'',0),
 (2857,22,6,77,'',0),
 (2858,22,6,78,'',0),
 (2859,22,6,79,'',0),
 (2860,22,6,80,'',0),
 (2861,22,6,81,'',0),
 (2862,22,6,82,'',0),
 (2863,22,6,83,'',0),
 (2864,22,6,84,'',0),
 (2865,22,6,85,'',0),
 (2866,22,6,86,'',0),
 (2867,22,6,87,'',0),
 (2868,22,6,88,'',0),
 (2869,22,6,89,'',0),
 (2870,22,6,90,'',0),
 (2871,22,6,91,'',0),
 (2872,22,6,92,'',0),
 (2873,22,6,93,'',0),
 (2874,22,6,94,'',0),
 (2875,22,6,95,'',0),
 (2876,22,6,96,'',0),
 (2877,22,6,97,'',0),
 (2878,22,6,98,'',0),
 (2879,22,6,99,'',0),
 (2880,22,6,100,'',0),
 (2881,22,6,101,'',0),
 (2882,22,6,102,'',0),
 (2883,22,6,103,'',0),
 (2884,22,6,104,'',0),
 (2885,22,6,105,'',0),
 (2886,22,6,106,'',0),
 (2887,22,6,107,'',0),
 (2888,22,6,108,'',0),
 (2889,22,6,109,'',0),
 (2890,22,6,110,'d',0),
 (2891,22,6,111,'',0),
 (2892,22,6,112,'',0),
 (2893,22,6,113,'d',0),
 (2894,22,6,114,'',0),
 (2895,22,6,115,'b',0),
 (2896,22,6,116,'',0),
 (2897,22,6,117,'a',0),
 (2898,22,6,118,'',0),
 (2899,22,6,119,'',0),
 (2900,22,6,120,'',0),
 (2901,22,6,121,'',0),
 (2902,22,6,122,'',0),
 (2903,22,6,123,'d',0),
 (2904,22,6,124,'',0),
 (2905,22,6,125,'',0),
 (2906,22,6,126,'',0),
 (2907,22,6,127,'',0),
 (2908,22,6,128,'',0),
 (2909,22,6,129,'d',0),
 (2910,22,6,130,'',0),
 (2911,22,6,131,'',0),
 (2912,22,6,132,'',0),
 (2913,22,6,133,'',0),
 (2914,22,6,134,'b',1),
 (2915,22,6,135,'',0),
 (2916,22,6,136,'',0),
 (2917,22,6,137,'a',0),
 (2918,22,6,138,'',0),
 (2919,22,6,139,'b',0),
 (2920,22,6,140,'',0),
 (2921,22,6,141,'',0),
 (2922,22,6,142,'',0),
 (2923,22,6,143,'',0),
 (2924,22,6,144,'',0),
 (2925,22,6,145,'',0),
 (2926,22,6,146,'b',0),
 (2927,22,6,147,'',0),
 (4116,22,7,1,'a',0),
 (4117,22,7,6,'',0),
 (4118,22,7,7,'',0),
 (4119,22,7,15,'',0),
 (4120,22,7,16,'',0),
 (4121,22,7,20,'',0),
 (4122,22,7,21,'',0),
 (4123,22,7,44,'',0),
 (4124,22,7,45,'b',0),
 (4125,22,7,49,'',0),
 (4126,22,7,50,'',0),
 (4127,22,7,51,'',0),
 (4128,22,7,52,'',0),
 (4129,22,7,53,'',0),
 (4130,22,7,54,'b',0),
 (4131,22,7,55,'',0),
 (4132,22,7,56,'',0),
 (4133,22,7,57,'',0),
 (4134,22,7,58,'',0),
 (4135,22,7,59,'',0),
 (4136,22,7,60,'',0),
 (4137,22,7,61,'',0),
 (4138,22,7,62,'',0),
 (4139,22,7,63,'',0),
 (4140,22,7,64,'',0),
 (4141,22,7,65,'',0),
 (4142,22,7,66,'',0),
 (4143,22,7,67,'',0),
 (4144,22,7,68,'',0),
 (4145,22,7,69,'',0),
 (4146,22,7,70,'',0),
 (4147,22,7,71,'',0),
 (4148,22,7,72,'',0),
 (4149,22,7,73,'',0),
 (4150,22,7,74,'',0),
 (4151,22,7,75,'',0),
 (4152,22,7,76,'',0),
 (4153,22,7,77,'a',0),
 (4154,22,7,78,'',0),
 (4155,22,7,79,'',0),
 (4156,22,7,80,'',0),
 (4157,22,7,81,'',0),
 (4158,22,7,82,'',0),
 (4159,22,7,83,'',0),
 (4160,22,7,84,'',0),
 (4161,22,7,85,'',0),
 (4162,22,7,86,'',0),
 (4163,22,7,87,'',0),
 (4164,22,7,88,'',0),
 (4165,22,7,89,'',0),
 (4166,22,7,90,'',0),
 (4167,22,7,91,'',0),
 (4168,22,7,92,'',0),
 (4169,22,7,93,'a',0),
 (4170,22,7,94,'',0),
 (4171,22,7,95,'',0),
 (4172,22,7,96,'',0),
 (4173,22,7,97,'',0),
 (4174,22,7,98,'',0),
 (4175,22,7,99,'',0),
 (4176,22,7,100,'',0),
 (4177,22,7,101,'',0),
 (4178,22,7,102,'',0),
 (4179,22,7,103,'',0),
 (4180,22,7,104,'',0),
 (4181,22,7,105,'',0),
 (4182,22,7,106,'',0),
 (4183,22,7,107,'',0),
 (4184,22,7,108,'',0),
 (4185,22,7,109,'',0),
 (4186,22,7,110,'b',0),
 (4187,22,7,111,'',0),
 (4188,22,7,112,'',0),
 (4189,22,7,113,'',0),
 (4190,22,7,114,'',0),
 (4191,22,7,115,'',0),
 (4192,22,7,116,'',0),
 (4193,22,7,117,'',0),
 (4194,22,7,118,'',0),
 (4195,22,7,119,'',0),
 (4196,22,7,120,'',0),
 (4197,22,7,121,'',0),
 (4198,22,7,122,'',0),
 (4199,22,7,123,'',0),
 (4200,22,7,124,'',0),
 (4201,22,7,125,'',0),
 (4202,22,7,126,'',0),
 (4203,22,7,127,'',0),
 (4204,22,7,128,'a',0),
 (4205,22,7,129,'',0),
 (4206,22,7,130,'b',0),
 (4207,22,7,131,'',0),
 (4208,22,7,132,'',0),
 (4209,22,7,133,'a',0),
 (4210,22,7,134,'',0),
 (4211,22,7,135,'',0),
 (4212,22,7,136,'',0),
 (4213,22,7,137,'',0),
 (4214,22,7,138,'',0),
 (4215,22,7,139,'',0),
 (4216,22,7,140,'',0),
 (4217,22,7,141,'',0),
 (4218,22,7,142,'',0),
 (4219,22,7,143,'',0),
 (4220,22,7,144,'',0),
 (4221,22,7,145,'c',0),
 (4222,22,7,146,'',0),
 (4223,22,7,147,'',0),
 (5412,8,8,1,'a',0),
 (5413,8,8,6,'a',0),
 (5414,8,8,7,'',0),
 (5415,8,8,15,'a',0),
 (5416,8,8,16,'',0),
 (5417,8,8,20,'',0),
 (5418,8,8,21,'',0),
 (5419,8,8,44,'',0),
 (5420,8,8,45,'a',1),
 (5421,8,8,49,'',0),
 (5422,8,8,50,'',0),
 (5423,8,8,51,'',0),
 (5424,8,8,52,'',0),
 (5425,8,8,53,'',0),
 (5426,8,8,54,'',0),
 (5427,8,8,55,'',0),
 (5428,8,8,56,'',0),
 (5429,8,8,57,'',0),
 (5430,8,8,58,'',0),
 (5431,8,8,59,'',0),
 (5432,8,8,60,'',0),
 (5433,8,8,61,'',0),
 (5434,8,8,62,'',0),
 (5435,8,8,63,'',0),
 (5436,8,8,64,'',0),
 (5437,8,8,65,'',0),
 (5438,8,8,66,'',0),
 (5439,8,8,67,'',0),
 (5440,8,8,68,'',0),
 (5441,8,8,69,'',0),
 (5442,8,8,70,'',0),
 (5443,8,8,71,'',0),
 (5444,8,8,72,'',0),
 (5445,8,8,73,'',0),
 (5446,8,8,74,'',0),
 (5447,8,8,75,'',0),
 (5448,8,8,76,'',0),
 (5449,8,8,77,'',0),
 (5450,8,8,78,'',0),
 (5451,8,8,79,'',0),
 (5452,8,8,80,'',0),
 (5453,8,8,81,'',0),
 (5454,8,8,82,'',0),
 (5455,8,8,83,'',0),
 (5456,8,8,84,'',0),
 (5457,8,8,85,'',0),
 (5458,8,8,86,'',0),
 (5459,8,8,87,'',0),
 (5460,8,8,88,'',0),
 (5461,8,8,89,'',0),
 (5462,8,8,90,'',0),
 (5463,8,8,91,'',0),
 (5464,8,8,92,'',0),
 (5465,8,8,93,'',0),
 (5466,8,8,94,'',0),
 (5467,8,8,95,'',0),
 (5468,8,8,96,'',0),
 (5469,8,8,97,'',0),
 (5470,8,8,98,'',0),
 (5471,8,8,99,'',0),
 (5472,8,8,100,'',0),
 (5473,8,8,101,'',0),
 (5474,8,8,102,'',0),
 (5475,8,8,103,'',0),
 (5476,8,8,104,'',0),
 (5477,8,8,105,'',0),
 (5478,8,8,106,'',0),
 (5479,8,8,107,'',0),
 (5480,8,8,108,'',0),
 (5481,8,8,109,'',0),
 (5482,8,8,110,'',0),
 (5483,8,8,111,'',0),
 (5484,8,8,112,'',0),
 (5485,8,8,113,'',0),
 (5486,8,8,114,'',0),
 (5487,8,8,115,'',0),
 (5488,8,8,116,'',0),
 (5489,8,8,117,'',0),
 (5490,8,8,118,'',0),
 (5491,8,8,119,'',0),
 (5492,8,8,120,'',0),
 (5493,8,8,121,'',0),
 (5494,8,8,122,'',0),
 (5495,8,8,123,'',0),
 (5496,8,8,124,'',0),
 (5497,8,8,125,'',0),
 (5498,8,8,126,'',0),
 (5499,8,8,127,'',0),
 (5500,8,8,128,'',0),
 (5501,8,8,129,'',0),
 (5502,8,8,130,'',0),
 (5503,8,8,131,'',0),
 (5504,8,8,132,'',0),
 (5505,8,8,133,'',0),
 (5506,8,8,134,'',0),
 (5507,8,8,135,'',0),
 (5508,8,8,136,'',0),
 (5509,8,8,137,'',0),
 (5510,8,8,138,'',0),
 (5511,8,8,139,'',0),
 (5512,8,8,140,'',0),
 (5513,8,8,141,'',0),
 (5514,8,8,142,'',0),
 (5515,8,8,143,'',0),
 (5516,8,8,144,'',0),
 (5517,8,8,145,'',0),
 (5518,8,8,146,'',0),
 (5519,8,8,147,'',0),
 (7896,25,4,1,'b',0),
 (7897,25,4,6,'',0),
 (7898,25,4,7,'a',0),
 (7899,25,4,15,'b',0),
 (7900,25,4,16,'a',0),
 (7901,25,4,20,'b',0),
 (7902,25,4,21,'b',0),
 (7903,25,4,44,'c',0),
 (7904,25,4,45,'c',0),
 (7905,25,4,49,'a',0),
 (7906,25,4,50,'b',0),
 (7907,25,4,51,'a',0),
 (7908,25,4,52,'b',0),
 (7909,25,4,53,'b',0),
 (7910,25,4,54,'b',0),
 (7911,25,4,55,'b',0),
 (7912,25,4,56,'b',0),
 (7913,25,4,57,'b',0),
 (7914,25,4,58,'a',0),
 (7915,25,4,59,'d',0),
 (7916,25,4,60,'b',0),
 (7917,25,4,61,'c',0),
 (7918,25,4,62,'a',0),
 (7919,25,4,63,'b',0),
 (7920,25,4,64,'b',0),
 (7921,25,4,65,'a',0),
 (7922,25,4,66,'b',0),
 (7923,25,4,67,'b',0),
 (7924,25,4,68,'a',0),
 (7925,25,4,69,'b',0),
 (7926,25,4,70,'a',0),
 (7927,25,4,71,'a',0),
 (7928,25,4,72,'a',0),
 (7929,25,4,73,'a',0),
 (7930,25,4,74,'b',0),
 (7931,25,4,75,'a',0),
 (7932,25,4,76,'a',0),
 (7933,25,4,77,'a',0),
 (7934,25,4,78,'b',0),
 (7935,25,4,79,'a',0),
 (7936,25,4,80,'a',0),
 (7937,25,4,81,'a',0),
 (7938,25,4,82,'a',0),
 (7939,25,4,83,'b',0),
 (7940,25,4,84,'b',0),
 (7941,25,4,85,'d',0),
 (7942,25,4,86,'b',0),
 (7943,25,4,87,'a',0),
 (7944,25,4,88,'a',0),
 (7945,25,4,89,'a',0),
 (7946,25,4,90,'a',0),
 (7947,25,4,91,'a',0),
 (7948,25,4,92,'b',0),
 (7949,25,4,93,'b',0),
 (7950,25,4,94,'a',0),
 (7951,25,4,95,'a',0),
 (7952,25,4,96,'a',0),
 (7953,25,4,97,'a',0),
 (7954,25,4,98,'a',0),
 (7955,25,4,99,'a',0),
 (7956,25,4,100,'a',0),
 (7957,25,4,101,'b',0),
 (7958,25,4,102,'a',0),
 (7959,25,4,103,'b',0),
 (7960,25,4,104,'b',0),
 (7961,25,4,105,'b',0),
 (7962,25,4,106,'b',0),
 (7963,25,4,107,'b',0),
 (7964,25,4,108,'a',0),
 (7965,25,4,109,'b',0),
 (7966,25,4,110,'b',0),
 (7967,25,4,111,'b',0),
 (7968,25,4,112,'a',0),
 (7969,25,4,113,'a',0),
 (7970,25,4,114,'a',0),
 (7971,25,4,115,'b',0),
 (7972,25,4,116,'d',0),
 (7973,25,4,117,'a',0),
 (7974,25,4,118,'b',0),
 (7975,25,4,119,'b',0),
 (7976,25,4,120,'a',0),
 (7977,25,4,121,'a',0),
 (7978,25,4,122,'b',0),
 (7979,25,4,123,'b',0),
 (7980,25,4,124,'c',0),
 (7981,25,4,125,'d',0),
 (7982,25,4,126,'a',0),
 (7983,25,4,127,'b',0),
 (7984,25,4,128,'a',0),
 (7985,25,4,129,'a',0),
 (7986,25,4,130,'a',0),
 (7987,25,4,131,'a',0),
 (7988,25,4,132,'b',0),
 (7989,25,4,133,'b',0),
 (7990,25,4,134,'a',0),
 (7991,25,4,135,'c',0),
 (7992,25,4,136,'a',0),
 (7993,25,4,137,'a',0),
 (7994,25,4,138,'b',0),
 (7995,25,4,139,'b',0),
 (7996,25,4,140,'a',0),
 (7997,25,4,141,'b',0),
 (7998,25,4,142,'a',0),
 (7999,25,4,143,'a',0),
 (8000,25,4,144,'c',0),
 (8001,25,4,145,'a',0),
 (8002,25,4,146,'b',0),
 (8003,25,4,147,'b',0),
 (8436,25,6,1,'b',0),
 (8437,25,6,6,'b',0),
 (8438,25,6,7,'a',0),
 (8439,25,6,15,'b',0),
 (8440,25,6,16,'b',0),
 (8441,25,6,20,'b',0),
 (8442,25,6,21,'b',0),
 (8443,25,6,44,'c',0),
 (8444,25,6,45,'b',0),
 (8445,25,6,49,'c',0),
 (8446,25,6,50,'a',0),
 (8447,25,6,51,'a',0),
 (8448,25,6,52,'a',0),
 (8449,25,6,53,'d',0),
 (8450,25,6,54,'a',0),
 (8451,25,6,55,'a',0),
 (8452,25,6,56,'a',0),
 (8453,25,6,57,'a',0),
 (8454,25,6,58,'a',0),
 (8455,25,6,59,'a',0),
 (8456,25,6,60,'a',0),
 (8457,25,6,61,'c',0),
 (8458,25,6,62,'b',0),
 (8459,25,6,63,'c',0),
 (8460,25,6,64,'b',0),
 (8461,25,6,65,'c',0),
 (8462,25,6,66,'a',0),
 (8463,25,6,67,'a',0),
 (8464,25,6,68,'c',0),
 (8465,25,6,69,'a',0),
 (8466,25,6,70,'a',0),
 (8467,25,6,71,'c',0),
 (8468,25,6,72,'a',0),
 (8469,25,6,73,'b',0),
 (8470,25,6,74,'a',0),
 (8471,25,6,75,'b',0),
 (8472,25,6,76,'c',0),
 (8473,25,6,77,'a',0),
 (8474,25,6,78,'a',0),
 (8475,25,6,79,'a',0),
 (8476,25,6,80,'a',0),
 (8477,25,6,81,'c',0),
 (8478,25,6,82,'a',0),
 (8479,25,6,83,'b',0),
 (8480,25,6,84,'a',0),
 (8481,25,6,85,'a',0),
 (8482,25,6,86,'d',0),
 (8483,25,6,87,'c',0),
 (8484,25,6,88,'a',0),
 (8485,25,6,89,'b',0),
 (8486,25,6,90,'d',0),
 (8487,25,6,91,'c',0),
 (8488,25,6,92,'b',0),
 (8489,25,6,93,'d',0),
 (8490,25,6,94,'c',0),
 (8491,25,6,95,'d',0),
 (8492,25,6,96,'c',0),
 (8493,25,6,97,'d',0),
 (8494,25,6,98,'a',0),
 (8495,25,6,99,'c',0),
 (8496,25,6,100,'d',0),
 (8497,25,6,101,'b',0),
 (8498,25,6,102,'d',0),
 (8499,25,6,103,'a',0),
 (8500,25,6,104,'d',0),
 (8501,25,6,105,'a',0),
 (8502,25,6,106,'a',0),
 (8503,25,6,107,'b',0),
 (8504,25,6,108,'c',0),
 (8505,25,6,109,'a',0),
 (8506,25,6,110,'b',0),
 (8507,25,6,111,'d',0),
 (8508,25,6,112,'c',0),
 (8509,25,6,113,'a',0),
 (8510,25,6,114,'d',0),
 (8511,25,6,115,'c',0),
 (8512,25,6,116,'d',0),
 (8513,25,6,117,'b',0),
 (8514,25,6,118,'d',0),
 (8515,25,6,119,'b',0),
 (8516,25,6,120,'b',0),
 (8517,25,6,121,'a',0),
 (8518,25,6,122,'a',0),
 (8519,25,6,123,'b',0),
 (8520,25,6,124,'a',0),
 (8521,25,6,125,'c',0),
 (8522,25,6,126,'b',0),
 (8523,25,6,127,'a',0),
 (8524,25,6,128,'a',0),
 (8525,25,6,129,'b',0),
 (8526,25,6,130,'a',0),
 (8527,25,6,131,'a',0),
 (8528,25,6,132,'a',0),
 (8529,25,6,133,'a',0),
 (8530,25,6,134,'c',0),
 (8531,25,6,135,'b',0),
 (8532,25,6,136,'a',0),
 (8533,25,6,137,'a',0),
 (8534,25,6,138,'b',0),
 (8535,25,6,139,'a',0),
 (8536,25,6,140,'b',0),
 (8537,25,6,141,'a',0),
 (8538,25,6,142,'b',0),
 (8539,25,6,143,'a',0),
 (8540,25,6,144,'b',0),
 (8541,25,6,145,'a',0),
 (8542,25,6,146,'b',0),
 (8543,25,6,147,'b',0),
 (10056,26,6,1,'b',0),
 (10057,26,6,6,'b',0),
 (10058,26,6,7,'a',0),
 (10059,26,6,15,'b',0),
 (10060,26,6,16,'a',0),
 (10061,26,6,20,'c',0),
 (10062,26,6,21,'b',0),
 (10063,26,6,44,'d',0),
 (10064,26,6,45,'a',0),
 (10065,26,6,49,'a',0),
 (10066,26,6,50,'c',0),
 (10067,26,6,51,'d',0),
 (10068,26,6,52,'b',0),
 (10069,26,6,53,'c',0),
 (10070,26,6,54,'d',0),
 (10071,26,6,55,'b',0),
 (10072,26,6,56,'b',0),
 (10073,26,6,57,'a',0),
 (10074,26,6,58,'c',0),
 (10075,26,6,59,'a',0),
 (10076,26,6,60,'b',0),
 (10077,26,6,61,'b',0),
 (10078,26,6,62,'d',0),
 (10079,26,6,63,'a',0),
 (10080,26,6,64,'b',0),
 (10081,26,6,65,'a',0),
 (10082,26,6,66,'a',0),
 (10083,26,6,67,'b',0),
 (10084,26,6,68,'b',0),
 (10085,26,6,69,'b',0),
 (10086,26,6,70,'a',0),
 (10087,26,6,71,'b',0),
 (10088,26,6,72,'a',0),
 (10089,26,6,73,'b',0),
 (10090,26,6,74,'a',0),
 (10091,26,6,75,'b',0),
 (10092,26,6,76,'a',0),
 (10093,26,6,77,'b',0),
 (10094,26,6,78,'a',0),
 (10095,26,6,79,'b',0),
 (10096,26,6,80,'a',0),
 (10097,26,6,81,'b',0),
 (10098,26,6,82,'a',0),
 (10099,26,6,83,'b',0),
 (10100,26,6,84,'a',0),
 (10101,26,6,85,'b',0),
 (10102,26,6,86,'a',0),
 (10103,26,6,87,'b',0),
 (10104,26,6,88,'b',0),
 (10105,26,6,89,'a',0),
 (10106,26,6,90,'c',0),
 (10107,26,6,91,'b',0),
 (10108,26,6,92,'a',0),
 (10109,26,6,93,'b',0),
 (10110,26,6,94,'b',0),
 (10111,26,6,95,'a',0),
 (10112,26,6,96,'b',0),
 (10113,26,6,97,'a',0),
 (10114,26,6,98,'b',0),
 (10115,26,6,99,'a',0),
 (10116,26,6,100,'b',0),
 (10117,26,6,101,'a',0),
 (10118,26,6,102,'b',0),
 (10119,26,6,103,'a',0),
 (10120,26,6,104,'b',0),
 (10121,26,6,105,'a',0),
 (10122,26,6,106,'b',0),
 (10123,26,6,107,'a',0),
 (10124,26,6,108,'a',0),
 (10125,26,6,109,'b',0),
 (10126,26,6,110,'a',0),
 (10127,26,6,111,'b',0),
 (10128,26,6,112,'b',0),
 (10129,26,6,113,'a',0),
 (10130,26,6,114,'b',0),
 (10131,26,6,115,'a',0),
 (10132,26,6,116,'b',0),
 (10133,26,6,117,'b',0),
 (10134,26,6,118,'a',0),
 (10135,26,6,119,'b',0),
 (10136,26,6,120,'a',0),
 (10137,26,6,121,'b',0),
 (10138,26,6,122,'a',0),
 (10139,26,6,123,'b',0),
 (10140,26,6,124,'a',0),
 (10141,26,6,125,'c',0),
 (10142,26,6,126,'a',0),
 (10143,26,6,127,'b',0),
 (10144,26,6,128,'a',0),
 (10145,26,6,129,'a',0),
 (10146,26,6,130,'b',0),
 (10147,26,6,131,'a',0),
 (10148,26,6,132,'b',0),
 (10149,26,6,133,'a',0),
 (10150,26,6,134,'a',0),
 (10151,26,6,135,'c',0),
 (10152,26,6,136,'a',0),
 (10153,26,6,137,'b',0),
 (10154,26,6,138,'b',0),
 (10155,26,6,139,'a',0),
 (10156,26,6,140,'b',0),
 (10157,26,6,141,'d',0),
 (10158,26,6,142,'a',0),
 (10159,26,6,143,'c',0),
 (10160,26,6,144,'a',0),
 (10161,26,6,145,'b',0),
 (10162,26,6,146,'b',0),
 (10163,26,6,147,'b',0);
/*!40000 ALTER TABLE `test_user_answer` ENABLE KEYS */;


--
-- Definition of table `tests`
--

DROP TABLE IF EXISTS `tests`;
CREATE TABLE `tests` (
  `id` int(70) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `instruction` text,
  `marksPerQues` double DEFAULT NULL,
  `negativeMarks` double DEFAULT NULL,
  `instantResult` tinyint(1) unsigned DEFAULT '0',
  `duration` int(10) unsigned DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `instantRank` tinyint(1) DEFAULT '0',
  `questionPaperId` int(70) unsigned DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  `attachment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tests`
--

/*!40000 ALTER TABLE `tests` DISABLE KEYS */;
INSERT INTO `tests` (`id`,`title`,`instruction`,`marksPerQues`,`negativeMarks`,`instantResult`,`duration`,`startDate`,`endDate`,`instantRank`,`questionPaperId`,`isDeleted`,`attachment`) VALUES 
 (4,'Test 1','<p>Instruction for Test 1.</p><p>Multiple choice questions.</p><p>Select your answer, Click &#34;submit Exam&#34; when your finshed.</p>',2,0.65,1,7200,'2016-07-16 00:00:00','2016-08-27 00:00:00',0,1,0,NULL),
 (5,'Test 0','<p>Instructions</p>',1,NULL,1,7200,'2016-07-02 00:00:00','2016-07-16 00:00:00',0,2,1,NULL),
 (6,'Test 2','<p>Instructions For Test.</p>',2,0.25,0,10800,'2016-07-25 00:00:00','2016-08-27 00:00:00',0,1,0,NULL),
 (7,'Test 3',NULL,1.5,0.25,0,9000,'2016-07-24 00:00:00','2016-08-27 00:00:00',0,1,0,NULL),
 (8,'Test 4',NULL,2,NULL,NULL,7200,'2016-08-02 00:00:00','2016-09-06 00:00:00',NULL,1,0,NULL);
/*!40000 ALTER TABLE `tests` ENABLE KEYS */;


--
-- Definition of table `testuserinfo`
--

DROP TABLE IF EXISTS `testuserinfo`;
CREATE TABLE `testuserinfo` (
  `id` int(70) unsigned NOT NULL,
  `userId` int(70) unsigned NOT NULL,
  `testId` int(70) unsigned NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  `timeRemaining` int(10) unsigned DEFAULT NULL,
  `score` double DEFAULT NULL,
  `rank` int(70) unsigned DEFAULT NULL,
  `totalQuestions` int(100) unsigned DEFAULT NULL,
  `percentile` double DEFAULT NULL,
  `totalResults` int(70) unsigned DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `combo` (`userId`,`testId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `testuserinfo`
--

/*!40000 ALTER TABLE `testuserinfo` DISABLE KEYS */;
INSERT INTO `testuserinfo` (`id`,`userId`,`testId`,`status`,`timeRemaining`,`score`,`rank`,`totalQuestions`,`percentile`,`totalResults`,`timestamp`) VALUES 
 (143,8,4,'evaluated',0,3.4,2,108,60,5,NULL),
 (153,21,4,'evaluated',7124,1.4,3,NULL,40,5,NULL),
 (166,22,4,'evaluated',7190,0.7,4,NULL,20,5,NULL),
 (170,11,4,'evaluated',7182,6.7,1,NULL,80,5,NULL),
 (178,8,7,'evaluated',8977,0.25,2,NULL,0,2,NULL),
 (193,21,6,'pending',10778,NULL,NULL,NULL,NULL,NULL,NULL),
 (204,8,6,'evaluated',10691,8.75,2,108,25,4,NULL),
 (205,22,6,'evaluated',10498,-0.5,3,108,0,4,NULL),
 (217,22,7,'evaluated',8956,1,1,108,50,2,NULL),
 (229,8,8,'pending',7199,NULL,NULL,108,NULL,NULL,NULL),
 (252,25,4,'evaluated',6935,-5.95,5,108,0,5,NULL),
 (257,25,6,'evaluated',9897,31.5,1,108,75,4,NULL),
 (272,26,6,'evaluated',10530,31.5,1,108,75,4,NULL);
/*!40000 ALTER TABLE `testuserinfo` ENABLE KEYS */;


--
-- Definition of table `units`
--

DROP TABLE IF EXISTS `units`;
CREATE TABLE `units` (
  `id` int(70) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `courseId` int(10) unsigned NOT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `units`
--

/*!40000 ALTER TABLE `units` DISABLE KEYS */;
INSERT INTO `units` (`id`,`name`,`description`,`courseId`,`isDeleted`) VALUES 
 (2,'Civil1','civil1',7,0),
 (3,'History1','history2',6,1),
 (11,'Civil2','Civil2',7,0),
 (12,'Civil3','Civil3',7,0),
 (18,'civil4','civil4',7,0),
 (28,'Eco1','Eco1',11,0),
 (29,'Eco2','Eco2',11,0);
/*!40000 ALTER TABLE `units` ENABLE KEYS */;


--
-- Definition of table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(70) unsigned NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) DEFAULT NULL,
  `joinDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `about` varchar(200) DEFAULT NULL,
  `profilePhoto` varchar(255) DEFAULT NULL,
  `billingAddress` varchar(255) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  `profileType` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`,`fullName`,`joinDate`,`about`,`profilePhoto`,`billingAddress`,`email`,`phone`,`status`,`profileType`,`password`) VALUES 
 (8,'Udit Negi','2016-06-28 19:50:36','just fine','http://localhost:3000\\imagesPath\\vllR_RcJQ5JeoJu7iTIgSVxf.png','','negi.udit@gmail.com','9900015910','active','student','81dc9bdb52d04dc20036dbd8313ed055'),
 (9,'Admin','2016-06-28 19:51:13','fine','http://localhost:3000\\imagesPath\\m4Cf1sb1rrX4DQf94tXuZ_jL.png','','admin@gmail.com','1234567890','null','admin','81dc9bdb52d04dc20036dbd8313ed055'),
 (10,'Ayush Sinha','2016-07-01 15:33:18',NULL,NULL,NULL,'ayush.sinha@gmail.com','9874563210','active','instructor','81dc9bdb52d04dc20036dbd8313ed055'),
 (11,'Ayushman','2016-07-04 20:48:11','About you','null','','ayush@forumias.com','7070700521','null','student','91e01cf003a151f5694d07c70e908994'),
 (20,'Rohan Negi','2016-07-11 13:33:50','','null','','negi.rohan@gmail.com','1478523690','null','student','827ccb0eea8a706c4c34a16891f84e7b'),
 (21,'Bhajan','2016-07-25 15:19:58',NULL,NULL,NULL,'bhajan@gmail.com','9999999123',NULL,'student','81dc9bdb52d04dc20036dbd8313ed055'),
 (22,'Divyesh','2016-07-25 15:23:05',NULL,NULL,NULL,'divyesh@gmail.com','1234567899',NULL,'student','81dc9bdb52d04dc20036dbd8313ed055'),
 (24,'Raj kumar','2016-08-04 12:51:57',NULL,NULL,NULL,'raj@gmail.com','9886188701',NULL,'student','81dc9bdb52d04dc20036dbd8313ed055'),
 (25,'qwe','2016-08-05 18:39:53',NULL,NULL,NULL,'as@df.com','1231231231',NULL,'student','81dc9bdb52d04dc20036dbd8313ed055'),
 (26,'fghty','2016-08-05 20:35:01',NULL,NULL,NULL,'rtr@df.df','2342342342',NULL,'student','81dc9bdb52d04dc20036dbd8313ed055');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;


--
-- Definition of procedure `calculatePercentile`
--

DROP PROCEDURE IF EXISTS `calculatePercentile`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `calculatePercentile`(IN testId INT(70))
BEGIN
  DECLARE v_finished INTEGER DEFAULT 0;
  DECLARE v_id INTEGER;
  DECLARE v_score INTEGER;
  DECLARE v_lscore INTEGER;
  DECLARE v_escore INTEGER;
  DECLARE v_percentile DOUBLE;
  DECLARE user_cnt INTEGER;
  DECLARE scores CURSOR FOR SELECT ui.id, ui.score, count(lui.id) as lscore, count(eui.id) as escore
  FROM
    tutorialsdb.testuserinfo ui
      left join (tutorialsdb.testuserinfo eui) on eui.score = ui.score and eui.id != ui.id and eui.testId = testId
      left join (tutorialsdb.testuserinfo lui) on lui.score < ui.score and lui.testId = testId
      where ui.status="evaluated" AND ui.testId = testId
      GROUP BY ui.id
      ORDER BY ui.score DESC;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_finished = 1;
  OPEN scores;
  select FOUND_ROWS() into user_cnt;
  get_Percentile: loop
    fetch scores into v_id, v_score, v_lscore, v_escore;
    if v_finished = 1 then
    leave get_Percentile;
    END IF;
    set v_percentile = ROUND((((v_lscore + (0.5*v_escore))/user_cnt)*100), 2);
    UPDATE tutorialsdb.testuserinfo SET percentile = v_percentile, totalResults = user_cnt where id=v_id;
  END loop get_Percentile;
  close scores;
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `calculateRank`
--

DROP PROCEDURE IF EXISTS `calculateRank`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `calculateRank`(IN testId INT(70))
BEGIN
DECLARE v_finished INTEGER DEFAULT 0;
  DECLARE v_id INTEGER;
  DECLARE v_score INTEGER;
  DECLARE v_prev INTEGER;
  DECLARE v_curr INTEGER;
  DECLARE v_rank INTEGER;
  DECLARE scores CURSOR FOR SELECT id, score, @prev := @curr, @curr := score, @rank := IF(@prev = @curr, @rank, @rank+1) AS rank
  FROM
    tutorialsdb.testuserinfo ui,
    (SELECT @curr := null, @prev := null, @rank := 0) sel1
      where ui.status="evaluated" AND ui.testId = testId
     ORDER BY score DESC;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_finished = 1;
  OPEN scores;
  get_Rank: loop
    fetch scores into v_id, v_score, v_prev, v_curr, v_rank;
    if v_finished = 1 then
    leave get_Rank;
    END IF;
    UPDATE tutorialsdb.testuserinfo SET rank = v_rank where id=v_id;
  END loop get_Rank;
  close scores;
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
