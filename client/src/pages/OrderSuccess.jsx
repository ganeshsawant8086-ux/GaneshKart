import React from 'react';
import { CheckCircle2, Package, ArrowRight, ShieldCheck, Download, Calendar } from 'lucide-react';

export default function OrderSuccess({ order, paymentResult, onNavigate }) {
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 2);
  const formattedDelivery = deliveryDate.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: '0 16px' }}>
      <div style={{
        background: '#fff',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-md)',
        padding: '36px 30px',
        textAlign: 'center'
      }}>
        {/* Success Icon */}
        <div style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: '#e8f5e9',
          color: 'var(--success-green)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 18px',
          boxShadow: '0 4px 12px rgba(56, 142, 60, 0.2)'
        }}>
          <CheckCircle2 size={44} />
        </div>

        <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-dark)', marginBottom: 6 }}>
          Payment & Order Successful!
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>
          Thank you for shopping on GaneshKart. Your dummy order has been confirmed and saved to SQL Server.
        </p>

        {/* Transaction & Order Key Info Box */}
        <div style={{
          background: '#f8fafc',
          border: '1.5px dashed #cfd8dc',
          borderRadius: 'var(--radius-md)',
          padding: 20,
          textAlign: 'left',
          marginBottom: 24
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>ORDER ID</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--primary)' }}>
                #{order?.id || 'GK' + Math.floor(Math.random() * 90000 + 10000)}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>TRANSACTION ID</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-dark)', fontFamily: 'monospace' }}>
                {paymentResult?.transactionId || 'GKTXN202609291234'}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>AMOUNT PAID</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--success-green)' }}>
                ₹{(order?.finalAmount || paymentResult?.amount || 0).toLocaleString('en-IN')}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>PAYMENT METHOD</div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>
                {paymentResult?.paymentMethod || order?.paymentMethod || 'UPI'}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid #eceff1', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#37474f' }}>
            <Calendar size={16} color="var(--primary)" />
            <span>Estimated GaneshKart Delivery by: <strong>{formattedDelivery}</strong></span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            className="btn-proceed"
            onClick={() => onNavigate('orders')}
            style={{ maxWidth: 240, margin: 0 }}
          >
            <Package size={18} />
            <span>View in My Orders</span>
          </button>

          <button
            onClick={() => onNavigate('home')}
            style={{
              padding: '12px 24px',
              borderRadius: 'var(--radius-sm)',
              border: '1.5px solid var(--border-color)',
              fontWeight: 700,
              fontSize: 14,
              color: 'var(--text-dark)',
              background: '#fff'
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
