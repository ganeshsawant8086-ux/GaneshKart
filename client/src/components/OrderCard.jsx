import React, { useState } from 'react';
import { Package, CheckCircle2, Clock, Truck, ShieldAlert } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const STATUS_STEPS = [
  'Order Placed',
  'Confirmed',
  'Packed',
  'Shipped',
  'Delivered'
];

export default function OrderCard({ order, onStatusUpdated }) {
  const { isAdmin } = useAuth();
  const [updating, setUpdating] = useState(false);
  const currentStepIndex = STATUS_STEPS.indexOf(order.status) !== -1 
    ? STATUS_STEPS.indexOf(order.status) 
    : 0;

  const handleSimulateStatus = async (newStatus) => {
    setUpdating(true);
    try {
      await api.updateOrderStatus(order.id, newStatus);
      if (onStatusUpdated) onStatusUpdated();
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const formattedDate = new Date(order.orderDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="order-card">
      {/* Top Details */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, borderBottom: '1px solid var(--border-light)', paddingBottom: 14 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--primary)' }}>
              Order #{order.id}
            </span>
            <span style={{
              fontSize: 12,
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: 4,
              background: order.status === 'Delivered' ? '#e8f5e9' : '#e3f2fd',
              color: order.status === 'Delivered' ? 'var(--success-green)' : 'var(--primary)'
            }}>
              {order.status}
            </span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Placed on: {formattedDate}
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 18, fontWeight: 800 }}>
            ₹{order.finalAmount?.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            {order.paymentMethod} • <span style={{ color: order.paymentStatus === 'Completed' ? 'var(--success-green)' : '#f57c00', fontWeight: 600 }}>{order.paymentStatus}</span>
          </div>
        </div>
      </div>

      {/* Progress Timeline Tracker */}
      <div className="order-tracker-timeline">
        {STATUS_STEPS.map((step, idx) => {
          const isCompleted = idx <= currentStepIndex;
          const isActive = idx === currentStepIndex;
          return (
            <div
              key={step}
              className={`timeline-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
            >
              <div className="timeline-dot">
                {isCompleted ? '✓' : idx + 1}
              </div>
              <span className="timeline-step-label">{step}</span>
            </div>
          );
        })}
      </div>

      {/* Order Items Preview */}
      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {order.orderItems?.map((item) => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fafafa', padding: 10, borderRadius: 'var(--radius-sm)' }}>
            <img
              src={item.productImageUrl}
              alt={item.productName}
              style={{ width: 50, height: 50, objectFit: 'contain', background: '#fff', borderRadius: 4, padding: 2 }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-dark)' }}>{item.productName}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                Qty: {item.quantity} × ₹{item.unitPrice?.toLocaleString('en-IN')}
              </div>
            </div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>
              ₹{item.totalPrice?.toLocaleString('en-IN')}
            </div>
          </div>
        ))}
      </div>

      {/* Shipping Address */}
      <div style={{ marginTop: 14, fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>
        <strong>Deliver To:</strong> {order.customerName} ({order.phoneNumber}) — {order.shippingAddress}
      </div>

      {/* Interactive Simulation Controls - ONLY VISIBLE TO ADMIN */}
      {isAdmin && (
        <div className="sim-controls-strip">
          <span className="sim-label">👑 Admin Status Controller:</span>
          {STATUS_STEPS.map((step) => (
            <button
              key={step}
              disabled={updating || order.status === step}
              className="sim-btn"
              style={{
                opacity: order.status === step ? 0.5 : 1,
                fontWeight: order.status === step ? 800 : 600,
              }}
              onClick={() => handleSimulateStatus(step)}
            >
              {step}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
