import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { ProcurementRecord } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  PackageCheck,
  CheckCircle2,
  Clock,
  Building2,
  Search,
  Filter,
  Eye,
  ShieldCheck,
  IndianRupee,
  Calendar,
  X
} from 'lucide-react';

export const ProcurementPage: React.FC = () => {
  const { procurement, updateProcurementStatus } = useApp();
  const [selectedRecord, setSelectedRecord] = useState<ProcurementRecord | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = procurement.filter(p => {
    const matchesStatus = filterStatus === 'All' || p.status === filterStatus;
    const matchesSearch =
      p.productTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.orderId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <PackageCheck className="w-4 h-4 text-ocean-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-ocean-700">
              India Sourcing & Supplier Procurement
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mt-1">
            Supplier Procurement Desk
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage purchase orders with Indian distributors, verify incoming batches, and conduct quality inspection.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold">
            {procurement.filter(p => p.status === 'Quality Check').length} In Quality Inspection
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
            {procurement.filter(p => p.status === 'Ready').length} Ready for Packing
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search supplier, item title, order ID..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-navy-900 outline-none focus:border-ocean-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {['All', 'Pending', 'Ordered', 'Quality Check', 'Ready'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterStatus === st
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Procurement Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className={`${selectedRecord ? 'lg:col-span-8' : 'lg:col-span-12'} transition-all`}>
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5">PO ID / Order</th>
                    <th className="px-5 py-3.5">Product</th>
                    <th className="px-5 py-3.5">Supplier & City</th>
                    <th className="px-5 py-3.5">Cost (₹ INR)</th>
                    <th className="px-5 py-3.5">Qty</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5">Expected</th>
                    <th className="px-5 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map(item => (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedRecord(item)}
                      className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${
                        selectedRecord?.id === item.id ? 'bg-ocean-50/50' : ''
                      }`}
                    >
                      <td className="px-5 py-4 font-mono font-bold text-navy-900">
                        {item.id}
                        <span className="block text-[11px] text-ocean-600 font-normal">{item.orderId}</span>
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-800 max-w-[200px] truncate">
                        {item.productTitle}
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-semibold text-navy-900 block">{item.supplier}</span>
                        <span className="text-[11px] text-slate-400">{item.originCity}</span>
                      </td>
                      <td className="px-5 py-4 font-mono font-bold text-slate-800">
                        ₹{item.inrCost.toLocaleString()}
                      </td>
                      <td className="px-5 py-4 font-bold text-navy-900">{item.quantity}</td>
                      <td className="px-5 py-4">
                        <StatusBadge status={item.status} size="sm" />
                      </td>
                      <td className="px-5 py-4 text-slate-500">{item.expectedDate}</td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setSelectedRecord(item);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-ocean-50 text-slate-700 hover:text-ocean-700 font-semibold transition-colors"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        {selectedRecord && (
          <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-sm text-navy-900">Sourcing Detail Inspection</h3>
                <span className="text-xs font-mono text-ocean-600">{selectedRecord.id}</span>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-navy-900 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 text-[11px]">Allocated Order</span>
                <p className="font-bold text-navy-900">{selectedRecord.orderId}</p>
              </div>

              <div>
                <span className="text-slate-400 text-[11px]">Product Title</span>
                <p className="font-semibold text-navy-900">{selectedRecord.productTitle}</p>
              </div>

              <div>
                <span className="text-slate-400 text-[11px]">Supplier & Hub</span>
                <p className="font-semibold text-navy-900">{selectedRecord.supplier}</p>
                <p className="text-slate-500">{selectedRecord.originCity}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <div>
                  <span className="text-slate-400 text-[11px]">Purchase Price</span>
                  <p className="font-bold text-navy-900 font-mono">₹{selectedRecord.inrCost.toLocaleString()} INR</p>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px]">Quantity</span>
                  <p className="font-bold text-navy-900">{selectedRecord.quantity} units</p>
                </div>
              </div>

              {selectedRecord.verifiedBy && (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-[11px] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified by: <strong>{selectedRecord.verifiedBy}</strong></span>
                </div>
              )}

              {/* Status Update Actions */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <span className="font-bold text-slate-700 block">Advance Procurement Status:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => updateProcurementStatus(selectedRecord.id, 'Ordered')}
                    className="py-2 px-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-[11px] text-center"
                  >
                    Mark Ordered
                  </button>
                  <button
                    onClick={() => updateProcurementStatus(selectedRecord.id, 'Quality Check')}
                    className="py-2 px-2.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 font-semibold text-[11px] text-center"
                  >
                    Move to QC
                  </button>
                  <button
                    onClick={() => updateProcurementStatus(selectedRecord.id, 'Ready')}
                    className="col-span-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center shadow-xs"
                  >
                    Pass QC & Mark Ready for Packing
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
