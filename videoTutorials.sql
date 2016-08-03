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
-- Definition of table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(70) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

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
-- Definition of table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
CREATE TABLE `subjects` (
  `id` int(70) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=5520 DEFAULT CHARSET=latin1;

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Definition of table `testuserinfo`
--

DROP TABLE IF EXISTS `testuserinfo`;
CREATE TABLE `testuserinfo` (
  `id` int(70) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(70) unsigned NOT NULL,
  `testId` int(70) unsigned NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  `timeRemaining` int(10) unsigned DEFAULT NULL,
  `score` varchar(45) DEFAULT NULL,
  `rank` int(70) unsigned DEFAULT NULL,
  `totalQuestions` int(100) unsigned DEFAULT NULL,
  `percentile` double DEFAULT NULL,
  `totalResults` int(70) unsigned DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `combo` (`userId`,`testId`)
) ENGINE=InnoDB AUTO_INCREMENT=230 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`,`fullName`,`joinDate`,`about`,`profilePhoto`,`billingAddress`,`email`,`phone`,`status`,`profileType`,`password`) VALUES 
 (9,'Admin','2016-06-28 19:51:13','fine','http://localhost:3000\\imagesPath\\m4Cf1sb1rrX4DQf94tXuZ_jL.png','','admin@gmail.com','1234567890','null','admin','81dc9bdb52d04dc20036dbd8313ed055');
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
    set v_percentile = ((v_lscore + (0.5*v_escore))/user_cnt)*100;
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
