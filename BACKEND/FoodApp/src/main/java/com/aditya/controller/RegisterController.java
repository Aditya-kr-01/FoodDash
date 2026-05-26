package com.aditya.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aditya.model.Register;
import com.aditya.service.RegisterService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/register")
@CrossOrigin(origins = {"http://localhost:3000", "https://food-dash-eosin.vercel.app"})
public class RegisterController {

    @Autowired
    private RegisterService rservice;

    @GetMapping("/login/{uname}/{pass}")
    public ResponseEntity<String> checkLogin(@PathVariable String uname,
                                             @PathVariable String pass) {

        Register r = rservice.checkLogin(uname, pass);

        if (r != null) {
            String role = r.getRole();
            if (role == null || role.trim().isEmpty()) {
                role = "USER";
            }
            return ResponseEntity.ok(role.trim().toUpperCase());
        } else {
            return ResponseEntity.ok("LOGIN FAILED");
        }
    }
 // ✅ REGISTER USER (ADD THIS ONLY)
    @PostMapping("/add")
    public ResponseEntity<String> addUser(@Valid @RequestBody Register user) {

        rservice.addData(user);   // ✅ using your existing method

        return ResponseEntity.ok("USER REGISTERED SUCCESSFULLY");
    }
}