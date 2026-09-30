import React from 'react';
import ProductCard from './ProductCard';
import { PackageX, ArrowUpDown } from 'lucide-react';

export default function ProductGrid({
  products,
  loading,
  title,
  sortBy,
  onSortChange,
  onViewDetails,
}) {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div className="spinner" style={{ margin: '0 auto 16px' }}></div>
        <p style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Loading products from GaneshKart server...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Grid Header & Sort Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>{title || 'All Products'}</h2>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Showing {products.length} {products.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {onSortChange && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ArrowUpDown size={16} color="var(--text-muted)" />
            <span style={{ fontSize: 13, fontWeight: 600 }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                fontSize: 13,
                fontWeight: 600,
                outline: 'none',
                background: '#fff',
                cursor: 'pointer'
              }}
            >
              <option value="featured">Featured / Default</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        )}
      </div>

      {/* Grid or Empty State */}
      {products.length === 0 ? (
        <div style={{
          background: '#fff',
          borderRadius: 'var(--radius-md)',
          padding: '60px 20px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <PackageX size={54} color="#b0bec5" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No products found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, maxWidth: 400, margin: '0 auto' }}>
            We couldn't find any products matching your current filters or search query. Try resetting filters or using different keywords.
          </p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
}
