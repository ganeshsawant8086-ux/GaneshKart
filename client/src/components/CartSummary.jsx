import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function CartSummary({ cart, onProceed, buttonText = 'Proceed to Checkout' }) {
  const totalItems = cart?.totalItems ?? (Array.isArray(cart?.items) ? cart.items.length : 0);
  const originalTotal = cart?.originalTotal ?? 0;
  const totalSavings = cart?.totalSavings ?? 0;
  const deliveryCharge = cart?.deliveryCharge ?? 0;
  const finalAmount = cart?.finalAmount ?? 0;
  const isFreeDelivery = deliveryCharge === 0;

  return (
    <div className="price-summary-card">
      <h3 className="price-summary-title">Price Details</h3>

      <div className="summary-row">
        <span>Price ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
        <span>₹{originalTotal.toLocaleString('en-IN')}</span>
      </div>

      <div className="summary-row">
        <span>Discount</span>
        <span style={{ color: 'var(--success-green)', fontWeight: 600 }}>
          - ₹{totalSavings.toLocaleString('en-IN')}
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
        <span>₹{finalAmount.toLocaleString('en-IN')}</span>
      </div>

      {totalSavings > 0 && (
        <div className="savings-highlight">
          🎉 You will save ₹{totalSavings.toLocaleString('en-IN')} on this order
        </div>
      )}

      {onProceed && (
        <button className="btn-proceed" onClick={onProceed} disabled={totalItems === 0}>
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
