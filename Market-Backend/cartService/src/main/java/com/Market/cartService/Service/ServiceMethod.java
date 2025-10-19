package com.Market.cartService.Service;

import com.Market.cartService.Model.Cart;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ServiceMethod {
    Cart addToCart(Long userId, Long productId,int quantity,double price,String productName);
    List<Cart> getCartItems(Long userId);
    void removeItem(Long itemId);
    void clearCart(Long userId);
}
