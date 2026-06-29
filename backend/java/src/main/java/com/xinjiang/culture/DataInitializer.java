
package com.xinjiang.culture;

import com.xinjiang.culture.entity.Ethnic;
import com.xinjiang.culture.repository.EthnicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private EthnicRepository ethnicRepository;

    @Override
    public void run(String... args) throws Exception {
        if (ethnicRepository.count() == 0) {
            initializeEthnicData();
        }
    }

    private void initializeEthnicData() {
        Ethnic uyghur = new Ethnic();
        uyghur.setName("维吾尔族");
        uyghur.setPopulation("约1162万");
        uyghur.setImageUrl("https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Uygur%20ethnic%20group%20traditional%20culture%20in%20Xinjiang&amp;image_size=portrait_4_3");
        uyghur.setLanguage("维吾尔语，属于阿尔泰语系突厥语族，使用阿拉伯字母拼写的维吾尔文。");
        uyghur.setClothing("维吾尔族传统服饰色彩鲜艳，男子穿袷袢（长袍），女子穿艾德莱斯绸制成的连衣裙，头戴花帽。");
        uyghur.setCrafts("维吾尔族擅长制作艾德莱斯绸、地毯、花帽、木雕等手工艺品。");
        uyghur.setFood("维吾尔族美食有手抓饭、烤羊肉串、馕、烤包子、拉条子等。");
        uyghur.setArchitecture("维吾尔族传统建筑以土木结构为主，有阿以旺、高台民居等特色建筑。");
        uyghur.setCustoms("维吾尔族重视礼仪，热情好客，有古尔邦节、肉孜节等传统节日。");
        uyghur.setDescription("主要分布在南疆地区，是新疆人口最多的少数民族。");
        ethnicRepository.save(uyghur);

        Ethnic kazakh = new Ethnic();
        kazakh.setName("哈萨克族");
        kazakh.setPopulation("约156万");
        kazakh.setImageUrl("https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Kazakh%20ethnic%20group%20traditional%20culture%20in%20Xinjiang&amp;image_size=portrait_4_3");
        kazakh.setLanguage("哈萨克语，属于阿尔泰语系突厥语族。");
        kazakh.setClothing("哈萨克族传统服饰以皮毛制品为主，男子穿袷袢，女子穿连衣裙，头戴尖顶帽。");
        kazakh.setCrafts("哈萨克族擅长刺绣、皮毛加工等手工艺。");
        kazakh.setFood("哈萨克族美食有手抓肉、马肉纳仁、奶茶、奶疙瘩等。");
        kazakh.setArchitecture("哈萨克族传统建筑是毡房（蒙古包），便于游牧迁徙。");
        kazakh.setCustoms("哈萨克族热情好客，有诺鲁孜节、肉孜节等传统节日。");
        kazakh.setDescription("主要分布在北疆地区，以游牧生活为主。");
        ethnicRepository.save(kazakh);

        Ethnic kyrgyz = new Ethnic();
        kyrgyz.setName("柯尔克孜族");
        kyrgyz.setPopulation("约20万");
        kyrgyz.setImageUrl("https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Kyrgyz%20ethnic%20group%20traditional%20culture%20in%20Xinjiang&amp;image_size=portrait_4_3");
        kyrgyz.setLanguage("柯尔克孜语，属于阿尔泰语系突厥语族。");
        kyrgyz.setClothing("柯尔克孜族传统服饰以白色为主，男子戴白毡帽，女子穿连衣裙。");
        kyrgyz.setCrafts("柯尔克孜族擅长织毯、刺绣等手工艺。");
        kyrgyz.setFood("柯尔克孜族美食有手抓肉、奶皮子、奶茶等。");
        kyrgyz.setArchitecture("柯尔克孜族传统建筑是毡房。");
        kyrgyz.setCustoms("柯尔克孜族有诺鲁孜节、麦子节等传统节日，史诗《玛纳斯》是其文化瑰宝。");
        kyrgyz.setDescription("主要分布在克孜勒苏柯尔克孜自治州。");
        ethnicRepository.save(kyrgyz);

        Ethnic mongolian = new Ethnic();
        mongolian.setName("蒙古族");
        mongolian.setPopulation("约17万");
        mongolian.setImageUrl("https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Mongolian%20ethnic%20group%20traditional%20culture%20in%20Xinjiang&amp;image_size=portrait_4_3");
        mongolian.setLanguage("蒙古语，属于阿尔泰语系蒙古语族。");
        mongolian.setClothing("蒙古族传统服饰是蒙古袍，男女都穿长袍，系腰带。");
        mongolian.setCrafts("蒙古族擅长银器制作、皮制品加工等手工艺。");
        mongolian.setFood("蒙古族美食有手抓肉、奶茶、奶皮子、奶豆腐等。");
        mongolian.setArchitecture("蒙古族传统建筑是蒙古包（毡房）。");
        mongolian.setCustoms("蒙古族有那达慕大会、春节等传统节日，擅长赛马、摔跤、射箭。");
        mongolian.setDescription("主要分布在巴音郭楞蒙古自治州和博尔塔拉蒙古自治州。");
        ethnicRepository.save(mongolian);

        System.out.println("民族数据初始化完成！共插入 " + ethnicRepository.count() + " 条记录。");
    }
}

