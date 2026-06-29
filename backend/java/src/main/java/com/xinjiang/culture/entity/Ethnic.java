
package com.xinjiang.culture.entity;

import javax.persistence.*;

@Entity
@Table(name = "ethnics")
public class Ethnic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 50)
    private String name;

    @Column(length = 50)
    private String population;

    @Column(length = 500)
    private String imageUrl;

    @Column(length = 100)
    private String language;

    @Column(length = 500)
    private String clothing;

    @Column(length = 500)
    private String crafts;

    @Column(length = 500)
    private String food;

    @Column(length = 500)
    private String architecture;

    @Column(length = 1000)
    private String customs;

    @Column(length = 1000)
    private String description;

    public Ethnic() {
    }

    public Ethnic(String name, String population, String imageUrl) {
        this.name = name;
        this.population = population;
        this.imageUrl = imageUrl;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPopulation() {
        return population;
    }

    public void setPopulation(String population) {
        this.population = population;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getClothing() {
        return clothing;
    }

    public void setClothing(String clothing) {
        this.clothing = clothing;
    }

    public String getCrafts() {
        return crafts;
    }

    public void setCrafts(String crafts) {
        this.crafts = crafts;
    }

    public String getFood() {
        return food;
    }

    public void setFood(String food) {
        this.food = food;
    }

    public String getArchitecture() {
        return architecture;
    }

    public void setArchitecture(String architecture) {
        this.architecture = architecture;
    }

    public String getCustoms() {
        return customs;
    }

    public void setCustoms(String customs) {
        this.customs = customs;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

