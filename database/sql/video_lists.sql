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

 Date: 16/11/2018 00:23:32
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for video_lists
-- ----------------------------
DROP TABLE IF EXISTS `video_lists`;
CREATE TABLE `video_lists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  `surface_plot` varchar(255) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `decode_id` int(11) DEFAULT NULL,
  `dsc` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `video_lists_type_id` (`type_id`),
  KEY `video_lists_decode_id` (`decode_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of video_lists
-- ----------------------------
BEGIN;
INSERT INTO `video_lists` VALUES (1, '世界末日', 1, 'http://localhost:7001/public/upload/pic/20170119/kd;sdpdfjmdfserw.mp4', 'http://localhost:7001/public/upload/video/20170119/kd;sdpdfjmdfserw.mp4', 1, '世界末日前再让我吻你一次', '2018-11-15 22:33:42', '2018-11-15 22:33:45');
INSERT INTO `video_lists` VALUES (2, '萤火之深', 2, 'http://localhost:7001/public/upload/pic/20170119/kd;sdpdfjmdfserw.mp4', 'http://localhost:7001/public/upload/video/20170119/kd;sdpdfjmdfserw.mp4', 2, '世界末日前再让我吻你一次', '2018-11-15 22:33:42', '2018-11-15 22:33:45');
INSERT INTO `video_lists` VALUES (3, '钢铁侠', 1, 'http://localhost:7001/public/upload/pic/20170119/kd;sdpdfjmdfserw.mp4', 'http://localhost:7001/public/upload/video/20170119/kd;sdpdfjmdfserw.mp4', 3, '世界末日前再让我吻你一次', '2018-11-15 22:33:42', '2018-11-15 22:33:45');
INSERT INTO `video_lists` VALUES (4, '肖克森的救赎', 4, 'http://localhost:7001/public/upload/pic/20170119/kd;sdpdfjmdfserw.mp4', 'http://localhost:7001/public/upload/video/20170119/kd;sdpdfjmdfserw.mp4', 4, '世界末日前再让我吻你一次', '2018-11-15 22:33:42', '2018-11-15 22:33:45');
INSERT INTO `video_lists` VALUES (5, '刀剑神域', 2, 'http://localhost:7001/public/upload/pic/20170119/kd;sdpdfjmdfserw.mp4', 'http://localhost:7001/public/upload/video/20170119/kd;sdpdfjmdfserw.mp4', 5, '世界末日前再让我吻你一次', '2018-11-15 22:33:42', '2018-11-15 22:33:45');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
