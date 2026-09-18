import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { DeliveryAssignment } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  Truck,
  MapPin,
  Phone,
  User,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

export const DeliveryPage: React.FC = () => {
  const { deliveries, updateDeliveryStatus } = useApp();
  const [filterIsland, setFilterIsland] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const driversList = ['Ali Moosa', 'Ibrahim Rasheed', 'Ahmed Naeem', 'Hussain Latheef'];

  const filtered = deliveries.filter(d => {
    const matchesIsland = filterIsland === 'All' || d.island === filterIsland;
    const matchesSearch =
      d.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.driverName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesIsland && matchesSearch;
  });

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Island Courier & Inter-Atoll Delivery Desk
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mt-1">
            Last-Mile Island Dispatch
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Van fleet routing in Malé and Hulhumalé; speed ferry cargo connections for Addu, Fuvahmulah, and northern atolls.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
            {deliveries.filter(d => d.status === 'Out for Delivery').length} Out on Island Routes
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search driver, order KD-XXXX, or customer..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-navy-900 outline-none focus:border-ocean-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {['All', 'Hulhumalé', 'Malé', 'Addu City'].map(island => (
            <button
              key={island}
              onClick={() => setFilterIsland(island)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterIsland === island
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {island}
            </button>
          ))}
        </div>
      </div>

      {/* Delivery Cards / Queue Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(del => (
          <div
            key={del.id}
            className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono font-black text-sm text-navy-900">{del.orderId}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  del.status === 'Out for Delivery' ? 'bg-sky-100 text-sky-800 animate-pulse' :
                  del.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                  del.status === 'Picked Up' ? 'bg-amber-100 text-amber-800' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {del.status}
                </span>
              </div>

              <div className="mt-3">
                <h4 className="font-bold text-sm text-navy-900">{del.customerName}</h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{del.customerPhone}</span>
                </div>
              </div>

              {/* Area & Location */}
              <div className="mt-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-ocean-700">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{del.island} • {del.islandArea}</span>
                </div>
                <div className="text-slate-500 text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>Slot: {del.timeSlot}</span>
                </div>
              </div>
            </div>

            {/* Courier Assignment & Status Controls */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Assigned Courier:</span>
                <span className="font-bold text-navy-900">{del.driverName}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => updateDeliveryStatus(del.id, 'Out for Delivery')}
                  className="py-1.5 px-2 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 font-semibold text-[11px] text-center"
                >
                  Out for Delivery
                </button>
                <button
                  onClick={() => updateDeliveryStatus(del.id, 'Delivered')}
                  className="py-1.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] text-center shadow-2xs"
                >
                  Confirm Delivered
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
