import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, ShieldCheck, Package, Users, DollarSign, 
  RotateCw, CheckCircle2, Clock, Truck, Search, ArrowRight,
  Filter, Lock, Eye, Plus, Trash2, Image as ImageIcon, Sparkles, ExternalLink, X
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const STATUS_STEPS = [
  'Order Placed',
  'Confirmed',
  'Packed',
  'Shipped',
  'Delivered'
];

const SAMPLE_IMAGE_PRESETS = [
  { label: 'Smartphone', url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80' },
  { label: 'Laptop', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80' },
  { label: 'Headphones', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
  { label: 'Smartwatch', url: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80' },
  { label: 'Sneakers', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80' },
  { label: 'Camera', url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80' },
];

export default function AdminDashboard({ onNavigate, onOpenLogin }) {
  const { user, isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'products' | 'customers'
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Products Management State
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');
  const [submittingProduct, setSubmittingProduct] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Mobiles',
    brand: '',
    price: '',
    discountPrice: '',
    stock: 25,
    rating: 4.5,
    imageUrl: '',
    description: '',
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [ordersData, customersData, productsData] = await Promise.all([
        api.getAllOrdersForAdmin(),
        api.getCustomers(),
        api.getProducts()
      ]);
      setOrders(Array.isArray(ordersData) ? ordersData : []);
      setCustomers(Array.isArray(customersData) ? customersData : []);
      setProducts(Array.isArray(productsData) ? productsData : []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    setUpdatingOrderId(orderId);
    try {
      await api.updateOrderStatus(orderId, newStatus);
      setFeedbackMsg(`Order #${orderId} status updated to "${newStatus}" in SQL Server!`);
      setTimeout(() => setFeedbackMsg(''), 4000);
      await loadData();
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.imageUrl || !productForm.price || !productForm.brand) {
      alert('Please fill in required fields: Name, Brand, Price, and Image URL.');
      return;
    }
    setSubmittingProduct(true);
    try {
      const priceVal = parseFloat(productForm.price);
      const discountVal = productForm.discountPrice ? parseFloat(productForm.discountPrice) : priceVal;
      const payload = {
        name: productForm.name.trim(),
        description: productForm.description.trim() || `${productForm.brand} ${productForm.name}`,
        price: priceVal,
        discountPrice: discountVal,
        category: productForm.category,
        brand: productForm.brand.trim(),
        imageUrl: productForm.imageUrl.trim(),
        rating: parseFloat(productForm.rating) || 4.5,
        stock: parseInt(productForm.stock, 10) || 10,
      };

      await api.addProduct(payload);
      setFeedbackMsg(`Product "${payload.name}" added successfully with image!`);
      setTimeout(() => setFeedbackMsg(''), 4000);
      setIsAddProductModalOpen(false);
      setProductForm({
        name: '',
        category: 'Mobiles',
        brand: '',
        price: '',
        discountPrice: '',
        stock: 25,
        rating: 4.5,
        imageUrl: '',
        description: '',
      });
      await loadData();
    } catch (err) {
      alert('Failed to add product: ' + err.message);
    } finally {
      setSubmittingProduct(false);
    }
  };

  const handleDeleteProduct = async (prodId, prodName) => {
    if (!window.confirm(`Are you sure you want to delete "${prodName}"?`)) return;
    try {
      await api.deleteProduct(prodId);
      setFeedbackMsg(`Product "${prodName}" deleted.`);
      setTimeout(() => setFeedbackMsg(''), 4000);
      await loadData();
    } catch (err) {
      alert('Failed to delete product: ' + err.message);
    }
  };

  // If not admin, block view
  if (!isAdmin) {
    return (
      <div className="section-wrapper" style={{ marginTop: 40, textAlign: 'center', padding: '60px 20px' }}>
        <div style={{
          background: '#fff',
          borderRadius: 'var(--radius-md)',
          padding: '50px 30px',
          maxWidth: 520,
          margin: '0 auto',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid #ffebee'
        }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: '#ffebee',
            color: '#d32f2f',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <Lock size={32} />
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#c62828', marginBottom: 8 }}>
            Admin Access Restricted
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.5, marginBottom: 24 }}>
            This portal is restricted to authorized store administrators. Please log in with the official Admin credentials (ID: <code>8668811021</code>) to access order status controls and customer databases.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button
              className="btn-proceed"
              onClick={onOpenLogin}
              style={{ maxWidth: 200, margin: 0, background: '#1a237e' }}
            >
              <ShieldAlert size={16} />
              <span>Admin Login</span>
            </button>
            <button
              onClick={() => onNavigate('home')}
              style={{
                padding: '10px 18px',
                borderRadius: 4,
                border: '1px solid var(--border-color)',
                background: '#fff',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.finalAmount || o.totalAmount) || 0), 0);
  const pendingOrders = orders.filter((o) => o.status !== 'Delivered').length;
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      (o.customerName && o.customerName.toLowerCase().includes(query)) ||
      (o.phoneNumber && o.phoneNumber.includes(query)) ||
      (String(o.id).includes(query));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="section-wrapper" style={{ marginTop: 24, maxWidth: 1100 }}>
      {/* Admin Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 50%, #1a237e 100%)',
        color: '#fff',
        padding: '24px 28px',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-md)',
        marginBottom: 24,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              background: '#ff9f00',
              color: '#000',
              fontWeight: 800,
              fontSize: 11,
              padding: '3px 8px',
              borderRadius: 4,
              letterSpacing: 0.5
            }}>
              👑 MASTER ADMIN
            </span>
            <span style={{ fontSize: 13, opacity: 0.9 }}>
              Admin ID: <strong>{user?.phoneNumber || '8668811021'}</strong>
            </span>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginTop: 6, color: '#fff' }}>
            GaneshKart Administration &amp; Order Control Center
          </h1>
          <p style={{ fontSize: 13, opacity: 0.9, marginTop: 2 }}>
            Connected to <strong>SQL Server (GaneshKartDB)</strong> • Live Order Status Simulator Authority
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={loadData}
            disabled={loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <RotateCw size={15} className={loading ? 'animate-spin' : ''} />
            <span>Refresh SQL Data</span>
          </button>
        </div>
      </div>

      {feedbackMsg && (
        <div style={{
          background: '#e8f5e9',
          color: '#2e7d32',
          padding: '12px 16px',
          borderRadius: 'var(--radius-sm)',
          marginBottom: 20,
          fontWeight: 700,
          fontSize: 14,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          border: '1px solid #c8e6c9'
        }}>
          <CheckCircle2 size={18} />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* KPI Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 16,
        marginBottom: 24
      }}>
        <div style={{ background: '#fff', padding: 20, borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)' }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Total Customer Orders</span>
            <Package size={20} color="var(--primary)" />
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, marginTop: 8 }}>{orders.length}</div>
          <div style={{ fontSize: 12, color: 'var(--success-green)', fontWeight: 600, marginTop: 4 }}>
            {deliveredOrders} Delivered
          </div>
        </div>

        <div style={{ background: '#fff', padding: 20, borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)' }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Total Store Revenue</span>
            <DollarSign size={20} color="var(--success-green)" />
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, marginTop: 8 }}>
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
            Recorded in SQL Server
          </div>
        </div>

        <div style={{ background: '#fff', padding: 20, borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)' }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Registered Customers</span>
            <Users size={20} color="#ff9800" />
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, marginTop: 8 }}>
            {customers.length || 1}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
            Mobile &amp; Email Accounts
          </div>
        </div>

        <div style={{ background: '#fff', padding: 20, borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)' }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Total Products</span>
            <Package size={20} color="#0288d1" />
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, marginTop: 8 }}>
            {products.length}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
            In Store Catalog
          </div>
        </div>

        <div style={{ background: '#fff', padding: 20, borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)' }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Pending Dispatch</span>
            <Truck size={20} color="#e53935" />
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, marginTop: 8, color: pendingOrders > 0 ? '#d32f2f' : 'inherit' }}>
            {pendingOrders}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
            Requires Status Progress
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div style={{
        display: 'flex',
        gap: 12,
        borderBottom: '2px solid var(--border-light)',
        marginBottom: 20
      }}>
        <button
          onClick={() => setActiveTab('orders')}
          style={{
            padding: '10px 20px',
            border: 'none',
            background: 'none',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            color: activeTab === 'orders' ? 'var(--primary)' : 'var(--text-muted)',
            borderBottom: activeTab === 'orders' ? '3px solid var(--primary)' : '3px solid transparent',
            marginBottom: -2
          }}
        >
          Customer Orders &amp; Simulator ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('products')}
          style={{
            padding: '10px 20px',
            border: 'none',
            background: 'none',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            color: activeTab === 'products' ? 'var(--primary)' : 'var(--text-muted)',
            borderBottom: activeTab === 'products' ? '3px solid var(--primary)' : '3px solid transparent',
            marginBottom: -2
          }}
        >
          Products &amp; Inventory ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('customers')}
          style={{
            padding: '10px 20px',
            border: 'none',
            background: 'none',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            color: activeTab === 'customers' ? 'var(--primary)' : 'var(--text-muted)',
            borderBottom: activeTab === 'customers' ? '3px solid var(--primary)' : '3px solid transparent',
            marginBottom: -2
          }}
        >
          Customers Database ({customers.length})
        </button>
      </div>

      {/* ================= TAB 1: ORDERS & SIMULATOR ================= */}
      {activeTab === 'orders' && (
        <div>
          {/* Filters & Search Bar */}
          <div style={{
            background: '#fff',
            padding: 16,
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 14
          }}>
            {/* Search */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 260 }}>
              <Search size={18} color="var(--text-muted)" />
              <input
                type="text"
                placeholder="Search by customer name, phone, or order ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  border: '1px solid var(--border-color)',
                  borderRadius: 4,
                  padding: '8px 12px',
                  fontSize: 13
                }}
              />
            </div>

            {/* Status Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)' }}>Status:</span>
              {['All', ...STATUS_STEPS].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: statusFilter === st ? 'var(--primary)' : 'var(--border-color)',
                    background: statusFilter === st ? 'var(--primary)' : '#fff',
                    color: statusFilter === st ? '#fff' : 'var(--text-dark)',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Orders List */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: 'var(--radius-md)' }}>
              <div className="spinner" style={{ margin: '0 auto 16px' }}></div>
              <p style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Loading orders from SQL Server...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: 'var(--radius-md)' }}>
              <Package size={48} color="#b0bec5" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>No orders match this filter</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Try resetting status filter or search query.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {filteredOrders.map((order) => {
                const currentStepIndex = STATUS_STEPS.indexOf(order.status) !== -1 
                  ? STATUS_STEPS.indexOf(order.status) 
                  : 0;

                return (
                  <div 
                    key={order.id} 
                    style={{
                      background: '#fff',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-sm)',
                      padding: 20,
                      border: '1px solid var(--border-light)'
                    }}
                  >
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, paddingBottom: 14, borderBottom: '1px solid var(--border-light)' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--primary)' }}>
                            Order #{order.id}
                          </span>
                          <span style={{
                            fontSize: 11,
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: 4,
                            background: order.status === 'Delivered' ? '#e8f5e9' : '#fff3e0',
                            color: order.status === 'Delivered' ? '#2e7d32' : '#e65100'
                          }}>
                            {order.status}
                          </span>
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                          Customer: <strong>{order.customerName}</strong> • Phone: <strong>{order.phoneNumber}</strong>
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                          Address: {order.shippingAddress}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 18, fontWeight: 800 }}>
                          ₹{(order.finalAmount || order.totalAmount || 0).toLocaleString('en-IN')}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                          {order.paymentMethod} • {order.paymentStatus || 'Completed'}
                        </div>
                        <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>
                          {new Date(order.orderDate).toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    {/* Items preview */}
                    <div style={{ padding: '12px 0', display: 'flex', gap: 12, overflowX: 'auto' }}>
                      {(order.orderItems || []).map((it) => (
                        <div key={it.id} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f8f9fa', padding: '6px 12px', borderRadius: 4, fontSize: 12 }}>
                          {it.productImageUrl && <img src={it.productImageUrl} alt={it.productName} style={{ width: 28, height: 28, objectFit: 'contain' }} />}
                          <span style={{ fontWeight: 600 }}>{it.productName}</span>
                          <span style={{ color: 'var(--text-muted)' }}>×{it.quantity}</span>
                        </div>
                      ))}
                    </div>

                    {/* ADMIN STATUS CONTROLLER STRIP */}
                    <div style={{
                      marginTop: 12,
                      padding: '12px 14px',
                      background: '#fff9e6',
                      borderRadius: 'var(--radius-sm)',
                      border: '1.5px solid #ffe082',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 10
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: '#b26a00' }}>
                          ⚡ Admin Status Controller:
                        </span>
                        <span style={{ fontSize: 12, color: '#666' }}>
                          (Click to update status in SQL Server)
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {STATUS_STEPS.map((step) => {
                          const isCurrent = order.status === step;
                          const isUpdating = updatingOrderId === order.id;
                          return (
                            <button
                              key={step}
                              disabled={isUpdating || isCurrent}
                              onClick={() => handleUpdateStatus(order.id, step)}
                              style={{
                                padding: '6px 12px',
                                borderRadius: 4,
                                border: isCurrent ? '2px solid #b26a00' : '1px solid #dcdcdc',
                                background: isCurrent ? '#ff9f00' : '#ffffff',
                                color: isCurrent ? '#000' : '#333',
                                fontWeight: isCurrent ? 800 : 600,
                                fontSize: 12,
                                cursor: isCurrent ? 'default' : 'pointer',
                                opacity: isCurrent ? 1 : 0.85,
                                boxShadow: isCurrent ? '0 1px 3px rgba(0,0,0,0.2)' : 'none',
                                transition: 'all 0.15s'
                              }}
                            >
                              {step} {isCurrent && '✓'}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 2: PRODUCTS & INVENTORY MANAGEMENT ================= */}
      {activeTab === 'products' && (
        <div>
          {/* Top Action Bar */}
          <div style={{
            background: '#fff',
            padding: 16,
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', flex: 1 }}>
              <div style={{ position: 'relative', minWidth: 260, flex: 1, maxWidth: 360 }}>
                <Search size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search products by name or brand..."
                  value={productSearchQuery}
                  onChange={(e) => setProductSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 36px',
                    borderRadius: 6,
                    border: '1px solid var(--border-light)',
                    fontSize: 13
                  }}
                />
              </div>

              <select
                value={productCategoryFilter}
                onChange={(e) => setProductCategoryFilter(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: 6,
                  border: '1px solid var(--border-light)',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <option value="All">All Categories</option>
                <option value="Mobiles">Mobiles</option>
                <option value="Electronics">Electronics</option>
                <option value="Appliances">Appliances</option>
                <option value="Fashion">Fashion</option>
                <option value="Home & Kitchen">Home &amp; Kitchen</option>
                <option value="Grocery">Grocery</option>
              </select>
            </div>

            <button
              onClick={() => setIsAddProductModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'linear-gradient(135deg, #2874f0 0%, #0052cc 100%)',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: 6,
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(40,116,240,0.3)',
                transition: 'all 0.2s'
              }}
            >
              <Plus size={18} />
              <span>Add New Product &amp; Image</span>
            </button>
          </div>

          {/* Products List */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', background: '#fff', borderRadius: 'var(--radius-md)' }}>
              <div className="spinner" style={{ margin: '0 auto 16px' }}></div>
              <p style={{ color: 'var(--text-muted)' }}>Loading products database...</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 16
            }}>
              {products
                .filter((p) => {
                  const matchesCategory = productCategoryFilter === 'All' || p.category?.toLowerCase() === productCategoryFilter.toLowerCase();
                  const q = productSearchQuery.toLowerCase().trim();
                  const matchesSearch = !q || p.name?.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q);
                  return matchesCategory && matchesSearch;
                })
                .map((prod) => (
                  <div
                    key={prod.id}
                    style={{
                      background: '#fff',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-sm)',
                      border: '1px solid var(--border-light)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ position: 'relative', height: 180, background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img
                        src={prod.imageUrl}
                        alt={prod.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';
                        }}
                        style={{
                          maxHeight: '100%',
                          maxWidth: '100%',
                          objectFit: 'contain',
                          padding: 10
                        }}
                      />
                      <span style={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        background: 'rgba(0,0,0,0.7)',
                        color: '#fff',
                        fontSize: 11,
                        padding: '2px 8px',
                        borderRadius: 4,
                        fontWeight: 600
                      }}>
                        {prod.category}
                      </span>
                      <button
                        onClick={() => handleDeleteProduct(prod.id, prod.name)}
                        title="Delete Product"
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          background: 'rgba(255,255,255,0.9)',
                          color: '#e53935',
                          border: 'none',
                          borderRadius: '50%',
                          width: 32,
                          height: 32,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ padding: 14, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>{prod.brand}</div>
                      <h4 style={{ fontSize: 14, fontWeight: 700, margin: '4px 0 8px', lineHeight: 1.3, height: 38, overflow: 'hidden' }}>
                        {prod.name}
                      </h4>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12, lineHeight: 1.4, flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {prod.description}
                      </p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: 10 }}>
                        <div>
                          <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-dark)' }}>
                            ₹{(prod.discountPrice || prod.price).toLocaleString('en-IN')}
                          </span>
                          {prod.discountPrice && prod.discountPrice < prod.price && (
                            <span style={{ fontSize: 12, textDecoration: 'line-through', color: 'var(--text-muted)', marginLeft: 6 }}>
                              ₹{prod.price.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{
                            background: '#388e3c',
                            color: '#fff',
                            fontSize: 11,
                            fontWeight: 700,
                            padding: '2px 6px',
                            borderRadius: 4
                          }}>
                            ★ {prod.rating || 4.5}
                          </span>
                          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>
                            Stock: {prod.stock || 10}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* ADD PRODUCT MODAL */}
          {isAddProductModalOpen && (
            <div style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.65)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: 20
            }}>
              <div style={{
                background: '#fff',
                borderRadius: 'var(--radius-md)',
                maxWidth: 680,
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: 'var(--shadow-lg)',
                padding: 24,
                position: 'relative'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: 12, marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Plus size={20} color="var(--primary)" />
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-dark)' }}>Add New Product with Image</h3>
                  </div>
                  <button
                    onClick={() => setIsAddProductModalOpen(false)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, display: 'block', marginBottom: 4 }}>
                      Product Title / Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apple iPhone 16 Pro Max (Desert Titanium, 256 GB)"
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', fontSize: 13 }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, display: 'block', marginBottom: 4 }}>
                        Category *
                      </label>
                      <select
                        value={productForm.category}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', fontSize: 13 }}
                      >
                        <option value="Mobiles">Mobiles</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Appliances">Appliances</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Home & Kitchen">Home &amp; Kitchen</option>
                        <option value="Grocery">Grocery</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, display: 'block', marginBottom: 4 }}>
                        Brand *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Apple, Samsung, Sony, Nike"
                        value={productForm.brand}
                        onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', fontSize: 13 }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, display: 'block', marginBottom: 4 }}>
                        Original Price (₹) *
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        placeholder="e.g. 14999"
                        value={productForm.price}
                        onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', fontSize: 13 }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, display: 'block', marginBottom: 4 }}>
                        Discount Price (₹)
                      </label>
                      <input
                        type="number"
                        min="1"
                        placeholder="e.g. 12999"
                        value={productForm.discountPrice}
                        onChange={(e) => setProductForm({ ...productForm, discountPrice: e.target.value })}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', fontSize: 13 }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, display: 'block', marginBottom: 4 }}>
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={productForm.stock}
                        onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', fontSize: 13 }}
                      />
                    </div>
                  </div>

                  {/* IMAGE URL WITH LIVE PREVIEW */}
                  <div style={{ background: '#f8f9fa', padding: 14, borderRadius: 8, border: '1px dashed #ccc' }}>
                    <label style={{ fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <ImageIcon size={15} color="var(--primary)" />
                      Product Image URL *
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://images.unsplash.com/photo-..."
                      value={productForm.imageUrl}
                      onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', fontSize: 13, marginBottom: 8 }}
                    />

                    {/* Quick Image Presets */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>Quick sample images:</span>
                      {SAMPLE_IMAGE_PRESETS.map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => setProductForm({ ...productForm, imageUrl: preset.url })}
                          style={{
                            background: '#e3f2fd',
                            color: '#1565c0',
                            border: '1px solid #bbdefb',
                            borderRadius: 4,
                            padding: '2px 8px',
                            fontSize: 11,
                            cursor: 'pointer',
                            fontWeight: 600
                          }}
                        >
                          + {preset.label}
                        </button>
                      ))}
                    </div>

                    {/* Live Image Preview */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 90,
                        height: 90,
                        borderRadius: 6,
                        border: '1px solid #ddd',
                        background: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                      }}>
                        {productForm.imageUrl ? (
                          <img
                            src={productForm.imageUrl}
                            alt="Preview"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';
                            }}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <span style={{ fontSize: 10, color: 'var(--text-muted)', textAlign: 'center', padding: 4 }}>
                            No Image
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.4 }}>
                        <strong>Live Image Preview:</strong> Make sure the image is clearly visible here before saving. You can paste any direct web image URL (Unsplash, CDN, or Cloudinary).
                      </div>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, display: 'block', marginBottom: 4 }}>
                      Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Detailed features, specifications, and warranty details..."
                      value={productForm.description}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', fontSize: 13, resize: 'vertical' }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
                    <button
                      type="button"
                      onClick={() => setIsAddProductModalOpen(false)}
                      style={{
                        padding: '10px 18px',
                        borderRadius: 6,
                        border: '1px solid #ccc',
                        background: '#fff',
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submittingProduct}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '10px 22px',
                        borderRadius: 6,
                        border: 'none',
                        background: 'linear-gradient(135deg, #2874f0 0%, #0052cc 100%)',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: submittingProduct ? 'not-allowed' : 'pointer',
                        opacity: submittingProduct ? 0.7 : 1
                      }}
                    >
                      {submittingProduct ? (
                        <>
                          <RotateCw size={15} className="animate-spin" />
                          <span>Saving to SQL Server...</span>
                        </>
                      ) : (
                        <>
                          <Plus size={16} />
                          <span>Save &amp; Publish Product</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 3: CUSTOMERS DATABASE ================= */}
      {activeTab === 'customers' && (
        <div style={{ background: '#fff', borderRadius: 'var(--radius-md)', padding: 20, boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
            Registered Customers in SQL Server (`Users` Table)
          </h3>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div className="spinner" style={{ margin: '0 auto 16px' }}></div>
              <p style={{ color: 'var(--text-muted)' }}>Loading customers...</p>
            </div>
          ) : customers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              No customer records found.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#f5f5f5', borderBottom: '2px solid #e0e0e0' }}>
                    <th style={{ padding: '10px 14px' }}>User ID</th>
                    <th style={{ padding: '10px 14px' }}>Full Name</th>
                    <th style={{ padding: '10px 14px' }}>Mobile Number</th>
                    <th style={{ padding: '10px 14px' }}>Email Address</th>
                    <th style={{ padding: '10px 14px' }}>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((c) => (
                    <tr key={c.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--primary)' }}>#{c.id}</td>
                      <td style={{ padding: '12px 14px', fontWeight: 600 }}>{c.fullName}</td>
                      <td style={{ padding: '12px 14px' }}>{c.phoneNumber || '—'}</td>
                      <td style={{ padding: '12px 14px', color: 'var(--text-muted)' }}>{c.email}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{
                          background: '#e8f5e9',
                          color: '#2e7d32',
                          fontWeight: 700,
                          fontSize: 11,
                          padding: '2px 8px',
                          borderRadius: 4
                        }}>
                          {c.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
