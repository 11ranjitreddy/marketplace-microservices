package com.Market.OrderService.Model.Service;

import com.Market.OrderService.Model.Entity.Order;
import com.Market.OrderService.Model.Repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    public Order createOrder(Order order){
        order.setOrderNumber("ORD-"+System.currentTimeMillis());
        order.setStatus("PENDING_PAYMENT");
        return orderRepository.save(order);
    }

    public Optional<Order> getOrder(String orderNumber){
        return orderRepository.findByOrderNumber(orderNumber);
    }


    public void updateOrderStatus(String orderNumber,String status){
        orderRepository.findByOrderNumber(orderNumber).ifPresent(order ->{
            order.setStatus(status);
            orderRepository.save(order);
        });
    }

}
