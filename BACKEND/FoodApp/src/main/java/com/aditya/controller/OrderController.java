package com.aditya.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aditya.model.Order;
import com.aditya.service.OrderService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "http://localhost:3000/")
public class OrderController {
	@Autowired
	private OrderService oservice;
	@PostMapping("/add")
	public ResponseEntity<String> addData(@Valid @RequestBody Order o)
	{
		String msg = "ORDER ADDED SUCCESSFULLY";
		oservice.addData(o);
		return new ResponseEntity<String>(msg, HttpStatus.CREATED);
	}
	@GetMapping("/bill/{uname}")
	public ResponseEntity<List> getBill(@PathVariable String uname) {
		List blist=oservice.getBill(uname);
		return new ResponseEntity<List>(blist,HttpStatus.OK);
	}

}