/**
 * GaneshKart API Service
 * Connects React frontend to ASP.NET Core Web API running on http://localhost:5056
 */

const API_BASE_URL = 'http://localhost:5056/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const res = await fetch(url, config);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.error(`Fetch error at ${endpoint}:`, err);
    throw err;
  }
}

export const api = {
  // Products
  getProducts: (params = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.category && params.category !== 'All') query.append('category', params.category);
    if (params.minPrice) query.append('minPrice', params.minPrice);
    if (params.maxPrice) query.append('maxPrice', params.maxPrice);
    if (params.sortBy) query.append('sortBy', params.sortBy);

    const queryString = query.toString() ? `?${query.toString()}` : '';
    return request(`/products${queryString}`);
  },

  getProductById: (id) => request(`/products/${id}`),
  getFeaturedProducts: () => request('/products/featured'),
  getProductsByCategory: (category) => request(`/products/category/${encodeURIComponent(category)}`),

  // Categories
  getCategories: () => request('/categories'),

  // Cart
  getCart: () => request('/cart'),
  addToCart: (productId, quantity = 1) =>
    request('/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    }),
  updateCartQuantity: (cartItemId, quantity) =>
    request(`/cart/${cartItemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    }),
  removeFromCart: (cartItemId) =>
    request(`/cart/${cartItemId}`, {
      method: 'DELETE',
    }),
  clearCart: () =>
    request('/cart/clear', {
      method: 'DELETE',
    }),

  // Orders
  getOrders: () => request('/orders'),
  getOrderById: (id) => request(`/orders/${id}`),
  createOrder: (orderData) =>
    request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),
  updateOrderStatus: (orderId, status) =>
    request(`/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),

  // Dummy Payment
  processDummyPayment: (paymentData) =>
    request('/payments/dummy', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    }),

  // Wishlist
  getWishlist: () => request('/wishlist'),
  addToWishlist: (productId) =>
    request('/wishlist', {
      method: 'POST',
      body: JSON.stringify({ productId }),
    }),
  removeFromWishlist: (productId) =>
    request(`/wishlist/${productId}`, {
      method: 'DELETE',
    }),

  // User & Addresses
  getCurrentUser: () => request('/users/current'),
  getAddresses: () => request('/addresses'),
  addAddress: (addressData) =>
    request('/addresses', {
      method: 'POST',
      body: JSON.stringify(addressData),
    }),
};
