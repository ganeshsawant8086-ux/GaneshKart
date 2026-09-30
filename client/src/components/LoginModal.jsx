import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, CheckCircle2, ShieldCheck, ArrowRight, Smartphone, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginModal({ isOpen, onClose, onNavigate }) {
  const { user, login } = useAuth();

  // Mode: 'phone' or 'email'
  const [loginMode, setLoginMode] = useState('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState('input'); // 'input' | 'otp'
  const [otp, setOtp] = useState(['', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('1234');
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const otpInputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('input');
      setPhone('');
      setEmail('');
      setName('');
      setError('');
      setIsSuccess(false);
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

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');

    if (enteredOtp !== generatedOtp && enteredOtp !== '1234') {
      setError(`Invalid OTP. Please enter the demo OTP shown above (${generatedOtp}).`);
      return;
    }

    // Create user payload
    const customerFullName = name.trim() || (phone === '9756158795' ? 'Rahul Pawar' : 'Ganesh Sawant');
    const customerPhone = phone ? `+91 ${phone}` : '+91 98765 43210';
    const customerEmail = email || `${customerFullName.toLowerCase().replace(/\s+/g, '')}@ganeshkart.com`;

    const loggedUser = {
      id: 1,
      fullName: customerFullName,
      phoneNumber: customerPhone,
      email: customerEmail,
      role: 'Customer',
    };

    login(loggedUser);
    setIsSuccess(true);

    setTimeout(() => {
      onClose();
      if (onNavigate) onNavigate('home');
    }, 1200);
  };

  const isInputValid = loginMode === 'phone' ? phone.length === 10 : email.includes('@');

  return (
    <div className="login-modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      {/* Outer Close Button */}
      <button className="login-modal-close-btn" onClick={onClose} title="Close Login">
        <X size={26} color="#ffffff" />
      </button>

      {/* Split Modal Card */}
      <div className="login-modal-card">
        {/* Left Blue Column */}
        <div className="login-modal-left">
          <div className="login-modal-left-content">
            <h2 className="login-modal-title">Login</h2>
            <p className="login-modal-subtitle">
              Get access to your Orders, Wishlist and Recommendations
            </p>
          </div>

          {/* Flipkart-Style Graphic Illustration */}
          <div className="login-modal-illustration">
            <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="login-illustration-svg">
              {/* Cloud & Sun */}
              <circle cx="95" cy="50" r="16" fill="#FBC02D" />
              <path d="M70 65C70 58.37 75.37 53 82 53C83.5 53 84.9 53.3 86.2 53.8C88.6 47.9 94.4 44 101 44C109.8 44 117 51.2 117 60C118.6 59.4 120.3 59 122 59C128.6 59 134 64.4 134 71C134 77.6 128.6 83 122 83H82C75.4 83 70 77.6 70 71Z" fill="#1E5BC6" opacity="0.85" />

              {/* Red Shopping Gift Box */}
              <rect x="36" y="96" width="46" height="46" rx="4" fill="#E53935" />
              <rect x="55" y="96" width="8" height="46" fill="#D32F2F" />
              <rect x="36" y="115" width="46" height="8" fill="#D32F2F" />
              <circle cx="59" cy="94" r="5" fill="#FFCDD2" />

              {/* Laptop Base & Screen */}
              <rect x="76" y="70" width="130" height="82" rx="6" fill="#424242" />
              <rect x="82" y="76" width="118" height="70" rx="3" fill="#FFFFFF" />
              {/* Avatar on laptop screen */}
              <circle cx="141" cy="98" r="12" fill="#B0BEC5" />
              <path d="M125 124C125 115 132 113 141 113C150 113 157 115 157 124H125Z" fill="#B0BEC5" />
              {/* Laptop bottom bar */}
              <path d="M64 152H218C221.3 152 224 154.7 224 158H58C58 154.7 60.7 152 64 152Z" fill="#B0BEC5" />

              {/* Yellow Shopping Bag with GaneshKart emblem */}
              <rect x="188" y="105" width="44" height="46" rx="4" fill="#FFB300" />
              <path d="M198 105C198 97 203 92 210 92C217 92 222 97 222 105" stroke="#FFA000" strokeWidth="3" strokeLinecap="round" />
              <path d="M202 120L210 128L218 120" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="login-modal-right">
          {isSuccess ? (
            <div className="login-success-state animate-slide-up">
              <CheckCircle2 size={54} color="#388e3c" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#212121' }}>Login Successful!</h3>
              <p style={{ color: '#666', fontSize: 14, marginTop: 6 }}>
                Welcome back to GaneshKart.
              </p>
            </div>
          ) : step === 'input' ? (
            <form onSubmit={handleRequestOtp} className="login-form-container">
              <h3 className="login-right-title">Log in for the best experience</h3>
              <p className="login-right-subtitle">
                {loginMode === 'phone' ? 'Enter your phone number to continue' : 'Enter your email address to continue'}
              </p>

              {/* Phone / Email input with floating label style */}
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
                  placeholder="Your Name (Optional, e.g. Rahul Pawar)"
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
                  {loginMode === 'phone' ? 'Use Email-ID' : 'Use Phone Number'}
                </button>
              </div>

              {error && (
                <div className="login-error-alert animate-slide-up">
                  {error}
                </div>
              )}

              {/* Legal Terms disclaimer */}
              <p className="login-terms-text">
                By continuing, you confirm that you are above 18 years of age, and you agree to the GaneshKart's{' '}
                <a href="#terms" onClick={(e) => { e.preventDefault(); onClose(); onNavigate?.('help'); }}>Terms of Use</a>{' '}
                and{' '}
                <a href="#privacy" onClick={(e) => { e.preventDefault(); onClose(); onNavigate?.('help'); }}>Privacy Policy</a>.
              </p>

              {/* Continue button */}
              <button
                type="submit"
                disabled={!isInputValid}
                className={`login-continue-btn ${isInputValid ? 'active' : ''}`}
              >
                <span>Continue</span>
              </button>
            </form>
          ) : (
            /* Step 2: OTP Verification */
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
                <span>Verify & Log In</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
