import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  UserRole,
  OrderStatus,
  Product,
  CartItem,
  Order,
  Shipment,
  ProcurementRecord,
  CustomsDeclaration,
  DeliveryAssignment,
  NotificationItem,
  SourcingQuoteRequest
} from '../types';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { MOCK_ORDERS, ORDER_STAGE_ORDER, buildTimeline } from '../data/mockOrders';
import { MOCK_SHIPMENTS } from '../data/mockShipments';
import { MOCK_PROCUREMENT } from '../data/mockProcurement';
import { MOCK_CUSTOMS } from '../data/mockCustoms';
import { MOCK_DELIVERIES } from '../data/mockDelivery';
import { MOCK_SOURCING_REQUESTS, MOCK_NOTIFICATIONS } from '../data/mockSourcingRequests';

interface CartTotals {
  subtotalMvr: number;
  shippingMvr: number;
  deliveryMvr: number;
  totalMvr: number;
  itemCount: number;
  totalWeightKg: number;
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isLoggedIn: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
  products: Product[];
  orders: Order[];
  shipments: Shipment[];
  procurement: ProcurementRecord[];
  customs: CustomsDeclaration[];
  deliveries: DeliveryAssignment[];
  sourcingRequests: SourcingQuoteRequest[];
  notifications: NotificationItem[];
  cart: CartItem[];
  cartTotals: CartTotals;
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  createOrder: (orderInput: {
    customerName: string;
    customerPhone: string;
    island: string;
    address: string;
    notes?: string;
    paymentMethod: string;
  }) => Order;
  advanceOrderStatus: (orderId: string) => void;
  setOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  updateCustomsStatus: (id: string, status: CustomsDeclaration['status']) => void;
  updateProcurementStatus: (id: string, status: ProcurementRecord['status']) => void;
  updateDeliveryStatus: (id: string, status: DeliveryAssignment['status'], driverName?: string) => void;
  addSourcingRequest: (request: Omit<SourcingQuoteRequest, 'id' | 'createdAt' | 'status'>) => void;
  markNotificationRead: (id: string) => void;
  resetAllDemoData: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isWhatsAppModalOpen: boolean;
  setIsWhatsAppModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'kadalodi_state_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load persisted state or initial mocks
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(`${LOCAL_STORAGE_KEY}_loggedin`) === 'true';
  });

  const [role, setRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_role`);
    return (saved as UserRole) || 'customer';
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_products`);
    return saved ? JSON.parse(saved) : MOCK_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_orders`);
    return saved ? JSON.parse(saved) : MOCK_ORDERS;
  });

  const [shipments, setShipments] = useState<Shipment[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_shipments`);
    return saved ? JSON.parse(saved) : MOCK_SHIPMENTS;
  });

  const [procurement, setProcurement] = useState<ProcurementRecord[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_procurement`);
    return saved ? JSON.parse(saved) : MOCK_PROCUREMENT;
  });

  const [customs, setCustoms] = useState<CustomsDeclaration[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_customs`);
    return saved ? JSON.parse(saved) : MOCK_CUSTOMS;
  });

  const [deliveries, setDeliveries] = useState<DeliveryAssignment[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_deliveries`);
    return saved ? JSON.parse(saved) : MOCK_DELIVERIES;
  });

  const [sourcingRequests, setSourcingRequests] = useState<SourcingQuoteRequest[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_sourcing`);
    return saved ? JSON.parse(saved) : MOCK_SOURCING_REQUESTS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_notifications`);
    return saved ? JSON.parse(saved) : MOCK_NOTIFICATIONS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_cart`);
    return saved ? JSON.parse(saved) : [
      { product: MOCK_PRODUCTS[0], quantity: 1 } // Pre-seed cart with Prestige Rice Cooker for great UX
    ];
  });

  // UI state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_loggedin`, String(isLoggedIn));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_role`, role);
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_products`, JSON.stringify(products));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_orders`, JSON.stringify(orders));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_shipments`, JSON.stringify(shipments));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_procurement`, JSON.stringify(procurement));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_customs`, JSON.stringify(customs));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_deliveries`, JSON.stringify(deliveries));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_sourcing`, JSON.stringify(sourcingRequests));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_notifications`, JSON.stringify(notifications));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_cart`, JSON.stringify(cart));
  }, [isLoggedIn, role, products, orders, shipments, procurement, customs, deliveries, sourcingRequests, notifications, cart]);

  // Cart calculations
  const cartTotals: CartTotals = React.useMemo(() => {
    const subtotalMvr = cart.reduce((sum, item) => sum + item.product.mvrPrice * item.quantity, 0);
    const totalWeightKg = cart.reduce((sum, item) => sum + item.product.weightKg * item.quantity, 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Realistic cross-border freight formula: base MVR 80 + MVR 30 per kg
    const shippingMvr = itemCount > 0 ? Math.round(80 + totalWeightKg * 25) : 0;
    const deliveryMvr = itemCount > 0 ? 50 : 0; // standard island local delivery
    const totalMvr = subtotalMvr + shippingMvr + deliveryMvr;

    return {
      subtotalMvr,
      shippingMvr,
      deliveryMvr,
      totalMvr,
      itemCount,
      totalWeightKg: Number(totalWeightKg.toFixed(2))
    };
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartDrawerOpen(true);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const createOrder = (orderInput: {
    customerName: string;
    customerPhone: string;
    island: string;
    address: string;
    notes?: string;
    paymentMethod: string;
  }): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `KD-${randomSuffix}`;
    const weightKg = cartTotals.totalWeightKg;

    const newOrder: Order = {
      id: orderId,
      customerName: orderInput.customerName,
      customerPhone: orderInput.customerPhone,
      island: orderInput.island,
      address: orderInput.address,
      notes: orderInput.notes,
      items: [...cart],
      subtotalMvr: cartTotals.subtotalMvr,
      shippingMvr: cartTotals.shippingMvr,
      deliveryMvr: cartTotals.deliveryMvr,
      totalMvr: cartTotals.totalMvr,
      status: 'order_placed',
      timeline: buildTimeline('order_placed'),
      indiaWarehouse: 'Chennai Fulfillment Hub (Ambattur)',
      shipmentId: 'KDL-EXP-025',
      vesselName: 'OOCL Indian Ocean Flyer',
      containerNo: 'OOCU-772901-2',
      customsDecNo: `MLE-CUS-2026-${randomSuffix}`,
      assignedDriver: orderInput.island === 'Hulhumalé' ? 'Ali Moosa' : 'Ibrahim Rasheed',
      eta: '28 Sep 2026',
      createdAt: 'Just now',
      paymentMethod: orderInput.paymentMethod,
      weightKg
    };

    setOrders(prev => [newOrder, ...prev]);

    // Create procurement item
    const newProcItems: ProcurementRecord[] = cart.map((c, i) => ({
      id: `PROC-${randomSuffix}-${i + 1}`,
      orderId,
      productId: c.product.id,
      productTitle: c.product.title,
      supplier: `${c.product.brand} Direct India`,
      originCity: c.product.originCity,
      inrCost: c.product.inrCost,
      quantity: c.quantity,
      status: 'Pending',
      expectedDate: '22 Sep 2026'
    }));
    setProcurement(prev => [...newProcItems, ...prev]);

    // Add alert notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Order Confirmed',
      message: `Your order ${orderId} has been successfully placed and routed to India operations.`,
      time: 'Just now',
      orderId,
      read: false,
      type: 'order'
    };
    setNotifications(prev => [newNotif, ...prev]);

    clearCart();
    return newOrder;
  };

  const advanceOrderStatus = (orderId: string) => {
    setOrders(prev =>
      prev.map(order => {
        if (order.id !== orderId) return order;

        const currentIndex = ORDER_STAGE_ORDER.indexOf(order.status);
        if (currentIndex === -1 || currentIndex >= ORDER_STAGE_ORDER.length - 1) {
          return order; // already delivered
        }

        const nextStage = ORDER_STAGE_ORDER[currentIndex + 1];
        const updatedTimeline = buildTimeline(nextStage, order.createdAt);

        // Notify user about progress
        const stageDescriptions: Record<OrderStatus, string> = {
          order_placed: 'Order confirmed by Kadalodi.',
          processing_india: 'Order is being processed at Chennai Sourcing Hub, India.',
          procurement: 'Product received from supplier and passed QC inspection.',
          packed_warehouse: 'Order packed in heavy-duty weatherproof sea crating.',
          export_cleared: 'Export customs cleared and loaded aboard ocean vessel.',
          in_transit: 'Shipment is currently sailing across the Indian Ocean to Malé.',
          arrived_maldives: 'Vessel arrived and docked at Malé Commercial Port.',
          customs_clearance: 'Maldives Customs Service has cleared your shipment.',
          maldives_hub: 'Order arrived at island distribution hub and is out for delivery.',
          delivered: 'Package successfully delivered to customer!'
        };

        const alertNotif: NotificationItem = {
          id: `notif-${Date.now()}`,
          title: `Update on ${order.id}`,
          message: stageDescriptions[nextStage],
          time: 'Just now',
          orderId: order.id,
          read: false,
          type: 'order'
        };

        setNotifications(n => [alertNotif, ...n]);

        return {
          ...order,
          status: nextStage,
          timeline: updatedTimeline
        };
      })
    );
  };

  const setOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(order => {
        if (order.id !== orderId) return order;
        return {
          ...order,
          status,
          timeline: buildTimeline(status, order.createdAt)
        };
      })
    );
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
  };

  const addProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateCustomsStatus = (id: string, status: CustomsDeclaration['status']) => {
    setCustoms(prev => prev.map(c => (c.id === id ? { ...c, status } : c)));
  };

  const updateProcurementStatus = (id: string, status: ProcurementRecord['status']) => {
    setProcurement(prev => prev.map(p => (p.id === id ? { ...p, status } : p)));
  };

  const updateDeliveryStatus = (id: string, status: DeliveryAssignment['status'], driverName?: string) => {
    setDeliveries(prev =>
      prev.map(d =>
        d.id === id
          ? { ...d, status, ...(driverName ? { driverName } : {}) }
          : d
      )
    );
  };

  const addSourcingRequest = (request: Omit<SourcingQuoteRequest, 'id' | 'createdAt' | 'status'>) => {
    const newReq: SourcingQuoteRequest = {
      ...request,
      id: `REQ-${Math.floor(500 + Math.random() * 500)}`,
      createdAt: 'Just now',
      status: 'Submitted',
      quotedMvr: request.targetPriceInr ? Math.round(request.targetPriceInr * 0.22) : undefined,
      estimatedDelivery: '8–14 days'
    };
    setSourcingRequests(prev => [newReq, ...prev]);
    
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Sourcing Request Submitted',
        message: `Our India procurement team is sourcing "${request.productName}". We will notify you with a quotation shortly.`,
        time: 'Just now',
        read: false,
        type: 'system'
      },
      ...prev
    ]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const login = (newRole: UserRole) => {
    setRole(newRole);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const resetAllDemoData = () => {
    localStorage.clear();
    setProducts(MOCK_PRODUCTS);
    setOrders(MOCK_ORDERS);
    setShipments(MOCK_SHIPMENTS);
    setProcurement(MOCK_PROCUREMENT);
    setCustoms(MOCK_CUSTOMS);
    setDeliveries(MOCK_DELIVERIES);
    setSourcingRequests(MOCK_SOURCING_REQUESTS);
    setNotifications(MOCK_NOTIFICATIONS);
    setCart([{ product: MOCK_PRODUCTS[0], quantity: 1 }]);
    setRole('customer');
    setIsLoggedIn(false);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        isLoggedIn,
        login,
        logout,
        products,
        orders,
        shipments,
        procurement,
        customs,
        deliveries,
        sourcingRequests,
        notifications,
        cart,
        cartTotals,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        createOrder,
        advanceOrderStatus,
        setOrderStatus,
        updateProduct,
        addProduct,
        updateCustomsStatus,
        updateProcurementStatus,
        updateDeliveryStatus,
        addSourcingRequest,
        markNotificationRead,
        resetAllDemoData,
        isSearchOpen,
        setIsSearchOpen,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isWhatsAppModalOpen,
        setIsWhatsAppModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
