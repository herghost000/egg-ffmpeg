/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80012
 Source Host           : localhost:3306
 Source Schema         : database_development

 Target Server Type    : MySQL
 Target Server Version : 80012
 File Encoding         : 65001

 Date: 16/11/2018 00:24:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for video_decodes
-- ----------------------------
DROP TABLE IF EXISTS `video_decodes`;
CREATE TABLE `video_decodes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `video_decodes_status_id` (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of video_decodes
-- ----------------------------
BEGIN;
INSERT INTO `video_decodes` VALUES (1, 'http://localhost:7001/public/upload/video/20170119/xxfd.m3u8', 1, '2018-11-15 22:55:03', '2018-11-15 22:55:07');
INSERT INTO `video_decodes` VALUES (2, 'http://localhost:7001/public/upload/video/20170119/2.m3u8', 2, '2018-11-15 23:17:39', '2018-11-15 23:17:43');
INSERT INTO `video_decodes` VALUES (3, 'http://localhost:7001/public/upload/video/20170119/3.m3u8', 3, '2018-11-15 23:19:20', '2018-11-15 23:19:23');
INSERT INTO `video_decodes` VALUES (4, 'http://localhost:7001/public/upload/video/20170119/4.m3u8', 2, '2018-11-15 23:19:26', '2018-11-15 23:19:29');
INSERT INTO `video_decodes` VALUES (5, 'http://localhost:7001/public/upload/video/20170119/5.m3u8', 3, '2018-11-15 23:19:32', '2018-11-15 23:19:35');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
