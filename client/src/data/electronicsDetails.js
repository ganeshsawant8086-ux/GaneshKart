/**
 * Rich electronic product dataset and generator
 * Provides multi-angle views (Front, Back, Side, Camera, Display),
 * Colors, Storage/RAM variants, Product Highlights with icons,
 * and comprehensive grouped specifications inspired by Flipkart.
 */

export const ELECTRONICS_METADATA = {
  // BOLTT EVO (Matches User Screenshots)
  'BOLTT EVO (Berry Red, 64 GB) (4 GB RAM)': {
    gallery: [
      { id: 'front', label: 'Front & Screen', url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80' },
      { id: 'back', label: 'Berry Red Back', url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80' },
      { id: 'camera', label: '50MP Dual Camera', url: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80' },
      { id: 'angle', label: 'Sleek Side Profile', url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80' },
      { id: 'display', label: '120Hz Fluid Motion', url: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80' },
    ],
    colors: [
      { name: 'Berry Red', hex: '#8a2336', img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=300&q=80' },
      { name: 'Pearl White', hex: '#e8eaed', img: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=300&q=80' },
      { name: 'Cosmic Lavender', hex: '#9c88b3', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80' },
      { name: 'Obsidian Black', hex: '#1c1c1e', img: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=300&q=80' },
      { name: 'Glacier Blue', hex: '#6d92a5', img: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=300&q=80' },
    ],
    variants: [
      { label: '64 GB + 4 GB', price: 9999, originalPrice: 17999, discount: '44% off' },
      { label: '128 GB + 6 GB', price: 11499, originalPrice: 18999, discount: '39% off' },
    ],
    highlights: [
      { type: 'ram', title: '4 GB RAM | 64 GB ROM', subtitle: 'Store up to 13000+ photos' },
      { type: 'processor', title: 'T7250 | Octa Core Processor | 1.8 GHz Clock Speed', subtitle: "Industry's Best AnTuTu Score of 3,90,000+*" },
      { type: 'camera_rear', title: '50MP + 2MP Rear Camera', subtitle: 'Circle to Search. AI Night Mode' },
      { type: 'camera_front', title: '8MP Front Camera', subtitle: 'Sharp, detailed selfies' },
      { type: 'display', title: '6.79 inch', subtitle: '600 Nits Brightness. 120Hz Refresh Rate' },
      { type: 'battery', title: '6000 mAh Battery', subtitle: 'Charging that can last up to 2 days' },
    ],
    showcase: {
      headline: 'boltt Evo',
      subheadline: 'GaneshKart Unique • Designed to Outperform',
      heroImage: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80',
      features: [
        { title: 'Segment Leading 6000 mAh Battery', desc: 'Enjoy up to 48 hours of uninterrupted calling and streaming.' },
        { title: 'Ultra Smooth 120Hz Eye-Care Display', desc: 'Immersive 6.79-inch display with 600 nits high brightness outdoor mode.' },
        { title: 'AI 50MP Dual Lens Camera', desc: 'Capture vivid nighttime portraits and crystal clear landscapes.' },
        { title: 'Blazing Fast Octa-Core T7250 Processor', desc: 'Supreme gaming stability with AnTuTu benchmark over 390,000 points.' }
      ]
    },
    specs: {
      General: {
        'In The Box': 'Handset, 33W Fast Charger, USB Type-C Cable, Sim Ejector Tool, Protective Case, User Guide',
        'Model Name': 'EVO',
        'Color': 'Berry Red',
        'Browse Type': 'Smartphones',
        'SIM Type': 'Dual SIM (Nano-SIM)',
        'Hybrid Sim Slot': 'Yes',
        'Touchscreen': 'Yes',
        'OTG Compatible': 'Yes',
      },
      'Display Features': {
        'Display Size': '17.25 cm (6.79 inch)',
        'Resolution': '2460 x 1080 Pixels (Full HD+)',
        'Resolution Type': 'Full HD+ IPS LCD with 120Hz Refresh Rate',
        'GPU': 'Mali-G57 MC2',
        'Brightness': '600 nits Peak Outdoor Brightness',
      },
      'OS & Processor': {
        'Operating System': 'Android 14 with Clean UI Experience',
        'Processor Brand': 'Unisoc / Octa-Core',
        'Processor Type': 'T7250 Octa Core Processor',
        'Processor Core': 'Octa Core',
        'Primary Clock Speed': '1.8 GHz',
      },
      'Memory & Storage': {
        'Internal Storage': '64 GB / 128 GB',
        'RAM': '4 GB / 6 GB',
        'Expandable Storage': 'Up to 1 TB via MicroSD Card',
        'Supported Memory Card Type': 'MicroSD',
      },
      'Camera Features': {
        'Primary Camera': '50MP (f/1.8 Aperture) + 2MP Depth Lens',
        'Camera Features': 'Circle to Search, AI Portrait Mode, Super Night Mode, HDR, Pro Mode, Panorama',
        'Secondary Camera': '8MP Front Camera with Screen Flash',
        'Video Recording': '1080P @ 30 fps, 720P @ 30 fps',
      },
      'Connectivity Features': {
        'Network Type': '4G VOLTE, 4G, 3G, 2G',
        'Supported Networks': '4G LTE, WCDMA, GSM',
        'Wi-Fi': '802.11 a/b/g/n/ac (2.4GHz & 5GHz)',
        'Bluetooth': 'v5.2',
        'Audio Jack': '3.5 mm Headphone Jack',
      },
      'Battery & Power': {
        'Battery Capacity': '6000 mAh High-Density Lithium-Polymer',
        'Battery Life': 'Up to 2 Days of Normal Usage',
        'Charging': '18W Fast Charging Support',
      },
      Warranty: {
        'Warranty Summary': '1 Year Manufacturer Warranty for Device and 6 Months for In-Box Accessories',
        'Covered in Warranty': 'Manufacturing Defects',
        'Not Covered in Warranty': 'Physical Damage or Liquid Ingress',
      }
    }
  },

  // OPPO K14 Lite 5G (Matches Screenshot Similar Products)
  'OPPO K14 Lite 5G (Glowing Purple, 128 GB)': {
    gallery: [
      { id: 'front', label: 'Front Display', url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80' },
      { id: 'back', label: 'Glowing Purple Back', url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80' },
      { id: 'camera', label: 'AI Portrait Camera', url: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80' },
      { id: 'angle', label: 'IP64 Waterproof Design', url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80' },
      { id: 'display', label: '7000mAh Battery Power', url: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80' },
    ],
    colors: [
      { name: 'Glowing Purple', hex: '#b39ddb', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80' },
      { name: 'Forest Green', hex: '#556b2f', img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=300&q=80' },
      { name: 'Midnight Black', hex: '#1c1c1e', img: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=300&q=80' },
    ],
    variants: [
      { label: '128 GB + 6 GB', price: 13999, originalPrice: 19999, discount: '30% off' },
      { label: '256 GB + 8 GB', price: 15999, originalPrice: 22999, discount: '30% off' },
    ],
    highlights: [
      { type: 'battery', title: '7000 mAh Monster Battery', subtitle: "Segment's Longest! 6-Year Durable Battery Health" },
      { type: 'display', title: '120Hz Ultra Bright Display', subtitle: '1000 Nits Sunlight readability with Splash Touch' },
      { type: 'processor', title: 'MediaTek Dimensity 6300 5G Processor', subtitle: '36-Month Smoothness Fluency Protection' },
      { type: 'camera_rear', title: '50MP Ultra-Clear Dual Camera', subtitle: 'AI Eraser & AI Portrait Studio' },
      { type: 'ram', title: 'Up to 16GB Dynamic RAM (8GB+8GB)', subtitle: 'Lag-free multitasking with ColorOS 14' },
      { type: 'camera_front', title: '8MP Selfie Camera with AI Retouching', subtitle: 'Studio-grade natural selfies' },
    ],
    specs: {
      General: {
        'Model Name': 'K14 Lite 5G',
        'Color': 'Glowing Purple',
        'In The Box': 'Device, 45W SUPERVOOC Charger, USB Cable, Case, SIM Tool',
      },
      'Battery & Power': {
        'Battery Capacity': '7000 mAh',
        'Charging': '45W SUPERVOOC Fast Flash Charge',
      }
    }
  },

  // Samsung Galaxy S24 Ultra
  'Galaxy S24 Ultra 5G (Titanium Gray, 256 GB)': {
    gallery: [
      { id: 'front', label: 'Front View', url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80' },
      { id: 'back', label: 'Back View', url: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80' },
      { id: 'camera', label: 'Camera Close-up', url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80' },
      { id: 'angle', label: 'Side Profile', url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80' },
      { id: 'display', label: 'Display & Pen', url: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80' },
    ],
    colors: [
      { name: 'Titanium Gray', hex: '#636569', img: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=300&q=80' },
      { name: 'Titanium Black', hex: '#1c1c1e', img: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=300&q=80' },
      { name: 'Titanium Violet', hex: '#584d6b', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80' },
      { name: 'Titanium Yellow', hex: '#e8d898', img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=300&q=80' },
    ],
    variants: [
      { label: '256 GB + 12 GB', price: 119999, originalPrice: 134999, discount: '11% off' },
      { label: '512 GB + 12 GB', price: 129999, originalPrice: 144999, discount: '10% off' },
      { label: '1 TB + 12 GB', price: 149999, originalPrice: 169999, discount: '12% off' },
    ],
    highlights: [
      { type: 'ram', title: '12 GB RAM | 256 GB ROM', subtitle: 'Store up to 50,000+ high-res photos & 8K videos' },
      { type: 'processor', title: 'Snapdragon 8 Gen 3 for Galaxy | 3.39 GHz Clock Speed', subtitle: 'Industry’s fastest mobile CPU with Ray Tracing gaming' },
      { type: 'camera_rear', title: '200MP + 50MP + 12MP + 10MP Quad Telephoto Camera', subtitle: 'Circle to Search. ProVisual Engine with 100X Space Zoom' },
      { type: 'camera_front', title: '12MP Dual Pixel Auto Focus Selfie Camera', subtitle: 'Sharp 4K 60fps HDR video calls & Super HDR selfies' },
      { type: 'display', title: '6.8 inch Quad HD+ Dynamic AMOLED 2X Display', subtitle: '2600 Nits Peak Brightness with Corning Gorilla Armor' },
      { type: 'battery', title: '5000 mAh Intelligent All-Day Battery', subtitle: '45W Super Fast Charging 2.0 with Fast Wireless 2.0' },
    ],
    specs: {
      General: {
        'Model Name': 'Galaxy S24 Ultra 5G',
        'Color': 'Titanium Gray',
        'SIM Type': 'Dual SIM (Nano-SIM and eSIM)',
        'In The Box': 'Handset, S-Pen, Type-C to Type-C Cable, SIM Ejector Pin, Quick Start Guide',
      },
      'Display Features': {
        'Display Size': '17.27 cm (6.8 inch)',
        'Resolution': '3120 x 1440 Pixels (Quad HD+)',
        'Resolution Type': 'Dynamic AMOLED 2X',
        'Refresh Rate': '120 Hz Adaptive (1 Hz - 120 Hz)',
        'Brightness': '2600 nits Peak Outdoor Brightness',
      },
      'OS & Processor': {
        'Operating System': 'Android 14 (One UI 6.1 with 7 Years OS Updates)',
        'Processor Brand': 'Qualcomm',
        'Processor Type': 'Snapdragon 8 Gen 3 for Galaxy',
        'Processor Core': 'Octa Core',
        'Primary Clock Speed': '3.39 GHz',
      },
      'Memory & Storage': {
        'Internal Storage': '256 GB UFS 4.0',
        'RAM': '12 GB LPDDR5X',
        'Memory Card Slot': 'No',
      },
      'Camera Features': {
        'Primary Camera': '200MP (OIS, F1.7) + 50MP (5x Periscope OIS) + 10MP (3x Telephoto) + 12MP (Ultra-Wide)',
        'Secondary Camera': '12MP Front Camera with Auto Focus',
        'Video Recording': '8K at 30fps, 4K at 120fps, 1080p Slow Motion',
        'Optical Zoom': '3x, 5x, 10x Optical Quality Zoom',
      },
      'Connectivity Features': {
        'Network Type': '5G, 4G LTE, 3G, 2G',
        'Supported Networks': '5G NR, 4G LTE, HSDPA',
        'Wi-Fi': 'Wi-Fi 7 (802.11be), Tri-band',
        'Bluetooth': 'v5.3 with LE Audio',
      },
      'Battery & Power': {
        'Battery Capacity': '5000 mAh Lithium-ion',
        'Charging': '45W Wired (65% in 30 mins), 15W Wireless, 4.5W Reverse Wireless',
      }
    }
  },

  // iPhone 15 Pro Max
  'iPhone 15 Pro Max (Natural Titanium, 256 GB)': {
    gallery: [
      { id: 'front', label: 'Front View', url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80' },
      { id: 'back', label: 'Back View', url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80' },
      { id: 'camera', label: 'Triple Camera', url: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80' },
      { id: 'angle', label: 'Titanium Frame', url: 'https://images.unsplash.com/photo-1530319067432-f2a729c03db5?auto=format&fit=crop&w=800&q=80' },
      { id: 'display', label: 'Dynamic Island', url: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80' },
    ],
    colors: [
      { name: 'Natural Titanium', hex: '#9d9994', img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=300&q=80' },
      { name: 'Blue Titanium', hex: '#373f4e', img: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=300&q=80' },
      { name: 'White Titanium', hex: '#edece8', img: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=300&q=80' },
      { name: 'Black Titanium', hex: '#2f2f31', img: 'https://images.unsplash.com/photo-1530319067432-f2a729c03db5?auto=format&fit=crop&w=300&q=80' },
    ],
    variants: [
      { label: '256 GB', price: 148900, originalPrice: 159900, discount: '7% off' },
      { label: '512 GB', price: 168900, originalPrice: 179900, discount: '6% off' },
      { label: '1 TB', price: 188900, originalPrice: 199900, discount: '5% off' },
    ],
    highlights: [
      { type: 'ram', title: '8 GB RAM | 256 GB ROM', subtitle: 'Ultra high-speed NVMe flash storage for pro workflows' },
      { type: 'processor', title: 'A17 Pro Chip | 6-core GPU with Hardware Ray Tracing', subtitle: 'Console-grade gaming on mobile with next-gen Neural Engine' },
      { type: 'camera_rear', title: '48MP Main + 12MP Ultra Wide + 12MP 5x Telephoto', subtitle: '7 pro lenses in your pocket with Spatial 3D Video Capture' },
      { type: 'camera_front', title: '12MP TrueDepth Camera with Photonic Engine', subtitle: 'Auto-Focus with Focus Pixels and Face ID biometric security' },
      { type: 'display', title: '6.7 inch Super Retina XDR OLED Display', subtitle: 'ProMotion 120Hz, Always-On, Dynamic Island & 2000 Nits' },
      { type: 'battery', title: 'Up to 29 hours Video Playback', subtitle: 'USB-C 3.0 with up to 10Gbps transfer speeds & MagSafe' },
    ],
    specs: {
      General: {
        'Model Name': 'iPhone 15 Pro Max',
        'Color': 'Natural Titanium',
        'SIM Type': 'Dual SIM (Nano-SIM + eSIM)',
        'In The Box': 'iPhone, USB-C Charge Cable (1m), Documentation',
      },
      'Display Features': {
        'Display Size': '17.02 cm (6.7 inch)',
        'Resolution': '2796 x 1290 Pixels',
        'Resolution Type': 'Super Retina XDR OLED',
        'Refresh Rate': 'ProMotion 120 Hz',
        'Brightness': '2000 nits Peak Outdoor Brightness',
      },
      'OS & Processor': {
        'Operating System': 'iOS 17 (Upgradable to iOS 18)',
        'Processor Brand': 'Apple',
        'Processor Type': 'A17 Pro chip',
        'Processor Core': '6 Core (2 Performance + 4 Efficiency)',
      },
      'Camera Features': {
        'Primary Camera': '48MP + 12MP (Ultra-Wide) + 12MP (5x Optical Telephoto)',
        'Secondary Camera': '12MP TrueDepth Front Camera',
        'Optical Zoom': '5x Optical Zoom In, 2x Optical Zoom Out, 10x Optical Zoom Range',
      },
      'Battery & Power': {
        'Battery Type': 'Built-in rechargeable lithium-ion battery',
        'Charging': 'Up to 50% charge in 30 minutes with 20W adapter, 15W MagSafe Wireless',
      }
    }
  },

  // OnePlus 12 5G
  'OnePlus 12 5G (Flowy Emerald, 16GB RAM, 512GB)': {
    gallery: [
      { id: 'front', label: 'Front Display', url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80' },
      { id: 'back', label: 'Emerald Back', url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80' },
      { id: 'camera', label: 'Hasselblad Ring', url: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80' },
      { id: 'angle', label: 'Curved Frame', url: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80' },
      { id: 'display', label: '120Hz ProXDR', url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80' },
    ],
    colors: [
      { name: 'Flowy Emerald', hex: '#2e5d4e', img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=300&q=80' },
      { name: 'Silky Black', hex: '#212121', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80' },
    ],
    variants: [
      { label: '256 GB + 12 GB', price: 59999, originalPrice: 64999, discount: '8% off' },
      { label: '512 GB + 16 GB', price: 64999, originalPrice: 69999, discount: '7% off' },
    ],
    highlights: [
      { type: 'ram', title: '16 GB LPDDR5X RAM | 512 GB UFS 4.0 ROM', subtitle: 'Up to 72 active apps kept alive in memory' },
      { type: 'processor', title: 'Snapdragon 8 Gen 3 with Dual Cryo-velocity VC Cooling', subtitle: 'Over 2.2 Million AnTuTu benchmarking score' },
      { type: 'camera_rear', title: '50MP Sony LYT-808 + 64MP 3x Periscope + 48MP Ultra-Wide', subtitle: '4th Gen Hasselblad Camera for Mobile with Master Mode' },
      { type: 'camera_front', title: '32MP Sony IMX615 Selfie Camera', subtitle: 'Electronic Image Stabilization with 4K video recording' },
      { type: 'display', title: '6.82 inch 2K 120Hz ProXDR 10-bit Display', subtitle: 'Record-shattering 4500 Nits Peak Brightness with Aqua Touch' },
      { type: 'battery', title: '5400 mAh Battery with 100W SUPERVOOC Charging', subtitle: '1-100% in just 26 minutes + 50W AIRVOOC wireless' },
    ],
    specs: {
      General: {
        'Model Name': 'OnePlus 12 5G',
        'Color': 'Flowy Emerald',
        'SIM Type': 'Dual SIM',
        'In The Box': 'OnePlus 12, 100W SUPERVOOC Power Adapter, Type-A to C Cable, Quick Guide',
      },
      'Display Features': {
        'Display Size': '17.32 cm (6.82 inch)',
        'Resolution': '3168 x 1440 Pixels 2K',
        'Brightness': '4500 nits Peak Brightness',
        'Refresh Rate': '120 Hz ProXDR with LTPO 4.0',
      },
      'OS & Processor': {
        'Operating System': 'OxygenOS 14.0 based on Android 14',
        'Processor Type': 'Snapdragon 8 Gen 3 Mobile Platform',
      },
      'Battery & Power': {
        'Battery Capacity': '5400 mAh (Dual-cell 2,700 mAh)',
        'Fast Charging': '100W SUPERVOOC, 50W AIRVOOC wireless',
      }
    }
  },

  // Redmi Note 13 Pro+
  'Redmi Note 13 Pro+ 5G (Fusion Purple, 8GB, 256GB)': {
    gallery: [
      { id: 'front', label: 'Front Curved View', url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80' },
      { id: 'back', label: 'Vegan Leather Back', url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80' },
      { id: 'camera', label: '200MP OIS Lens', url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80' },
      { id: 'angle', label: 'IP68 Water Resistance', url: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80' },
      { id: 'display', label: '1.5K 120Hz Curved AMOLED', url: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80' },
    ],
    colors: [
      { name: 'Fusion Purple', hex: '#b39ddb', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80' },
      { name: 'Fusion Black', hex: '#212121', img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=300&q=80' },
      { name: 'Fusion White', hex: '#fafafa', img: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=300&q=80' },
    ],
    variants: [
      { label: '128 GB + 8 GB', price: 25999, originalPrice: 31999, discount: '18% off' },
      { label: '256 GB + 8 GB', price: 27999, originalPrice: 33999, discount: '17% off' },
      { label: '512 GB + 12 GB', price: 31999, originalPrice: 37999, discount: '15% off' },
    ],
    highlights: [
      { type: 'ram', title: '8 GB RAM | 256 GB ROM', subtitle: 'Store up to 25,000+ photos with UFS 3.1 storage' },
      { type: 'processor', title: 'MediaTek Dimensity 7200-Ultra 4nm Processor', subtitle: '4000mm² Vapor Chamber cooling for sustained gaming' },
      { type: 'camera_rear', title: '200MP Samsung ISOCELL HP3 with OIS + 8MP + 2MP', subtitle: 'Super clear 4X in-sensor lossless optical zoom' },
      { type: 'camera_front', title: '16MP Crystal-clear Selfie Camera', subtitle: 'AI Beautify and 1080p 60fps video capture' },
      { type: 'display', title: '6.67 inch 3D Curved 1.5K 120Hz AMOLED Display', subtitle: '1800 Nits Peak Brightness with Corning Gorilla Glass Victus' },
      { type: 'battery', title: '5000 mAh Battery with 120W HyperCharge', subtitle: '0 to 100% full charge in just 19 minutes (In-box charger)' },
    ],
    specs: {
      General: {
        'Model Name': 'Redmi Note 13 Pro+ 5G',
        'Color': 'Fusion Purple',
        'SIM Type': 'Dual SIM',
        'In The Box': 'Handset, 120W Charger, USB Type-C Cable, SIM Eject Tool, Protective Case',
      },
      'Display Features': {
        'Display Size': '16.94 cm (6.67 inch)',
        'Resolution': '2712 x 1220 Pixels (1.5K)',
        'Refresh Rate': '120 Hz Curved AMOLED',
      },
      'OS & Processor': {
        'Operating System': 'MIUI 14 based on Android 13 (Upgradable to HyperOS)',
        'Processor Type': 'MediaTek Dimensity 7200-Ultra (4nm)',
      },
      'Battery & Power': {
        'Battery Capacity': '5000 mAh',
        'Charging': '120W HyperCharge (100% in 19 mins)',
      }
    }
  }
};

/**
 * Helper to generate comprehensive multi-angle gallery, highlights, and specs
 * for ANY electronic product dynamically if not explicitly specified above.
 */
export function getProductElectronicDetails(product) {
  if (!product) return null;

  const isElectronic = 
    product.category === 'Mobiles' || 
    product.category === 'Electronics' || 
    product.category === 'Appliances';

  if (!isElectronic) return null;

  // Check if predefined
  if (ELECTRONICS_METADATA[product.name]) {
    return ELECTRONICS_METADATA[product.name];
  }

  // Dynamic Generator for any newly added product or electronics
  const primaryImg = product.imageUrl;
  
  // Safe angle view generators using high-quality tech imagery
  const dynamicGallery = [
    { id: 'front', label: 'Front View', url: primaryImg },
    { id: 'back', label: 'Back View', url: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80' },
    { id: 'camera', label: 'Camera / Port View', url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80' },
    { id: 'angle', label: 'Side Profile', url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80' },
    { id: 'display', label: 'Functions & Display', url: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80' },
  ];

  const dynamicColors = [
    { name: 'Standard Edition', hex: '#212121', img: primaryImg },
    { name: 'Silver Mist', hex: '#90a4ae', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80' },
    { name: 'Midnight Blue', hex: '#1a237e', img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=300&q=80' },
  ];

  const dynamicVariants = [
    { label: 'Standard Variant', price: product.discountPrice, originalPrice: product.price, discount: 'Special Price' },
    { label: 'Pro Upgrade', price: Math.round(product.discountPrice * 1.15), originalPrice: Math.round(product.price * 1.15), discount: '15% Extra' },
  ];

  const dynamicHighlights = [
    { type: 'ram', title: 'High Performance RAM & Fast Storage', subtitle: 'Ultra-fast read/write speeds for lag-free multitasking' },
    { type: 'processor', title: `${product.brand} Next-Gen Processing Engine`, subtitle: 'Advanced AI processing with supreme thermal stability' },
    { type: 'camera_rear', title: 'High-Resolution Sensor with Optical Stabilization', subtitle: 'Vibrant HDR capture with AI Night Vision capabilities' },
    { type: 'camera_front', title: 'Ultra-Clear Front Module', subtitle: 'Sharp wide-angle selfies & studio-quality portraits' },
    { type: 'display', title: 'Vivid High-Refresh Rate Display', subtitle: 'High contrast ratio, eye-care certification & deep blacks' },
    { type: 'battery', title: 'Long-Lasting High Capacity Battery', subtitle: 'All-day endurance with Rapid Turbo Fast Charging' },
  ];

  const dynamicSpecs = {
    General: {
      'Brand': product.brand,
      'Model Name': product.name,
      'Category': product.category,
      'In The Box': `${product.name}, Power Cable/Adapter, User Documentation, Warranty Card`,
    },
    'Display Features': {
      'Display Type': 'High-Definition Anti-Glare Screen',
      'Refresh Rate': '120Hz Smooth Motion Support',
      'Resolution': 'Full HD+ / Ultra HD Certified',
    },
    'OS & Processor': {
      'Processor Core': 'Multi-Core High Efficiency',
      'Architecture': '64-bit Advanced Architecture',
    },
    'Camera Features': {
      'Primary Sensor': 'High-Resolution Multi-Sensor Array',
      'Video Support': '4K Ultra HD Recording',
    },
    'Battery & Power': {
      'Battery Type': 'Advanced Lithium Polymer / Lithium Ion',
      'Power Saving': 'Intelligent AI Power Management',
    },
    Warranty: {
      'Warranty Summary': '1 Year Manufacturer Warranty for Device',
      'Service Type': 'On-site / Carry-in Service across India',
    }
  };

  return {
    gallery: dynamicGallery,
    colors: dynamicColors,
    variants: dynamicVariants,
    highlights: dynamicHighlights,
    specs: dynamicSpecs
  };
}
