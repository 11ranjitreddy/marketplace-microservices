package com.Market.OrderService.Model.Controller;

import com.Market.OrderService.Model.Entity.Order;
import com.Market.OrderService.Model.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody  Order order) {
        Order savedOrder = orderService.createOrder(order);
        return ResponseEntity.ok(savedOrder);
    }

    @GetMapping("/{orderNumber}")
    public ResponseEntity<Order> getOrder(@PathVariable String orderNumber) {
        return orderService.getOrder(orderNumber)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{orderNumber}/status")
    public ResponseEntity<Void> updateStatus(@PathVariable String orderNumber, @RequestParam String status) {
        orderService.updateOrderStatus(orderNumber, status);
        return ResponseEntity.ok().build();
    }
    @GetMapping
    public ResponseEntity<String> defaultCart() {
        return ResponseEntity.ok("Cart Service is up. Use proper endpoints like /user/{userId}");
    }


}

