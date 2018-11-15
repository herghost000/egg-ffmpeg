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

 Date: 16/11/2018 00:24:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for video_decode_status
-- ----------------------------
DROP TABLE IF EXISTS `video_decode_status`;
CREATE TABLE `video_decode_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of video_decode_status
-- ----------------------------
BEGIN;
INSERT INTO `video_decode_status` VALUES (1, '等待', '2018-11-15 23:34:18', '2018-11-15 23:34:25');
INSERT INTO `video_decode_status` VALUES (2, '解码中', '2018-11-15 23:34:21', '2018-11-15 23:34:27');
INSERT INTO `video_decode_status` VALUES (3, '完成', '2018-11-15 23:34:23', '2018-11-15 23:34:29');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
