/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : wulang

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2019-02-25 17:31:23
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `category`
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `cateName` varchar(200) DEFAULT NULL,
  `cateDesc` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', '复式房', '分类描述');
INSERT INTO `category` VALUES ('2', '高档住宅', '小型车描述');
INSERT INTO `category` VALUES ('3', '紧凑型', '紧凑型描述');
INSERT INTO `category` VALUES ('4', '普通住宅', '中型车描述');
INSERT INTO `category` VALUES ('5', '大型车', '大型车描述');
INSERT INTO `category` VALUES ('6', '公寓式住宅', 'SUV描述');
INSERT INTO `category` VALUES ('8', '别墅', '跑车描述');
INSERT INTO `category` VALUES ('9', '廉租住房', 'MPV de描述i想你想');

-- ----------------------------
-- Table structure for `homeinfo`
-- ----------------------------
DROP TABLE IF EXISTS `homeinfo`;
CREATE TABLE `homeinfo` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `cateId` int(6) NOT NULL,
  `count` int(5) DEFAULT NULL,
  `title` varchar(220) DEFAULT NULL,
  `desc` varchar(500) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT '0' COMMENT '0可预约，1已被预约，2商品下架',
  `price` int(8) NOT NULL,
  `img` varchar(200) DEFAULT NULL,
  `subImgs` varchar(300) DEFAULT NULL,
  `richText` longtext,
  `review` int(8) NOT NULL DEFAULT '0',
  `createTime` datetime DEFAULT NULL,
  `city` varchar(10) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `uId` int(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cateId` (`cateId`),
  CONSTRAINT `cateId` FOREIGN KEY (`cateId`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of homeinfo
-- ----------------------------
INSERT INTO `homeinfo` VALUES ('1', '2', '1', '测试上传小型车12万', '车辆描述信息，这是一辆很牛逼的车车', '1', '120000', '0.451877588710045.png', '0.451877588710045.png,0.3934990624230239.png', '<h1><strong>这是富文本描述加粗</strong></h1><p><br></p><p><br></p><p><br></p><h1><strong><em><u>倾斜文字加粗下划线</u></em></strong></h1><p><br></p><ol><li>1231231</li><li>23423</li></ol><ul><li>12312312</li><li>12312311</li></ul><p class=\"ql-indent-8\"><a href=\"http://baidu.com\" target=\"_blank\">大苏打</a>连接到百度</p><p><br></p><p>添加图片</p><p><img src=\"//:0\"><img src=\"https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg\"><img src=\"https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg\"><img src=\"https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg\"></p><p><img src=\"https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg\"></p>', '0', '2019-02-14 17:46:02', null, null, '1');
INSERT INTO `homeinfo` VALUES ('2', '2', '1', '测试上传2', ' 这又是一款很牛逼的车车啊123', '0', '130000', '0.451877588710045.png', '0.451877588710045.png,0.451877588710045.png,0.3934990624230239.png', '<p>setImg</p><p><img src=\"https://gw.alipayobjects.com/zos/rmsportal/tXlLQhLvkEelMstLyHiN.svg\"></p><p><img src=\"https://gw.alipayobjects.com/zos/rmsportal/tXlLQhLvkEelMstLyHiN.svg\"></p>', '48', '2019-02-11 17:46:23', null, null, '1');
INSERT INTO `homeinfo` VALUES ('3', '4', '1', '测试三', '折还是一辆很牛逼的车', '1', '230000', '0.21606447077867896.png', ',0.21606447077867896.png', '<p>this.state.<img src=\"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png\"></p>', '1', '2019-02-11 17:46:27', null, null, '1');
INSERT INTO `homeinfo` VALUES ('4', '3', '1', '测试第三次', '前两次图片处理不正确，第三次修复', '1', '600000', '0.21606447077867896.png', ',0.21606447077867896.png', '<p><img src=\"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png\"></p>', '2', '2019-02-11 17:49:11', null, null, '1');
INSERT INTO `homeinfo` VALUES ('5', '3', '1', '第四次测试', '图片状态为修改完成就调用get请求，导致上传空数据', '1', '500000', '0.21606447077867896.png', ',0.21606447077867896.png', '<p>       axios.get(\"/addProduct\",{</p><p>              params:{</p><p>                  cateId:this.state.categoryId,</p><p>                  pingpai:this.state.pingpai,</p><p>                  title:this.state.title,</p><p>                  desc:this.state.desc,</p><p>                  status:this.state.status,</p><p>                  price:this.state.price,</p><p>                  img:this.state.subImg[0],</p><p>                  subImgs:this.state.subImg,</p><p>                  richText:this.state.text</p><p>              }</p><p>          }).then((res)=&gt;{</p><p>            console.log(res);</p><p>          })</p>', '4', '2019-02-11 17:49:15', null, null, '1');
INSERT INTO `homeinfo` VALUES ('6', '3', '1', '第四次测试', '图片状态为修改完成就调用get请求，导致上传空数据', '0', '500000', '0.21606447077867896.png', ',0.21606447077867896.png', '<p>       axios.get(\"/addProduct\",{</p><p>              params:{</p><p>                  cateId:this.state.categoryId,</p><p>                  pingpai:this.state.pingpai,</p><p>                  title:this.state.title,</p><p>                  desc:this.state.desc,</p><p>                  status:this.state.status,</p><p>                  price:this.state.price,</p><p>                  img:this.state.subImg[0],</p><p>                  subImgs:this.state.subImg,</p><p>                  richText:this.state.text</p><p>              }</p><p>          }).then((res)=&gt;{</p><p>            console.log(res);</p><p>          })</p>', '3', '2019-02-11 17:49:06', null, null, '1');
INSERT INTO `homeinfo` VALUES ('7', '6', '1', '测试第五次', '这是一辆车，很牛逼的车', '1', '450000', '0.21606447077867896.png', ',0.21606447077867896.png', '<p>this.state.</p><p><img src=\"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png\"></p>', '0', '2019-02-11 17:49:08', '湖南', null, '1');
INSERT INTO `homeinfo` VALUES ('8', '5', '1', '测试最后一次', '\n             这是一辆车，车车这是一辆车，车车这是一辆车，车车这是一辆车，车车这是一辆车，车车这是一辆车，车车这是一辆车，车车这是一辆车，车车这是一辆车，车车这是一辆车，车车这是一辆车，车车这是一辆车，车车这是一辆车，车车这是一辆车，车车这是一辆车，车车这是一辆车，车车这是一辆车，车车这是一辆车，车车这是一辆车，车车这是一辆车，车车这是一辆车，车车这是一辆车，车车这是一辆车，车车这是一辆车，车车这是一辆车，车车这是一辆车，车车这是一辆车，车车这是一辆车，车车', '0', '450000', '0.6336654549891276png', '0.6336654549891276png,0.9908972830906131png,0.43426060023758306png,', '<p>123update</p><p><img src=\"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png\"></p>', '0', '2019-02-06 17:49:01', '湖南', null, '1');
INSERT INTO `homeinfo` VALUES ('9', '2', '1', '新增第七量', '\n    这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息', '1', '120000', '0.3809164411969972.jpg', '0.3809164411969972.jpg,0.7209731645549564.png,', '<p>这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息</p>\n    ', '0', '2019-02-11 17:48:55', '广西', null, '1');
INSERT INTO `homeinfo` VALUES ('10', '5', '1', '车辆名才', '这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息', '1', '150000', '0.03688790816803533.jpg', '0.03688790816803533.jpg,0.26512444901091636.png,', '<h1>这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息这是车辆描述信息</h1>', '4', '2019-02-11 17:48:58', '云南', null, '1');
INSERT INTO `homeinfo` VALUES ('11', '2', '1', '新增车辆11', '11', '1', '500000', '0.9939289023637934.jpg', '0.9939289023637934.jpg,0.8568716158584355.png,', '<p>11123</p>', '1', '2019-02-11 17:48:31', '深圳', null, '1');
INSERT INTO `homeinfo` VALUES ('12', '1', '1', '有图新', '\n    宝马有图好多图', '1', '230000', '\n0.8274463313161715.jpg', '0.8274463313161715.jpg,0.4266594556218293.jpg,0.5569691672944721.jpg,0.7020011737893335.jpg,', '<h1><br></h1><h1>富文本</h1>\n    ', '28', '2019-02-16 09:20:12', '广州', null, '1');
INSERT INTO `homeinfo` VALUES ('13', '1', '1', '测试', '劳斯莱斯很强', '1', '880000', '0.2202802861112545.jpg', '0.2202802861112545.jpg,0.33182199972005266.png,0.7045064618445611.jpg,', '<p><img src=\"http://localhost:5000/0.7020011737893335.jpg\"></p>', '10', '2019-02-16 09:33:22', '福建', null, '1');
INSERT INTO `homeinfo` VALUES ('14', '8', '1', '这是这里面最贵的车', '最贵最贵的车最贵最贵的车最贵最贵的车最贵最贵的车最贵最贵的车最贵最贵的车最贵最贵的车', '1', '50000000', '0.9313191065454862.jpg', '0.9313191065454862.jpg,0.7762337539611002.png,0.7439693940503642.jpg,', '<p><img src=\"https://wx2.sinaimg.cn/mw690/006We1hygy1ftaxqqrp9wj304105w74j.jpg\"><img src=\"https://wx2.sinaimg.cn/mw690/006We1hygy1ftaxqqrp9wj304105w74j.jpg\"></p>', '5', '2019-02-16 19:17:05', '上海', null, '1');
INSERT INTO `homeinfo` VALUES ('15', '3', '20', '测试', '名宿测试', '1', '123', '0.04375480188906411.png', '0.7101916447474017.png,', '<p>mainImgmainImgaddress</p>', '0', '2019-02-25 15:57:58', '杭州', 'mainImgaddress', '1');
INSERT INTO `homeinfo` VALUES ('16', '5', '50', '民宿跟随用户ID外键', '测试民宿跟随用户ID外键描述', '1', '200', '0.44780192674265296.png', '0.8589484380240549.png,0.8707451431681188.jpg,', '<h1><strong>民宿跟随用户ID外键民宿跟随用户ID外键民宿跟随用户ID外键民宿跟随用户ID外键民宿跟随用户ID外键民宿跟随用户ID外键民宿跟随用户ID外键</strong></h1>', '0', '2019-02-25 17:19:20', '杭州', '民宿跟随用户ID外键地址', '1');

-- ----------------------------
-- Table structure for `order`
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `cartId` int(6) NOT NULL,
  `userId` int(6) NOT NULL,
  `price` int(8) NOT NULL,
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of order
-- ----------------------------

-- ----------------------------
-- Table structure for `status`
-- ----------------------------
DROP TABLE IF EXISTS `status`;
CREATE TABLE `status` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `uId` int(6) NOT NULL,
  `homeId` int(6) NOT NULL,
  `Time` datetime DEFAULT NULL,
  `count` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of status
-- ----------------------------
INSERT INTO `status` VALUES ('1', '2', '11', '2019-03-03 00:00:00', '2');
INSERT INTO `status` VALUES ('2', '1', '12', '2019-02-22 00:00:00', '1');
INSERT INTO `status` VALUES ('3', '1', '12', '2019-02-27 00:00:00', '2');
INSERT INTO `status` VALUES ('4', '1', '12', '2019-02-25 00:00:00', '3');
INSERT INTO `status` VALUES ('5', '1', '12', '2019-02-25 00:00:00', '3');
INSERT INTO `status` VALUES ('6', '1', '12', '2019-02-27 00:00:00', '1');
INSERT INTO `status` VALUES ('7', '1', '12', '2019-03-23 00:00:00', '1');
INSERT INTO `status` VALUES ('8', '1', '12', '2019-02-26 00:00:00', '1');
INSERT INTO `status` VALUES ('9', '1', '12', '2019-01-16 00:00:00', '1');
INSERT INTO `status` VALUES ('10', '1', '13', '2019-01-23 00:00:00', '1');
INSERT INTO `status` VALUES ('11', '1', '12', '2019-03-30 00:00:00', '1');
INSERT INTO `status` VALUES ('12', '1', '12', '2019-02-16 00:00:00', '1');
INSERT INTO `status` VALUES ('13', '1', '12', '2019-02-16 00:00:00', '10');
INSERT INTO `status` VALUES ('14', '1', '12', '2020-02-16 00:00:00', '1');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `pwd` varchar(20) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `isAdmin` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'cj', '123', '13799418338', 'jery1997@foxmial.com', '1');
INSERT INTO `user` VALUES ('2', 'zd', '123', '137954654', 'zidan@qq,,com', '1');
INSERT INTO `user` VALUES ('3', 'cj2', '123', '13799418338', 'jery1997@foxmial.com', '0');
INSERT INTO `user` VALUES ('4', '123', '12', 'jery1996@foxmail.com', '13799418368', '0');
