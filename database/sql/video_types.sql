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

 Date: 16/11/2018 00:23:53
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for video_types
-- ----------------------------
DROP TABLE IF EXISTS `video_types`;
CREATE TABLE `video_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of video_types
-- ----------------------------
BEGIN;
INSERT INTO `video_types` VALUES (1, '科幻', '2018-11-15 22:37:21', '2018-11-15 22:37:25');
INSERT INTO `video_types` VALUES (2, '动漫', '2018-11-15 22:37:33', '2018-11-15 22:37:38');
INSERT INTO `video_types` VALUES (3, '爱情', '2018-11-15 22:37:45', '2018-11-15 22:37:49');
INSERT INTO `video_types` VALUES (4, '哲理', '2018-11-15 22:37:57', '2018-11-15 22:38:01');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
