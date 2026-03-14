package com.aditya.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aditya.model.Order;
import com.aditya.repository.OrderRepository;

@Service
public class OrderService {
	@Autowired
	private OrderRepository orepo;
	public void addData(Order o) {
		orepo.save(o);
	}
	public List getBill(String uname) {
		return orepo.getBill(uname);
	}

}