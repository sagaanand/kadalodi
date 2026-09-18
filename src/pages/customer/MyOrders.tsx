import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Package, Clock, MapPin, ArrowRight, ExternalLink, Ship, Filter } from 'lucide-react';

export const MyOrders: React.FC = () => {
  const { orders } = useApp();
  const [tab, setTab] = useState<'all' | 'active' | 'delivered'>('all');

  const filteredOrders = orders.filter(o => {
    if (tab === 'active') return o.status !== 'delivered';
    if (tab === 'delivered') return o.status === 'delivered';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
              My Orders & Shipments
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Track cross-border consignments from India hubs to your Maldives address.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-xl">
            <button
              onClick={() => setTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                tab === 'all' ? 'bg-white text-navy-900 shadow-2xs' : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              All Orders ({orders.length})
            </button>
            <button
              onClick={() => setTab('active')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                tab === 'active' ? 'bg-white text-navy-900 shadow-2xs' : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              Active Shipments ({orders.filter(o => o.status !== 'delivered').length})
            </button>
            <button
              onClick={() => setTab('delivered')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                tab === 'delivered' ? 'bg-white text-navy-900 shadow-2xs' : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              Delivered ({orders.filter(o => o.status === 'delivered').length})
            </button>
          </div>
        </div>

        {/* Orders list */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
              <Package className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-navy-900">No orders found in this view</p>
            </div>
          ) : (
            filteredOrders.map(order => (
              <div
                key={order.id}
                className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 hover:border-ocean-300 hover:shadow-md transition-all shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex-1 min-w-0 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono font-black text-base text-navy-900 tracking-tight">
                      {order.id}
                    </span>
                    <StatusBadge status={order.status} size="sm" />
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500">{order.createdAt}</span>
                  </div>

                  {/* Products snippet */}
                  <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-slate-50 border border-slate-100 text-xs shrink-0"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-8 h-8 rounded-lg object-cover border border-slate-200"
                        />
                        <div>
                          <p className="font-semibold text-navy-900 line-clamp-1 max-w-[160px]">
                            {item.product.title}
                          </p>
                          <span className="text-[10px] text-slate-400">Qty: {item.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Metadata line */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-ocean-600" />
                      {order.island}
                    </span>
                    <span className="flex items-center gap-1">
                      <Ship className="w-3.5 h-3.5 text-ocean-600" />
                      {order.vesselName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-ocean-600" />
                      ETA: <strong className="text-navy-900">{order.eta}</strong>
                    </span>
                  </div>
                </div>

                {/* Right CTA column */}
                <div className="flex md:flex-col items-center md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
                  <div className="text-left md:text-right">
                    <div className="text-base font-extrabold text-navy-900">
                      MVR {order.totalMvr.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {order.items.reduce((s, i) => s + i.quantity, 0)} items total
                    </div>
                  </div>

                  <Link
                    to={`/track/${order.id}`}
                    className="px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-ocean-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>Track Order</span>
                    <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
