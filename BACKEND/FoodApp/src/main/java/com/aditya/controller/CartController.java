package com.aditya.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.aditya.model.Cart;
import com.aditya.service.CartService;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:3000/")
public class CartController {

    @Autowired
    private CartService cservice;

    // ➕ Add item
    @PostMapping("/add")
    public Cart addToCart(@RequestBody Cart c) {
        return cservice.addToCart(c);
    }

    // 📋 Get cart
    @GetMapping("/{uname}")
    public List<Cart> getCart(@PathVariable String uname) {
        return cservice.getCartByUser(uname);
    }

    // ❌ Remove item
    @DeleteMapping("/remove/{uname}/{fid}")
    public String removeItem(@PathVariable String uname, @PathVariable String fid) {
        cservice.removeItem(uname, fid);
        return "Item removed";
    }

    // 🧹 Clear cart
    @DeleteMapping("/clear/{uname}")
    public String clearCart(@PathVariable String uname) {
        cservice.clearCart(uname);
        return "Cart cleared";
    }
}