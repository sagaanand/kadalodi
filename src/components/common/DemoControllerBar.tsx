import React, { useState } from 'react';
import { Play, RotateCcw, FastForward, ChevronUp, ChevronDown, Sparkles, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from './StatusBadge';
import { ORDER_STAGE_ORDER } from '../../data/mockOrders';

export const DemoControllerBar: React.FC = () => {
  const { orders, advanceOrderStatus, resetAllDemoData, role, setRole } = useApp();
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState<string>('KD-10284');

  const selectedOrder = orders.find(o => o.id === selectedOrderId) || orders[0];
  const currentIndex = selectedOrder ? ORDER_STAGE_ORDER.indexOf(selectedOrder.status) : 0;
  const isFinished = currentIndex >= ORDER_STAGE_ORDER.length - 1;
  const nextStage = !isFinished ? ORDER_STAGE_ORDER[currentIndex + 1] : null;

  return (
    <aside aria-label="Interactive Demo Controls" className="fixed bottom-0 left-0 right-0 z-40 bg-navy-950/95 border-t border-ocean-500/40 text-white shadow-2xl backdrop-blur-md transition-all">
      {/* Minimized Toggle Tab */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-2 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-ocean-500/20 border border-ocean-400/40 text-ocean-300 text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-ocean-400" />
              Demo Controller
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Simulate real-time India ➔ Maldives logistics lifecycle
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick role toggles */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-400 text-[11px] hidden md:inline">View as:</span>
              {(['customer', 'india_ops', 'maldives_ops', 'admin'] as const).map(r => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                    role === r
                      ? 'bg-ocean-500 text-white shadow-sm'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {r === 'customer' ? 'Customer' :
                   r === 'india_ops' ? 'India Ops' :
                   r === 'maldives_ops' ? 'Maldives Ops' : 'Admin'}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
              title={isExpanded ? 'Collapse Controller' : 'Expand Controller'}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Expanded Controller Controls */}
        {isExpanded && (
          <div className="py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Target Order Selector */}
            <div className="flex items-center gap-2">
              <label className="text-slate-300 font-medium">Simulated Order:</label>
              <select
                value={selectedOrderId}
                onChange={e => setSelectedOrderId(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-white rounded-lg px-2.5 py-1 font-mono text-xs focus:border-ocean-400 outline-none"
              >
                {orders.slice(0, 8).map(o => (
                  <option key={o.id} value={o.id}>
                    {o.id} — {o.customerName} ({o.island})
                  </option>
                ))}
              </select>

              {selectedOrder && (
                <div className="flex items-center gap-2 ml-1">
                  <span className="text-slate-400">Current:</span>
                  <StatusBadge status={selectedOrder.status} size="sm" />
                </div>
              )}
            </div>

            {/* Advance Button Action */}
            <div className="flex items-center gap-2">
              <button
                disabled={isFinished}
                onClick={() => selectedOrder && advanceOrderStatus(selectedOrder.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-semibold text-xs shadow-md transition-all ${
                  isFinished
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-ocean-500 to-sky-400 hover:from-ocean-600 hover:to-sky-500 text-white hover:scale-105 active:scale-95 shadow-ocean-500/25'
                }`}
              >
                <FastForward className="w-3.5 h-3.5 fill-current" />
                <span>
                  {isFinished ? 'Order Delivered (Complete)' : `Advance to Next Stage ➔`}
                </span>
              </button>

              <button
                onClick={() => {
                  if (window.confirm('Reset all demo orders, cart, and statuses to initial mock state?')) {
                    resetAllDemoData();
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors"
                title="Reset mock state"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset Demo</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
