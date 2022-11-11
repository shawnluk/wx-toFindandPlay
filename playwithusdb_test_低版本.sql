/*
 Navicat Premium Data Transfer

 Source Server         : 本机localhost_MysqlDB
 Source Server Type    : MySQL
 Source Server Version : 80019
 Source Host           : localhost:3306
 Source Schema         : playwithusdb_test

 Target Server Type    : MySQL
 Target Server Version : 80019
 File Encoding         : 65001

 Date: 09/11/2022 15:42:55
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for team_activity
-- ----------------------------
DROP TABLE IF EXISTS `team_activity`;
CREATE TABLE `team_activity`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `userID` int(0) NOT NULL,
  `teamName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '活动所属的球队',
  `teamID` int(0) NOT NULL,
  `newCaptain` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '活动新管理者',
  `captainID` int(0) NOT NULL,
  `acti_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `acti_utc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `acti_date` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `acti_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `acti_region` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `acti_desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `acti_resource` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `acti_isOnApply` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createTime` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of team_activity
-- ----------------------------
INSERT INTO `team_activity` VALUES (1, 1, '中华人民共和国', 1, 'admin1', 1, '皇马第十冠', '2022-09-30 11:27:49', '2022-09-30 周五 11:27:49', '联赛或杯赛', '广州市荔湾区', '皇马VS马竞', '线下租约场地', '1', '2022-09-19 11:27:50', '2022-10-25 10:43:15');
INSERT INTO `team_activity` VALUES (2, 5, '皇家马德里', 2, 'admin5', 5, '皇马第十一冠', '2022-09-23 15:20:59', '2022-09-23 周五 15:20:59', '友谊赛', '广州市天河区', '来吧', '线上电竞比赛', '1', '2022-09-21 15:21:06', '2022-10-25 10:43:18');
INSERT INTO `team_activity` VALUES (3, 12, '中国女足', 6, 'admin11', 12, '皇马第十二冠', '2022-10-31 13:57:12', '2022-10-31 周一 13:57:12', '联赛或杯赛', '广州市越秀区', '来来来', '线上电竞比赛', '1', '2022-10-25 13:57:18', '2022-10-25 14:29:48');
INSERT INTO `team_activity` VALUES (4, 10, '中国男足', 7, 'admin13', 14, 'C罗金球奖', '1669785240000', '2022-11-30 13:14:00 周三', '联赛杯赛', '广州市荔湾区', '5金球', '线下租场', '1', '2022-10-31 13:14:50', '2022-11-09 14:41:49');

-- ----------------------------
-- Table structure for team_test
-- ----------------------------
DROP TABLE IF EXISTS `team_test`;
CREATE TABLE `team_test`  (
  `id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `teamName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userID` int(0) NULL DEFAULT NULL COMMENT '球队创建者',
  `newCaptain` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '新队长',
  `CaptainID` int(0) NULL DEFAULT NULL COMMENT '新队长ID',
  `teamSlogan` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '球队口号',
  `teamPic` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '球队头像保存路径',
  `teamDesc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '球队描述',
  `createTime` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `deleteTime` datetime(0) NULL DEFAULT NULL,
  `isDelete` int(0) NULL DEFAULT NULL,
  `fkID` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fkID`(`fkID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of team_test
-- ----------------------------
INSERT INTO `team_test` VALUES (1, '中华人民共和国', 1, 'admin1', 1, '中国队', 'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/10551/teamPic/1.png', '', '2022-09-16 19:59:09', '2022-10-25 13:54:15', NULL, 0, NULL);
INSERT INTO `team_test` VALUES (2, '皇家马德里', 5, 'admin5', 5, '我执纯白', 'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/10551/teamPic/2.png', '伯纳乌', '2022-09-20 16:03:17', '2022-10-25 13:54:18', NULL, 0, NULL);
INSERT INTO `team_test` VALUES (3, '巴塞罗那', 6, 'admin6', 6, '红蓝军团', 'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/10551/teamPic/3.png', '巴萨', '2022-09-20 16:06:46', '2022-10-25 13:54:19', NULL, 0, NULL);
INSERT INTO `team_test` VALUES (4, 'team7', 7, 'admin7', 7, '7', '', '7', '2022-09-20 22:01:32', '2022-10-25 13:54:21', '2022-09-20 22:14:40', 1, NULL);
INSERT INTO `team_test` VALUES (5, '皇马', 11, 'admin10', 11, '我执纯白', 'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/10551/teamPic/5.png', '皇马', '2022-10-24 11:47:22', '2022-10-25 13:54:40', NULL, 0, NULL);
INSERT INTO `team_test` VALUES (6, '中国女足', 12, 'admin11', 12, '中国队', 'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/10551/teamPic/6.png', '亚洲杯冠军', '2022-10-25 13:55:19', '2022-10-25 14:29:48', NULL, 0, NULL);
INSERT INTO `team_test` VALUES (7, '中国男足', 10, 'admin13', 14, '2002世界杯', 'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/10551/teamPic/7.png?temp=0.09083942928305788', '2004亚洲杯', '2022-10-25 16:55:47', '2022-11-09 14:41:49', NULL, 0, NULL);
INSERT INTO `team_test` VALUES (8, '广州恒大淘宝', 17, 'admin16', 17, '中国队', 'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/10551/teamPic/8.png', '恒大', '2022-10-30 15:46:10', '2022-10-30 15:46:11', NULL, 0, NULL);
INSERT INTO `team_test` VALUES (9, '微信test', 10, 'shawn.luk', 10, '微信test', '', '微信test', '2022-11-09 14:48:23', '2022-11-09 14:53:53', NULL, 1, NULL);
INSERT INTO `team_test` VALUES (10, '微信test', 10, 'shawn.luk', 10, '微信test', '', '微信test', '2022-11-09 14:54:34', '2022-11-09 14:54:58', '2022-11-09 14:54:58', 1, NULL);

-- ----------------------------
-- Table structure for user_team
-- ----------------------------
DROP TABLE IF EXISTS `user_team`;
CREATE TABLE `user_team`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `userID` int(0) NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `teamID` int(0) NOT NULL,
  `teamName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `isTrue` int(0) NOT NULL DEFAULT 1,
  `createTime` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_team
-- ----------------------------
INSERT INTO `user_team` VALUES (1, 1, 'admin1', 1, '中华人民共和国', 1, '2022-09-16 19:59:09', '2022-10-24 21:54:34');
INSERT INTO `user_team` VALUES (2, 2, 'admin2', 1, '中华人民共和国', 1, '2022-09-16 19:59:09', '2022-10-24 21:54:36');
INSERT INTO `user_team` VALUES (3, 4, 'admin4', 1, '中华人民共和国', 1, '2022-09-20 15:55:26', '2022-10-24 21:54:38');
INSERT INTO `user_team` VALUES (4, 5, 'admin5', 2, '皇家马德里', 1, '2022-09-20 16:03:17', '2022-10-24 21:54:40');
INSERT INTO `user_team` VALUES (5, 6, 'admin6', 3, '巴塞罗那', 1, '2022-09-20 16:06:46', '2022-10-24 21:55:09');
INSERT INTO `user_team` VALUES (6, 7, 'admin7', 4, 'team7', 0, '2022-09-20 22:01:32', '2022-10-24 21:55:12');
INSERT INTO `user_team` VALUES (7, 3, 'admin3', 1, '中华人民共和国', 1, '2022-10-05 12:11:18', '2022-10-24 21:55:13');
INSERT INTO `user_team` VALUES (8, 8, 'admin8', 1, '中华人民共和国', 0, '2022-10-05 12:54:04', '2022-10-24 21:55:15');
INSERT INTO `user_team` VALUES (9, 8, 'admin8', 1, '中华人民共和国', 1, '2022-10-05 12:55:51', '2022-10-24 21:55:17');
INSERT INTO `user_team` VALUES (10, 11, 'admin10', 5, '皇马', 1, '2022-10-24 11:47:22', '2022-10-24 21:55:28');
INSERT INTO `user_team` VALUES (11, 12, 'admin11', 6, '中国女足', 1, '2022-10-25 13:55:19', '2022-10-25 14:29:48');
INSERT INTO `user_team` VALUES (12, 10, 'shawn.luk', 7, '中国男足', 0, '2022-10-25 16:55:47', '2022-11-09 14:41:49');
INSERT INTO `user_team` VALUES (13, 15, 'admin14', 7, '中国男足', 1, '2022-10-28 18:49:34', '2022-10-28 18:50:11');
INSERT INTO `user_team` VALUES (14, 16, 'admin15', 7, '中国男足', 1, '2022-10-28 18:50:05', '2022-10-28 18:50:05');
INSERT INTO `user_team` VALUES (15, 14, 'admin13', 7, '中国男足', 1, '2022-10-28 18:51:06', '2022-10-28 18:51:06');
INSERT INTO `user_team` VALUES (16, 17, 'admin16', 8, '广州恒大淘宝', 1, '2022-10-30 15:46:10', '2022-10-30 15:46:10');
INSERT INTO `user_team` VALUES (17, 10, 'shawn.luk', 9, '微信test', 0, '2022-11-09 14:48:23', '2022-11-09 14:54:08');
INSERT INTO `user_team` VALUES (18, 10, 'shawn.luk', 10, '微信test', 0, '2022-11-09 14:54:34', '2022-11-09 14:54:58');

-- ----------------------------
-- Table structure for userjointeam
-- ----------------------------
DROP TABLE IF EXISTS `userjointeam`;
CREATE TABLE `userjointeam`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `userID` int(0) NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `teamID` int(0) NOT NULL,
  `teamName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `CaptainID` int(0) NULL DEFAULT NULL,
  `newCaptain` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `joinStatusYes` int(0) NULL DEFAULT NULL,
  `createTime` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '撤销申请',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userjointeam
-- ----------------------------
INSERT INTO `userjointeam` VALUES (1, 3, 'admin3', 1, '中华人民共和国', 1, 'admin1', 0, '2022-09-29 11:49:41', '2022-09-29 11:50:25');
INSERT INTO `userjointeam` VALUES (2, 3, 'admin3', 1, '中华人民共和国', 1, 'admin1', 0, '2022-09-29 11:55:05', '2022-09-29 11:56:14');
INSERT INTO `userjointeam` VALUES (3, 3, 'admin3', 1, '中华人民共和国', 1, 'admin1', 0, '2022-09-29 11:56:19', '2022-09-29 11:57:15');
INSERT INTO `userjointeam` VALUES (4, 3, 'admin3', 1, '中华人民共和国', 1, 'admin1', 0, '2022-09-29 11:58:12', '2022-10-05 10:43:56');
INSERT INTO `userjointeam` VALUES (5, 8, 'admin8', 1, '中华人民共和国', 1, 'admin1', 0, '2022-09-29 18:45:25', '2022-09-29 18:50:30');
INSERT INTO `userjointeam` VALUES (6, 8, 'admin8', 1, '中华人民共和国', 1, 'admin1', 0, '2022-09-29 18:51:39', '2022-09-29 18:58:46');
INSERT INTO `userjointeam` VALUES (7, 8, 'admin8', 1, '中华人民共和国', 1, 'admin1', 0, '2022-09-29 18:59:17', '2022-09-29 19:00:21');
INSERT INTO `userjointeam` VALUES (8, 8, 'admin8', 1, '中华人民共和国', 1, 'admin1', 0, '2022-09-29 19:01:05', '2022-09-29 19:06:16');
INSERT INTO `userjointeam` VALUES (9, 8, 'admin8', 1, '中华人民共和国', 1, 'admin1', 0, '2022-09-29 19:06:44', '2022-09-29 19:06:56');
INSERT INTO `userjointeam` VALUES (10, 8, 'admin8', 1, '中华人民共和国', 1, 'admin1', 0, '2022-09-30 10:50:25', '2022-09-30 10:50:30');
INSERT INTO `userjointeam` VALUES (11, 8, 'admin8', 1, '中华人民共和国', 1, 'admin1', 0, '2022-09-30 10:52:40', '2022-09-30 10:53:33');
INSERT INTO `userjointeam` VALUES (12, 8, 'admin8', 1, '中华人民共和国', 1, 'admin1', 0, '2022-09-30 11:00:32', '2022-09-30 11:00:38');
INSERT INTO `userjointeam` VALUES (13, 8, 'admin8', 1, '中华人民共和国', 1, 'admin1', 0, '2022-09-30 11:03:04', '2022-09-30 11:03:05');
INSERT INTO `userjointeam` VALUES (14, 8, 'admin8', 1, '中华人民共和国', 1, 'admin1', 0, '2022-09-30 11:05:36', '2022-09-30 11:05:38');
INSERT INTO `userjointeam` VALUES (15, 8, 'admin8', 1, '中华人民共和国', 1, 'admin1', 0, '2022-10-04 11:10:41', '2022-10-04 13:24:12');
INSERT INTO `userjointeam` VALUES (16, 8, 'admin8', 1, '中华人民共和国', 1, 'admin1', 0, '2022-10-04 13:24:38', '2022-10-05 10:41:12');
INSERT INTO `userjointeam` VALUES (17, 8, 'admin8', 1, '中华人民共和国', 1, 'admin1', 0, '2022-10-05 10:42:18', '2022-10-05 10:49:36');
INSERT INTO `userjointeam` VALUES (18, 3, 'admin3', 1, '中华人民共和国', 1, 'admin1', 0, '2022-10-05 10:44:10', '2022-10-05 10:49:38');
INSERT INTO `userjointeam` VALUES (19, 3, 'admin3', 1, '中华人民共和国', 1, 'admin1', 0, '2022-10-05 10:50:12', '2022-10-05 10:51:40');
INSERT INTO `userjointeam` VALUES (20, 3, 'admin3', 1, '中华人民共和国', 1, 'admin1', 0, '2022-10-05 10:52:14', '2022-10-05 10:53:30');
INSERT INTO `userjointeam` VALUES (21, 3, 'admin3', 1, '中华人民共和国', 1, 'admin1', 0, '2022-10-05 10:53:49', '2022-10-05 10:58:48');
INSERT INTO `userjointeam` VALUES (22, 8, 'admin8', 1, '中华人民共和国', 1, 'admin1', 0, '2022-10-05 10:54:30', '2022-10-05 10:58:49');
INSERT INTO `userjointeam` VALUES (23, 8, 'admin8', 1, '中华人民共和国', 1, 'admin1', 0, '2022-10-05 10:59:06', '2022-10-05 10:59:38');
INSERT INTO `userjointeam` VALUES (24, 8, 'admin8', 1, '中华人民共和国', 1, 'admin1', 0, '2022-10-05 11:00:26', '2022-10-05 12:09:58');
INSERT INTO `userjointeam` VALUES (25, 3, 'admin3', 1, '中华人民共和国', 1, 'admin1', 0, '2022-10-05 11:15:00', '2022-10-05 12:10:01');
INSERT INTO `userjointeam` VALUES (26, 3, 'admin3', 1, '中华人民共和国', 1, 'admin1', 0, '2022-10-05 12:11:15', '2022-10-05 12:11:18');
INSERT INTO `userjointeam` VALUES (27, 8, 'admin8', 1, '中华人民共和国', 1, 'admin1', 0, '2022-10-05 12:54:02', '2022-10-05 12:54:04');
INSERT INTO `userjointeam` VALUES (28, 8, 'admin8', 1, '中华人民共和国', 1, 'admin1', 0, '2022-10-05 12:55:42', '2022-10-05 12:55:51');
INSERT INTO `userjointeam` VALUES (29, 13, 'admin12', 7, '中国男足', 10, 'shawn', 1, '2022-10-28 18:46:39', '2022-10-28 18:46:39');
INSERT INTO `userjointeam` VALUES (30, 10, 'shawn.luk', 7, '中国男足', 14, 'admin13', 0, '2022-11-09 15:07:59', '2022-11-09 15:11:08');
INSERT INTO `userjointeam` VALUES (31, 10, 'shawn.luk', 7, '中国男足', 14, 'admin13', 0, '2022-11-09 15:15:49', '2022-11-09 15:29:36');

-- ----------------------------
-- Table structure for users_test
-- ----------------------------
DROP TABLE IF EXISTS `users_test`;
CREATE TABLE `users_test`  (
  `id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `userAccount` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户登陆账号',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `userPic` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createTime` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `lastLoginTime` datetime(0) NULL DEFAULT NULL,
  `isDelete` int(0) NOT NULL DEFAULT 0 COMMENT '是否已经删除',
  `isValid` int(0) NOT NULL DEFAULT 1 COMMENT '是否有效',
  `isWechat` int(0) NULL DEFAULT 0 COMMENT '是否微信用户',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户信息表 测试Beta' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users_test
-- ----------------------------
INSERT INTO `users_test` VALUES (1, 'admin1', 'admin1', '$2a$10$S1gK9Spns2C1WcIELZsv.OHotjoo.5B2rUBwCdPsXS4GMYaT503mG', 'admin1', '1@qq.com', 'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/10551/userPic/admin1.jpg', '2022-09-16 18:53:16', '2022-10-25 13:16:40', '2022-10-25 13:16:39', 0, 1, 0);
INSERT INTO `users_test` VALUES (2, 'admin2', 'admin2', '$2a$10$0BfQ.DipoBJS5Q9FJca3xuL45cPUN.TqUB9VEKvB6nZvLqG4KrhhK', 'admin2', NULL, NULL, '2022-09-16 19:47:08', '2022-10-24 21:55:44', '2022-09-26 15:20:25', 0, 1, 0);
INSERT INTO `users_test` VALUES (3, 'admin3', 'admin3', '$2a$10$Vklsuykv/xjTFsOYehja.uPZqk6cVjVSIiLHS0Lh0W28NsuxlL4m6', 'admin3', NULL, NULL, '2022-09-16 19:52:54', '2022-10-24 21:55:47', '2022-10-05 13:48:43', 0, 1, 0);
INSERT INTO `users_test` VALUES (4, 'admin4', 'admin4', '$2a$10$GvYrqiyU6Ijjfa42sYEro.eAVWROOHHTG.zDW.xygPvU0gCstwKem', 'admin4', NULL, NULL, '2022-09-20 15:53:33', '2022-10-24 21:55:48', '2022-09-20 22:20:40', 0, 1, 0);
INSERT INTO `users_test` VALUES (5, 'admin5', 'admin5', '$2a$10$scitpNA0c.5i28P5NV.wZegqHcUgH5UTGiNAdf9eDoRoPp/pSMtXO', 'admin5', NULL, NULL, '2022-09-20 16:02:57', '2022-10-24 21:55:50', '2022-09-27 14:49:02', 0, 1, 0);
INSERT INTO `users_test` VALUES (6, 'admin6', 'admin6', '$2a$10$TEyxQB3WyLce6In7YSrY.Oz.k8G5C2gI2Hn6gEsPM188npKuGXYL6', 'admin6', NULL, NULL, '2022-09-20 16:06:33', '2022-10-24 21:55:59', '2022-09-20 16:06:33', 0, 1, 0);
INSERT INTO `users_test` VALUES (7, 'admin7', 'admin7', '$2a$10$71TPq.FXnreTC8Y5vwbqT.YFLaC22eId0nhIxRtnFNEJs02t52YPy', 'admin7', '7@qq.com', 'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/10551/userPic/admin7.png', '2022-09-20 16:16:45', '2022-10-24 21:56:00', '2022-09-20 22:01:19', 0, 1, 0);
INSERT INTO `users_test` VALUES (8, 'admin8', 'admin8', '$2a$10$0pRXrPdnztTKsXtUwRrdG.fiNin/WDbxRFSakbwx5bopNj4sdwi2S', 'admin8', NULL, NULL, '2022-09-21 20:10:36', '2022-10-24 21:56:02', '2022-10-05 12:53:57', 0, 1, 0);
INSERT INTO `users_test` VALUES (9, 'admin9', 'admin9', '$2a$10$ywQZhO.0Ygm8mpiQ4QVmzOifibKUT4/aBAtr056GWWLoTQwKh.GTC', 'admin9', NULL, NULL, '2022-09-22 10:28:10', '2022-10-24 21:56:04', '2022-09-22 10:28:10', 0, 1, 0);
INSERT INTO `users_test` VALUES (10, 'oTH3s5RpTAhLmfAxsVQinShZHV5s', 'shawn.luk', 'ezuYJB6PV11laHVlK+Sp9A==', 'Luk', '840905524@qq.com', 'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/10551/userPic/10.jpg?temp=0.02072300877319999', '2022-10-19 21:20:35', '2022-11-09 15:15:43', NULL, 0, 1, 1);
INSERT INTO `users_test` VALUES (11, 'admin10', 'admin10', '$2a$10$tyJHYYfcxI0vNRVshR7TPemYoWNM06axytnVP11F1MCYp/DE9Oobe', 'admin10', NULL, NULL, '2022-10-24 11:47:06', '2022-10-25 10:10:57', '2022-10-25 10:10:56', 0, 1, 0);
INSERT INTO `users_test` VALUES (12, 'admin11', 'admin11', '$2a$10$TyVSL.z5ku.OHtmj/VZ9RO46IMNf911H8fR.H75WLN3ma2DLZFGhK', 'user_Quinta', '11@outlook.com', NULL, '2022-10-25 13:17:44', '2022-10-25 14:29:47', '2022-10-25 14:29:25', 0, 1, 0);
INSERT INTO `users_test` VALUES (13, 'admin12', 'admin12', '$2a$10$fU7lVf/pLkfmdtqS9aCX6O1aJkQTs3ezG2l5cYtnNLutvkQpYjYai', 'user_Quinta', NULL, NULL, '2022-10-28 18:46:32', '2022-10-28 18:46:32', '2022-10-28 18:46:32', 0, 1, 0);
INSERT INTO `users_test` VALUES (14, 'admin13', 'admin13', '$2a$10$RPXQc73x2L/zArr3tdkrouu5mbqsb2dGH/dHw.WyiozwJrTY0JCLW', 'user_Quinta', NULL, NULL, '2022-10-28 18:48:01', '2022-11-09 15:25:15', '2022-11-09 15:25:15', 0, 1, 0);
INSERT INTO `users_test` VALUES (15, 'admin14', 'admin14', '$2a$10$JSwCodQndZNyIerOd4e3O.Ai8A3E/ahcYoA7oB1ijLpW1iZNupbaS', 'user_Quinta', NULL, NULL, '2022-10-28 18:48:13', '2022-10-28 18:48:13', '2022-10-28 18:48:13', 0, 1, 0);
INSERT INTO `users_test` VALUES (16, 'admin15', 'admin15', '$2a$10$Vlp5yIS/tUGnzGe7e1hUi.4pibYwBP.K6jNQmwRW0rN20/IGUM3dW', 'user_Quinta', NULL, NULL, '2022-10-28 18:48:25', '2022-10-28 18:48:25', '2022-10-28 18:48:25', 0, 1, 0);
INSERT INTO `users_test` VALUES (17, 'admin16', 'admin16', '$2a$10$/5TwDdQHq0LJOwP3f97sNOk63XJ9h9C/Whk3KQpx0ZHsjnOpXbdyC', 'user_Quinta', NULL, NULL, '2022-10-30 15:45:39', '2022-10-30 15:45:39', '2022-10-30 15:45:39', 0, 1, 0);

SET FOREIGN_KEY_CHECKS = 1;
