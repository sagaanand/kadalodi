import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Ship, ShoppingBag, ClipboardList,
  Bell, Search, ShoppingCart, LogOut, X, Send,
  Home, Navigation, User
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NotificationCenter } from '../common/NotificationCenter';
import { CartDrawer } from '../customer/CartDrawer';
import { WhatsAppConcierge } from '../common/WhatsAppConcierge';

interface BottomTab {
  label: string;
  path: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  exact?: boolean;
}

const TABS: BottomTab[] = [
  {
    label: 'Home',
    path: '/',
    icon: <Home className="w-5 h-5" />,
    activeIcon: <Home className="w-5 h-5" fill="currentColor" />,
    exact: true
  },
  {
    label: 'Shop',
    path: '/shop',
    icon: <ShoppingBag className="w-5 h-5" />,
    activeIcon: <ShoppingBag className="w-5 h-5" fill="currentColor" />
  },
  {
    label: 'Track',
    path: '/track/KD-10284',
    icon: <Navigation className="w-5 h-5" />,
    activeIcon: <Navigation className="w-5 h-5" fill="currentColor" />
  },
  {
    label: 'Orders',
    path: '/orders',
    icon: <ClipboardList className="w-5 h-5" />,
    activeIcon: <ClipboardList className="w-5 h-5" />
  },
  {
    label: 'Request',
    path: '/request-from-india',
    icon: <Send className="w-5 h-5" />,
    activeIcon: <Send className="w-5 h-5" fill="currentColor" />
  }
];

export const CustomerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { cartTotals, notifications, logout, setIsSearchOpen, setIsCartDrawerOpen } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const unread = notifications.filter(n => !n.read).length;

  const isTabActive = (tab: BottomTab) => {
    if (tab.path === '/track/KD-10284') return location.pathname.startsWith('/track');
    if (tab.exact) return location.pathname === tab.path;
    return location.pathname.startsWith(tab.path);
  };

  const handleLogout = () => { logout(); navigate('/login', { replace: true }); };

  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#EBF3FA' }}>

      {/* ══ STICKY TOP HEADER ══════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-30" style={{ background: '#0B1E36' }}>
        {/* Main header row */}
        <div className="flex items-center gap-3 px-4 py-3">
          {/* Logo + Brand */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #0369A1, #0891B2)' }}>
                <Ship className="w-5 h-5 text-white" />
              </div>
              {/* Ripple */}
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0B1E36]" />
            </div>
            <div>
              <div className="text-base font-black text-white tracking-tight leading-none">KADALODI</div>
              <div className="text-[9px] text-sky-400 font-semibold tracking-[0.2em] uppercase leading-none mt-0.5">
                India → Maldives
              </div>
            </div>
          </Link>

          <div className="flex-1" />

          {/* Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-xl text-sky-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <button
            onClick={() => setIsNotifOpen(true)}
            className="relative p-2 rounded-xl text-sky-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-400 rounded-full ring-2 ring-[#0B1E36]" />
            )}
          </button>

          {/* Cart */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
            style={{ background: 'linear-gradient(135deg, #0369A1, #0891B2)' }}
          >
            <ShoppingCart className="w-4 h-4 text-white" />
            <span className="text-white text-xs">
              {cartTotals.itemCount > 0 ? `${cartTotals.itemCount}` : ''}
            </span>
            {cartTotals.itemCount > 0 && (
              <span className="text-white text-xs font-bold hidden sm:inline">
                MVR {cartTotals.subtotalMvr.toLocaleString()}
              </span>
            )}
          </button>

          {/* User avatar */}
          <button
            onClick={() => setIsMoreOpen(true)}
            className="relative w-9 h-9 rounded-xl overflow-hidden ring-2 ring-sky-500/40 hover:ring-sky-400 transition-all"
          >
            <img src="/avatars/ahmed.jpg" alt="Ahmed" className="w-full h-full object-cover object-top" />
          </button>
        </div>

        {/* Ship route mini-ticker */}
        <div className="flex items-center gap-2 px-4 pb-2.5 text-[10px] text-sky-400/70 font-medium overflow-hidden">
          <span className="flex items-center gap-1 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE
          </span>
          <div className="flex-1 overflow-hidden whitespace-nowrap">
            <span className="ticker-scroll inline-block" style={{ animation: 'tickerScroll 25s linear infinite' }}>
              🚢 MV Maldivian Express: Laccadive Sea (ETA Malé 24 Sep) &nbsp;&nbsp;·&nbsp;&nbsp;
              ⚓ Cochin Consolidation: 22 Sep cutoff &nbsp;&nbsp;·&nbsp;&nbsp;
              📦 Hulhumalé Hub: 54 packages dispatched today &nbsp;&nbsp;·&nbsp;&nbsp;
              🌊 Corridor: All atolls active
            </span>
          </div>
        </div>
      </header>

      {/* ══ MAIN CONTENT ═══════════════════════════════════════════════════════ */}
      <main className="flex-1 overflow-y-auto pb-24">
        {children}
      </main>

      {/* ══ BOTTOM TAB BAR ═════════════════════════════════════════════════════ */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-30 flex items-end justify-around px-2 pt-2 pb-safe"
        style={{
          background: 'rgba(8, 24, 43, 0.97)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(56, 189, 248, 0.12)',
          paddingBottom: 'max(env(safe-area-inset-bottom), 8px)',
          boxShadow: '0 -8px 32px rgba(0,0,0,0.4)'
        }}
      >
        {TABS.map(tab => {
          const active = isTabActive(tab);
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 min-w-[52px] rounded-2xl transition-all duration-200 group relative"
            >
              {/* Active background glow */}
              {active && (
                <span
                  className="absolute inset-0 rounded-2xl"
                  style={{ background: 'rgba(8, 145, 178, 0.15)' }}
                />
              )}

              {/* Icon */}
              <span
                className={`relative z-10 transition-all duration-200 ${
                  active ? 'text-sky-400 scale-110' : 'text-slate-500 group-hover:text-slate-300'
                }`}
                style={active ? { filter: 'drop-shadow(0 0 6px rgba(56, 189, 248, 0.6))' } : {}}
              >
                {active ? tab.activeIcon : tab.icon}
              </span>

              {/* Label */}
              <span
                className={`relative z-10 text-[10px] font-semibold transition-colors leading-none ${
                  active ? 'text-sky-400' : 'text-slate-600'
                }`}
              >
                {tab.label}
              </span>

              {/* Active dot indicator */}
              {active && (
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-sky-400"
                  style={{ boxShadow: '0 0 8px rgba(56, 189, 248, 0.8)' }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ══ PROFILE SLIDE-UP ════════════════════════════════════════════════ */}
      {isMoreOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMoreOpen(false)} />
          <div
            className="relative rounded-t-3xl p-6 pb-12 space-y-4"
            style={{ background: '#0B1E36', border: '1px solid rgba(56,189,248,0.15)' }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-base font-bold text-white">My Account</div>
              <button onClick={() => setIsMoreOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile card */}
            <div
              className="flex items-center gap-4 p-4 rounded-2xl"
              style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.15)' }}
            >
              <img
                src="/avatars/ahmed.jpg"
                alt="Ahmed Hassan"
                className="w-14 h-14 rounded-2xl object-cover object-top ring-2 ring-sky-500/40"
              />
              <div>
                <div className="text-white font-bold text-base">Ahmed Hassan</div>
                <div className="text-sky-400 text-sm font-medium">Customer · Hulhumalé</div>
                <div className="text-slate-500 text-xs mt-0.5">+960 778-4321</div>
              </div>
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'My Orders', icon: <ClipboardList className="w-4 h-4" />, path: '/orders' },
                { label: 'Track Shipment', icon: <Navigation className="w-4 h-4" />, path: '/track/KD-10284' },
                { label: 'Request Item', icon: <Send className="w-4 h-4" />, path: '/request-from-india' },
                { label: 'Shop Catalog', icon: <ShoppingBag className="w-4 h-4" />, path: '/shop' },
              ].map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMoreOpen(false)}
                  className="flex items-center gap-2.5 p-3.5 rounded-xl transition-all hover:scale-[1.02]"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <span className="text-sky-400">{item.icon}</span>
                  <span className="text-slate-300 text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-rose-400 text-sm font-semibold transition-all hover:bg-rose-500/10"
              style={{ border: '1px solid rgba(239,68,68,0.2)' }}
            >
              <LogOut className="w-4 h-4" />
              Switch Account
            </button>
          </div>
        </div>
      )}

      {/* Notifications */}
      <NotificationCenter isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />

      {/* Cart & WhatsApp */}
      <CartDrawer />
      <WhatsAppConcierge />
    </div>
  );
};
