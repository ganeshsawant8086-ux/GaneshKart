import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartSummary from '../components/CartSummary';

export default function Cart({ onNavigate, onViewProduct }) {
  const { cart, updateQuantity, removeFromCart, clearCart, loading } = useCart();

  const items = Array.isArray(cart?.items) ? cart.items : [];

  if (loading && items.length === 0) {
    return (
      <div className="section-wrapper" style={{ marginTop: 40, textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontSize: 15, color: 'var(--text-muted)' }}>Loading your cart...</div>
      </div>
    );
  }

  if (items.length === 0) {
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
          <ShoppingBag size={64} color="#b0bec5" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Your Cart is Empty!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>
            Explore our vast catalog of electronics, mobiles, fashion & groceries and add items to your cart.
          </p>
          <button
            className="btn-proceed"
            onClick={() => onNavigate('products')}
            style={{ maxWidth: 220, margin: '0 auto' }}
          >
            <span>Shop Now</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      {/* Left: Cart Items List */}
      <div className="cart-items-card">
        <div className="cart-header">
          <span>My Cart ({cart.totalItems} {cart.totalItems === 1 ? 'Item' : 'Items'})</span>
          <button
            onClick={clearCart}
            style={{ color: '#d32f2f', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <Trash2 size={15} />
            <span>Empty Cart</span>
          </button>
        </div>

        <div>
          {items.map((item) => (
            <div key={item.id} className="cart-item-row">
              {/* Product Thumbnail */}
              <img
                src={item.productImageUrl}
                alt={item.productName}
                className="cart-item-img"
                onClick={() => onViewProduct(item.productId)}
                style={{ cursor: 'pointer' }}
              />

              {/* Item Info */}
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  {item.brand}
                </div>
                <h4
                  style={{ fontSize: 15, fontWeight: 600, marginBottom: 6, cursor: 'pointer' }}
                  onClick={() => onViewProduct(item.productId)}
                >
                  {item.productName}
                </h4>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: 16, fontWeight: 800 }}>
                    ₹{item.discountPrice.toLocaleString('en-IN')}
                  </span>
                  {item.price > item.discountPrice && (
                    <>
                      <span style={{ fontSize: 13, textDecoration: 'line-through', color: 'var(--text-muted)' }}>
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--success-green)', fontWeight: 700 }}>
                        Save ₹{((item.price - item.discountPrice) * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </>
                  )}
                </div>

                {/* Quantity Controls & Remove */}
                <div className="quantity-controller">
                  <button
                    className="qty-btn"
                    disabled={item.quantity <= 1}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    title="Decrease quantity"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="qty-input" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.quantity}
                  </span>
                  <button
                    className="qty-btn"
                    disabled={item.quantity >= 10}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    title="Increase quantity"
                  >
                    <Plus size={13} />
                  </button>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      marginLeft: 16,
                      color: 'var(--text-dark)',
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    REMOVE
                  </button>
                </div>
              </div>

              {/* Delivery Estimation */}
              <div style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'right' }}>
                Delivery by Tomorrow | <span style={{ color: 'var(--success-green)', fontWeight: 700 }}>Free</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Price Summary */}
      <CartSummary
        cart={cart}
        onProceed={() => onNavigate('checkout')}
        buttonText="Place Order"
      />
    </div>
  );
}
