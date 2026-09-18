import React from 'react';
import type { OrderStatus } from '../../types';

interface StatusBadgeProps {
  status: OrderStatus | string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3.5 py-1.5 font-medium'
  };

  const getStatusConfig = (s: string) => {
    switch (s) {
      case 'order_placed':
        return { label: 'Order Placed', bg: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500' };
      case 'processing_india':
        return { label: 'Processing in India', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', dot: 'bg-indigo-500' };
      case 'procurement':
        return { label: 'Procured (India)', bg: 'bg-purple-50 text-purple-700 border-purple-200', dot: 'bg-purple-500' };
      case 'packed_warehouse':
        return { label: 'Packed & Sea-Crated', bg: 'bg-cyan-50 text-cyan-800 border-cyan-200', dot: 'bg-cyan-500' };
      case 'export_cleared':
        return { label: 'Export Cleared', bg: 'bg-teal-50 text-teal-800 border-teal-200', dot: 'bg-teal-600' };
      case 'in_transit':
        return { label: 'In Transit to Maldives', bg: 'bg-sky-100 text-sky-800 border-sky-300 font-semibold shadow-sm', dot: 'bg-sky-600 animate-pulse' };
      case 'arrived_maldives':
        return { label: 'Arrived in Maldives', bg: 'bg-amber-50 text-amber-800 border-amber-200', dot: 'bg-amber-500' };
      case 'customs_clearance':
        return { label: 'Customs Clearance', bg: 'bg-orange-50 text-orange-800 border-orange-200', dot: 'bg-orange-500' };
      case 'maldives_hub':
        return { label: 'Out for Island Delivery', bg: 'bg-lime-50 text-lime-800 border-lime-300', dot: 'bg-lime-600' };
      case 'delivered':
        return { label: 'Delivered', bg: 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold', dot: 'bg-emerald-500' };

      // Customs statuses
      case 'Cleared':
        return { label: 'Cleared', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' };
      case 'Under Review':
        return { label: 'Under Review', bg: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' };
      case 'Documentation Pending':
        return { label: 'Doc Pending', bg: 'bg-slate-100 text-slate-700 border-slate-200', dot: 'bg-slate-400' };
      case 'Hold':
        return { label: 'Hold / Inspection', bg: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500' };

      // Procurement statuses
      case 'Ready':
        return { label: 'QC Passed & Ready', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' };
      case 'Quality Check':
        return { label: 'Quality Check', bg: 'bg-purple-50 text-purple-700 border-purple-200', dot: 'bg-purple-500' };
      case 'Ordered':
        return { label: 'Supplier Dispatched', bg: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500' };
      case 'Pending':
        return { label: 'Sourcing Pending', bg: 'bg-slate-100 text-slate-600 border-slate-200', dot: 'bg-slate-400' };

      // Default fallback
      default:
        return { label: s, bg: 'bg-slate-100 text-slate-700 border-slate-200', dot: 'bg-slate-400' };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${config.bg} ${sizeClasses[size]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      <span>{config.label}</span>
    </span>
  );
};
