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
  }
];
