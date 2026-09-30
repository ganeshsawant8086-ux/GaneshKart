import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import MainLayout from './layouts/MainLayout';
import './index.css';

export default function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <MainLayout />
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}
