import type { ProcurementRecord } from '../types';

export const MOCK_PROCUREMENT: ProcurementRecord[] = [
  {
    id: 'PROC-901',
    orderId: 'KD-10284',
    productId: 'prod-1',
    productTitle: 'Small Onion (Chinna Vengayam) — 5 kg Bag',
    supplier: 'Perambalur Shallot Farmers Cooperative',
    originCity: 'Perambalur, Tamil Nadu',
    inrCost: 150,
    quantity: 4,
    status: 'Ready',
    expectedDate: '19 Sep 2026',
    verifiedBy: 'Rajesh Kumar (QC Lead)'
  },
  {
    id: 'PROC-902',
    orderId: 'KD-10284',
    productId: 'prod-2',
    productTitle: 'Potato (Aloo) — 10 kg Bag',
    supplier: 'Ooty Highland Farm Exports',
    originCity: 'Ooty (Nilgiris), Tamil Nadu',
    inrCost: 280,
    quantity: 1,
    status: 'Ready',
    expectedDate: '19 Sep 2026',
    verifiedBy: 'Rajesh Kumar (QC Lead)'
  },
  {
    id: 'PROC-903',
    orderId: 'KD-10285',
    productId: 'prod-7',
    productTitle: 'Coconut (Thengai) — Dozen (12 pcs)',
    supplier: 'Thanjavur Coastal Coconut Growers',
    originCity: 'Thanjavur, Tamil Nadu',
    inrCost: 240,
    quantity: 2,
    status: 'Received',
    expectedDate: '18 Sep 2026',
    verifiedBy: 'Anbu Selvan'
  },
  {
    id: 'PROC-904',
    orderId: 'KD-10285',
    productId: 'prod-3',
    productTitle: 'Tomato (Thakkali) — 5 kg Box',
    supplier: 'Madurai Vegetable Market Wholesaler',
    originCity: 'Madurai, Tamil Nadu',
    inrCost: 200,
    quantity: 3,
    status: 'Quality Check',
    expectedDate: '18 Sep 2026'
  },
  {
    id: 'PROC-905',
    orderId: 'KD-10286',
    productId: 'prod-13',
    productTitle: 'Basmati Rice — 25 kg Export Bag',
    supplier: 'Chennai Rice Mill & Export Hub',
    originCity: 'Chennai, Tamil Nadu',
    inrCost: 1500,
    quantity: 2,
    status: 'Ordered',
    expectedDate: '20 Sep 2026'
  },
  {
    id: 'PROC-906',
    orderId: 'KD-10292',
    productId: 'prod-2',
    productTitle: 'Potato (Aloo) — 10 kg Bag',
    supplier: 'Ooty Highland Farm Exports',
    originCity: 'Ooty (Nilgiris), Tamil Nadu',
    inrCost: 280,
    quantity: 3,
    status: 'Pending',
    expectedDate: '22 Sep 2026'
  },
  {
    id: 'PROC-907',
    orderId: 'KD-10292',
    productId: 'prod-4',
    productTitle: 'Green Chilli (Pacchai Milagai) — 2 kg Pack',
    supplier: 'Salem Agri Direct',
    originCity: 'Salem, Tamil Nadu',
    inrCost: 160,
    quantity: 5,
    status: 'Pending',
    expectedDate: '22 Sep 2026'
  },
  {
    id: 'PROC-908',
    orderId: 'KD-10291',
    productId: 'prod-13',
    productTitle: 'Basmati Rice — 25 kg Export Bag',
    supplier: 'Chennai Rice Mill & Export Hub',
    originCity: 'Chennai, Tamil Nadu',
    inrCost: 1500,
    quantity: 4,
    status: 'Pending',
    expectedDate: '23 Sep 2026'
  }
];
