import React, { useState, useEffect, useCallback } from 'react';
import { Filter, RotateCcw, Search, ChevronRight } from 'lucide-react';
import { api } from '../services/api';
import ProductGrid from '../components/ProductGrid';

const CATEGORIES = ['All', 'Electronics', 'Mobiles', 'Fashion', 'Grocery', 'Home & Kitchen', 'Appliances'];

export default function Products({
  initialCategory = 'All',
  initialSearch = '',
  onViewProduct,
  onNavigateCategory
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    if (initialSearch !== undefined) setSearchTerm(initialSearch);
  }, [initialSearch]);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getProducts({
        search: searchTerm,
        category: selectedCategory,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        sortBy: sortBy !== 'featured' ? sortBy : undefined,
      });

      // Filter by min rating client side if selected
      let filtered = data;
      if (minRating) {
        filtered = filtered.filter((p) => p.rating >= parseFloat(minRating));
      }

      setProducts(filtered);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedCategory, minPrice, maxPrice, minRating, sortBy]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
    setMinRating('');
    setSortBy('featured');
    if (onNavigateCategory) onNavigateCategory('All');
  };

  return (
    <div className="section-wrapper" style={{ marginTop: 20 }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
        <span>Home</span>
        <ChevronRight size={14} />
        <span>Products</span>
        {selectedCategory !== 'All' && (
          <>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{selectedCategory}</span>
          </>
        )}
        {searchTerm && (
          <>
            <ChevronRight size={14} />
            <span>Search: "{searchTerm}"</span>
          </>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20, alignItems: 'flex-start' }}>
        {/* Left Filter Sidebar */}
        <aside style={{ background: '#fff', borderRadius: 'var(--radius-md)', padding: 18, boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: 12, marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Filter size={18} color="var(--primary)" />
              <span>Filters</span>
            </h3>
            <button
              onClick={handleResetFilters}
              style={{ color: 'var(--primary)', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}
              title="Reset all filters"
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          </div>

          {/* Category Filter */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-dark)', marginBottom: 10 }}>
              Category
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {CATEGORIES.map((cat) => (
                <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="categoryFilter"
                    checked={selectedCategory === cat}
                    onChange={() => {
                      setSelectedCategory(cat);
                      if (onNavigateCategory) onNavigateCategory(cat);
                    }}
                  />
                  <span style={{ fontWeight: selectedCategory === cat ? 700 : 400, color: selectedCategory === cat ? 'var(--primary)' : 'inherit' }}>
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div style={{ marginBottom: 20, borderTop: '1px solid var(--border-light)', paddingTop: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-dark)', marginBottom: 10 }}>
              Price (₹)
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                type="number"
                placeholder="Min ₹"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                style={{ width: '100%', padding: '6px 8px', fontSize: 13, border: '1px solid var(--border-color)', borderRadius: 4 }}
              />
              <span style={{ color: 'var(--text-muted)' }}>to</span>
              <input
                type="number"
                placeholder="Max ₹"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                style={{ width: '100%', padding: '6px 8px', fontSize: 13, border: '1px solid var(--border-color)', borderRadius: 4 }}
              />
            </div>
          </div>

          {/* Customer Rating Filter */}
          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-dark)', marginBottom: 10 }}>
              Customer Rating
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { label: '4★ & above', val: '4' },
                { label: '4.5★ & above', val: '4.5' },
                { label: 'All Ratings', val: '' },
              ].map((r) => (
                <label key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="ratingFilter"
                    checked={minRating === r.val}
                    onChange={() => setMinRating(r.val)}
                  />
                  <span>{r.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Main Grid */}
        <main>
          <ProductGrid
            products={products}
            loading={loading}
            title={selectedCategory === 'All' ? 'All Products' : `${selectedCategory} Collection`}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onViewDetails={onViewProduct}
          />
        </main>
      </div>
    </div>
  );
}
