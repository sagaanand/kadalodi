import React from 'react';
import { useApp } from '../../context/AppContext';
import { Warehouse, MapPin, Package, CheckCircle2, ArrowRight } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const HubWarehousePage: React.FC = () => {
  const { orders } = useApp();

  const islands = ['Hulhumalé', 'Malé', 'Addu City', 'Fuvahmulah', 'Kulhudhuffushi'];

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Warehouse className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
              Hulhumalé Central Gateway Hub (Phase 2)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mt-1">
            Maldives Hub Sorting & Atoll Dispatch
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Customs-cleared goods sorted into island delivery cages for last-mile courier vans and inter-island passenger/cargo ferries.
          </p>
        </div>
      </div>

      {/* Island Cages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {islands.map(island => {
          const islandOrders = orders.filter(o => o.island.toLowerCase().includes(island.toLowerCase()));

          return (
            <div
              key={island}
              className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-ocean-600" />
                    <h3 className="font-extrabold text-base text-navy-900">{island} Cage</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-700">
                    {islandOrders.length} Orders
                  </span>
                </div>

                <div className="space-y-2.5 mt-3">
                  {islandOrders.slice(0, 3).map(o => (
                    <div key={o.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-navy-900">{o.id}</span>
                        <StatusBadge status={o.status} size="sm" />
                      </div>
                      <p className="text-slate-600 mt-1 truncate">{o.customerName} • {o.items.length} items</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Route Status:</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Island Van Assigned
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
