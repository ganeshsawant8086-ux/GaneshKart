import React, { useState } from 'react';
import PaymentForm from '../components/PaymentForm';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function DummyPayment({ checkoutData, onOrderCompleted, onBackToCheckout }) {
  const { cart, refreshCart } = useCart();
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  const handlePaymentSuccess = async (paymentResult) => {
    setIsSubmittingOrder(true);
    try {
      // Create order in backend API and SQL Server database
      const orderPayload = {
        customerName: checkoutData.customerName,
        phoneNumber: checkoutData.phoneNumber,
        email: checkoutData.email,
        shippingAddress: checkoutData.shippingAddress,
        city: checkoutData.city,
        state: checkoutData.state,
        pincode: checkoutData.pincode,
        paymentMethod: paymentResult.paymentMethod,
        transactionId: paymentResult.transactionId,
      };

      const createdOrder = await api.createOrder(orderPayload);
      await refreshCart(); // Refresh cart to clear
      onOrderCompleted(createdOrder, paymentResult);
    } catch (err) {
      alert('Order creation failed: ' + err.message);
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '24px auto', padding: '0 16px' }}>
      <button
        onClick={onBackToCheckout}
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
        <span>Back to Address</span>
      </button>

      {/* Payment Gateway Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        color: '#fff',
        padding: '20px 24px',
        borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12
      }}>
        <div>
          <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.9 }}>
            GaneshKart Secure Payment Gateway
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4 }}>
            Amount Payable: ₹{cart.finalAmount?.toLocaleString('en-IN')}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', padding: '6px 12px', borderRadius: 4, fontSize: 13 }}>
          <ShieldCheck size={18} />
          <span>Simulated 256-Bit SSL</span>
        </div>
      </div>

      {/* Payment Form Component */}
      <PaymentForm
        amount={cart.finalAmount}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
