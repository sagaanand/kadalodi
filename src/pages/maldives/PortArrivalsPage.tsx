import React from 'react';
import { useApp } from '../../context/AppContext';
import { Anchor, Ship, CheckCircle2, Clock, MapPin, Box, ArrowRight } from 'lucide-react';

export const PortArrivalsPage: React.FC = () => {
  const { shipments } = useApp();

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Anchor className="w-4 h-4 text-ocean-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-ocean-700">
              Malé Commercial Port (MLE) • Berth Schedule
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mt-1">
            Vessel Port Berthing & Cargo Offloading
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor container offloading, crane turnaround time, and transfer to port customs staging.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {shipments.map(s => (
          <div
            key={s.id}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="font-mono font-black text-sm text-ocean-700">{s.id}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  s.status === 'Arrived at Malé' ? 'bg-emerald-100 text-emerald-800' :
                  s.status === 'In Transit' ? 'bg-sky-100 text-sky-800' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {s.status}
                </span>
              </div>

              <h3 className="font-extrabold text-lg text-navy-900 flex items-center gap-2">
                <Ship className="w-5 h-5 text-ocean-600" />
                <span>{s.vesselName}</span>
              </h3>

              <p className="text-xs text-slate-500">
                Origin: {s.originPort} ➔ Destination: Malé Commercial Port
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-600 pt-1">
                <span>Total Consignments: <strong>{s.totalOrdersCount}</strong></span>
                <span>•</span>
                <span>Gross Weight: <strong>{s.totalWeightKg} kg</strong></span>
                <span>•</span>
                <span>ETA: <strong>{s.estimatedArrivalDate}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => alert(`Port crane offload scheduled for ${s.vesselName}`)}
                className="px-4 py-2 rounded-xl bg-ocean-600 hover:bg-ocean-700 text-white font-bold text-xs shadow-xs"
              >
                Inspect Port Staging
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
