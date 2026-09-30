import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function CartSummary({ cart, onProceed, buttonText = 'Proceed to Checkout' }) {
  const isFreeDelivery = cart.deliveryCharge === 0;

  return (
    <div className="price-summary-card">
      <h3 className="price-summary-title">Price Details</h3>

      <div className="summary-row">
        <span>Price ({cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'})</span>
        <span>₹{cart.originalTotal?.toLocaleString('en-IN')}</span>
      </div>

      <div className="summary-row">
        <span>Discount</span>
        <span style={{ color: 'var(--success-green)', fontWeight: 600 }}>
          - ₹{cart.totalSavings?.toLocaleString('en-IN')}
        </span>
      </div>

      <div className="summary-row">
        <span>Delivery Charges</span>
        <span>
          {isFreeDelivery ? (
            <>
              <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', marginRight: 6 }}>₹40</span>
              <span style={{ color: 'var(--success-green)', fontWeight: 700 }}>FREE</span>
            </>
          ) : (
            <span>₹40</span>
          )}
        </span>
      </div>

      <div className="summary-row total">
        <span>Total Amount</span>
        <span>₹{cart.finalAmount?.toLocaleString('en-IN')}</span>
      </div>

      {cart.totalSavings > 0 && (
        <div className="savings-highlight">
          🎉 You will save ₹{cart.totalSavings?.toLocaleString('en-IN')} on this order
        </div>
      )}

      {onProceed && (
        <button className="btn-proceed" onClick={onProceed} disabled={cart.totalItems === 0}>
          <span>{buttonText}</span>
          <ArrowRight size={18} />
        </button>
      )}

      {/* Trust reassurance */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, color: 'var(--text-muted)', fontSize: 12 }}>
        <ShieldCheck size={28} color="#2874f0" />
        <span>Safe and Secure Payments. 100% Authentic products guaranteed.</span>
      </div>
    </div>
  );
}
