package com.aditya.model;

import jakarta.persistence.*;

@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cid;

    @Column(length = 10, nullable = false)
    private String uname;

    @Column(length = 10, nullable = false)
    private String fid;

    private Integer quantity;

    public Cart() {}

    public Cart(Integer cid, String uname, String fid, Integer quantity) {
        this.cid = cid;
        this.uname = uname;
        this.fid = fid;
        this.quantity = quantity;
    }

    public Integer getCid() { return cid; }
    public void setCid(Integer cid) { this.cid = cid; }

    public String getUname() { return uname; }
    public void setUname(String uname) { this.uname = uname; }

    public String getFid() { return fid; }
    public void setFid(String fid) { this.fid = fid; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}