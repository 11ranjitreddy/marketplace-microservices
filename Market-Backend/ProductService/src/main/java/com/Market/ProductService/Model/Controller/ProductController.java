package com.Market.ProductService.Model.Controller;


import com.Market.ProductService.Model.ProductEntity.Product;
import com.Market.ProductService.Model.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {

    @Autowired
    private ProductRepository repository;

    @GetMapping
    public List<Product> getAllProducts(){
        return repository.findAll();
    }

    @PostMapping
    public Product addProduct(@RequestBody Product product){
        return repository.save(product);
    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id,@RequestBody Product updatedProduct){
        Product product = repository.findById(id).orElseThrow();
        product.setName(updatedProduct.getName());
        product.setPrice(updatedProduct.getPrice());
        product.setOriginalPrice(updatedProduct.getOriginalPrice());
        product.setRating(updatedProduct.getRating());
        product.setDeliveryTime(updatedProduct.getDeliveryTime());
        product.setImage(updatedProduct.getImage());
        product.setCategory(updatedProduct.getCategory());
        product.setInStock(updatedProduct.isInStock());
        product.setDescription(updatedProduct.getDescription());
        return repository.save(product);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id){
        repository.deleteById(id);
    }
}
