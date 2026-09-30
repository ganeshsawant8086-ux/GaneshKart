/**
 * GaneshKart Unified API Service
 * Automatically connects to backend Web API when available,
 * and seamlessly provides full client-side simulated store data
 * in production (e.g. Vercel) when the backend is unreachable.
 */

import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../data/mockProducts';

// Read API Base URL from Vite environment variable (or default to local ASP.NET Core port)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5056/api';

// Local storage helpers for stateful fallback experience
function getStorage(key, defaultVal) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function setStorage(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.warn('localStorage set failed:', e);
  }
}


function calculateCartTotals(items) {
  let originalTotal = 0;
  let finalAmount = 0;
  let totalItems = 0;

  items.forEach((item) => {
    const prod = item.product || MOCK_PRODUCTS.find((p) => p.id === item.productId);
    if (prod) {
      originalTotal += prod.price * item.quantity;
      finalAmount += prod.discountPrice * item.quantity;
      totalItems += item.quantity;
    }
  });

  const totalSavings = originalTotal - finalAmount;
  const deliveryCharge = finalAmount >= 500 || finalAmount === 0 ? 0 : 40;

  return {
    cartId: 1,
    totalItems,
    originalTotal,
    discountTotal: totalSavings,
    totalSavings,
    deliveryCharge,
    finalAmount: finalAmount + deliveryCharge,
    items,
  };
}

async function request(endpoint, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2500); // 2.5s quick failover

  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    signal: controller.signal,
    ...options,
  };

  try {
    const res = await fetch(url, config);
    clearTimeout(timeoutId);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

export const api = {
  // PRODUCTS
  getProducts: async (params = {}) => {
    try {
      const query = new URLSearchParams();
      if (params.search) query.append('search', params.search);
      if (params.category && params.category !== 'All') query.append('category', params.category);
      if (params.minPrice) query.append('minPrice', params.minPrice);
      if (params.maxPrice) query.append('maxPrice', params.maxPrice);
      if (params.sortBy) query.append('sortBy', params.sortBy);

      const queryString = query.toString() ? `?${query.toString()}` : '';
      return await request(`/products${queryString}`);
    } catch {
      // Offline / Vercel fallback
      let list = [...MOCK_PRODUCTS];

      if (params.category && params.category !== 'All') {
        list = list.filter((p) => p.category.toLowerCase() === params.category.toLowerCase());
      }

      if (params.search && params.search.trim()) {
        const q = params.search.toLowerCase().trim();
        list = list.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        );
      }

      if (params.minPrice) {
        list = list.filter((p) => p.discountPrice >= Number(params.minPrice));
      }

      if (params.maxPrice) {
        list = list.filter((p) => p.discountPrice <= Number(params.maxPrice));
      }

      if (params.sortBy) {
        if (params.sortBy === 'priceAsc') {
          list.sort((a, b) => a.discountPrice - b.discountPrice);
        } else if (params.sortBy === 'priceDesc') {
          list.sort((a, b) => b.discountPrice - a.discountPrice);
        } else if (params.sortBy === 'rating') {
          list.sort((a, b) => b.rating - a.rating);
        } else if (params.sortBy === 'newest') {
          list.sort((a, b) => b.id - a.id);
        }
      }

      return list;
    }
  },

  getProductById: async (id) => {
    try {
      return await request(`/products/${id}`);
    } catch {
      const found = MOCK_PRODUCTS.find((p) => p.id === Number(id));
      return found || MOCK_PRODUCTS[0];
    }
  },

  getFeaturedProducts: async () => {
    try {
      return await request('/products/featured');
    } catch {
      return MOCK_PRODUCTS.filter((p) => p.rating >= 4.7);
    }
  },

  getProductsByCategory: async (category) => {
    try {
      return await request(`/products/category/${encodeURIComponent(category)}`);
    } catch {
      return MOCK_PRODUCTS.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }
  },

  // CATEGORIES
  getCategories: async () => {
    try {
      return await request('/categories');
    } catch {
      return MOCK_CATEGORIES.map((cat) => ({
        ...cat,
        productCount: MOCK_PRODUCTS.filter((p) => p.category.toLowerCase() === cat.name.toLowerCase()).length,
      }));
    }
  },

  // CART (Stored in localStorage when backend is offline)
  getCart: async () => {
    try {
      return await request('/cart');
    } catch {
      const items = getStorage('gk_cart_items', []);
      return calculateCartTotals(items);
    }
  },

  addToCart: async (productId, quantity = 1) => {
    try {
      return await request('/cart', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity }),
      });
    } catch {
      let items = getStorage('gk_cart_items', []);
      const existingIndex = items.findIndex((i) => i.productId === Number(productId));
      const product = MOCK_PRODUCTS.find((p) => p.id === Number(productId));

      if (existingIndex > -1) {
        items[existingIndex].quantity += quantity;
      } else if (product) {
        items.push({
          id: Date.now(),
          productId: Number(productId),
          quantity,
          product,
        });
      }
      setStorage('gk_cart_items', items);
      return calculateCartTotals(items);
    }
  },

  updateCartQuantity: async (cartItemId, quantity) => {
    try {
      return await request(`/cart/${cartItemId}`, {
        method: 'PUT',
        body: JSON.stringify({ quantity }),
      });
    } catch {
      let items = getStorage('gk_cart_items', []);
      items = items
        .map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0);
      setStorage('gk_cart_items', items);
      return calculateCartTotals(items);
    }
  },

  removeFromCart: async (cartItemId) => {
    try {
      return await request(`/cart/${cartItemId}`, {
        method: 'DELETE',
      });
    } catch {
      let items = getStorage('gk_cart_items', []);
      items = items.filter((item) => item.id !== cartItemId);
      setStorage('gk_cart_items', items);
      return calculateCartTotals(items);
    }
  },

  clearCart: async () => {
    try {
      return await request('/cart/clear', {
        method: 'DELETE',
      });
    } catch {
      setStorage('gk_cart_items', []);
      return calculateCartTotals([]);
    }
  },

  // ORDERS & CHECKOUT
  getOrders: async () => {
    try {
      return await request('/orders');
    } catch {
      return getStorage('gk_orders', []);
    }
  },

  getOrderById: async (id) => {
    try {
      return await request(`/orders/${id}`);
    } catch {
      const orders = getStorage('gk_orders', []);
      return orders.find((o) => o.id === Number(id)) || orders[0];
    }
  },

  createOrder: async (orderData) => {
    try {
      return await request('/orders', {
        method: 'POST',
        body: JSON.stringify(orderData),
      });
    } catch {
      const orders = getStorage('gk_orders', []);
      const newOrder = {
        id: Date.now(),
        orderNumber: `GK-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        orderDate: new Date().toISOString(),
        status: 'Confirmed',
        totalAmount: orderData.totalAmount || 0,
        paymentStatus: 'Paid',
        paymentMethod: orderData.paymentMethod || 'UPI',
        deliveryAddress: orderData.deliveryAddress || 'No address provided',
        items: orderData.items || [],
      };
      orders.unshift(newOrder);
      setStorage('gk_orders', orders);
      setStorage('gk_cart_items', []); // empty cart upon successful order
      return newOrder;
    }
  },

  updateOrderStatus: async (orderId, status) => {
    try {
      return await request(`/orders/${orderId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });
    } catch {
      let orders = getStorage('gk_orders', []);
      orders = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
      setStorage('gk_orders', orders);
      return { success: true };
    }
  },

  // PAYMENTS
  processDummyPayment: async (paymentData) => {
    try {
      return await request('/payments/dummy', {
        method: 'POST',
        body: JSON.stringify(paymentData),
      });
    } catch {
      return {
        success: true,
        transactionId: `TXN_GK_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        amount: paymentData.amount || 0,
        paymentMethod: paymentData.paymentMethod || 'UPI',
        message: 'Payment simulated successfully via GaneshKart Secure Gateway',
        timestamp: new Date().toISOString(),
      };
    }
  },

  // WISHLIST (Stored in localStorage when backend is offline)
  getWishlist: async () => {
    try {
      return await request('/wishlist');
    } catch {
      return getStorage('gk_wishlist', [
        { id: 1, productId: 2, product: MOCK_PRODUCTS.find((p) => p.id === 2) },
        { id: 2, productId: 5, product: MOCK_PRODUCTS.find((p) => p.id === 5) },
      ]);
    }
  },

  addToWishlist: async (productId) => {
    try {
      return await request('/wishlist', {
        method: 'POST',
        body: JSON.stringify({ productId }),
      });
    } catch {
      let list = getStorage('gk_wishlist', []);
      if (!list.some((item) => item.productId === Number(productId))) {
        const prod = MOCK_PRODUCTS.find((p) => p.id === Number(productId));
        if (prod) {
          list.push({ id: Date.now(), productId: Number(productId), product: prod });
          setStorage('gk_wishlist', list);
        }
      }
      return list;
    }
  },

  removeFromWishlist: async (productId) => {
    try {
      return await request(`/wishlist/${productId}`, {
        method: 'DELETE',
      });
    } catch {
      let list = getStorage('gk_wishlist', []);
      list = list.filter((item) => item.productId !== Number(productId));
      setStorage('gk_wishlist', list);
      return list;
    }
  },

  // USER & ADDRESSES
  getCurrentUser: async () => {
    try {
      return await request('/users/current');
    } catch {
      return null;
    }
  },

  getAddresses: async () => {
    try {
      return await request('/addresses');
    } catch {
      return getStorage('gk_addresses', []);
    }
  },

  addAddress: async (addressData) => {
    try {
      return await request('/addresses', {
        method: 'POST',
        body: JSON.stringify(addressData),
      });
    } catch {
      const list = getStorage('gk_addresses', []);
      const newAddr = { id: Date.now(), ...addressData };
      list.push(newAddr);
      setStorage('gk_addresses', list);
      return newAddr;
    }
  },

  deleteAddress: async (id) => {
    try {
      return await request(`/addresses/${id}`, {
        method: 'DELETE',
      });
    } catch {
      let list = getStorage('gk_addresses', []);
      list = list.filter((item) => item.id !== Number(id));
      setStorage('gk_addresses', list);
      return { success: true };
    }
  },
};
