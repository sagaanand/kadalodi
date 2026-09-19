import type { DeliveryAssignment } from '../types';

export const MOCK_DELIVERIES: DeliveryAssignment[] = [
  {
    id: 'DEL-101',
    orderId: 'KD-10284',
    island: 'Hulhumalé',
    customerName: 'Ahmed Hassan',
    customerPhone: '+960 778-4321',
    driverName: 'Ali Moosa',
    driverPhone: '+960 790-3344',
    status: 'Assigned',
    timeSlot: '24 Sep 2026, 14:00 – 17:00',
    islandArea: 'Phase 1 (Nirolhu Magu corridor)'
  },
  {
    id: 'DEL-102',
    orderId: 'KD-10285',
    island: 'Malé',
    customerName: 'Mariyam Shifa',
    customerPhone: '+960 791-2290',
    driverName: 'Ibrahim Rasheed',
    driverPhone: '+960 772-5566',
    status: 'Assigned',
    timeSlot: '24 Sep 2026, 11:00 – 14:00',
    islandArea: 'Henveiru Ward'
  },
  {
    id: 'DEL-103',
    orderId: 'KD-10289',
    island: 'Hulhumalé',
    customerName: 'Fathimath Rishfa',
    customerPhone: '+960 788-5522',
    driverName: 'Ali Moosa',
    driverPhone: '+960 790-3344',
    status: 'Out for Delivery',
    timeSlot: 'Today, 15:30 – 18:30',
    islandArea: 'Hiyaa Towers (Phase 2)'
  },
  {
    id: 'DEL-104',
    orderId: 'KD-10287',
    island: 'Malé',
    customerName: 'Aishath Niuma',
    customerPhone: '+960 912-3388',
    driverName: 'Ahmed Naeem',
    driverPhone: '+960 781-8899',
    status: 'Picked Up',
    timeSlot: 'Tomorrow, 10:00 – 13:00',
    islandArea: 'Galolhu Ward'
  },
  {
    id: 'DEL-105',
    orderId: 'KD-10286',
    island: 'Addu City',
    customerName: 'Ibrahim Waheed',
    customerPhone: '+960 779-1145',
    driverName: 'Hussain Latheef',
    driverPhone: '+960 795-4422',
    status: 'Assigned',
    timeSlot: '26 Sep 2026 (via Southern Cargo Ferry)',
    islandArea: 'Hithadhoo Harbour Delivery'
  },
  {
    id: 'DEL-106',
    orderId: 'KD-10296',
    island: 'Hulhumalé',
    customerName: 'Ahmed Hassan',
    customerPhone: '+960 778-4321',
    driverName: 'Ali Moosa',
    driverPhone: '+960 790-3344',
    status: 'Assigned',
    timeSlot: '21 Sep 2026, 13:00 – 16:00',
    islandArea: 'Phase 1 (Nirolhu Magu corridor)'
  },
  {
    id: 'DEL-107',
    orderId: 'KD-10290',
    island: 'Malé',
    customerName: 'Hassan Nazim',
    customerPhone: '+960 774-0012',
    driverName: 'Ibrahim Rasheed',
    driverPhone: '+960 772-5566',
    status: 'Delivered',
    timeSlot: '16 Sep 2026, 10:00 – 13:00',
    islandArea: 'Machangoalhi Ward'
  },
  {
    id: 'DEL-108',
    orderId: 'KD-10288',
    island: 'Fuvahmulah',
    customerName: 'Mohamed Ziyad',
    customerPhone: '+960 762-9844',
    driverName: 'Hassan Firag (Fuvahmulah Express)',
    driverPhone: '+960 688-5511',
    status: 'Assigned',
    timeSlot: '22 Sep 2026 (via Addu Ferry Connection)',
    islandArea: 'Dhadimago Ward'
  },
  {
    id: 'DEL-109',
    orderId: 'KD-10280',
    island: 'Malé',
    customerName: 'Hawwa Sana',
    customerPhone: '+960 790-1234',
    driverName: 'Ahmed Naeem',
    driverPhone: '+960 781-8899',
    status: 'Delivered',
    timeSlot: '14 Sep 2026, 11:00 – 14:00',
    islandArea: 'Galolhu Ward'
  },
  {
    id: 'DEL-110',
    orderId: 'KD-10279',
    island: 'Addu City',
    customerName: 'Ali Shameem',
    customerPhone: '+960 771-4567',
    driverName: 'Hussain Latheef',
    driverPhone: '+960 795-4422',
    status: 'Delivered',
    timeSlot: '15 Sep 2026 (Southern Cargo Ferry)',
    islandArea: 'Feydhoo Port Area'
  },
  {
    id: 'DEL-111',
    orderId: 'KD-10295',
    island: 'Malé',
    customerName: 'Rugiyya Naeem',
    customerPhone: '+960 766-8844',
    driverName: 'Ibrahim Rasheed',
    driverPhone: '+960 772-5566',
    status: 'Assigned',
    timeSlot: '28 Sep 2026, 09:00 – 12:00',
    islandArea: 'Galolhu — Fushee Magu'
  }
];
