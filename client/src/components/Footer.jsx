import React from 'react';
import { ShieldCheck, HelpCircle, Award, Sparkles } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <div className="footer-col-title">About GaneshKart</div>
          <ul className="footer-links">
            <li className="footer-link-item"><a href="#about" onClick={(e) => { e.preventDefault(); onNavigate('help'); }}>About Us</a></li>
            <li className="footer-link-item"><a href="#careers" onClick={(e) => { e.preventDefault(); onNavigate('help'); }}>Careers</a></li>
            <li className="footer-link-item"><a href="#stories" onClick={(e) => { e.preventDefault(); onNavigate('help'); }}>GaneshKart Stories</a></li>
            <li className="footer-link-item"><a href="#press" onClick={(e) => { e.preventDefault(); onNavigate('help'); }}>Press Releases</a></li>
            <li className="footer-link-item"><a href="#wholesale" onClick={(e) => { e.preventDefault(); onNavigate('help'); }}>GaneshKart Wholesale</a></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">Help & Support</div>
          <ul className="footer-links">
            <li className="footer-link-item"><a href="#payments" onClick={(e) => { e.preventDefault(); onNavigate('help'); }}>Payments Guide</a></li>
            <li className="footer-link-item"><a href="#shipping" onClick={(e) => { e.preventDefault(); onNavigate('help'); }}>Shipping & Delivery</a></li>
            <li className="footer-link-item"><a href="#returns" onClick={(e) => { e.preventDefault(); onNavigate('help'); }}>Cancellations & Returns</a></li>
            <li className="footer-link-item"><a href="#faq" onClick={(e) => { e.preventDefault(); onNavigate('help'); }}>FAQ & Grievances</a></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">Consumer Policy</div>
          <ul className="footer-links">
            <li className="footer-link-item"><a href="#return-policy" onClick={(e) => { e.preventDefault(); onNavigate('help'); }}>Cancellation & Return</a></li>
            <li className="footer-link-item"><a href="#terms" onClick={(e) => { e.preventDefault(); onNavigate('help'); }}>Terms Of Use</a></li>
            <li className="footer-link-item"><a href="#security" onClick={(e) => { e.preventDefault(); onNavigate('help'); }}>Security Standards</a></li>
            <li className="footer-link-item"><a href="#privacy" onClick={(e) => { e.preventDefault(); onNavigate('help'); }}>Privacy Policy</a></li>
            <li className="footer-link-item"><a href="#sitemap" onClick={(e) => { e.preventDefault(); onNavigate('categories'); }}>Site Map</a></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">Mail & Registered Office</div>
          <p style={{ fontSize: 12, lineHeight: 1.6, opacity: 0.85 }}>
            GaneshKart Internet Private Limited,<br />
            Ganesh Sawant House,Near Z.P. School,Villege Pandharewadi<br />
            Tal-pandharpur,Dist-Solapur 413304, Maharashtra, India<br />
            CIN: U51109KA2026PTC123456<br />
            Telephone: 8668811021 / 9307906400
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Award size={16} color="#ff9f00" />
            <span>Become a Seller</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Sparkles size={16} color="#ff9f00" />
            <span>Advertise</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <HelpCircle size={16} color="#ff9f00" />
            <span>Help Center</span>
          </span>
        </div>
        <div>
          © 2026 GaneshKart.com • All Rights Reserved (Educational Dummy E-Commerce Demo)
        </div>
      </div>
    </footer>
  );
}
