import React, { useState, useEffect } from 'react';
import { Package, RotateCw, ShoppingBag, ArrowRight } from 'lucide-react';
import { api } from '../services/api';
import OrderCard from '../components/OrderCard';

export default function MyOrders({ onNavigate }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await api.getOrders();
      setOrders(data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="section-wrapper" style={{ marginTop: 24, maxWidth: 960 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>My Orders & Order Tracking</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Track order delivery status and use the demo simulation buttons to progress orders.
          </p>
        </div>

        <button
          onClick={loadOrders}
          disabled={loading}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: '#fff',
            border: '1px solid var(--border-color)',
            padding: '8px 14px',
            borderRadius: 'var(--radius-sm)',
            fontSize: 13,
            fontWeight: 700,
            color: 'var(--primary)'
          }}
        >
          <RotateCw size={15} className={loading ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Orders List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div className="spinner" style={{ margin: '0 auto 16px' }}></div>
          <p style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Loading your orders from SQL Server...</p>
        </div>
      ) : orders.length === 0 ? (
        <div style={{
          background: '#fff',
          borderRadius: 'var(--radius-md)',
          padding: '60px 20px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <Package size={54} color="#b0bec5" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No orders placed yet</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 20 }}>
            You haven't placed any orders on GaneshKart yet. Start shopping now!
          </p>
          <button
            className="btn-proceed"
            onClick={() => onNavigate('products')}
            style={{ maxWidth: 200, margin: '0 auto' }}
          >
            <span>Browse Products</span>
            <ArrowRight size={18} />
          </button>
        </div>
      ) : (
        <div>
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onStatusUpdated={loadOrders}
            />
          ))}
        </div>
      )}
    </div>
  );
}
