package com.aditya.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.aditya.service.OrderMainService;

import java.util.List;
import com.aditya.model.OrderMain;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = {"http://localhost:3000", "https://food-dash-eosin.vercel.app"})
public class OrderMainController {

    @Autowired
    private OrderMainService oservice;

    @PostMapping("/place/{uname}")
    public org.springframework.http.ResponseEntity<String> placeOrder(@PathVariable String uname) {
        try {
            String result = oservice.placeOrder(uname);
            return org.springframework.http.ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            String detailedError = "Error placing order: " + e.getMessage() + 
                                   (e.getCause() != null ? " | Cause: " + e.getCause().getMessage() : "");
            return org.springframework.http.ResponseEntity.status(org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(detailedError);
        }
    }
    @GetMapping("/bill/{oid}")
    public String getBill(@PathVariable Integer oid) {
        return oservice.generateBill(oid);
    }

    // 📋 Get all orders for a user
    @GetMapping("/user/{uname}")
    public List<OrderMain> getOrdersByUser(@PathVariable String uname) {
        return oservice.getOrdersByUser(uname);
    }

    // 🌐 Get all orders in the system (for Admin)
    @GetMapping("/all")
    public List<OrderMain> getAllOrders() {
        return oservice.getAllOrders();
    }

    // ⚙️ Update status of an order (for Admin)
    @PutMapping("/status/{oid}/{status}")
    public OrderMain updateOrderStatus(@PathVariable Integer oid, @PathVariable String status) {
        return oservice.updateOrderStatus(oid, status);
    }
}