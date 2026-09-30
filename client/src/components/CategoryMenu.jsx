import React from 'react';
import { LayoutGrid, Laptop, Smartphone, Shirt, ShoppingBag, Home, Tv } from 'lucide-react';

const CATEGORIES = [
  { name: 'All', label: 'All Items', icon: LayoutGrid },
  { name: 'Mobiles', label: 'Mobiles', icon: Smartphone },
  { name: 'Electronics', label: 'Electronics', icon: Laptop },
  { name: 'Fashion', label: 'Fashion', icon: Shirt },
  { name: 'Grocery', label: 'Grocery', icon: ShoppingBag },
  { name: 'Home & Kitchen', label: 'Home & Kitchen', icon: Home },
  { name: 'Appliances', label: 'Appliances', icon: Tv },
];

export default function CategoryMenu({ selectedCategory, onSelectCategory }) {
  return (
    <nav className="category-strip" aria-label="Category navigation">
      <div className="category-strip-inner">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.name;
          return (
            <button
              key={cat.name}
              className={`cat-item-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.name)}
            >
              <div className="cat-icon-box">
                <Icon size={22} />
              </div>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
