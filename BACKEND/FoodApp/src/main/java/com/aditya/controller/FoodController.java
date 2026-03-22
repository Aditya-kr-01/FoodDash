package com.aditya.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aditya.model.Food;
import com.aditya.service.FoodService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/food")
@CrossOrigin(origins = "http://localhost:3000")
public class FoodController {

    @Autowired
    private FoodService fService;

    // CREATE
    @PostMapping
    public ResponseEntity<String> addData(@Valid @RequestBody Food f) {
        fService.addData(f);
        return new ResponseEntity<>("Food added successfully", HttpStatus.CREATED);
    }

    // READ ALL
    @GetMapping
    public ResponseEntity<List<Food>> getData() {
        return ResponseEntity.ok(fService.getData());
    }

    // READ BY ID
    @GetMapping("/{fid}")
    public ResponseEntity<Food> getFidDetails(@PathVariable String fid) {
        Food f = fService.getFidDetails(fid);
        if (f != null) {
            return ResponseEntity.ok(f);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // DELETE
    @DeleteMapping("/{fid}")
    public ResponseEntity<String> deleteData(@PathVariable String fid) {
        fService.deleteData(fid);
        return ResponseEntity.ok("Food deleted successfully");
    }

    // UPDATE
    @PutMapping("/{fid}")
    public ResponseEntity<String> updateData(@PathVariable String fid, @Valid @RequestBody Food f) {
        Food updated = fService.updateData(fid, f);
        if (updated != null) {
            return ResponseEntity.ok("Food updated successfully");
        }
        return new ResponseEntity<>("Food not found", HttpStatus.NOT_FOUND);
    }
}