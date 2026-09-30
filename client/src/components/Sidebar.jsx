import React from 'react';
import { 
  X, Home, Grid, Laptop, Smartphone, Shirt, ShoppingBag, 
  Tv, Package, ShoppingCart, Heart, User, Settings, HelpCircle, LogOut, ShieldAlert 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Sidebar({ isOpen, onClose, onNavigate, activePage }) {
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const handleItemClick = (page, categoryFilter = null) => {
    onNavigate(page, categoryFilter);
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
    alert('Logged out for demo. You can sign back in anytime!');
  };

  return (
    <>
      {/* Backdrop Overlay */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Animated Drawer */}
      <aside className={`sidebar-drawer ${isOpen ? 'open' : ''}`}>
        {/* Header with User Info */}
        <div className="sidebar-header">
          <div className="user-sidebar-info">
            <div className="user-avatar-circle">
              {user ? user.fullName.charAt(0).toUpperCase() : 'G'}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>
                Hello, {user ? user.fullName : 'Guest Shopper'}
              </div>
              <div style={{ fontSize: 12, opacity: 0.85 }}>
                {user ? user.email : 'Welcome to GaneshKart'}
              </div>
            </div>
          </div>
          <button 
            className="sidebar-close-btn" 
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu Navigation Items */}
        <ul className="sidebar-nav-list">
          <li 
            className={`sidebar-nav-item ${activePage === 'home' ? 'active' : ''}`}
            onClick={() => handleItemClick('home')}
          >
            <Home size={19} className="icon" />
            <span>Home</span>
          </li>

          <li 
            className={`sidebar-nav-item ${activePage === 'categories' ? 'active' : ''}`}
            onClick={() => handleItemClick('categories')}
          >
            <Grid size={19} className="icon" />
            <span>All Categories</span>
          </li>

          <div className="sidebar-divider" />
          <div className="sidebar-section-title">Shop by Department</div>

          <li 
            className="sidebar-nav-item"
            onClick={() => handleItemClick('products', 'Electronics')}
          >
            <Laptop size={19} className="icon" />
            <span>Electronics</span>
          </li>

          <li 
            className="sidebar-nav-item"
            onClick={() => handleItemClick('products', 'Mobiles')}
          >
            <Smartphone size={19} className="icon" />
            <span>Mobiles</span>
          </li>

          <li 
            className="sidebar-nav-item"
            onClick={() => handleItemClick('products', 'Fashion')}
          >
            <Shirt size={19} className="icon" />
            <span>Fashion</span>
          </li>

          <li 
            className="sidebar-nav-item"
            onClick={() => handleItemClick('products', 'Grocery')}
          >
            <ShoppingBag size={19} className="icon" />
            <span>Grocery</span>
          </li>

          <li 
            className="sidebar-nav-item"
            onClick={() => handleItemClick('products', 'Home & Kitchen')}
          >
            <Home size={19} className="icon" />
            <span>Home & Kitchen</span>
          </li>

          <li 
            className="sidebar-nav-item"
            onClick={() => handleItemClick('products', 'Appliances')}
          >
            <Tv size={19} className="icon" />
            <span>Appliances</span>
          </li>

          <div className="sidebar-divider" />
          <div className="sidebar-section-title">My Account & Activity</div>

          {isAdmin && (
            <li 
              className={`sidebar-nav-item ${activePage === 'admin-dashboard' ? 'active' : ''}`}
              style={{ background: '#fff8e1', color: '#b26a00', fontWeight: 700 }}
              onClick={() => handleItemClick('admin-dashboard')}
            >
              <ShieldAlert size={19} color="#e65100" />
              <span>👑 Admin Control Center</span>
            </li>
          )}

          <li 
            className={`sidebar-nav-item ${activePage === 'orders' ? 'active' : ''}`}
            onClick={() => handleItemClick('orders')}
          >
            <Package size={19} className="icon" />
            <span>My Orders</span>
          </li>

          <li 
            className={`sidebar-nav-item ${activePage === 'cart' ? 'active' : ''}`}
            onClick={() => handleItemClick('cart')}
          >
            <ShoppingCart size={19} className="icon" />
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <span>Cart</span>
              {cartCount > 0 && <span className="rating-badge" style={{ background: '#fb641b' }}>{cartCount}</span>}
            </div>
          </li>

          <li 
            className={`sidebar-nav-item ${activePage === 'wishlist' ? 'active' : ''}`}
            onClick={() => handleItemClick('wishlist')}
          >
            <Heart size={19} className="icon" />
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <span>Wishlist</span>
              {wishlistCount > 0 && <span className="rating-badge" style={{ background: '#e91e63' }}>{wishlistCount}</span>}
            </div>
          </li>

          <li 
            className={`sidebar-nav-item ${activePage === 'account' ? 'active' : ''}`}
            onClick={() => handleItemClick('account')}
          >
            <User size={19} className="icon" />
            <span>My Account</span>
          </li>

          <li 
            className={`sidebar-nav-item ${activePage === 'settings' ? 'active' : ''}`}
            onClick={() => handleItemClick('settings')}
          >
            <Settings size={19} className="icon" />
            <span>Settings</span>
          </li>

          <li 
            className={`sidebar-nav-item ${activePage === 'help' ? 'active' : ''}`}
            onClick={() => handleItemClick('help')}
          >
            <HelpCircle size={19} className="icon" />
            <span>Help & Support</span>
          </li>

          <div className="sidebar-divider" />

          <li 
            className="sidebar-nav-item"
            style={{ color: '#d32f2f' }}
            onClick={handleLogout}
          >
            <LogOut size={19} color="#d32f2f" />
            <span>Logout</span>
          </li>
        </ul>
      </aside>
    </>
  );
}
