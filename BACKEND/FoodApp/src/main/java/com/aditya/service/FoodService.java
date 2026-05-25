package com.aditya.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aditya.exception.ResourceNotFoundException;
import com.aditya.model.Food;
import com.aditya.repository.FoodRepository;

@Service
public class FoodService {

    @Autowired
    private FoodRepository frepo;

    public void addData(Food f) {
        if (f.getFid() == null || f.getFid().trim().isEmpty()) {
            List<Food> all = frepo.findAll();
            int maxId = 100; // Start sequentially at 101
            for (Food item : all) {
                if (item.getFid() != null) {
                    try {
                        int idVal = Integer.parseInt(item.getFid().replaceAll("\\D", ""));
                        if (idVal > maxId) {
                            maxId = idVal;
                        }
                    } catch (Exception e) {
                        // Ignore non-numeric IDs
                    }
                }
            }
            f.setFid(String.valueOf(maxId + 1));
        }
        frepo.save(f);
    }

    public List<Food> getData() {
        return frepo.findAll();
    }

    public Food getFidDetails(String fid) {
        return frepo.findById(fid)
                .orElseThrow(() -> new ResourceNotFoundException("Food not found with id: " + fid));
    }

    public void deleteData(String fid) {
        Food f = frepo.findById(fid)
                .orElseThrow(() -> new ResourceNotFoundException("Food not found with id: " + fid));

        frepo.delete(f);
    }

    public Food updateData(String fid, Food fs) {
        Food f = frepo.findById(fid)
                .orElseThrow(() -> new ResourceNotFoundException("Food not found with id: " + fid));

        f.setFname(fs.getFname());
        f.setPrice(fs.getPrice());
        f.setCategory(fs.getCategory());
        f.setDescription(fs.getDescription());
        f.setImageUrl(fs.getImageUrl());

        return frepo.save(f);
    }
}