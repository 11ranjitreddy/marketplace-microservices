package com.Market.OrderService.Model.Entity;
import jakarta.persistence.*;





@Entity
@Table(name = "order_item")

public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

   private String productName;

   private double price;

    private int quantity;


    public OrderItem(){}

    public OrderItem(Long id,String productName,double price,int quantity){
        this.id=id;
        this.productName=productName;
        this.price=price;
        this.quantity=quantity;
    }

    public Long getId(){return id;}
    public void setId(Long id){this.id=id;}

    public String getProductName(){return productName;}
    public void setProductName(String productName){this.productName=productName;}

    public double getPrice(){return price;}
    public void setPrice(double price){this.price=price;}

    public int getQuantity(){return quantity;}
    public void setQuantity(int quantity){this.quantity=quantity;}


}
