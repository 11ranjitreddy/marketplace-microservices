package com.Market.cartService.Controller;

import com.Market.cartService.Model.Cart;
import com.Market.cartService.Service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    private final CartService cartService;


    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(@RequestBody Cart request) {
        return ResponseEntity.ok(
                cartService.addToCart(request.getUserId(), request.getProductId(), request.getQuantity(), request.getPrice(), request.getProductName())
        );
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Cart>> getCartItems(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartItems(userId));
    }

    @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<Void> removeItem(@PathVariable Long itemId){
        cartService.removeItem(itemId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<Void> clearCart(@PathVariable Long userId){
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
    @GetMapping
    public ResponseEntity<String> defaultCart() {
        return ResponseEntity.ok("Cart Service is up. Use proper endpoints like /user/{userId}");
    }

}
