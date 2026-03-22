package com.aditya.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aditya.model.Register;
import com.aditya.repository.RegisterRepository;

@Service
public class RegisterService {

    @Autowired
    private RegisterRepository rrepo;

    public void addData(Register r) {

        // 🔥 DEFAULT ROLE
        if (r.getRole() == null || r.getRole().isEmpty()) {
            r.setRole("USER");
        }

        rrepo.save(r);
    }

    public Register checkLogin(String uname, String pass) {
        return rrepo.checkLogin(uname, pass);
    }
}