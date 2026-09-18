import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Ship,
  Search,
  ShoppingBag,
  Bell,
  Menu,
  X,
  UserCheck,
  Building2,
  Anchor,
  Shield,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { UserRole } from '../../types';
import { NotificationCenter } from '../common/NotificationCenter';

const ROLE_META: Record<UserRole, {
  name: string;
  title: string;
  subtitle: string;
  avatar: string;
  icon: React.ReactNode;
  accentText: string;
  accentBg: string;
  accentBorder: string;
}> = {
  customer: {
    name: 'Ahmed Hassan',
    title: 'Customer',
    subtitle: 'Hulhumalé, Maldives',
    avatar: 'AH',
    icon: <UserCheck className="w-4 h-4" />,
    accentText: 'text-sky-700',
    accentBg: 'bg-sky-50',
    accentBorder: 'border-sky-200',
  },
  india_ops: {
    name: 'Rajesh Kumar',
    title: 'India Operations',
    subtitle: 'Chennai Sourcing Hub',
    avatar: 'RK',
    icon: <Building2 className="w-4 h-4" />,
    accentText: 'text-indigo-700',
    accentBg: 'bg-indigo-50',
    accentBorder: 'border-indigo-200',
  },
  maldives_ops: {
    name: 'Ibrahim Mohamed',
    title: 'Maldives Operations',
    subtitle: 'Malé Port & Delivery',
    avatar: 'IM',
    icon: <Anchor className="w-4 h-4" />,
    accentText: 'text-emerald-700',
    accentBg: 'bg-emerald-50',
    accentBorder: 'border-emerald-200',
  },
  admin: {
    name: 'Kadalodi Admin',
    title: 'Admin',
    subtitle: 'Command Center · Trichy HQ',
    avatar: 'KA',
    icon: <Shield className="w-4 h-4" />,
    accentText: 'text-amber-700',
    accentBg: 'bg-amber-50',
    accentBorder: 'border-amber-200',
  }
};

export const Navbar: React.FC = () => {
  const {
    role,
    logout,
    cartTotals,
    notifications,
    setIsSearchOpen,
    setIsCartDrawerOpen
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const unreadCount = notifications.filter(n => !n.read).length;
  const meta = ROLE_META[role];

  // Close user menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    logout();
    navigate('/login', { replace: true });
  };

  // Navigation links per role
  const navLinks: { label: string; path: string }[] =
    role === 'customer'
      ? [
          { label: 'Shop Catalogue', path: '/shop' },
          { label: 'Request from India', path: '/request-from-india' },
          { label: 'Track Order', path: '/track/KD-10284' },
          { label: 'My Orders', path: '/orders' }
        ]
      : role === 'india_ops'
      ? [
          { label: 'Overview', path: '/india' },
          { label: 'Procurement', path: '/india/procurement' },
          { label: 'Warehouse', path: '/india/warehouse' },
          { label: 'Export Shipments', path: '/india/shipments' }
        ]
      : role === 'maldives_ops'
      ? [
          { label: 'Overview', path: '/maldives' },
          { label: 'Port Arrivals', path: '/maldives/arrivals' },
          { label: 'Customs', path: '/maldives/customs' },
          { label: 'Island Delivery', path: '/maldives/delivery' }
        ]
      : [
          { label: 'Command Center', path: '/admin' },
          { label: 'Products', path: '/admin/products' },
          { label: 'Pricing Engine', path: '/admin/pricing' },
          { label: 'All Orders', path: '/admin/orders' }
        ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/92 backdrop-blur-lg border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">

            {/* ── Logo ── */}
            <div className="flex items-center gap-5">
              <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
                <div className="w-9 h-9 rounded-xl ocean-gradient flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <Ship className="w-4.5 h-4.5 text-sky-300" style={{ width: 18, height: 18 }} />
                </div>
                <div>
                  <div className="font-extrabold text-lg tracking-tight text-navy-900 leading-none">KADALODI</div>
                  <div className="text-[9px] text-slate-400 font-semibold tracking-[0.18em] uppercase">India → Maldives</div>
                </div>
              </Link>

              {/* Desktop nav links */}
              <nav className="hidden lg:flex items-center gap-0.5 text-sm font-medium">
                {navLinks.map(link => {
                  const isActive = location.pathname === link.path ||
                    (link.path !== '/' && location.pathname.startsWith(link.path));
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`px-3 py-1.5 rounded-lg transition-colors ${
                        isActive
                          ? 'text-ocean-700 bg-ocean-50 font-semibold'
                          : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-2">

              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-navy-900 hover:bg-slate-200 transition-all text-xs border border-slate-200"
                title="Search (⌘K)"
              >
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span>Search…</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white text-[10px] font-mono shadow border border-slate-200">⌘K</kbd>
              </button>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="sm:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
              >
                <Search className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
              </button>

              {/* Notifications */}
              <button
                onClick={() => setIsNotifOpen(true)}
                className="relative p-2 rounded-xl text-slate-500 hover:text-navy-900 hover:bg-slate-100 transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
                )}
              </button>

              {/* Cart — only for customers */}
              {role === 'customer' && (
                <button
                  onClick={() => setIsCartDrawerOpen(true)}
                  className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy-900 text-white hover:bg-[#1a2f4f] transition-all shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-semibold">
                    MVR {cartTotals.subtotalMvr.toLocaleString()}
                  </span>
                  {cartTotals.itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-ocean-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                      {cartTotals.itemCount}
                    </span>
                  )}
                </button>
              )}

              {/* User avatar / menu */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl border transition-all ${
                    isUserMenuOpen
                      ? `${meta.accentBg} ${meta.accentBorder}`
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <img
                    src="/avatars/ahmed.jpg"
                    alt="Ahmed Hassan"
                    className="w-7 h-7 rounded-lg object-cover object-top flex-shrink-0"
                  />
                  <div className="hidden md:block text-left">
                    <div className="text-xs font-bold text-navy-900 leading-none">{meta.name}</div>
                    <div className={`text-[10px] font-medium leading-none mt-0.5 ${meta.accentText}`}>{meta.title}</div>
                  </div>
                  <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50">
                    {/* User card header */}
                    <div className={`mx-2 mb-2 p-3 rounded-xl ${meta.accentBg} border ${meta.accentBorder}`}>
                      <div className="flex items-center gap-3">
                        <img
                          src="/avatars/ahmed.jpg"
                          alt="Ahmed Hassan"
                          className="w-9 h-9 rounded-xl object-cover object-top border-2 border-white"
                        />
                        <div>
                          <div className={`text-sm font-bold ${meta.accentText}`}>{meta.name}</div>
                          <div className="text-xs text-slate-500">{meta.subtitle}</div>
                        </div>
                      </div>
                      <div className={`mt-2 text-[10px] font-semibold uppercase tracking-wider ${meta.accentText} opacity-70`}>
                        {meta.title} · Demo Account
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 flex items-center gap-2.5 text-sm text-slate-600 hover:bg-rose-50 hover:text-rose-700 transition-colors rounded-lg mx-0"
                      >
                        <LogOut className="w-4 h-4" />
                        <div>
                          <div className="font-semibold text-xs">Switch Account</div>
                          <div className="text-[10px] text-slate-400">Back to role selection</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl text-slate-500 lg:hidden hover:bg-slate-100 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1">
            <div className="text-[11px] font-semibold uppercase text-slate-400 px-3 py-1">
              {meta.title}
            </div>
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                  location.pathname === link.path
                    ? 'bg-ocean-50 text-ocean-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-slate-100 mt-2 pt-2">
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Switch Account
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Slide-out notifications */}
      <NotificationCenter isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  );
};
