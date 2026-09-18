import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  PackageCheck,
  Warehouse,
  Ship,
  Anchor,
  FileCheck2,
  Truck,
  Boxes,
  Calculator,
  BarChart3,
  Users,
  Settings,
  ShieldAlert,
  ArrowRightLeft
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const { role } = useApp();

  if (role === 'customer') return null;

  const indiaItems = [
    { label: 'India Operations Hub', path: '/india', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Procurement & Sourcing', path: '/india/procurement', icon: <PackageCheck className="w-4 h-4" /> },
    { label: 'Warehouse & Sea-Packing', path: '/india/warehouse', icon: <Warehouse className="w-4 h-4" /> },
    { label: 'Export Consignments', path: '/india/shipments', icon: <Ship className="w-4 h-4" /> },
  ];

  const maldivesItems = [
    { label: 'Maldives Hub Overview', path: '/maldives', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Port Vessel Arrivals', path: '/maldives/arrivals', icon: <Anchor className="w-4 h-4" /> },
    { label: 'Customs Declarations', path: '/maldives/customs', icon: <FileCheck2 className="w-4 h-4" /> },
    { label: 'Island Hub Warehouse', path: '/maldives/warehouse', icon: <Warehouse className="w-4 h-4" /> },
    { label: 'Local Island Delivery', path: '/maldives/delivery', icon: <Truck className="w-4 h-4" /> },
  ];

  const adminItems = [
    { label: 'Command Center', path: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Product Catalogue', path: '/admin/products', icon: <Boxes className="w-4 h-4" /> },
    { label: 'Pricing Engine Demo', path: '/admin/pricing', icon: <Calculator className="w-4 h-4" /> },
    { label: 'Master Orders', path: '/admin/orders', icon: <ArrowRightLeft className="w-4 h-4" /> },
    { label: 'Network Reports', path: '/admin/reports', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  const items =
    role === 'india_ops' ? indiaItems :
    role === 'maldives_ops' ? maldivesItems : adminItems;

  const roleTitle =
    role === 'india_ops' ? 'India Logistics Ops' :
    role === 'maldives_ops' ? 'Maldives Port & Delivery' : 'Kadalodi Command HQ';

  return (
    <aside className="w-64 bg-[#08182B] text-slate-300 border-r border-slate-800 flex-shrink-0 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between hidden md:flex">
      <div>
        <div className="px-3 py-2 mb-4 bg-slate-900/60 rounded-xl border border-slate-800">
          <div className="text-[10px] font-mono uppercase tracking-wider text-ocean-400 font-bold">
            OPERATIONAL DOMAIN
          </div>
          <div className="text-sm font-bold text-white mt-0.5">{roleTitle}</div>
        </div>

        <nav className="space-y-1">
          {items.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/india' || item.path === '/maldives' || item.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-ocean-600 text-white shadow-md shadow-ocean-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Cross-border live route status widget */}
      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
        <div className="flex items-center justify-between text-[11px] font-semibold text-ocean-300 mb-1">
          <span>Ocean Transit Corridor</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <p className="text-[11px] text-slate-400">
          Chennai ➔ Malé Seaport: Active vessels on schedule.
        </p>
      </div>
    </aside>
  );
};
