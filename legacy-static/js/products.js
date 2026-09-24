/**
 * VERONA ATELIER - Premium Modern Furniture Catalogue & E-Commerce
 * Comprehensive Product Database
 */

const CATEGORIES = [
  {
    id: "sofas",
    name: "Sofas",
    tagline: "Uncompromising Comfort, Timeless Design",
    description: "Handcrafted modular and living room seating built with high-density resilience foam and top-grain upholstery.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80",
    subcategories: [
      { id: "all", name: "All Sofas" },
      { id: "2-seater", name: "2 Seater" },
      { id: "3-seater", name: "3 Seater" },
      { id: "l-shape", name: "L Shape" },
      { id: "corner-sofa", name: "Corner Sofa" },
      { id: "sofa-set", name: "Sofa Set" },
      { id: "sofa-bed", name: "Sofa Bed" },
      { id: "fabric-sofa", name: "Fabric Sofa" },
      { id: "leather-sofa", name: "Leather Sofa" }
    ]
  },
  {
    id: "beds",
    name: "Beds",
    tagline: "Serene Sanctuaries for Restful Nights",
    description: "Engineered solid wood and upholstered bed frames with integrated hydraulic storage and ergonomic headboards.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    subcategories: [
      { id: "all", name: "All Beds" },
      { id: "king-size", name: "King Size" },
      { id: "queen-size", name: "Queen Size" },
      { id: "single-beds", name: "Single Beds" },
      { id: "storage-beds", name: "Storage Beds" },
      { id: "wooden-beds", name: "Wooden Beds" },
      { id: "upholstered-beds", name: "Upholstered Beds" }
    ]
  },
  {
    id: "dining",
    name: "Dining",
    tagline: "Where Gatherings Become Cherished Memories",
    description: "Solid Sheesham, Teak, and sintered stone dining tables with coordinating ergonomic cushioned seating.",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=900&q=80",
    subcategories: [
      { id: "all", name: "All Dining" },
      { id: "4-seater", name: "4 Seater" },
      { id: "6-seater", name: "6 Seater" },
      { id: "8-seater", name: "8 Seater" },
      { id: "dining-tables", name: "Dining Tables" },
      { id: "dining-chairs", name: "Dining Chairs" }
    ]
  },
  {
    id: "chairs",
    name: "Chairs",
    tagline: "Sculptural Curves & Sublime Seating",
    description: "From mid-century lounge armchairs to motorized recliners and statement accent chairs.",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=80",
    subcategories: [
      { id: "all", name: "All Chairs" },
      { id: "dining-chairs", name: "Dining Chairs" },
      { id: "office-chairs", name: "Office Chairs" },
      { id: "lounge-chairs", name: "Lounge Chairs" },
      { id: "recliners", name: "Recliners" }
    ]
  },
  {
    id: "tables",
    name: "Tables",
    tagline: "Architectural Accents for Modern Spaces",
    description: "Fluted marble coffee tables, minimalist study desks, and nesting end tables in rich walnut finishes.",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=900&q=80",
    subcategories: [
      { id: "all", name: "All Tables" },
      { id: "center-tables", name: "Center Tables" },
      { id: "coffee-tables", name: "Coffee Tables" },
      { id: "study-tables", name: "Study Tables" },
      { id: "office-tables", name: "Office Tables" },
      { id: "side-tables", name: "Side Tables" }
    ]
  },
  {
    id: "wardrobes",
    name: "Wardrobes",
    tagline: "Bespoke Organization & Modern Storage",
    description: "Floor-to-ceiling modular sliding and hinged wardrobes with soft-close German hardware and LED sensors.",
    image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=900&q=80",
    subcategories: [
      { id: "all", name: "All Wardrobes" },
      { id: "2-door", name: "2 Door" },
      { id: "3-door", name: "3 Door" },
      { id: "4-door", name: "4 Door" },
      { id: "sliding-door", name: "Sliding Door" },
      { id: "wooden-wardrobes", name: "Wooden Wardrobes" }
    ]
  },
  {
    id: "office",
    name: "Office Furniture",
    tagline: "Productivity Meets Executive Refinement",
    description: "High-performance ergonomic chairs, solid wood executive desks, and architectural storage solutions.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
    subcategories: [
      { id: "all", name: "All Office" },
      { id: "ergonomic-chairs", name: "Ergonomic Chairs" },
      { id: "executive-desks", name: "Executive Desks" },
      { id: "bookshelves", name: "Bookshelves" },
      { id: "conference-tables", name: "Conference Tables" }
    ]
  },
  {
    id: "mattress",
    name: "Mattress",
    tagline: "Orthopedic Science & Cloud-Like Sleep",
    description: "Multi-zone pocket springs, cooling natural latex, and orthopedic memory foam designed for spine alignment.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80",
    subcategories: [
      { id: "all", name: "All Mattresses" },
      { id: "orthopedic", name: "Orthopedic" },
      { id: "memory-foam", name: "Memory Foam" },
      { id: "pocket-spring", name: "Pocket Spring" },
      { id: "latex", name: "Latex" }
    ]
  }
];

const PRODUCTS = [
  // ===================== BEDS =====================
  {
    id: "royal-king-bed",
    name: "Royal King Bed",
    category: "beds",
    subcategories: ["king-size", "wooden-beds"],
    price: 45000,
    originalPrice: 56000,
    rating: 4.9,
    reviewsCount: 148,
    badge: "Bestseller",
    availability: "In Stock",
    stockCount: 6,
    material: "Solid Teak Wood",
    dimensions: "78 × 72 × 48 inches",
    warranty: "10 Years Structural Warranty",
    primaryImage: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Walnut Brown", hex: "#4A2E1B" },
      { name: "Warm Honey Teak", hex: "#A06B3E" },
      { name: "Dark Espresso", hex: "#281E19" }
    ],
    sizes: ["King Size (78×72 in)", "Queen Size (78×60 in)"],
    description: "The Royal King Bed is handcrafted from season-matured Grade-A Solid Teak Wood. Featuring an imposing arched fluted headboard with smooth hand-rubbed oil wax finishes, it stands as the majestic centerpiece of any master suite.",
    features: [
      "100% Seasoned Grade-A Solid Teak Wood frame",
      "Reinforced heavy-duty dual slat support system for zero creaks",
      "Hand-rubbed natural polyurethane satin finish resistant to water & scratches",
      "Rounded safety edges and built-in headboard ledge for discreet bedside items"
    ],
    specs: {
      "Mattress Size Recommended": "78 × 72 inches",
      "Clearance to Floor": "8 inches (Robot vacuum friendly)",
      "Headboard Height": "48 inches",
      "Weight Capacity": "450 kg",
      "Assembly Required": "Free Expert Assembly Included"
    }
  },
  {
    id: "modern-queen-bed",
    name: "Modern Queen Bed",
    category: "beds",
    subcategories: ["queen-size", "upholstered-beds"],
    price: 32000,
    originalPrice: 40000,
    rating: 4.8,
    reviewsCount: 96,
    badge: "Popular",
    availability: "In Stock",
    stockCount: 12,
    material: "Kiln-Dried Hardwood & Boucle Fabric",
    dimensions: "78 × 60 × 44 inches",
    warranty: "7 Years Structural Warranty",
    primaryImage: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Oatmeal Cream", hex: "#E3DAC9" },
      { name: "Charcoal Slate", hex: "#3A3B3C" },
      { name: "Sage Mist", hex: "#8A9A86" }
    ],
    sizes: ["Queen Size (78×60 in)", "King Size (78×72 in)"],
    description: "Designed with minimalist Japanese-Nordic sensibilities, this queen bed features plush channeled bouclé upholstery cradling a robust solid hardwood internal structure. Clean, calm, and soothing.",
    features: [
      "Stain-resistant textured European bouclé upholstery",
      "Solid beechwood tapered floating legs",
      "Soft padded headboard ideal for evening reading",
      "German acoustic damping bed slats"
    ],
    specs: {
      "Mattress Size Recommended": "78 × 60 inches",
      "Headboard Height": "44 inches",
      "Weight Capacity": "380 kg",
      "Assembly Required": "Free Expert Assembly Included"
    }
  },
  {
    id: "storage-king-bed",
    name: "Storage King Bed",
    category: "beds",
    subcategories: ["king-size", "storage-beds", "wooden-beds"],
    price: 52000,
    originalPrice: 65000,
    rating: 4.9,
    reviewsCount: 112,
    badge: "Top Rated",
    availability: "In Stock",
    stockCount: 4,
    material: "Engineered Wood with Teak Veneer",
    dimensions: "80 × 74 × 46 inches",
    warranty: "10 Years Structural Warranty",
    primaryImage: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Warm Walnut", hex: "#4A2E1B" },
      { name: "Smoky Ash", hex: "#5C564E" }
    ],
    sizes: ["King Size (78×72 in)", "Queen Size (78×60 in)"],
    description: "Maximize bedroom organization with effortless hydraulic lift mechanism. Conceals 900+ litres of partitioned dust-free storage underneath, ideal for seasonal blankets and extra linens.",
    features: [
      "Hydraulic dual gas-lift pistons tested for 10,000 cycles",
      "Four divided compartments with base liners",
      "Integrated warm LED reading light bar in headboard",
      "Hidden wire conduit for phone charging cables"
    ],
    specs: {
      "Storage Volume": "920 Litres",
      "Lift Angle": "48 degrees effortless opening",
      "Headboard Height": "46 inches",
      "Weight Capacity": "500 kg"
    }
  },
  {
    id: "wooden-single-bed",
    name: "Wooden Single Bed",
    category: "beds",
    subcategories: ["single-beds", "wooden-beds"],
    price: 18000,
    originalPrice: 22500,
    rating: 4.7,
    reviewsCount: 64,
    badge: "Compact Living",
    availability: "In Stock",
    stockCount: 15,
    material: "Solid Sheesham Wood",
    dimensions: "78 × 36 × 38 inches",
    warranty: "5 Years Structural Warranty",
    primaryImage: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Honey Brown", hex: "#A06B3E" },
      { name: "Natural Teak", hex: "#C89D66" }
    ],
    sizes: ["Single (78×36 in)"],
    description: "A compact solid Sheesham bed tailored for guest rooms, youth spaces, or studio apartments. Showcases the rich natural grain patterns inherent to solid Indian Rosewood.",
    features: [
      "100% Solid Indian Sheesham timber construction",
      "Sturdy 6-leg foundation with anti-scratch nylon floor pads",
      "Minimalist slatted headboard allowing natural light flow",
      "Pre-treated against termites and climate variations"
    ],
    specs: {
      "Mattress Size Recommended": "78 × 36 inches",
      "Headboard Height": "38 inches",
      "Weight Capacity": "220 kg"
    }
  },
  {
    id: "haven-upholstered-king",
    name: "Haven Velvet Upholstered Bed",
    category: "beds",
    subcategories: ["king-size", "upholstered-beds"],
    price: 49000,
    originalPrice: 62000,
    rating: 4.9,
    reviewsCount: 88,
    badge: "Luxury Edition",
    availability: "In Stock",
    stockCount: 5,
    material: "Solid Pine & Italian Performance Velvet",
    dimensions: "82 × 76 × 52 inches",
    warranty: "10 Years Structural Warranty",
    primaryImage: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Emerald Forest", hex: "#1C3F34" },
      { name: "Midnight Navy", hex: "#1D2A44" },
      { name: "Champagne Velvet", hex: "#D6C4A5" }
    ],
    sizes: ["King Size (78×72 in)", "Queen Size (78×60 in)"],
    description: "Indulge in plush hotel-grade luxury with the Haven Velvet King Bed. Featuring a tall button-tufted wingback headboard and brushed brass metallic corner feet.",
    features: [
      "Water-repellent, pet-friendly luxury velvet",
      "Handcrafted diamond button tufting with high-density padding",
      "Brushed brass accented foundation legs",
      "Sound-absorbing padded side rails"
    ],
    specs: {
      "Headboard Height": "52 inches Wingback",
      "Weight Capacity": "460 kg"
    }
  },

  // ===================== SOFAS =====================
  {
    id: "verona-l-shape-sofa",
    name: "Verona Modular L-Shape Sectional",
    category: "sofas",
    subcategories: ["l-shape", "corner-sofa", "fabric-sofa"],
    price: 68000,
    originalPrice: 85000,
    rating: 4.9,
    reviewsCount: 164,
    badge: "Bestseller",
    availability: "In Stock",
    stockCount: 7,
    material: "Kiln-Dried Sal Wood & Textured Linen Blend",
    dimensions: "112 × 68 × 34 inches",
    warranty: "10 Years Frame Warranty",
    primaryImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Warm Greige", hex: "#A89F91" },
      { name: "Deep Charcoal", hex: "#2E3033" },
      { name: "Terracotta Earth", hex: "#9E472A" }
    ],
    sizes: ["Left Lounger (112×68 in)", "Right Lounger (112×68 in)"],
    description: "The Verona Sectional redefines grand entertaining. Deep, cloud-like seat cushions filled with 38-density high-resilience foam and a feather-fiber crown provide blissful sink-in relaxation.",
    features: [
      "Reversible modular chaise configuration",
      "Multi-layer high-density HR foam with goose feather top layer",
      "Removable washable cushion covers with hidden heavy-duty zips",
      "Solid beechwood plinth base with acoustic dampeners"
    ],
    specs: {
      "Seating Capacity": "5 to 6 Adults",
      "Seat Depth": "26 inches (Deep Lounge)",
      "Seat Height": "18 inches",
      "Frame Material": "Kiln-dried solid hardwood"
    }
  },
  {
    id: "nordic-3-seater-sofa",
    name: "Nordic Minimalist 3-Seater Sofa",
    category: "sofas",
    subcategories: ["3-seater", "fabric-sofa"],
    price: 36000,
    originalPrice: 45000,
    rating: 4.8,
    reviewsCount: 89,
    badge: "Popular",
    availability: "In Stock",
    stockCount: 11,
    material: "Solid Birch Wood & Woven Chenille",
    dimensions: "84 × 36 × 33 inches",
    warranty: "7 Years Frame Warranty",
    primaryImage: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Forest Olive", hex: "#4B5320" },
      { name: "Linen Cream", hex: "#E9DFD0" },
      { name: "Graphite", hex: "#383E42" }
    ],
    sizes: ["3 Seater (84 in)", "2 Seater (62 in)"],
    description: "Embodying Scandinavian harmony, the Nordic 3-Seater features slender flared arms, clean horizontal tailoring, and splayed natural oak legs. Generously cushioned without overwhelming your living space.",
    features: [
      "Breathable, pill-resistant chenille weave",
      "Pocket-spring core seat cushions that never sag",
      "Slim profile suited for apartments and modern houses",
      "Includes 2 matching cylindrical lumbar bolsters"
    ],
    specs: {
      "Seating Capacity": "3 Adults",
      "Seat Height": "18.5 inches",
      "Weight Capacity": "360 kg"
    }
  },
  {
    id: "florence-leather-sofa",
    name: "Florence Top-Grain Leather 3-Seater",
    category: "sofas",
    subcategories: ["3-seater", "leather-sofa"],
    price: 78000,
    originalPrice: 98000,
    rating: 5.0,
    reviewsCount: 73,
    badge: "Premium Leather",
    availability: "In Stock",
    stockCount: 3,
    material: "Italian Top-Grain Aniline Leather & Teak",
    dimensions: "88 × 38 × 34 inches",
    warranty: "12 Years Frame & Leather Warranty",
    primaryImage: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Cognac Amber", hex: "#9E4712" },
      { name: "Vintage Espresso", hex: "#321E14" },
      { name: "Rich Tan", hex: "#B86B35" }
    ],
    sizes: ["3 Seater (88 in)", "2 Seater (66 in)"],
    description: "Upholstered in buttery Italian top-grain leather that matures with an exquisite natural patina over decades. Accented with contrast welt seams and sturdy solid Teak underframing.",
    features: [
      "100% Genuine Italian Top-Grain Leather",
      "Feather-topped foam cushions with micro-vented leather breather panels",
      "Hand-stitched inverted baseball seam accents",
      "Solid Teak wooden apron base"
    ],
    specs: {
      "Leather Grade": "Full Semi-Aniline Italian Nappa",
      "Seating Capacity": "3 to 4 Adults",
      "Seat Depth": "24 inches"
    }
  },
  {
    id: "urban-sofa-bed",
    name: "Urban Convertible Sofa Bed",
    category: "sofas",
    subcategories: ["sofa-bed", "2-seater", "fabric-sofa"],
    price: 28000,
    originalPrice: 35000,
    rating: 4.7,
    reviewsCount: 57,
    badge: "Dual Function",
    availability: "In Stock",
    stockCount: 9,
    material: "Steel Frame & High Density Foam",
    dimensions: "74 × 36 × 32 inches (Sofa) / 74 × 54 inches (Bed)",
    warranty: "5 Years Mechanism Warranty",
    primaryImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Smoke Grey", hex: "#595959" },
      { name: "Navy Blue", hex: "#1C2D44" }
    ],
    sizes: ["Full Bed Conversion (74×54 in)"],
    description: "Effortlessly glides from a chic 2-seater couch to a full-sized sleeper bed in just three seconds. Includes a built-in under-seat compartment for spare bedding.",
    features: [
      "Click-clack 3-position click recline mechanism",
      "Full queen-width sleeping surface with pocket springs",
      "Integrated bedding storage box beneath seat",
      "Heavy-duty anti-scratch powder-coated steel chassis"
    ],
    specs: {
      "Bed Mode Dimensions": "74 × 54 × 18 inches",
      "Conversion Time": "Under 5 seconds"
    }
  },
  {
    id: "palazzo-sofa-set",
    name: "Palazzo 3+2+1 Luxury Sofa Set",
    category: "sofas",
    subcategories: ["sofa-set", "fabric-sofa"],
    price: 94000,
    originalPrice: 120000,
    rating: 4.9,
    reviewsCount: 42,
    badge: "Complete Suite",
    availability: "In Stock",
    stockCount: 2,
    material: "Hardwood & Heavy Chenille Jacquard",
    dimensions: "3-Seater: 86 in / 2-Seater: 64 in / 1-Seater: 38 in",
    warranty: "10 Years Warranty",
    primaryImage: "https://images.unsplash.com/photo-1512212621149-107ffe572d2f?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512212621149-107ffe572d2f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Royal Champagne", hex: "#E0CFB5" },
      { name: "Classic Taupe", hex: "#877B70" }
    ],
    sizes: ["Complete 3+2+1 Set (6-Seater Total)"],
    description: "The complete living room masterpiece. Perfectly coordinated 3-seater sofa, 2-seater loveseat, and matching accent armchair with brass nailhead trim and plush bolster cushions.",
    features: [
      "Coordinated full living room ensemble (3+2+1)",
      "Brass hand-applied nailhead trim along arm borders",
      "Reinforced corner-blocked solid wood framing",
      "Comes with 8 matching decorative jacquard toss pillows"
    ],
    specs: {
      "Total Pieces": "3 Furniture Units + 8 Pillows",
      "Seating Capacity": "6 Adults comfortably"
    }
  },

  // ===================== DINING =====================
  {
    id: "elysian-6-seater-dining",
    name: "Elysian Solid Sheesham 6-Seater Dining Set",
    category: "dining",
    subcategories: ["6-seater", "dining-tables", "dining-chairs"],
    price: 48000,
    originalPrice: 60000,
    rating: 4.9,
    reviewsCount: 135,
    badge: "Bestseller",
    availability: "In Stock",
    stockCount: 8,
    material: "100% Solid Indian Sheesham Wood",
    dimensions: "Table: 68 × 36 × 30 inches / Chair: 18 × 19 × 38 inches",
    warranty: "10 Years Structural Warranty",
    primaryImage: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Natural Honey Teak", hex: "#9E6738" },
      { name: "Rich Walnut", hex: "#4A2E1B" }
    ],
    sizes: ["6 Seater Table + 6 Chairs", "6 Seater Table + 4 Chairs + 1 Bench"],
    description: "Crafted from seasoned solid Sheesham with natural undulating grain patterns. Includes a heavy 3-inch top edge dining table and 6 ergonomically contoured wooden dining chairs with cushioned seats.",
    features: [
      "Solid Sheesham wood tabletop with smooth satin lacquer finish",
      "Curved high-back chairs designed for spine comfort",
      "Cushioned seats upholstered in stain-resistant textured fabric",
      "Joints reinforced with heavy mortise-and-tenon construction"
    ],
    specs: {
      "Set Includes": "1 Dining Table + 6 Dining Chairs",
      "Table Dimensions": "68L × 36W × 30H inches",
      "Chair Capacity": "140 kg per chair"
    }
  },
  {
    id: "aurora-4-seater-dining",
    name: "Aurora Round 4-Seater Dining Set",
    category: "dining",
    subcategories: ["4-seater", "dining-tables"],
    price: 34000,
    originalPrice: 42000,
    rating: 4.8,
    reviewsCount: 78,
    badge: "Compact & Chic",
    availability: "In Stock",
    stockCount: 10,
    material: "Sintered Stone Top & Solid Ash Wood Base",
    dimensions: "Table: 44 dia × 30H inches",
    warranty: "8 Years Warranty",
    primaryImage: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Calacatta White Marble", hex: "#EAE7E1" },
      { name: "Nero Marquina Black", hex: "#222222" }
    ],
    sizes: ["4 Seater (44 in Diameter)"],
    description: "Ideal for intimate dining and modern breakfast nooks. Heat-resistant, scratch-resistant Italian sintered stone surface resting on a sculptural starburst wood pedestal.",
    features: [
      "12mm thick sintered stone top resistant to hot cookware up to 250°C",
      "Sculptural starburst tripod pedestal for maximum legroom",
      "Accommodates 4 modern dining chairs effortlessly",
      "Zero stains: impervious to red wine, curry oils, and vinegar"
    ],
    specs: {
      "Top Diameter": "44 inches Round",
      "Table Height": "30 inches"
    }
  },
  {
    id: "grandeur-8-seater-dining",
    name: "Grandeur Marble 8-Seater Dining Table",
    category: "dining",
    subcategories: ["8-seater", "dining-tables"],
    price: 89000,
    originalPrice: 110000,
    rating: 5.0,
    reviewsCount: 45,
    badge: "Luxury Dining",
    availability: "In Stock",
    stockCount: 3,
    material: "Imported Composite Italian Marble & Brass PVD",
    dimensions: "96 × 42 × 30 inches",
    warranty: "10 Years Warranty",
    primaryImage: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Imperial Statuario Marble", hex: "#F3F1EC" },
      { name: "Emerald Agate Pattern", hex: "#1B3B36" }
    ],
    sizes: ["8 Seater (96×42 in)"],
    description: "An awe-inspiring 8-seater dining centerpiece with book-matched Italian marble patterns and electroplated brushed titanium brass double pedestal bases.",
    features: [
      "Beveled edge high-polish composite Italian marble slab",
      "Heavy gauge champagne-gold PVD coated stainless steel double pedestals",
      "Spaciously accommodates 8 to 10 dinner guests",
      "Poly-resin sealed surface preventing all food discolorations"
    ],
    specs: {
      "Dimensions": "96L × 42W × 30H inches",
      "Tabletop Weight": "95 kg"
    }
  },

  // ===================== CHAIRS =====================
  {
    id: "oslo-lounge-chair",
    name: "Oslo Architectural Accent Lounge Chair",
    category: "chairs",
    subcategories: ["lounge-chairs"],
    price: 19500,
    originalPrice: 26000,
    rating: 4.9,
    reviewsCount: 118,
    badge: "Design Icon",
    availability: "In Stock",
    stockCount: 14,
    material: "Solid Teak & Premium Shearling Boucle",
    dimensions: "32 × 30 × 31 inches",
    warranty: "5 Years Warranty",
    primaryImage: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Ivory Boucle", hex: "#EFECE6" },
      { name: "Rust Terracotta", hex: "#A85331" },
      { name: "Mustard Gold", hex: "#CBA135" }
    ],
    sizes: ["Standard Lounge"],
    description: "Geometric wooden joinery meets cloud-soft textured upholstery. With its 105-degree relaxed seating angle, the Oslo chair creates a striking focal point in corners, study dens, or by windows.",
    features: [
      "Sculpted curved solid Teak armrests with smooth satin touch",
      "High-resilience foam wrapped in cozy plush bouclé",
      "Reinforced dowel joints tested for up to 160 kg load",
      "Ergonomic lumbar curvature for prolonged reading comfort"
    ],
    specs: {
      "Seat Height": "16.5 inches",
      "Weight Capacity": "160 kg"
    }
  },
  {
    id: "aeroflex-ergonomic-chair",
    name: "AeroFlex Mesh High-Back Office Chair",
    category: "chairs",
    subcategories: ["office-chairs"],
    price: 16500,
    originalPrice: 22000,
    rating: 4.8,
    reviewsCount: 210,
    badge: "Work From Home Pick",
    availability: "In Stock",
    stockCount: 20,
    material: "Breathable Korean Mesh & Aluminum Alloy Base",
    dimensions: "26 × 26 × 46-52 inches",
    warranty: "5 Years Full Mechanism Warranty",
    primaryImage: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Carbon Black", hex: "#1A1A1A" },
      { name: "Silver Grey", hex: "#9E9E9E" }
    ],
    sizes: ["Universal Fit"],
    description: "Engineered for 12+ hour sitting marathons. Features multi-dimensional self-adjusting lumbar support, 4D armrests, and smooth synchro-tilt mechanism.",
    features: [
      "Dynamic 3D self-adjusting lumbar curve",
      "Breathable high-tensile mesh preventing heat buildup",
      "4D armrests (height, depth, angle, and width adjustable)",
      "Class-4 BIFMA certified explosion-proof gas lift cylinder"
    ],
    specs: {
      "Recline Range": "90° to 135° lockable",
      "Base": "Cast aluminum alloy 5-star with PU silent wheels"
    }
  },
  {
    id: "havana-leather-recliner",
    name: "Havana Motorized Power Recliner",
    category: "chairs",
    subcategories: ["recliners"],
    price: 42000,
    originalPrice: 55000,
    rating: 4.9,
    reviewsCount: 67,
    badge: "Electric Recline",
    availability: "In Stock",
    stockCount: 6,
    material: "Top-Grain Leather & Heavy-Gauge Steel Recline Gear",
    dimensions: "36 × 38 × 41 inches (Reclined: 66 in length)",
    warranty: "7 Years Motor & Frame Warranty",
    primaryImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Dark Saddle Brown", hex: "#3D2415" },
      { name: "Slate Charcoal", hex: "#2C3136" }
    ],
    sizes: ["Single Recliner"],
    description: "Quiet motorized reclining with dual USB-C charging ports integrated into the armrest control panel. Infinite position recline from upright reading to zero-gravity nap posture.",
    features: [
      "Whisper-quiet German Okin motor drive (< 45 dB)",
      "Infinite recline stop angle between 100° and 160°",
      "Integrated fast USB-A and USB-C smartphone charging ports",
      "High density pocket coil core with padded headrest"
    ],
    specs: {
      "Motor Type": "German OKIN Precision Electric Actuator",
      "Weight Capacity": "170 kg"
    }
  },

  // ===================== TABLES =====================
  {
    id: "fluted-marble-coffee-table",
    name: "Siena Fluted Marble Coffee Table Set",
    category: "tables",
    subcategories: ["coffee-tables", "center-tables"],
    price: 24000,
    originalPrice: 31000,
    rating: 4.9,
    reviewsCount: 92,
    badge: "Trending",
    availability: "In Stock",
    stockCount: 9,
    material: "Carrara Marble & Fluted Solid Wood Base",
    dimensions: "Main: 36 dia × 18H in / Nesting: 24 dia × 15H in",
    warranty: "5 Years Warranty",
    primaryImage: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Natural Oak & White Marble", hex: "#D6C7B2" },
      { name: "Walnut & Black Marble", hex: "#3E2B1E" }
    ],
    sizes: ["2-Piece Nesting Set"],
    description: "A pair of nesting coffee tables blending organic fluted wood curves with genuine polished marble tops. Slide them together for compact living or separate when hosting guests.",
    features: [
      "Hand-fluted solid timber drum base",
      "Natural Italian white marble top with rounded bullnose edges",
      "Nesting design saves floor space flexibly",
      "Felt padded base prevents scratching delicate rugs and tiles"
    ],
    specs: {
      "Set Contents": "2 Nesting Tables",
      "Weight": "42 kg combined"
    }
  },
  {
    id: "cambridge-study-table",
    name: "Cambridge Solid Teak Study Desk",
    category: "tables",
    subcategories: ["study-tables", "office-tables"],
    price: 29000,
    originalPrice: 38000,
    rating: 4.8,
    reviewsCount: 84,
    badge: "Solid Teak",
    availability: "In Stock",
    stockCount: 7,
    material: "Solid Teak Wood & Brass Hardware",
    dimensions: "52 × 26 × 30 inches",
    warranty: "10 Years Warranty",
    primaryImage: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Teak Natural", hex: "#A87444" },
      { name: "Dark Walnut", hex: "#422817" }
    ],
    sizes: ["52-inch Desktop"],
    description: "An elegant home office workhorse with two smooth soft-closing drawers, a hidden cable management recess, and tapered legs inspired by mid-century modern architecture.",
    features: [
      "Solid Teak writing surface with beveled edges",
      "Two flush-mount soft-closing document drawers",
      "Integrated cable grommet with wooden flip cover",
      "Spacious legroom for all standard office chairs"
    ],
    specs: {
      "Desktop Thickness": "1.25 inches solid wood",
      "Drawer Depth": "18 inches"
    }
  },
  {
    id: "artisan-side-table",
    name: "Artisan Sculptural C-End Side Table",
    category: "tables",
    subcategories: ["side-tables", "coffee-tables"],
    price: 9500,
    originalPrice: 13000,
    rating: 4.7,
    reviewsCount: 52,
    badge: "Smart Utility",
    availability: "In Stock",
    stockCount: 16,
    material: "Bent Ash Veneer & Matte Black Metal",
    dimensions: "18 × 14 × 24 inches",
    warranty: "3 Years Warranty",
    primaryImage: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Natural Ash", hex: "#CDBFA8" },
      { name: "Smoky Black", hex: "#242424" }
    ],
    sizes: ["Standard C-Shape"],
    description: "Slips seamlessly over sofa cushions or bedsides to hold your laptop, morning espresso, or reading books right within arm's reach.",
    features: [
      "Cantilevered C-frame slides effortlessly over sofa seat cushions",
      "Ultra-stable weighted base preventing accidental tipping",
      "Water-resistant sealed veneer top"
    ],
    specs: {
      "Height Clearance": "23 inches underneath table",
      "Weight Capacity": "30 kg"
    }
  },

  // ===================== WARDROBES =====================
  {
    id: "monarch-4-door-wardrobe",
    name: "Monarch 4-Door Grand Wardrobe with Drawers",
    category: "wardrobes",
    subcategories: ["4-door", "wooden-wardrobes"],
    price: 64000,
    originalPrice: 80000,
    rating: 4.9,
    reviewsCount: 71,
    badge: "Bestseller",
    availability: "In Stock",
    stockCount: 4,
    material: "Solid Core Engineered Wood with Teak Finish",
    dimensions: "72 × 24 × 84 inches (6×7 feet)",
    warranty: "10 Years Structural Warranty",
    primaryImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Walnut & Champagne Gold Trim", hex: "#3B2618" },
      { name: "Natural Teak & Matte Black", hex: "#9E6D38" }
    ],
    sizes: ["4-Door (6×7 ft)", "3-Door (4.5×7 ft)"],
    description: "Grand bedroom storage with 4 full-height panel doors, two lockable private internal drawers, dual coat-hanging sections, and full-length internal vanity mirror.",
    features: [
      "German Hettich soft-close hinges tested for 50,000 cycles",
      "Built-in warm LED sensor lights illuminating when doors open",
      "Two internal security drawers with keyed numeric locks",
      "Moisture-proof high-grade melamine inner lining"
    ],
    specs: {
      "Number of Shelves": "8 Adjustable Shelves",
      "Hanging Rods": "2 Stainless Steel Hanging Rails",
      "Overall Height": "84 inches (7 Feet)"
    }
  },
  {
    id: "berlin-sliding-wardrobe",
    name: "Berlin 2-Door Mirrored Sliding Wardrobe",
    category: "wardrobes",
    subcategories: ["sliding-door", "2-door"],
    price: 52000,
    originalPrice: 65000,
    rating: 4.8,
    reviewsCount: 59,
    badge: "Space Saver",
    availability: "In Stock",
    stockCount: 5,
    material: "High-Density Moisture-Resistant Board & Toughened Mirror",
    dimensions: "60 × 24 × 84 inches (5×7 feet)",
    warranty: "8 Years Mechanism Warranty",
    primaryImage: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Frost White & Full Mirror", hex: "#F5F5F5" },
      { name: "Smoked Grey Ash", hex: "#4C4B4A" }
    ],
    sizes: ["5×7 ft Sliding", "6×7 ft Sliding"],
    description: "Sliding doors require zero swing clearance, making it ideal for streamlined bedrooms. One full door features a distortion-free silver dressing mirror that visually doubles room space.",
    features: [
      "Ultra-quiet heavy-duty overhead sliding roller track system",
      "Full-height shatterproof dressing mirror on right door",
      "Dual soft-stop dampers preventing slamming at both ends",
      "Deep 24-inch interior depth accommodating broad suit hangers"
    ],
    specs: {
      "Door Type": "Dual Sliding Panels with Aluminum Rails",
      "Storage Layout": "Dual Compartment: 1 Hanging + 1 Stacked Shelving"
    }
  },
  {
    id: "heritage-3-door-wardrobe",
    name: "Heritage 3-Door Solid Wood Wardrobe",
    category: "wardrobes",
    subcategories: ["3-door", "wooden-wardrobes"],
    price: 46000,
    originalPrice: 58000,
    rating: 4.7,
    reviewsCount: 43,
    badge: "Solid Timber",
    availability: "In Stock",
    stockCount: 6,
    material: "Solid Sheesham Wood with Brass Pulls",
    dimensions: "54 × 22 × 78 inches",
    warranty: "10 Years Warranty",
    primaryImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Honey Sheesham", hex: "#9E6738" },
      { name: "Dark Walnut", hex: "#3E2616" }
    ],
    sizes: ["3-Door (4.5×6.5 ft)"],
    description: "Traditional Indian artisanal woodwork combined with modern storage ergonomics. Showcases handsome brass handles and natural wood grain textures.",
    features: [
      "Crafted from kiln-seasoned Indian Rosewood (Sheesham)",
      "Brass cast antique pull handles",
      "Removable lower shelves for long traditional garment storage"
    ],
    specs: {
      "Number of Doors": "3 Hinged Doors",
      "Internal Shelves": "6 Partitioned Storage Zones"
    }
  },

  // ===================== OFFICE FURNITURE =====================
  {
    id: "executive-solid-desk",
    name: "Titan Executive Solid Oak Desk",
    category: "office",
    subcategories: ["executive-desks"],
    price: 48000,
    originalPrice: 62000,
    rating: 4.9,
    reviewsCount: 62,
    badge: "Executive",
    availability: "In Stock",
    stockCount: 4,
    material: "Kiln-Dried European Oak & Steel Chassis",
    dimensions: "64 × 32 × 30 inches",
    warranty: "10 Years Warranty",
    primaryImage: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Smoky Natural Oak", hex: "#A8957A" },
      { name: "Ebony Black Oak", hex: "#222120" }
    ],
    sizes: ["64×32 in Desktop"],
    description: "Command respect in your home office or commercial boardroom. Features a chamfered live-edge solid oak top, built-in wireless Qi fast charger, and stealth cable raceway.",
    features: [
      "Substantial 1.5-inch solid oak top with natural organic contours",
      "Integrated 15W wireless smartphone charger embedded in desktop",
      "3 locking soft-close drawers on heavy-duty ball bearing slides",
      "Concealed magnetic modesty panel for wire tidy"
    ],
    specs: {
      "Desktop Surface Area": "14.2 sq. ft.",
      "Weight Capacity": "200 kg"
    }
  },
  {
    id: "alexandria-bookshelf",
    name: "Alexandria 5-Tier Architectural Bookshelf",
    category: "office",
    subcategories: ["bookshelves"],
    price: 22000,
    originalPrice: 28000,
    rating: 4.8,
    reviewsCount: 77,
    badge: "Display Unit",
    availability: "In Stock",
    stockCount: 8,
    material: "Solid Walnut & Matte Powder-Coated Metal",
    dimensions: "36 × 14 × 74 inches",
    warranty: "5 Years Warranty",
    primaryImage: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Walnut & Black Metal", hex: "#4B3621" },
      { name: "Light Oak & White Metal", hex: "#C7B89F" }
    ],
    sizes: ["5 Tier (74 in High)"],
    description: "An open architectural étagère designed to showcase hardcover literature, fine art ceramics, and ambient office plants with visual lightness.",
    features: [
      "Five staggered extra-thick solid hardwood shelves",
      "Heavy gauge structural steel frame with cross-bracing",
      "Wall anchoring anti-tip safety brackets included",
      "Each shelf holds up to 35 kg of heavy reference books"
    ],
    specs: {
      "Number of Shelves": "5 Tiers",
      "Shelf Clearance": "13.5 inches between tiers"
    }
  },

  // ===================== MATTRESS =====================
  {
    id: "ortho-rest-mattress",
    name: "OrthoRest 7-Zone Orthopedic Memory Mattress",
    category: "mattress",
    subcategories: ["orthopedic", "memory-foam"],
    price: 26000,
    originalPrice: 34000,
    rating: 4.9,
    reviewsCount: 184,
    badge: "Doctor Recommended",
    availability: "In Stock",
    stockCount: 18,
    material: "Cooling Gel Memory Foam & High Resilience Ortho Base",
    dimensions: "78 × 72 × 8 inches (King Size)",
    warranty: "10 Years Full Replacement Warranty",
    primaryImage: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Pure White Quilted", hex: "#FFFFFF" }
    ],
    sizes: ["King Size (78×72×8 in)", "Queen Size (78×60×8 in)", "Single (78×36×8 in)"],
    description: "Engineered in collaboration with spine specialists. 7 targeted ergonomic zones provide firmer support beneath the lumbar spine and softer pressure relief for shoulders and hips.",
    features: [
      "7 Ergonomic posture support zones for natural spine alignment",
      "Cooling infused gel memory foam keeps surface 3° cooler",
      "Removable washable organic bamboo antimicrobial cover",
      "Zero motion transfer: sleep soundly when your partner tosses"
    ],
    specs: {
      "Thickness": "8 inches (also available in 10 inches)",
      "Firmness Rating": "Medium Firm (7/10 - Ideal for back pain relief)",
      "Trial Period": "100-Night Risk-Free Sleep Trial"
    }
  },
  {
    id: "cloud-pocket-spring-mattress",
    name: "CloudComfort Luxury Pocket Spring Mattress",
    category: "mattress",
    subcategories: ["pocket-spring", "latex"],
    price: 38000,
    originalPrice: 48000,
    rating: 4.9,
    reviewsCount: 95,
    badge: "Hotel Plush",
    availability: "In Stock",
    stockCount: 8,
    material: "Individually Encased Pocket Springs & Natural Latex",
    dimensions: "78 × 72 × 10 inches (King Size)",
    warranty: "12 Years Warranty",
    primaryImage: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Ivory Jacquard Top", hex: "#FAF8F5" }
    ],
    sizes: ["King Size (78×72×10 in)", "Queen Size (78×60×10 in)"],
    description: "5-star hotel indulgence in your own master suite. Over 1,000 barrel-shaped independent pocket springs cushion every movement with a lush 2-inch organic latex pillowtop.",
    features: [
      "1,100+ individually encased Swedish steel pocket coils",
      "Natural pin-core breathable organic latex pillowtop",
      "Reinforced high-density perimeter edge support guards against roll-off",
      "Quilted Belgian cashmere blend top fabric"
    ],
    specs: {
      "Thickness": "10 inches Deep Plush",
      "Firmness Rating": "Plush Medium (6/10)",
      "Trial": "100-Night Risk-Free Sleep Trial"
    }
  }
];

// Helper to format Indian Rupee currency
function formatCurrency(amount) {
  return "₹" + Number(amount).toLocaleString("en-IN");
}
