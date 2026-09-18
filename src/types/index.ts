export type UserRole = 'customer' | 'india_ops' | 'maldives_ops' | 'admin';

export type OrderStatus =
  | 'order_placed'
  | 'processing_india'
  | 'procurement'
  | 'packed_warehouse'
  | 'export_cleared'
  | 'in_transit'
  | 'arrived_maldives'
  | 'customs_clearance'
  | 'maldives_hub'
  | 'delivered';

export interface TimelineEntry {
  stage: OrderStatus;
  label: string;
  timestamp: string;
  location: string;
  note: string;
  completed: boolean;
  current: boolean;
}

export interface Product {
  id: string;
  sku: string;
  title: string;
  category: string;
  inrCost: number; // India purchase cost in INR
  kadalodiPriceInr: number; // Kadalodi landed cost
  mvrPrice: number; // Selling price in Maldivian Rufiyaa
  weightKg: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  brand: string;
  inStock: boolean;
  originCity: string;
  shippingEstimateDays: string;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string; // e.g. "KD-10284"
  customerName: string;
  customerPhone: string;
  island: string;
  address: string;
  notes?: string;
  items: CartItem[];
  subtotalMvr: number;
  shippingMvr: number;
  deliveryMvr: number;
  totalMvr: number;
  status: OrderStatus;
  timeline: TimelineEntry[];
  indiaWarehouse: string;
  shipmentId: string;
  vesselName: string;
  containerNo: string;
  customsDecNo: string;
  assignedDriver?: string;
  eta: string;
  createdAt: string;
  paymentMethod: string;
  weightKg: number;
}

export interface Shipment {
  id: string; // e.g. "KDL-EXP-024"
  vesselName: string;
  originPort: string;
  destinationPort: string;
  orderIds: string[];
  totalOrdersCount: number;
  totalWeightKg: number;
  status: 'Consolidation' | 'Departed India' | 'In Transit' | 'Arrived at Malé' | 'Customs Cleared' | 'Completed';
  departureDate: string;
  estimatedArrivalDate: string;
  seaProgressPercent: number; // 0 to 100
  seaRouteCoordinates: { lat: number; lng: number };
}

export interface ProcurementRecord {
  id: string;
  orderId: string;
  productId: string;
  productTitle: string;
  supplier: string;
  originCity: string;
  inrCost: number;
  quantity: number;
  status: 'Pending' | 'Ordered' | 'Received' | 'Quality Check' | 'Ready';
  expectedDate: string;
  verifiedBy?: string;
}

export interface CustomsDeclaration {
  id: string;
  shipmentId: string;
  orderId: string;
  customerName: string;
  productDescription: string;
  category: string;
  declaredValueMvr: number;
  dutyFeeMvr: number;
  documentsStatus: 'Verified' | 'Documentation Pending' | 'Inspection Required';
  status: 'Documentation Pending' | 'Under Review' | 'Cleared' | 'Hold';
  submittedAt: string;
  inspectorNote?: string;
}

export interface DeliveryAssignment {
  id: string;
  orderId: string;
  island: string;
  customerName: string;
  customerPhone: string;
  driverName: string;
  driverPhone: string;
  status: 'Assigned' | 'Picked Up' | 'Out for Delivery' | 'Delivered' | 'Failed Attempt';
  timeSlot: string;
  islandArea: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  orderId?: string;
  read: boolean;
  type: 'order' | 'shipment' | 'customs' | 'system';
}

export interface SourcingQuoteRequest {
  id: string;
  productName: string;
  productUrl?: string;
  category: string;
  quantity: number;
  targetPriceInr?: number;
  customerName: string;
  customerContact: string;
  island: string;
  notes?: string;
  imageUrl?: string;
  status: 'Submitted' | 'Sourcing in India' | 'Quote Ready' | 'Accepted' | 'Order Created';
  quotedMvr?: number;
  estimatedDelivery?: string;
  createdAt: string;
}

export interface PricingFormulaParams {
  indiaProductCostInr: number;
  indiaHandlingInr: number;
  internationalCargoInr: number;
  maldivesHandlingInr: number;
  maldivesDeliveryInr: number;
  taxesDutiesInr: number;
  kadalodiMarginInr: number;
  exchangeRateInrToMvr: number; // e.g. 0.18 MVR per 1 INR or 1 MVR = 5.4 INR
}
