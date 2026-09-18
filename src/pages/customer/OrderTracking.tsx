import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { RouteMapGraphic } from '../../components/common/RouteMapGraphic';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ORDER_STAGE_ORDER } from '../../data/mockOrders';
import {
  Ship,
  Anchor,
  CheckCircle2,
  Clock,
  MapPin,
  Truck,
  Box,
  FastForward,
  Building2,
  Calendar,
  Phone,
  User,
  ExternalLink,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const OrderTracking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { orders, advanceOrderStatus } = useApp();

  // Find order or fallback to KD-10284
  const order = orders.find(o => o.id === id) || orders.find(o => o.id === 'KD-10284') || orders[0];

  const currentIndex = ORDER_STAGE_ORDER.indexOf(order.status);
  const isComplete = currentIndex >= ORDER_STAGE_ORDER.length - 1;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link to="/" className="hover:text-navy-900">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/orders" className="hover:text-navy-900">Orders</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-navy-900 font-bold">{order.id} Tracking</span>
          </nav>

          {/* Quick status advance button for live demo interaction */}
          <div className="flex items-center gap-2">
            <button
              disabled={isComplete}
              onClick={() => advanceOrderStatus(order.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all ${
                isComplete
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  : 'bg-ocean-600 hover:bg-ocean-700 text-white hover:scale-105 active:scale-95'
              }`}
            >
              <FastForward className="w-3.5 h-3.5 fill-current" />
              <span>Advance Status (Simulate Progression)</span>
            </button>
          </div>
        </div>

        {/* Order Header Summary Banner */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black text-navy-900 font-mono tracking-tight">
                {order.id}
              </h1>
              <StatusBadge status={order.status} size="lg" />
            </div>

            <p className="text-xs text-slate-500 mt-1">
              Placed on {order.createdAt} • Total Weight: {order.weightKg} kg
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <User className="w-3.5 h-3.5 text-ocean-600" />
                {order.customerName}
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <MapPin className="w-3.5 h-3.5 text-ocean-600" />
                {order.island}, Maldives
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <Clock className="w-3.5 h-3.5 text-ocean-600" />
                Estimated Arrival: <strong>{order.eta}</strong>
              </span>
            </div>
          </div>

          {/* Shipment Reference Info Box */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs space-y-1.5 min-w-[240px]">
            <div className="flex justify-between">
              <span className="text-slate-500">Ocean Vessel:</span>
              <span className="font-bold text-navy-900">{order.vesselName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Shipment ID:</span>
              <span className="font-mono font-semibold text-ocean-700">{order.shipmentId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Container No:</span>
              <span className="font-mono text-slate-700">{order.containerNo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Customs Dec:</span>
              <span className="font-mono text-slate-700">{order.customsDecNo}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-200">
              <span className="text-slate-500">Island Driver:</span>
              <span className="font-semibold text-emerald-700">{order.assignedDriver || 'Assigned upon berthing'}</span>
            </div>
          </div>
        </div>

        {/* Flagship Route Map Graphic */}
        <RouteMapGraphic
          status={order.status}
          vesselName={order.vesselName}
          containerNo={order.containerNo}
          originPort={order.indiaWarehouse.split('(')[0]}
          destinationIsland={order.island}
        />

        {/* Two-Column Details: 10-Step Timeline + Order Items */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: 10-Step Lifecycle Stepper */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h2 className="font-extrabold text-base text-navy-900">
                  Cross-Border Tracking Timeline
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Live verification from Chennai Hub to Island Doorstep
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-ocean-700 bg-ocean-50 px-2.5 py-1 rounded-full">
                Step {currentIndex + 1} of 10
              </span>
            </div>

            {/* Stepper list */}
            <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {order.timeline.map((step, idx) => {
                const isPast = idx < currentIndex;
                const isCurrent = idx === currentIndex;
                const isFuture = idx > currentIndex;

                return (
                  <div key={step.stage} className="relative group">
                    {/* Stepper Node Icon */}
                    <div
                      className={`absolute -left-6 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all ${
                        isPast
                          ? 'bg-emerald-500 text-white shadow-xs'
                          : isCurrent
                          ? 'bg-ocean-600 text-white ring-4 ring-ocean-100 shadow-md animate-pulse'
                          : 'bg-white border-2 border-slate-300 text-slate-400'
                      }`}
                    >
                      {isPast ? (
                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                      ) : isCurrent ? (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      )}
                    </div>

                    {/* Step Details */}
                    <div className={`p-3.5 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-ocean-50/70 border-ocean-300 shadow-xs'
                        : isPast
                        ? 'bg-white border-slate-100'
                        : 'bg-slate-50/50 border-transparent opacity-60'
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <h4 className={`font-bold text-xs sm:text-sm ${
                            isCurrent ? 'text-ocean-900 font-extrabold' : isPast ? 'text-navy-900' : 'text-slate-500'
                          }`}>
                            {step.label}
                          </h4>
                          {isCurrent && (
                            <span className="text-[10px] font-bold bg-ocean-600 text-white px-2 py-0.2 rounded-full">
                              Current Status
                            </span>
                          )}
                        </div>

                        <span className="text-[11px] text-slate-400 font-mono">{step.timestamp}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{step.location}</span>
                      </div>

                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                        {step.note}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Order Items & Delivery Location */}
          <div className="lg:col-span-5 space-y-6">
            {/* Package Contents */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Box className="w-4 h-4 text-ocean-600" />
                <span>Package Items ({order.items.length})</span>
              </h3>

              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-14 h-14 rounded-lg object-cover border border-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-xs text-navy-900 line-clamp-1">{item.product.title}</h4>
                      <p className="text-[11px] text-slate-500">
                        Qty: {item.quantity} • Weight: {(item.product.weightKg * item.quantity).toFixed(1)} kg
                      </p>
                      <div className="text-xs font-bold text-ocean-700 mt-1">
                        MVR {(item.product.mvrPrice * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost Summary */}
              <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Product Subtotal</span>
                  <span className="font-medium text-navy-900">MVR {order.subtotalMvr.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Ocean Freight</span>
                  <span className="font-medium text-navy-900">MVR {order.shippingMvr.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Maldives Island Delivery</span>
                  <span className="font-medium text-navy-900">MVR {order.deliveryMvr.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-navy-900">
                  <span>Total Paid</span>
                  <span className="text-ocean-700 text-base">MVR {order.totalMvr.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Destination Address Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3 text-xs">
              <h3 className="font-bold text-sm text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Maldives Island Destination</span>
              </h3>

              <div>
                <p className="font-bold text-navy-900">{order.customerName}</p>
                <p className="text-slate-500 mt-0.5">{order.customerPhone}</p>
                <p className="text-slate-700 mt-1">{order.address}</p>
                <p className="text-ocean-700 font-semibold">{order.island}, Maldives</p>
              </div>

              {order.notes && (
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px]">
                  <strong>Note:</strong> {order.notes}
                </div>
              )}
            </div>

            {/* Need Help Card */}
            <div className="p-5 rounded-3xl bg-gradient-to-tr from-navy-900 to-ocean-900 text-white shadow-md space-y-2">
              <h4 className="font-bold text-sm">Need help with your shipment?</h4>
              <p className="text-xs text-slate-300">
                Our support desk in Malé coordinates directly with the vessel captain and customs officials.
              </p>
              <Link
                to="/orders"
                className="inline-block mt-2 text-xs font-bold text-sky-300 hover:text-white underline underline-offset-2"
              >
                View all my orders ➔
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
