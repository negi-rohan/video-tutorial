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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=611 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

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
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `combo` (`userId`,`testId`)
) ENGINE=InnoDB AUTO_INCREMENT=204 DEFAULT CHARSET=latin1;

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
-- Definition of procedure `calculateRank`
--

DROP PROCEDURE IF EXISTS `calculateRank`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `calculateRank`()
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
      where ui.status="evaluated"
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
