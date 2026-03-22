package com.aditya.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aditya.model.Register;
import com.aditya.service.RegisterService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class RegisterController {

    @Autowired
    private RegisterService rservice;

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<String> addData(@Valid @RequestBody Register r) {
        rservice.addData(r);
        return new ResponseEntity<>("Registration successful", HttpStatus.CREATED);
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<String> checkLogin(@RequestBody Register r) {

        Register user = rservice.checkLogin(r.getUname(), r.getPass());

        if (user != null) {
            return ResponseEntity.ok("Login successful");
        } else {
            return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
        }
    }
}