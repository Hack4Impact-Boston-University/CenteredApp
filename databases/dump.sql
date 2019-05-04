-- MySQL dump 10.13  Distrib 5.7.23, for osx10.9 (x86_64)
--
-- Host: centered-db.ceni7m6kai0v.us-east-2.rds.amazonaws.com    Database: centered
-- ------------------------------------------------------
-- Server version	8.0.13
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO,ANSI' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: "centered"
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ "centered" /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;

USE "centered";

--
-- Table structure for table "comment"
--

DROP TABLE IF EXISTS "comment";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE "comment" (
  "id" int(11) NOT NULL AUTO_INCREMENT,
  "content" text NOT NULL,
  "createdAt" datetime DEFAULT CURRENT_TIMESTAMP,
  "likes" int(11) DEFAULT '0',
  "username" varchar(255) NOT NULL,
  "postID" int(10) unsigned NOT NULL,
  PRIMARY KEY ("id"),
  KEY "username" ("username"),
  KEY "postID" ("postID"),
  CONSTRAINT "comment_ibfk_1" FOREIGN KEY ("username") REFERENCES "user" ("username"),
  CONSTRAINT "comment_ibfk_2" FOREIGN KEY ("postID") REFERENCES "post" ("id") ON DELETE CASCADE
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "comment"
--

LOCK TABLES "comment" WRITE;
/*!40000 ALTER TABLE "comment" DISABLE KEYS */;
/*!40000 ALTER TABLE "comment" ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table "post"
--

DROP TABLE IF EXISTS "post";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE "post" (
  "id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "title" text NOT NULL,
  "body" text,
  "createdAt" datetime DEFAULT CURRENT_TIMESTAMP,
  "likes" int(11) DEFAULT '0',
  "username" varchar(255) NOT NULL,
  "attachments" text,
  PRIMARY KEY ("id"),
  KEY "username" ("username"),
  CONSTRAINT "post_ibfk_1" FOREIGN KEY ("username") REFERENCES "user" ("username")
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "post"
--

LOCK TABLES "post" WRITE;
/*!40000 ALTER TABLE "post" DISABLE KEYS */;
/*!40000 ALTER TABLE "post" ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table "regcode"
--

DROP TABLE IF EXISTS "regcode";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE "regcode" (
  "code" char(10) NOT NULL,
  "expired" tinyint(1) NOT NULL,
  "user_email" varchar(200) NOT NULL,
  "username" varchar(255) DEFAULT NULL,
  PRIMARY KEY ("code"),
  KEY "username" ("username"),
  CONSTRAINT "regcode_ibfk_1" FOREIGN KEY ("username") REFERENCES "user" ("username")
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "regcode"
--

LOCK TABLES "regcode" WRITE;
/*!40000 ALTER TABLE "regcode" DISABLE KEYS */;
INSERT INTO "regcode" VALUES ('7vp8a5iyua',1,'mdesilva@scdp.com','desilva');
/*!40000 ALTER TABLE "regcode" ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table "user"
--

DROP TABLE IF EXISTS "user";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE "user" (
  "username" varchar(255) NOT NULL,
  "password" binary(60) NOT NULL,
  "email" varchar(200) NOT NULL,
  "first_name" varchar(100) NOT NULL,
  "last_name" varchar(100) NOT NULL,
  "dob" char(10) NOT NULL,
  "gender" char(1) DEFAULT NULL,
  "opt_in" char(1) DEFAULT NULL,
  "bio" varchar(320) DEFAULT NULL,
  PRIMARY KEY ("username")
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "user"
--

LOCK TABLES "user" WRITE;
/*!40000 ALTER TABLE "user" DISABLE KEYS */;
INSERT INTO "user" VALUES ('desilva',_binary '$2b$10$kDvSTpfNnpklzh/Jm8VJy.tp9CnU6ULwHslem0iXVd5i..o5RKYPa','mdesilva@scdp.com','Manuja','DeSilva','01/03/1998','M','N',NULL);
/*!40000 ALTER TABLE "user" ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-03 16:38:11
