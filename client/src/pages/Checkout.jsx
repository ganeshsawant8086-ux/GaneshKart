import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CheckoutForm from '../components/CheckoutForm';
import CartSummary from '../components/CartSummary';
import { validateCityPincodeMatch } from '../data/indiaLocations';

export default function Checkout({ onProceedToPayment, onBackToCart }) {
  const { cart } = useCart();
  const { user, addresses, selectedAddress } = useAuth();

  const activeAddr = selectedAddress || addresses[0] || null;

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
            marginBottom: 16
          }}
        >
          <ArrowLeft size={18} />
          <span>Back to Cart</span>
        </button>

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
            Order Summary ({cart.totalItems} Items)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {cart.items.map((item) => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 10, borderBottom: '1px solid var(--border-light)' }}>
                <img src={item.productImageUrl} alt={item.productName} style={{ width: 44, height: 44, objectFit: 'contain' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{item.productName}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Qty: {item.quantity}</div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>
                  ₹{(item.discountPrice * item.quantity).toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Price Summary */}
      <CartSummary
        cart={cart}
        onProceed={handlePlaceOrderClick}
        buttonText="Place Dummy Order"
      />
    </div>
  );
}
