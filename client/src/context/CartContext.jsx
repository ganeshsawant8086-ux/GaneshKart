import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    cartId: 0,
    totalItems: 0,
    originalTotal: 0,
    discountTotal: 0,
    totalSavings: 0,
    deliveryCharge: 0,
    finalAmount: 0,
    items: [],
  });
  // Start as true so Cart page shows "Loading..." instead of "Empty" on first load
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getCart();
      // Normalize: ensure items is always an array
      setCart({
        ...data,
        items: Array.isArray(data?.items) ? data.items : [],
      });
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    setLoading(true);
    try {
      await api.addToCart(productId, quantity);
      await fetchCart();
      showToast('Item successfully added to cart!');
      return true;
    } catch (err) {
      showToast('Failed to add item: ' + err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    try {
      await api.updateCartQuantity(cartItemId, quantity);
      await fetchCart();
    } catch (err) {
      showToast('Could not update quantity');
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await api.removeFromCart(cartItemId);
      await fetchCart();
      showToast('Item removed from cart');
    } catch (err) {
      showToast('Failed to remove item');
    }
  };

  const clearCart = async () => {
    try {
      await api.clearCart();
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount: cart.totalItems,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart: fetchCart,
        toastMessage,
      }}
    >
      {children}
      {toastMessage && (
        <div className="fixed-toast animate-slide-up">
          <span className="toast-dot"></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
