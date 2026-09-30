import React, { useState } from 'react';
import { Smartphone, CreditCard, Banknote, ShieldCheck, Lock } from 'lucide-react';
import { api } from '../services/api';

export default function PaymentForm({ amount, onPaymentSuccess }) {
  const [selectedMethod, setSelectedMethod] = useState('UPI'); // 'UPI', 'Credit Card', 'Debit Card', 'Cash on Delivery'
  const [upiId, setUpiId] = useState('ganesh@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 8921 7843 9012');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('11/28');
  const [cvv, setCvv] = useState('489');
  const [captchaInput, setCaptchaInput] = useState('7842');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePayNow = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (selectedMethod === 'UPI') {
      if (!upiId || !upiId.includes('@')) {
        setErrorMessage('Please enter a valid UPI ID (e.g. yourname@upi)');
        return;
      }
    } else if (selectedMethod === 'Credit Card' || selectedMethod === 'Debit Card') {
      const clean = cardNumber.replace(/\s+/g, '');
      if (clean.length !== 16 || isNaN(clean)) {
        setErrorMessage('Please enter a valid 16-digit card number.');
        return;
      }
      if (!expiry || !expiry.includes('/')) {
        setErrorMessage('Please enter a valid expiry (MM/YY).');
        return;
      }
      if (!cvv || cvv.length < 3 || isNaN(cvv)) {
        setErrorMessage('Please enter a valid 3-digit CVV.');
        return;
      }
    }

    // Start simulated processing
    setIsProcessing(true);

    try {
      // Simulate realistic payment gateway processing delay (1.8 seconds)
      await new Promise((resolve) => setTimeout(resolve, 1800));

      const payload = {
        paymentMethod: selectedMethod,
        amount: amount,
        upiId: selectedMethod === 'UPI' ? upiId : null,
        cardNumber: selectedMethod.includes('Card') ? cardNumber : null,
        cardHolderName: selectedMethod.includes('Card') ? cardHolder : null,
        expiryDate: selectedMethod.includes('Card') ? expiry : null,
        cvv: selectedMethod.includes('Card') ? cvv : null,
      };

      const result = await api.processDummyPayment(payload);
      setIsProcessing(false);
      onPaymentSuccess(result);
    } catch (err) {
      setIsProcessing(false);
      setErrorMessage(err.message || 'Payment simulation failed. Please try again.');
    }
  };

  return (
    <div className="payment-box">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700 }}>Choose Payment Method</h3>
        <span style={{ fontSize: 13, background: '#e8f5e9', color: '#2e7d32', padding: '4px 10px', borderRadius: 4, fontWeight: 700 }}>
          Simulated Dummy Gateway
        </span>
      </div>

      {errorMessage && (
        <div style={{ background: '#ffebee', color: '#c62828', padding: '10px 14px', borderRadius: 4, marginBottom: 16, fontSize: 13, fontWeight: 600 }}>
          {errorMessage}
        </div>
      )}

      {/* Methods Tabs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* UPI */}
        <div
          className={`payment-method-tab ${selectedMethod === 'UPI' ? 'selected' : ''}`}
          onClick={() => setSelectedMethod('UPI')}
        >
          <Smartphone size={22} color="var(--primary)" />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>UPI (Google Pay, PhonePe, Paytm, BHIM)</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Pay instantly via your UPI ID</div>
          </div>
          <input type="radio" checked={selectedMethod === 'UPI'} onChange={() => setSelectedMethod('UPI')} />
        </div>

        {selectedMethod === 'UPI' && (
          <div style={{ background: '#fafafa', padding: 16, borderRadius: 'var(--radius-sm)', border: '1px solid #e0e0e0', marginBottom: 12 }}>
            <label className="form-label">Enter Virtual Payment Address (UPI ID) *</label>
            <input
              type="text"
              className="form-input"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="e.g. mobile@upi or username@okhdfcbank"
            />
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
              A simulated collect request will be approved automatically.
            </div>
          </div>
        )}

        {/* Credit Card */}
        <div
          className={`payment-method-tab ${selectedMethod === 'Credit Card' ? 'selected' : ''}`}
          onClick={() => setSelectedMethod('Credit Card')}
        >
          <CreditCard size={22} color="#1565c0" />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Credit Card</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Visa, MasterCard, Rupay, Amex</div>
          </div>
          <input type="radio" checked={selectedMethod === 'Credit Card'} onChange={() => setSelectedMethod('Credit Card')} />
        </div>

        {/* Debit Card */}
        <div
          className={`payment-method-tab ${selectedMethod === 'Debit Card' ? 'selected' : ''}`}
          onClick={() => setSelectedMethod('Debit Card')}
        >
          <CreditCard size={22} color="#00897b" />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Debit Card</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>All major Indian banks supported</div>
          </div>
          <input type="radio" checked={selectedMethod === 'Debit Card'} onChange={() => setSelectedMethod('Debit Card')} />
        </div>

        {(selectedMethod === 'Credit Card' || selectedMethod === 'Debit Card') && (
          <div style={{ background: '#fafafa', padding: 16, borderRadius: 'var(--radius-sm)', border: '1px solid #e0e0e0', marginBottom: 12 }}>
            <div className="form-group">
              <label className="form-label">Card Number *</label>
              <input
                type="text"
                className="form-input"
                maxLength={19}
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="16-digit card number"
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Expiry (MM/YY) *</label>
                <input
                  type="text"
                  className="form-input"
                  maxLength={5}
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="11/28"
                />
              </div>
              <div className="form-group">
                <label className="form-label">CVV *</label>
                <input
                  type="password"
                  className="form-input"
                  maxLength={4}
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="3 digits"
                />
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Cardholder Name *</label>
              <input
                type="text"
                className="form-input"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                placeholder="Name on card"
              />
            </div>
          </div>
        )}

        {/* Cash on Delivery */}
        <div
          className={`payment-method-tab ${selectedMethod === 'Cash on Delivery' ? 'selected' : ''}`}
          onClick={() => setSelectedMethod('Cash on Delivery')}
        >
          <Banknote size={22} color="var(--success-green)" />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Cash on Delivery</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Pay with cash or UPI upon delivery</div>
          </div>
          <input type="radio" checked={selectedMethod === 'Cash on Delivery'} onChange={() => setSelectedMethod('Cash on Delivery')} />
        </div>

        {selectedMethod === 'Cash on Delivery' && (
          <div style={{ background: '#fafafa', padding: 16, borderRadius: 'var(--radius-sm)', border: '1px solid #e0e0e0', marginBottom: 12 }}>
            <p style={{ fontSize: 13, color: '#424242', marginBottom: 10 }}>
              Due to handling procedures, please keep exact change ready at delivery time.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{
                background: '#e0e0e0',
                padding: '8px 16px',
                fontWeight: 800,
                letterSpacing: 3,
                fontSize: 18,
                borderRadius: 4
              }}>
                7842
              </span>
              <input
                type="text"
                className="form-input"
                style={{ maxWidth: 160 }}
                placeholder="Enter characters"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Pay / Confirm Button */}
      <button
        className="btn-proceed"
        onClick={handlePayNow}
        disabled={isProcessing}
        style={{ marginTop: 24 }}
      >
        <Lock size={18} />
        <span>
          {selectedMethod === 'Cash on Delivery'
            ? `Confirm Order of ₹${amount?.toLocaleString('en-IN')}`
            : `Pay ₹${amount?.toLocaleString('en-IN')} via Dummy Gateway`}
        </span>
      </button>

      {/* Security Reassurance */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 14, color: 'var(--text-muted)', fontSize: 12 }}>
        <ShieldCheck size={16} color="var(--success-green)" />
        <span>256-bit SSL Dummy Encrypted Simulation</span>
      </div>

      {/* Processing Animation Modal */}
      {isProcessing && (
        <div className="payment-processing-overlay">
          <div className="payment-processing-card">
            <div className="spinner"></div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-dark)' }}>
              Processing Payment...
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Connecting to GaneshKart simulated dummy gateway for ₹{amount?.toLocaleString('en-IN')}. Please do not refresh or close this window.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--primary)', fontSize: 12, fontWeight: 600 }}>
              <Lock size={14} />
              <span>Verifying {selectedMethod}...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
