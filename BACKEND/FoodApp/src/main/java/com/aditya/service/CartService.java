package com.aditya.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aditya.model.Cart;
import com.aditya.repository.CartRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository crepo;

    // ➕ Add to cart
    public Cart addToCart(Cart c) {
        return crepo.save(c);
    }

    // 📋 Get user cart
    public List<Cart> getCartByUser(String uname) {
        return crepo.findByUname(uname);
    }

    // ❌ Remove item
    public void removeItem(String uname, String fid) {
        crepo.deleteByUnameAndFid(uname, fid);
    }

    // 🧹 Clear cart
    public void clearCart(String uname) {
        List<Cart> items = crepo.findByUname(uname);
        crepo.deleteAll(items);
    }
}