import React from 'react';
import { Heart, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function Wishlist({ onNavigate, onViewProduct }) {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = async (productId) => {
    await addToCart(productId, 1);
    await toggleWishlist(productId); // Remove from wishlist after moving to cart
  };

  if (wishlist.length === 0) {
    return (
      <div className="section-wrapper" style={{ marginTop: 40 }}>
        <div style={{
          background: '#fff',
          borderRadius: 'var(--radius-md)',
          padding: '60px 20px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)',
          maxWidth: 600,
          margin: '0 auto'
        }}>
          <Heart size={64} color="#b0bec5" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Your Wishlist is Empty!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>
            Explore more and shortlist some items you love on GaneshKart.
          </p>
          <button
            className="btn-proceed"
            onClick={() => onNavigate('products')}
            style={{ maxWidth: 220, margin: '0 auto' }}
          >
            <span>Continue Shopping</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="section-wrapper" style={{ marginTop: 24, maxWidth: 960 }}>
      <div style={{ background: '#fff', padding: 20, borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, borderBottom: '1px solid var(--border-light)', paddingBottom: 14, marginBottom: 16 }}>
          My Wishlist ({wishlist.length} Items)
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {wishlist.map((item) => {
            const prod = item.product;
            if (!prod) return null;
            return (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  paddingBottom: 16,
                  borderBottom: '1px solid var(--border-light)',
                  flexWrap: 'wrap'
                }}
              >
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  style={{ width: 80, height: 80, objectFit: 'contain', cursor: 'pointer' }}
                  onClick={() => onViewProduct(prod.id)}
                />
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontSize: 12, textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
                    {prod.brand}
                  </div>
                  <h4
                    style={{ fontSize: 15, fontWeight: 600, cursor: 'pointer', margin: '4px 0' }}
                    onClick={() => onViewProduct(prod.id)}
                  >
                    {prod.name}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontSize: 16, fontWeight: 800 }}>₹{prod.discountPrice.toLocaleString('en-IN')}</span>
                    {prod.price > prod.discountPrice && (
                      <span style={{ fontSize: 13, textDecoration: 'line-through', color: 'var(--text-muted)' }}>
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button
                    className="btn-add-cart"
                    onClick={() => handleMoveToCart(prod.id)}
                    style={{ padding: '8px 16px' }}
                  >
                    <ShoppingCart size={15} />
                    <span>Move to Cart</span>
                  </button>
                  <button
                    onClick={() => toggleWishlist(prod.id)}
                    title="Remove from Wishlist"
                    style={{ color: '#b0bec5', padding: 8, transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#d32f2f'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#b0bec5'}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
