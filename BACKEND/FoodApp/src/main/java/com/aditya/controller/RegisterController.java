package com.aditya.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aditya.model.Register;
import com.aditya.service.RegisterService;

@RestController
@RequestMapping("/register")
@CrossOrigin(origins = "http://localhost:3000/")
public class RegisterController {

    @Autowired
    private RegisterService rservice;

    @GetMapping("/login/{uname}/{pass}")
    public ResponseEntity<String> checkLogin(@PathVariable String uname,
                                             @PathVariable String pass) {

        Register r = rservice.checkLogin(uname, pass);

        if (r != null) {
            return ResponseEntity.ok("LOGIN SUCCESSFULL");
        } else {
            return ResponseEntity.ok("LOGIN FAILED");
        }
    }
}