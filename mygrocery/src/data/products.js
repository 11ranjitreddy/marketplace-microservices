// src/data/products.js

import { useState, useEffect } from "react";

// Categories (static)
export const categories = [
  "All",
  "Vegetables",
  "Fruits",
  "Dairy",
  "Meat",
  "Seafood",
  "Grains",
  "Bakery"
];

/**
 * Custom hook to fetch products from admin backend
 */
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8092/api/products") // Admin backend URL
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}

// Create a named object and export it as default
const productData = { categories, useProducts };
export default productData;
