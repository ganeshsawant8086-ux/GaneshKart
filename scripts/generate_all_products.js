const fs = require('fs');
const path = require('path');

// 6 Categories x 30 items each = 180 Products
const CATEGORIES = [
  'Mobiles',
  'Electronics',
  'Appliances',
  'Fashion',
  'Home & Kitchen',
  'Grocery'
];

const RAW_PRODUCTS = [
  // ==========================================
  // 1. MOBILES (30 items)
  // ==========================================
  {
    name: 'Apple iPhone 16 Pro Max (Desert Titanium, 256 GB)',
    brand: 'Apple',
    category: 'Mobiles',
    price: 144900.00,
    discountPrice: 139900.00,
    rating: 4.9,
    stock: 25,
    description: 'Grade 5 titanium design, A18 Pro chip, 48MP Fusion camera with Camera Control button, and 4K 120 fps Dolby Vision recording.',
    imageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Apple iPhone 16 (Ultramarine, 128 GB)',
    brand: 'Apple',
    category: 'Mobiles',
    price: 79900.00,
    discountPrice: 74900.00,
    rating: 4.8,
    stock: 40,
    description: 'Dynamic Island, A18 chip built for Apple Intelligence, Camera Control, 48MP Fusion camera with 2x Telephoto, and all-day battery life.',
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Apple iPhone 15 Pro (Natural Titanium, 128 GB)',
    brand: 'Apple',
    category: 'Mobiles',
    price: 134900.00,
    discountPrice: 119900.00,
    rating: 4.8,
    stock: 20,
    description: 'Forged in titanium with A17 Pro gaming chip, customizable Action button, 48MP main camera, and USB-C with USB 3 speeds.',
    imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Apple iPhone 15 (Blue, 128 GB)',
    brand: 'Apple',
    category: 'Mobiles',
    price: 69900.00,
    discountPrice: 59900.00,
    rating: 4.7,
    stock: 50,
    description: 'Dynamic Island, 48MP Main camera with 2x Telephoto, durable color-infused glass and aluminum design with USB-C.',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Apple iPhone 14 Plus (Midnight, 128 GB)',
    brand: 'Apple',
    category: 'Mobiles',
    price: 69900.00,
    discountPrice: 54999.00,
    rating: 4.6,
    stock: 35,
    description: 'Big 6.7-inch Super Retina XDR display, extended battery life, cinematic mode in 4K Dolby Vision, and vital Crash Detection safety tech.',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Galaxy S24 Ultra 5G (Titanium Gray, 256 GB)',
    brand: 'Samsung',
    category: 'Mobiles',
    price: 134999.00,
    discountPrice: 119999.00,
    rating: 4.8,
    stock: 30,
    description: 'Experience Galaxy AI, Snapdragon 8 Gen 3, Quad Telephoto Camera 200MP with 100x zoom, and Titanium frame with built-in S-Pen.',
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Samsung Galaxy S24+ 5G (Cobalt Violet, 256 GB)',
    brand: 'Samsung',
    category: 'Mobiles',
    price: 99999.00,
    discountPrice: 84999.00,
    rating: 4.7,
    stock: 25,
    description: 'QHD+ Dynamic AMOLED 2X display, Armor Aluminum 2.0, Circle to Search with Google, and 4900 mAh all-day intelligent battery.',
    imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Samsung Galaxy S24 5G (Amber Yellow, 128 GB)',
    brand: 'Samsung',
    category: 'Mobiles',
    price: 79999.00,
    discountPrice: 64999.00,
    rating: 4.6,
    stock: 35,
    description: 'Compact flagship with 6.2-inch FHD+ 120Hz display, ProVisual Engine 50MP triple camera system, and Live Translate during calls.',
    imageUrl: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Samsung Galaxy Z Fold6 5G (Silver Shadow, 256 GB)',
    brand: 'Samsung',
    category: 'Mobiles',
    price: 164999.00,
    discountPrice: 154999.00,
    rating: 4.8,
    stock: 15,
    description: 'Ultra-thin symmetrical foldable with dual screen productivity, IP48 water resistance, Snapdragon 8 Gen 3, and AI Note Assist.',
    imageUrl: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Samsung Galaxy Z Flip6 5G (Mint, 256 GB)',
    brand: 'Samsung',
    category: 'Mobiles',
    price: 109999.00,
    discountPrice: 99999.00,
    rating: 4.7,
    stock: 20,
    description: 'Pocket-sized icon with 50MP wide camera, FlexWindow widgets, vapor chamber cooling, and auto-zoom hands-free photography.',
    imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Samsung Galaxy A55 5G (Awesome Iceblue, 128 GB)',
    brand: 'Samsung',
    category: 'Mobiles',
    price: 42999.00,
    discountPrice: 35999.00,
    rating: 4.5,
    stock: 45,
    description: 'Metal frame design with Corning Gorilla Glass Victus+, 50MP OIS camera, Samsung Knox Vault security, and 4 OS upgrades.',
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Samsung Galaxy M35 5G (Moonlight Blue, 128 GB)',
    brand: 'Samsung',
    category: 'Mobiles',
    price: 24999.00,
    discountPrice: 18999.00,
    rating: 4.4,
    stock: 60,
    description: 'Massive 6000 mAh battery, 120Hz sAMOLED display with Vision Booster, 50MP No Shake OIS camera, and Exynos 1380 processor.',
    imageUrl: 'https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Google Pixel 9 Pro XL (Porcelain, 128 GB)',
    brand: 'Google',
    category: 'Mobiles',
    price: 124999.00,
    discountPrice: 114999.00,
    rating: 4.8,
    stock: 20,
    description: 'Google Tensor G4 chip with Gemini Advanced, Super Actua 6.8-inch display, 30x Super Res Zoom, and Magic Editor reimagination.',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Google Pixel 9 (Peony, 128 GB)',
    brand: 'Google',
    category: 'Mobiles',
    price: 79999.00,
    discountPrice: 72999.00,
    rating: 4.7,
    stock: 30,
    description: 'Fresh elevated design, 50MP main sensor with 48MP ultrawide macro, Add Me photo group stitching, and 7 years of feature drops.',
    imageUrl: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Google Pixel 8 Pro (Bay Blue, 128 GB)',
    brand: 'Google',
    category: 'Mobiles',
    price: 106999.00,
    discountPrice: 84999.00,
    rating: 4.6,
    stock: 25,
    description: 'Pro camera controls, Best Take, Audio Magic Eraser, temperature sensor, and brilliant matte glass back with polished aluminum.',
    imageUrl: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Google Pixel 8a (Aloe Green, 128 GB)',
    brand: 'Google',
    category: 'Mobiles',
    price: 52999.00,
    discountPrice: 44999.00,
    rating: 4.5,
    stock: 40,
    description: 'Delightful matte finish, Google Tensor G3, Actua 120Hz display, IP67 water resistance, and industry-leading call assist.',
    imageUrl: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'OnePlus 12 5G (Flowy Emerald, 512 GB)',
    brand: 'OnePlus',
    category: 'Mobiles',
    price: 69999.00,
    discountPrice: 64999.00,
    rating: 4.7,
    stock: 30,
    description: 'Snapdragon 8 Gen 3, 4th Gen Hasselblad Camera for Mobile, 2K 120Hz ProXDR display, and 100W SUPERVOOC + 50W AIRVOOC charging.',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'OnePlus 12R 5G (Cool Blue, 256 GB)',
    brand: 'OnePlus',
    category: 'Mobiles',
    price: 45999.00,
    discountPrice: 39999.00,
    rating: 4.6,
    stock: 45,
    description: 'Flagship killer with Snapdragon 8 Gen 2, 4th Gen LTPO 120Hz display, 5500 mAh battery, and Trinity Engine performance gaming.',
    imageUrl: 'https://images.unsplash.com/photo-1533228896884-6a8f9312804b?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'OnePlus Open Foldable 5G (Emerald Dusk, 512 GB)',
    brand: 'OnePlus',
    category: 'Mobiles',
    price: 149999.00,
    discountPrice: 139999.00,
    rating: 4.8,
    stock: 12,
    description: 'Groundbreaking featherweight foldable design, Sony LYT-T808 Pixel Stacked sensor, Open Canvas multi-tasking, and dual ProXDR displays.',
    imageUrl: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'OnePlus Nord 4 5G (Mercurial Silver, 256 GB)',
    brand: 'OnePlus',
    category: 'Mobiles',
    price: 32999.00,
    discountPrice: 28999.00,
    rating: 4.5,
    stock: 50,
    description: 'Only metal unibody 5G smartphone with Snapdragon 7+ Gen 3, Sony 50MP LYT-600 OIS camera, and 100W flash charging.',
    imageUrl: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Xiaomi 14 Ultra (Titanium Edition, 512 GB)',
    brand: 'Xiaomi',
    category: 'Mobiles',
    price: 119999.00,
    discountPrice: 99999.00,
    rating: 4.8,
    stock: 15,
    description: 'Leica Quad Camera with 1-inch LYT-900 sensor, stepless variable aperture f/1.63-f/4.0, WQHD+ 120Hz AMOLED, and 90W HyperCharge.',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Redmi Note 13 Pro+ 5G (Fusion Purple, 256 GB)',
    brand: 'Xiaomi',
    category: 'Mobiles',
    price: 33999.00,
    discountPrice: 27999.00,
    rating: 4.5,
    stock: 55,
    description: 'Super clear 200MP OIS camera, 1.5K 120Hz 3D Curved AMOLED display, 120W HyperCharge (0-100% in 19 mins), and IP68 rating.',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Xiaomi 14 CIVI (Shadow Black, 256 GB)',
    brand: 'Xiaomi',
    category: 'Mobiles',
    price: 47999.00,
    discountPrice: 39999.00,
    rating: 4.6,
    stock: 35,
    description: 'Floating quad-curved display, dual 32MP Leica front cameras, Snapdragon 8s Gen 3, and Leica Summilux lens optics.',
    imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Vivo X100 Pro 5G (Asteroid Black, 512 GB)',
    brand: 'Vivo',
    category: 'Mobiles',
    price: 96999.00,
    discountPrice: 89999.00,
    rating: 4.7,
    stock: 20,
    description: 'ZEISS 1-inch Main Camera with APO Floating Telephoto, Dimensity 9300 chipset, V3 imaging chip, and 100W FlashCharge.',
    imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Vivo V40 Pro 5G (Ganges Blue, 256 GB)',
    brand: 'Vivo',
    category: 'Mobiles',
    price: 54999.00,
    discountPrice: 49999.00,
    rating: 4.5,
    stock: 40,
    description: 'ZEISS Multifocal Portrait, 50MP Sony IMX921 sensor, 5500 mAh BlueVolt ultra-slim battery, and Studio-quality Aura Light.',
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Oppo Find N3 Flip (Sleek Black, 256 GB)',
    brand: 'Oppo',
    category: 'Mobiles',
    price: 94999.00,
    discountPrice: 69999.00,
    rating: 4.6,
    stock: 18,
    description: 'Industry-first triple camera flip phone with Hasselblad telephoto portrait lens, intuitive vertical cover screen, and Flexion hinge.',
    imageUrl: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Realme GT 6 5G (Fluid Silver, 256 GB)',
    brand: 'Realme',
    category: 'Mobiles',
    price: 44999.00,
    discountPrice: 38999.00,
    rating: 4.5,
    stock: 35,
    description: 'Snapdragon 8s Gen 3 flagship, 6000-nit ultra-bright 8T LTPO display, Sony LYT-808 OIS camera, and 120W SUPERVOOC charging.',
    imageUrl: 'https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Motorola Edge 50 Ultra (Peach Fuzz, 512 GB)',
    brand: 'Motorola',
    category: 'Mobiles',
    price: 64999.00,
    discountPrice: 54999.00,
    rating: 4.6,
    stock: 25,
    description: 'Real wood & vegan leather rear finish, Pantone Validated camera and display, Snapdragon 8s Gen 3, and 125W TurboPower.',
    imageUrl: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Nothing Phone (2a) Plus (Metallic Grey, 256 GB)',
    brand: 'Nothing',
    category: 'Mobiles',
    price: 29999.00,
    discountPrice: 25999.00,
    rating: 4.4,
    stock: 50,
    description: 'Iconic transparent design with Glyph Interface, MediaTek Dimensity 7350 Pro 5G, dual 50MP rear cameras, and 50MP selfie camera.',
    imageUrl: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Asus ROG Phone 8 Pro (Phantom Black, 512 GB)',
    brand: 'Asus',
    category: 'Mobiles',
    price: 104999.00,
    discountPrice: 94999.00,
    rating: 4.8,
    stock: 15,
    description: 'Ultimate gaming beast with Snapdragon 8 Gen 3, 165Hz Samsung AMOLED, AniMe Vision programmable mini-LED back, and AirTrigger ultrasonic buttons.',
    imageUrl: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80'
  },

  // ==========================================
  // 2. ELECTRONICS (30 items)
  // ==========================================
  {
    name: 'Apple MacBook Air M3 (13.6-inch, 16GB RAM, 512GB SSD)',
    brand: 'Apple',
    category: 'Electronics',
    price: 134900.00,
    discountPrice: 124900.00,
    rating: 4.9,
    stock: 20,
    description: 'Lean, mean, M3 machine. Liquid Retina display, up to 18 hours battery life, 1080p FaceTime HD camera, and silent fanless design.',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Apple MacBook Pro M3 Max (16-inch, 36GB RAM, 1TB SSD)',
    brand: 'Apple',
    category: 'Electronics',
    price: 349900.00,
    discountPrice: 329900.00,
    rating: 5.0,
    stock: 10,
    description: 'Extreme workstation performance with 14-core CPU, 30-core GPU, Liquid Retina XDR with 1600 nits peak brightness, and HDMI 2.1.',
    imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Apple iPad Pro 13-inch M4 (Ultra Retina OLED, 256GB)',
    brand: 'Apple',
    category: 'Electronics',
    price: 129900.00,
    discountPrice: 121900.00,
    rating: 4.9,
    stock: 22,
    description: 'Thinnest Apple product ever at 5.1mm, breakthrough tandem OLED display, M4 neural engine chip, and Apple Pencil Pro support.',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Apple iPad Air 11-inch M2 (Starlight, 128GB)',
    brand: 'Apple',
    category: 'Electronics',
    price: 59900.00,
    discountPrice: 54900.00,
    rating: 4.8,
    stock: 35,
    description: 'Supercharged by Apple M2 chip, 11-inch Liquid Retina display with P3 wide color, landscape 12MP front camera with Center Stage.',
    imageUrl: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Apple Watch Ultra 2 (49mm Titanium GPS + Cellular)',
    brand: 'Apple',
    category: 'Electronics',
    price: 89900.00,
    discountPrice: 84900.00,
    rating: 4.9,
    stock: 25,
    description: 'Rugged titanium case, 3000-nit Always-On Retina display, S9 SiP, dual-frequency precision GPS, and 72-hour battery life.',
    imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Apple Watch Series 9 (45mm Midnight Aluminum, GPS)',
    brand: 'Apple',
    category: 'Electronics',
    price: 44900.00,
    discountPrice: 38900.00,
    rating: 4.7,
    stock: 40,
    description: 'S9 chip with magic Double Tap gesture control, brighter display, on-device Siri, and advanced ECG / blood oxygen health monitoring.',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Apple AirPods Pro 2nd Gen with USB-C MagSafe Case',
    brand: 'Apple',
    category: 'Electronics',
    price: 24900.00,
    discountPrice: 20900.00,
    rating: 4.8,
    stock: 60,
    description: 'Up to 2x more Active Noise Cancellation, Adaptive Audio, Transparency mode, Personalized Spatial Audio with dynamic head tracking.',
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Apple AirPods Max Wireless Over-Ear Headphones (Space Grey)',
    brand: 'Apple',
    category: 'Electronics',
    price: 59900.00,
    discountPrice: 53900.00,
    rating: 4.7,
    stock: 18,
    description: 'Apple-designed dynamic driver for high-fidelity audio, computational audio with H1 chips, knit-mesh canopy, and memory foam ear cushions.',
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    brand: 'Sony',
    category: 'Electronics',
    price: 34990.00,
    discountPrice: 26990.00,
    rating: 4.8,
    stock: 45,
    description: 'Industry-leading noise cancellation with 8 microphones, Auto NC Optimizer, crystal clear hands-free calling, and 30 hours playback.',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Sony WF-1000XM5 ANC True Wireless Earbuds',
    brand: 'Sony',
    category: 'Electronics',
    price: 29990.00,
    discountPrice: 21990.00,
    rating: 4.6,
    stock: 35,
    description: 'Dynamic Driver X for rich vocals and deep bass, dual feedback microphones, bone conduction sensors, and AI speech noise reduction.',
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Sony PlayStation 5 Slim Console (1TB SSD, DualSense)',
    brand: 'Sony',
    category: 'Electronics',
    price: 54990.00,
    discountPrice: 49990.00,
    rating: 4.9,
    stock: 30,
    description: 'Slimmer design with 1TB SSD storage, ultra-high speed loading, haptic feedback, adaptive triggers, and Tempest 3D AudioTech.',
    imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Sony PlayStation VR2 Horizon Call of the Mountain Bundle',
    brand: 'Sony',
    category: 'Electronics',
    price: 61999.00,
    discountPrice: 54999.00,
    rating: 4.7,
    stock: 12,
    description: '4K HDR visuals with 110-degree field of view, intelligent eye tracking, headset feedback, and PS VR2 Sense controllers.',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Bose QuietComfort Ultra Wireless Noise Cancelling Headphones',
    brand: 'Bose',
    category: 'Electronics',
    price: 35900.00,
    discountPrice: 29900.00,
    rating: 4.7,
    stock: 28,
    description: 'Groundbreaking spatialized Bose Immersive Audio, world-class noise cancellation, CustomTune technology, and luxe protein leather cushions.',
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Bose SoundLink Flex Bluetooth Portable Speaker',
    brand: 'Bose',
    category: 'Electronics',
    price: 15900.00,
    discountPrice: 12900.00,
    rating: 4.6,
    stock: 50,
    description: 'Clear deep sound with PositionIQ technology, IP67 waterproof & dustproof, silicone body resistant to drops, and 12 hours battery.',
    imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Dell Inspiron 15 (Core i5 13th Gen, 16GB, 512GB SSD, FHD 120Hz)',
    brand: 'Dell',
    category: 'Electronics',
    price: 68990.00,
    discountPrice: 52990.00,
    rating: 4.4,
    stock: 30,
    description: 'Designed for daily productivity with Intel Core i5-1335U, anti-glare display, Windows 11 Home & MS Office 2021 pre-installed.',
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Dell XPS 15 (Core i7 13th Gen, OLED 3.5K, 32GB RAM, 1TB SSD)',
    brand: 'Dell',
    category: 'Electronics',
    price: 249990.00,
    discountPrice: 224990.00,
    rating: 4.8,
    stock: 12,
    description: 'InfinityEdge 16:10 OLED touch display, NVIDIA GeForce RTX 4060, CNC machined aluminum and carbon fiber palm rest.',
    imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'HP Pavilion 15 (AMD Ryzen 7, 16GB, 512GB SSD, FHD IPS)',
    brand: 'HP',
    category: 'Electronics',
    price: 74990.00,
    discountPrice: 59990.00,
    rating: 4.5,
    stock: 35,
    description: 'Fast multitasking with AMD Ryzen 7 7730U 8-core processor, Audio by B&O, backlit keyboard, and HP Fast Charge technology.',
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'HP Spectre x360 2-in-1 (Intel Core Ultra 7, 16GB, 1TB OLED)',
    brand: 'HP',
    category: 'Electronics',
    price: 179990.00,
    discountPrice: 159990.00,
    rating: 4.8,
    stock: 15,
    description: 'Intel Evo platform with built-in AI NPU, 2.8K 120Hz IMAX Enhanced OLED touch display, 9MP AI camera with night mode, and HP MPP2.0 tilt pen.',
    imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Lenovo ThinkPad X1 Carbon Gen 11 (Intel i7, 16GB, 1TB SSD)',
    brand: 'Lenovo',
    category: 'Electronics',
    price: 198900.00,
    discountPrice: 174900.00,
    rating: 4.8,
    stock: 18,
    description: 'Ultralight carbon-fiber chassis, legendary TrackPoint keyboard, Dolby Atmos sound, MIL-STD 810H durability, and 57Wh battery.',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Lenovo Legion Pro 5i Gaming Laptop (RTX 4070, 32GB, 1TB)',
    brand: 'Lenovo',
    category: 'Electronics',
    price: 189990.00,
    discountPrice: 164990.00,
    rating: 4.7,
    stock: 20,
    description: 'Intel Core i9-14900HX, NVIDIA GeForce RTX 4070 8GB GDDR6 (140W TGP), 16-inch WQXGA 240Hz 500 nits display, and Legion ColdFront 5.0.',
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Asus ROG Zephyrus G16 Gaming Laptop (OLED 240Hz, RTX 4080)',
    brand: 'Asus',
    category: 'Electronics',
    price: 269990.00,
    discountPrice: 239990.00,
    rating: 4.9,
    stock: 10,
    description: 'CNC aluminum chassis with Slash Lighting, 2.5K ROG Nebula OLED 240Hz 0.2ms, Intel Core Ultra 9, and liquid metal vapor chamber cooling.',
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Asus Zenbook 14 OLED (Intel Core Ultra 5, 16GB, 1TB SSD)',
    brand: 'Asus',
    category: 'Electronics',
    price: 109990.00,
    discountPrice: 94990.00,
    rating: 4.6,
    stock: 28,
    description: 'Featherlight 1.2 kg all-metal chassis, 3K 120Hz ASUS Lumina OLED display, 75Wh battery with 15+ hours life, and Harman Kardon audio.',
    imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Marshall Stanmore III Bluetooth Home Speaker (Black)',
    brand: 'Marshall',
    category: 'Electronics',
    price: 37999.00,
    discountPrice: 31999.00,
    rating: 4.8,
    stock: 35,
    description: 'Re-engineered for wider soundstage, outward-angled tweeters and updated waveguides, Dynamic Loudness, and PVC-free vegan construction.',
    imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Marshall Emberton II Portable Waterproof Speaker (Brass)',
    brand: 'Marshall',
    category: 'Electronics',
    price: 19999.00,
    discountPrice: 15999.00,
    rating: 4.7,
    stock: 45,
    description: 'Signature True Stereophonic multi-directional sound, 30+ hours portable playtime, IP67 dust and water resistance, and Stack Mode.',
    imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'boAt Nirvana Ion ANC True Wireless Earbuds (120H Playtime)',
    brand: 'boAt',
    category: 'Electronics',
    price: 7990.00,
    discountPrice: 2499.00,
    rating: 4.3,
    stock: 120,
    description: 'Active Noise Cancellation up to 32dB, Quad Mics with ENx technology, Dual EQ Modes, Beast Mode 60ms low latency for gaming.',
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Canon EOS R6 Mark II Mirrorless Camera with 24-105mm Lens',
    brand: 'Canon',
    category: 'Electronics',
    price: 279995.00,
    discountPrice: 249990.00,
    rating: 4.9,
    stock: 14,
    description: '24.2MP full-frame CMOS sensor, 40 fps electronic shutter, 6K oversampled 4K 60p video, 8-stop In-Body Image Stabilization (IBIS).',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Nikon Z6 III Full Frame Mirrorless Camera Body',
    brand: 'Nikon',
    category: 'Electronics',
    price: 247990.00,
    discountPrice: 224990.00,
    rating: 4.8,
    stock: 12,
    description: 'World-first partially-stacked CMOS sensor, 120 fps continuous shooting, 6K/60p N-RAW internal recording, and 5760k-dot bright EVF.',
    imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'DJI Mini 4 Pro Drone with RC 2 Smart Controller',
    brand: 'DJI',
    category: 'Electronics',
    price: 114990.00,
    discountPrice: 99990.00,
    rating: 4.9,
    stock: 18,
    description: 'Sub-249g ultra-light foldable drone, omnidirectional obstacle sensing, 4K/60fps HDR true vertical shooting, and 20 km FHD video transmission.',
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Microsoft Xbox Series X 1TB Gaming Console',
    brand: 'Microsoft',
    category: 'Electronics',
    price: 55990.00,
    discountPrice: 47990.00,
    rating: 4.8,
    stock: 25,
    description: 'Fastest most powerful Xbox ever with 12 teraflops raw graphical processing power, 4K gaming at up to 120fps, and Xbox Velocity Architecture.',
    imageUrl: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Nintendo Switch OLED Model (Neon Red & Neon Blue)',
    brand: 'Nintendo',
    category: 'Electronics',
    price: 37999.00,
    discountPrice: 31999.00,
    rating: 4.8,
    stock: 40,
    description: 'Vibrant 7-inch OLED screen, wide adjustable stand for tabletop mode, dock with wired LAN port, 64 GB internal storage, and enhanced audio.',
    imageUrl: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=800&q=80'
  },

  // ==========================================
  // 3. APPLIANCES (30 items)
  // ==========================================
  {
    name: 'LG 55-inch 4K Ultra HD Smart OLED TV (WebOS, Dolby Atmos)',
    brand: 'LG',
    category: 'Appliances',
    price: 169990.00,
    discountPrice: 114990.00,
    rating: 4.8,
    stock: 15,
    description: 'Self-lit OLED pixels for infinite contrast, α9 AI Processor Gen6 4K, 120Hz refresh rate, Dolby Vision IQ, and Dolby Atmos cinematic sound.',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'LG 65-inch 4K Smart QNED TV (Quantum Dot NanoCell, 120Hz)',
    brand: 'LG',
    category: 'Appliances',
    price: 149990.00,
    discountPrice: 104990.00,
    rating: 4.7,
    stock: 18,
    description: 'Quantum Dot meets NanoCell for ultra-rich colors, Dimming Pro, α8 AI Processor 4K, AMD FreeSync, and 4 HDMI 2.1 ports for console gaming.',
    imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Samsung 65-inch The Frame QLED 4K Smart TV',
    brand: 'Samsung',
    category: 'Appliances',
    price: 189900.00,
    discountPrice: 129990.00,
    rating: 4.8,
    stock: 12,
    description: 'Matte Display anti-reflection technology, transforms into a museum art frame when turned off, 100% color volume with Quantum Dot.',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Samsung 253 L 3 Star Inverter Frost-Free Double Door Refrigerator',
    brand: 'Samsung',
    category: 'Appliances',
    price: 31990.00,
    discountPrice: 24490.00,
    rating: 4.5,
    stock: 25,
    description: 'Digital Inverter Technology for 50% energy savings, Moist Fresh Zone to keep vegetables fresh longer, and toughened glass shelves.',
    imageUrl: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Samsung 653 L Side-by-Side Convertible 5-in-1 Refrigerator',
    brand: 'Samsung',
    category: 'Appliances',
    price: 112990.00,
    discountPrice: 81990.00,
    rating: 4.8,
    stock: 10,
    description: 'SpaceMax technology, SmartThings AI Energy mode, Twin Cooling Plus for optimal humidity, and fingerprint-resistant matte stainless steel finish.',
    imageUrl: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Sony Bravia 55-inch 4K Ultra HD Smart LED Google TV',
    brand: 'Sony',
    category: 'Appliances',
    price: 89900.00,
    discountPrice: 57990.00,
    rating: 4.7,
    stock: 20,
    description: '4K Processor X1, 4K X-Reality PRO upscaling, Motionflow XR 200, Bass Reflex speaker with Dolby Audio, and hands-free Google voice search.',
    imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Sony Bravia Theatre Bar 8 Dolby Atmos Soundbar with Subwoofer',
    brand: 'Sony',
    category: 'Appliances',
    price: 109990.00,
    discountPrice: 89990.00,
    rating: 4.8,
    stock: 15,
    description: '360 Spatial Sound Mapping technology, 11 speaker units, wireless subwoofer, Acoustic Center Sync with Bravia TVs, and 8K HDR passthrough.',
    imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'IFB 7 Kg 5 Star Fully Automatic Front Load Washing Machine',
    brand: 'IFB',
    category: 'Appliances',
    price: 38990.00,
    discountPrice: 31490.00,
    rating: 4.4,
    stock: 22,
    description: 'Steam wash with 99.99% germ elimination, 2X Power Steam, 3D Wash system, Inbuilt heater for hygienic hot water cycle, and Aqua Energie.',
    imageUrl: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'IFB 8.5 Kg 5 Star Front Load Washer Dryer Combo (Executive ZXS)',
    brand: 'IFB',
    category: 'Appliances',
    price: 68990.00,
    discountPrice: 53990.00,
    rating: 4.6,
    stock: 14,
    description: '100% dry clothes ready to wear, AI powered fabric sensor, 9 swirl wash modes, steam refreshment, and whisper-quiet Eco Inverter motor.',
    imageUrl: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Bosch 8 Kg 5 Star Fully Automatic Front Load Washing Machine',
    brand: 'Bosch',
    category: 'Appliances',
    price: 49990.00,
    discountPrice: 37990.00,
    rating: 4.6,
    stock: 20,
    description: 'German engineered EcoSilence Drive motor with 10-year warranty, Anti-Tangle feature, ActiveWater Plus load sensing, and 1400 RPM spin speed.',
    imageUrl: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Bosch 13 Place Settings Free-Standing Dishwasher (Polinox Tub)',
    brand: 'Bosch',
    category: 'Appliances',
    price: 45990.00,
    discountPrice: 38990.00,
    rating: 4.7,
    stock: 16,
    description: 'Specially designed for Indian utensils and oily kadhais, Intensive Kadhai 70°C program, DosageAssist, and saves up to 80% water compared to hand washing.',
    imageUrl: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Whirlpool 240L Frost Free Triple Door Refrigerator (Alpha Steel)',
    brand: 'Whirlpool',
    category: 'Appliances',
    price: 34990.00,
    discountPrice: 26490.00,
    rating: 4.5,
    stock: 30,
    description: 'Protton 3-door design with Active Fresh Zone preventing odor mixing, Microblock technology preventing 99% bacterial growth, and Zeolite technology.',
    imageUrl: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Whirlpool 7.5 Kg 5 Star Top Load Washing Machine',
    brand: 'Whirlpool',
    category: 'Appliances',
    price: 22990.00,
    discountPrice: 16490.00,
    rating: 4.3,
    stock: 40,
    description: 'Spiro Wash action for 20% deeper cleaning, 6th Sense Smart Sensors, hard water wash support, and Zero Pressure Fill technology.',
    imageUrl: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Philips 4.1L Digital Air Fryer with Rapid Air Technology',
    brand: 'Philips',
    category: 'Appliances',
    price: 11995.00,
    discountPrice: 7999.00,
    rating: 4.6,
    stock: 60,
    description: 'Fry with up to 90% less fat. 12-in-1 cooking functions including bake, grill, roast and reheat. Digital touch screen with 7 presets.',
    imageUrl: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Philips Daily Collection 750W 4-Jar Mixer Grinder (Pistachio Green)',
    brand: 'Philips',
    category: 'Appliances',
    price: 5495.00,
    discountPrice: 3499.00,
    rating: 4.4,
    stock: 75,
    description: 'Powerful 750W torque motor with air ventilation for tough batter grinding, 4 leak-proof stainless steel jars with secure locking.',
    imageUrl: 'https://images.unsplash.com/photo-1584269600519-112d071b35e6?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Dyson V12 Detect Slim Total Clean Cordless Vacuum Cleaner',
    brand: 'Dyson',
    category: 'Appliances',
    price: 55900.00,
    discountPrice: 44900.00,
    rating: 4.7,
    stock: 18,
    description: 'Laser reveals invisible dust on hard floors, piezo sensor measures microscopic dust particles, LCD screen proves deep clean scientific proof.',
    imageUrl: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Dyson Pure Cool Link Air Purifier with HEPA Filter',
    brand: 'Dyson',
    category: 'Appliances',
    price: 39900.00,
    discountPrice: 28900.00,
    rating: 4.6,
    stock: 22,
    description: 'Automatically captures 99.95% of allergens and pollutants as small as 0.1 microns, 360-degree vacuum-sealed glass HEPA, and bladeless fan cooling.',
    imageUrl: 'https://images.unsplash.com/photo-1585338447937-70c22592fc92?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'DeLonghi Dedica Deluxe Pump Espresso Coffee Machine',
    brand: 'DeLonghi',
    category: 'Appliances',
    price: 24999.00,
    discountPrice: 18999.00,
    rating: 4.6,
    stock: 22,
    description: '15-bar professional pressure creates authentic crema, adjustable manual frother for velvety lattes and cappuccinos, ultra-compact 6-inch metal body.',
    imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'DeLonghi Magnifica S Fully Automatic Bean-to-Cup Coffee Maker',
    brand: 'DeLonghi',
    category: 'Appliances',
    price: 69990.00,
    discountPrice: 54990.00,
    rating: 4.8,
    stock: 12,
    description: 'Integrated steel burr grinder with 13 grind settings, brew two cups simultaneously, one-touch espresso and long coffee, easy-clean brew group.',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Daikin 1.5 Ton 5 Star Inverter Split Air Conditioner (Copper)',
    brand: 'Daikin',
    category: 'Appliances',
    price: 64900.00,
    discountPrice: 45990.00,
    rating: 4.7,
    stock: 25,
    description: 'Triple Display technology showing power consumption, PM2.5 filter, Dew Clean technology for auto evaporator self-cleaning, and 10-year compressor warranty.',
    imageUrl: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Voltas 1.5 Ton 3 Star Inverter Split AC with Anti-Dust Filter',
    brand: 'Voltas',
    category: 'Appliances',
    price: 59990.00,
    discountPrice: 34990.00,
    rating: 4.3,
    stock: 40,
    description: 'Adjustable cooling with 4-in-1 convertible modes, high ambient cooling up to 52°C, 100% copper condenser tubes, and CO2 reduction sensor.',
    imageUrl: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Blue Star 1 Ton 5 Star Inverter Split AC',
    brand: 'Blue Star',
    category: 'Appliances',
    price: 52990.00,
    discountPrice: 36990.00,
    rating: 4.5,
    stock: 28,
    description: 'Turbo Cool instant cooling in 60 seconds, Acoustic Jacket for quiet operation, anti-corrosive Blue Fins, and stabilizer-free operation.',
    imageUrl: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Kent Grand Plus RO + UV + UF + TDS Water Purifier (9 Litre)',
    brand: 'Kent',
    category: 'Appliances',
    price: 21000.00,
    discountPrice: 15499.00,
    rating: 4.6,
    stock: 50,
    description: 'Mineral RO Technology with in-tank UV disinfection, Zero Water Wastage recirculation technology, TDS control valve, and 20L/hr purification capacity.',
    imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Aquaguard Marvel NXT RO + UV + Active Copper Water Purifier',
    brand: 'Eureka Forbes',
    category: 'Appliances',
    price: 18999.00,
    discountPrice: 13499.00,
    rating: 4.5,
    stock: 45,
    description: 'Infuses right amount of copper and zinc ions into purified water, Taste Adjuster technology, 6.2L compact transparent storage tank.',
    imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Xiaomi Robot Vacuum Mop 2 Pro (LDS Laser Navigation)',
    brand: 'Xiaomi',
    category: 'Appliances',
    price: 34999.00,
    discountPrice: 24999.00,
    rating: 4.6,
    stock: 20,
    description: 'High-frequency sonic vibration mopping with 10,000 vibrations/min, 3000 Pa powerful suction, multi-floor LDS mapping, and Alexa/Google support.',
    imageUrl: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Morphy Richards 30L Convection Microwave Oven (Motorised Rotisserie)',
    brand: 'Morphy Richards',
    category: 'Appliances',
    price: 18995.00,
    discountPrice: 12999.00,
    rating: 4.4,
    stock: 30,
    description: 'Stainless steel cavity for even heat distribution, 200 auto cook menus, motorized rotisserie for tandoori kebabs, and child lock safety.',
    imageUrl: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Panasonic 27L Convection Microwave Oven with 360 Heat',
    brand: 'Panasonic',
    category: 'Appliances',
    price: 16990.00,
    discountPrice: 11490.00,
    rating: 4.5,
    stock: 35,
    description: 'Zero oil recipes with Magic Grill, 101 pre-set auto cook menus, touch keypad with membrane control, and auto defrost function.',
    imageUrl: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Havells Meditate Air Purifier with UV Tech & HEPA Filter',
    brand: 'Havells',
    category: 'Appliances',
    price: 26990.00,
    discountPrice: 16990.00,
    rating: 4.5,
    stock: 30,
    description: 'Advanced TiO2 module eliminates pathogenic microbes, 6-stage purification with True HEPA 14, real-time AQI digital display.',
    imageUrl: 'https://images.unsplash.com/photo-1585338447937-70c22592fc92?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Usha Quartz Room Heater with Overheating Protection',
    brand: 'Usha',
    category: 'Appliances',
    price: 1990.00,
    discountPrice: 1299.00,
    rating: 4.2,
    stock: 70,
    description: 'Instant heating with 2 quartz heating tubes, low power consumption, tip-over safety switch, and rust-proof powder coated finish.',
    imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Bajaj New Shakti Neo 15L Vertical Storage Water Geyser',
    brand: 'Bajaj',
    category: 'Appliances',
    price: 9990.00,
    discountPrice: 6299.00,
    rating: 4.4,
    stock: 45,
    description: 'Titanium Armor glass-lined tank, swirling water jet technology, 8 bar pressure suitable for high-rise buildings, and 5-star energy rating.',
    imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
  },

  // ==========================================
  // 4. FASHION (30 items)
  // ==========================================
  {
    name: 'FabIndia Men Pure Silk Blend Kurta & Churidar Set (Maroon)',
    brand: 'FabIndia',
    category: 'Fashion',
    price: 5999.00,
    discountPrice: 3499.00,
    rating: 4.5,
    stock: 35,
    description: 'Intricately woven festive ethnic wear kurta set with mandarin collar and side slits, tailored in breathable premium silk blend.',
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'FabIndia Women Hand Block Printed Cotton Anarkali Kurta',
    brand: 'FabIndia',
    category: 'Fashion',
    price: 3990.00,
    discountPrice: 2490.00,
    rating: 4.6,
    stock: 50,
    description: 'Pure artisan mulmul cotton with Bagru botanical hand block prints, flattering flared silhouette, and round neck with wooden button detailing.',
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Manyavar Men Embroidered Jacquard Indo-Western Sherwani',
    brand: 'Manyavar',
    category: 'Fashion',
    price: 18999.00,
    discountPrice: 14999.00,
    rating: 4.8,
    stock: 20,
    description: 'Royal wedding wear tailored in rich metallic brocade with zardozi hand embroidery on collar and cuffs, paired with dhoti trousers.',
    imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Kanjivaram Soft Silk Saree with Zari Woven Border (Royal Blue)',
    brand: 'Viramani',
    category: 'Fashion',
    price: 8999.00,
    discountPrice: 2799.00,
    rating: 4.7,
    stock: 45,
    description: 'Authentic South Indian festive pure soft lichi silk saree featuring woven rich pallu and matching unstitched blouse piece.',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Banarasi Georgette Handloom Silk Saree (Crimson Red)',
    brand: 'Viramani',
    category: 'Fashion',
    price: 12999.00,
    discountPrice: 4999.00,
    rating: 4.8,
    stock: 30,
    description: 'Exquisite Varanasi bridal saree woven with real gold electroplated zari motifs, delicate floral jaal, and heavy tassel pallu.',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Titan Karishma Analog Watch for Men (Champagne Dial)',
    brand: 'Titan',
    category: 'Fashion',
    price: 3995.00,
    discountPrice: 2795.00,
    rating: 4.6,
    stock: 80,
    description: 'Classic gold-tone stainless steel strap, water resistant to 30 meters, scratch-resistant mineral glass with 2-year warranty.',
    imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Titan Raga Viva Rose Gold Analog Watch for Women',
    brand: 'Titan',
    category: 'Fashion',
    price: 5495.00,
    discountPrice: 3995.00,
    rating: 4.7,
    stock: 65,
    description: 'Jeweled bracelet design in polished rose gold, mother of pearl dial with Swarovski crystals, and jewelry clasp closure.',
    imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Fossil Grant Chronograph Dark Brown Leather Watch',
    brand: 'Fossil',
    category: 'Fashion',
    price: 13495.00,
    discountPrice: 8095.00,
    rating: 4.6,
    stock: 45,
    description: 'Inspired by vintage clocks, Roman numeral markers, stopwatch functionality, and interchangeable genuine supple calfskin leather strap.',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Fossil Jacqueline Stainless Steel Rose Gold Watch for Women',
    brand: 'Fossil',
    category: 'Fashion',
    price: 11995.00,
    discountPrice: 7195.00,
    rating: 4.7,
    stock: 40,
    description: 'Slender 36mm stainless steel case, subtle sunray dial with Roman numerals, date window, and 3-link mesh steel bracelet.',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Casio G-Shock GA-2100 Black Carbon Core Guard Watch (CasiOak)',
    brand: 'Casio',
    category: 'Fashion',
    price: 8995.00,
    discountPrice: 7495.00,
    rating: 4.8,
    stock: 60,
    description: 'Ultra-tough octagonal bezel, carbon fiber reinforced resin case, 200m water resistance, world time, and double LED illuminator.',
    imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Seiko 5 Sports Automatic Steel Watch (Navy Blue Dial)',
    brand: 'Seiko',
    category: 'Fashion',
    price: 25000.00,
    discountPrice: 21500.00,
    rating: 4.9,
    stock: 25,
    description: 'Iconic Japanese 4R36 automatic movement with 41-hour power reserve, LumiBrite hands, exhibition case back, and 100m water resistance.',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Puma Unisex RS-X Softstyle Running & Lifestyle Sneakers',
    brand: 'Puma',
    category: 'Fashion',
    price: 8999.00,
    discountPrice: 4499.00,
    rating: 4.4,
    stock: 50,
    description: 'Chunky retro silhouette with lightweight PU midsole, mesh upper with suede overlays, and superior grip rubber outsole.',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Puma Smash V2 Leather Low-Top Casual Sneakers (White/Navy)',
    brand: 'Puma',
    category: 'Fashion',
    price: 4499.00,
    discountPrice: 2299.00,
    rating: 4.3,
    stock: 70,
    description: 'Tennis-inspired clean street sneaker with soft genuine leather upper, SoftFoam+ comfort sockliner, and durable vulcanized sole.',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Nike Air Jordan 1 Retro High OG Basketball Sneakers',
    brand: 'Nike',
    category: 'Fashion',
    price: 16995.00,
    discountPrice: 13995.00,
    rating: 4.8,
    stock: 28,
    description: 'Iconic high-top silhouette in genuine full-grain leather, encapsulated Air-Sole unit for lightweight cushioning, and solid rubber traction.',
    imageUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Nike Air Force 1 07 Triple White Casual Shoes',
    brand: 'Nike',
    category: 'Fashion',
    price: 8195.00,
    discountPrice: 7495.00,
    rating: 4.8,
    stock: 55,
    description: 'The basketball legend that became an iconic fashion staple. Stitched leather overlays, pivot-circle tread, and Nike Air cushioning.',
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Nike Pegasus 41 Road Running Shoes (Black/Volt)',
    brand: 'Nike',
    category: 'Fashion',
    price: 11895.00,
    discountPrice: 9495.00,
    rating: 4.7,
    stock: 40,
    description: 'Responsive everyday running with dual Air Zoom units, upgraded ReactX foam midsole for 13% more energy return, and engineered mesh.',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Adidas Ultraboost Light Running Shoes (Core Black)',
    brand: 'Adidas',
    category: 'Fashion',
    price: 18999.00,
    discountPrice: 12999.00,
    rating: 4.7,
    stock: 35,
    description: '30% lighter Light BOOST material with explosive energy return, Primeknit+ sock-like upper, and Continental Better Rubber outsole.',
    imageUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Adidas Originals Superstar Classic Striped Sneakers (White/Black)',
    brand: 'Adidas',
    category: 'Fashion',
    price: 8999.00,
    discountPrice: 5999.00,
    rating: 4.6,
    stock: 60,
    description: 'Famous shell-toe design that defined street culture for 50 years, smooth leather upper with serrated 3-stripes and herringbone rubber sole.',
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Ray-Ban Classic Aviator Polarized Sunglasses (Gold / Green Lens)',
    brand: 'Ray-Ban',
    category: 'Fashion',
    price: 11590.00,
    discountPrice: 9290.00,
    rating: 4.7,
    stock: 55,
    description: 'Timeless tear-drop aviator shape originally created for US aviators in 1937. 100% UV400 protection with glare-blocking polarized crystal lenses.',
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Ray-Ban Wayfarer Classic Polarized Sunglasses (Tortoise Frame)',
    brand: 'Ray-Ban',
    category: 'Fashion',
    price: 12290.00,
    discountPrice: 9990.00,
    rating: 4.8,
    stock: 45,
    description: 'The most recognizable style in sunglasses history. Premium acetate frame with crystal green G-15 high contrast polarized lenses.',
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Levis 511 Slim Fit Stretch Denim Jeans (Dark Indigo)',
    brand: "Levi's",
    category: 'Fashion',
    price: 3999.00,
    discountPrice: 2499.00,
    rating: 4.5,
    stock: 75,
    description: 'A modern slim with room to move. Added stretch for all-day comfort, sits below waist with slim fit from hip to ankle.',
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Levis Men Trucker Denim Jacket (Medium Stonewash)',
    brand: "Levi's",
    category: 'Fashion',
    price: 5999.00,
    discountPrice: 3899.00,
    rating: 4.7,
    stock: 40,
    description: 'An iconic silhouette that stands the test of time. 100% heavy non-stretch cotton denim with button flap chest pockets and adjustable waist tabs.',
    imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Tommy Hilfiger Classic Polo Shirt in Pure Pique Cotton',
    brand: 'Tommy Hilfiger',
    category: 'Fashion',
    price: 4999.00,
    discountPrice: 2999.00,
    rating: 4.6,
    stock: 65,
    description: 'Signature tailored polo crafted in organic cotton pique, featuring ribbed 2-button collar, tennis tail hem, and embroidered flag on chest.',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Allen Solly Men Slim Fit Formal Cotton Dress Shirt (Sky Blue)',
    brand: 'Allen Solly',
    category: 'Fashion',
    price: 2499.00,
    discountPrice: 1499.00,
    rating: 4.4,
    stock: 80,
    description: 'Sharp formal workwear in 100% long-staple cotton with easy-iron finish, semi-cutaway collar, and French placket.',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Peter England Men 2-Piece Formal Slim Fit Blazer Suit',
    brand: 'Peter England',
    category: 'Fashion',
    price: 9999.00,
    discountPrice: 6499.00,
    rating: 4.5,
    stock: 30,
    description: 'Sophisticated 2-piece poly-viscose blend tailored suit with notch lapel blazer, double vents, and flat-front trousers for executive style.',
    imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Biba Women Floral Embroidered Festive Salwar Suit Set (Teal)',
    brand: 'Biba',
    category: 'Fashion',
    price: 6995.00,
    discountPrice: 3895.00,
    rating: 4.6,
    stock: 45,
    description: 'Chanderi silk festive kurta paired with matching churidar and crushed organza dupatta with intricate mirror and thread embroidery.',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Woodland Men Genuine Rugged Camel Leather Casual Trekking Shoes',
    brand: 'Woodland',
    category: 'Fashion',
    price: 5495.00,
    discountPrice: 3845.00,
    rating: 4.5,
    stock: 55,
    description: 'Heavy-duty oiled nubuck leather boots with deep lug rubber sole for extreme outdoor grip, cushioned collar, and rust-resistant brass eyelets.',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Lavie Women Satchel Handbag with Detachable Shoulder Strap',
    brand: 'Lavie',
    category: 'Fashion',
    price: 3999.00,
    discountPrice: 1799.00,
    rating: 4.3,
    stock: 70,
    description: 'Premium saffiano faux leather with dual top rolled handles, multiple interior zip compartments, and metal protective feet on base.',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Wildcraft 45L Ergonomic Travel Rucksack Backpack (Ranger)',
    brand: 'Wildcraft',
    category: 'Fashion',
    price: 4299.00,
    discountPrice: 2899.00,
    rating: 4.6,
    stock: 60,
    description: 'Tear-resistant ripstop nylon, padded back system with airflow mesh, sternum strap, integrated rain cover, and trekking pole loops.',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Hidesign Pure Handcrafted Vegetable Tanned Leather Messenger Bag',
    brand: 'Hidesign',
    category: 'Fashion',
    price: 11995.00,
    discountPrice: 8995.00,
    rating: 4.8,
    stock: 20,
    description: 'Real full-grain vegetable tanned leather handcrafted in Pondicherry, fits 15-inch laptops, solid brass buckles, and cotton striped lining.',
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'
  },

  // ==========================================
  // 5. HOME & KITCHEN (30 items)
  // ==========================================
  {
    name: 'Prestige Deluxe Alpha Stainless Steel Pressure Cooker (5 Litre)',
    brand: 'Prestige',
    category: 'Home & Kitchen',
    price: 3250.00,
    discountPrice: 2299.00,
    rating: 4.6,
    stock: 75,
    description: 'Alpha induction and gas compatible base, heavy gauge 304 food-grade stainless steel body, precision weight valve, and controlled gasket release.',
    imageUrl: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Prestige Omega Deluxe Granite Non-Stick Cookware Set (3 Pieces)',
    brand: 'Prestige',
    category: 'Home & Kitchen',
    price: 4995.00,
    discountPrice: 2999.00,
    rating: 4.5,
    stock: 60,
    description: '5-layer durable German granite stone coating, metal spoon friendly, dishwasher safe, includes Fry Pan, Omni Tawa, and Kadai with Glass Lid.',
    imageUrl: 'https://images.unsplash.com/photo-1584269600519-112d071b35e6?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Hawkins Contura Hard Anodized Pressure Cooker (3.5 Litre)',
    brand: 'Hawkins',
    category: 'Home & Kitchen',
    price: 2475.00,
    discountPrice: 1999.00,
    rating: 4.7,
    stock: 80,
    description: 'Hard anodized body with 60 micron coating that heats faster and does not react with food, curved body for easy stirring, and inside-fitting lid.',
    imageUrl: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Milton Thermosteel Flip Lid Insulated Flask (1000 ml)',
    brand: 'Milton',
    category: 'Home & Kitchen',
    price: 1299.00,
    discountPrice: 899.00,
    rating: 4.7,
    stock: 120,
    description: 'Double-walled vacuum insulated bottle keeps beverages hot or cold for 24 hours, 100% rust-proof 304 food-grade stainless steel with fabric jacket.',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Milton Pro Lunch Insulated Soft Tiffin Box with 3 Containers',
    brand: 'Milton',
    category: 'Home & Kitchen',
    price: 1450.00,
    discountPrice: 999.00,
    rating: 4.4,
    stock: 90,
    description: 'Microwave and dishwasher safe 100% leak-proof borosilicate glass containers with air-release clip locks, packed in insulated thermal carry bag.',
    imageUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Solimo 100% Cotton 300 TC Double Bedsheet with 2 Pillow Covers',
    brand: 'Solimo',
    category: 'Home & Kitchen',
    price: 2199.00,
    discountPrice: 999.00,
    rating: 4.3,
    stock: 90,
    description: 'Breathable pure combed cotton with satin weave, skin-friendly colors, fits king and queen mattresses up to 10 inches thick.',
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Solimo Water Resistant Anti-Skid Door Mat Pack of 2',
    brand: 'Solimo',
    category: 'Home & Kitchen',
    price: 799.00,
    discountPrice: 399.00,
    rating: 4.2,
    stock: 140,
    description: 'High-density microfiber absorbs moisture and dirt instantly, natural latex backing prevents slipping, machine washable.',
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Wakefit Orthopedic Memory Foam Mattress (Queen, 78x60x6 inch)',
    brand: 'Wakefit',
    category: 'Home & Kitchen',
    price: 16999.00,
    discountPrice: 11899.00,
    rating: 4.7,
    stock: 25,
    description: 'Next-gen high resiliency memory foam adapts to body contour, spinal alignment support, breathable removable zipper cover with 10-year warranty.',
    imageUrl: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Wakefit Taurus Engineered Wood King Size Bed with Storage',
    brand: 'Wakefit',
    category: 'Home & Kitchen',
    price: 18999.00,
    discountPrice: 13499.00,
    rating: 4.6,
    stock: 15,
    description: 'European standard particle board with natural Columbian walnut finish, 4 partition box storage with 900L capacity, termite resistant.',
    imageUrl: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Wakefit Hollow Fiber Sleeping Pillows (Set of 2)',
    brand: 'Wakefit',
    category: 'Home & Kitchen',
    price: 1199.00,
    discountPrice: 699.00,
    rating: 4.4,
    stock: 110,
    description: '200 GSM hypoallergenic poly-fiber filling with premium 350 TC spun poly outer cover, provides balanced head and neck elevation.',
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'SleepyCat Original 3-Layer Orthopedic Mattress (King Size)',
    brand: 'SleepyCat',
    category: 'Home & Kitchen',
    price: 21899.00,
    discountPrice: 15999.00,
    rating: 4.7,
    stock: 22,
    description: 'Open-cell memory foam with bamboo fabric zipper cover, zero partner disturbance, tailored orthopedic spine alignment support.',
    imageUrl: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Le Creuset Enameled Cast Iron Dutch Oven (5.5 Qt, Cerise Red)',
    brand: 'Le Creuset',
    category: 'Home & Kitchen',
    price: 36500.00,
    discountPrice: 28990.00,
    rating: 4.9,
    stock: 14,
    description: 'Handcrafted in France since 1925. Superior heat distribution and retention, durable easy-to-clean vibrant enamel, oven safe up to 260°C.',
    imageUrl: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Le Creuset Stoneware Heritage Rectangular Baking Dish',
    brand: 'Le Creuset',
    category: 'Home & Kitchen',
    price: 8990.00,
    discountPrice: 6990.00,
    rating: 4.8,
    stock: 20,
    description: 'High-fired durable stoneware maintains even temperatures and prevents scorching, impermeable exterior enamel resists knife scratches.',
    imageUrl: 'https://images.unsplash.com/photo-1584269600519-112d071b35e6?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Philips Hue Smart Bridge & Color Ambiance Starter Kit',
    brand: 'Philips',
    category: 'Home & Kitchen',
    price: 14999.00,
    discountPrice: 10499.00,
    rating: 4.6,
    stock: 35,
    description: '16 million colors and 50,000 shades of warm-to-cool white light. Sync with movies, music, and gaming via Alexa, Siri, or Google Assistant.',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Philips Smart Wi-Fi LED 20W Ceiling Downlight (16M Colors)',
    brand: 'Philips',
    category: 'Home & Kitchen',
    price: 2999.00,
    discountPrice: 1799.00,
    rating: 4.4,
    stock: 65,
    description: 'Control from anywhere via WiZ app, tunable white and full RGB color palette, pre-set circadian wellness lighting rhythm.',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Wonderchef Nutri-Blend 400W Mixer Grinder & Smoothie Blender',
    brand: 'Wonderchef',
    category: 'Home & Kitchen',
    price: 3500.00,
    discountPrice: 2499.00,
    rating: 4.5,
    stock: 70,
    description: 'Compact 22,000 RPM super-fast motor with surgical-grade steel blades extract every drop of immunity boosting nutrients.',
    imageUrl: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Wonderchef Royal Velvet Non-Stick Cookware Set (Induction Base)',
    brand: 'Wonderchef',
    category: 'Home & Kitchen',
    price: 5200.00,
    discountPrice: 3299.00,
    rating: 4.4,
    stock: 50,
    description: 'Pure virgin aluminum for 9x faster heat transfer, 5-layer MetaTuff PFOA-free non-stick coating with soft-touch ergonomic handles.',
    imageUrl: 'https://images.unsplash.com/photo-1584269600519-112d071b35e6?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Borosil Klip N Store Microwave Safe Glass Container Set (3 Pcs)',
    brand: 'Borosil',
    category: 'Home & Kitchen',
    price: 1890.00,
    discountPrice: 1299.00,
    rating: 4.7,
    stock: 90,
    description: '100% borosilicate glass that withstands temperatures up to 400°C in ovens and microwaves, completely leak-proof airtight clip lids.',
    imageUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Borosil Stainless Steel Vacuum Insulated Hydra Trek Bottle (700ml)',
    brand: 'Borosil',
    category: 'Home & Kitchen',
    price: 995.00,
    discountPrice: 699.00,
    rating: 4.6,
    stock: 100,
    description: 'Copper coated double wall vacuum insulation keeps water cold for 24 hours or hot for 14 hours, sweat-free powder coating.',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Tupperware Aquasafe 1 Litre Flip-Top Water Bottles (Set of 4)',
    brand: 'Tupperware',
    category: 'Home & Kitchen',
    price: 1350.00,
    discountPrice: 999.00,
    rating: 4.5,
    stock: 120,
    description: '100% virgin food-grade non-toxic plastic, spill-proof flip top cap with wide mouth opening for easy cleaning and ice cube filling.',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Bombay Dyeing 100% Cotton Extra Large Bath Towel (70x140cm)',
    brand: 'Bombay Dyeing',
    category: 'Home & Kitchen',
    price: 1299.00,
    discountPrice: 699.00,
    rating: 4.3,
    stock: 85,
    description: '500 GSM plush zero-twist combed cotton yarns for quick water absorption and cloud-like gentleness on skin, fade-resistant dyes.',
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Cello Opalware Imperial Dinner Set (35 Pieces, Dazzle White)',
    brand: 'Cello',
    category: 'Home & Kitchen',
    price: 4999.00,
    discountPrice: 2899.00,
    rating: 4.5,
    stock: 40,
    description: 'Bone-ash free toughened European opal glass, 100% vegetarian, chip and scratch resistant, microwave and dishwasher safe.',
    imageUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Pigeon by Stovekraft 2-Burner Stainless Steel Gas Cooktop',
    brand: 'Pigeon',
    category: 'Home & Kitchen',
    price: 3195.00,
    discountPrice: 1799.00,
    rating: 4.2,
    stock: 65,
    description: 'Heavy duty brass burners for high thermal efficiency, rust-proof mirror-finish stainless steel body with strong tubular rubber legs.',
    imageUrl: 'https://images.unsplash.com/photo-1584269600519-112d071b35e6?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Pigeon by Stovekraft 1.5L Electric Stainless Steel Kettle',
    brand: 'Pigeon',
    category: 'Home & Kitchen',
    price: 1195.00,
    discountPrice: 649.00,
    rating: 4.3,
    stock: 130,
    description: '1500W rapid boiling element with auto shut-off and boil-dry protection, 360-degree cordless swivel base, and single-touch lid lock.',
    imageUrl: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Green Soul Monster Ultimate Ergonomic Gaming & Office Chair',
    brand: 'Green Soul',
    category: 'Home & Kitchen',
    price: 24990.00,
    discountPrice: 16990.00,
    rating: 4.7,
    stock: 25,
    description: 'Spandex fabric and breathable PU leather, internal metal frame, memory foam lumbar support, 4D adjustable armrests, and 180° recline.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Spacewood Winner Engineered Wood Study & Computer Desk',
    brand: 'Spacewood',
    category: 'Home & Kitchen',
    price: 8990.00,
    discountPrice: 5299.00,
    rating: 4.4,
    stock: 30,
    description: 'Rigid water-resistant particle board construction with natural woodgrain texture, smooth gliding keyboard tray, drawer and CPU shelf.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Story@Home 7-Foot Blackout Grommet Window Curtains (Set of 2)',
    brand: 'Story@Home',
    category: 'Home & Kitchen',
    price: 2499.00,
    discountPrice: 1199.00,
    rating: 4.3,
    stock: 80,
    description: 'Triple-weave thermal insulated blackout fabric blocks 95% of sunlight and street noise, metal eyelets for effortless sliding.',
    imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Wipro Garnet 12W Smart LED Table Lamp with Dimming Control',
    brand: 'Wipro',
    category: 'Home & Kitchen',
    price: 2890.00,
    discountPrice: 1699.00,
    rating: 4.5,
    stock: 55,
    description: 'Touch control with 3 tunable white light temperatures (Warm, Neutral, Cool), flexible gooseneck arm, and glare-free eye caring diffuser.',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Ajanta Quartz Vintage Decorative Round Silent Wall Clock (12-inch)',
    brand: 'Ajanta',
    category: 'Home & Kitchen',
    price: 999.00,
    discountPrice: 549.00,
    rating: 4.4,
    stock: 100,
    description: 'Silent sweep non-ticking quartz movement, bold Arabic numerals for easy reading from across the room, and glass lens cover.',
    imageUrl: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Black+Decker 1500W Garment Steamer with Telescopic Pole',
    brand: 'Black+Decker',
    category: 'Home & Kitchen',
    price: 6995.00,
    discountPrice: 4299.00,
    rating: 4.4,
    stock: 35,
    description: 'Fast 45-second steam heat-up with 30g/min continuous steam rate, 1.4L detachable water tank, and multi-functional fabric brush.',
    imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
  },

  // ==========================================
  // 6. GROCERY (30 items)
  // ==========================================
  {
    name: 'Tata Tea Gold Premium Assam & Long Leaf Tea (1 Kg Pack)',
    brand: 'Tata Tea',
    category: 'Grocery',
    price: 650.00,
    discountPrice: 520.00,
    rating: 4.8,
    stock: 150,
    description: 'A gentle blend of fine Assam CTC teas with gently rolled long leaves to deliver an irresistible aroma and rich golden cup.',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Tata Tea Premium Desh Ki Chai (1.5 Kg Value Pack)',
    brand: 'Tata Tea',
    category: 'Grocery',
    price: 750.00,
    discountPrice: 599.00,
    rating: 4.6,
    stock: 180,
    description: 'Specially crafted for Indian palates with a blend of big grains for taste and small grains for strength and deep color.',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Starbucks Pike Place Roast Whole Bean Coffee (100% Arabica, 340g)',
    brand: 'Starbucks',
    category: 'Grocery',
    price: 1250.00,
    discountPrice: 999.00,
    rating: 4.8,
    stock: 85,
    description: 'Well-rounded with subtle notes of cocoa and toasted nuts balancing the smooth mouthfeel. Roasted to perfection in medium roast profile.',
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Nescafe Classic 100% Pure Instant Coffee Jar (200g)',
    brand: 'Nestle',
    category: 'Grocery',
    price: 720.00,
    discountPrice: 575.00,
    rating: 4.7,
    stock: 140,
    description: 'Crafted with handpicked Robusta beans roasted with enhanced roastology technique for an unmistakable rich coffee aroma and bold taste.',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Fortune Sunlite Refined Sunflower Oil Pouch (1 Litre, Pack of 3)',
    brand: 'Fortune',
    category: 'Grocery',
    price: 450.00,
    discountPrice: 375.00,
    rating: 4.5,
    stock: 200,
    description: 'Light and healthy cooking oil rich in natural Vitamin E, low absorption technology for delicious non-sticky everyday meals.',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Fortune Premium Kachi Ghani Mustard Oil Bottle (1 Litre)',
    brand: 'Fortune',
    category: 'Grocery',
    price: 195.00,
    discountPrice: 155.00,
    rating: 4.6,
    stock: 160,
    description: 'Traditionally cold pressed from select mustard seeds to retain natural pungent aroma, rich in Omega 3 and healthy fatty acids.',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'India Gate Basmati Rice Classic (5 Kg Bag)',
    brand: 'India Gate',
    category: 'Grocery',
    price: 1150.00,
    discountPrice: 899.00,
    rating: 4.7,
    stock: 110,
    description: 'Aged exotic basmati rice with slender, extra-long grains and captivating aroma, perfect for royal biryanis, pulao, and festive feasts.',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Daawat Rozana Gold Basmati Rice (5 Kg Bag)',
    brand: 'Daawat',
    category: 'Grocery',
    price: 650.00,
    discountPrice: 479.00,
    rating: 4.5,
    stock: 130,
    description: 'Naturally aged everyday basmati rice with pearl white grains, delicious fluffy texture, and sweet aroma after cooking.',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Aashirvaad Superior MP Sharbati Whole Wheat Atta (10 Kg)',
    brand: 'Aashirvaad',
    category: 'Grocery',
    price: 520.00,
    discountPrice: 445.00,
    rating: 4.8,
    stock: 150,
    description: '100% pure whole wheat grain sourced directly from Madhya Pradesh farms, traditional chakki grinding locks dietary fiber and natural sweetness.',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Aashirvaad Svasti Pure Cow Ghee Tin (1 Litre)',
    brand: 'Aashirvaad',
    category: 'Grocery',
    price: 780.00,
    discountPrice: 650.00,
    rating: 4.7,
    stock: 95,
    description: 'Prepared using special slow cook process for 3.5 hours, lending a distinct golden granular texture, rich aroma, and wholesome nutrition.',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Amul Pure Ghee Pouch (1 Litre)',
    brand: 'Amul',
    category: 'Grocery',
    price: 650.00,
    discountPrice: 585.00,
    rating: 4.8,
    stock: 170,
    description: 'Made from fresh cream with typical rich aroma and granular texture, rich source of Vitamin A, D, E and K, trusted across India.',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Saffola Gold Pro Healthy Heart Edible Blended Oil (5 Litre Jar)',
    brand: 'Saffola',
    category: 'Grocery',
    price: 1099.00,
    discountPrice: 879.00,
    rating: 4.6,
    stock: 80,
    description: 'Dual-seed blend of rice bran and sunflower oil with natural Oryzanol that reduces bad cholesterol and Triple Antioxidant system.',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Ferrero Rocher Premium Hazelnut Chocolates (Pack of 24 Pieces)',
    brand: 'Ferrero Rocher',
    category: 'Grocery',
    price: 995.00,
    discountPrice: 799.00,
    rating: 4.9,
    stock: 120,
    description: 'Whole crunchy hazelnut in the heart, creamy hazelnut filling, crisp wafer shell covered with milk chocolate and gently roasted pieces.',
    imageUrl: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Cadbury Celebrations Rich Dry Fruit Gift Box (450g)',
    brand: 'Cadbury',
    category: 'Grocery',
    price: 850.00,
    discountPrice: 699.00,
    rating: 4.6,
    stock: 90,
    description: 'Special festive collection with chocolate-covered almonds, cashews, and raisins, packaged in an elegant gift box.',
    imageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Cadbury Dairy Milk Silk Chocolate Family Pack (Pack of 5 x 150g)',
    brand: 'Cadbury',
    category: 'Grocery',
    price: 975.00,
    discountPrice: 799.00,
    rating: 4.8,
    stock: 110,
    description: 'Classic silkiness and melt-in-mouth creamy texture made with 100% sustainably sourced cocoa, perfect for family snacking.',
    imageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Lindt Excellence 85% Cocoa Dark Chocolate Bar (100g)',
    brand: 'Lindt',
    category: 'Grocery',
    price: 495.00,
    discountPrice: 399.00,
    rating: 4.7,
    stock: 75,
    description: 'Expertly crafted Swiss master chocolatier bar with full-bodied robust cocoa flavour, subtle hints of roasted coffee and dried fruit.',
    imageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Happilo 100% Natural California Almonds & Cashews Combo (1 Kg)',
    brand: 'Happilo',
    category: 'Grocery',
    price: 1699.00,
    discountPrice: 1149.00,
    rating: 4.7,
    stock: 160,
    description: 'Handpicked premium grade crunchy California almonds and king-sized whole cashews, zero cholesterol, rich in plant protein and dietary fiber.',
    imageUrl: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Happilo Premium Whole Dried California Walnuts (500g)',
    brand: 'Happilo',
    category: 'Grocery',
    price: 899.00,
    discountPrice: 599.00,
    rating: 4.6,
    stock: 120,
    description: '100% raw and untreated walnut kernels rich in Omega-3 fatty acids for brain health and glowing skin, vacuum sealed for fresh crunch.',
    imageUrl: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Happilo Roasted & Salted California Pistachios (500g)',
    brand: 'Happilo',
    category: 'Grocery',
    price: 999.00,
    discountPrice: 699.00,
    rating: 4.7,
    stock: 100,
    description: 'Slow roasted in mineral salt with open shells for effortless snacking, packed with lutein, zeaxanthin, and essential antioxidants.',
    imageUrl: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Kelloggs Real Almond & Honey Crunchy Muesli (1 Kg)',
    brand: "Kellogg's",
    category: 'Grocery',
    price: 660.00,
    discountPrice: 519.00,
    rating: 4.6,
    stock: 90,
    description: 'Power breakfast of 5 multi-grains (wheat, corn, barley, oats, rice) with crunchy sliced California almonds and real honey drizzle.',
    imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Kelloggs Corn Flakes Original Breakfast Cereal (1.2 Kg)',
    brand: "Kellogg's",
    category: 'Grocery',
    price: 495.00,
    discountPrice: 389.00,
    rating: 4.5,
    stock: 130,
    description: 'Sun-ripened golden corn toasted to perfection, enriched with 8 essential vitamins and iron for an energized morning start.',
    imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Quaker Rolled Oats 100% Wholegrain Breakfast Cereal (1 Kg)',
    brand: 'Quaker',
    category: 'Grocery',
    price: 210.00,
    discountPrice: 169.00,
    rating: 4.6,
    stock: 150,
    description: '100% wholegrain rolled oats rich in soluble fiber (beta-glucan) that helps maintain healthy cholesterol, quick 3-minute cook.',
    imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Dabur 100% Pure Squeezy Honey (1 Kg Value Pack)',
    brand: 'Dabur',
    category: 'Grocery',
    price: 470.00,
    discountPrice: 349.00,
    rating: 4.7,
    stock: 140,
    description: '100% pure raw honey tested by advanced NMR technology, rich in natural antioxidants to boost metabolism and natural immunity.',
    imageUrl: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Dabur Chyawanprash with 41 Ayurvedic Herbs (1 Kg Jar)',
    brand: 'Dabur',
    category: 'Grocery',
    price: 450.00,
    discountPrice: 375.00,
    rating: 4.8,
    stock: 110,
    description: 'Time-tested Ayurvedic formulation with Amla, Ashwagandha, and Pippali to double immunity and protect against seasonal illnesses.',
    imageUrl: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Organic India Tulsi Green Tea Bags (Pack of 100 Bags)',
    brand: 'Organic India',
    category: 'Grocery',
    price: 780.00,
    discountPrice: 620.00,
    rating: 4.7,
    stock: 85,
    description: 'Invigorating blend of Rama, Krishna, and Vana Tulsi herbs with premium organic green tea, rich in antioxidants for stress relief.',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Organic India Certified Organic Psyllium Whole Husk (Isabgol, 200g)',
    brand: 'Organic India',
    category: 'Grocery',
    price: 325.00,
    discountPrice: 260.00,
    rating: 4.6,
    stock: 90,
    description: 'Pure 100% certified organic soluble dietary fiber, promotes smooth digestive regularity and natural cardiovascular wellness.',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Tata Sampann Unpolished Toor Dal (Pigeon Pea, 1 Kg)',
    brand: 'Tata Sampann',
    category: 'Grocery',
    price: 215.00,
    discountPrice: 179.00,
    rating: 4.6,
    stock: 160,
    description: 'Unpolished pulses that undergo no artificial water, oil or leather polishing, retaining wholesome natural protein and authentic taste.',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Tata Sampann High Protein Unpolished Chana Dal (1 Kg)',
    brand: 'Tata Sampann',
    category: 'Grocery',
    price: 155.00,
    discountPrice: 125.00,
    rating: 4.5,
    stock: 140,
    description: 'Nutritious unpolished yellow split chickpeas sourced from selected fertile farms, rich in dietary fiber and essential plant nutrients.',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Britannia Good Day Cashew Cookies Super Saver Family Pack (600g)',
    brand: 'Britannia',
    category: 'Grocery',
    price: 160.00,
    discountPrice: 120.00,
    rating: 4.5,
    stock: 200,
    description: 'Loaded with real crispy cashew nuts and rich butter aroma, with the iconic smile pattern that spreads happiness in every bite.',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Nutella Hazelnut Spread with Cocoa Jar (750g)',
    brand: 'Ferrero',
    category: 'Grocery',
    price: 680.00,
    discountPrice: 539.00,
    rating: 4.9,
    stock: 130,
    description: 'Original creamy spread crafted from 7 quality ingredients, including roasted hazelnuts and skimmed milk, delicious on bread, pancakes, and rotis.',
    imageUrl: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80'
  }
];

// Validate 30 per category
const counts = {};
CATEGORIES.forEach(c => counts[c] = 0);
RAW_PRODUCTS.forEach(p => {
  if (counts[p.category] !== undefined) counts[p.category]++;
  else console.warn('Unknown category:', p.category);
});

console.log('Category Counts:', counts);
const total = Object.values(counts).reduce((a, b) => a + b, 0);
console.log('Total Products:', total);

if (total !== 180) {
  console.error('Expected 180 products, got', total);
  process.exit(1);
}

// Assign 100% UNIQUE verified images (180 distinct images, 0 duplicates)
const verifiedPhotos = JSON.parse(fs.readFileSync(path.join(__dirname, 'verified_photos.json'), 'utf8'));
const categoryPointers = {};
CATEGORIES.forEach(c => categoryPointers[c] = 0);

RAW_PRODUCTS.forEach((p) => {
  const catList = verifiedPhotos[p.category];
  const ptr = categoryPointers[p.category];
  if (catList && catList[ptr]) {
    p.imageUrl = catList[ptr];
    categoryPointers[p.category]++;
  }
});

const usedImages = new Set(RAW_PRODUCTS.map(p => p.imageUrl));
console.log('Unique images assigned:', usedImages.size, 'out of 180 products');

// 1. Output client/src/data/mockProducts.js
const mockProductsJs = `export const MOCK_PRODUCTS = ${JSON.stringify(
  RAW_PRODUCTS.map((p, idx) => ({ id: idx + 1, ...p })),
  null,
  2
)};

export const MOCK_CATEGORIES = [
  { id: 1, name: 'Mobiles', description: 'Flagship & Budget Smartphones, Accessories' },
  { id: 2, name: 'Electronics', description: 'Laptops, Headphones, Smartwatches & Audio' },
  { id: 3, name: 'Appliances', description: 'Televisions, Refrigerators, Washing Machines & Air Fryers' },
  { id: 4, name: 'Fashion', description: 'Festive Ethnic Wear, Sarees, Watches & Sneakers' },
  { id: 5, name: 'Home & Kitchen', description: 'Cookware, Bedding, Thermal Bottles & Mattresses' },
  { id: 6, name: 'Grocery', description: 'Daily Staples, Tea, Dry Fruits & Premium Rice' },
];
`;

fs.writeFileSync(path.join(__dirname, '../client/src/data/mockProducts.js'), mockProductsJs, 'utf8');
console.log('Wrote client/src/data/mockProducts.js successfully!');

// 2. Output database/seed_180_products.sql
let sql = `USE GaneshKartDB;
GO

-- Clean existing demo products and re-populate with 180 structured products (30 per category)
DELETE FROM dbo.CartItems;
DELETE FROM dbo.Wishlist;
DELETE FROM dbo.Products;
DBCC CHECKIDENT ('dbo.Products', RESEED, 0);
GO

SET IDENTITY_INSERT dbo.Products ON;
GO

INSERT INTO dbo.Products (Id, Name, Description, Price, DiscountPrice, Category, Brand, ImageUrl, Rating, Stock) VALUES
`;

const sqlRows = RAW_PRODUCTS.map((p, idx) => {
  const id = idx + 1;
  const name = p.name.replace(/'/g, "''");
  const desc = p.description.replace(/'/g, "''");
  const brand = p.brand.replace(/'/g, "''");
  const cat = p.category.replace(/'/g, "''");
  return `(${id}, '${name}', '${desc}', ${p.price.toFixed(2)}, ${p.discountPrice.toFixed(2)}, '${cat}', '${brand}', '${p.imageUrl}', ${p.rating.toFixed(1)}, ${p.stock})`;
});

sql += sqlRows.join(',\n') + ';\nGO\n\nSET IDENTITY_INSERT dbo.Products OFF;\nGO\n';

fs.writeFileSync(path.join(__dirname, '../database/seed_180_products.sql'), sql, 'utf8');
console.log('Wrote database/seed_180_products.sql successfully!');

// 3. Output database/seed.sql with all 180 products
const seedSqlPrefix = `-- GaneshKart Seed Data
USE GaneshKartDB;
GO

-- 1. Insert Categories
IF NOT EXISTS (SELECT 1 FROM dbo.Categories)
BEGIN
    INSERT INTO dbo.Categories (Name, Icon, Description, IsActive) VALUES
    ('Electronics', 'Laptop', 'Laptops, Audio, Cameras & Accessories', 1),
    ('Mobiles', 'Smartphone', 'Smartphones, Tablets & Mobile Accessories', 1),
    ('Fashion', 'Shirt', 'Men, Women & Kids Clothing & Footwear', 1),
    ('Grocery', 'ShoppingBag', 'Daily Essentials, Staples & Snacks', 1),
    ('Home & Kitchen', 'Home', 'Cookware, Furniture & Home Decor', 1),
    ('Appliances', 'Tv', 'Smart TVs, Refrigerators & Washing Machines', 1);
END
GO

-- 2. Insert Demo User
IF NOT EXISTS (SELECT 1 FROM dbo.Users WHERE Email = 'ganesh@ganeshkart.com')
BEGIN
    INSERT INTO dbo.Users (FullName, Email, PhoneNumber, PasswordHash, Role)
    VALUES ('Ganesh Sharma', 'ganesh@ganeshkart.com', '9876543210', 'DummyHashedPassword123!', 'Customer');
END
GO

-- 3. Insert Demo Addresses for Ganesh Sharma
DECLARE @UserId INT = (SELECT TOP 1 Id FROM dbo.Users WHERE Email = 'ganesh@ganeshkart.com');

IF @UserId IS NOT NULL AND NOT EXISTS (SELECT 1 FROM dbo.Addresses WHERE UserId = @UserId)
BEGIN
    INSERT INTO dbo.Addresses (UserId, FullName, MobileNumber, Pincode, AddressLine, City, State, Landmark, AddressType, IsDefault)
    VALUES 
    (@UserId, 'Ganesh Sharma', '9876543210', '400001', 'Flat 402, Shree Ganesh Heights, MG Road', 'Mumbai', 'Maharashtra', 'Near Chhatrapati Shivaji Terminus', 'Home', 1),
    (@UserId, 'Ganesh Sharma', '9876543210', '560001', 'Tech Park Tower 3, 5th Floor, Outer Ring Road', 'Bengaluru', 'Karnataka', 'Opposite EcoSpace', 'Work', 0);
END
GO

-- 4. Initialize Cart for Demo User
DECLARE @CartUserId INT = (SELECT TOP 1 Id FROM dbo.Users WHERE Email = 'ganesh@ganeshkart.com');
IF @CartUserId IS NOT NULL AND NOT EXISTS (SELECT 1 FROM dbo.Cart WHERE UserId = @CartUserId)
BEGIN
    INSERT INTO dbo.Cart (UserId) VALUES (@CartUserId);
END
GO

-- 5. Insert 180 Rich Products (30 Products per Category)
IF NOT EXISTS (SELECT 1 FROM dbo.Products)
BEGIN
    INSERT INTO dbo.Products (Name, Description, Price, DiscountPrice, Category, Brand, ImageUrl, Rating, Stock)
    VALUES
`;

const seedSqlValues = RAW_PRODUCTS.map(p => {
  const name = p.name.replace(/'/g, "''");
  const desc = p.description.replace(/'/g, "''");
  const brand = p.brand.replace(/'/g, "''");
  const cat = p.category.replace(/'/g, "''");
  return `    ('${name}', '${desc}', ${p.price.toFixed(2)}, ${p.discountPrice.toFixed(2)}, '${cat}', '${brand}', '${p.imageUrl}', ${p.rating.toFixed(1)}, ${p.stock})`;
}).join(',\n');

const seedSqlSuffix = `;
END
GO

-- 6. Insert Initial Cart Item for Demo User to showcase active cart
DECLARE @DemoCartId INT = (SELECT TOP 1 Id FROM dbo.Cart WHERE UserId = (SELECT TOP 1 Id FROM dbo.Users WHERE Email = 'ganesh@ganeshkart.com'));
DECLARE @SampleProd1 INT = (SELECT TOP 1 Id FROM dbo.Products WHERE Name LIKE '%Sony WH-1000XM5%');
DECLARE @SampleProd2 INT = (SELECT TOP 1 Id FROM dbo.Products WHERE Name LIKE '%Tata Tea Gold%');

IF @DemoCartId IS NOT NULL AND @SampleProd1 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM dbo.CartItems WHERE CartId = @DemoCartId)
BEGIN
    INSERT INTO dbo.CartItems (CartId, ProductId, Quantity) VALUES (@DemoCartId, @SampleProd1, 1);
    IF @SampleProd2 IS NOT NULL
    BEGIN
        INSERT INTO dbo.CartItems (CartId, ProductId, Quantity) VALUES (@DemoCartId, @SampleProd2, 2);
    END
END
GO
`;

fs.writeFileSync(path.join(__dirname, '../database/seed.sql'), seedSqlPrefix + seedSqlValues + seedSqlSuffix, 'utf8');
console.log('Wrote database/seed.sql successfully!');
