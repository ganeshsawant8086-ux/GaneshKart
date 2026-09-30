import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, Search, ShoppingCart, Heart, User, Sparkles, 
  MapPin, ChevronDown, Package, LogOut, Award, ShieldCheck, ShieldAlert 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ 
  onToggleSidebar, 
  onNavigate, 
  activePage, 
  searchQuery, 
  setSearchQuery, 
  onSearchSubmit,
  onOpenLogin
}) {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, selectedAddress, logout, isAdmin } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearchSubmit();
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleLoginClick = () => {
    if (!user) {
      if (onOpenLogin) onOpenLogin();
    } else {
      setShowUserMenu(!showUserMenu);
    }
  };

  return (
    <header className="top-navbar-wrapper">
      {/* 1. Flipkart-style Top Location Bar */}
      <div className="top-location-strip hide-on-mobile">
        <div className="top-location-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              type="button"
              onClick={() => onNavigate('account')}
              className="delivery-location-header-btn"
              title="Select delivery location"
            >
              <MapPin size={13} color="#ffe082" />
              <span>
                {selectedAddress
                  ? `Deliver to: ${selectedAddress.fullName}, ${selectedAddress.city} ${selectedAddress.pincode}`
                  : 'Location not set • Select delivery location >'}
              </span>
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 11, opacity: 0.95 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <ShieldCheck size={12} color="#a5d6a7" />
              <span>GaneshKart Assured Quality</span>
            </span>
            <span>⚡ Express Delivery Available</span>
          </div>
        </div>
      </div>

      {/* 2. Main Navbar */}
      <div className="top-navbar">
        <div className="navbar-inner">
          {/* Left: Menu & Brand Logo */}
          <div className="brand-section">
            <button 
              className="menu-toggle-btn" 
              onClick={onToggleSidebar} 
              title="Open GaneshKart Menu"
              aria-label="Toggle navigation menu"
            >
              <Menu size={24} />
            </button>

            <div 
              className="logo-container" 
              style={{ cursor: 'pointer' }}
              onClick={() => onNavigate('home')}
            >
              <div className="logo-main">
                <span className="logo-text-ganesh">Ganesh</span>
                <span className="logo-text-kart">Kart</span>
              </div>
              <div className="logo-subtext">
                <span>Explore</span>
                <span className="plus-badge">Plus</span>
                <Sparkles size={11} color="#ff9f00" />
              </div>
            </div>
          </div>

          {/* Center: Search Bar */}
          <div className="search-container">
            <form className="search-form" onSubmit={(e) => { e.preventDefault(); onSearchSubmit(); }}>
              <input
                type="text"
                className="search-input"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
              />
              <button type="submit" className="search-btn" title="Search">
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* Right: Actions */}
          <div className="nav-actions">
            {/* User Profile / Login with Dropdown */}
            <div className="nav-user-dropdown-container" ref={userMenuRef}>
              <button 
                className="nav-link-btn" 
                onClick={handleLoginClick}
                onMouseEnter={() => setShowUserMenu(true)}
                title={user ? 'Account Settings' : 'Sign in to GaneshKart'}
                style={{
                  background: !user ? '#ffffff' : 'transparent',
                  color: !user ? 'var(--primary)' : '#ffffff',
                  padding: !user ? '6px 16px' : '8px 12px',
                  borderRadius: 4,
                  fontWeight: 700
                }}
              >
                <User size={18} />
                <span className="hide-on-mobile">
                  {user ? (isAdmin ? 'Admin' : user.fullName.split(' ')[0]) : 'Login'}
                </span>
                {isAdmin && (
                  <span style={{
                    fontSize: 10,
                    background: '#ff9f00',
                    color: '#fff',
                    borderRadius: 3,
                    padding: '1px 4px',
                    fontWeight: 800,
                    marginLeft: 2
                  }}>
                    ADMIN
                  </span>
                )}
                <ChevronDown size={14} style={{ marginLeft: 2 }} />
              </button>

              {/* Flipkart style dropdown menu */}
              {showUserMenu && (
                <div 
                  className="nav-user-menu-dropdown animate-slide-up"
                  onMouseLeave={() => setShowUserMenu(false)}
                >
                  {!user ? (
                    <div style={{ padding: '12px 16px', background: '#f5f8ff', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>New customer?</span>
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          if (onOpenLogin) onOpenLogin();
                        }}
                        style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 13, background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        Sign Up
                      </button>
                    </div>
                  ) : (
                    <div style={{ padding: '12px 16px', background: isAdmin ? '#fff8e1' : '#f5f8ff', borderBottom: '1px solid #e0e0e0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-dark)' }}>
                          Hello, {user.fullName}
                        </div>
                        {isAdmin && (
                          <span style={{
                            background: 'linear-gradient(135deg, #e65100 0%, #ff8f00 100%)',
                            color: '#fff',
                            fontSize: 10,
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: 10,
                            letterSpacing: 0.5,
                            boxShadow: '0 2px 5px rgba(230,81,0,0.3)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 3
                          }}>
                            👑 ADMIN
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 11, color: '#666', marginTop: 2 }}>{user.phoneNumber}</div>
                    </div>
                  )}

                  {isAdmin && (
                    <div 
                      className="nav-user-menu-item"
                      onClick={() => {
                        setShowUserMenu(false);
                        onNavigate('admin-dashboard');
                      }}
                      style={{
                        background: '#fff3e0',
                        color: '#bf360c',
                        fontWeight: 700,
                        borderBottom: '1px solid #ffe0b2'
                      }}
                    >
                      <ShieldAlert size={16} color="#e65100" />
                      <span>Admin Control Portal</span>
                    </div>
                  )}

                  <div 
                    className="nav-user-menu-item"
                    onClick={() => {
                      setShowUserMenu(false);
                      onNavigate('account');
                    }}
                  >
                    <User size={16} color="var(--primary)" />
                    <span>My Profile</span>
                  </div>

                  <div 
                    className="nav-user-menu-item"
                    onClick={() => {
                      setShowUserMenu(false);
                      onNavigate('orders');
                    }}
                  >
                    <Package size={16} color="var(--primary)" />
                    <span>Orders</span>
                  </div>

                  <div 
                    className="nav-user-menu-item"
                    onClick={() => {
                      setShowUserMenu(false);
                      onNavigate('wishlist');
                    }}
                  >
                    <Heart size={16} color="#e91e63" />
                    <span>Wishlist ({wishlistCount})</span>
                  </div>

                  <div 
                    className="nav-user-menu-item"
                    onClick={() => {
                      setShowUserMenu(false);
                      onNavigate('account');
                    }}
                  >
                    <MapPin size={16} color="var(--primary)" />
                    <span>Saved Addresses</span>
                  </div>

                  {user ? (
                    <div 
                      className="nav-user-menu-item"
                      onClick={() => {
                        setShowUserMenu(false);
                        logout();
                      }}
                      style={{ color: '#d32f2f' }}
                    >
                      <LogOut size={16} color="#d32f2f" />
                      <span>Logout</span>
                    </div>
                  ) : (
                    <div 
                      className="nav-user-menu-item"
                      onClick={() => {
                        setShowUserMenu(false);
                        if (onOpenLogin) onOpenLogin();
                      }}
                      style={{ color: 'var(--primary)', fontWeight: 700 }}
                    >
                      <span>Log In</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <button 
              className="nav-link-btn cart-btn-wrapper" 
              onClick={() => onNavigate('wishlist')}
              title="Wishlist"
            >
              <Heart size={20} />
              <span className="hide-on-mobile">Wishlist</span>
              {wishlistCount > 0 && <span className="cart-badge">{wishlistCount}</span>}
            </button>

            {/* Cart */}
            <button 
              className="nav-link-btn cart-btn-wrapper" 
              onClick={() => onNavigate('cart')}
              title="Shopping Cart"
            >
              <ShoppingCart size={20} />
              <span className="hide-on-mobile">Cart</span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
