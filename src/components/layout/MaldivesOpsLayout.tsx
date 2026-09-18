import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Ship, LayoutDashboard, Container, ClipboardCheck, Truck,
  Bell, LogOut, ChevronRight, Menu, X, Anchor, Search
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const NAV = [
  { label: 'Dashboard', path: '/maldives', icon: <LayoutDashboard style={{ width: 18, height: 18 }} /> },
  { label: 'Port Arrivals', path: '/maldives/arrivals', icon: <Container style={{ width: 18, height: 18 }} /> },
  { label: 'Customs Clearance', path: '/maldives/customs', icon: <ClipboardCheck style={{ width: 18, height: 18 }} /> },
  { label: 'Island Delivery', path: '/maldives/delivery', icon: <Truck style={{ width: 18, height: 18 }} /> },
];

export const MaldivesOpsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { notifications, logout, setIsSearchOpen } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const unread = notifications.filter(n => !n.read).length;

  const handleLogout = () => { logout(); navigate('/login', { replace: true }); };

  return (
    <div className="min-h-screen flex" style={{ background: '#052E1C' }}>
      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:flex
      `} style={{ background: '#052E1C', borderRight: '1px solid rgba(255,255,255,0.06)' }}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/5">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center flex-shrink-0">
            <Anchor className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-black text-white tracking-tight">KADALODI</div>
            <div className="text-[9px] text-emerald-400 font-bold tracking-widest uppercase">Maldives Ops</div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto text-slate-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User card */}
        <div className="mx-3 my-3 p-3 rounded-xl" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <div className="flex items-center gap-3">
            <img src="/avatars/ibrahim.jpg" alt="Ibrahim" className="w-9 h-9 rounded-lg object-cover object-top" />
            <div>
              <div className="text-xs font-bold text-white">Ibrahim Mohamed</div>
              <div className="text-[10px] text-emerald-400">Malé Commercial Port</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 pt-2 space-y-0.5">
          <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-3 mb-2">Port Operations</div>
          {NAV.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${isActive
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                <span className={isActive ? 'text-white' : 'text-slate-500'}>{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-emerald-300" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-4 space-y-1 border-t border-white/5 pt-3">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-rose-400 hover:bg-rose-500/8 transition-all">
            <LogOut className="w-4 h-4" />
            Switch Account
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* ── Main area ───────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center gap-3 px-6 py-4 border-b border-white/5 sticky top-0 z-20" style={{ background: '#052E1C' }}>
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-400 hover:text-white">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <div className="text-xs text-slate-500 font-medium">
              Kadalodi · <span className="text-emerald-400">Maldives Operations</span>
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
        <main className="flex-1 overflow-auto p-4 lg:p-6 pb-24 lg:pb-6" style={{ background: '#071F12' }}>
          {children}
        </main>
      </div>

      {/* ── Mobile Bottom Nav ─────────────────────────────── */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-end justify-around px-2 pt-2"
        style={{
          background: 'rgba(5, 46, 28, 0.97)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(16,185,129,0.15)',
          paddingBottom: 'max(env(safe-area-inset-bottom), 8px)',
          boxShadow: '0 -8px 32px rgba(0,0,0,0.5)'
        }}
      >
        {NAV.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl relative min-w-[48px]"
            >
              {isActive && <span className="absolute inset-0 rounded-2xl" style={{ background: 'rgba(16,185,129,0.15)' }} />}
              <span
                className={`relative z-10 transition-all ${isActive ? 'text-emerald-400 scale-110' : 'text-slate-600'}`}
                style={isActive ? { filter: 'drop-shadow(0 0 5px rgba(16,185,129,0.7))' } : {}}
              >
                {item.icon}
              </span>
              <span className={`relative z-10 text-[10px] font-semibold leading-none ${isActive ? 'text-emerald-400' : 'text-slate-600'}`}>
                {item.label.split(' ')[0]}
              </span>
              {isActive && <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-emerald-400" />}
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
