import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CheckoutForm from '../components/CheckoutForm';
import CartSummary from '../components/CartSummary';
import { validateCityPincodeMatch } from '../data/indiaLocations';

export default function Checkout({ onProceedToPayment, onBackToCart, onOpenLogin }) {
  const { cart } = useCart();
  const { user, addresses = [], selectedAddress } = useAuth();

  const activeAddr = selectedAddress || (Array.isArray(addresses) && addresses[0]) || null;

  const [formData, setFormData] = useState({
    customerName: activeAddr?.fullName || user?.fullName || '',
    phoneNumber: activeAddr?.mobileNumber || user?.phoneNumber || '',
    email: user?.email || '',
    shippingAddress: activeAddr?.addressLine || '',
    city: activeAddr?.city || '',
    state: activeAddr?.state || '',
    pincode: activeAddr?.pincode || '',
    paymentMethod: 'UPI',
  });

  // Keep form data synchronized with customer's active chosen address
  useEffect(() => {
    if (activeAddr) {
      setFormData((prev) => ({
        ...prev,
        customerName: activeAddr.fullName || prev.customerName,
        phoneNumber: activeAddr.mobileNumber || prev.phoneNumber,
        shippingAddress: activeAddr.addressLine || prev.shippingAddress,
        city: activeAddr.city || prev.city,
        state: activeAddr.state || prev.state,
        pincode: activeAddr.pincode || prev.pincode,
      }));
    }
  }, [activeAddr]);

  const [validationError, setValidationError] = useState('');

  const handlePlaceOrderClick = () => {
    setValidationError('');

    if (!user) {
      setValidationError('Please log in with your mobile number or email before placing your order.');
      if (onOpenLogin) onOpenLogin();
      return;
    }

    if (!formData.customerName.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }
    if (!formData.phoneNumber.trim() || formData.phoneNumber.length < 10) {
      setValidationError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!formData.shippingAddress.trim()) {
      setValidationError('Please enter delivery street address.');
      return;
    }
    if (!formData.city.trim() || !formData.state.trim() || !formData.pincode.trim()) {
      setValidationError('Please fill in city, state, and pincode.');
      return;
    }

    const pinCheck = validateCityPincodeMatch(formData.city, formData.pincode);
    if (pinCheck.isValid === false) {
      setValidationError(`${pinCheck.error} ${pinCheck.correctPincode ? `Suggested correct PIN for ${formData.city} is ${pinCheck.correctPincode}.` : ''}`);
      return;
    }

    onProceedToPayment(formData);
  };

  const items = Array.isArray(cart?.items) ? cart.items : [];

  return (
    <div className="cart-layout" style={{ marginTop: 20 }}>
      {/* Left: Address Selection & Form + Items Review */}
      <div>
        <button
          onClick={onBackToCart}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            color: 'var(--primary)',
            fontWeight: 700,
            fontSize: 14,
            marginBottom: 16,
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={18} />
          <span>Back to Cart</span>
        </button>

        {!user && (
          <div style={{
            background: '#fff8e1',
            border: '1.5px solid #ffe082',
            padding: '14px 18px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 10
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#b26a00' }}>
                Customer Login Required to Place Order
              </div>
              <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>
                Please sign in with your mobile number or email address to save order details.
              </div>
            </div>
            <button
              type="button"
              onClick={onOpenLogin}
              style={{
                background: 'var(--primary)',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: 4,
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Log In Now
            </button>
          </div>
        )}

        {validationError && (
          <div style={{ background: '#ffebee', color: '#c62828', padding: '12px 16px', borderRadius: 'var(--radius-sm)', marginBottom: 16, fontWeight: 600, fontSize: 14 }}>
            {validationError}
          </div>
        )}

        {/* 1. Address Form */}
        <CheckoutForm
          formData={formData}
          setFormData={setFormData}
          addresses={addresses}
        />

        {/* 2. Order Items Review Preview */}
        <div style={{ background: '#fff', padding: 20, borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', marginTop: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>
            Order Summary ({cart?.totalItems || items.length} Items)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {items.map((item) => {
              const itemPrice = item.discountPrice || item.product?.discountPrice || item.price || 0;
              const itemName = item.productName || item.product?.name || 'Product';
              const itemImg = item.productImageUrl || item.product?.imageUrl || '';
              return (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 10, borderBottom: '1px solid var(--border-light)' }}>
                  {itemImg && (
                    <img src={itemImg} alt={itemName} style={{ width: 44, height: 44, objectFit: 'contain' }} />
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{itemName}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Qty: {item.quantity}</div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>
                    ₹{(itemPrice * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right: Price Summary */}
      <CartSummary
        cart={cart}
        onProceed={handlePlaceOrderClick}
        buttonText="Continue to Payment"
      />
    </div>
  );
}
