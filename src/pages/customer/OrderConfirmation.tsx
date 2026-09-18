import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  Ship,
  ArrowRight,
  Package,
  Clock,
  MapPin,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const OrderConfirmation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { orders } = useApp();

  const order = orders.find(o => o.id === id) || orders[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm text-center space-y-6">
          {/* Success Animated Badge */}
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Payment & Order Verified
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mt-3">
              Order Confirmed!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Your order has been logged into the Kadalodi India Sourcing Gateway.
            </p>
          </div>

          {/* Order ID Banner */}
          <div className="p-4 rounded-2xl bg-ocean-50/70 border border-ocean-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
            <div>
              <div className="text-[11px] font-bold text-ocean-700 uppercase tracking-wider">
                Order Tracking ID
              </div>
              <div className="text-2xl font-black text-navy-900 font-mono tracking-tight">
                {order.id}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <StatusBadge status={order.status} size="md" />
            </div>
          </div>

          {/* 5-Step Order Lifecycle Progress Card (Requirement 10) */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3">
            <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider">
              Cross-Border Journey Milestones
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-3 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Order Placed & Allocated to India Hub</span>
              </div>
              <div className="flex items-center gap-3 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>India Processing & Quality Verification</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
                <span>International Cargo (Ocean Container to Malé)</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
                <span>Maldives Customs Clearance at Malé Seaport</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
                <span>Local Island Delivery to Doorstep ({order.island})</span>
              </div>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-3 text-left text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 text-[11px]">Destination Island:</span>
              <p className="font-bold text-navy-900 mt-0.5">{order.island}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 text-[11px]">Estimated Doorstep Arrival:</span>
              <p className="font-bold text-ocean-700 mt-0.5">{order.eta}</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to={`/track/${order.id}`}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-ocean-600 to-sky-600 hover:from-ocean-700 hover:to-sky-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-ocean-500/25 transition-all"
            >
              <span>Track Order Live</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/shop"
              className="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm text-center transition-colors"
            >
              Back to Catalogue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
