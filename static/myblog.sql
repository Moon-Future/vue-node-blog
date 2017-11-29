/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : myblog

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2017-11-30 00:27:29
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
  `summary` varchar(10000) DEFAULT NULL,
  `post_time` bigint(20) NOT NULL,
  `upd_time` bigint(20) DEFAULT NULL,
  `view` bigint(20) NOT NULL,
  `start` bigint(20) NOT NULL,
  `cover` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of articles
-- ----------------------------
INSERT INTO `articles` VALUES ('1', '8023', 'vue+node个人博客从零开始到部署上线（从零开始）', '1', '1', '#', '<h1 id=\"1-\">准备工作</h1><h2 id=\"-node-\">安装node，这是必须的</h2><p>新版node自带npm，安装Node.js时会一起安装，npm的作用就是对Node.js依赖的包进行管理，也可以理解为用来安装/卸载Node.js需要装的东西。\n验证是否安装成功：<br><img src=\"http://otr9a8wg0.bkt.clouddn.com/17-7-28/48974756.jpg\" alt=\"验证是否安装成功\"><br>推荐windows下终端工具：<a href=\"http://cmder.net/\">cmder</a></p><p>......</p>', '1504112522100', '1504112522100', '222', '333', null);
INSERT INTO `articles` VALUES ('2', '8023', 'vue+node个人博客从零开始到部署上线（部署上线）', '1', '1', '#', '<h1 id=\"-\">云服务器</h1><h2 id=\"-or-\">阿里云 or 腾讯云</h2><ul>\n<li>阿里云服务器品牌：ECS（Elastic Compute Service）</li><li>腾讯云服务器品牌：VCM（Cloud Virtual Machine）</li></ul>\n<p><img src=\"http://otr9a8wg0.bkt.clouddn.com/%E9%98%BF%E9%87%8C%E4%BA%91or%E8%85%BE%E8%AE%AF%E4%BA%91.jpg\" alt=\"腾讯云or阿里云\"></p><p>两者都可以，具体可以根据自己的需求，都说阿里云稳定，腾讯云便宜，我自己买时发现两者入门级的价格都差不多，就买了阿里云的，以下即以阿里云的服务器操作。（腾讯云服务器操作应该也类似）</p><h2 id=\"-ecs\">购买阿里云服务器ECS</h2><p>入门级最低配即可，一年300多，每月几十块钱，也可以月付，那样就贵点。\n<img src=\"http://otr9a8wg0.bkt.clouddn.com/%E8%B4%AD%E4%B9%B0%E9%98%BF%E9%87%8C%E4%BA%91ECS.jpg\" alt=\"\">\n中间有些选项默认就可，镜像选择 公共镜像-CentOS-7.4 64位（最新的）\n图中密码用来之后远程登陆服务器使用。</p><p>......</p>', '1504112522100', '1504112522100', '55', '66', '');
INSERT INTO `articles` VALUES ('3', '8023', 'node+vue搭建个人博客3', '1', '1', '#', '一步一个脚印55', '1504112522100', '1504112522100', '55', '66', '5');
INSERT INTO `articles` VALUES ('4', '8023', 'node+vue搭建个人博客4', '1', '1', '#', '一步一个脚印55', '1504112522100', '1504112522100', '55', '66', '5');
INSERT INTO `articles` VALUES ('5', '8023', 'node+vue搭建个人博客5', '1', '1', '#', '一步一个脚印55', '1504112522100', '1504112522100', '55', '66', '5');
INSERT INTO `articles` VALUES ('6', '8023', 'node+vue搭建个人博客6', '1', '1', '#', '一步一个脚印55', '1504112522100', '1504112522100', '55', '66', '5');
INSERT INTO `articles` VALUES ('7', '8023', 'node+vue搭建个人博客7', '1', '1', '#', '一步一个脚印55', '1504112522100', '1504112522100', '55', '66', '5');
INSERT INTO `articles` VALUES ('8', '8023', 'node+vue搭建个人博客8', '1', '1', '#', '一步一个脚印55', '1504112522100', '1504112522100', '55', '66', '5');
INSERT INTO `articles` VALUES ('9', '8023', 'node+vue搭建个人博客9', '1', '1', '#', '一步一个脚印55', '1504112522100', '1504112522100', '55', '66', '5');
INSERT INTO `articles` VALUES ('10', '8023', 'node+vue搭建个人博客10', '1', '1', '#', '一步一个脚印55', '1504112522100', '1504112522100', '55', '66', '5');
INSERT INTO `articles` VALUES ('11', '8023', 'node+vue搭建个人博客11', '1', '1', '#', '一步一个脚印55', '1504112522100', '1504112522100', '55', '66', '5');
INSERT INTO `articles` VALUES ('12', '8023', 'node+vue搭建个人博客12', '1', '1', '#', '一步一个脚印55', '1504112522100', '1504112522100', '55', '66', '5');
INSERT INTO `articles` VALUES ('13', '8023', 'node+vue搭建个人博客13', '1', '1', '#', '一步一个脚印55', '1504112522100', '1504112522100', '55', '66', '5');

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `article_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `reply_id` varchar(255) DEFAULT NULL,
  `reply_comment_id` int(11) DEFAULT NULL,
  `content` varchar(255) NOT NULL,
  `time` bigint(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES ('71', '1', '8055', null, null, '让我uveitis', '1505988654793');

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
INSERT INTO `tag_links` VALUES ('1', '4');
INSERT INTO `tag_links` VALUES ('1', '3');
INSERT INTO `tag_links` VALUES ('1', '2');
INSERT INTO `tag_links` VALUES ('1', '5');
INSERT INTO `tag_links` VALUES ('1', '6');
INSERT INTO `tag_links` VALUES ('1', '7');
INSERT INTO `tag_links` VALUES ('1', '8');
INSERT INTO `tag_links` VALUES ('1', '9');
INSERT INTO `tag_links` VALUES ('1', '10');
INSERT INTO `tag_links` VALUES ('1', '11');

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
  `website` varchar(255) DEFAULT NULL,
  `reminder` tinyint(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8024 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('666', '12分魅力', '489584507@qq.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '0', 'head1.jpg', null, null);
INSERT INTO `users` VALUES ('8023', '假面对白', '236338364@qq.com', 'f889134a41063043803618b18908b6bd6d57b027', '1', 'head2.jpg', null, null);

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
  `reminder` tinyint(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8056 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of visitors
-- ----------------------------
INSERT INTO `visitors` VALUES ('8023', '假面对白', '236338364@qq.com', '', 'head2.jpg', '0');
INSERT INTO `visitors` VALUES ('8055', '12分魅力', '489584507@qq.com', 'www.baidu.com', 'head1.jpg', '0');
