import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export const CartProvider = ({ children, userId }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const API_URL = 'http://localhost:8093/api/cart'; 

  const addToCart = async (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });

    // Backend API call
    try {
      await axios.post(`${API_URL}/add`, {
        userId: userId,
        productId: product.id,
        productName:product.name,
        quantity,
        price: product.price
      });
    } catch (error) {
      console.error('Error adding to backend cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));

    // Backend API call
    try {
      await axios.delete(`${API_URL}/remove/${productId}`);
    } catch (error) {
      console.error('Error removing from backend cart:', error);
    }
  };

  const clearCart = async () => {
    setCart([]);

    // Backend API call
    try {
      await axios.delete(`${API_URL}/clear/${userId}`);
    } catch (error) {
      console.error('Error clearing backend cart:', error);
    }
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getCartTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const getCartCount = () => cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
