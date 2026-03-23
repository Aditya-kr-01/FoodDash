package com.aditya.model;

import jakarta.persistence.*;

@Entity
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // 🔗 Link to OrderMain
    private Integer oid;

    @Column(length = 10)
    private String fid;

    private Integer quantity;

    private Double price;

    public OrderItem() {}

    public OrderItem(Integer id, Integer oid, String fid, Integer quantity, Double price) {
        this.id = id;
        this.oid = oid;
        this.fid = fid;
        this.quantity = quantity;
        this.price = price;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Integer getOid() { return oid; }
    public void setOid(Integer oid) { this.oid = oid; }

    public String getFid() { return fid; }
    public void setFid(String fid) { this.fid = fid; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
}