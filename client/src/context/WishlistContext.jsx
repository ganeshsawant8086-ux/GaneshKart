import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistIds, setWishlistIds] = useState(new Set());

  const fetchWishlist = useCallback(async () => {
    try {
      const data = await api.getWishlist();
      setWishlist(data);
      setWishlistIds(new Set(data.map((item) => item.productId)));
    } catch (err) {
      console.error('Failed to fetch wishlist:', err);
    }
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const toggleWishlist = async (productId) => {
    try {
      if (wishlistIds.has(productId)) {
        await api.removeFromWishlist(productId);
      } else {
        await api.addToWishlist(productId);
      }
      await fetchWishlist();
    } catch (err) {
      console.error('Error toggling wishlist:', err);
    }
  };

  const isInWishlist = (productId) => wishlistIds.has(productId);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        isInWishlist,
        toggleWishlist,
        refreshWishlist: fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
