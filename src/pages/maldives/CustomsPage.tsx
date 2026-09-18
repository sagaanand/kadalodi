import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { CustomsDeclaration } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  FileCheck2,
  ShieldCheck,
  Search,
  Filter,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock
} from 'lucide-react';

export const CustomsPage: React.FC = () => {
  const { customs, updateCustomsStatus } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = customs.filter(c => {
    const matchesStatus = filterStatus === 'All' || c.status === filterStatus;
    const matchesSearch =
      c.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.productDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.shipmentId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Maldives Customs Service • Electronic Port Portal
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mt-1">
            Customs Clearance Desk
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Electronic import manifests, duty assessment (MIRA tariff compliance), and cargo release permits.
          </p>
        </div>

        <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span><strong>Simulated Interface:</strong> Demonstrating cross-border clearing logic.</span>
        </div>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search order KD-XXXX, customer, or shipment..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-navy-900 outline-none focus:border-ocean-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {['All', 'Under Review', 'Cleared', 'Documentation Pending', 'Hold'].map(st => (
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

      {/* Customs Declaration Table (Requirement 18) */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Declaration # / Order</th>
                <th className="px-5 py-3.5">Shipment</th>
                <th className="px-5 py-3.5">Consignee</th>
                <th className="px-5 py-3.5">Goods Description</th>
                <th className="px-5 py-3.5">Declared (MVR)</th>
                <th className="px-5 py-3.5">Documentation</th>
                <th className="px-5 py-3.5">Customs Status</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(dec => (
                <tr key={dec.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-4 font-mono font-bold text-navy-900">
                    {dec.id}
                    <span className="block text-ocean-700 text-[11px] font-semibold">{dec.orderId}</span>
                  </td>
                  <td className="px-5 py-4 font-mono text-slate-600">{dec.shipmentId}</td>
                  <td className="px-5 py-4 font-semibold text-slate-800">{dec.customerName}</td>
                  <td className="px-5 py-4 max-w-[220px]">
                    <div className="font-semibold text-navy-900 truncate">{dec.productDescription}</div>
                    <span className="text-[10px] text-slate-400">{dec.category}</span>
                  </td>
                  <td className="px-5 py-4 font-bold text-navy-900 font-mono">
                    MVR {dec.declaredValueMvr.toLocaleString()}
                    <span className="block text-[10px] text-slate-400">Duty: MVR {dec.dutyFeeMvr}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                      dec.documentsStatus === 'Verified' ? 'text-emerald-700' : 'text-amber-700'
                    }`}>
                      {dec.documentsStatus === 'Verified' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      <span>{dec.documentsStatus}</span>
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={dec.status} size="sm" />
                  </td>
                  <td className="px-5 py-4 text-right space-x-1">
                    {dec.status !== 'Cleared' ? (
                      <button
                        onClick={() => updateCustomsStatus(dec.id, 'Cleared')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
                      >
                        Release & Clear
                      </button>
                    ) : (
                      <button
                        onClick={() => updateCustomsStatus(dec.id, 'Hold')}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 font-semibold text-xs"
                      >
                        Flag Hold
                      </button>
                    )}
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
