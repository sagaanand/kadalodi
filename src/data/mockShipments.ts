import type { Shipment } from '../types';

export const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: 'KDL-EXP-024',
    vesselName: 'MV Maldivian Express',
    originPort: 'Chennai Port (INMAA), India',
    destinationPort: 'Malé Commercial Port (MLE), Maldives',
    orderIds: ['KD-10284', 'KD-10285', 'KD-10286', 'KD-10289', 'KD-10291', 'KD-10294'],
    totalOrdersCount: 42,
    totalWeightKg: 286.5,
    status: 'In Transit',
    departureDate: '19 Sep 2026',
    estimatedArrivalDate: '24 Sep 2026',
    seaProgressPercent: 62,
    seaRouteCoordinates: { lat: 8.5241, lng: 76.9366 } // Crossing Laccadive Sea
  },
  {
    id: 'KDL-EXP-025',
    vesselName: 'OOCL Indian Ocean Flyer',
    originPort: 'Cochin Port (INCOK), India',
    destinationPort: 'Malé Commercial Port (MLE), Maldives',
    orderIds: ['KD-10295', 'KD-10296', 'KD-10298'],
    totalOrdersCount: 28,
    totalWeightKg: 194.2,
    status: 'Consolidation',
    departureDate: '22 Sep 2026',
    estimatedArrivalDate: '27 Sep 2026',
    seaProgressPercent: 10,
    seaRouteCoordinates: { lat: 9.9312, lng: 76.2673 }
  },
  {
    id: 'KDL-EXP-023',
    vesselName: 'Maersk Blue Atoll',
    originPort: 'Tuticorin Port (INTUT), India',
    destinationPort: 'Malé Commercial Port (MLE), Maldives',
    orderIds: ['KD-10270', 'KD-10271', 'KD-10274', 'KD-10279'],
    totalOrdersCount: 54,
    totalWeightKg: 412.0,
    status: 'Arrived at Malé',
    departureDate: '14 Sep 2026',
    estimatedArrivalDate: '18 Sep 2026',
    seaProgressPercent: 100,
    seaRouteCoordinates: { lat: 4.1755, lng: 73.5093 } // Malé port waters
  },
  {
    id: 'KDL-EXP-022',
    vesselName: 'CMA CGM Dhivehi Pearl',
    originPort: 'Chennai Port (INMAA), India',
    destinationPort: 'Malé Commercial Port (MLE), Maldives',
    orderIds: ['KD-10260', 'KD-10262', 'KD-10265'],
    totalOrdersCount: 65,
    totalWeightKg: 520.8,
    status: 'Customs Cleared',
    departureDate: '10 Sep 2026',
    estimatedArrivalDate: '15 Sep 2026',
    seaProgressPercent: 100,
    seaRouteCoordinates: { lat: 4.1755, lng: 73.5093 }
  },
  {
    id: 'KDL-EXP-021',
    vesselName: 'MV Maldivian Express',
    originPort: 'Chennai Port (INMAA), India',
    destinationPort: 'Malé Commercial Port (MLE), Maldives',
    orderIds: ['KD-10250', 'KD-10251', 'KD-10255'],
    totalOrdersCount: 38,
    totalWeightKg: 245.0,
    status: 'Completed',
    departureDate: '02 Sep 2026',
    estimatedArrivalDate: '08 Sep 2026',
    seaProgressPercent: 100,
    seaRouteCoordinates: { lat: 4.1755, lng: 73.5093 }
  }
];
