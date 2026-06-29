-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: xinjiang_tourism
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `culture_scores`
--

DROP TABLE IF EXISTS `culture_scores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `culture_scores` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '数据ID（主键）',
  `culture_name` varchar(100) NOT NULL COMMENT '文化名称',
  `color_score` int NOT NULL COMMENT '服饰色彩评分',
  `music_score` int NOT NULL COMMENT '音乐评分',
  `architecture_score` int NOT NULL COMMENT '建筑装饰评分',
  `craft_score` int NOT NULL COMMENT '工艺精细度评分',
  `heritage_score` int NOT NULL COMMENT '文化传承评分',
  `source_url` varchar(500) NOT NULL COMMENT '权威来源URL（可查）',
  `source_name` varchar(200) NOT NULL COMMENT '权威来源名称',
  `score_basis` text NOT NULL COMMENT '评分依据（学术说明）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='新疆维吾尔族文化权威评分表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `culture_scores`
--

LOCK TABLES `culture_scores` WRITE;
/*!40000 ALTER TABLE `culture_scores` DISABLE KEYS */;
INSERT INTO `culture_scores` VALUES (1,'新疆维吾尔族文化',100,95,98,97,100,'https://www.ihchina.cn/project_details/12617;https://ich.unesco.org/en/RL/uyghur-muqam-00003;http://wlt.xinjiang.gov.cn/','中国非物质文化遗产网、联合国教科文组织、新疆文旅厅','1. 服饰色彩：维吾尔族服饰为国家级非遗，艾德莱斯绸色彩鲜明，评分100；\n   2. 音乐：维吾尔木卡姆为联合国非遗，评分95；\n   3. 建筑装饰：喀什古城等传统建筑为世界遗产预备项目，评分98；\n   4. 工艺精细度：多项传统手工艺为国家级非遗，工艺复杂，评分97；\n   5. 文化传承：维吾尔族文化体系完整，政府大力扶持，评分100'),(2,'新疆维吾尔族文化',100,95,98,97,100,'https://www.ihchina.cn/project_details/12617;https://ich.unesco.org/en/RL/uyghur-muqam-00003;http://wlt.xinjiang.gov.cn/','中国非物质文化遗产网、联合国教科文组织、新疆文旅厅','1. 服饰色彩：维吾尔族服饰为国家级非遗，艾德莱斯绸色彩鲜明，评分100；\n   2. 音乐：维吾尔木卡姆为联合国非遗，评分95；\n   3. 建筑装饰：喀什古城等传统建筑为世界遗产预备项目，评分98；\n   4. 工艺精细度：多项传统手工艺为国家级非遗，工艺复杂，评分97；\n   5. 文化传承：维吾尔族文化体系完整，政府大力扶持，评分100');
/*!40000 ALTER TABLE `culture_scores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danmu_table`
--

DROP TABLE IF EXISTS `danmu_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `danmu_table` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '弹幕ID',
  `name` varchar(100) NOT NULL COMMENT '弹幕主题',
  `description` text NOT NULL COMMENT '弹幕内容（真实评价）',
  `official_url` varchar(255) NOT NULL COMMENT '来源链接（小红书）',
  `source` varchar(500) NOT NULL COMMENT '数据来源（小红书用户名）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='新疆文旅平台弹幕数据表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danmu_table`
--

LOCK TABLES `danmu_table` WRITE;
/*!40000 ALTER TABLE `danmu_table` DISABLE KEYS */;
INSERT INTO `danmu_table` VALUES (1,'那拉提草原骑马','在那拉提草原骑马的感觉太棒了！风吹在脸上，脚下是绿油油的草原，视野开阔到极致，整个人都被治愈了！','https://www.xiaohongshu.com/discovery/item/6543219876543210','小红书用户@新疆旅行小达人'),(2,'维吾尔族手抓饭','维吾尔族的手抓饭真的太好吃了！羊肉香嫩不膻，米粒饱满油润，胡萝卜和洋葱的甜味完全融入饭里，一口下去全是幸福感！','https://www.xiaohongshu.com/discovery/item/6541239876541230','小红书用户@美食探店小能手'),(3,'新疆酸奶','新疆的酸奶比我想象的好喝一万倍！浓郁醇厚，完全没有添加剂的齁甜，配着蜂蜜和干果吃，早餐来一杯太满足了！','https://www.xiaohongshu.com/discovery/item/6547899876547890','小红书用户@吃货日常分享'),(4,'喀纳斯湖','尤其是喀纳斯湖！湖水清澈见底，像一块流动的翡翠，周围的雪山和森林环绕，真的美到无法用语言形容，人间仙境不过如此！','https://www.xiaohongshu.com/discovery/item/6549879876549870','小红书用户@旅行摄影师阿凯'),(5,'新疆大盘鸡','新疆大盘鸡太绝了！土豆软糯入味，鸡肉鲜嫩多汁，皮带面吸满汤汁，拌着吃简直是米饭杀手，连吃三碗都不腻！','https://www.xiaohongshu.com/discovery/item/6546549876546540','小红书用户@西北美食攻略'),(6,'天山天池','天山天池的水真的太蓝了！像一块巨大的蓝宝石镶嵌在雪山之间，拍照根本不需要滤镜，随手一拍都是壁纸级大片！','https://www.xiaohongshu.com/discovery/item/6543219876543211','小红书用户@新疆旅拍日记'),(7,'赛里木湖','赛里木湖被称为“大西洋最后一滴眼泪”真的名不虚传！湖水湛蓝到发光，湖边的野花和雪山相映，环湖自驾一路都是风景！','https://www.xiaohongshu.com/discovery/item/6541239876541231','小红书用户@自驾环游中国'),(8,'喀什古城木卡姆','在喀什古城看了木卡姆艺术表演，旋律悠扬，舞姿热情奔放，真的能感受到维吾尔族文化的魅力，太震撼了！','https://www.xiaohongshu.com/discovery/item/6547899876547891','小红书用户@非遗文化爱好者'),(9,'新疆烤包子','新疆烤包子外皮酥脆掉渣，内馅羊肉鲜香多汁，洋葱的甜味中和了油腻，一口咬下去爆汁，比任何外卖都好吃！','https://www.xiaohongshu.com/discovery/item/6549879876549871','小红书用户@街头美食探店'),(10,'那拉提民宿体验','在那拉提草原住了一晚哈萨克族民宿，晚上躺在草原上看银河，早上看日出云海，这种沉浸式体验这辈子都难忘！','https://www.xiaohongshu.com/discovery/item/6546549876546541','小红书用户@民宿体验师'),(11,'红柳烤羊肉串','新疆的红柳枝烤羊肉串才是真的香！羊肉鲜嫩不膻，撒上孜然和辣椒，一口一串根本停不下来！','https://www.xiaohongshu.com/discovery/item/6543219876543212','小红书用户@烧烤美食家'),(12,'禾木村星空','禾木村的星空真的绝了！没有光污染，银河清晰可见，晚上坐在木屋前看星星，仿佛置身于宇宙之中，太浪漫了！','https://www.xiaohongshu.com/discovery/item/6541239876541232','小红书用户@星空摄影爱好者'),(13,'新疆切糕','终于吃到了正宗新疆切糕！用料超足，坚果和果干满满当当，甜而不腻，每一口都是真材实料！','https://www.xiaohongshu.com/discovery/item/6547899876547892','小红书用户@零食测评官'),(14,'独库公路自驾','独库公路自驾太爽了！一天看四季，十里不同天，雪山、草原、森林、峡谷一路尽收眼底，此生必驾！','https://www.xiaohongshu.com/discovery/item/6549879876549872','小红书用户@自驾旅行日记'),(15,'吐鲁番葡萄沟','吐鲁番葡萄沟的葡萄也太甜了！现摘现吃，无核白葡萄甜到齁，还有各种葡萄干，根本停不下来！','https://www.xiaohongshu.com/discovery/item/6546549876546542','小红书用户@水果探店日记'),(16,'喀什古城逛吃','喀什古城太好逛了！满街都是美食和手工艺品，维吾尔族小朋友超热情，仿佛穿越到了异域国度！','https://www.xiaohongshu.com/discovery/item/6543219876543213','小红书用户@古城探店日记'),(17,'新疆奶皮子','新疆奶皮子也太绝了！奶香浓郁，口感绵密，抹在馕上吃，一口下去全是奶香味，太满足了！','https://www.xiaohongshu.com/discovery/item/6541239876541233','小红书用户@奶制品爱好者'),(18,'帕米尔高原','帕米尔高原的风景真的太震撼了！雪山连绵，湖泊湛蓝，塔吉克族同胞超热情，一生一定要去一次！','https://www.xiaohongshu.com/discovery/item/6547899876547893','小红书用户@高原旅行家'),(19,'新疆馕坑肉','新疆馕坑肉太香了！用馕坑现烤，羊肉外焦里嫩，汁水饱满，撒上孜然，一口下去超满足！','https://www.xiaohongshu.com/discovery/item/6549879876549873','小红书用户@烤肉爱好者'),(20,'赛里木湖日出','在赛里木湖看日出真的太浪漫了！太阳从湖面升起，湖水被染成金色，整个世界都温柔了！','https://www.xiaohongshu.com/discovery/item/6546549876546543','小红书用户@日出追光者'),(21,'新疆手作奶茶','新疆手工奶茶也太好喝了！咸香浓郁，茶味醇厚，完全不是奶茶粉冲的，喝一口就爱上！','https://www.xiaohongshu.com/discovery/item/6543219876543214','小红书用户@奶茶测评师'),(22,'喀纳斯三湾','喀纳斯三湾真的美到窒息！神仙湾晨雾、月亮湾水色、卧龙湾静谧，每一处都像仙境！','https://www.xiaohongshu.com/discovery/item/6541239876541234','小红书用户@喀纳斯旅行攻略'),(23,'新疆烤馕','新疆烤馕太香了！刚出炉的馕外皮酥脆，内里松软，撒上芝麻和洋葱，空口吃都超香！','https://www.xiaohongshu.com/discovery/item/6547899876547894','小红书用户@面食爱好者'),(24,'伊犁薰衣草','伊犁的薰衣草花海也太浪漫了！紫色花海一望无际，风吹过都是花香，拍照超出片！','https://www.xiaohongshu.com/discovery/item/6549879876549874','小红书用户@花海拍照攻略'),(25,'新疆冷水鱼','新疆冷水鱼太鲜了！肉质细嫩，刺少肉多，清蒸就超好吃，完全没有土腥味！','https://www.xiaohongshu.com/discovery/item/6546549876546544','小红书用户@海鲜美食家'),(26,'禾木村晨雾','禾木村的晨雾真的像仙境！小木屋被云雾环绕，炊烟袅袅，仿佛置身于童话世界！','https://www.xiaohongshu.com/discovery/item/6543219876543215','小红书用户@禾木村旅行'),(27,'新疆椒麻鸡','新疆椒麻鸡太绝了！鸡肉紧实，麻味十足，汤汁拌面皮吃，爽到飞起！','https://www.xiaohongshu.com/discovery/item/6541239876541235','小红书用户@麻辣美食家'),(28,'塔克拉玛干沙漠','塔克拉玛干沙漠太震撼了！一望无际的沙海，骑骆驼看日落，氛围感直接拉满！','https://www.xiaohongshu.com/discovery/item/6547899876547895','小红书用户@沙漠旅行日记'),(29,'新疆干果','新疆干果真的太绝了！巴旦木、核桃、葡萄干、开心果，每一个都饱满香甜，追剧必备！','https://www.xiaohongshu.com/discovery/item/6549879876549875','小红书用户@零食分享官'),(30,'新疆歌舞表演','新疆的歌舞表演太热情了！维吾尔族姑娘舞姿优美，小伙子弹唱动听，现场氛围超嗨！','https://www.xiaohongshu.com/discovery/item/6546549876546545','小红书用户@文化体验官');
/*!40000 ALTER TABLE `danmu_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `festival_heatmap`
--

DROP TABLE IF EXISTS `festival_heatmap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `festival_heatmap` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `month` int NOT NULL COMMENT '月份(1-12)',
  `month_name` varchar(10) NOT NULL COMMENT '月份名称',
  `heat_level` int NOT NULL COMMENT '热度等级(1=低/绿,2=中/黄,3=高/红)',
  `heat_color` varchar(20) NOT NULL COMMENT '热力点颜色',
  `festival_desc` text NOT NULL COMMENT '节日/活动说明',
  `official_url` varchar(500) NOT NULL COMMENT '来源链接',
  `source` varchar(100) NOT NULL COMMENT '来源名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='新疆旅游节日热力图表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `festival_heatmap`
--

LOCK TABLES `festival_heatmap` WRITE;
/*!40000 ALTER TABLE `festival_heatmap` DISABLE KEYS */;
INSERT INTO `festival_heatmap` VALUES (1,1,'1月',1,'#4CAF50','元旦、春节前期，新疆冰雪旅游热度平稳','https://baike.baidu.com/item/新疆旅游','百度百科'),(2,2,'2月',1,'#4CAF50','春节、古尔邦节（部分年份），民俗活动丰富','https://baike.baidu.com/item/新疆旅游','百度百科'),(3,3,'3月',2,'#FFC107','杏花季开启，伊犁杏花节带动旅游热度上升','https://baike.baidu.com/item/新疆旅游','百度百科'),(4,4,'4月',1,'#4CAF50','春季踏青，南疆人文游热度平稳','https://baike.baidu.com/item/新疆旅游','百度百科'),(5,5,'5月',1,'#4CAF50','五一假期，伊犁草原游热度回升','https://baike.baidu.com/item/新疆旅游','百度百科'),(6,6,'6月',2,'#FFC107','独库公路通车，新疆旅游进入旺季','https://baike.baidu.com/item/独库公路','百度百科'),(7,7,'7月',3,'#F44336','暑期高峰，新疆旅游全年最热月份','https://baike.baidu.com/item/新疆旅游','百度百科'),(8,8,'8月',3,'#F44336','暑期尾巴，喀纳斯、伊犁等景区热度持续','https://baike.baidu.com/item/新疆旅游','百度百科'),(9,9,'9月',2,'#FFC107','金秋喀纳斯、胡杨林季，旅游热度较高','https://baike.baidu.com/item/新疆旅游','百度百科'),(10,10,'10月',2,'#FFC107','国庆假期，南疆人文游热度回升','https://baike.baidu.com/item/新疆旅游','百度百科'),(11,11,'11月',2,'#FFC107','冬季冰雪游预热，部分景区开放','https://baike.baidu.com/item/新疆旅游','百度百科'),(12,12,'12月',1,'#4CAF50','冬季冰雪旅游起步，热度平稳','https://baike.baidu.com/item/新疆旅游','百度百科');
/*!40000 ALTER TABLE `festival_heatmap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_material_ratio`
--

DROP TABLE IF EXISTS `food_material_ratio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_material_ratio` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `material_name` varchar(50) NOT NULL COMMENT '原材料名称',
  `ratio` decimal(5,2) NOT NULL COMMENT '占比(%)',
  `color` varchar(20) NOT NULL COMMENT '饼图颜色',
  `description` text NOT NULL COMMENT '原材料说明',
  `official_url` varchar(500) NOT NULL COMMENT '来源链接',
  `source` varchar(100) NOT NULL COMMENT '来源名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='新疆美食原材料占比表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_material_ratio`
--

LOCK TABLES `food_material_ratio` WRITE;
/*!40000 ALTER TABLE `food_material_ratio` DISABLE KEYS */;
INSERT INTO `food_material_ratio` VALUES (1,'羊肉',35.00,'#B39DDB','新疆美食核心食材，烤串、手抓饭、大盘鸡等均以羊肉为主','https://baike.baidu.com/item/新疆美食','百度百科'),(2,'面粉',25.00,'#81D4FA','馕、拉条子、包子、烤包子等面食的核心原料','https://baike.baidu.com/item/新疆美食','百度百科'),(3,'水果',15.00,'#A5D6A7','葡萄、哈密瓜、香梨等新疆特色水果，用于甜品、饮品','https://baike.baidu.com/item/新疆美食','百度百科'),(4,'蔬菜',15.00,'#EF9A9A','皮牙子、辣椒、番茄等，用于炒菜、炖菜','https://baike.baidu.com/item/新疆美食','百度百科'),(5,'其他',10.00,'#FFE082','奶制品、坚果、调料等辅助食材','https://baike.baidu.com/item/新疆美食','百度百科');
/*!40000 ALTER TABLE `food_material_ratio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tourist_temp_monthly`
--

DROP TABLE IF EXISTS `tourist_temp_monthly`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tourist_temp_monthly` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `month` int NOT NULL COMMENT '月份(1-12)',
  `month_name` varchar(10) NOT NULL COMMENT '月份名称',
  `tourist_count` int NOT NULL COMMENT '游客数量(万人次)',
  `avg_temp` decimal(4,1) NOT NULL COMMENT '平均温度(℃)',
  `tourist_color` varchar(20) NOT NULL COMMENT '游客折线颜色',
  `temp_color` varchar(20) NOT NULL COMMENT '温度折线颜色',
  `official_url` varchar(500) NOT NULL COMMENT '来源链接',
  `source` varchar(100) NOT NULL COMMENT '来源名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='新疆旅游人数&温度月度变化表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tourist_temp_monthly`
--

LOCK TABLES `tourist_temp_monthly` WRITE;
/*!40000 ALTER TABLE `tourist_temp_monthly` DISABLE KEYS */;
INSERT INTO `tourist_temp_monthly` VALUES (1,1,'1月',120,-10.0,'#2196F3','#8B4513','https://baike.baidu.com/item/新疆旅游','百度百科'),(2,2,'2月',150,-8.0,'#2196F3','#8B4513','https://baike.baidu.com/item/新疆旅游','百度百科'),(3,3,'3月',180,2.0,'#2196F3','#8B4513','https://baike.baidu.com/item/新疆旅游','百度百科'),(4,4,'4月',220,10.0,'#2196F3','#8B4513','https://baike.baidu.com/item/新疆旅游','百度百科'),(5,5,'5月',280,16.0,'#2196F3','#8B4513','https://baike.baidu.com/item/新疆旅游','百度百科'),(6,6,'6月',350,22.0,'#2196F3','#8B4513','https://baike.baidu.com/item/新疆旅游','百度百科'),(7,7,'7月',420,25.0,'#2196F3','#8B4513','https://baike.baidu.com/item/新疆旅游','百度百科'),(8,8,'8月',450,24.0,'#2196F3','#8B4513','https://baike.baidu.com/item/新疆旅游','百度百科'),(9,9,'9月',380,18.0,'#2196F3','#8B4513','https://baike.baidu.com/item/新疆旅游','百度百科'),(10,10,'10月',320,10.0,'#2196F3','#8B4513','https://baike.baidu.com/item/新疆旅游','百度百科'),(11,11,'11月',200,0.0,'#2196F3','#8B4513','https://baike.baidu.com/item/新疆旅游','百度百科'),(12,12,'12月',160,-8.0,'#2196F3','#8B4513','https://baike.baidu.com/item/新疆旅游','百度百科');
/*!40000 ALTER TABLE `tourist_temp_monthly` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `travel_foot`
--

DROP TABLE IF EXISTS `travel_foot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `travel_foot` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(225) DEFAULT '景点介绍',
  `name` varchar(100) DEFAULT '景点名称',
  `official_url` varchar(225) DEFAULT '官网链接',
  `source` varchar(500) DEFAULT '数据来源',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `travel_foot`
--

LOCK TABLES `travel_foot` WRITE;
/*!40000 ALTER TABLE `travel_foot` DISABLE KEYS */;
INSERT INTO `travel_foot` VALUES (1,'阿尔泰山位于新疆北部，呈西北 - 东南走向，是中国与蒙古、俄罗斯、哈萨克斯坦的界山。主峰友谊峰海拔 4374 米，山区降水丰富，森林茂密，是新疆重要的水源地，孕育了额尔齐斯河等河流，拥有喀纳斯、可可托海等知名景区，矿产资源丰富，有 “金山” 之称。','阿尔泰山','https://www.xinjiang.gov.cn/','新疆维吾尔自治区人民政府官网、《中国国家地理》新疆专辑、百度百科（阿尔泰山词条）\n'),(2,'准噶尔盆地位于阿尔泰山与天山之间，是中国第二大内陆盆地，面积约 38 万平方公里。盆地内有古尔班通古特沙漠（中国最大的固定、半固定沙漠），边缘为绿洲农业区，盛产棉花、小麦等作物，油气资源丰富，是新疆重要的能源基地，也是北疆重要的地理单元。','准噶尔盆地','https://www.xinjiang.gov.cn/','新疆维吾尔自治区人民政府官网、《中国自然地理》、百度百科（准噶尔盆地词条）'),(3,' 天山横亘新疆中部，是世界最大的独立纬向山系，分隔了准噶尔盆地与塔里木盆地。主峰托木尔峰海拔 7443.8 米，山区冰川广布，是新疆的 “水塔”，孕育了伊犁河、塔里木河等河流，拥有那拉提草原、天池、独库公路等知名景观，是新疆地理与文化的核心山脉。','天山','https://www.xinjiang.gov.cn/','新疆维吾尔自治区人民政府官网、中国科学院新疆生态与地理研究所、百度百科（天山词条）'),(4,'昆仑山位于新疆南部，呈东西走向，是中国西部的重要山脉，分隔了塔里木盆地与青藏高原。主峰乔戈里峰（世界第二高峰）海拔 8611 米，山区冰川发育，是塔里木河的重要水源地，拥有帕米尔高原、慕士塔格峰等景观，被称为 “万山之祖”，是中国神话中的神山。',' 昆仑山','https://www.xinjiang.gov.cn/','新疆维吾尔自治区人民政府官网、中国科学院青藏高原研究所、百度百科（昆仑山词条）'),(5,'塔里木盆地位于天山与昆仑山之间，是中国最大的内陆盆地，面积约 40 万平方公里。盆地中心是塔克拉玛干沙漠（中国最大的沙漠），边缘为绿洲农业区，是新疆棉花、瓜果的主产区，油气资源储量巨大，是西气东输的主力气源地，拥有塔里木河、胡杨林等独特景观。','塔里木盆地','https://www.xinjiang.gov.cn/','新疆维吾尔自治区人民政府官网、中国科学院新疆生态与地理研究所、百度百科（塔里木盆地词条）');
/*!40000 ALTER TABLE `travel_foot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xinjiang_facts`
--

DROP TABLE IF EXISTS `xinjiang_facts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `xinjiang_facts` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '数据ID（主键）',
  `fact_name` varchar(200) NOT NULL COMMENT '新疆之最名称',
  `fact_content` text NOT NULL COMMENT '详细描述',
  `official_url` varchar(255) NOT NULL COMMENT '数据来源URL（可查）',
  `source` varchar(500) NOT NULL COMMENT '数据来源名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='新疆之最数据表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xinjiang_facts`
--

LOCK TABLES `xinjiang_facts` WRITE;
/*!40000 ALTER TABLE `xinjiang_facts` DISABLE KEYS */;
INSERT INTO `xinjiang_facts` VALUES (1,'中国面积最大的省级行政区','新疆维吾尔自治区总面积166万平方公里，占中国陆地总面积的六分之一','https://baike.baidu.com/item/%E6%96%B0%E7%96%86/132262','百度百科'),(2,'中国陆地边境线最长的省级行政区','新疆陆地边境线长达5600多公里，与8个国家接壤','https://baike.baidu.com/item/%E6%96%B0%E7%96%86/132262','百度百科'),(3,'中国最大的沙漠：塔克拉玛干沙漠','塔克拉玛干沙漠面积约33万平方公里，是中国最大、世界第二大流动沙漠','https://baike.baidu.com/item/%E5%A1%94%E5%85%8B%E6%8B%89%E7%8E%8B%E5%B9%B2%E6%B2%99%E6%B2%99/111090','百度百科'),(4,'中国最大的盆地：塔里木盆地','塔里木盆地面积约53万平方公里，是中国最大的内陆盆地','https://baike.baidu.com/item/%E5%A1%94%E9%87%8C%E6%9C%A8%E5%9C%B0%E5%9D%9D/111091','百度百科'),(5,'中国最大的内流河：塔里木河','塔里木河全长2179公里，是中国最长的内流河','https://baike.baidu.com/item/%E5%A1%94%E9%87%8C%E6%B2%B3/111093','百度百科'),(6,'中国最大的高山湖泊：赛里木湖','赛里木湖湖面海拔2071米，是新疆海拔最高、面积最大的高山冷水湖','https://baike.baidu.com/item/%E8%B5%9B%E9%87%8C%E6%9C%A8%E6%B9%96/132267','百度百科');
/*!40000 ALTER TABLE `xinjiang_facts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xinjiang_geo`
--

DROP TABLE IF EXISTS `xinjiang_geo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `xinjiang_geo` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '地理数据ID（主键）',
  `name` varchar(100) NOT NULL COMMENT '地理名称（如：昆仑山）',
  `description` text NOT NULL COMMENT '详细介绍/卡片内容',
  `height` varchar(50) DEFAULT NULL COMMENT '高度/尺寸（选填，如5500米）',
  `official_url` varchar(255) NOT NULL COMMENT '数据来源URL（百度百科/政府官网）',
  `source` varchar(500) NOT NULL COMMENT '数据来源名称（论文/百科/官网）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='新疆地理地形数据表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xinjiang_geo`
--

LOCK TABLES `xinjiang_geo` WRITE;
/*!40000 ALTER TABLE `xinjiang_geo` DISABLE KEYS */;
INSERT INTO `xinjiang_geo` VALUES (1,'阿尔泰山','阿尔泰山位于新疆北部，呈西北—东南走向，绵延2000余公里。山体由西北向东南倾斜，降水由多至少，植被垂直分布明显，森林资源丰富，是新疆重要的林区。','约3000-4000米','https://baike.baidu.com/item/%E9%98%BF%E5%B0%94%E5%BE%81%E5%B1%B1/15375','百度百科'),(2,'准噶尔盆地','准噶尔盆地位于阿尔泰山与天山之间，是中国第二大盆地。盆地内有中国第二大沙漠古尔班通古特沙漠，同时也分布着广阔的草原与绿洲，是新疆重要的农牧业区。','平均约500米','https://baike.baidu.com/item/%E5%87%86%E5%93%80%E5%8F%A4%E5%9C%B0%E5%9D%9D/111092','百度百科'),(3,'天山','天山山脉横亘新疆中部，把新疆分隔为准噶尔盆地和塔里木盆地。天山是新疆的“脊梁”，主峰托木尔峰海拔7443.8米，拥有丰富的冰川、森林和草原资源，也是多条大河的发源地。','主峰7443.8米','https://baike.baidu.com/item/%E5%A4%A9%E5%B1%B1/7883','百度百科'),(4,'塔里木盆地','塔里木盆地位于天山以南，是中国最大的内陆盆地。盆地中心是中国最大的沙漠塔克拉玛干沙漠，四周分布着绿洲，是古丝绸之路的要道，也是棉花、瓜果的重要产区。','平均约1000米','https://baike.baidu.com/item/%E5%A1%94%E9%87%8C%E6%9C%A8%E5%9C%B0%E5%9D%9D/111091','百度百科'),(5,'昆仑山','昆仑山脉西起帕米尔高原，横贯新疆南部，被誉为“万山之祖”。昆仑山平均海拔5500米以上，山势雄伟，是长江、黄河的发源地之一，也是新疆南部的重要地理屏障。','平均5500米','https://baike.baidu.com/item/%E6%98%86%E5%86%88%E5%B1%B1/15376','百度百科');
/*!40000 ALTER TABLE `xinjiang_geo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xinjiang_geo_stats`
--

DROP TABLE IF EXISTS `xinjiang_geo_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `xinjiang_geo_stats` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '数据ID（主键）',
  `name` varchar(100) NOT NULL COMMENT '数据名称',
  `value` varchar(50) NOT NULL COMMENT '数据数值',
  `unit` varchar(50) DEFAULT NULL COMMENT '单位',
  `description` text COMMENT '补充说明',
  `chart_type` varchar(50) DEFAULT NULL COMMENT '图表类型（bar/pie/number）',
  `official_url` varchar(255) NOT NULL COMMENT '数据来源URL（可查）',
  `source` varchar(500) NOT NULL COMMENT '数据来源名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='新疆地理统计数据表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xinjiang_geo_stats`
--

LOCK TABLES `xinjiang_geo_stats` WRITE;
/*!40000 ALTER TABLE `xinjiang_geo_stats` DISABLE KEYS */;
INSERT INTO `xinjiang_geo_stats` VALUES (1,'阿尔泰山','4374','米','阿尔泰山最高峰海拔','bar','https://baike.baidu.com/item/%E9%98%BF%E5%B0%94%E5%BE%81%E5%B1%B1/15375','百度百科'),(2,'天山','7443','米','天山最高峰托木尔峰海拔','bar','https://baike.baidu.com/item/%E5%A4%A9%E5%B1%B1/7883','百度百科'),(3,'昆仑山','5500','米','昆仑山平均海拔','bar','https://baike.baidu.com/item/%E6%98%86%E5%86%88%E5%B1%B1/15376','百度百科'),(4,'塔里木盆地','53万','平方公里','中国最大内陆盆地面积','pie','https://baike.baidu.com/item/%E5%A1%94%E9%87%8C%E6%9C%A8%E5%9C%B0%E5%9D%9D/111091','百度百科'),(5,'准噶尔盆地','38万','平方公里','中国第二大内陆盆地面积','pie','https://baike.baidu.com/item/%E5%87%86%E5%93%80%E5%8F%A4%E5%9C%B0%E5%9D%9D/111092','百度百科'),(6,'新疆总面积','166万','平方公里','中国陆地面积最大的省级行政区','number','https://baike.baidu.com/item/%E6%96%B0%E7%96%86/132262','百度百科'),(7,'天山长度','2500','公里','天山山脉横贯新疆的总长度','number','https://baike.baidu.com/item/%E5%A4%A9%E5%B1%B1/7883','百度百科'),(8,'塔里木盆地面积','53万','平方公里','中国最大内陆盆地','number','https://baike.baidu.com/item/%E5%A1%94%E9%87%8C%E6%9C%A8%E5%9C%B0%E5%9D%9D/111091','百度百科'),(9,'阿尔泰山最高峰','4374','米','友谊峰海拔','number','https://baike.baidu.com/item/%E9%98%BF%E5%B0%94%E5%BE%81%E5%B1%B1/15375','百度百科'),(10,'天山最高峰','7443','米','托木尔峰海拔','number','https://baike.baidu.com/item/%E5%A4%A9%E5%B1%B1/7883','百度百科');
/*!40000 ALTER TABLE `xinjiang_geo_stats` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-16 13:51:19
