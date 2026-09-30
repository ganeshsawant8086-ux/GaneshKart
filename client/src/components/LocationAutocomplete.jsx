import React, { useState, useEffect, useRef } from 'react';
import { searchCities, searchStates } from '../data/indiaLocations';
import { MapPin, Building, ChevronDown } from 'lucide-react';

export default function LocationAutocomplete({
  type = 'city', // 'city' or 'state'
  label,
  value = '',
  onChange,
  onSelect,
  placeholder,
  name,
  required = false,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Update suggestions on every keystroke (even a single letter!)
  useEffect(() => {
    if (value && value.trim().length >= 1) {
      if (type === 'city') {
        const matches = searchCities(value);
        setSuggestions(matches);
      } else {
        const matches = searchStates(value);
        setSuggestions(matches);
      }
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [value, type]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    onChange(e);
    setIsOpen(true);
  };

  const handleSelectSuggestion = (item) => {
    if (type === 'city') {
      // item is object { city, district, state, pincode }
      onSelect(item);
    } else {
      // item is string state name
      onSelect(item);
    }
    setIsOpen(false);
  };

  return (
    <div className="form-group" ref={containerRef} style={{ position: 'relative' }}>
      <label className="form-label">{label}</label>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          name={name}
          className="form-input"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            if (value && value.trim().length >= 1) setIsOpen(true);
          }}
          required={required}
          autoComplete="off"
          style={{ width: '100%', paddingRight: 32 }}
        />
        <div style={{ position: 'absolute', right: 10, pointerEvents: 'none', color: '#9e9e9e' }}>
          {type === 'city' ? <MapPin size={16} /> : <Building size={16} />}
        </div>
      </div>

      {/* Suggestion Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <ul
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#ffffff',
            borderRadius: 'var(--radius-sm)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            border: '1.5px solid #2874f0',
            marginTop: 4,
            maxHeight: 250,
            overflowY: 'auto',
            zIndex: 1050,
            listStyle: 'none',
            padding: 0,
          }}
        >
          <div
            style={{
              padding: '6px 12px',
              background: '#f0f5ff',
              fontSize: 11,
              fontWeight: 700,
              color: '#2874f0',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              borderBottom: '1px solid #e0e0e0',
            }}
          >
            {type === 'city' ? 'Matching Cities & Talukas in India' : 'Matching Indian States'}
          </div>

          {suggestions.map((item, idx) => {
            if (type === 'city') {
              return (
                <li
                  key={`${item.city}-${idx}`}
                  onClick={() => handleSelectSuggestion(item)}
                  style={{
                    padding: '10px 14px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e8f0fe')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
                >
                  <div>
                    <span style={{ fontWeight: 700, fontSize: 14, color: '#212121' }}>
                      {item.city}
                    </span>
                    <span style={{ fontSize: 12, color: '#757575', marginLeft: 8 }}>
                      ({item.district ? `${item.district} Dist, ` : ''}{item.state})
                    </span>
                  </div>
                  {item.pincode && (
                    <span
                      style={{
                        fontSize: 11,
                        background: '#e8f5e9',
                        color: '#2e7d32',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: 3,
                      }}
                    >
                      PIN: {item.pincode}
                    </span>
                  )}
                </li>
              );
            } else {
              return (
                <li
                  key={`${item}-${idx}`}
                  onClick={() => handleSelectSuggestion(item)}
                  style={{
                    padding: '10px 14px',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#212121',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e8f0fe')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
                >
                  {item}
                </li>
              );
            }
          })}
        </ul>
      )}
    </div>
  );
}
