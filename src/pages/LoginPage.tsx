import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Ship, Anchor, Building2, Shield, ArrowRight, Leaf } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { UserRole } from '../types';

interface DemoUser {
  role: UserRole;
  name: string;
  title: string;
  location: string;
  photo: string;
  icon: React.ReactNode;
  accentFrom: string;
  accentTo: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
  redirectTo: string;
  description: string;
  tag: string;
}

const DEMO_USERS: DemoUser[] = [
  {
    role: 'customer',
    name: 'Ahmed Hassan',
    title: 'Customer',
    location: 'Hulhumalé, North Malé Atoll',
    photo: '/avatars/ahmed.jpg',
    icon: <Ship className="w-4 h-4" />,
    accentFrom: 'from-sky-500',
    accentTo: 'to-cyan-400',
    borderColor: 'border-sky-300',
    badgeBg: 'bg-sky-100',
    badgeText: 'text-sky-700',
    redirectTo: '/',
    description: 'Browse, shop, and track your orders from India to your island doorstep.',
    tag: 'Shopping Portal'
  },
  {
    role: 'india_ops',
    name: 'Rajesh Kumar',
    title: 'India Operations',
    location: 'Ambattur Hub, Chennai',
    photo: '/avatars/rajesh.jpg',
    icon: <Building2 className="w-4 h-4" />,
    accentFrom: 'from-indigo-600',
    accentTo: 'to-violet-500',
    borderColor: 'border-indigo-300',
    badgeBg: 'bg-indigo-100',
    badgeText: 'text-indigo-700',
    redirectTo: '/india',
    description: 'Manage procurement from Tamil Nadu farms, warehouse packing & ocean cargo dispatch.',
    tag: 'Ops Dashboard'
  },
  {
    role: 'maldives_ops',
    name: 'Ibrahim Mohamed',
    title: 'Maldives Operations',
    location: 'Malé Commercial Port',
    photo: '/avatars/ibrahim.jpg',
    icon: <Anchor className="w-4 h-4" />,
    accentFrom: 'from-emerald-500',
    accentTo: 'to-teal-400',
    borderColor: 'border-emerald-300',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-700',
    redirectTo: '/maldives',
    description: 'Receive ocean shipments, clear customs, and dispatch deliveries across the atolls.',
    tag: 'Port Dashboard'
  },
  {
    role: 'admin',
    name: 'Priya Nataraj',
    title: 'Platform Admin',
    location: 'Trichy HQ, Tamil Nadu',
    photo: '/avatars/admin.jpg',
    icon: <Shield className="w-4 h-4" />,
    accentFrom: 'from-amber-500',
    accentTo: 'to-orange-400',
    borderColor: 'border-amber-300',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-700',
    redirectTo: '/admin',
    description: 'Full network visibility — products, pricing, orders, fleet KPIs and route analytics.',
    tag: 'Admin Center'
  }
];

export const LoginPage: React.FC = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isEntering, setIsEntering] = useState(false);

  const handleLogin = (user: DemoUser) => {
    if (isEntering) return;
    setSelectedRole(user.role);
    setIsEntering(true);
    setTimeout(() => {
      login(user.role);
      navigate(user.redirectTo, { replace: true });
    }, 700);
  };

  return (
    <div className="min-h-screen flex bg-[#06111E] overflow-hidden">

      {/* ── Left: Brand Column ──────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[45%] relative flex-col overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 ocean-gradient" />

        {/* Animated wave */}
        <div className="absolute bottom-0 left-0 right-0 h-48 opacity-10">
          <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full h-full">
            <path fill="white" d="M0,100L60,90C120,80,240,60,360,65C480,70,600,100,720,105C840,110,960,90,1080,75C1200,60,1320,65,1380,68L1440,70L1440,200L0,200Z" />
          </svg>
        </div>

        {/* Stars / dots */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70}%`,
            }}
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
          />
        ))}

        <div className="relative z-10 flex flex-col h-full p-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center">
              <Ship className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <div className="text-2xl font-black text-white tracking-tight">KADALODI</div>
              <div className="text-[10px] text-sky-300 font-bold tracking-[0.3em] uppercase">Pvt Ltd</div>
            </div>
          </div>

          {/* Center content */}
          <div className="flex-1 flex flex-col justify-center max-w-sm">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h1 className="text-5xl font-black text-white leading-[1.1] mb-6">
                Connecting<br />
                the <span className="text-sky-300">Islands.</span><br />
                Moving<br />
                <span className="text-cyan-300">Everyday Life.</span>
              </h1>
              <p className="text-sky-100/70 text-base leading-relaxed mb-8">
                Fresh vegetables, fruits, and staples sourced from Tamil Nadu — shipped weekly across the Indian Ocean to every atoll.
              </p>
            </motion.div>

            {/* Route graphic */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex items-center gap-4"
            >
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center mx-auto mb-2">
                  <Leaf className="w-5 h-5 text-amber-300" />
                </div>
                <div className="text-[10px] text-sky-200/60 font-semibold uppercase tracking-wider">Farm</div>
                <div className="text-[10px] text-sky-200/40">Tamil Nadu</div>
              </div>

              <div className="flex-1 relative h-8 flex items-center">
                <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-amber-400/40 via-sky-400/60 to-emerald-400/40" />
                <motion.div
                  className="absolute w-3 h-3"
                  animate={{ left: ['0%', '100%', '0%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  style={{ transform: 'translateX(-50%)' }}
                >
                  <Ship className="w-3 h-3 text-sky-300" />
                </motion.div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center mx-auto mb-2">
                  <Anchor className="w-5 h-5 text-emerald-300" />
                </div>
                <div className="text-[10px] text-sky-200/60 font-semibold uppercase tracking-wider">Port</div>
                <div className="text-[10px] text-sky-200/40">Maldives</div>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-white/10">
              {[
                { value: '4–7', label: 'Days Transit' },
                { value: '20+', label: 'Atolls Served' },
                { value: '16+', label: 'Fresh SKUs' },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-2xl font-black text-white">{s.value}</div>
                  <div className="text-[11px] text-sky-300/60 font-medium mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-[11px] text-sky-200/30 font-medium">
            © 2026 Kadalodi Pvt Ltd · kadalodipvtltd.com
          </div>
        </div>
      </div>

      {/* ── Right: User Selection ────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col bg-[#F0F4F8] overflow-y-auto">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-3 p-6 bg-[#06111E]">
          <Ship className="w-6 h-6 text-sky-400" />
          <span className="text-white font-black text-xl">KADALODI</span>
        </div>

        <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 py-12">
          <div className="max-w-lg w-full mx-auto">

            {/* Header */}
            <div className="mb-8">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Demo Access · 4 Portals</p>
              <h2 className="text-3xl font-black text-[#06111E] leading-tight">
                Choose your portal
              </h2>
              <p className="mt-2 text-slate-500 text-sm">
                Each account shows a different part of the Kadalodi supply chain.
              </p>
            </div>

            {/* User cards grid */}
            <div className="grid grid-cols-1 gap-3">
              {DEMO_USERS.map((user, i) => {
                const isSelected = selectedRole === user.role;
                return (
                  <motion.button
                    key={user.role}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.35 }}
                    onClick={() => handleLogin(user)}
                    disabled={isEntering}
                    className={`
                      w-full text-left rounded-2xl border-2 bg-white transition-all duration-200 group overflow-hidden
                      ${isSelected
                        ? `${user.borderColor} shadow-lg shadow-black/8 scale-[1.01]`
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-md hover:shadow-black/6'
                      }
                    `}
                  >
                    <div className="flex items-center gap-0 h-full">
                      {/* Photo strip */}
                      <div className="relative w-20 h-24 flex-shrink-0 overflow-hidden rounded-l-2xl">
                        <img
                          src={user.photo}
                          alt={user.name}
                          className="w-full h-full object-cover object-top"
                        />
                        {/* Gradient overlay on photo */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${user.accentFrom} ${user.accentTo} opacity-20`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 px-4 py-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${user.badgeBg} ${user.badgeText}`}>
                                {user.tag}
                              </span>
                            </div>
                            <div className="text-sm font-bold text-[#06111E] leading-tight">{user.name}</div>
                            <div className="text-[11px] text-slate-400 font-medium">{user.title}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">📍 {user.location}</div>
                          </div>

                          <motion.div
                            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 bg-gradient-to-br ${user.accentFrom} ${user.accentTo}`}
                            animate={isSelected && isEntering ? { scale: [1, 1.3, 0], opacity: [1, 1, 0] } : {}}
                            transition={{ duration: 0.5 }}
                          >
                            <ArrowRight className="w-4 h-4 text-white" />
                          </motion.div>
                        </div>

                        {/* Description — expands on selection */}
                        <div className={`transition-all duration-300 overflow-hidden text-[11px] text-slate-500 leading-relaxed ${isSelected ? 'max-h-10 mt-2 opacity-100' : 'max-h-0 opacity-0'}`}>
                          {user.description}
                        </div>
                      </div>
                    </div>

                    {/* Bottom accent bar */}
                    <div className={`h-0.5 bg-gradient-to-r ${user.accentFrom} ${user.accentTo} transition-all duration-300 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                  </motion.button>
                );
              })}
            </div>

            {/* Entering state */}
            <AnimatePresence>
              {isEntering && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 flex items-center justify-center gap-3 text-sm text-slate-500"
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-sky-500"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
                      />
                    ))}
                  </div>
                  <span>Loading portal…</span>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mt-8 text-center text-[11px] text-slate-400">
              Demo environment · All data is simulated · No real transactions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
