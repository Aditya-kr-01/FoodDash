package com.aditya.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aditya.model.Food;
@Repository
public interface FoodRepository extends JpaRepository<Food, String>{

}