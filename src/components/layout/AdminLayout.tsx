import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, DollarSign, ShoppingCart,
  Bell, LogOut, ChevronRight, Menu, X, Shield, Search
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const NAV = [
  { label: 'Command Center', path: '/admin', icon: <LayoutDashboard style={{ width: 18, height: 18 }} /> },
  { label: 'Products', path: '/admin/products', icon: <Package style={{ width: 18, height: 18 }} /> },
  { label: 'Pricing Engine', path: '/admin/pricing', icon: <DollarSign style={{ width: 18, height: 18 }} /> },
  { label: 'All Orders', path: '/admin/orders', icon: <ShoppingCart style={{ width: 18, height: 18 }} /> },
];

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { notifications, logout, setIsSearchOpen } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const unread = notifications.filter(n => !n.read).length;

  const handleLogout = () => { logout(); navigate('/login', { replace: true }); };

  return (
    <div className="min-h-screen flex" style={{ background: '#1C1007' }}>
      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:flex
      `} style={{ background: '#1C1007', borderRight: '1px solid rgba(255,255,255,0.06)' }}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/5">
          <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center flex-shrink-0">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-black text-white tracking-tight">KADALODI</div>
            <div className="text-[9px] text-amber-400 font-bold tracking-widest uppercase">Admin Center</div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto text-slate-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User card */}
        <div className="mx-3 my-3 p-3 rounded-xl" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
          <div className="flex items-center gap-3">
            <img src="/avatars/admin.jpg" alt="Admin" className="w-9 h-9 rounded-lg object-cover object-top" />
            <div>
              <div className="text-xs font-bold text-white">Priya Nataraj</div>
              <div className="text-[10px] text-amber-400">Trichy HQ</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 pt-2 space-y-0.5">
          <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-3 mb-2">Platform Control</div>
          {NAV.map(item => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${isActive
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                <span className={isActive ? 'text-white' : 'text-slate-500'}>{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-amber-300" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-4 border-t border-white/5 pt-3">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-rose-400 hover:bg-rose-500/8 transition-all">
            <LogOut className="w-4 h-4" />
            Switch Account
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* ── Main area ───────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center gap-3 px-6 py-4 border-b border-white/5 sticky top-0 z-20" style={{ background: '#1C1007' }}>
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-400 hover:text-white">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <div className="text-xs text-slate-500 font-medium">
              Kadalodi · <span className="text-amber-400">Admin Command Center</span>
            </div>
          </div>
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-slate-500 hover:text-white transition-colors"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search…</span>
          </button>
          <button className="relative p-2 rounded-lg text-slate-500 hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <Bell className="w-4 h-4" />
            {unread > 0 && <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-500 rounded-full" />}
          </button>
        </header>
        <main className="flex-1 overflow-auto p-4 lg:p-6 pb-24 lg:pb-6" style={{ background: '#120B04' }}>
          {children}
        </main>
      </div>

      {/* ── Mobile Bottom Nav ─────────────────────────────── */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-end justify-around px-2 pt-2"
        style={{
          background: 'rgba(28, 16, 7, 0.97)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(245,158,11,0.15)',
          paddingBottom: 'max(env(safe-area-inset-bottom), 8px)',
          boxShadow: '0 -8px 32px rgba(0,0,0,0.5)'
        }}
      >
        {NAV.map(item => {
          const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl relative min-w-[48px]"
            >
              {isActive && <span className="absolute inset-0 rounded-2xl" style={{ background: 'rgba(245,158,11,0.12)' }} />}
              <span
                className={`relative z-10 transition-all ${isActive ? 'text-amber-400 scale-110' : 'text-slate-600'}`}
                style={isActive ? { filter: 'drop-shadow(0 0 5px rgba(245,158,11,0.7))' } : {}}
              >
                {item.icon}
              </span>
              <span className={`relative z-10 text-[10px] font-semibold leading-none ${isActive ? 'text-amber-400' : 'text-slate-600'}`}>
                {item.label.split(' ')[0]}
              </span>
              {isActive && <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-amber-400" />}
            </Link>
          );
        })}
        <button onClick={handleLogout} className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl min-w-[48px]">
          <LogOut className="text-slate-600" style={{ width: 18, height: 18 }} />
          <span className="text-[10px] font-semibold text-slate-600 leading-none">Exit</span>
        </button>
      </nav>
    </div>
  );
};
