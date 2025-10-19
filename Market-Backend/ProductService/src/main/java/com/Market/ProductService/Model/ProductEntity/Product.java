package com.Market.ProductService.Model.ProductEntity;


import jakarta.persistence.*;




@Entity
@Table(name="Product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double price;
    private double originalPrice;
    private double rating;
    private String deliveryTime;

    @Column(length = 1000)
    private String image;

    private String category;
    private boolean inStock;
    private String description;

    public Product(){}

    public Product(String name,double price,double originalPrice,double rating,String deliveryTime,String image,String category,boolean inStock,String description){
        this.name=name;
        this.price=price;
        this.originalPrice=originalPrice;
        this.rating=rating;
        this.deliveryTime=deliveryTime;
        this.image=image;
        this.category=category;
        this.inStock=inStock;
        this.description=description;
    }


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public double getOriginalPrice() { return originalPrice; }
    public void setOriginalPrice(double originalPrice) { this.originalPrice = originalPrice; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public String getDeliveryTime() { return deliveryTime; }
    public void setDeliveryTime(String deliveryTime) { this.deliveryTime = deliveryTime; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public boolean isInStock() { return inStock; }
    public void setInStock(boolean inStock) { this.inStock = inStock; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
