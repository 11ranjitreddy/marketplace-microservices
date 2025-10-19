package com.Market.cartService.Model;


import jakarta.persistence.*;

import lombok.Data;


@Entity
@Data

@Table(name="Cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private Long userId;
    private Long productId;
    private String productName;
    private int quantity;
    private double price;


    public Cart(){}

    public Cart(Long Id,Long userId,Long productId,int quantity,double price,String productName){
        this.Id=Id;
        this.userId=userId;
        this.productId=productId;
        this.productName=productName;
        this.price=price;
        this.quantity=quantity;
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        this.Id = id;
    }


    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }


    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }
    public int getQuantity(){return quantity;}

    public void setQuantity(int quantity){this.quantity=quantity;}

//name

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
    public String getProductName(){return productName;}
    public void setProductName(String productName){this.productName=productName;}
}



