package com.aditya.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.aditya.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
	@Query(nativeQuery = true,
			value="SELECT O.OID,O.ODT,F.FID,F.FNAME,O.QTY,F.PRICE,F.PRICE*O.QTY TOTALPRICE,O.UNAME FROM FOOD F,ORDER_DTLS O WHERE F.FID=O.FID AND O.UNAME=:uname")
public List getBill(String uname);
}