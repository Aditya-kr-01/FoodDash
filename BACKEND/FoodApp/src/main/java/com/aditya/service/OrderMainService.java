package com.aditya.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aditya.exception.ResourceNotFoundException;
import com.aditya.model.Cart;
import com.aditya.model.OrderItem;
import com.aditya.model.OrderMain;
import com.aditya.repository.CartRepository;
import com.aditya.repository.FoodRepository;
import com.aditya.repository.OrderItemRepository;
import com.aditya.repository.OrderMainRepository;

@Service
@Transactional
public class OrderMainService {

    @Autowired
    private OrderMainRepository orepo;

    @Autowired
    private OrderItemRepository oirepo;

    @Autowired
    private CartRepository crepo;

    @Autowired
    private FoodRepository frepo;

    public String placeOrder(String uname) {

        // 1️⃣ Create order
        OrderMain order = new OrderMain();
        order.setUname(uname);
        order.setStatus("PLACED");

        OrderMain savedOrder = orepo.save(order);

        // 2️⃣ Get cart items
        List<Cart> cartItems = crepo.findByUname(uname);

        // 3️⃣ Convert to OrderItem
        for (Cart c : cartItems) {

            OrderItem item = new OrderItem();
            item.setOid(savedOrder.getOid());
            item.setFid(c.getFid());
            item.setQuantity(c.getQuantity());

            // fetch price from food table
            Double price = frepo.findById(c.getFid())
                    .orElseThrow(() -> new ResourceNotFoundException("Food not found with id: " + c.getFid()))
                    .getPrice();
            item.setPrice(price);

            oirepo.save(item);
        }

        // 4️⃣ Clear cart
        crepo.deleteAll(cartItems);

        return "Order Placed Successfully!";
    }
 // 💳 Generate Bill
    public String generateBill(Integer oid) {

        List<OrderItem> items = oirepo.findByOid(oid);

        double total = 0;

        for (OrderItem item : items) {
            total += item.getPrice() * item.getQuantity();
        }

        double gst = total * 0.05; // 5% GST
        double finalAmount = total + gst;

        return "Total: " + total +
               "\nGST (5%): " + gst +
               "\nFinal Amount: " + finalAmount;
    }

    // 📋 Get all orders for a customer
    public List<OrderMain> getOrdersByUser(String uname) {
        return orepo.findByUname(uname);
    }

    // 🌐 Get all orders in the system (for Admin)
    public List<OrderMain> getAllOrders() {
        return orepo.findAll();
    }

    // ⚙️ Update status of an order (for Admin)
    public OrderMain updateOrderStatus(Integer oid, String status) {
        OrderMain order = orepo.findById(oid)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + oid));
        order.setStatus(status);
        return orepo.save(order);
    }
}