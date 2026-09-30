import React, { useState, useEffect } from 'react';
import { Package, RotateCw, ShoppingBag, ArrowRight, ShieldCheck, UserX, Crown } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import OrderCard from '../components/OrderCard';

export default function MyOrders({ onNavigate, onOpenLogin }) {
  const { user, isAdmin } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // Fetch only the logged-in customer's orders
      const data = await api.getOrders(user.id, user.phoneNumber);
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [user]);

  const handleLoginClick = () => {
    if (onOpenLogin) {
      onOpenLogin();
    } else {
      window.dispatchEvent(new CustomEvent('gk:open-login'));
    }
  };

  return (
    <div className="section-wrapper" style={{ marginTop: 24, maxWidth: 960 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>My Orders & Order Tracking</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            {user ? `Showing orders placed by ${user.fullName || user.phoneNumber}` : 'Track and review your purchases'}
          </p>
        </div>

        {user && (
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
              color: 'var(--primary)',
              cursor: 'pointer'
            }}
          >
            <RotateCw size={15} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        )}
      </div>

      {/* Admin Notice Banner: directs admin to Admin Dashboard to see all orders */}
      {isAdmin && (
        <div style={{
          background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
          color: '#fff',
          padding: '16px 20px',
          borderRadius: 'var(--radius-md)',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Crown size={24} color="#ffd54f" />
            <div>
              <div style={{ fontWeight: 800, fontSize: 15 }}>👑 Administrator Access Detected</div>
              <div style={{ fontSize: 12, color: '#e3f2fd', marginTop: 2 }}>
                As an Admin, you can view and manage all orders placed by every customer in the system.
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('admin-dashboard')}
            style={{
              background: '#ffd54f',
              color: '#1a237e',
              border: 'none',
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 800,
              fontSize: 13,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <span>View All Customer Orders</span>
            <ArrowRight size={15} />
          </button>
        </div>
      )}

      {/* Unauthenticated View */}
      {!user ? (
        <div style={{
          background: '#fff',
          borderRadius: 'var(--radius-md)',
          padding: '60px 20px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <UserX size={54} color="#b0bec5" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Please Log In to View Your Orders</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 20, maxWidth: 420, margin: '0 auto 20px' }}>
            Sign in with your registered mobile number or email address to view your order history and track live deliveries.
          </p>
          <button
            className="btn-proceed"
            onClick={handleLoginClick}
            style={{ maxWidth: 200, margin: '0 auto' }}
          >
            <span>Log In Now</span>
            <ArrowRight size={18} />
          </button>
        </div>
      ) : loading ? (
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
