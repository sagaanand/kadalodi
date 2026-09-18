import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  TrendingUp,
  DollarSign,
  Ship,
  Package,
  CheckCircle2,
  Users,
  Percent,
  ArrowRight,
  Sparkles,
  Layers,
  MapPin
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { orders, products, shipments } = useApp();

  // Top KPIs (Requirement 20)
  const totalOrders = orders.length;
  const gmvMvr = orders.reduce((sum, o) => sum + o.totalMvr, 0);
  const activeShipmentsCount = shipments.filter(s => s.status === 'In Transit' || s.status === 'Consolidation').length;
  const ordersInTransit = orders.filter(o => o.status === 'in_transit').length;
  const deliveredCount = orders.filter(o => o.status === 'delivered').length;
  const uniqueCustomersCount = new Set(orders.map(o => o.customerName)).size;
  const grossMarginPercent = 18.4; // 18.4% blended gross margin across logistics & sourcing

  // Chart Data
  const orderVolumeTrends = [
    { month: 'Apr', orders: 110, revenue: 145000 },
    { month: 'May', orders: 145, revenue: 198000 },
    { month: 'Jun', orders: 190, revenue: 260000 },
    { month: 'Jul', orders: 240, revenue: 330000 },
    { month: 'Aug', orders: 310, revenue: 425000 },
    { month: 'Sep', orders: 385, revenue: 512000 },
  ];

  const shipmentStatusData = [
    { name: 'In Transit Sea', value: 42, color: '#0284C7' },
    { name: 'Customs Malé', value: 18, color: '#F59E0B' },
    { name: 'Island Delivery', value: 24, color: '#0D9488' },
    { name: 'Delivered', value: 16, color: '#10B981' },
  ];

  const ordersByIslandData = [
    { island: 'Malé City', count: 142 },
    { island: 'Hulhumalé', count: 118 },
    { island: 'Addu City', count: 54 },
    { island: 'Fuvahmulah', count: 32 },
    { island: 'Kulhudhuffushi', count: 28 },
    { island: 'Thinadhoo', count: 21 },
  ];

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Kadalodi Cross-Border Headquarters
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mt-1">
            Kadalodi Command Center
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Full-network visibility spanning India sourcing depots, Indian Ocean maritime corridors, and Maldives island distribution.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/admin/pricing"
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-navy-900 text-xs font-semibold shadow-2xs"
          >
            Pricing Engine
          </Link>
          <Link
            to="/admin/products"
            className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold shadow-sm"
          >
            Manage Products
          </Link>
        </div>
      </div>

      {/* Top 7 KPIs (Requirement 20) */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Orders</span>
          <div className="text-2xl font-black text-navy-900 mt-1">{totalOrders}</div>
          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-1">
            <TrendingUp className="w-3 h-3" /> +24% MoM
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total GMV</span>
          <div className="text-xl font-black text-ocean-700 mt-1">MVR {(gmvMvr / 1000).toFixed(1)}k</div>
          <span className="text-[10px] text-slate-400 mt-1 block">Cross-border sales</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Active Shipments</span>
          <div className="text-2xl font-black text-sky-700 mt-1">{activeShipmentsCount}</div>
          <span className="text-[10px] text-sky-600 font-medium mt-1 block">Vessels deployed</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">In Transit</span>
          <div className="text-2xl font-black text-blue-700 mt-1">{ordersInTransit}</div>
          <span className="text-[10px] text-blue-500 font-medium mt-1 block">Crossing ocean</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Delivered</span>
          <div className="text-2xl font-black text-emerald-700 mt-1">{deliveredCount}</div>
          <span className="text-[10px] text-emerald-600 font-medium mt-1 block">Fulfilled orders</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Customers</span>
          <div className="text-2xl font-black text-purple-700 mt-1">{uniqueCustomersCount}</div>
          <span className="text-[10px] text-purple-500 font-medium mt-1 block">Across 6 atolls</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Gross Margin</span>
          <div className="text-2xl font-black text-amber-700 mt-1">{grossMarginPercent}%</div>
          <span className="text-[10px] text-amber-600 font-medium mt-1 block">Landed profitability</span>
        </div>
      </div>

      {/* Visual Logistics Overview Flow (Requirement 20) */}
      <div className="rounded-3xl bg-[#08182B] text-white p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <h3 className="font-extrabold text-sm text-white">
              India ➔ Maldives Full Network Cargo Flow
            </h3>
          </div>
          <span className="text-xs font-mono text-ocean-300">Live Active Volumes</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] font-bold text-ocean-400 uppercase">1. India Sourcing</span>
            <div className="text-lg font-black text-white mt-1">28 Orders</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Chennai & Kochi hubs</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] font-bold text-sky-400 uppercase">2. Sea Packaging</span>
            <div className="text-lg font-black text-white mt-1">16 Crates</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Moisture-proof packing</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-ocean-950/90 border border-ocean-500/50">
            <span className="text-[10px] font-bold text-sky-300 uppercase">3. Ocean Transit</span>
            <div className="text-lg font-black text-white mt-1">42 Orders</div>
            <p className="text-[11px] text-ocean-200 mt-0.5">MV Maldivian Express</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] font-bold text-amber-400 uppercase">4. Malé Customs</span>
            <div className="text-lg font-black text-white mt-1">12 Declarations</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Electronic duty check</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/40">
            <span className="text-[10px] font-bold text-emerald-300 uppercase">5. Island Delivery</span>
            <div className="text-lg font-black text-white mt-1">10 Vans/Ferries</div>
            <p className="text-[11px] text-emerald-200 mt-0.5">Doorstep dispatch</p>
          </div>
        </div>
      </div>

      {/* 4 Interactive Charts (Requirement 20) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Order Volume Growth */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-navy-900">Order Volume Growth</h3>
              <p className="text-xs text-slate-500">Monthly cross-border orders placed</p>
            </div>
            <span className="text-xs font-semibold text-ocean-700 bg-ocean-50 px-2.5 py-1 rounded-full">
              6 Months
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={orderVolumeTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B1E36', borderColor: '#1E293B', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  name="Orders"
                  stroke="#0284C7"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#0284C7' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Revenue MVR Growth */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-navy-900">Gross Merchandise Value (MVR)</h3>
              <p className="text-xs text-slate-500">Total cross-border landed revenue</p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              MVR Currency
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={orderVolumeTrends}>
                <defs>
                  <linearGradient id="colorRev" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="5%" stopColor="#0D9488" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={v => `${v / 1000}k`} />
                <Tooltip
                  formatter={(v: any) => [`MVR ${Number(v).toLocaleString()}`, 'Revenue']}
                  contentStyle={{ backgroundColor: '#0B1E36', borderColor: '#1E293B', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#0D9488" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Shipment Status Breakdown */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-navy-900">Shipment Status Breakdown</h3>
            <p className="text-xs text-slate-500">Distribution of consignments across lifecycle</p>

            <div className="h-48 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={shipmentStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {shipmentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
            {shipmentStatusData.map(c => (
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

        {/* Chart 4: Orders by Island */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-navy-900">Orders by Island & Atoll</h3>
              <p className="text-xs text-slate-500">Destination density across the Maldives</p>
            </div>
            <span className="text-xs font-semibold text-slate-500">6 Localities</span>
          </div>

          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ordersByIslandData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} />
                <YAxis dataKey="island" type="category" stroke="#94a3b8" fontSize={11} width={90} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B1E36', borderColor: '#1E293B', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="count" name="Orders" fill="#0369A1" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
