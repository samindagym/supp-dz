"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: string; // Using ID now for dynamic routes
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: { id: string; name: string; price: string; image: string }) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('supp_dz_cart_v2');
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error("Cart Load Error:", e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('supp_dz_cart_v2', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: { id: string; name: string; price: string; image: string }) => {
    setCart(curr => {
      const existing = curr.find(item => item.id === product.id);
      if (existing) {
        return curr.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...curr, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(curr =>
      curr
        .map(item => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item))
        .filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCart(curr => curr.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      updateQuantity,
      removeItem,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
