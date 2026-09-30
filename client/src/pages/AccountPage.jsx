import React, { useState } from 'react';
import { User, MapPin, Package, Heart, Plus, Trash2, CheckCircle2, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import LocationAutocomplete from '../components/LocationAutocomplete';
import { validateCityPincodeMatch } from '../data/indiaLocations';

export default function AccountPage({ onNavigate }) {
  const { user, addresses, refreshAddresses } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalError, setModalError] = useState('');

  const initialBlankAddress = {
    fullName: '',
    mobileNumber: '',
    pincode: '',
    addressLine: '',
    city: '',
    state: '',
    landmark: '',
    addressType: 'Home',
    isDefault: false,
  };

  const [newAddr, setNewAddr] = useState(initialBlankAddress);

  const handleOpenAddModal = () => {
    setNewAddr({ ...initialBlankAddress });
    setModalError('');
    setShowAddModal(true);
  };

  const handleCitySelect = (item) => {
    setNewAddr((prev) => ({
      ...prev,
      city: item.city,
      state: item.state || prev.state,
      pincode: item.pincode || prev.pincode,
    }));
  };

  const handleStateSelect = (stateName) => {
    setNewAddr((prev) => ({
      ...prev,
      state: stateName,
    }));
  };

  const handleCreateAddress = async (e) => {
    e.preventDefault();
    setModalError('');

    if (!newAddr.fullName.trim() || !newAddr.mobileNumber.trim() || !newAddr.addressLine.trim()) {
      setModalError('Please fill in all required fields.');
      return;
    }

    if (!newAddr.city.trim() || !newAddr.state.trim() || !newAddr.pincode.trim()) {
      setModalError('Please enter city, state, and 6-digit PIN code.');
      return;
    }

    const check = validateCityPincodeMatch(newAddr.city, newAddr.pincode);
    if (check.isValid === false) {
      setModalError(`${check.error} ${check.correctPincode ? `Suggested correct PIN for ${newAddr.city} is ${check.correctPincode}.` : ''}`);
      return;
    }

    try {
      await api.addAddress(newAddr);
      setShowAddModal(false);
      refreshAddresses();
      alert('Address added successfully!');
    } catch (err) {
      setModalError('Failed to save address: ' + err.message);
    }
  };

  // Component-level real-time pincode validation for JSX rendering
  const pinCheck = validateCityPincodeMatch(newAddr.city, newAddr.pincode);

  return (
    <div className="section-wrapper" style={{ marginTop: 24, maxWidth: 960 }}>
      {/* Profile Header Card */}
      <div style={{ background: '#fff', borderRadius: 'var(--radius-md)', padding: 24, boxShadow: 'var(--shadow-sm)', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            fontWeight: 800
          }}>
            {user ? user.fullName.charAt(0) : 'G'}
          </div>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800 }}>{user?.fullName || 'Ganesh Sharma'}</h1>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
              {user?.email || 'ganesh@ganeshkart.com'} • {user?.phoneNumber || '+91 98765 43210'}
            </div>
            <span style={{
              display: 'inline-block',
              background: '#e3f2fd',
              color: 'var(--primary)',
              fontSize: 11,
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: 4,
              marginTop: 6
            }}>
              GaneshKart Plus Member
            </span>
          </div>
        </div>

        {/* Quick Shortcuts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border-light)' }}>
          <button
            onClick={() => onNavigate('orders')}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 12, background: '#f8fafc', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 13 }}
          >
            <Package size={18} color="var(--primary)" />
            <span>My Orders</span>
          </button>
          <button
            onClick={() => onNavigate('wishlist')}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 12, background: '#f8fafc', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 13 }}
          >
            <Heart size={18} color="#e91e63" />
            <span>My Wishlist</span>
          </button>
          <button
            onClick={() => onNavigate('cart')}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 12, background: '#f8fafc', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 13 }}
          >
            <CheckCircle2 size={18} color="var(--success-green)" />
            <span>Active Cart</span>
          </button>
        </div>
      </div>

      {/* Saved Addresses Section */}
      <div style={{ background: '#fff', borderRadius: 'var(--radius-md)', padding: 24, boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
            <MapPin size={20} color="var(--primary)" />
            <span>Saved Delivery Addresses</span>
          </h2>
          <button
            onClick={handleOpenAddModal}
            style={{
              color: 'var(--primary)',
              fontWeight: 700,
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}
          >
            <Plus size={16} />
            <span>Add New Address</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {addresses.map((addr) => (
            <div
              key={addr.id}
              style={{
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: 16,
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{addr.fullName}</span>
                <span style={{
                  background: '#f0f0f0',
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: 3,
                  textTransform: 'uppercase'
                }}>
                  {addr.addressType}
                </span>
                {addr.isDefault && (
                  <span style={{ fontSize: 11, color: 'var(--success-green)', fontWeight: 700 }}>
                    Default
                  </span>
                )}
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{addr.mobileNumber}</span>
              </div>
              <p style={{ fontSize: 13, color: '#424242', lineHeight: 1.4 }}>
                {addr.addressLine}, {addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddModal && (
        <div 
          className="payment-processing-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAddModal(false);
          }}
        >
          <div style={{ background: '#ffffff', padding: 28, borderRadius: 'var(--radius-md)', width: '100%', maxWidth: 520, textAlign: 'left', boxShadow: '0 10px 30px rgba(0,0,0,0.25)', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: 'var(--text-dark)' }}>Add Delivery Address</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                title="Close"
                style={{ color: '#757575', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}
              >
                <X size={20} />
              </button>
            </div>
            {modalError && (
              <div style={{ background: '#ffebee', color: '#c62828', padding: '10px 14px', borderRadius: 4, marginBottom: 14, fontSize: 13, fontWeight: 600 }}>
                {modalError}
              </div>
            )}
            <form onSubmit={handleCreateAddress}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter Full Name"
                  className="form-input"
                  value={newAddr.fullName}
                  onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  className="form-input"
                  value={newAddr.mobileNumber}
                  onChange={(e) => setNewAddr({ ...newAddr, mobileNumber: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Address Line *</label>
                <input
                  type="text"
                  required
                  placeholder="Flat/House No, Building, Street, Area"
                  className="form-input"
                  value={newAddr.addressLine}
                  onChange={(e) => setNewAddr({ ...newAddr, addressLine: e.target.value })}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 0.8fr', gap: 10 }}>
                <LocationAutocomplete
                  type="city"
                  label="City / Town *"
                  name="city"
                  placeholder="Enter City / Town"
                  value={newAddr.city}
                  onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                  onSelect={handleCitySelect}
                  required
                />

                <LocationAutocomplete
                  type="state"
                  label="State *"
                  name="state"
                  placeholder="Enter State"
                  value={newAddr.state}
                  onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                  onSelect={handleStateSelect}
                  required
                />
                <div className="form-group">
                  <label className="form-label">Pincode *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="Enter 6-digit Pincode"
                    className="form-input"
                    value={newAddr.pincode}
                    onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                    style={{
                      borderColor: pinCheck.status === 'mismatch' || pinCheck.status === 'invalid_format' ? '#d32f2f' : undefined,
                      backgroundColor: pinCheck.status === 'mismatch' ? '#fff8f8' : undefined
                    }}
                  />
                </div>
              </div>

              {/* Pincode Matching & Error Alerts in Modal */}
              {pinCheck.status === 'mismatch' && (
                <div style={{ marginTop: 6, marginBottom: 12, fontSize: 12, color: '#c62828', background: '#ffebee', padding: '8px 12px', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6, border: '1px solid #ffcdd2' }}>
                  <div>
                    <strong>❌ Wrong PIN code:</strong> {pinCheck.error}
                    {pinCheck.pinBelongsTo && (
                      <span style={{ display: 'block', fontSize: 11, color: '#b71c1c' }}>
                        (PIN {newAddr.pincode} belongs to {pinCheck.pinBelongsTo})
                      </span>
                    )}
                  </div>
                  {pinCheck.correctPincode && (
                    <button
                      type="button"
                      onClick={() => setNewAddr(prev => ({ ...prev, pincode: pinCheck.correctPincode }))}
                      style={{
                        background: '#c62828',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        padding: '4px 10px',
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                      }}
                    >
                      Use Correct PIN: {pinCheck.correctPincode}
                    </button>
                  )}
                </div>
              )}

              {pinCheck.status === 'invalid_format' && (
                <div style={{ marginTop: 6, marginBottom: 12, fontSize: 12, color: '#c62828', background: '#ffebee', padding: '6px 10px', borderRadius: 4, border: '1px solid #ffcdd2' }}>
                  <span>❌ {pinCheck.error}</span>
                </div>
              )}

              {pinCheck.status === 'valid' && (
                <div style={{ marginTop: 6, marginBottom: 12, fontSize: 12, color: '#2e7d32', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
                  <CheckCircle2 size={14} color="#2e7d32" />
                  <span>{pinCheck.message}</span>
                </div>
              )}

              {pinCheck.status === 'detected_city' && (
                <div style={{ marginTop: 6, marginBottom: 12, fontSize: 12, color: '#1565c0', background: '#e3f2fd', padding: '6px 12px', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6, border: '1px solid #bbdefb' }}>
                  <span>📍 {pinCheck.message}</span>
                  <button
                    type="button"
                    onClick={() => setNewAddr(prev => ({
                      ...prev,
                      city: pinCheck.detectedLocation.city,
                      state: pinCheck.detectedLocation.state
                    }))}
                    style={{
                      background: '#1565c0',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 4,
                      padding: '3px 8px',
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Apply to City & State
                  </button>
                </div>
              )}
              <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                <button type="submit" className="btn-proceed" style={{ margin: 0, flex: 1 }}>
                  Save Address
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{ padding: '10px 18px', border: '1px solid var(--border-color)', borderRadius: 4, fontWeight: 600 }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
