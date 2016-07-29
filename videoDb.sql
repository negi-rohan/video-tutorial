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
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `combo` (`userId`,`testId`)
) ENGINE=InnoDB AUTO_INCREMENT=209 DEFAULT CHARSET=latin1;

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
