import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, ShieldCheck, Truck, RefreshCw, Sparkles, Flame } from 'lucide-react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Home({ onNavigate, onViewProduct }) {
  const [deals, setDeals] = useState([]);
  const [electronics, setElectronics] = useState([]);
  const [fashion, setFashion] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [featuredData, elecData, fashData] = await Promise.all([
          api.getFeaturedProducts(),
          api.getProductsByCategory('Electronics'),
          api.getProductsByCategory('Fashion'),
        ]);
        setDeals(featuredData.slice(0, 4));
        setElectronics(elecData.slice(0, 4));
        setFashion(fashData.slice(0, 4));
      } catch (err) {
        console.error('Error loading home data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  return (
    <div>
      {/* 1. Hero Promo Banner */}
      <div className="hero-banner-container">
        <div className="hero-banner">
          <div className="hero-content">
            <span className="hero-tag">🔥 Bharat Ka Maha Savings Sale</span>
            <h1 className="hero-title">
              Up to 60% Off on Top Brands & Electronics
            </h1>
            <p className="hero-subtitle">
              Shop flagship smartphones, laptops, 4K Smart TVs, and festive ethnic wear with GaneshKart Assured delivery!
            </p>
            <button className="hero-btn" onClick={() => onNavigate('products')}>
              <span>Explore All Deals</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Trust Value Props */}
      <div className="section-wrapper" style={{ marginTop: 0 }}>
        <div style={{
          background: '#fff',
          borderRadius: 'var(--radius-md)',
          padding: '16px 24px',
          boxShadow: 'var(--shadow-sm)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Truck size={28} color="var(--primary)" />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Free & Fast Delivery</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>On orders above ₹500 across India</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <ShieldCheck size={28} color="var(--success-green)" />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>GaneshKart Assured</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>100% Genuine products tested</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <RefreshCw size={28} color="#e65100" />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>7-Day Easy Returns</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Hassle-free replacement policy</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Sparkles size={28} color="#fbc02d" />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Best Price Guarantee</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Unmatched offers on festivals</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Deals of the Day */}
      <section className="section-wrapper">
        <div className="section-box">
          <div className="section-head">
            <h2 className="section-head-title">
              <Flame size={22} color="#fb641b" />
              <span>Deals of the Day</span>
            </h2>
            <button className="view-all-btn" onClick={() => onNavigate('products')}>
              <span>View All</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: 40 }}><div className="spinner" style={{ margin: '0 auto' }}></div></div>
          ) : (
            <div className="products-grid">
              {deals.map((p) => (
                <ProductCard key={p.id} product={p} onViewDetails={onViewProduct} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Top Electronics & Gadgets */}
      <section className="section-wrapper">
        <div className="section-box">
          <div className="section-head">
            <h2 className="section-head-title">
              <Zap size={22} color="var(--primary)" />
              <span>Top Electronics & Audio</span>
            </h2>
            <button className="view-all-btn" onClick={() => onNavigate('products', 'Electronics')}>
              <span>View All</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: 40 }}><div className="spinner" style={{ margin: '0 auto' }}></div></div>
          ) : (
            <div className="products-grid">
              {electronics.map((p) => (
                <ProductCard key={p.id} product={p} onViewDetails={onViewProduct} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. Trending Indian Fashion */}
      <section className="section-wrapper">
        <div className="section-box">
          <div className="section-head">
            <h2 className="section-head-title">
              <Sparkles size={22} color="#9c27b0" />
              <span>Festive Indian Fashion</span>
            </h2>
            <button className="view-all-btn" onClick={() => onNavigate('products', 'Fashion')}>
              <span>View All</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: 40 }}><div className="spinner" style={{ margin: '0 auto' }}></div></div>
          ) : (
            <div className="products-grid">
              {fashion.map((p) => (
                <ProductCard key={p.id} product={p} onViewDetails={onViewProduct} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
