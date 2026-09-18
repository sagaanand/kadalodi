import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  PackageCheck,
  Warehouse,
  Ship,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Layers,
  CheckCircle2,
  Box
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const IndiaDashboard: React.FC = () => {
  const { orders, shipments, procurement } = useApp();

  // Metrics
  const ordersToProcess = orders.filter(o => o.status === 'order_placed' || o.status === 'processing_india').length;
  const procurementPending = procurement.filter(p => p.status === 'Pending' || p.status === 'Ordered').length;
  const readyToPack = procurement.filter(p => p.status === 'Ready' || p.status === 'Quality Check').length;
  const packedOrders = orders.filter(o => o.status === 'packed_warehouse').length;
  const exportReady = orders.filter(o => o.status === 'export_cleared').length;
  const activeShipmentsCount = shipments.filter(s => s.status === 'In Transit' || s.status === 'Consolidation').length;

  const ordersByDayData = [
    { day: 'Mon', orders: 12, volumeKg: 94 },
    { day: 'Tue', orders: 19, volumeKg: 142 },
    { day: 'Wed', orders: 15, volumeKg: 110 },
    { day: 'Thu', orders: 24, volumeKg: 215 },
    { day: 'Fri', orders: 28, volumeKg: 286 },
    { day: 'Sat', orders: 18, volumeKg: 130 },
    { day: 'Sun', orders: 10, volumeKg: 75 },
  ];

  const categoryVolumeData = [
    { name: 'Kitchen & Home', value: 38, color: '#0284C7' },
    { name: 'Grocery & Spices', value: 26, color: '#0D9488' },
    { name: 'Appliances & IT', value: 20, color: '#6366F1' },
    { name: 'Business Hardware', value: 16, color: '#F59E0B' },
  ];

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-ocean-700">
              Chennai Sourcing & Export Operations
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mt-1">
            India Operations Command
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Sourcing consolidation, quality inspection, seaworthy packaging, and port export manifests.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/india/procurement"
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-navy-900 text-xs font-semibold shadow-2xs"
          >
            Procurement Board
          </Link>
          <Link
            to="/india/shipments"
            className="px-4 py-2 rounded-xl bg-ocean-600 hover:bg-ocean-700 text-white text-xs font-bold shadow-sm"
          >
            Export Consignments
          </Link>
        </div>
      </div>

      {/* KPI Cards Deck (Requirement 13) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Orders to Process</span>
          <div className="text-2xl font-black text-navy-900 mt-1">{ordersToProcess}</div>
          <span className="text-[10px] text-ocean-600 font-medium mt-1 inline-block">Awaiting routing</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Procurement Pending</span>
          <div className="text-2xl font-black text-indigo-700 mt-1">{procurementPending}</div>
          <span className="text-[10px] text-indigo-500 font-medium mt-1 inline-block">Supplier POs open</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Ready to Pack</span>
          <div className="text-2xl font-black text-purple-700 mt-1">{readyToPack}</div>
          <span className="text-[10px] text-purple-500 font-medium mt-1 inline-block">QC inspected</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Packed Orders</span>
          <div className="text-2xl font-black text-cyan-700 mt-1">{packedOrders}</div>
          <span className="text-[10px] text-cyan-600 font-medium mt-1 inline-block">Sea-crated</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Export Ready</span>
          <div className="text-2xl font-black text-teal-700 mt-1">{exportReady}</div>
          <span className="text-[10px] text-teal-600 font-medium mt-1 inline-block">Customs manifest OK</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Active Shipments</span>
          <div className="text-2xl font-black text-emerald-700 mt-1">{activeShipmentsCount}</div>
          <span className="text-[10px] text-emerald-600 font-medium mt-1 inline-block">Vessels at sea</span>
        </div>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Orders & Volume by Day */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-navy-900">Weekly Export Cargo Volume</h3>
              <p className="text-xs text-slate-500">Orders sourced and cargo weight dispatched (kg)</p>
            </div>
            <span className="text-xs font-semibold text-ocean-700 bg-ocean-50 px-2.5 py-1 rounded-full">
              Past 7 Days
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ordersByDayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B1E36', borderColor: '#1E293B', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="volumeKg" name="Cargo Weight (kg)" fill="#0284C7" radius={[6, 6, 0, 0]} />
                <Bar dataKey="orders" name="Order Count" fill="#0D9488" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Distribution */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-navy-900">Product Categories</h3>
            <p className="text-xs text-slate-500">Share of Maldives cross-border orders</p>

            <div className="h-44 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryVolumeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryVolumeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
            {categoryVolumeData.map(c => (
              <div key={c.name} className="flex items-center justify-between text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  <span>{c.name}</span>
                </div>
                <span className="font-bold text-navy-900">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Processing Table (Requirement 13) */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-navy-900">India Hub Operations Order Queue</h3>
            <p className="text-xs text-slate-500">Recent consignments entering Indian sourcing & packing line</p>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs font-bold text-ocean-600 hover:text-ocean-700 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5">Order</th>
                <th className="px-6 py-3.5">Customer</th>
                <th className="px-6 py-3.5">Items</th>
                <th className="px-6 py-3.5">Source Hub</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Weight</th>
                <th className="px-6 py-3.5">Destination</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.slice(0, 7).map(order => (
                <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4 font-bold font-mono text-navy-900">
                    <Link to={`/track/${order.id}`} className="hover:text-ocean-600">
                      {order.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-800">{order.customerName}</td>
                  <td className="px-6 py-4 text-slate-600 max-w-xs truncate">
                    {order.items.map(i => i.product.title).join(', ')}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{order.indiaWarehouse.split('(')[0]}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} size="sm" />
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-700">{order.weightKg} kg</td>
                  <td className="px-6 py-4 font-semibold text-ocean-700">{order.island}</td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/track/${order.id}`}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-ocean-50 text-slate-700 hover:text-ocean-700 font-semibold transition-colors"
                    >
                      Inspect
                    </Link>
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
