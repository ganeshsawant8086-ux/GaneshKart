import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare, PhoneCall, Mail } from 'lucide-react';

const FAQS = [
  {
    q: 'How does GaneshKart simulated dummy payment work?',
    a: 'GaneshKart is an educational full-stack e-commerce application. Payments are safely simulated with mock validation (UPI, Credit/Debit Card, and Cash on Delivery), generating realistic Transaction IDs like GKTXN202609291234 without touching real money.'
  },
  {
    q: 'How do I test order status transitions?',
    a: 'Go to "My Orders" after checkout. Every order has interactive status buttons: [Order Placed], [Confirmed], [Packed], [Shipped], and [Delivered]. Clicking any button will immediately update the status in SQL Server and refresh the tracker timeline!'
  },
  {
    q: 'How are delivery charges calculated?',
    a: 'Orders above ₹500 receive 100% Free Delivery. For orders of ₹500 or less, a nominal ₹40 standard delivery charge is applied.'
  },
  {
    q: 'What is the GaneshKart return and replacement policy?',
    a: 'We offer a 7-day hassle-free replacement on all electronics, mobiles, and appliances with GaneshKart Assured seal.'
  }
];

export default function HelpSupportPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="section-wrapper" style={{ marginTop: 24, maxWidth: 840 }}>
      <div style={{ background: '#fff', borderRadius: 'var(--radius-md)', padding: 24, boxShadow: 'var(--shadow-sm)' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
          <HelpCircle size={22} color="var(--primary)" />
          <span>GaneshKart Help & Support Center</span>
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>
          Frequently asked questions and 24x7 customer support assistance.
        </p>

        {/* Contact Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <PhoneCall size={24} color="var(--primary)" />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Toll Free 24x7</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>1800 208 9898</div>
            </div>
          </div>
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Mail size={24} color="var(--success-green)" />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Customer Email</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>support@ganeshkart.com</div>
            </div>
          </div>
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <MessageSquare size={24} color="#ff9f00" />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Chat Support</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Live Assistant Ready</div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Frequently Asked Questions</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden'
                }}
              >
                <div
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  style={{
                    padding: '14px 16px',
                    background: isOpen ? '#f7f9fd' : '#fff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: 14
                  }}
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
                {isOpen && (
                  <div style={{ padding: '12px 16px 16px', fontSize: 13, color: '#424242', lineHeight: 1.6, background: '#fff' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
