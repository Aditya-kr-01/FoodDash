package com.aditya.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Food {

    @Id
    @Column(length = 10)
    private String fid;

    @Column(length = 25)
    @NotBlank(message = "FNAME MUST BE GIVEN")
    private String fname;

    @Max(value = 5000, message = "PRICE MORE THAN 5000 NOT ACCEPTABLE")
    private Double price;

    // 🔥 NEW FIELDS
    @Column(length = 20)
    private String category;

    @Column(length = 100)
    private String description;

    @Column(length = 255)
    private String imageUrl;

    public Food() {}

    public Food(String fid, String fname, Double price, String category, String description, String imageUrl) {
        this.fid = fid;
        this.fname = fname;
        this.price = price;
        this.category = category;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    public String getFid() { return fid; }
    public void setFid(String fid) { this.fid = fid; }

    public String getFname() { return fname; }
    public void setFname(String fname) { this.fname = fname; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    @Override
    public String toString() {
        return "Food [fid=" + fid + ", fname=" + fname + ", category=" + category + "]";
    }
}