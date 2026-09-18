import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Ship, ArrowRight, ShieldCheck, Clock, MapPin, Anchor, Sparkles, Box, CheckCircle2 } from 'lucide-react';

export const HeroLogisticsVoyage: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#091C33] via-[#0D2440] to-[#0A192F] text-white py-16 sm:py-24 border-b border-slate-800">
      {/* Dynamic ambient sea wave glows */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-ocean-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ocean-500/15 border border-ocean-400/30 text-ocean-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Direct India ➔ Maldives Commerce & Freight Corridor</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Shop India.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-ocean-400 to-teal-300">
                Delivered across Maldives.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              Discover authentic appliances, groceries, textiles, and equipment sourced directly from India's trusted brands. We manage the complete journey: Indian hub sourcing, ocean cargo, Maldives Customs clearance, and doorstep delivery across every island.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/shop"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-ocean-500 to-sky-500 hover:from-ocean-600 hover:to-sky-600 text-white font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-ocean-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/track/KD-10284"
                className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-sm sm:text-base border border-slate-700 flex items-center gap-2 shadow-sm transition-all"
              >
                <Ship className="w-4 h-4 text-ocean-400" />
                <span>Track Demo Order (KD-10284)</span>
              </Link>
            </div>

            {/* Micro value badges */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-ocean-500/20 text-ocean-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">Zero Hidden Duties</div>
                  <div className="text-[11px] text-slate-400">Customs cleared</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">7–12 Days Transit</div>
                  <div className="text-[11px] text-slate-400">Scheduled vessels</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">All Island Coverage</div>
                  <div className="text-[11px] text-slate-400">Doorstep & harbor</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Interactive Voyage Graphic Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/95 to-[#06121E]/95 border border-slate-700/80 p-6 shadow-2xl backdrop-blur-xl">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-slate-200">Active Cargo Corridor</span>
                </div>
                <span className="font-mono text-ocean-400 bg-ocean-950/80 px-2 py-0.5 rounded border border-ocean-800">
                  VESSEL: MV MALDIVIAN EXPRESS
                </span>
              </div>

              {/* 5-Step Visual Journey Card */}
              <div className="py-6 space-y-4 relative">
                {/* Step 1: India */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-ocean-500/20 text-ocean-400 border border-ocean-500/40 flex items-center justify-center font-bold text-xs shrink-0 shadow-inner">
                    🇮🇳
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-white">Chennai Sourcing Hub, India</h4>
                      <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                        Inspected
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Direct manufacturer procurement & export palletization.
                    </p>
                  </div>
                </div>

                {/* Ocean Line */}
                <div className="ml-4 pl-4 border-l-2 border-dashed border-ocean-500/40 py-1">
                  <div className="p-2.5 rounded-xl bg-ocean-950/60 border border-ocean-500/30 text-xs flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Ship className="w-4 h-4 text-sky-400 animate-bounce" />
                      <span className="font-semibold text-ocean-200">Indian Ocean Transit (850 NM)</span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400">14.8 Knots</span>
                  </div>
                </div>

                {/* Step 2: Maldives Port & Customs */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/40 flex items-center justify-center font-bold text-xs shrink-0 shadow-inner">
                    🇲🇻
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-white">Malé Commercial Seaport</h4>
                      <span className="text-[10px] text-ocean-400 font-semibold bg-ocean-950/60 px-2 py-0.5 rounded border border-ocean-800">
                        Berth 3
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Maldives Customs Service electronic declaration & duty clearance.
                    </p>
                  </div>
                </div>

                {/* Local Delivery Line */}
                <div className="ml-4 pl-4 border-l-2 border-dashed border-teal-500/40 py-1">
                  <div className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/30 text-xs flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-teal-400" />
                      <span className="font-semibold text-teal-200">Hulhumalé Gateway Hub</span>
                    </div>
                    <span className="text-[10px] text-teal-300 font-mono">Island Sorting</span>
                  </div>
                </div>

                {/* Step 3: Doorstep */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold text-xs shrink-0 shadow-inner">
                    🏝️
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-white">Customer Doorstep Delivery</h4>
                      <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                        Handover
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Direct to apartments in Malé, Hulhumalé & island harbors via ferry.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mini Sample Order Preview Card */}
              <div className="mt-2 p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <Box className="w-4 h-4 text-ocean-400" />
                  <div>
                    <div className="font-bold text-white">Sample Order KD-10284</div>
                    <div className="text-[11px] text-slate-400">Prestige Rice Cooker ➔ Hulhumalé</div>
                  </div>
                </div>

                <Link
                  to="/track/KD-10284"
                  className="px-3 py-1.5 rounded-lg bg-ocean-600 hover:bg-ocean-500 text-white font-semibold text-xs transition-colors"
                >
                  Live Track ➔
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
