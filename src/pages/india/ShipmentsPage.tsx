import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { Shipment } from '../../types';
import {
  Ship,
  Anchor,
  CheckCircle2,
  Clock,
  MapPin,
  Box,
  Compass,
  FileCheck2,
  Calendar,
  AlertCircle
} from 'lucide-react';

export const ShipmentsPage: React.FC = () => {
  const { shipments } = useApp();
  const [selectedShipment, setSelectedShipment] = useState<Shipment>(shipments[0]);

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Ship className="w-4 h-4 text-ocean-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-ocean-700">
              International Cargo Line • Bay of Bengal & Laccadive Sea
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mt-1">
            Export Consignments & Ocean Manifests
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Vessel bookings, container stowage plans, and bill of lading documents linking Indian ports with Malé.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-ocean-50 text-ocean-700 border border-ocean-200 text-xs font-bold">
            {shipments.length} Active Vessels Tracked
          </span>
        </div>
      </div>

      {/* Shipments Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {shipments.map(s => (
          <div
            key={s.id}
            onClick={() => setSelectedShipment(s)}
            className={`p-5 rounded-3xl border cursor-pointer transition-all ${
              selectedShipment.id === s.id
                ? 'bg-navy-900 text-white border-navy-900 shadow-lg scale-[1.01]'
                : 'bg-white text-navy-900 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`font-mono font-black text-sm ${selectedShipment.id === s.id ? 'text-sky-300' : 'text-ocean-700'}`}>
                {s.id}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                selectedShipment.id === s.id
                  ? 'bg-ocean-500 text-white'
                  : 'bg-ocean-50 text-ocean-700'
              }`}>
                {s.status}
              </span>
            </div>

            <h3 className="font-extrabold text-base mt-2">{s.vesselName}</h3>
            <div className={`text-xs mt-1 ${selectedShipment.id === s.id ? 'text-slate-300' : 'text-slate-500'}`}>
              {s.originPort.split('(')[0]} ➔ {s.destinationPort.split('(')[0]}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-200/40 text-xs">
              <div>
                <span className={`text-[10px] ${selectedShipment.id === s.id ? 'text-slate-400' : 'text-slate-400'}`}>
                  Consolidated
                </span>
                <p className="font-bold">{s.totalOrdersCount} Orders</p>
              </div>
              <div>
                <span className={`text-[10px] ${selectedShipment.id === s.id ? 'text-slate-400' : 'text-slate-400'}`}>
                  Cargo Weight
                </span>
                <p className="font-bold">{s.totalWeightKg} kg</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Shipment Detail & 6-Stage Timeline (Requirement 16) */}
      {selectedShipment && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-black text-navy-900 font-mono">
                  Shipment {selectedShipment.id}
                </h2>
                <span className="text-xs font-bold text-ocean-700 bg-ocean-50 px-3 py-1 rounded-full border border-ocean-200">
                  {selectedShipment.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Aboard <strong>{selectedShipment.vesselName}</strong> • Departed: {selectedShipment.departureDate} • ETA Malé: {selectedShipment.estimatedArrivalDate}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Sea Passage Progress:</span>
              <div className="w-32 bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                <div
                  className="bg-ocean-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${selectedShipment.seaProgressPercent}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-ocean-700">{selectedShipment.seaProgressPercent}%</span>
            </div>
          </div>

          {/* 6-Stage Shipment Logistics Timeline */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Maritime Cargo Milestones
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center text-xs">
              {[
                { title: 'India Warehouse', status: 'Completed', note: 'Palletized in Chennai' },
                { title: 'Export Docs', status: 'Completed', note: 'Indian Customs manifest' },
                { title: 'Cargo Loaded', status: 'Completed', note: 'TEU Container #89214' },
                { title: 'Departed India', status: 'Completed', note: selectedShipment.departureDate },
                { title: 'At Sea', status: selectedShipment.status === 'In Transit' ? 'Current' : 'Completed', note: 'Laccadive Sea corridor' },
                { title: 'Maldives Port', status: selectedShipment.seaProgressPercent === 100 ? 'Completed' : 'Upcoming', note: `Berth ETA: ${selectedShipment.estimatedArrivalDate}` },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border flex flex-col justify-between ${
                    step.status === 'Current'
                      ? 'bg-ocean-50 border-ocean-300 ring-2 ring-ocean-200'
                      : step.status === 'Completed'
                      ? 'bg-emerald-50/60 border-emerald-200'
                      : 'bg-slate-50 border-slate-100 opacity-60'
                  }`}
                >
                  <div>
                    <span className={`text-[10px] font-bold ${
                      step.status === 'Current' ? 'text-ocean-700' : step.status === 'Completed' ? 'text-emerald-700' : 'text-slate-400'
                    }`}>
                      Stage 0{idx + 1}
                    </span>
                    <div className="font-bold text-navy-900 mt-1">{step.title}</div>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-2">{step.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Associated Orders in this Container */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="font-bold text-sm text-navy-900 mb-3">
              Associated Customer Orders ({selectedShipment.orderIds.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedShipment.orderIds.map(oid => (
                <span
                  key={oid}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-mono font-semibold border border-slate-200 flex items-center gap-1.5"
                >
                  <Box className="w-3.5 h-3.5 text-ocean-600" />
                  {oid}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
