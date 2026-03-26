package com.aditya.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.aditya.model.Register;

@Repository
public interface RegisterRepository extends JpaRepository<Register, String>{

    @Query("SELECT r FROM Register r WHERE r.uname = :uname AND r.pass = :pass")
    public Register checkLogin(@Param("uname") String uname,
                               @Param("pass") String pass);
}