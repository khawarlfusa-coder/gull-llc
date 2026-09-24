// GUL LLC - Official Product Catalog (Replicated from RM Ventures)
const PRODUCTS = [
  // --- HOME & LIVING ---
  {
    id: "hl-01",
    title: "Living Room Set – Glass Coffee Table and 2 End Tables with Modern Design Set of 3 (Gold)",
    category: "Home & Living",
    categorySlug: "home-living",
    price: 602.28,
    originalPrice: 633.69,
    rating: 4.9,
    reviewsCount: 42,
    badge: "Best Seller",
    inStock: true,
    sku: "GUL-HL-0101",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986b88?w=800&auto=format&fit=crop&q=80",
    description: "Elevate your living space with this luxury 3-piece table set from GUL LLC. Features heavy-duty tempered glass tops with sleek, hand-welded geometric gold-accented steel frames. The set includes one large centerpiece coffee table and two matching auxiliary end tables.",
    features: [
      "Set of 3: 1 large coffee table + 2 matching end tables",
      "Sturdy 8mm shatter-resistant tempered safety glass",
      "Electrostatically coated gold rust-proof metal framing",
      "Non-slip scratch protection floor glides included",
      "Backed by GUL LLC 1-year limited commercial warranty"
    ],
    variants: [
      { name: "Finish", options: ["Luxe Gold", "Brushed Silver", "Matte Obsidian Black"] }
    ]
  },
  {
    id: "hl-02",
    title: "Large Wall Mural for Living Room Bedroom",
    category: "Home & Living",
    categorySlug: "home-living",
    price: 320.79,
    originalPrice: 335.79,
    rating: 4.8,
    reviewsCount: 31,
    badge: "Save $15.00",
    inStock: true,
    sku: "GUL-HL-0102",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80",
    description: "Transform plain walls into an art gallery with our oversized architectural canvas wall mural. Printed with eco-friendly UV-resistant archival inks on heavy non-woven textured canvas.",
    features: [
      "Ultra-high definition 300 DPI fine art printing",
      "Peel-and-stick premium self-adhesive backing or paste application",
      "Moisture-proof, fade-resistant, and easily wipeable",
      "Dimensions: 144\" W x 100\" H (custom panel alignment)"
    ],
    variants: [
      { name: "Dimension", options: ["120\" x 80\"", "144\" x 100\"", "168\" x 115\""] }
    ]
  },
  {
    id: "hl-03",
    title: "3 Seater Sofa with Ottoman Footstool Sofa Set, L Shape Corner Convertible Chaise Couch",
    category: "Home & Living",
    categorySlug: "home-living",
    price: 495.66,
    originalPrice: 510.66,
    rating: 4.9,
    reviewsCount: 58,
    badge: "Popular",
    inStock: true,
    sku: "GUL-HL-0103",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80",
    description: "Engineered for maximum versatility and ergonomic relaxation. This modular L-shaped sectional sofa features high-density rebound memory foam cushions, stain-resistant breathable linen upholstery, and a reversible ottoman that configures to either left or right corners.",
    features: [
      "Modular reversible chaise ottoman configuration",
      "High-resilience foam core with pocket spring support",
      "Solid kiln-dried hardwood interior frame (tested up to 800 lbs)",
      "Removable and washable cushion covers",
      "Fast 15-minute tool-free assembly"
    ],
    variants: [
      { name: "Color", options: ["Slate Heather Gray", "Warm Cream Beige", "Midnight Charcoal"] }
    ]
  },
  {
    id: "hl-04",
    title: "Mid-Century Sideboard Cabinet with Adjustable Shelves, Accent Storage Credenza",
    category: "Home & Living",
    categorySlug: "home-living",
    price: 806.52,
    originalPrice: 821.52,
    rating: 4.9,
    reviewsCount: 27,
    badge: "Save $15.00",
    inStock: true,
    sku: "GUL-HL-0104",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&auto=format&fit=crop&q=80",
    description: "Classic mid-century modern credenza sideboard with clean lines and tapered solid wood legs. Ideal for living room media consoles, dining room buffets, or entryway organization.",
    features: [
      "Sustainably sourced premium walnut veneer and solid pine legs",
      "Soft-close concealed European cabinet hinges",
      "Three interior adjustable shelf heights with cable management pass-through",
      "Weight capacity: 220 lbs top surface"
    ],
    variants: [
      { name: "Wood Finish", options: ["Natural American Walnut", "Light Natural Oak", "Espresso Dark"] }
    ]
  },
  {
    id: "hl-05",
    title: "Modern Genuine Leather Sofa Living Room By MANBAS – Italian Couch with Bluetooth Speaker & USB",
    category: "Home & Living",
    categorySlug: "home-living",
    price: 3057.45,
    originalPrice: 5097.45,
    rating: 5.0,
    reviewsCount: 19,
    badge: "Luxury Edition",
    inStock: true,
    sku: "GUL-HL-0105",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&auto=format&fit=crop&q=80",
    description: "Experience the pinnacle of smart home luxury. Handcrafted from genuine top-grain Italian leather, this luxury couch features built-in dual Bluetooth surround sound speakers, integrated USB/Type-C fast charging stations, and multi-angle electric adjustable headrests.",
    features: [
      "100% Top-Grain Italian imported bovine leather",
      "Integrated 40W Bluetooth acoustic sound system with bass sub",
      "Dual USB-A and USB-PD Type-C charging docks built into armrests",
      "Ergonomic multi-stage ratcheting headrest recline system",
      "White Glove delivery and assembly available nationwide"
    ],
    variants: [
      { name: "Leather Shade", options: ["Italian Cognac Tan", "Cloud Pearl White", "Anthracite Gray"] }
    ]
  },
  {
    id: "hl-06",
    title: "Coffee Table Set of 2, Faux Marble Side Table Round Tea Table Faux Travertine Textured",
    category: "Home & Living",
    categorySlug: "home-living",
    price: 1600.65,
    originalPrice: 1615.65,
    rating: 4.8,
    reviewsCount: 22,
    badge: "Trending",
    inStock: true,
    sku: "GUL-HL-0106",
    image: "https://images.unsplash.com/photo-1533779283484-84e1b7344933?w=800&auto=format&fit=crop&q=80",
    description: "Nesting 2-piece round coffee table set showcasing organic travertine veining and smooth waterproof surfaces. Designed to slide compactly together or separate as independent cocktail and accent tables.",
    features: [
      "Hand-polished waterproof sintered stone faux travertine top",
      "Fluted cylindrical architectural pedestal bases",
      "Scratch, stain, and heat-resistant up to 500°F",
      "Diameters: Large (31.5\"), Medium (23.6\")"
    ],
    variants: [
      { name: "Style", options: ["Faux Travertine Ivory", "Carrara White Marble", "Nero Marquina Black"] }
    ]
  },
  {
    id: "hl-07",
    title: "Solid Wood Coffee Table Set for Living Room, Coffee Table & 2 End Side Table 3-Piece Set",
    category: "Home & Living",
    categorySlug: "home-living",
    price: 1513.08,
    originalPrice: 1699.00,
    rating: 4.9,
    reviewsCount: 35,
    badge: "Authentic Wood",
    inStock: true,
    sku: "GUL-HL-0107",
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800&auto=format&fit=crop&q=80",
    description: "Handcrafted 100% solid rubberwood and oak 3-piece living room table suite featuring lower slatted open storage decks for magazines, baskets, and remotes.",
    features: [
      "Triple set: 1 cocktail table (48\"x24\") + 2 end tables (22\"x22\")",
      "Non-toxic polyurethane satin finish",
      "Mortise and tenon joinery for generational durability"
    ],
    variants: [
      { name: "Wood Stain", options: ["Warm Rustic Walnut", "Honey Oak", "Smoky Charcoal"] }
    ]
  },
  {
    id: "hl-08",
    title: "47.2″ Mirrored Desk Silver Console Table Mirror Sofa Table with Crystal Inlay Front",
    category: "Home & Living",
    categorySlug: "home-living",
    price: 352.56,
    originalPrice: 454.50,
    rating: 4.7,
    reviewsCount: 18,
    badge: "Glam Collection",
    inStock: true,
    sku: "GUL-HL-0108",
    image: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?w=800&auto=format&fit=crop&q=80",
    description: "Glamorous mirrored console table designed with beveled silver glass panels and sparkling crushed crystal inlay facade. Perfect for foyers, living room sofa backs, or luxury bedroom vanity setups.",
    features: [
      "Precision-beveled high-clarity silver mirrors",
      "Two deep storage drawers with faux-diamond crystal pulls",
      "Sturdy engineered wood inner frame with heavy steel legs"
    ],
    variants: [
      { name: "Finish", options: ["Silver Mirror with Clear Crystal", "Smoked Grey Mirror with Jet Inlay"] }
    ]
  },
  {
    id: "hl-09",
    title: "Lightweight Concrete Accent Table, Modern Geometry Side Table for Indoor and Outdoor",
    category: "Home & Living",
    categorySlug: "home-living",
    price: 137.61,
    originalPrice: 147.48,
    rating: 4.8,
    reviewsCount: 14,
    badge: "Indoor/Outdoor",
    inStock: true,
    sku: "GUL-HL-0109",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80",
    description: "Sculptural geometric facet stool and accent table made from lightweight fiber-reinforced composite concrete. Weatherproof for patios, poolside, or modern minimalist living spaces.",
    features: [
      "Fiber-reinforced concrete composite (crack-proof & lightweight)",
      "UV-sealed and moisture repellant finish",
      "Can function as drink table, plant stand, or supplemental seating"
    ],
    variants: [
      { name: "Tone", options: ["Industrial Grey Concrete", "Chalk Matte White", "Terracotta Sand"] }
    ]
  },
  {
    id: "hl-10",
    title: "JHK Living Room Cabinet Layers Set of 2 Fabric Drawers Beside Nightstand Table Closet",
    category: "Home & Living",
    categorySlug: "home-living",
    price: 62.22,
    originalPrice: 151.62,
    rating: 4.6,
    reviewsCount: 44,
    badge: "Hot Deal",
    inStock: true,
    sku: "GUL-HL-0110",
    image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800&auto=format&fit=crop&q=80",
    description: "Compact dual-layer storage nightstand dresser with sturdy MDF wood top, durable powder-coated steel side supports, and breathable non-woven fabric pullout drawers.",
    features: [
      "Pack of 2 matching storage cabinets",
      "Easy-pull wooden handles with reinforced drawer bases",
      "Adjustable feet leveling glides for uneven carpets or hardwoods"
    ],
    variants: [
      { name: "Colorway", options: ["Rustic Brown / Black", "Charcoal Grey / White"] }
    ]
  },

  // --- HOME DECOR ---
  {
    id: "hd-01",
    title: "1 Piece Beachfront Bohemian Kitchen Carpet Door Mat for Kitchen, Living Room or Entrance",
    category: "Home Decor",
    categorySlug: "home-decor",
    price: 4.96,
    originalPrice: 9.99,
    rating: 4.7,
    reviewsCount: 67,
    badge: "Super Deal",
    inStock: true,
    sku: "GUL-HD-0201",
    image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&auto=format&fit=crop&q=80",
    description: "Brighten your hallway, kitchen sink, or front door with this vibrant bohemian coastal runner mat. Microfiber sponge layer cushions tired feet during cooking or dishwashing.",
    features: [
      "Anti-slip TPR rubber backing prevents sliding",
      "Ultra-absorbent high-density memory foam core",
      "Machine washable and color-fast printed surface",
      "Dimensions: 17\" x 47\""
    ],
    variants: [
      { name: "Size", options: ["17\" x 29\"", "17\" x 47\"", "20\" x 59\""] }
    ]
  },
  {
    id: "hd-02",
    title: "1 Piece Wave Beach Printed Carpet Summer Spring Bathroom Entrance Door Mat",
    category: "Home Decor",
    categorySlug: "home-decor",
    price: 4.96,
    originalPrice: 9.99,
    rating: 4.6,
    reviewsCount: 52,
    badge: "Clearance",
    inStock: true,
    sku: "GUL-HD-0202",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&auto=format&fit=crop&q=80",
    description: "Capture the serene aesthetic of turquoise ocean waves and pristine sand. Soft sponge memory layer with quick-drying surface perfect for bathrooms, showers, and entryway zones.",
    features: [
      "Fast moisture absorption and rapid evaporating fiber",
      "Anti-skid grip bottom safe for tile, marble, and hardwood",
      "Non-shedding edge binding"
    ],
    variants: [
      { name: "Design", options: ["Ocean Blue Wave", "Golden Sandy Shore", "Coastal Seashell"] }
    ]
  },
  {
    id: "hd-03",
    title: "Green Leaves Tablecloth Rectangular Dining Room Decoration Placemat 190cm X 85cm",
    category: "Home Decor",
    categorySlug: "home-decor",
    price: 31.66,
    originalPrice: 89.29,
    rating: 4.9,
    reviewsCount: 38,
    badge: "Sale -64%",
    inStock: true,
    sku: "GUL-HD-0203",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop&q=80",
    description: "Botanical lush monstera and palm foliage dining tablecloth crafted from heavyweight linen-cotton blend. Stain-resistant coating keeps spills from absorbing immediately.",
    features: [
      "Stain-resistant and spill-repellent treatment",
      "Tailored draped edges with hemmed border",
      "Fits standard 6-8 person dining tables (190cm x 85cm)"
    ],
    variants: [
      { name: "Pattern", options: ["Tropical Monstera Green", "Eucalyptus Sage", "Autumn Fern"] }
    ]
  },
  {
    id: "hd-04",
    title: "100pcs Simulation Mini Fake Fruit Strawberries Blueberry Cherry Caviar Mulberry Tomato Props",
    category: "Home Decor",
    categorySlug: "home-decor",
    price: 23.32,
    originalPrice: 31.18,
    rating: 4.8,
    reviewsCount: 29,
    badge: "Decor Prop",
    inStock: true,
    sku: "GUL-HD-0204",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&auto=format&fit=crop&q=80",
    description: "Ultra-realistic miniature faux fruit collection for kitchen glass jars, dessert displays, photography styling props, and seasonal centerpiece bowls.",
    features: [
      "100 pieces high-detail assorted mini simulated fruits",
      "Non-toxic environmental resin and eco-friendly paint",
      "Realistic sheen, seeds, and stem details"
    ],
    variants: [
      { name: "Mix Type", options: ["Berry & Cherry Mix", "Citrus & Strawberry", "All Strawberries 100pcs"] }
    ]
  },
  {
    id: "hd-05",
    title: "Artificial Flower Plastic Flower Full Sky Star Wedding Handheld Flower Outdoor Home Shooting",
    category: "Home Decor",
    categorySlug: "home-decor",
    price: 8.98,
    originalPrice: 10.24,
    rating: 4.9,
    reviewsCount: 41,
    badge: "Bestseller",
    inStock: true,
    sku: "GUL-HD-0205",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80",
    description: "Delicate baby's breath (Gypsophila) faux stems with natural frosted texture. Lifelike flexible branches easily bend into vases, wedding bouquets, or mantel garlands.",
    features: [
      "Bundle of 6 full branching gypsophila stems",
      "UV-protected silk-touch polyurethane blooms",
      "Fade-resistant colors for indoor and porch arrangements"
    ],
    variants: [
      { name: "Color", options: ["Pure White", "Blush Pink", "Soft Lavender", "Champagne Gold"] }
    ]
  },
  {
    id: "hd-06",
    title: "5/10/15/20PCS Artificial Rose Silk Fake Flower Simulation Bouquet Heads Home Living Room",
    category: "Home Decor",
    categorySlug: "home-decor",
    price: 76.47,
    originalPrice: 95.00,
    rating: 4.9,
    reviewsCount: 23,
    badge: "Premium Silk",
    inStock: true,
    sku: "GUL-HD-0206",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&auto=format&fit=crop&q=80",
    description: "Handcrafted English garden silk rose bouquet heads with velvety gradient petals and realistic curled blooms. Unrivaled realism for luxury vase arrangements.",
    features: [
      "Includes 20 premium oversized 3.8\" rose heads",
      "High-grade raw silk fabric with realistic dewdrop effect",
      "Stem wires easily trim to any vase size"
    ],
    variants: [
      { name: "Quantity", options: ["10 PCS Bouquet", "20 PCS Luxury Set (+ $35)"] }
    ]
  },
  {
    id: "hd-07",
    title: "Customized Size Artificial White Rose Cherry Blossom Large Flower Ball Table Centerpiece",
    category: "Home Decor",
    categorySlug: "home-decor",
    price: 110.97,
    originalPrice: 544.11,
    rating: 5.0,
    reviewsCount: 16,
    badge: "Special Event",
    inStock: true,
    sku: "GUL-HD-0207",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800&auto=format&fit=crop&q=80",
    description: "Opulent spherical flower ball arrangement featuring creamy white roses, blushing cherry blossoms, and hydrangeas mounted on a dense floral foam base.",
    features: [
      "20\" diameter dense luxury floral sphere",
      "Pre-assembled on stable pedestal-ready frame",
      "Ideal for weddings, dining room statement centerpieces, and banquets"
    ],
    variants: [
      { name: "Diameter", options: ["16 Inch Tabletop", "20 Inch Statement", "24 Inch Grand (+ $45)"] }
    ]
  },

  // --- LIGHTING ---
  {
    id: "lt-01",
    title: "RGB Corner Floor Lamp Bedroom LED Dimmable Night Lamp Floor Light Living Room Decor",
    category: "Lighting",
    categorySlug: "lighting",
    price: 140.85,
    originalPrice: 155.85,
    rating: 4.9,
    reviewsCount: 63,
    badge: "Save $15.00",
    inStock: true,
    sku: "GUL-LT-0301",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80",
    description: "Sleek minimalist Nordic corner floor lamp that tucks seamlessly into 90-degree room corners. Offers 16 million colors, dynamic scene effects, and smart remote control.",
    features: [
      "16 Million RGB colors + 3000K-6500K Tunable White",
      "RF wireless remote and mobile app control with music sync",
      "Durable aerospace aluminum alloy body with weighted anti-tipping base",
      "Height: 56\" with 350+ multi-color chase animations",
      "UL-certified safe low-voltage power adapter included"
    ],
    variants: [
      { name: "Frame Color", options: ["Matte Black", "Brushed Silver", "Alpine White"] }
    ]
  },
  {
    id: "lt-02",
    title: "Modern Home Decor LED Lights Pendant Light Lamps for Living Room Chandeliers for Bedroom",
    category: "Lighting",
    categorySlug: "lighting",
    price: 238.86,
    originalPrice: 2171.40,
    rating: 4.9,
    reviewsCount: 33,
    badge: "Mega Deal -89%",
    inStock: true,
    sku: "GUL-LT-0302",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&auto=format&fit=crop&q=80",
    description: "Contemporary undulating ring chandelier featuring built-in energy-saving LED strips housed within frosted acrylic diffusers and brushed gold metallic frame.",
    features: [
      "3-tier interlocking geometric floating ring design",
      "Stepless dimmable 3000K warm to 6000K daylight with remote",
      "Adjustable cable suspension up to 59\" ceiling drop",
      "Energy efficient 65W LED output (equal to 400W halogen)"
    ],
    variants: [
      { name: "Finish", options: ["French Gold Ring", "Matte Black Ring", "Brushed Nickel"] }
    ]
  },
  {
    id: "lt-03",
    title: "Ultra-thin Round LED Ceiling Lamp Bedroom Light Lustre LED Lights For Room Ceiling Light Fixture",
    category: "Lighting",
    categorySlug: "lighting",
    price: 18.96,
    originalPrice: 30.79,
    rating: 4.7,
    reviewsCount: 55,
    badge: "Energy Star",
    inStock: true,
    sku: "GUL-LT-0303",
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&auto=format&fit=crop&q=80",
    description: "Ultra-slim 0.9\" profile flush mount ceiling lamp with glare-free edge-lit technology. Insect-proof and dust-tight sealed construction ideal for kitchens, bedrooms, and bathrooms.",
    features: [
      "Ultra-slim 0.9-inch flush ceiling profile",
      "High CRI 90+ true color rendering LEDs",
      "IP54 moisture-resistant rated for humid spaces",
      "Lifespan: 50,000 continuous hours (no bulbs to change)"
    ],
    variants: [
      { name: "Wattage", options: ["24W (12-inch)", "36W (16-inch + $8)", "48W (20-inch + $14)"] }
    ]
  },
  {
    id: "lt-04",
    title: "Modern Long Strip Ceiling Light Surface Mounted Minimalist Aisle Lamp Living Room Bedroom",
    category: "Lighting",
    categorySlug: "lighting",
    price: 47.76,
    originalPrice: 434.31,
    rating: 4.8,
    reviewsCount: 28,
    badge: "Sale",
    inStock: true,
    sku: "GUL-LT-0304",
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&auto=format&fit=crop&q=80",
    description: "Linear architectural surface-mounted strip light designed to elongate corridors, walk-in closets, kitchen galleys, and modern living room accent zones.",
    features: [
      "Extruded architectural grade aluminum enclosure",
      "Even, shadowless 120-degree light distribution",
      "Easy mounting bracket compatible with standard US junction boxes"
    ],
    variants: [
      { name: "Length", options: ["39\" (100cm)", "47\" (120cm)", "59\" (150cm)"] }
    ]
  },
  {
    id: "lt-05",
    title: "Modern Dining Table Pendant Lights Minimalist Dining Room Chandelier Linear Wavy Lamp",
    category: "Lighting",
    categorySlug: "lighting",
    price: 443.41,
    originalPrice: 529.90,
    rating: 5.0,
    reviewsCount: 17,
    badge: "Architectural",
    inStock: true,
    sku: "GUL-LT-0305",
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&auto=format&fit=crop&q=80",
    description: "Sculptural wave pendant chandelier that suspends effortlessly over dining tables or kitchen islands. Smooth wave silhouettes deliver soft glare-free downward task lighting.",
    features: [
      "Custom continuous wave ribbon design with integrated LEDs",
      "Includes smart dimmer wall-switch compatibility",
      "Adjustable aircraft suspension cables up to 6 feet"
    ],
    variants: [
      { name: "Finish", options: ["Satin Anodized Black", "Champagne Gold", "Natural Birch Wood Tone"] }
    ]
  },
  {
    id: "lt-06",
    title: "Nordic Moon Standing Lamp Next To The Sofa in The Living Room Modern Minimalist LED Floor Lamp",
    category: "Lighting",
    categorySlug: "lighting",
    price: 162.75,
    originalPrice: 551.85,
    rating: 4.9,
    reviewsCount: 26,
    badge: "Viral Hit",
    inStock: true,
    sku: "GUL-LT-0306",
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&auto=format&fit=crop&q=80",
    description: "Celestial crescent moon floor lamp featuring realistic lunar surface craters and warm backlighting. Creates an ambient sanctuary right next to your reading armchair.",
    features: [
      "3D printed high-fidelity textured moon orb head",
      "Foot pedal step switch + wireless remote",
      "Heavy solid marble foundation block prevents toppling"
    ],
    variants: [
      { name: "Diameter", options: ["12\" Lunar Orb", "16\" Grand Orb"] }
    ]
  },

  // --- ORGANIZERS ---
  {
    id: "og-01",
    title: "20pcs Shoe Box Set Foldable Storage Plastic Clear Home Organizer Rack Stack",
    category: "Organizers",
    categorySlug: "organizers",
    price: 81.75,
    originalPrice: 117.99,
    rating: 4.8,
    reviewsCount: 74,
    badge: "Best Value",
    inStock: true,
    sku: "GUL-OG-0401",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80",
    description: "Stackable clear front-drop shoe boxes engineered to protect sneaker collections and high heels from dust while keeping closets neat and accessible.",
    features: [
      "Complete 20-box stackable interlocking system",
      "High-clarity magnetic drop-front access doors",
      "Ventilation rear holes promote air circulation and inhibit odors",
      "Accommodates up to US Men's size 14 shoes"
    ],
    variants: [
      { name: "Transparency", options: ["Crystal Clear Front & Sides", "Smoked Black Clear Drop"] }
    ]
  },
  {
    id: "og-02",
    title: "White Desktop Cosmetic Storage Box with 4 Drawer Units Container Case Small Organizer",
    category: "Organizers",
    categorySlug: "organizers",
    price: 19.99,
    originalPrice: 24.99,
    rating: 4.7,
    reviewsCount: 46,
    badge: "Top Seller",
    inStock: true,
    sku: "GUL-OG-0402",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80",
    description: "Multi-tier beauty vanity cosmetic organizer featuring smooth sliding drawers, partitioned lipstick slots, skincare bottle compartments, and jewelry sections.",
    features: [
      "4 tiered smooth pull drawers with electroplated handles",
      "Upper multi-grid divider fits tall serum and toner bottles",
      "Heavy durable ABS plastic with rounded safe corners"
    ],
    variants: [
      { name: "Color", options: ["Clean Polar White", "Dusty Rose Pink", "Sage Mint"] }
    ]
  },
  {
    id: "og-03",
    title: "Plastic Pantry Organization and Storage Bins with Dividers & Lids – Perfect Kitchen Storage",
    category: "Organizers",
    categorySlug: "organizers",
    price: 32.85,
    originalPrice: 73.17,
    rating: 4.9,
    reviewsCount: 61,
    badge: "55% Off",
    inStock: true,
    sku: "GUL-OG-0403",
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80",
    description: "Heavy-gauge BPA-free clear acrylic food storage organizer bins with removable multi-compartment dividers and stacking lock lids.",
    features: [
      "Set of 4 modular pantry organizer containers",
      "100% BPA-Free food grade shatter-proof acrylic",
      "Built-in ergonomic carrying handles and airtight gasket seal"
    ],
    variants: [
      { name: "Set", options: ["4-Pack Standard", "6-Pack Family Combo (+ $18)"] }
    ]
  },

  // --- HOME FRAGRANCE ---
  {
    id: "fr-01",
    title: "1pc Ceramic Vintage Dragon Backflow Incense Burner, Home Decor, Tabletop Aromatherapy Gift",
    category: "Home Fragrance",
    categorySlug: "home-fragrance",
    price: 21.64,
    originalPrice: 29.99,
    rating: 4.9,
    reviewsCount: 88,
    badge: "Top Rated",
    inStock: true,
    sku: "GUL-FR-0501",
    image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80",
    description: "Intricately hand-glazed ceramic backflow censer depicting a mystical Eastern dragon. Smoke cascades downward like a tranquil waterfall into a soothing crystal orb pond.",
    features: [
      "Handcrafted high-fired ceramic with metallic glaze",
      "Hypnotic cascading waterfall smoke effect with backflow cones",
      "Includes 20 starter aromatherapy herbal incense cones",
      "Helps purify air, relieve stress, and improve meditation"
    ],
    variants: [
      { name: "Glaze Tone", options: ["Ancient Bronze Dragon", "Celadon Emerald Green", "Obsidian Black"] }
    ]
  },
  {
    id: "fr-02",
    title: "Leaf Incense Burner Holder Ash Catcher Incense Sticks Support Rods Holder for Meditation",
    category: "Home Fragrance",
    categorySlug: "home-fragrance",
    price: 11.83,
    originalPrice: 12.13,
    rating: 4.8,
    reviewsCount: 39,
    badge: "Zen Living",
    inStock: true,
    sku: "GUL-FR-0502",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80",
    description: "Sleek nature-inspired cast zinc alloy leaf incense dish with small snail incense stick holder. Extra long 9.5-inch curved leaf captures 100% of falling ashes cleanly.",
    features: [
      "Cast alloy rust-proof leaf ash catcher with removable snail holder",
      "9.5-inch extended tray catches all falling ash without mess",
      "Sized for Japanese, Indian, and Tibetan incense sticks"
    ],
    variants: [
      { name: "Metal Tone", options: ["Antique Red Bronze", "Brushed Brass", "Silver Patina"] }
    ]
  },
  {
    id: "fr-03",
    title: "Multi Functional 300ml Humidifier Diffuser Combo Relieve Dry Air for Better Sleep & Work",
    category: "Home Fragrance",
    categorySlug: "home-fragrance",
    price: 24.97,
    originalPrice: 29.97,
    rating: 4.9,
    reviewsCount: 94,
    badge: "Popular",
    inStock: true,
    sku: "GUL-FR-0503",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80",
    description: "Ultrasonic whisper-quiet cool mist humidifier and essential oil aroma diffuser with soothing 7-color LED ambient mood light ring and auto-shutoff safety sensor.",
    features: [
      "300ml reservoir delivers up to 10 hours continuous micro-mist",
      "Whisper-quiet ultrasonic operation below 22dB (sleep safe)",
      "Automatic waterless shut-off sensor protects device",
      "BPA-free medical grade tank safe for babies and pets"
    ],
    variants: [
      { name: "Exterior Grain", options: ["Light Natural Oak", "Dark Walnut Grain", "Pure Minimalist White"] }
    ]
  },
  {
    id: "fr-04",
    title: "Decoration for Home Line Incense Burner Classical Stand for Incense Ornament",
    category: "Home Fragrance",
    categorySlug: "home-fragrance",
    price: 83.52,
    originalPrice: 99.00,
    rating: 4.9,
    reviewsCount: 21,
    badge: "Handmade",
    inStock: true,
    sku: "GUL-FR-0504",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&auto=format&fit=crop&q=80",
    description: "Heirloom grade horizontal sandalwood incense chamber handcrafted with intricate hollow-carved lattice lid and fireproof felt lining for safe horizontal burning.",
    features: [
      "Authentic solid ebony / rosewood timber",
      "Magnetic closure with internal fire-retardant safety pad",
      "Allows continuous burning of sticks up to 8.5 inches"
    ],
    variants: [
      { name: "Wood Carving", options: ["Dragon Cloud Lattice", "Zen Lotus Blossom", "Minimalist Geometric"] }
    ]
  },
  {
    id: "fr-05",
    title: "10/20/30pcs Empty Sachets Bag Flower Printing Lavender Fragrance Sachet Bags",
    category: "Home Fragrance",
    categorySlug: "home-fragrance",
    price: 9.94,
    originalPrice: 17.23,
    rating: 4.7,
    reviewsCount: 37,
    badge: "Bulk Value",
    inStock: true,
    sku: "GUL-FR-0505",
    image: "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?w=800&auto=format&fit=crop&q=80",
    description: "Breathable natural organza and cotton print drawstring pouches ideal for filling with dried French lavender buds, cedar chips, cloves, or potpourri.",
    features: [
      "Pack of 20 vintage floral print drawstring pouches",
      "Double ribbon tie closure locks in petals",
      "Freshens closets, shoe racks, luggage, and drawers"
    ],
    variants: [
      { name: "Pack Size", options: ["10 PCS", "20 PCS Set", "30 PCS Large Pack (+ $5)"] }
    ]
  },
  {
    id: "fr-06",
    title: "DIY House Fragrance Essential Oil 500ml Hilton Hotel Long-lasting Aromatherapy Deodorant",
    category: "Home Fragrance",
    categorySlug: "home-fragrance",
    price: 23.62,
    originalPrice: 32.41,
    rating: 4.9,
    reviewsCount: 65,
    badge: "Hotel Collection",
    inStock: true,
    sku: "GUL-FR-0506",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&auto=format&fit=crop&q=80",
    description: "Bring the signature scent of 5-star luxury resorts into your residence. Large 500ml diffuser refill bottle formulated with natural plant extracts and top hotel fragrance notes.",
    features: [
      "Huge 500ml (16.9 oz) value refill bottle",
      "Formulated with white tea, bergamot, cedarwood, and lily notes",
      "Compatible with ultrasonic diffusers, reed diffusers, and humidifier water"
    ],
    variants: [
      { name: "Signature Scent", options: ["5-Star White Tea & Thyme", "Shangri-La Floral Harmony", "Westin White Tea"] }
    ]
  }
];

// Helper functions for catalog queries
const CATEGORIES = [
  { name: "All Products", slug: "all", count: PRODUCTS.length },
  { name: "Home & Living", slug: "home-living", count: PRODUCTS.filter(p => p.categorySlug === 'home-living').length },
  { name: "Home Decor", slug: "home-decor", count: PRODUCTS.filter(p => p.categorySlug === 'home-decor').length },
  { name: "Lighting", slug: "lighting", count: PRODUCTS.filter(p => p.categorySlug === 'lighting').length },
  { name: "Organizers", slug: "organizers", count: PRODUCTS.filter(p => p.categorySlug === 'organizers').length },
  { name: "Home Fragrance", slug: "home-fragrance", count: PRODUCTS.filter(p => p.categorySlug === 'home-fragrance').length }
];

if (typeof module !== 'undefined') {
  module.exports = { PRODUCTS, CATEGORIES };
}
