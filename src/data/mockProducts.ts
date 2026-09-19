import type { Product } from '../types';

// Exchange reference: ~1 INR = 0.19 MVR | 1 MVR ≈ 5.4 INR
// Prices are per standard trade unit (kg, bag, dozen, bunch)

export const MOCK_PRODUCTS: Product[] = [
  // ── VEGETABLES ──────────────────────────────────────────────────────────────
  {
    id: 'prod-1',
    sku: 'KD-VEG-001',
    title: 'Small Onion (Chinna Vengayam) — 5 kg Bag',
    category: 'Vegetables',
    inrCost: 150,
    kadalodiPriceInr: 320,
    mvrPrice: 62,
    weightKg: 5,
    rating: 4.8,
    reviewsCount: 214,
    image: 'https://images.unsplash.com/photo-1582515073490-39981397c445?w=600&auto=format&fit=crop&q=80',
    description:
      'Premium small onions (shallots) sourced directly from Perambalur, Tamil Nadu — the shallot capital of India. Sweet, pungent, and perfect for Maldivian curries, rihaakuru sauces, and daily cooking. Sorted, cleaned, and packed in breathable mesh bags for maximum freshness during sea transit.',
    brand: 'Kadalodi Fresh — Tamil Nadu',
    inStock: true,
    originCity: 'Perambalur, Tamil Nadu',
    shippingEstimateDays: '4–7 days',
    features: [
      'Farm-direct from Perambalur shallot farms',
      'Hand-sorted for size uniformity',
      'Mesh-packed for air circulation & freshness',
      'No artificial treatment or dyes',
      'Shelf life: 3–4 weeks post-delivery'
    ]
  },
  {
    id: 'prod-2',
    sku: 'KD-VEG-002',
    title: 'Potato (Aloo) — 10 kg Bag',
    category: 'Vegetables',
    inrCost: 280,
    kadalodiPriceInr: 550,
    mvrPrice: 108,
    weightKg: 10,
    rating: 4.6,
    reviewsCount: 178,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
    description:
      'Fresh market-grade potatoes from Ooty & Nilgiris highlands, packed at peak condition for export. A daily-use staple in Maldivian households — ideal for mas huni, fried dishes, and curries. Cool-stored pre-shipment for extended freshness.',
    brand: 'Kadalodi Fresh — Tamil Nadu',
    inStock: true,
    originCity: 'Ooty (Nilgiris), Tamil Nadu',
    shippingEstimateDays: '4–7 days',
    features: [
      'Highland-grown for lower moisture & longer shelf life',
      'Export-grade size sorting (45–65mm)',
      'Jute-bag or HDPE mesh packing',
      'No sprouting agents used',
      'Shelf life: 3–5 weeks post-delivery'
    ]
  },
  {
    id: 'prod-3',
    sku: 'KD-VEG-003',
    title: 'Tomato (Thakkali) — 5 kg Box',
    category: 'Vegetables',
    inrCost: 200,
    kadalodiPriceInr: 420,
    mvrPrice: 80,
    weightKg: 5,
    rating: 4.5,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1558818498-28c1e002b655?w=600&auto=format&fit=crop&q=80',
    description:
      'Firm, ripe hybrid tomatoes from the Madurai & Dindigul growing belt — harvested at 80% maturity for optimal shelf life during sea shipment. Deep red colour, balanced acidity, and thick flesh make these perfect for Maldivian fish curries, salads, and sambols.',
    brand: 'Kadalodi Fresh — Tamil Nadu',
    inStock: true,
    originCity: 'Madurai, Tamil Nadu',
    shippingEstimateDays: '4–7 days',
    features: [
      'Hybrid variety for firmness during transit',
      'Harvested at 80% maturity — ripens en route',
      'Individual layered corrugated box packing',
      'Cold-chain handled pre-loading',
      'Shelf life: 8–12 days post-delivery'
    ]
  },
  {
    id: 'prod-4',
    sku: 'KD-VEG-004',
    title: 'Green Chilli (Pacchai Milagai) — 2 kg Pack',
    category: 'Vegetables',
    inrCost: 160,
    kadalodiPriceInr: 340,
    mvrPrice: 65,
    weightKg: 2,
    rating: 4.7,
    reviewsCount: 196,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&auto=format&fit=crop&q=80',
    description:
      'Fiery, fragrant green chillies from Guntur-variety farms in Tamil Nadu — a backbone ingredient in Maldivian cuisine. Used in mas riha (tuna curry), sambol pastes, and pickles. Bright green, medium heat (SHU 30,000–50,000), packed in ventilated punnets to prevent sweating.',
    brand: 'Kadalodi Fresh — Tamil Nadu',
    inStock: true,
    originCity: 'Salem, Tamil Nadu',
    shippingEstimateDays: '4–7 days',
    features: [
      'Guntur-variety medium-hot green chilli',
      'Handpicked at peak green maturity',
      'Ventilated punnet & carton packing',
      'No wax coating or preservatives',
      'Shelf life: 10–14 days post-delivery'
    ]
  },
  {
    id: 'prod-5',
    sku: 'KD-VEG-005',
    title: 'Cucumber (Vellarikai) — 5 kg Box',
    category: 'Vegetables',
    inrCost: 130,
    kadalodiPriceInr: 280,
    mvrPrice: 55,
    weightKg: 5,
    rating: 4.4,
    reviewsCount: 89,
    image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=600&auto=format&fit=crop&q=80',
    description:
      'Crisp, dark green cucumbers grown in Coimbatore region — popular for Maldivian salads, raita, and raw garnishes. Uniform size, thin skin, and low seed count. Wax-free and naturally grown for a clean flavour profile.',
    brand: 'Kadalodi Fresh — Tamil Nadu',
    inStock: true,
    originCity: 'Coimbatore, Tamil Nadu',
    shippingEstimateDays: '4–7 days',
    features: [
      'Dutch/hybrid variety — thin skin, crisp flesh',
      'Uniform 18–22 cm length sorting',
      'Individual shrink-wrap option available',
      'Zero pesticide residue (tested)',
      'Shelf life: 10–14 days post-delivery'
    ]
  },
  {
    id: 'prod-6',
    sku: 'KD-VEG-006',
    title: 'Drumstick (Murungakai) — 2 kg Bundle',
    category: 'Vegetables',
    inrCost: 80,
    kadalodiPriceInr: 190,
    mvrPrice: 37,
    weightKg: 2,
    rating: 4.6,
    reviewsCount: 73,
    image: 'https://images.unsplash.com/photo-1598030304671-5aa1d6f21128?w=600&auto=format&fit=crop&q=80',
    description:
      'Fresh moringa drumsticks from Trichy farms — tender, green, and fragrant. A beloved ingredient in South Indian-style Maldivian curries and soups. Rich in vitamins A, C, and iron. Bundled in sets of 6–8 sticks per pack.',
    brand: 'Kadalodi Fresh — Trichy',
    inStock: true,
    originCity: 'Trichy, Tamil Nadu',
    shippingEstimateDays: '4–7 days',
    features: [
      'Tender harvest — no fibrous texture',
      'Moringa oleifera variety',
      'Rich in iron, calcium & vitamins',
      'Bundled in breathable jute twine',
      'Shelf life: 7–10 days post-delivery'
    ]
  },

  // ── FRUITS ──────────────────────────────────────────────────────────────────
  {
    id: 'prod-7',
    sku: 'KD-FRT-001',
    title: 'Coconut (Thengai) — Dozen (12 pcs)',
    category: 'Fruits',
    inrCost: 240,
    kadalodiPriceInr: 480,
    mvrPrice: 92,
    weightKg: 8,
    rating: 4.9,
    reviewsCount: 301,
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a47d70?w=600&auto=format&fit=crop&q=80',
    description:
      'Fresh mature coconuts from Thanjavur\'s coastal groves — the gold standard for Maldivian cooking. Used in coconut milk, pol sambol, and sweetmeats. Heavy, water-rich, and naturally husked for easy cracking. Each batch freshness-tested before loading.',
    brand: 'Kadalodi Fresh — Thanjavur',
    inStock: true,
    originCity: 'Thanjavur, Tamil Nadu',
    shippingEstimateDays: '4–7 days',
    features: [
      'Mature coconuts — high milk yield',
      'Thanjavur coastal variety — richest fat content',
      'Husked & de-fibred for easy handling',
      'Each coconut >500ml water content',
      'Shelf life: 3–4 weeks post-delivery'
    ]
  },
  {
    id: 'prod-8',
    sku: 'KD-FRT-002',
    title: 'Guava (Koyya Pazham) — 3 kg Box',
    category: 'Fruits',
    inrCost: 150,
    kadalodiPriceInr: 330,
    mvrPrice: 63,
    weightKg: 3,
    rating: 4.5,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1619546952812-520e98064a52?w=600&auto=format&fit=crop&q=80',
    description:
      'Sweet, white-fleshed Allahabad Safeda guavas from Tamil Nadu orchards. Naturally aromatic with a honey-like sweetness. Popular as a fresh snack and juice fruit in Maldivian resorts and homes. Harvested pre-ripe for perfect arrival condition.',
    brand: 'Kadalodi Fresh — Tamil Nadu',
    inStock: true,
    originCity: 'Krishnagiri, Tamil Nadu',
    shippingEstimateDays: '4–7 days',
    features: [
      'Allahabad Safeda variety — premium white flesh',
      'High vitamin C content (212mg/100g)',
      'Harvested at 85% maturity',
      'Single-layer corrugated box packing',
      'Shelf life: 7–10 days post-delivery'
    ]
  },
  {
    id: 'prod-9',
    sku: 'KD-FRT-003',
    title: 'Grapes (Thirachai) — 4 kg Box',
    category: 'Fruits',
    inrCost: 480,
    kadalodiPriceInr: 860,
    mvrPrice: 165,
    weightKg: 4,
    rating: 4.7,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&auto=format&fit=crop&q=80',
    description:
      'Premium Sharad Seedless green grapes from Nashik-adjacent Tamil Nadu farms — crisp, juicy, and naturally sweet. A top-selling fruit in Maldivian resorts and premium households. Cold-chain handled from harvest to port loading.',
    brand: 'Kadalodi Fresh — Tamil Nadu',
    inStock: true,
    originCity: 'Theni, Tamil Nadu',
    shippingEstimateDays: '4–7 days',
    features: [
      'Sharad Seedless variety — uniform berry size',
      'Brix (sugar) level: 18–22° — naturally sweet',
      'Sulphur-dioxide sachet preserved for freshness',
      'Cold-chain box with ventilation holes',
      'Shelf life: 14–18 days post-delivery'
    ]
  },

  // ── FRESH HERBS & LEAVES ─────────────────────────────────────────────────────
  {
    id: 'prod-10',
    sku: 'KD-HERB-001',
    title: 'Coriander Leaves (Kothamalli) — 1 kg Bundle',
    category: 'Herbs & Leaves',
    inrCost: 120,
    kadalodiPriceInr: 260,
    mvrPrice: 50,
    weightKg: 1,
    rating: 4.8,
    reviewsCount: 267,
    image: 'https://images.unsplash.com/photo-1506807803488-8eafc15316c9?w=600&auto=format&fit=crop&q=80',
    description:
      'Fresh, bushy coriander (cilantro) bundles from Tiruvallur farms — intensely fragrant, vibrant green, and full-leafed. The most-used garnish herb in Maldivian fish dishes, soups, and biriyani. Harvested the same day as port loading to maximise freshness on arrival.',
    brand: 'Kadalodi Fresh — Tamil Nadu',
    inStock: true,
    originCity: 'Tiruvallur, Tamil Nadu',
    shippingEstimateDays: '4–7 days',
    features: [
      'Same-day harvest before port loading',
      'Full-leaf, bushy variety — minimal stem waste',
      'Washed & drained, packed in moisture-control sheets',
      'No yellowing guarantee at delivery',
      'Shelf life: 7–10 days post-delivery'
    ]
  },
  {
    id: 'prod-11',
    sku: 'KD-HERB-002',
    title: 'Curry Leaves (Karuveppilai) — 500 g Bundle',
    category: 'Herbs & Leaves',
    inrCost: 60,
    kadalodiPriceInr: 150,
    mvrPrice: 29,
    weightKg: 0.5,
    rating: 4.9,
    reviewsCount: 341,
    image: 'https://images.unsplash.com/photo-1586093728487-7c35a7a27d28?w=600&auto=format&fit=crop&q=80',
    description:
      'Aromatic fresh curry leaf branches from home-grown trees in Trichy district. The soul of Maldivian seafood curries — impossible to substitute. Firm, dark-green leaves that release intense flavour when tempered in oil. Bundles of 8–10 branches, packed in perforated bags.',
    brand: 'Kadalodi Fresh — Trichy',
    inStock: true,
    originCity: 'Trichy, Tamil Nadu',
    shippingEstimateDays: '4–7 days',
    features: [
      'Farm-grown (not wildcraft) — consistent leaf size',
      'Dark-green colour guarantee',
      'Perforated poly bag to prevent sweating',
      'Packed same-morning as vessel departure',
      'Shelf life: 10–14 days post-delivery'
    ]
  },
  {
    id: 'prod-12',
    sku: 'KD-HERB-003',
    title: 'Mint Leaves (Pudina) — 500 g Bundle',
    category: 'Herbs & Leaves',
    inrCost: 75,
    kadalodiPriceInr: 170,
    mvrPrice: 33,
    weightKg: 0.5,
    rating: 4.7,
    reviewsCount: 198,
    image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=600&auto=format&fit=crop&q=80',
    description:
      'Fresh spearmint (pudina) bundles from Madurai farms — cool, intense, and fragrant. Used in Maldivian salads, raita, mint tea, and garnishes. Hydroponic-style grown for maximum leaf density. Packed standing upright in water-soaked cotton base for freshness.',
    brand: 'Kadalodi Fresh — Madurai',
    inStock: true,
    originCity: 'Madurai, Tamil Nadu',
    shippingEstimateDays: '4–7 days',
    features: [
      'Spearmint variety — strong clean flavour',
      'Cotton-base moisture packing method',
      'No browning at stems — freshness sealed',
      'Pesticide-residue tested (below MRL)',
      'Shelf life: 7–12 days post-delivery'
    ]
  },

  // ── STAPLES & GRAINS ────────────────────────────────────────────────────────
  {
    id: 'prod-13',
    sku: 'KD-GRN-001',
    title: 'Basmati Rice — 25 kg Export Bag',
    category: 'Staples & Grains',
    inrCost: 1500,
    kadalodiPriceInr: 2200,
    mvrPrice: 420,
    weightKg: 25,
    rating: 4.8,
    reviewsCount: 189,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
    description:
      'Premium aged Basmati rice (1121 variety) from Punjab-origin mills, cleaned and packed at our Chennai warehouse. Long-grain, aromatic, and non-sticky — ideal for Maldivian biriyani, rice dishes, and resorts. FSSAI certified, moisture content <13%, uniform grain size.',
    brand: 'Kadalodi Staples',
    inStock: true,
    originCity: 'Chennai (Mill-processed), Tamil Nadu',
    shippingEstimateDays: '4–7 days',
    features: [
      '1121 Basmati — extra-long grain (8.4mm+)',
      'Aged 12 months for superior aroma',
      'FSSAI & APEDA certified for export',
      'Moisture <13%, broken rice <1%',
      'Double-layered polypropylene export bag'
    ]
  },
  {
    id: 'prod-14',
    sku: 'KD-GRN-002',
    title: 'Raw Rice (Pacharisi) — 25 kg Bag',
    category: 'Staples & Grains',
    inrCost: 1050,
    kadalodiPriceInr: 1650,
    mvrPrice: 315,
    weightKg: 25,
    rating: 4.6,
    reviewsCount: 143,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
    description:
      'High-quality raw (white) rice packed at Chennai for bulk export to Maldives. The everyday staple for households, guesthouses, and local restaurants across the atolls. Sorted, cleaned, and double-bagged for sea transit resilience.',
    brand: 'Kadalodi Staples',
    inStock: true,
    originCity: 'Chennai, Tamil Nadu',
    shippingEstimateDays: '4–7 days',
    features: [
      'IR-64 or Sona Masoori variety',
      'Sorted, cleaned & polished at Chennai hub',
      'Moisture content <14%',
      'Export-grade double PP bag',
      'Available in 5kg, 10kg, 25kg & 50kg bags'
    ]
  },

  // ── ADDITIONAL PRODUCE ──────────────────────────────────────────────────────
  {
    id: 'prod-15',
    sku: 'KD-VEG-007',
    title: 'Garlic (Poondu) — 2 kg Net',
    category: 'Vegetables',
    inrCost: 160,
    kadalodiPriceInr: 350,
    mvrPrice: 67,
    weightKg: 2,
    rating: 4.7,
    reviewsCount: 224,
    image: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?w=600&auto=format&fit=crop&q=80',
    description:
      'Dry, pungent Indian garlic — large-clove variety from Rajasthan farms processed through Chennai. Essential for Maldivian fish curry pastes, soups, and marinades. Clean white skin, firm bulbs, and high allicin content for maximum flavour.',
    brand: 'Kadalodi Fresh — Tamil Nadu',
    inStock: true,
    originCity: 'Chennai (Hub-processed)',
    shippingEstimateDays: '4–7 days',
    features: [
      'Large-clove Indian variety (30–50g bulbs)',
      'Dry-cured for 3 weeks post-harvest',
      'Zero moisture to prevent mould during transit',
      'Mesh-packed for breathability',
      'Shelf life: 6–8 weeks post-delivery'
    ]
  },
  {
    id: 'prod-16',
    sku: 'KD-VEG-008',
    title: 'Ginger (Inji) — 2 kg Pack',
    category: 'Vegetables',
    inrCost: 130,
    kadalodiPriceInr: 290,
    mvrPrice: 56,
    weightKg: 2,
    rating: 4.6,
    reviewsCount: 167,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80',
    description:
      'Fresh-dried ginger rhizomes from Kerala-origin farms, processed in Tamil Nadu. Aromatic, fibrous, and pungent — a key base for Maldivian curry pastes, tea, and medicinal use. Skin-on, thoroughly cleaned, and moisture-controlled for long shelf life.',
    brand: 'Kadalodi Fresh — Tamil Nadu',
    inStock: true,
    originCity: 'Erode, Tamil Nadu',
    shippingEstimateDays: '4–7 days',
    features: [
      'Kerala Wynad variety — high essential oil content',
      'Fresh-dry processed (not fully dehydrated)',
      'Thoroughly cleaned, no soil residue',
      'Packed in jute mesh bags',
      'Shelf life: 4–6 weeks post-delivery'
    ]
  }
];

export const PRODUCT_CATEGORIES = [
  'All',
  'Vegetables',
  'Fruits',
  'Herbs & Leaves',
  'Staples & Grains',
];
