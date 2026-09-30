import React from 'react';
import { Star, ShoppingCart, Heart, ShieldCheck, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export default function ProductCard({ product, onViewDetails, onNavigate, onOpenLogin }) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);

  // Discount percentage calculation
  const discountPercent = product.price > product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product.id, 1);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleBuyOrder = async (e) => {
    e.stopPropagation();
    if (!user) {
      if (onOpenLogin) {
        onOpenLogin();
      } else {
        window.dispatchEvent(new CustomEvent('gk:open-login'));
      }
      return;
    }
    await addToCart(product.id, 1);
    if (onNavigate) {
      onNavigate('checkout');
    } else {
      window.dispatchEvent(new CustomEvent('gk:navigate', { detail: 'checkout' }));
    }
  };

  return (
    <article className="product-card" onClick={() => onViewDetails(product.id)}>
      {/* Wishlist Heart Icon */}
      <button
        className={`wishlist-heart-btn ${isWishlisted ? 'active' : ''}`}
        onClick={handleToggleWishlist}
        title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        aria-label="Wishlist toggle"
      >
        <Heart size={18} fill={isWishlisted ? '#e91e63' : 'none'} color={isWishlisted ? '#e91e63' : '#90a4ae'} />
      </button>

      {/* Product Image */}
      <div className="product-image-container">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-img"
          loading="lazy"
        />
      </div>

      {/* Brand & Title */}
      <div className="product-brand">{product.brand}</div>
      <h3 className="product-title" title={product.name}>{product.name}</h3>

      {/* Rating & Assured Badge */}
      <div className="product-rating-row">
        <span className="rating-badge">
          {product.rating.toFixed(1)} <Star size={11} fill="#fff" />
        </span>
        <span className="assured-badge" title="GaneshKart Assured Quality">
          ✓ Assured
        </span>
      </div>

      {/* Price & Savings */}
      <div className="product-price-row">
        <span className="current-price">₹{product.discountPrice.toLocaleString('en-IN')}</span>
        {product.price > product.discountPrice && (
          <>
            <span className="original-price">₹{product.price.toLocaleString('en-IN')}</span>
            <span className="discount-percent">{discountPercent}% off</span>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="card-actions">
        <button className="btn-add-cart" onClick={handleAddToCart} title="Add to Cart">
          <ShoppingCart size={15} />
          <span>Add to Cart</span>
        </button>
        <button className="btn-buy-order" onClick={handleBuyOrder} title="Buy Order immediately">
          <Zap size={15} fill="#fff" />
          <span>⚡ Buy Order</span>
        </button>
      </div>
    </article>
  );
}
