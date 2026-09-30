import React, { useState, useEffect } from 'react';
import { LayoutGrid, Laptop, Smartphone, Shirt, ShoppingBag, Home, Tv, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

const ICONS_MAP = {
  Electronics: Laptop,
  Mobiles: Smartphone,
  Fashion: Shirt,
  Grocery: ShoppingBag,
  'Home & Kitchen': Home,
  Appliances: Tv,
};

export default function CategoriesPage({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="section-wrapper" style={{ marginTop: 24 }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Explore All Departments</h1>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>
        Shop genuine products across all leading shopping categories on GaneshKart.
      </p>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 40 }}><div className="spinner" style={{ margin: '0 auto' }}></div></div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {categories.map((cat) => {
            const IconComponent = ICONS_MAP[cat.name] || LayoutGrid;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                style={{
                  background: '#fff',
                  borderRadius: 'var(--radius-md)',
                  padding: 24,
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  transition: 'var(--transition)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 'var(--radius-md)',
                  background: '#f0f5ff',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <IconComponent size={28} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{cat.name}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.4 }}>{cat.description}</p>
                </div>
                <ArrowRight size={18} color="var(--primary)" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
