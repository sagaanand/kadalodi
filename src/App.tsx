import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

// Shared overlays & auth
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { WhatsAppConcierge } from './components/common/WhatsAppConcierge';
import { CartDrawer } from './components/customer/CartDrawer';
import { LoginPage } from './pages/LoginPage';

// ── Role-specific layouts ────────────────────────────────────────────────────
import { CustomerLayout } from './components/layout/CustomerLayout';
import { IndiaOpsLayout } from './components/layout/IndiaOpsLayout';
import { MaldivesOpsLayout } from './components/layout/MaldivesOpsLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// ── Customer pages ───────────────────────────────────────────────────────────
import { CustomerHome } from './pages/customer/CustomerHome';
import { ShopCatalog } from './pages/customer/ShopCatalog';
import { ProductDetail } from './pages/customer/ProductDetail';
import { CartPage } from './pages/customer/CartPage';
import { CheckoutPage } from './pages/customer/CheckoutPage';
import { OrderConfirmation } from './pages/customer/OrderConfirmation';
import { OrderTracking } from './pages/customer/OrderTracking';
import { MyOrders } from './pages/customer/MyOrders';
import { RequestFromIndia } from './pages/customer/RequestFromIndia';

// ── India Ops pages ──────────────────────────────────────────────────────────
import { IndiaDashboard } from './pages/india/IndiaDashboard';
import { ProcurementPage } from './pages/india/ProcurementPage';
import { WarehousePage } from './pages/india/WarehousePage';
import { ShipmentsPage } from './pages/india/ShipmentsPage';

// ── Maldives Ops pages ───────────────────────────────────────────────────────
import { MaldivesDashboard } from './pages/maldives/MaldivesDashboard';
import { PortArrivalsPage } from './pages/maldives/PortArrivalsPage';
import { CustomsPage } from './pages/maldives/CustomsPage';
import { DeliveryPage } from './pages/maldives/DeliveryPage';
import { HubWarehousePage } from './pages/maldives/HubWarehousePage';

// ── Admin pages ──────────────────────────────────────────────────────────────
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminPricingEngine } from './pages/admin/AdminPricingEngine';

// ─── Customer portal (shipping-themed header + bottom tab bar) ───────────────
const CustomerPortal: React.FC = () => {
  const { setIsSearchOpen } = useApp();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setIsSearchOpen(true); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setIsSearchOpen]);

  return (
    <CustomerLayout>
      <Routes>
        <Route path="/" element={<CustomerHome />} />
        <Route path="/shop" element={<ShopCatalog />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
        <Route path="/track/:id" element={<OrderTracking />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/request-from-india" element={<RequestFromIndia />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CustomerLayout>
  );
};

// ─── India Ops portal (dark sidebar) ─────────────────────────────────────────
const IndiaPortal: React.FC = () => (
  <IndiaOpsLayout>
    <Routes>
      <Route path="/india" element={<IndiaDashboard />} />
      <Route path="/india/procurement" element={<ProcurementPage />} />
      <Route path="/india/warehouse" element={<WarehousePage />} />
      <Route path="/india/shipments" element={<ShipmentsPage />} />
      <Route path="*" element={<Navigate to="/india" replace />} />
    </Routes>
  </IndiaOpsLayout>
);

// ─── Maldives Ops portal (deep green sidebar) ────────────────────────────────
const MaldivesPortal: React.FC = () => (
  <MaldivesOpsLayout>
    <Routes>
      <Route path="/maldives" element={<MaldivesDashboard />} />
      <Route path="/maldives/arrivals" element={<PortArrivalsPage />} />
      <Route path="/maldives/customs" element={<CustomsPage />} />
      <Route path="/maldives/delivery" element={<DeliveryPage />} />
      <Route path="/maldives/hub" element={<HubWarehousePage />} />
      <Route path="*" element={<Navigate to="/maldives" replace />} />
    </Routes>
  </MaldivesOpsLayout>
);

// ─── Admin portal (dark amber sidebar) ───────────────────────────────────────
const AdminPortal: React.FC = () => (
  <AdminLayout>
    <Routes>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/pricing" element={<AdminPricingEngine />} />
      <Route path="/admin/products" element={<AdminDashboard />} />
      <Route path="/admin/orders" element={<AdminDashboard />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  </AdminLayout>
);

// ─── Auth gate + role-based portal routing ───────────────────────────────────
const AuthGate: React.FC = () => {
  const { isLoggedIn, role } = useApp();

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Redirect root to correct dashboard per role
  const RoleRouter: React.FC = () => {
    const navigate = useNavigate();
    useEffect(() => {
      if (role === 'india_ops') navigate('/india', { replace: true });
      else if (role === 'maldives_ops') navigate('/maldives', { replace: true });
      else if (role === 'admin') navigate('/admin', { replace: true });
    }, [navigate]);
    return null;
  };

  return (
    <>
      <GlobalSearchModal />
      <Routes>
        {/* Role-specific portals */}
        <Route path="/india/*" element={<IndiaPortal />} />
        <Route path="/maldives/*" element={<MaldivesPortal />} />
        <Route path="/admin/*" element={<AdminPortal />} />

        {/* Customer gets everything else */}
        <Route path="/*" element={
          role === 'customer'
            ? <CustomerPortal />
            : <><RoleRouter /><CustomerPortal /></>
        } />
      </Routes>
    </>
  );
};

// ─── App Root ────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AuthGate />
      </AppProvider>
    </BrowserRouter>
  );
}
