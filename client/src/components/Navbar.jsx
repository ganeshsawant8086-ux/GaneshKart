import React from 'react';
import { Menu, Search, ShoppingCart, Heart, User, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onToggleSidebar, onNavigate, activePage, searchQuery, setSearchQuery, onSearchSubmit }) {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user } = useAuth();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearchSubmit();
    }
  };

  return (
    <header className="top-navbar">
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
          {/* User Profile / Login */}
          <button 
            className="nav-link-btn" 
            onClick={() => onNavigate('account')}
            title="My Account"
          >
            <User size={18} />
            <span className="hide-on-mobile">{user ? user.fullName.split(' ')[0] : 'Sign In'}</span>
          </button>

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
    </header>
  );
}
