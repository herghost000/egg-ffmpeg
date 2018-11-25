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

 Date: 25/11/2018 09:10:25
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user_auth_menu_refs
-- ----------------------------
DROP TABLE IF EXISTS `user_auth_menu_refs`;
CREATE TABLE `user_auth_menu_refs` (
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_auth_id` int(11) NOT NULL,
  `user_menu_id` int(11) NOT NULL,
  PRIMARY KEY (`user_auth_id`,`user_menu_id`),
  KEY `user_menu_id` (`user_menu_id`),
  CONSTRAINT `user_auth_menu_refs_ibfk_1` FOREIGN KEY (`user_auth_id`) REFERENCES `user_auths` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_auth_menu_refs_ibfk_2` FOREIGN KEY (`user_menu_id`) REFERENCES `user_menus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user_auth_menu_refs
-- ----------------------------
BEGIN;
INSERT INTO `user_auth_menu_refs` VALUES ('2018-11-25 00:35:06', '2018-11-25 00:35:10', 1, 1);
INSERT INTO `user_auth_menu_refs` VALUES ('2018-11-25 00:35:16', '2018-11-25 00:35:21', 2, 2);
INSERT INTO `user_auth_menu_refs` VALUES ('2018-11-25 00:35:27', '2018-11-25 00:35:30', 3, 3);
INSERT INTO `user_auth_menu_refs` VALUES ('2018-11-25 00:35:38', '2018-11-25 00:35:41', 4, 4);
INSERT INTO `user_auth_menu_refs` VALUES ('2018-11-25 00:35:47', '2018-11-25 00:35:49', 5, 5);
COMMIT;

-- ----------------------------
-- Table structure for user_auth_refs
-- ----------------------------
DROP TABLE IF EXISTS `user_auth_refs`;
CREATE TABLE `user_auth_refs` (
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_auth_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`user_auth_id`),
  KEY `user_auth_id` (`user_auth_id`),
  CONSTRAINT `user_auth_refs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_auth_refs_ibfk_2` FOREIGN KEY (`user_auth_id`) REFERENCES `user_auths` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for user_auths
-- ----------------------------
DROP TABLE IF EXISTS `user_auths`;
CREATE TABLE `user_auths` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user_auths
-- ----------------------------
BEGIN;
INSERT INTO `user_auths` VALUES (1, '视频管理菜单权限', NULL, NULL, NULL);
INSERT INTO `user_auths` VALUES (2, '转码设置菜单权限', NULL, NULL, NULL);
INSERT INTO `user_auths` VALUES (3, '分类设置菜单权限', NULL, NULL, NULL);
INSERT INTO `user_auths` VALUES (4, '创建视频菜单权限', NULL, NULL, NULL);
INSERT INTO `user_auths` VALUES (5, '视频列表菜单权限', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for user_group_refs
-- ----------------------------
DROP TABLE IF EXISTS `user_group_refs`;
CREATE TABLE `user_group_refs` (
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_group_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`user_group_id`),
  KEY `user_group_id` (`user_group_id`),
  CONSTRAINT `user_group_refs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_group_refs_ibfk_2` FOREIGN KEY (`user_group_id`) REFERENCES `user_groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user_group_refs
-- ----------------------------
BEGIN;
INSERT INTO `user_group_refs` VALUES ('2018-11-24 23:56:49', '2018-11-24 23:56:52', 2, 1);
COMMIT;

-- ----------------------------
-- Table structure for user_group_role_refs
-- ----------------------------
DROP TABLE IF EXISTS `user_group_role_refs`;
CREATE TABLE `user_group_role_refs` (
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_group_id` int(11) NOT NULL,
  `user_role_id` int(11) NOT NULL,
  PRIMARY KEY (`user_group_id`,`user_role_id`),
  KEY `user_role_id` (`user_role_id`),
  CONSTRAINT `user_group_role_refs_ibfk_1` FOREIGN KEY (`user_group_id`) REFERENCES `user_groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_group_role_refs_ibfk_2` FOREIGN KEY (`user_role_id`) REFERENCES `user_roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user_group_role_refs
-- ----------------------------
BEGIN;
INSERT INTO `user_group_role_refs` VALUES ('2018-11-24 23:57:29', '2018-11-24 23:57:33', 1, 1);
COMMIT;

-- ----------------------------
-- Table structure for user_groups
-- ----------------------------
DROP TABLE IF EXISTS `user_groups`;
CREATE TABLE `user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user_groups
-- ----------------------------
BEGIN;
INSERT INTO `user_groups` VALUES (1, '管理组', 0, '2018-11-24 23:49:32', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for user_menus
-- ----------------------------
DROP TABLE IF EXISTS `user_menus`;
CREATE TABLE `user_menus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user_menus
-- ----------------------------
BEGIN;
INSERT INTO `user_menus` VALUES (1, '视频管理', '/video', 0, NULL, NULL, NULL);
INSERT INTO `user_menus` VALUES (2, '转码设置', '/video/setting', 1, NULL, NULL, NULL);
INSERT INTO `user_menus` VALUES (3, '分类设置', '/video/type', 1, NULL, NULL, NULL);
INSERT INTO `user_menus` VALUES (4, '创建视频', '/video/upload', 1, NULL, NULL, NULL);
INSERT INTO `user_menus` VALUES (5, '视频列表', '/video/list', 1, NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for user_role_auth_refs
-- ----------------------------
DROP TABLE IF EXISTS `user_role_auth_refs`;
CREATE TABLE `user_role_auth_refs` (
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_auth_id` int(11) NOT NULL,
  `user_role_id` int(11) NOT NULL,
  PRIMARY KEY (`user_auth_id`,`user_role_id`),
  KEY `user_role_id` (`user_role_id`),
  CONSTRAINT `user_role_auth_refs_ibfk_1` FOREIGN KEY (`user_auth_id`) REFERENCES `user_auths` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_role_auth_refs_ibfk_2` FOREIGN KEY (`user_role_id`) REFERENCES `user_roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for user_role_refs
-- ----------------------------
DROP TABLE IF EXISTS `user_role_refs`;
CREATE TABLE `user_role_refs` (
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_role_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`user_role_id`),
  KEY `user_role_id` (`user_role_id`),
  CONSTRAINT `user_role_refs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_role_refs_ibfk_2` FOREIGN KEY (`user_role_id`) REFERENCES `user_roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user_role_refs
-- ----------------------------
BEGIN;
INSERT INTO `user_role_refs` VALUES ('2018-11-24 23:31:37', '2018-11-24 23:31:41', 2, 2);
COMMIT;

-- ----------------------------
-- Table structure for user_roles
-- ----------------------------
DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE `user_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user_roles
-- ----------------------------
BEGIN;
INSERT INTO `user_roles` VALUES (1, '管理员', '2018-11-24 20:35:18', '2018-11-24 20:35:23', NULL);
INSERT INTO `user_roles` VALUES (2, '版主', '2018-11-24 20:35:21', '2018-11-24 20:35:26', NULL);
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES (1, 'admin', NULL, NULL, NULL, NULL);
INSERT INTO `users` VALUES (2, 'zack', NULL, NULL, NULL, NULL);
INSERT INTO `users` VALUES (3, 'herghost', NULL, NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for video_decode_status
-- ----------------------------
DROP TABLE IF EXISTS `video_decode_status`;
CREATE TABLE `video_decode_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for video_decodes
-- ----------------------------
DROP TABLE IF EXISTS `video_decodes`;
CREATE TABLE `video_decodes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `trans_path` varchar(255) DEFAULT NULL,
  `chunk_path` varchar(255) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `video_decodes_status_id` (`status_id`),
  CONSTRAINT `video_decodes_ibfk_1` FOREIGN KEY (`status_id`) REFERENCES `video_decode_status` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `video_path` varchar(255) DEFAULT NULL,
  `decode_id` int(11) DEFAULT NULL,
  `dsc` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `video_lists_type_id` (`type_id`),
  KEY `video_lists_decode_id` (`decode_id`),
  CONSTRAINT `video_lists_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `video_decodes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `video_lists_ibfk_2` FOREIGN KEY (`decode_id`) REFERENCES `video_decodes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for video_settings
-- ----------------------------
DROP TABLE IF EXISTS `video_settings`;
CREATE TABLE `video_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `host` varchar(30) DEFAULT NULL,
  `ratio` varchar(255) DEFAULT NULL,
  `miaoqie` tinyint(1) DEFAULT NULL,
  `antiwhite` varchar(255) DEFAULT NULL,
  `antiurl` varchar(255) DEFAULT NULL,
  `antikey` varchar(255) DEFAULT NULL,
  `screenshots` int(11) DEFAULT NULL,
  `tsencry` tinyint(1) DEFAULT NULL,
  `openapi` tinyint(1) DEFAULT NULL,
  `watermark` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of video_settings
-- ----------------------------
BEGIN;
INSERT INTO `video_settings` VALUES (2, 'a', NULL, 0, NULL, NULL, NULL, 1, 0, 0, NULL, '2018-11-24 14:51:36', '2018-11-24 14:51:36', NULL);
COMMIT;

-- ----------------------------
-- Table structure for video_types
-- ----------------------------
DROP TABLE IF EXISTS `video_types`;
CREATE TABLE `video_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS = 1;
