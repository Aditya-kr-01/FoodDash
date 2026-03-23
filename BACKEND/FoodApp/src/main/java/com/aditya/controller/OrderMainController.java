package com.aditya.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.aditya.service.OrderMainService;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "http://localhost:3000/")
public class OrderMainController {

    @Autowired
    private OrderMainService oservice;

    @PostMapping("/place/{uname}")
    public String placeOrder(@PathVariable String uname) {
        return oservice.placeOrder(uname);
    }
}