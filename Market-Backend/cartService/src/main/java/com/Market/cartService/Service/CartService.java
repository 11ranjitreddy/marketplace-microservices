package com.Market.cartService.Service;

import com.Market.cartService.Model.Cart;
import com.Market.cartService.Repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService implements ServiceMethod {

    @Autowired
    private final CartRepository cartRepository;

    public CartService (CartRepository cartRepository){
        this.cartRepository=cartRepository;
    }

    @Override
    public Cart addToCart(Long userId,Long productId,int quantity,double price,String productName){
       List<Cart> userCart=cartRepository.findByUserId(userId);
       for (Cart item:userCart){
           if(item.getProductId().equals(productId)){
               item.setQuantity(item.getQuantity() + quantity);
               return cartRepository.save(item);
           }
       }

        Cart newitem=new Cart();
        newitem.setUserId(userId);
        newitem.setProductId(productId);
        newitem.setQuantity(quantity);
        newitem.setPrice(price);
        //name
        newitem.setProductName(productName);
        return cartRepository.save(newitem);
    }
    @Override
    public List<Cart> getCartItems(Long userId){
        return cartRepository.findByUserId(userId);
    }
    @Override
    public void removeItem(Long itemId){
        cartRepository.deleteById(itemId);
    }
    @Override
    public void clearCart(Long userId){
        List<Cart> userCart=cartRepository.findByUserId(userId);
        cartRepository.deleteAll(userCart);
    }

}
