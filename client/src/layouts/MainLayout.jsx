import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CategoryMenu from '../components/CategoryMenu';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal';

// Pages
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import DummyPayment from '../pages/DummyPayment';
import OrderSuccess from '../pages/OrderSuccess';
import MyOrders from '../pages/MyOrders';
import Wishlist from '../pages/Wishlist';
import CategoriesPage from '../pages/CategoriesPage';
import AccountPage from '../pages/AccountPage';
import SettingsPage from '../pages/SettingsPage';
import HelpSupportPage from '../pages/HelpSupportPage';
import AdminDashboard from '../pages/AdminDashboard';

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);
  
  // Checkout & Payment State
  const [checkoutData, setCheckoutData] = useState(null);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [completedPayment, setCompletedPayment] = useState(null);

  const navigateTo = (page, category = null, productId = null) => {
    setCurrentPage(page);
    if (category) {
      setSelectedCategory(category);
    }
    if (productId) {
      setSelectedProductId(productId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      setCurrentPage('products');
    }
  };

  const handleViewProduct = (productId) => {
    setSelectedProductId(productId);
    setCurrentPage('product-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToPayment = (formData) => {
    setCheckoutData(formData);
    setCurrentPage('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderCompleted = (order, paymentResult) => {
    setCompletedOrder(order);
    setCompletedPayment(paymentResult);
    setCurrentPage('order-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {/* 1. Top Navbar */}
      <Navbar
        onToggleSidebar={() => setIsSidebarOpen(true)}
        onNavigate={navigateTo}
        activePage={currentPage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onOpenLogin={() => setIsLoginModalOpen(true)}
      />

      {/* 2. Category Strip (displayed on home, products, and categories) */}
      {['home', 'products', 'categories'].includes(currentPage) && (
        <CategoryMenu
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
      )}

      {/* 3. Sliding Animated Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNavigate={navigateTo}
        activePage={currentPage}
      />

      {/* 4. Main Page Views */}
      <main className="main-content">
        {currentPage === 'home' && (
          <Home
            onNavigate={navigateTo}
            onViewProduct={handleViewProduct}
          />
        )}

        {currentPage === 'products' && (
          <Products
            initialCategory={selectedCategory}
            initialSearch={searchQuery}
            onViewProduct={handleViewProduct}
            onNavigateCategory={(cat) => setSelectedCategory(cat)}
          />
        )}

        {currentPage === 'product-details' && (
          <ProductDetails
            productId={selectedProductId}
            onBack={() => navigateTo('products')}
            onNavigate={navigateTo}
            onOpenLogin={() => setIsLoginModalOpen(true)}
          />
        )}

        {currentPage === 'cart' && (
          <Cart
            onNavigate={navigateTo}
            onViewProduct={handleViewProduct}
            onOpenLogin={() => setIsLoginModalOpen(true)}
          />
        )}

        {currentPage === 'checkout' && (
          <Checkout
            onProceedToPayment={handleProceedToPayment}
            onBackToCart={() => navigateTo('cart')}
            onOpenLogin={() => setIsLoginModalOpen(true)}
          />
        )}

        {currentPage === 'payment' && (
          <DummyPayment
            checkoutData={checkoutData}
            onOrderCompleted={handleOrderCompleted}
            onBackToCheckout={() => navigateTo('checkout')}
          />
        )}

        {currentPage === 'order-success' && (
          <OrderSuccess
            order={completedOrder}
            paymentResult={completedPayment}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'orders' && (
          <MyOrders
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'wishlist' && (
          <Wishlist
            onNavigate={navigateTo}
            onViewProduct={handleViewProduct}
          />
        )}

        {currentPage === 'categories' && (
          <CategoriesPage
            onSelectCategory={handleCategorySelect}
          />
        )}

        {currentPage === 'account' && (
          <AccountPage
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'settings' && (
          <SettingsPage />
        )}

        {currentPage === 'help' && (
          <HelpSupportPage />
        )}

        {currentPage === 'admin-dashboard' && (
          <AdminDashboard
            onNavigate={navigateTo}
            onOpenLogin={() => setIsLoginModalOpen(true)}
          />
        )}
      </main>

      {/* 5. Indian E-Commerce Footer */}
      <Footer onNavigate={navigateTo} />

      {/* 6. Flipkart-style Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onNavigate={navigateTo}
      />
    </div>
  );
}
