import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  Warehouse,
  Package,
  Layers,
  CheckCircle2,
  Ship,
  MapPin,
  Box,
  Truck,
  ArrowRight
} from 'lucide-react';

export const WarehousePage: React.FC = () => {
  const { orders } = useApp();
  const [activeTab, setActiveTab] = useState<'incoming' | 'processing' | 'packing' | 'export_ready'>('packing');

  // Categorize warehouse orders
  const incomingOrders = orders.filter(o => o.status === 'order_placed');
  const processingOrders = orders.filter(o => o.status === 'processing_india' || o.status === 'procurement');
  const packingOrders = orders.filter(o => o.status === 'packed_warehouse');
  const exportReadyOrders = orders.filter(o => o.status === 'export_cleared');

  const currentList =
    activeTab === 'incoming' ? incomingOrders :
    activeTab === 'processing' ? processingOrders :
    activeTab === 'packing' ? packingOrders : exportReadyOrders;

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Warehouse className="w-4 h-4 text-ocean-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-ocean-700">
              Chennai Fulfillment Center (Ambattur Hub)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mt-1">
            Warehouse Staging & Packing Lines
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Heavy-duty weatherproof crating, barcode serialization, and pallet container staging for Maldives ocean freight.
          </p>
        </div>

        <div className="text-right">
          <div className="text-xs font-bold text-navy-900">Facility Capacity</div>
          <div className="text-xs text-emerald-600 font-semibold">4,200 sq.ft • 82% Utilization</div>
        </div>
      </div>

      {/* 4 Warehouse Line Tabs (Requirement 15) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {
            id: 'incoming',
            title: '1. Incoming Depot',
            count: incomingOrders.length,
            desc: 'Supplier deliveries arriving'
          },
          {
            id: 'processing',
            title: '2. Processing Line',
            count: processingOrders.length,
            desc: 'Verification & barcode tagging'
          },
          {
            id: 'packing',
            title: '3. Sea-Packing Line',
            count: packingOrders.length,
            desc: 'Heavy-duty maritime crating'
          },
          {
            id: 'export_ready',
            title: '4. Export Ready Pallets',
            count: exportReadyOrders.length,
            desc: 'Ready for Chennai Seaport loading'
          }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`p-4 rounded-2xl border text-left transition-all ${
              activeTab === tab.id
                ? 'bg-navy-900 text-white border-navy-900 shadow-md scale-[1.01]'
                : 'bg-white text-navy-900 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold ${activeTab === tab.id ? 'text-ocean-300' : 'text-slate-500'}`}>
                {tab.title}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-extrabold ${
                activeTab === tab.id ? 'bg-ocean-500 text-white' : 'bg-slate-100 text-slate-700'
              }`}>
                {tab.count}
              </span>
            </div>
            <p className={`text-[11px] mt-1.5 ${activeTab === tab.id ? 'text-slate-300' : 'text-slate-500'}`}>
              {tab.desc}
            </p>
          </button>
        ))}
      </div>

      {/* Warehouse Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Displaying <strong>{currentList.length}</strong> consignments in this staging section</span>
          <span className="font-mono text-ocean-700 font-semibold">Port Destination: Malé Seaport (MLE)</span>
        </div>

        {currentList.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
            <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-navy-900">No packages currently queued in this bay</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentList.map(order => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-ocean-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-sm text-navy-900">{order.id}</span>
                    <StatusBadge status={order.status} size="sm" />
                  </div>

                  <div className="mt-2 text-xs font-semibold text-slate-800 line-clamp-1">
                    {order.items.map(i => i.product.title).join(', ')}
                  </div>

                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Customer: {order.customerName} • {order.island}
                  </div>
                </div>

                {/* Warehouse Specifications */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px]">
                  <div>
                    <span className="text-slate-400 block">Package Weight</span>
                    <span className="font-mono font-bold text-slate-800">{order.weightKg} kg</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Crate Size</span>
                    <span className="font-mono font-semibold text-slate-800">
                      {order.weightKg > 10 ? 'Pallet Crate XL' : 'Standard Sea Box M'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Scheduled Vessel</span>
                    <span className="font-semibold text-navy-900 truncate block">{order.vesselName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Container Code</span>
                    <span className="font-mono text-ocean-700">{order.containerNo.split('-')[0] || 'TGHU'}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Barcode Tagged
                  </span>
                  <button
                    onClick={() => alert(`Consignment ${order.id} barcode scanned and verified.`)}
                    className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-ocean-50 text-slate-700 hover:text-ocean-700 font-semibold transition-colors"
                  >
                    Scan Label
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
