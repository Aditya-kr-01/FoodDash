package com.aditya.model;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;

@Entity
public class OrderMain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer oid;

    @Column(length = 10)
    private String uname;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date orderDate;

    @Column(length = 20)
    private String status;

    public OrderMain() {}

    public OrderMain(Integer oid, String uname, Date orderDate, String status) {
        this.oid = oid;
        this.uname = uname;
        this.orderDate = orderDate;
        this.status = status;
    }

    public Integer getOid() { return oid; }
    public void setOid(Integer oid) { this.oid = oid; }

    public String getUname() { return uname; }
    public void setUname(String uname) { this.uname = uname; }

    public Date getOrderDate() { return orderDate; }
    public void setOrderDate(Date orderDate) { this.orderDate = orderDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}