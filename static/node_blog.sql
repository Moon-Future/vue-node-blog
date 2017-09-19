/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : node_blog

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2017-09-19 17:55:23
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `state` tinyint(2) DEFAULT NULL,
  `type` tinyint(2) DEFAULT NULL,
  `loadURL` varchar(255) DEFAULT NULL,
  `summary` varchar(255) DEFAULT NULL,
  `post_time` bigint(20) NOT NULL,
  `upd_time` bigint(20) DEFAULT NULL,
  `view` bigint(20) NOT NULL,
  `start` bigint(20) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `filePath` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of articles
-- ----------------------------
INSERT INTO `articles` VALUES ('1', '8023', 'node+vue搭建个人博客111', '1', '1', '#', '一步一个脚印11', '1504112522100', '1504112522100', '222', '333', null, '');
INSERT INTO `articles` VALUES ('2', '8023', 'node+vue搭建个人博客222', '0', '1', '#', '一步一个脚印22', '1504112522100', '1504112522100', '55', '66', null, '');
INSERT INTO `articles` VALUES ('3', '8023', 'node+vue搭建个人博客333', '0', '1', '#', '一步一个脚印33', '1504112522100', '1504112522100', '55', '66', '', '');
INSERT INTO `articles` VALUES ('4', '8023', 'node+vue搭建个人博客444', '0', '1', '#', '一步一个脚印44', '1504112522100', '1504112522100', '55', '66', '', '');
INSERT INTO `articles` VALUES ('5', '8023', 'node+vue搭建个人博客555', '2', '1', '#', '一步一个脚印55', '1504112522100', '1504112522100', '55', '66', '', '');
INSERT INTO `articles` VALUES ('6', '8023', 'node+vue搭建个人博客666', '0', '1', '#', '一步一个脚印66', '1504112522100', '1504112522100', '55', '66', '', '');

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `article_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `reply_id` varchar(255) DEFAULT NULL,
  `reply_name` varchar(255) DEFAULT NULL,
  `reply_comment_id` int(11) DEFAULT NULL,
  `content` varchar(255) NOT NULL,
  `time` bigint(15) NOT NULL,
  `reminder` tinyint(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES ('1', '1', '8023', '陈亮', null, null, null, '沙发！', '1504113410700', null);
INSERT INTO `comments` VALUES ('2', '1', '717', '魏茹月', null, null, null, '板凳', '1504113410700', null);
INSERT INTO `comments` VALUES ('3', '1', '111', '张三', null, null, null, '地板', '1504113410700', null);
INSERT INTO `comments` VALUES ('4', '1', '222', '李四', null, '陈亮', '1', '我回复你哟', '1504113410700', null);
INSERT INTO `comments` VALUES ('5', '1', '333', '王五', null, '陈亮', '1', '我也回复你哟', '1504113410700', null);
INSERT INTO `comments` VALUES ('6', '1', '444', '老李', null, '陈亮', '1', '我也是！', '1504113410700', null);
INSERT INTO `comments` VALUES ('7', '1', '555', '老王', '222', '李四', '1', '我回复李四', '1504113410700', null);
INSERT INTO `comments` VALUES ('8', '1', '666', '老张', '555', '老王', '1', '我回复老王', '1504113410700', null);
INSERT INTO `comments` VALUES ('9', '2', '777', '老薛', null, null, null, '板凳！', '1504113410700', null);
INSERT INTO `comments` VALUES ('10', '2', '888', '老周', null, null, null, '沙发！', '1504113410700', null);
INSERT INTO `comments` VALUES ('20', '1', '8023', '陈亮', '', '', null, '你妹', '1504120237766', '1');
INSERT INTO `comments` VALUES ('21', '1', '8023', '陈', '', '', null, 'qq.comdfefwe', '1504120356301', '1');
INSERT INTO `comments` VALUES ('22', '1', '8023', '假面', '', '', null, '浪人情歌', '1505063881806', '1');
INSERT INTO `comments` VALUES ('23', '1', '8023', 'CHENLIng', '', '', null, '11111111111111111', '1505793214623', '0');
INSERT INTO `comments` VALUES ('24', '1', '8', null, '', null, null, 'woshi leo chan', '1505809864426', '0');
INSERT INTO `comments` VALUES ('25', '1', '9', null, '6', null, null, 'haha', '1505810005637', '0');
INSERT INTO `comments` VALUES ('26', '1', '8', null, null, null, null, 'haha', '1505810143355', '0');

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tags
-- ----------------------------
INSERT INTO `tags` VALUES ('1', 'Vue');
INSERT INTO `tags` VALUES ('2', 'Javascript');
INSERT INTO `tags` VALUES ('3', 'Node');
INSERT INTO `tags` VALUES ('4', 'MySql');
INSERT INTO `tags` VALUES ('5', 'Ruby');
INSERT INTO `tags` VALUES ('6', 'Html');
INSERT INTO `tags` VALUES ('7', 'Python');
INSERT INTO `tags` VALUES ('8', 'CSS');
INSERT INTO `tags` VALUES ('9', 'Java');

-- ----------------------------
-- Table structure for tag_links
-- ----------------------------
DROP TABLE IF EXISTS `tag_links`;
CREATE TABLE `tag_links` (
  `tid` int(11) NOT NULL,
  `aid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tag_links
-- ----------------------------
INSERT INTO `tag_links` VALUES ('1', '1');
INSERT INTO `tag_links` VALUES ('2', '1');
INSERT INTO `tag_links` VALUES ('3', '2');
INSERT INTO `tag_links` VALUES ('4', '2');
INSERT INTO `tag_links` VALUES ('2', '3');
INSERT INTO `tag_links` VALUES ('5', '4');
INSERT INTO `tag_links` VALUES ('6', '5');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `root` tinyint(2) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('4', '你', '489584507@qq.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '0', 'head2.jpg');
INSERT INTO `users` VALUES ('8023', '假面对白', '236338364@qq.com', 'f889134a41063043803618b18908b6bd6d57b027', '1', 'head1.jpg');

-- ----------------------------
-- Table structure for visitors
-- ----------------------------
DROP TABLE IF EXISTS `visitors`;
CREATE TABLE `visitors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `website` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8024 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of visitors
-- ----------------------------
INSERT INTO `visitors` VALUES ('111', '张三', 'ee', '', '');
INSERT INTO `visitors` VALUES ('222', '李四', 'ee', '', '');
INSERT INTO `visitors` VALUES ('333', '王五', '545@qq.com', 'w', 'avatar');
INSERT INTO `visitors` VALUES ('444', '老李', 'waaa@qc.om', '3', 'avatar');
INSERT INTO `visitors` VALUES ('555', '老王', 'a@qq.com', '2', 'avatar');
INSERT INTO `visitors` VALUES ('666', '老张', 'accccccc@qq.com', '2', 'avatar');
INSERT INTO `visitors` VALUES ('717', '魏茹月', '236338364@qq.com', 'www.baidu.com', 'avatar');
INSERT INTO `visitors` VALUES ('777', '老薛', '489584507@qq.com', 'www.baidu.com', 'avatar');
INSERT INTO `visitors` VALUES ('888', '老周', '123456@qq.com', 'w', 'avatar');
INSERT INTO `visitors` VALUES ('8023', '假面对白', '236338364@qq.com', null, null);
