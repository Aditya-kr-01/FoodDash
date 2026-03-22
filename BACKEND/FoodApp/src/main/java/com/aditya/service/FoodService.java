package com.aditya.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aditya.model.Food;
import com.aditya.repository.FoodRepository;

@Service
public class FoodService {

    @Autowired
    private FoodRepository frepo;

    // CREATE
    public void addData(Food f) {
        frepo.save(f);
    }

    // READ ALL
    public List<Food> getData() {
        return frepo.findAll();
    }

    // READ BY ID
    public Food getFidDetails(String fid) {
        return frepo.findById(fid).orElse(null);
    }

    // DELETE (SAFE)
    public void deleteData(String fid) {
        Food f = frepo.findById(fid).orElse(null);

        if (f != null) {
            frepo.delete(f);
        } else {
            throw new RuntimeException("Food not found with id: " + fid);
        }
    }

    // UPDATE
    public Food updateData(String fid, Food fs) {
        Food f = frepo.findById(fid).orElse(null);

        if (f != null) {
            f.setFname(fs.getFname());
            f.setPrice(fs.getPrice());
            return frepo.save(f);
        }

        return null;
    }
}