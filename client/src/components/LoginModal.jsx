import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, CheckCircle2, ShieldCheck, ArrowRight, Smartphone, Mail, Lock, ShieldAlert, KeyRound, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function LoginModal({ isOpen, onClose, onNavigate }) {
  const { user, login } = useAuth();

  // Tab: 'customer' | 'admin'
  const [authTab, setAuthTab] = useState('customer');

  // Customer Mode: 'phone' or 'email'
  const [loginMode, setLoginMode] = useState('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState('input'); // 'input' | 'otp'
  const [otp, setOtp] = useState(['', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('1234');
  const [timer, setTimer] = useState(30);

  // Admin Mode fields
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const otpInputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('input');
      setPhone('');
      setEmail('');
      setName('');
      setAdminId('');
      setAdminPassword('');
      setError('');
      setIsSuccess(false);
      setSuccessMessage('');
      setOtp(['', '', '', '']);
    }
  }, [isOpen]);

  // OTP countdown timer
  useEffect(() => {
    let interval = null;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  if (!isOpen) return null;

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(val);
    setError('');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleRequestOtp = (e) => {
    e.preventDefault();
    setError('');

    if (loginMode === 'phone') {
      if (!phone || phone.length !== 10) {
        setError('Please enter a valid 10-digit mobile number.');
        return;
      }
    } else {
      if (!email || !email.includes('@') || !email.includes('.')) {
        setError('Please enter a valid email address.');
        return;
      }
    }

    // Generate random 4-digit demo OTP
    const mockOtp = String(Math.floor(1000 + Math.random() * 9000));
    setGeneratedOtp(mockOtp);
    setTimer(30);
    setStep('otp');

    setTimeout(() => {
      otpInputRefs[0]?.current?.focus();
    }, 100);
  };

  const handleOtpChange = (index, value) => {
    const val = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    setError('');

    if (val && index < 3) {
      otpInputRefs[index + 1]?.current?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs[index - 1]?.current?.focus();
    }
  };

  // Customer verification: saves to SQL Server
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');

    if (enteredOtp !== generatedOtp && enteredOtp !== '1234') {
      setError(`Invalid OTP. Please enter the demo OTP shown above (${generatedOtp}).`);
      return;
    }

    try {
      const customerPayload = {
        phoneNumber: phone ? phone : null,
        email: email ? email : null,
        fullName: name.trim() || null,
      };

      const loggedUser = await api.customerAuth(customerPayload);
      login(loggedUser);
      setSuccessMessage(`Welcome back, ${loggedUser.fullName}!`);
      setIsSuccess(true);

      setTimeout(() => {
        onClose();
        if (onNavigate) onNavigate('home');
      }, 1200);
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    }
  };

  // Admin login handler: strictly checks 8668811021 and Admin123!
  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cleanId = adminId.trim();
    const cleanPass = adminPassword.trim();

    if (!cleanId || !cleanPass) {
      setError('Please enter both Admin ID and Password.');
      return;
    }

    if (cleanId !== '8668811021' || cleanPass !== 'Admin123!') {
      setError('Invalid Admin ID or Password. Only authorized administrator can log in.');
      return;
    }

    try {
      const adminUser = await api.adminLogin(cleanId, cleanPass);
      login(adminUser);
      setSuccessMessage('Administrator Verified! Opening Admin Control Portal...');
      setIsSuccess(true);

      setTimeout(() => {
        onClose();
        if (onNavigate) onNavigate('admin-dashboard');
      }, 1200);
    } catch (err) {
      setError(err.message || 'Invalid Admin ID or Password.');
    }
  };

  const isCustomerInputValid = loginMode === 'phone' ? phone.length === 10 : email.includes('@');

  return (
    <div className="login-modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      {/* Outer Close Button */}
      <button className="login-modal-close-btn" onClick={onClose} title="Close Login">
        <X size={26} color="#ffffff" />
      </button>

      {/* Split Modal Card */}
      <div className="login-modal-card">
        {/* Left Column (Adaptive Blue for Customer, Dark Navy for Admin) */}
        <div 
          className="login-modal-left" 
          style={{
            background: authTab === 'admin' 
              ? 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)' 
              : 'linear-gradient(135deg, #2874f0 0%, #1565c0 100%)'
          }}
        >
          <div className="login-modal-left-content">
            <h2 className="login-modal-title">
              {authTab === 'admin' ? 'Admin Portal' : 'Login'}
            </h2>
            <p className="login-modal-subtitle">
              {authTab === 'admin'
                ? 'Authorized Store Administrator Access for GaneshKart'
                : 'Get access to your Orders, Wishlist and Recommendations'}
            </p>

            {authTab === 'admin' && (
              <div style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.25)',
                padding: '10px 14px',
                borderRadius: 6,
                marginTop: 20,
                fontSize: 12,
                lineHeight: 1.5,
                color: '#fff'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, marginBottom: 4 }}>
                  <ShieldCheck size={16} color="#ffd54f" />
                  <span>Authorized Personnel Only</span>
                </div>
                <span>Only master Admin ID &amp; Password can manage customer orders and change order delivery status.</span>
              </div>
            )}
          </div>

          {/* Flipkart-Style Graphic Illustration */}
          <div className="login-modal-illustration">
            <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="login-illustration-svg">
              <circle cx="95" cy="50" r="16" fill="#FBC02D" />
              <path d="M70 65C70 58.37 75.37 53 82 53C83.5 53 84.9 53.3 86.2 53.8C88.6 47.9 94.4 44 101 44C109.8 44 117 51.2 117 60C118.6 59.4 120.3 59 122 59C128.6 59 134 64.4 134 71C134 77.6 128.6 83 122 83H82C75.4 83 70 77.6 70 71Z" fill="#1E5BC6" opacity="0.85" />
              <rect x="36" y="96" width="46" height="46" rx="4" fill="#E53935" />
              <rect x="55" y="96" width="8" height="46" fill="#D32F2F" />
              <rect x="36" y="115" width="46" height="8" fill="#D32F2F" />
              <circle cx="59" cy="94" r="5" fill="#FFCDD2" />
              <rect x="76" y="70" width="130" height="82" rx="6" fill="#424242" />
              <rect x="82" y="76" width="118" height="70" rx="3" fill="#FFFFFF" />
              <circle cx="141" cy="98" r="12" fill="#B0BEC5" />
              <path d="M125 124C125 115 132 113 141 113C150 113 157 115 157 124H125Z" fill="#B0BEC5" />
              <path d="M64 152H218C221.3 152 224 154.7 224 158H58C58 154.7 60.7 152 64 152Z" fill="#B0BEC5" />
              <rect x="188" y="105" width="44" height="46" rx="4" fill="#FFB300" />
              <path d="M198 105C198 97 203 92 210 92C217 92 222 97 222 105" stroke="#FFA000" strokeWidth="3" strokeLinecap="round" />
              <path d="M202 120L210 128L218 120" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="login-modal-right">
          {/* Top Role Switcher (Customer vs Admin) */}
          <div style={{
            display: 'flex',
            background: '#f1f3f6',
            borderRadius: 8,
            padding: 4,
            marginBottom: 20
          }}>
            <button
              type="button"
              onClick={() => { setAuthTab('customer'); setError(''); }}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: 6,
                border: 'none',
                background: authTab === 'customer' ? '#ffffff' : 'transparent',
                color: authTab === 'customer' ? 'var(--primary)' : '#666',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                boxShadow: authTab === 'customer' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              <User size={15} />
              <span>Customer Login</span>
            </button>

            <button
              type="button"
              onClick={() => { setAuthTab('admin'); setError(''); }}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: 6,
                border: 'none',
                background: authTab === 'admin' ? '#1a237e' : 'transparent',
                color: authTab === 'admin' ? '#ffffff' : '#666',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                boxShadow: authTab === 'admin' ? '0 1px 3px rgba(0,0,0,0.15)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              <ShieldAlert size={15} color={authTab === 'admin' ? '#ffd54f' : '#888'} />
              <span>Admin Login</span>
            </button>
          </div>

          {isSuccess ? (
            <div className="login-success-state animate-slide-up" style={{ textAlign: 'center', padding: '40px 10px' }}>
              <CheckCircle2 size={54} color="#388e3c" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#212121' }}>Login Successful!</h3>
              <p style={{ color: '#666', fontSize: 14, marginTop: 6 }}>
                {successMessage || 'Welcome back to GaneshKart.'}
              </p>
            </div>
          ) : authTab === 'admin' ? (
            /* ================= ADMIN LOGIN FORM ================= */
            <form onSubmit={handleAdminSubmit} className="login-form-container">
              <h3 className="login-right-title">Administrator Authentication</h3>
              <p className="login-right-subtitle">
                Authorized staff sign-in to access customer database and order simulator authority.
              </p>

              {/* Admin ID / Mobile Input */}
              <div className="form-group" style={{ marginBottom: 14 }}>
                <label className="form-label" style={{ fontSize: 12, fontWeight: 700 }}>
                  Admin ID / Registered Mobile
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter Admin ID (8668811021)"
                    value={adminId}
                    onChange={(e) => { setAdminId(e.target.value); setError(''); }}
                    autoFocus
                    required
                  />
                </div>
              </div>

              {/* Admin Password Input */}
              <div className="form-group" style={{ marginBottom: 14 }}>
                <label className="form-label" style={{ fontSize: 12, fontWeight: 700 }}>
                  Master Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Enter Admin Password (Admin123!)"
                    value={adminPassword}
                    onChange={(e) => { setAdminPassword(e.target.value); setError(''); }}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="login-error-alert animate-slide-up" style={{ marginBottom: 14 }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="login-continue-btn active"
                style={{
                  background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
                  marginTop: 10
                }}
              >
                <Lock size={16} />
                <span>Verify &amp; Enter Admin Portal</span>
              </button>

              <div style={{
                marginTop: 18,
                padding: '8px 12px',
                background: '#f5f5f5',
                borderRadius: 4,
                fontSize: 11,
                color: '#666',
                lineHeight: 1.4
              }}>
                🔒 <strong>Restricted:</strong> Unauthorized attempts are logged. Correct Admin ID: <code>8668811021</code>.
              </div>
            </form>
          ) : step === 'input' ? (
            /* ================= CUSTOMER STEP 1: PHONE/EMAIL INPUT ================= */
            <form onSubmit={handleRequestOtp} className="login-form-container">
              <h3 className="login-right-title">Customer Login / Quick Register</h3>
              <p className="login-right-subtitle">
                {loginMode === 'phone' ? 'Enter your 10-digit mobile number' : 'Enter your email address to continue'}
              </p>

              {/* Phone / Email input */}
              {loginMode === 'phone' ? (
                <div className="login-floating-input-group">
                  <div className="login-prefix-box">
                    <span>+91</span>
                    <ChevronDown size={14} color="#666" />
                  </div>
                  <input
                    type="tel"
                    className="login-text-input"
                    placeholder="Enter Phone Number"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength={10}
                    autoFocus
                  />
                  <label className="login-floating-label">Phone Number</label>
                </div>
              ) : (
                <div className="login-floating-input-group single-field">
                  <input
                    type="email"
                    className="login-text-input"
                    placeholder="Enter Email Address"
                    value={email}
                    onChange={handleEmailChange}
                    autoFocus
                  />
                  <label className="login-floating-label">Email Address</label>
                </div>
              )}

              {/* Optional Name field if customer wants to set custom identity */}
              <div className="login-name-optional">
                <input
                  type="text"
                  placeholder="Your Full Name (Optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="login-secondary-input"
                />
              </div>

              {/* Toggle Login Mode Link */}
              <div className="login-toggle-link-row">
                <button
                  type="button"
                  onClick={() => {
                    setLoginMode(loginMode === 'phone' ? 'email' : 'phone');
                    setError('');
                  }}
                  className="login-mode-toggle-btn"
                >
                  {loginMode === 'phone' ? 'Use Email-ID instead' : 'Use Phone Number instead'}
                </button>
              </div>

              {error && (
                <div className="login-error-alert animate-slide-up">
                  {error}
                </div>
              )}

              {/* Legal Terms disclaimer */}
              <p className="login-terms-text">
                By continuing, you agree to GaneshKart's{' '}
                <a href="#terms" onClick={(e) => { e.preventDefault(); onClose(); onNavigate?.('help'); }}>Terms of Use</a>{' '}
                and{' '}
                <a href="#privacy" onClick={(e) => { e.preventDefault(); onClose(); onNavigate?.('help'); }}>Privacy Policy</a>.
              </p>

              {/* Continue button */}
              <button
                type="submit"
                disabled={!isCustomerInputValid}
                className={`login-continue-btn ${isCustomerInputValid ? 'active' : ''}`}
              >
                <span>Request OTP</span>
              </button>
            </form>
          ) : (
            /* ================= CUSTOMER STEP 2: OTP VERIFICATION ================= */
            <form onSubmit={handleVerifyOtp} className="login-form-container animate-slide-up">
              <h3 className="login-right-title">Please enter the OTP</h3>
              <p className="login-right-subtitle">
                Sent to <strong>{loginMode === 'phone' ? `+91 ${phone}` : email}</strong>{' '}
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="login-change-link"
                >
                  Change
                </button>
              </p>

              {/* Demo OTP Banner */}
              <div className="login-otp-demo-pill">
                <span>⚡ Test Demo OTP:</span>
                <strong>{generatedOtp}</strong>
              </div>

              {/* 4 Digit OTP inputs */}
              <div className="login-otp-boxes-row">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={otpInputRefs[idx]}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="login-otp-box"
                  />
                ))}
              </div>

              {error && (
                <div className="login-error-alert animate-slide-up">
                  {error}
                </div>
              )}

              {/* Resend OTP */}
              <div className="login-resend-row">
                {timer > 0 ? (
                  <span style={{ fontSize: 13, color: '#878787' }}>Resend OTP in <strong>{timer}s</strong></span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const newMock = String(Math.floor(1000 + Math.random() * 9000));
                      setGeneratedOtp(newMock);
                      setTimer(30);
                    }}
                    style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={otp.join('').length !== 4}
                className={`login-continue-btn ${otp.join('').length === 4 ? 'active' : ''}`}
                style={{ marginTop: 20 }}
              >
                <span>Verify &amp; Log In</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
