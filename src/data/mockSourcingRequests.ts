import type { SourcingQuoteRequest, NotificationItem } from '../types';

export const MOCK_SOURCING_REQUESTS: SourcingQuoteRequest[] = [
  {
    id: 'REQ-401',
    productName: 'Bitter Gourd (Pavakkai) — 3 kg Box',
    category: 'Vegetables',
    quantity: 10,
    targetPriceInr: 120,
    customerName: 'Shareef Restaurant, Malé',
    customerContact: '+960 334-2211',
    island: 'Malé',
    notes: 'Need weekly supply for restaurant kitchen. Prefer medium-sized bitter gourd.',
    status: 'Sourcing in India',
    quotedMvr: 48,
    estimatedDelivery: '5–8 days',
    createdAt: '17 Sep 2026'
  },
  {
    id: 'REQ-402',
    productName: 'Raw Banana (Vaazhaikai) — 5 kg Bundle',
    category: 'Fruits',
    quantity: 20,
    targetPriceInr: 180,
    customerName: 'Hulhumalé Guest House Collective',
    customerContact: '+960 778-9900',
    island: 'Hulhumalé',
    notes: 'Raw banana for daily frying — must be unripe, firm green.',
    status: 'Quote Ready',
    quotedMvr: 68,
    estimatedDelivery: '5–7 days',
    createdAt: '16 Sep 2026'
  },
  {
    id: 'REQ-403',
    productName: 'Ladies Finger (Vendaikai / Okra) — 2 kg Pack',
    category: 'Vegetables',
    quantity: 15,
    targetPriceInr: 100,
    customerName: 'Ahmed Nizar — Private',
    customerContact: '+960 765-8844',
    island: 'Malé',
    notes: 'Tender small okra preferred — not more than 8cm length.',
    status: 'Submitted',
    estimatedDelivery: '6–9 days',
    createdAt: '18 Sep 2026'
  },
  {
    id: 'REQ-404',
    productName: 'Mango (Mangai) — 5 kg Box',
    productUrl: 'https://agriexport.in/alphonso-mangoes',
    category: 'Fruits',
    quantity: 50,
    targetPriceInr: 350,
    customerName: 'Kurumba Maldives Resort',
    customerContact: '+960 664-2324',
    island: 'North Malé Atoll',
    notes: 'Alphonso variety preferred for resort dessert menu. Ripe-to-order packing required.',
    status: 'Accepted',
    quotedMvr: 132,
    estimatedDelivery: '7–10 days',
    createdAt: '15 Sep 2026'
  },
  {
    id: 'REQ-405',
    productName: 'Drumstick Leaves (Murungai Keerai) — 500 g Bundle',
    category: 'Herbs & Leaves',
    quantity: 30,
    targetPriceInr: 80,
    customerName: 'Island Café, Fuvahmulah',
    customerContact: '+960 688-4411',
    island: 'Fuvahmulah',
    notes: 'For soup and health drinks. Must be freshly harvested.',
    status: 'Sourcing in India',
    quotedMvr: 31,
    estimatedDelivery: '6–8 days',
    createdAt: '17 Sep 2026'
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Shipment KDL-EXP-024 Departed Chennai',
    message: 'MV Maldivian Express has departed Chennai Port (INMAA). Carrying 3 orders: KD-10284, KD-10285, KD-10286. ETA Malé: 24 Sep 2026.',
    time: '17 Sep 2026, 09:00 AM',
    read: false,
    type: 'shipment'
  },
  {
    id: 'notif-2',
    title: 'Order KD-10287 — Customs Clearance',
    message: 'Your order (Guava, Grapes & Mint Leaves) has arrived at Malé Port and is currently being processed by Maldives Customs.',
    time: '19 Sep 2026, 11:30 AM',
    orderId: 'KD-10287',
    read: false,
    type: 'customs'
  },
  {
    id: 'notif-3',
    title: 'Sourcing Quote Ready — Raw Banana',
    message: 'We have sourced Raw Banana (Vaazhaikai) for Hulhumalé Guest House Collective. Quoted price: MVR 68 per 5kg bundle. Please confirm to proceed.',
    time: '18 Sep 2026, 03:15 PM',
    read: false,
    type: 'system'
  },
  {
    id: 'notif-4',
    title: 'Order KD-10289 — Out for Delivery',
    message: 'Your order (Small Onion, Cucumber & Ginger) has reached the Hulhumalé distribution hub and is out for delivery. Driver: Ali Moosa.',
    time: '18 Sep 2026, 10:00 AM',
    orderId: 'KD-10289',
    read: true,
    type: 'order'
  },
  {
    id: 'notif-5',
    title: 'New Sourcing Request — Mango for Resort',
    message: 'Kurumba Maldives Resort has placed a sourcing request for 50 boxes of Alphonso Mango. India team has confirmed availability.',
    time: '15 Sep 2026, 05:45 PM',
    read: true,
    type: 'system'
  }
];
