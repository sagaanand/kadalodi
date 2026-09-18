import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  Anchor,
  FileCheck2,
  Warehouse,
  Truck,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Package
} from 'lucide-react';

export const MaldivesDashboard: React.FC = () => {
  const { orders, shipments, customs, deliveries } = useApp();

  // Metrics (Requirement 17)
  const incomingShipments = shipments.filter(s => s.status === 'In Transit').length;
  const customsPending = customs.filter(c => c.status === 'Under Review' || c.status === 'Documentation Pending').length;
  const customsCleared = customs.filter(c => c.status === 'Cleared').length;
  const atMaldivesHub = orders.filter(o => o.status === 'arrived_maldives' || o.status === 'customs_clearance').length;
  const outForDelivery = deliveries.filter(d => d.status === 'Out for Delivery' || d.status === 'Picked Up').length;
  const deliveredToday = orders.filter(o => o.status === 'delivered').length;

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Malé Port & Island Operations Center
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mt-1">
            Maldives Operations Gateway
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Vessel berthing, Maldives Customs clearance, Hulhumalé distribution hub, and multi-island courier dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/maldives/customs"
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-navy-900 text-xs font-semibold shadow-2xs"
          >
            Customs Queue ({customsPending})
          </Link>
          <Link
            to="/maldives/delivery"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
          >
            Island Delivery ({outForDelivery})
          </Link>
        </div>
      </div>

      {/* KPI Cards Deck (Requirement 17) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Incoming Vessels</span>
          <div className="text-2xl font-black text-navy-900 mt-1">{incomingShipments}</div>
          <span className="text-[10px] text-ocean-600 font-medium mt-1 inline-block">Approaching Malé</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Customs Pending</span>
          <div className="text-2xl font-black text-amber-700 mt-1">{customsPending}</div>
          <span className="text-[10px] text-amber-500 font-medium mt-1 inline-block">Under review</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Customs Cleared</span>
          <div className="text-2xl font-black text-emerald-700 mt-1">{customsCleared}</div>
          <span className="text-[10px] text-emerald-600 font-medium mt-1 inline-block">Released from Port</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">At Maldives Hub</span>
          <div className="text-2xl font-black text-purple-700 mt-1">{atMaldivesHub}</div>
          <span className="text-[10px] text-purple-500 font-medium mt-1 inline-block">Hulhumalé Gateway</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Out for Delivery</span>
          <div className="text-2xl font-black text-sky-700 mt-1">{outForDelivery}</div>
          <span className="text-[10px] text-sky-600 font-medium mt-1 inline-block">With island couriers</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Delivered</span>
          <div className="text-2xl font-black text-emerald-800 mt-1">{deliveredToday}</div>
          <span className="text-[10px] text-emerald-600 font-medium mt-1 inline-block">Customer handovers</span>
        </div>
      </div>

      {/* 4 Operations Sub-sections (Requirement 17) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 1. Arrivals */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-ocean-100 text-ocean-700 flex items-center justify-center">
                <Anchor className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-ocean-700 bg-ocean-50 px-2 py-0.5 rounded">Berth 3</span>
            </div>
            <h3 className="font-bold text-base text-navy-900 mt-3">Port Arrivals</h3>
            <p className="text-xs text-slate-500 mt-1">
              Scheduled cargo container vessels from Chennai, Tuticorin & Cochin.
            </p>
          </div>
          <Link
            to="/maldives/arrivals"
            className="pt-3 border-t border-slate-100 text-xs font-bold text-ocean-600 hover:text-ocean-700 flex items-center justify-between"
          >
            <span>Inspect Vessel Dockings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 2. Customs */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">{customsPending} Pending</span>
            </div>
            <h3 className="font-bold text-base text-navy-900 mt-3">Maldives Customs</h3>
            <p className="text-xs text-slate-500 mt-1">
              MIRA electronic duty declarations, inspection holds, and import releases.
            </p>
          </div>
          <Link
            to="/maldives/customs"
            className="pt-3 border-t border-slate-100 text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center justify-between"
          >
            <span>Review Declarations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3. Maldives Warehouse */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Warehouse className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">Sorting</span>
            </div>
            <h3 className="font-bold text-base text-navy-900 mt-3">Maldives Hub</h3>
            <p className="text-xs text-slate-500 mt-1">
              Customs-cleared packages sorted by atoll (Malé, Hulhumalé, Addu, South Atolls).
            </p>
          </div>
          <Link
            to="/maldives/warehouse"
            className="pt-3 border-t border-slate-100 text-xs font-bold text-purple-700 hover:text-purple-800 flex items-center justify-between"
          >
            <span>View Hub Sorting</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4. Local Delivery */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{outForDelivery} Active</span>
            </div>
            <h3 className="font-bold text-base text-navy-900 mt-3">Island Delivery</h3>
            <p className="text-xs text-slate-500 mt-1">
              Van dispatch in Malé/Hulhumalé and inter-atoll ferry cargo handovers.
            </p>
          </div>
          <Link
            to="/maldives/delivery"
            className="pt-3 border-t border-slate-100 text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center justify-between"
          >
            <span>Manage Couriers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Active Maldives Deliveries Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-navy-900">Live Island Delivery Queue</h3>
            <p className="text-xs text-slate-500">Orders currently assigned to drivers across Malé and outer islands</p>
          </div>
          <Link
            to="/maldives/delivery"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>Delivery Management</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5">Order ID</th>
                <th className="px-6 py-3.5">Customer</th>
                <th className="px-6 py-3.5">Island</th>
                <th className="px-6 py-3.5">Driver Assigned</th>
                <th className="px-6 py-3.5">Area & Slot</th>
                <th className="px-6 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {deliveries.map(d => (
                <tr key={d.id} className="hover:bg-slate-50/70">
                  <td className="px-6 py-4 font-mono font-bold text-navy-900">
                    <Link to={`/track/${d.orderId}`} className="hover:text-ocean-600">
                      {d.orderId}
                    </Link>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-800">{d.customerName}</td>
                  <td className="px-6 py-4 font-bold text-ocean-700">{d.island}</td>
                  <td className="px-6 py-4 font-semibold text-slate-800">{d.driverName}</td>
                  <td className="px-6 py-4 text-slate-500">
                    {d.islandArea} • {d.timeSlot}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      d.status === 'Out for Delivery' ? 'bg-sky-100 text-sky-800' :
                      d.status === 'Picked Up' ? 'bg-amber-100 text-amber-800' :
                      d.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
