import type { CustomsDeclaration } from '../types';

export const MOCK_CUSTOMS: CustomsDeclaration[] = [
  {
    id: 'CUS-DEC-2026-9921',
    shipmentId: 'KDL-EXP-024',
    orderId: 'KD-10284',
    customerName: 'Ahmed Hassan',
    productDescription: 'Fresh Vegetables — Small Onion (20kg), Potato (10kg), Coriander Leaves (2kg)',
    category: 'Fresh Agricultural Produce',
    declaredValueMvr: 434,
    dutyFeeMvr: 0,
    documentsStatus: 'Verified',
    status: 'Cleared',
    submittedAt: '24 Sep 2026',
    inspectorNote: 'APHA phytosanitary certificate verified. Fresh produce — duty exempt under SAFTA.'
  },
  {
    id: 'CUS-DEC-2026-9811',
    shipmentId: 'KDL-EXP-023',
    orderId: 'KD-10287',
    customerName: 'Aishath Niuma',
    productDescription: 'Fresh Fruits — Guava (6kg), Grapes (4kg), Mint Leaves (2kg)',
    category: 'Fresh Agricultural Produce',
    declaredValueMvr: 458,
    dutyFeeMvr: 0,
    documentsStatus: 'Verified',
    status: 'Under Review',
    submittedAt: '19 Sep 2026',
    inspectorNote: 'Grapes require cold-chain verification. Awaiting phytosanitary confirmation from Maldives APHA office.'
  },
  {
    id: 'CUS-DEC-2026-9815',
    shipmentId: 'KDL-EXP-023',
    orderId: 'KD-10288',
    customerName: 'Mohamed Ziyad',
    productDescription: 'Raw Rice (25kg), Green Chilli (10kg), Drumstick (6kg)',
    category: 'Food Staples & Fresh Produce',
    declaredValueMvr: 547,
    dutyFeeMvr: 12,
    documentsStatus: 'Verified',
    status: 'Cleared',
    submittedAt: '22 Sep 2026',
    inspectorNote: 'Rice subject to 5% import duty. Paid. Fresh produce duty-exempt. Cleared for release.'
  },
  {
    id: 'CUS-DEC-2026-9930',
    shipmentId: 'KDL-EXP-025',
    orderId: 'KD-10291',
    customerName: 'Zulaikha Jameel',
    productDescription: 'Basmati Rice (100kg), Garlic (4kg), Ginger (4kg)',
    category: 'Food Staples',
    declaredValueMvr: 1946,
    dutyFeeMvr: 84,
    documentsStatus: 'Documentation Pending',
    status: 'Documentation Pending',
    submittedAt: '28 Sep 2026',
    inspectorNote: 'FSSAI export certificate required for bulk rice. Kadalodi India team notified.'
  }
];
