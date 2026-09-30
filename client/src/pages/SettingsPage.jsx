import React, { useState } from 'react';
import { Settings, Bell, Globe, DollarSign, Shield, Smartphone } from 'lucide-react';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [smsUpdates, setSmsUpdates] = useState(true);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('English');

  return (
    <div className="section-wrapper" style={{ marginTop: 24, maxWidth: 800 }}>
      <div style={{ background: '#fff', borderRadius: 'var(--radius-md)', padding: 24, boxShadow: 'var(--shadow-sm)' }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Settings size={22} color="var(--primary)" />
          <span>Account & App Settings</span>
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Notifications */}
          <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Bell size={18} color="var(--primary)" />
              <span>Notification Preferences</span>
            </h3>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginBottom: 8, fontSize: 14 }}>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              <span>Order status updates & delivery alerts</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14 }}>
              <input
                type="checkbox"
                checked={smsUpdates}
                onChange={(e) => setSmsUpdates(e.target.checked)}
              />
              <span>Promotional deal alerts and festive sales</span>
            </label>
          </div>

          {/* Regional Settings */}
          <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Globe size={18} color="var(--primary)" />
              <span>Language & Currency</span>
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label className="form-label">Display Language</label>
                <select
                  className="form-input"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="English">English (India)</option>
                  <option value="Hindi">हिंदी (Hindi)</option>
                  <option value="Marathi">मराठी (Marathi)</option>
                  <option value="Tamil">தமிழ் (Tamil)</option>
                  <option value="Telugu">తెలుగు (Telugu)</option>
                </select>
              </div>

              <div>
                <label className="form-label">Currency</label>
                <select
                  className="form-input"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="INR">₹ Indian Rupee (INR)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tech Stack Info */}
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>
              GaneshKart Full Stack Environment
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              • Backend: <strong>ASP.NET Core Web API (Controllers)</strong><br />
              • Frontend: <strong>React JS with Vite</strong><br />
              • Database: <strong>SQL Server (SQLEXPRESS / GaneshKartDB)</strong><br />
              • Connection: <strong>Entity Framework Core with SQL Server Provider</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
