import React from 'react';
import { motion } from 'framer-motion';
import { Ship, Anchor, MapPin, Truck, CheckCircle2 } from 'lucide-react';
import type { OrderStatus } from '../../types';
import { ORDER_STAGE_ORDER } from '../../data/mockOrders';

interface RouteMapGraphicProps {
  status: OrderStatus;
  vesselName?: string;
  containerNo?: string;
  originPort?: string;
  destinationIsland?: string;
}

export const RouteMapGraphic: React.FC<RouteMapGraphicProps> = ({
  status,
  vesselName = 'MV Maldivian Express',
  containerNo = 'TGHU-892147-3',
  originPort = 'Chennai Port, India',
  destinationIsland = 'Hulhumalé, Maldives'
}) => {
  const currentIndex = ORDER_STAGE_ORDER.indexOf(status);

  // Map 10 stages to 4 primary visual milestones:
  // 0-4: India Hub & Port
  // 5: Ocean Cargo Transit (Mid-sea)
  // 6-7: Malé Seaport & Customs
  // 8-9: Island Hub & Doorstep Delivery
  const getVesselPosition = () => {
    if (currentIndex <= 3) return { x: 18, y: 22, text: 'Consolidation at Chennai Hub' };
    if (currentIndex === 4) return { x: 26, y: 32, text: 'Loaded at Chennai Seaport (INMAA)' };
    if (currentIndex === 5) return { x: 50, y: 52, text: 'Sailing across Indian Ocean' };
    if (currentIndex === 6) return { x: 74, y: 68, text: 'Berthed at Malé Commercial Port' };
    if (currentIndex === 7) return { x: 78, y: 72, text: 'Clearing Maldives Customs' };
    if (currentIndex === 8) return { x: 84, y: 78, text: 'Dispatched to Island Gateway' };
    return { x: 88, y: 82, text: 'Delivered to Customer Doorstep' };
  };

  const pos = getVesselPosition();

  return (
    <div className="relative w-full rounded-2xl bg-[#08182B] border border-slate-800 p-6 text-white overflow-hidden shadow-2xl">
      {/* Background nautical grid & radar rings */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Soft ambient ocean glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-ocean-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info Banner */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/80 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-semibold uppercase tracking-wider text-ocean-300">Live Ocean Transit Route</span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2 mt-0.5">
            <span>India</span>
            <span className="text-ocean-400 font-normal">➔</span>
            <span>Maldives Maritime Corridor</span>
          </h3>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <div className="bg-slate-800/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700/60 flex items-center gap-2">
            <Ship className="w-3.5 h-3.5 text-ocean-400" />
            <span className="text-slate-300">Vessel:</span>
            <span className="font-semibold text-white">{vesselName}</span>
          </div>
          <div className="bg-slate-800/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700/60 flex items-center gap-2">
            <span className="text-slate-300">Container:</span>
            <span className="font-mono text-ocean-300">{containerNo}</span>
          </div>
        </div>
      </div>

      {/* Stylized Visual Maritime Map */}
      <div className="relative w-full h-64 sm:h-72 rounded-xl bg-gradient-to-b from-[#091F38] to-[#040C16] border border-slate-800 overflow-hidden">
        {/* Lat/Long Grid overlay */}
        <div className="absolute top-2 left-3 text-[10px] font-mono text-slate-500 tracking-wider">
          LAT 04°10'N / LON 73°30'E • SECTOR 08-INDIAN OCEAN
        </div>
        <div className="absolute bottom-2 right-3 text-[10px] font-mono text-ocean-400/80">
          SPEED: 14.8 KNOTS • SEA STATE: MODERATE (0.8m SWELL)
        </div>

        {/* SVG Route Line and Waypoints */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#0EA5E9" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="1" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* India Coastline Stylized Contour */}
          <path
            d="M 5,5 Q 35,15 28,45 Q 22,65 10,75 L 5,75 Z"
            fill="#0F2B48"
            stroke="#1E40AF"
            strokeWidth="0.5"
            opacity="0.4"
          />

          {/* Maldives Atoll Chain Stylized Contour */}
          <path
            d="M 72,50 C 76,58 74,70 78,88 C 79,93 76,96 73,95"
            fill="none"
            stroke="#0D9488"
            strokeWidth="1.2"
            strokeDasharray="1 2"
            opacity="0.6"
          />

          {/* Main Ocean Shipping Corridor Line */}
          <path
            d="M 22,25 C 38,38 50,50 75,70"
            fill="none"
            stroke="rgba(56, 189, 248, 0.2)"
            strokeWidth="2.5"
            strokeDasharray="3 3"
          />

          {/* Active completed route path */}
          <path
            d="M 22,25 C 38,38 50,50 75,70"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="2.5"
            strokeDasharray="100"
            strokeDashoffset={100 - (currentIndex / 9) * 100}
            filter="url(#glow)"
            className="transition-all duration-1000 ease-out"
          />

          {/* Island distribution connector */}
          <path
            d="M 75,70 L 86,80"
            fill="none"
            stroke={currentIndex >= 8 ? "#10B981" : "rgba(255,255,255,0.15)"}
            strokeWidth="2"
            strokeDasharray="2 2"
          />
        </svg>

        {/* Milestone Node 1: Chennai Hub, India */}
        <div className="absolute top-[18%] left-[16%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
          <div className="relative flex items-center justify-center">
            <span className="absolute w-7 h-7 rounded-full bg-ocean-500/20 animate-ping" />
            <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
              currentIndex >= 4 ? 'bg-emerald-500 border-white text-white' : 'bg-ocean-600 border-ocean-300 text-white'
            }`}>
              <Anchor className="w-3 h-3" />
            </div>
          </div>
          <div className="mt-1.5 px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700 text-[10px] font-medium text-slate-200 whitespace-nowrap shadow">
            🇮🇳 {originPort}
          </div>
        </div>

        {/* Milestone Node 2: Open Ocean Voyage */}
        <div className="absolute top-[48%] left-[48%] -translate-x-1/2 -translate-y-1/2">
          <div className="px-2.5 py-1 rounded-full bg-slate-900/90 border border-ocean-500/50 text-[10px] text-ocean-300 font-mono tracking-wide flex items-center gap-1.5 shadow-lg backdrop-blur">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            Indian Ocean Passage (~850 NM)
          </div>
        </div>

        {/* Milestone Node 3: Malé Commercial Seaport */}
        <div className="absolute top-[68%] left-[73%] -translate-x-1/2 -translate-y-1/2 group">
          <div className="relative flex items-center justify-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
              currentIndex >= 6 ? 'bg-emerald-500 border-white text-white' : 'bg-slate-800 border-slate-600 text-slate-400'
            }`}>
              <Anchor className="w-3 h-3" />
            </div>
          </div>
          <div className="mt-1.5 px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700 text-[10px] font-medium text-slate-200 whitespace-nowrap shadow">
            🇲🇻 Malé Seaport (MLE)
          </div>
        </div>

        {/* Milestone Node 4: Island Destination */}
        <div className="absolute top-[78%] left-[86%] -translate-x-1/2 -translate-y-1/2 group">
          <div className="relative flex items-center justify-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
              currentIndex >= 9 ? 'bg-emerald-500 border-white text-white' : 'bg-slate-800 border-slate-600 text-slate-400'
            }`}>
              {currentIndex >= 9 ? <CheckCircle2 className="w-3 h-3 text-white" /> : <MapPin className="w-3 h-3" />}
            </div>
          </div>
          <div className="mt-1.5 px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700 text-[10px] font-medium text-emerald-300 whitespace-nowrap shadow">
            🏝️ {destinationIsland}
          </div>
        </div>

        {/* Dynamic Moving Cargo Vessel / Delivery Icon */}
        <motion.div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          animate={{
            top: `${pos.y}%`,
            left: `${pos.x}%`
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <div className="relative flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-ocean-600 to-sky-400 p-0.5 shadow-[0_0_20px_rgba(56,189,248,0.7)] flex items-center justify-center text-white">
              {currentIndex >= 8 ? (
                <Truck className="w-4 h-4 animate-bounce" />
              ) : (
                <Ship className="w-4 h-4 animate-pulse" />
              )}
            </div>
            <div className="mt-1 px-2 py-0.5 bg-sky-950/95 border border-sky-400/80 rounded text-[9px] font-semibold text-sky-200 tracking-wider whitespace-nowrap shadow-lg">
              {pos.text}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stage Flow Indicator Steps */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-xs">
        <div className={`p-2.5 rounded-lg border ${currentIndex >= 0 && currentIndex <= 4 ? 'bg-ocean-950/60 border-ocean-500/60 text-ocean-200' : 'bg-slate-900/40 border-slate-800/60 text-slate-400'}`}>
          <div className="font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            1. India Sourcing & Hub
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Procurement, Sea-packing & Port Clearance</p>
        </div>

        <div className={`p-2.5 rounded-lg border ${currentIndex === 5 ? 'bg-sky-950/80 border-sky-400 text-sky-200 shadow-[0_0_15px_rgba(14,165,233,0.3)]' : 'bg-slate-900/40 border-slate-800/60 text-slate-400'}`}>
          <div className="font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            2. Ocean Transit
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Laccadive Sea Corridor to Malé</p>
        </div>

        <div className={`p-2.5 rounded-lg border ${currentIndex >= 6 && currentIndex <= 7 ? 'bg-amber-950/60 border-amber-500/60 text-amber-200' : 'bg-slate-900/40 border-slate-800/60 text-slate-400'}`}>
          <div className="font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            3. Port & Customs
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Maldives Customs Service & Tariff Verification</p>
        </div>

        <div className={`p-2.5 rounded-lg border ${currentIndex >= 8 ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200' : 'bg-slate-900/40 border-slate-800/60 text-slate-400'}`}>
          <div className="font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            4. Island Delivery
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Dispatched to Island & Handed Over</p>
        </div>
      </div>
    </div>
  );
};
