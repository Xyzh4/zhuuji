
package com.xinjiang.culture.controller;

import com.xinjiang.culture.entity.Ethnic;
import com.xinjiang.culture.service.EthnicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ethnic")
@CrossOrigin(origins = "*")
public class EthnicController {

    @Autowired
    private EthnicService ethnicService;

    @GetMapping("/list")
    public List&lt;EthnicDto&gt; getEthnicList() {
        List&lt;Ethnic&gt; ethnics = ethnicService.getAllEthnics();
        List&lt;EthnicDto&gt; result = new ArrayList&lt;&gt;();
        
        for (Ethnic ethnic : ethnics) {
            result.add(new EthnicDto(
                ethnic.getId(),
                ethnic.getName(),
                ethnic.getPopulation(),
                ethnic.getImageUrl()
            ));
        }
        
        return result;
    }

    @GetMapping("/details/{id}")
    public EthnicDetailDto getEthnicDetails(@PathVariable int id) {
        Optional&lt;Ethnic&gt; ethnicOptional = ethnicService.getEthnicById(id);
        
        if (ethnicOptional.isPresent()) {
            Ethnic ethnic = ethnicOptional.get();
            return new EthnicDetailDto(
                    ethnic.getName(),
                    ethnic.getLanguage(),
                    ethnic.getClothing(),
                    ethnic.getCrafts(),
                    ethnic.getFood(),
                    ethnic.getArchitecture(),
                    ethnic.getCustoms()
            );
        }
        
        return null;
    }

    // 数据传输对象
    public static class EthnicDto {
        private int id;
        private String name;
        private String population;
        private String imageUrl;

        public EthnicDto(int id, String name, String population, String imageUrl) {
            this.id = id;
            this.name = name;
            this.population = population;
            this.imageUrl = imageUrl;
        }

        public int getId() { return id; }
        public void setId(int id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getPopulation() { return population; }
        public void setPopulation(String population) { this.population = population; }
        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    }

    public static class EthnicDetailDto {
        private String name;
        private String language;
        private String clothing;
        private String crafts;
        private String food;
        private String architecture;
        private String customs;

        public EthnicDetailDto(String name, String language, String clothing, String crafts, String food, String architecture, String customs) {
            this.name = name;
            this.language = language;
            this.clothing = clothing;
            this.crafts = crafts;
            this.food = food;
            this.architecture = architecture;
            this.customs = customs;
        }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getLanguage() { return language; }
        public void setLanguage(String language) { this.language = language; }
        public String getClothing() { return clothing; }
        public void setClothing(String clothing) { this.clothing = clothing; }
        public String getCrafts() { return crafts; }
        public void setCrafts(String crafts) { this.crafts = crafts; }
        public String getFood() { return food; }
        public void setFood(String food) { this.food = food; }
        public String getArchitecture() { return architecture; }
        public void setArchitecture(String architecture) { this.architecture = architecture; }
        public String getCustoms() { return customs; }
        public void setCustoms(String customs) { this.customs = customs; }
    }
}

