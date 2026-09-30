import React, { useState } from 'react';
import { MapPin, Plus, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LocationAutocomplete from './LocationAutocomplete';
import { validateCityPincodeMatch } from '../data/indiaLocations';

export default function CheckoutForm({ formData, setFormData, onPlaceOrder, addresses = [] }) {
  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id || null);
  const [isAddingNew, setIsAddingNew] = useState(addresses.length === 0);

  const handleSelectAddress = (addr) => {
    setSelectedAddressId(addr.id);
    setIsAddingNew(false);
    setFormData((prev) => ({
      ...prev,
      customerName: addr.fullName,
      phoneNumber: addr.mobileNumber,
      shippingAddress: addr.addressLine,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
    }));
  };

  const handleToggleAddNew = () => {
    if (!isAddingNew) {
      setIsAddingNew(true);
      setSelectedAddressId(null);
      // Clean blank data for new address
      setFormData((prev) => ({
        ...prev,
        customerName: '',
        phoneNumber: '',
        email: prev.email || '',
        shippingAddress: '',
        city: '',
        state: '',
        pincode: '',
      }));
    } else {
      setIsAddingNew(false);
      if (addresses.length > 0) {
        handleSelectAddress(addresses[0]);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCitySelect = (item) => {
    setFormData((prev) => ({
      ...prev,
      city: item.city,
      state: item.state || prev.state,
      pincode: item.pincode || prev.pincode,
    }));
  };

  const handleStateSelect = (stateName) => {
    setFormData((prev) => ({
      ...prev,
      state: stateName,
    }));
  };

  const pincodeValidation = validateCityPincodeMatch(formData.city, formData.pincode);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* 1. Saved Addresses Card */}
      {addresses.length > 0 && (
        <div style={{ background: '#fff', padding: 20, borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
              <MapPin size={18} color="var(--primary)" />
              <span>Select Delivery Address</span>
            </h3>
            <button
              type="button"
              onClick={handleToggleAddNew}
              style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}
            >
              <Plus size={16} />
              <span>{isAddingNew ? 'Use Saved' : 'Add New Address'}</span>
            </button>
          </div>

          {!isAddingNew && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {addresses.map((addr) => {
                const isSelected = selectedAddressId === addr.id;
                return (
                  <div
                    key={addr.id}
                    onClick={() => handleSelectAddress(addr)}
                    style={{
                      border: `1.5px solid ${isSelected ? 'var(--primary)' : 'var(--border-color)'}`,
                      background: isSelected ? '#f5f8ff' : '#fff',
                      borderRadius: 'var(--radius-sm)',
                      padding: 14,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      transition: 'var(--transition)'
                    }}
                  >
                    <input
                      type="radio"
                      name="selectedAddr"
                      checked={isSelected}
                      onChange={() => handleSelectAddress(addr)}
                      style={{ marginTop: 3 }}
                    />
                    <div style={{ flex: 1 }}>
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
                        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{addr.mobileNumber}</span>
                      </div>
                      <p style={{ fontSize: 13, color: '#424242', lineHeight: 1.4 }}>
                        {addr.addressLine}, {addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 2. Customer & Address Form */}
      {(isAddingNew || addresses.length === 0) && (
        <div style={{ background: '#fff', padding: 24, borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
            <MapPin size={18} color="var(--primary)" />
            <span>Enter Delivery Information</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="customerName"
                className="form-input"
                placeholder="e.g. Ganesh Sharma"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mobile Number *</label>
              <input
                type="tel"
                name="phoneNumber"
                className="form-input"
                placeholder="10-digit mobile number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="ganesh@example.com (For order invoice)"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Street Address / House No. / Area *</label>
              <textarea
                name="shippingAddress"
                rows={2}
                className="form-input"
                placeholder="Flat/House No, Building Name, Street Name, Area"
                value={formData.shippingAddress}
                onChange={handleChange}
                required
              />
            </div>

            <LocationAutocomplete
              type="city"
              label="City / Town *"
              name="city"
              placeholder="Enter City / Town"
              value={formData.city}
              onChange={handleChange}
              onSelect={handleCitySelect}
              required
            />

            <LocationAutocomplete
              type="state"
              label="State *"
              name="state"
              placeholder="Enter State"
              value={formData.state}
              onChange={handleChange}
              onSelect={handleStateSelect}
              required
            />

            <div className="form-group">
              <label className="form-label">Pincode *</label>
              <input
                type="text"
                name="pincode"
                className="form-input"
                placeholder="Enter 6-digit Pincode"
                value={formData.pincode}
                onChange={handleChange}
                maxLength={6}
                required
                style={{
                  borderColor: pincodeValidation.status === 'mismatch' || pincodeValidation.status === 'invalid_format' ? '#d32f2f' : undefined,
                  backgroundColor: pincodeValidation.status === 'mismatch' ? '#fff8f8' : undefined
                }}
              />

              {/* Pincode Matching & Error Alerts */}
              {pincodeValidation.status === 'mismatch' && (
                <div style={{ marginTop: 6, fontSize: 12, color: '#c62828', background: '#ffebee', padding: '8px 12px', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6, border: '1px solid #ffcdd2' }}>
                  <div>
                    <strong>❌ Wrong PIN code:</strong> {pincodeValidation.error}
                    {pincodeValidation.pinBelongsTo && (
                      <span style={{ display: 'block', fontSize: 11, color: '#b71c1c' }}>
                        (PIN {formData.pincode} belongs to {pincodeValidation.pinBelongsTo})
                      </span>
                    )}
                  </div>
                  {pincodeValidation.correctPincode && (
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, pincode: pincodeValidation.correctPincode }))}
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
                      Use Correct PIN: {pincodeValidation.correctPincode}
                    </button>
                  )}
                </div>
              )}

              {pincodeValidation.status === 'invalid_format' && (
                <div style={{ marginTop: 6, fontSize: 12, color: '#c62828', background: '#ffebee', padding: '6px 10px', borderRadius: 4, border: '1px solid #ffcdd2' }}>
                  <span>❌ {pincodeValidation.error}</span>
                </div>
              )}

              {pincodeValidation.status === 'valid' && (
                <div style={{ marginTop: 6, fontSize: 12, color: '#2e7d32', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
                  <CheckCircle2 size={14} color="#2e7d32" />
                  <span>{pincodeValidation.message}</span>
                </div>
              )}

              {pincodeValidation.status === 'detected_city' && (
                <div style={{ marginTop: 6, fontSize: 12, color: '#1565c0', background: '#e3f2fd', padding: '6px 12px', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6, border: '1px solid #bbdefb' }}>
                  <span>📍 {pincodeValidation.message}</span>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      city: pincodeValidation.detectedLocation.city,
                      state: pincodeValidation.detectedLocation.state
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
