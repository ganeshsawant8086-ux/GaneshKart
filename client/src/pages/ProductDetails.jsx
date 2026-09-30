import React, { useState, useEffect } from 'react';
import { 
  Star, ShoppingCart, Zap, Heart, ShieldCheck, Truck, RefreshCw, 
  Tag, MapPin, Check, ArrowLeft, Cpu, Smartphone, Camera, 
  BatteryCharging, ChevronDown, ChevronUp, Layers, Award, 
  Sparkles, CreditCard, Banknote, Shield, CheckCircle2, Info 
} from 'lucide-react';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { getProductElectronicDetails } from '../data/electronicsDetails';

export default function ProductDetails({ productId, onBack, onNavigate }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pincode, setPincode] = useState('400001');
  const [pincodeChecked, setPincodeChecked] = useState(true);

  // Electronics interactive state
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [activeTab, setActiveTab] = useState('showcase');
  const [similarProducts, setSimilarProducts] = useState([]);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      try {
        const data = await api.getProductById(productId);
        setProduct(data);

        // Check if electronic product metadata exists
        const eData = getProductElectronicDetails(data);
        if (eData) {
          setSelectedImgIndex(0);
          setSelectedColor(eData.colors?.[0] || null);
          setSelectedVariant(eData.variants?.[0] || null);
          setActiveTab('showcase');
        }

        // Load similar products
        try {
          const allProds = await api.getProducts({ category: data.category });
          const prodsList = Array.isArray(allProds) ? allProds : (allProds.products || []);
          setSimilarProducts(prodsList.filter(p => p.id !== data.id).slice(0, 5));
        } catch {
          // ignore similar products fetch failure
        }
      } catch (err) {
        console.error('Error loading product details:', err);
      } finally {
        setLoading(false);
      }
    }
    if (productId) loadProduct();
  }, [productId]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <div className="spinner" style={{ margin: '0 auto 16px' }}></div>
        <p style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Product not found</h2>
        <button className="btn-proceed" onClick={onBack} style={{ maxWidth: 200, margin: '20px auto' }}>
          Back to Shop
        </button>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const electronicData = getProductElectronicDetails(product);
  const isElectronic = Boolean(electronicData);

  // Dynamic pricing based on selected variant if electronic
  const currentPrice = (isElectronic && selectedVariant) 
    ? selectedVariant.price 
    : product.discountPrice;
    
  const currentOriginalPrice = (isElectronic && selectedVariant) 
    ? selectedVariant.originalPrice 
    : product.price;

  const discountPercent = currentOriginalPrice > currentPrice
    ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
    : 0;

  const savingsAmount = currentOriginalPrice - currentPrice;

  // Active gallery view
  const gallery = (isElectronic && electronicData?.gallery?.length)
    ? electronicData.gallery
    : [{ id: 'main', label: 'Main View', url: product.imageUrl }];

  const activeImage = gallery[selectedImgIndex]?.url || product.imageUrl;
  const activeLabel = gallery[selectedImgIndex]?.label || 'Product Image';

  const handleBuyNow = async () => {
    await addToCart(product.id, 1);
    onNavigate('checkout');
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    // When switching colors, switch back to the main view so they see the front/color
    setSelectedImgIndex(0);
  };

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
  };

  // Dynamic display title
  const displayTitle = isElectronic && selectedColor && selectedVariant
    ? `${product.brand} ${product.name.split('(')[0].trim()} (${selectedColor.name}, ${selectedVariant.label})`
    : product.name;

  return (
    <div className="product-details-container">
      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          color: 'var(--primary)',
          fontWeight: 700,
          fontSize: 14,
          marginBottom: 16
        }}
      >
        <ArrowLeft size={18} />
        <span>Back to Products</span>
      </button>

      {/* Main Product Card */}
      <div className="product-details-card">
        {/* Left: Gallery & Action Buttons */}
        <div className="product-gallery-section">
          <div className="main-detail-image-box" style={{ position: 'relative' }}>
            {isElectronic && (
              <div className="angle-badge-tag">
                <Camera size={13} />
                <span>{activeLabel}</span>
              </div>
            )}

            <button
              className={`wishlist-heart-btn ${isWishlisted ? 'active' : ''}`}
              onClick={() => toggleWishlist(product.id)}
              style={{ position: 'absolute', top: 16, right: 16, zIndex: 3 }}
              title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart size={20} fill={isWishlisted ? '#e91e63' : 'none'} color={isWishlisted ? '#e91e63' : '#90a4ae'} />
            </button>

            <img 
              src={activeImage} 
              alt={product.name} 
              style={{ transition: 'opacity 0.2s ease-in-out' }}
            />
          </div>

          {/* Multi-angle Gallery Thumbnails (Only for Electronics) */}
          {isElectronic && gallery.length > 1 && (
            <div className="gallery-thumbs-row">
              {gallery.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className={`gallery-thumb-item ${selectedImgIndex === idx ? 'active' : ''}`}
                  onClick={() => setSelectedImgIndex(idx)}
                  onMouseEnter={() => setSelectedImgIndex(idx)}
                  title={item.label}
                >
                  <img src={item.url} alt={item.label} />
                  <span className="gallery-thumb-label">{item.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Big Action Buttons */}
          <div className="detail-actions-row">
            <button className="btn-big-cart" onClick={() => addToCart(product.id, 1)}>
              <ShoppingCart size={20} />
              <span>ADD TO CART</span>
            </button>
            <button className="btn-big-buy" onClick={handleBuyNow}>
              <Zap size={20} />
              <span>BUY NOW</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, marginTop: 4 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <ShieldCheck size={16} color="var(--primary)" /> 100% Genuine
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <Truck size={16} color="var(--success-green)" /> Express Delivery
            </span>
          </div>
        </div>

        {/* Right: Info & Specs */}
        <div className="product-info-section">
          <div style={{ textTransform: 'uppercase', color: 'var(--text-muted)', fontSize: 13, fontWeight: 700 }}>
            {product.brand} • {product.category}
          </div>

          <h1 className="detail-title">{displayTitle}</h1>

          {/* Rating Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span className="rating-badge" style={{ fontSize: 14, padding: '3px 8px' }}>
              {product.rating.toFixed(1)} <Star size={13} fill="#fff" />
            </span>
            <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>
              1,842 Ratings & 265 Reviews
            </span>
            <span className="assured-badge">
              ✓ GaneshKart Assured
            </span>
          </div>

          {/* Color Selector (For Electronics) */}
          {isElectronic && electronicData?.colors?.length > 0 && (
            <div className="product-selector-group">
              <div className="selector-heading">
                Selected Color: <strong>{selectedColor?.name || 'Default'}</strong>
              </div>
              <div className="color-swatches-list">
                {electronicData.colors.map((color, i) => (
                  <div
                    key={color.name || i}
                    className={`color-swatch-box ${selectedColor?.name === color.name ? 'active' : ''}`}
                    onClick={() => handleColorSelect(color)}
                  >
                    {color.img ? (
                      <img src={color.img} alt={color.name} className="color-swatch-thumb" />
                    ) : (
                      <span className="color-dot" style={{ backgroundColor: color.hex || '#333' }}></span>
                    )}
                    <span className="color-name-text">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Storage / RAM Variant Selector (For Electronics) */}
          {isElectronic && electronicData?.variants?.length > 0 && (
            <div className="product-selector-group">
              <div className="selector-heading">
                Variant: <strong>{selectedVariant?.label}</strong>
              </div>
              <div className="variant-cards-row">
                {electronicData.variants.map((v, i) => (
                  <button
                    key={v.label || i}
                    type="button"
                    className={`variant-card-btn ${selectedVariant?.label === v.label ? 'active' : ''}`}
                    onClick={() => handleVariantSelect(v)}
                  >
                    <span className="variant-label-title">{v.label}</span>
                    <span className="variant-discount-sub">
                      ↓{v.discount || 'Special'}
                      {v.originalPrice && (
                        <span className="variant-original-price">
                          ₹{v.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </span>
                    <span className="variant-price-bold">
                      ₹{v.price.toLocaleString('en-IN')}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Festive / BBD Badge */}
          {isElectronic && (
            <div className="bbd-badge-pill">
              <Sparkles size={14} />
              <span>Big Billion Days Price</span>
            </div>
          )}

          {/* Price Row */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 4, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 28, fontWeight: 800 }}>
              ₹{currentPrice.toLocaleString('en-IN')}
            </span>
            {currentOriginalPrice > currentPrice && (
              <>
                <span style={{ fontSize: 16, color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                  ₹{currentOriginalPrice.toLocaleString('en-IN')}
                </span>
                <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--success-green)' }}>
                  {discountPercent}% off
                </span>
              </>
            )}
          </div>

          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>
            + ₹49 Protect Promise Fee included
          </div>

          {savingsAmount > 0 && (
            <div style={{ fontSize: 13, color: 'var(--success-green)', fontWeight: 700 }}>
              🎉 Festive Price: You save ₹{savingsAmount.toLocaleString('en-IN')}!
            </div>
          )}

          {/* WOW DEAL & EMI Banner (For Electronics) */}
          {isElectronic && (
            <div className="wow-deal-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="wow-deal-badge">WOW DEAL</span>
                <div>
                  <div className="wow-deal-text">
                    Buy at ₹{Math.round(currentPrice * 0.9).toLocaleString('en-IN')}
                  </div>
                  <div className="wow-deal-sub">
                    EMI @ ₹{Math.round(currentPrice / 3).toLocaleString('en-IN')} x 3m
                  </div>
                </div>
              </div>
              <ChevronDown size={18} color="#1e3a8a" />
            </div>
          )}

          {/* Credit Card & Pay Later Perks (For Electronics) */}
          {isElectronic && (
            <div className="payment-perks-grid">
              <div className="payment-perk-card">
                <CreditCard size={24} color="#1e3a8a" />
                <div>
                  <div className="perk-info-title">₹0 Joining Fee | 5% Cashback</div>
                  <div className="perk-info-sub">GaneshKart Axis Bank Card</div>
                </div>
              </div>
              <div className="payment-perk-card">
                <Banknote size={24} color="#388e3c" />
                <div>
                  <div className="perk-info-title">Pre-approved up to ₹50,000</div>
                  <div className="perk-info-sub">GaneshKart Pay Later</div>
                </div>
              </div>
            </div>
          )}

          {/* Delivery Details Section */}
          <div className="delivery-info-card">
            <div className="delivery-location-row">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <MapPin size={16} color="var(--primary)" />
                <span>Deliver to: <strong>WORK Vitthal lad complex shop no 33</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  style={{
                    padding: '4px 8px',
                    border: '1px solid var(--border-color)',
                    borderRadius: 4,
                    width: 80,
                    fontSize: 12,
                    fontWeight: 600
                  }}
                  maxLength={6}
                />
                <button
                  onClick={() => setPincodeChecked(true)}
                  style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 12 }}
                >
                  Check
                </button>
              </div>
            </div>

            <div className="delivery-date-tag">
              <Truck size={16} color="var(--success-green)" />
              <span>Delivery by <strong>Tomorrow / Thursday, 1 Oct</strong> • <span style={{ color: 'var(--success-green)' }}>FREE Delivery</span></span>
            </div>

            <div className="seller-info-text">
              <span>Seller: <strong>HatmanRetails</strong> (4.8 ★ | 5 months with GaneshKart)</span>
            </div>
          </div>

          {/* Shop with Peace of Mind (Only for Electronics) */}
          {isElectronic && (
            <div className="peace-of-mind-container">
              <div className="peace-heading">
                <span>Shop with peace of mind</span>
                <ChevronUp size={18} color="var(--text-muted)" />
              </div>

              <div className="peace-warranty-banner">
                🛡️ 1 Year Manufacturer Warranty for Device and 6 Months Manufacturer Warranty for In-Box Accessories
              </div>

              <div className="peace-trust-badges-row">
                <div className="trust-badge-item">
                  <div className="trust-badge-icon-circle">
                    <RefreshCw size={18} />
                  </div>
                  <span className="trust-badge-label">7 Days Replacement</span>
                </div>
                <div className="trust-badge-item">
                  <div className="trust-badge-icon-circle">
                    <Banknote size={18} />
                  </div>
                  <span className="trust-badge-label">Cash on Delivery</span>
                </div>
                <div className="trust-badge-item">
                  <div className="trust-badge-icon-circle">
                    <ShieldCheck size={18} />
                  </div>
                  <span className="trust-badge-label">GaneshKart Assured</span>
                </div>
              </div>
            </div>
          )}

          {/* Product Highlights with Tech Icons (Only for Electronics) */}
          {isElectronic && electronicData?.highlights?.length > 0 && (
            <div className="product-highlights-box">
              <div className="highlights-title-bar">
                <span>Product highlights</span>
                <ChevronUp size={18} color="var(--text-muted)" />
              </div>

              <div className="highlights-list">
                {electronicData.highlights.map((h, i) => {
                  let IconComp = Cpu;
                  if (h.type === 'ram') IconComp = Layers;
                  if (h.type === 'processor') IconComp = Cpu;
                  if (h.type === 'camera_rear' || h.type === 'camera_front') IconComp = Camera;
                  if (h.type === 'display') IconComp = Smartphone;
                  if (h.type === 'battery') IconComp = BatteryCharging;

                  return (
                    <div key={i} className="highlight-row-item">
                      <div className="highlight-icon-box">
                        <IconComp size={18} />
                      </div>
                      <div>
                        <div className="highlight-main-text">{h.title}</div>
                        {h.subtitle && <div className="highlight-sub-text">{h.subtitle}</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Non-Electronic Fallback Specs */}
          {!isElectronic && (
            <div style={{ marginTop: 10 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Product Specifications</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '8px 0', color: 'var(--text-muted)', width: 140, fontWeight: 600 }}>Brand</td>
                    <td style={{ padding: '8px 0', fontWeight: 600 }}>{product.brand}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '8px 0', color: 'var(--text-muted)', fontWeight: 600 }}>Category</td>
                    <td style={{ padding: '8px 0' }}>{product.category}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '8px 0', color: 'var(--text-muted)', fontWeight: 600 }}>In Stock</td>
                    <td style={{ padding: '8px 0', color: product.stock > 0 ? 'var(--success-green)' : '#d32f2f', fontWeight: 700 }}>
                      {product.stock > 0 ? `${product.stock} units available` : 'Out of Stock'}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style={{ marginTop: 16 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Description</h3>
                <p style={{ fontSize: 14, color: '#424242', lineHeight: 1.6 }}>{product.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ALL DETAILS SECTION (Showcase, Specifications, Description, Warranty) - Only for Electronics */}
      {isElectronic && (
        <div className="all-details-wrapper">
          <h2 className="all-details-header">All details</h2>

          {/* Tab Navigation */}
          <div className="details-tab-nav">
            <button
              className={`tab-pill-btn ${activeTab === 'showcase' ? 'active' : ''}`}
              onClick={() => setActiveTab('showcase')}
            >
              Showcase
            </button>
            <button
              className={`tab-pill-btn ${activeTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button
              className={`tab-pill-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`tab-pill-btn ${activeTab === 'warranty' ? 'active' : ''}`}
              onClick={() => setActiveTab('warranty')}
            >
              Warranty
            </button>
          </div>

          {/* Tab 1: Showcase */}
          {activeTab === 'showcase' && (
            <div className="showcase-container">
              {electronicData.showcase ? (
                <>
                  <div className="showcase-hero-banner">
                    <div className="showcase-hero-content">
                      <h2>{electronicData.showcase.headline}</h2>
                      <p>{electronicData.showcase.subheadline}</p>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <span className="rating-badge">4.8 ★</span>
                        <span style={{ fontSize: 13, color: '#e0e0e0' }}>GaneshKart Recommended</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <img 
                        src={electronicData.showcase.heroImage || activeImage} 
                        alt="Hero Showcase" 
                        style={{ maxHeight: 220, objectFit: 'contain', borderRadius: 8 }}
                      />
                    </div>
                  </div>

                  <div className="showcase-features-grid">
                    {electronicData.showcase.features?.map((feat, idx) => (
                      <div key={idx} className="showcase-feature-card">
                        <h4>{feat.title}</h4>
                        <p>{feat.desc}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="showcase-features-grid">
                  <div className="showcase-feature-card">
                    <h4>High-Performance Processing Engine</h4>
                    <p>Designed for multi-tasking, ultra-fast app launching, and fluid daily responsiveness.</p>
                  </div>
                  <div className="showcase-feature-card">
                    <h4>Stunning High-Refresh Visuals</h4>
                    <p>Experience ultra-smooth scrolling, vivid color accuracy, and high brightness outdoor visibility.</p>
                  </div>
                  <div className="showcase-feature-card">
                    <h4>All-Day Battery Endurance</h4>
                    <p>Optimized power management with rapid charging keeps you connected when it matters most.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Grouped Specifications */}
          {activeTab === 'specifications' && (
            <div>
              {electronicData.specs ? (
                Object.entries(electronicData.specs).map(([category, items]) => (
                  <div key={category} className="spec-category-group">
                    <h3 className="spec-category-title">{category}</h3>
                    <table className="specs-table">
                      <tbody>
                        {Object.entries(items).map(([key, val]) => (
                          <tr key={key}>
                            <td className="spec-key">{key}</td>
                            <td className="spec-val">{val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))
              ) : (
                <p>Detailed specifications will be updated shortly.</p>
              )}
            </div>
          )}

          {/* Tab 3: Description */}
          {activeTab === 'description' && (
            <div style={{ maxWidth: 850, lineHeight: 1.7, color: '#374151', fontSize: 14.5 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, color: 'var(--text-dark)' }}>
                About {product.name}
              </h3>
              <p style={{ marginBottom: 16 }}>{product.description}</p>
              <p>
                Engineered with precision for users who demand premium performance, striking aesthetics, 
                and reliable endurance. Certified under GaneshKart Assured testing standards with complete 
                peace-of-mind warranty protection.
              </p>
            </div>
          )}

          {/* Tab 4: Warranty */}
          {activeTab === 'warranty' && (
            <div style={{ maxWidth: 850, lineHeight: 1.7, color: '#374151', fontSize: 14 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, color: 'var(--text-dark)' }}>
                Warranty Summary
              </h3>
              <table className="specs-table" style={{ marginTop: 12 }}>
                <tbody>
                  <tr>
                    <td className="spec-key">Warranty Period</td>
                    <td className="spec-val">1 Year Manufacturer Domestic Warranty for Device</td>
                  </tr>
                  <tr>
                    <td className="spec-key">Accessories Warranty</td>
                    <td className="spec-val">6 Months Manufacturer Warranty for In-Box Accessories</td>
                  </tr>
                  <tr>
                    <td className="spec-key">Service Type</td>
                    <td className="spec-val">Carry-in service to authorized brand service centers across India</td>
                  </tr>
                  <tr>
                    <td className="spec-key">Covered in Warranty</td>
                    <td className="spec-val">Manufacturing Defects, internal component failures</td>
                  </tr>
                  <tr>
                    <td className="spec-key">Not Covered in Warranty</td>
                    <td className="spec-val">Physical damage, liquid damage, unauthorized repairs or tampering</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Similar Products Section */}
      {similarProducts.length > 0 && (
        <div className="similar-products-section">
          <div className="similar-products-header">
            <span>Similar Products</span>
            <span style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}>
              View All
            </span>
          </div>

          <div className="similar-products-grid">
            {similarProducts.map((p) => (
              <div
                key={p.id}
                className="similar-product-card"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  // Navigate to this product
                  onNavigate('product-details', null, p.id);
                }}
              >
                <img src={p.imageUrl} alt={p.name} className="similar-product-img" />
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-dark)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {p.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="rating-badge" style={{ fontSize: 11, padding: '2px 6px' }}>
                    {p.rating.toFixed(1)} ★
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 800 }}>
                    ₹{p.discountPrice.toLocaleString('en-IN')}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    ₹{p.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
