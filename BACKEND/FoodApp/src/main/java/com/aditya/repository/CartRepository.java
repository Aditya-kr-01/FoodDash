package com.aditya.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aditya.model.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {

    List<Cart> findByUname(String uname);

    void deleteByUnameAndFid(String uname, String fid);
}