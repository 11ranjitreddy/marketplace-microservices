package com.Market.ProductService.Model.Repository;

import com.Market.ProductService.Model.ProductEntity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {
}
