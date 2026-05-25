package com.aditya.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aditya.model.OrderMain;

@Repository
public interface OrderMainRepository extends JpaRepository<OrderMain, Integer> {
    List<OrderMain> findByUname(String uname);
}