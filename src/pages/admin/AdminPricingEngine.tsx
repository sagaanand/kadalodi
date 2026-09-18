import React, { useState } from 'react';
import {
  Calculator,
  IndianRupee,
  Ship,
  ShieldCheck,
  Truck,
  Percent,
  RefreshCw,
  Sparkles,
  Info,
  CheckCircle2,
  Boxes
} from 'lucide-react';

export const AdminPricingEngine: React.FC = () => {
  // Configurable Pricing Formula Inputs (Requirement 22)
  const [productCostInr, setProductCostInr] = useState<number>(2500);
  const [indiaHandlingInr, setIndiaHandlingInr] = useState<number>(150);
  const [internationalCargoInr, setInternationalCargoInr] = useState<number>(400);
  const [maldivesHandlingInr, setMaldivesHandlingInr] = useState<number>(120);
  const [maldivesDeliveryInr, setMaldivesDeliveryInr] = useState<number>(100);
  const [taxesDutiesInr, setTaxesDutiesInr] = useState<number>(200);
  const [kadalodiMarginInr, setKadalodiMarginInr] = useState<number>(500);

  // Configurable Mock INR to MVR exchange rate (e.g. 1 INR = 0.185 MVR or 1 MVR = 5.4 INR)
  const [exchangeRateInrToMvr, setExchangeRateInrToMvr] = useState<number>(0.185);

  // Total Landed INR Cost
  const totalCostInr =
    productCostInr +
    indiaHandlingInr +
    internationalCargoInr +
    maldivesHandlingInr +
    maldivesDeliveryInr +
    taxesDutiesInr +
    kadalodiMarginInr;

  // Final MVR Selling Price
  const finalMvrPrice = Math.round(totalCostInr * exchangeRateInrToMvr);

  // Margin percentage on landed cost
  const landedBaseCost = totalCostInr - kadalodiMarginInr;
  const marginPercentage = Number(((kadalodiMarginInr / landedBaseCost) * 100).toFixed(1));

  // Presets
  const applyPreset = (preset: {
    cost: number;
    cargo: number;
    handling: number;
    mhandling: number;
    delivery: number;
    tax: number;
    margin: number;
  }) => {
    setProductCostInr(preset.cost);
    setInternationalCargoInr(preset.cargo);
    setIndiaHandlingInr(preset.handling);
    setMaldivesHandlingInr(preset.mhandling);
    setMaldivesDeliveryInr(preset.delivery);
    setTaxesDutiesInr(preset.tax);
    setKadalodiMarginInr(preset.margin);
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-ocean-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-ocean-700">
              Cross-Border Cost & Margin Calculator
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mt-1">
            Kadalodi Pricing Engine
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparently compute final MVR customer prices by layering India sourcing cost, international cargo freight, customs duties, and logistics margins.
          </p>
        </div>

        <div className="p-2.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
          <Info className="w-4 h-4 text-ocean-600 shrink-0" />
          <span>Configurable mock FX rate: <strong>1 INR = {exchangeRateInrToMvr} MVR</strong></span>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-500">Quick Presets:</span>
        <button
          onClick={() => applyPreset({ cost: 2499, cargo: 350, handling: 120, mhandling: 100, delivery: 80, tax: 150, margin: 450 })}
          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-ocean-300 text-xs font-semibold text-navy-900 transition-colors"
        >
          Prestige Rice Cooker (2.8kg)
        </button>
        <button
          onClick={() => applyPreset({ cost: 650, cargo: 600, handling: 100, mhandling: 80, delivery: 80, tax: 0, margin: 180 })}
          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-ocean-300 text-xs font-semibold text-navy-900 transition-colors"
        >
          Aashirvaad Atta (10kg Heavy)
        </button>
        <button
          onClick={() => applyPreset({ cost: 7800, cargo: 1200, handling: 250, mhandling: 200, delivery: 150, tax: 450, margin: 1500 })}
          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-ocean-300 text-xs font-semibold text-navy-900 transition-colors"
        >
          Luminous Home Inverter (10kg)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
          <h2 className="font-extrabold text-base text-navy-900 border-b border-slate-100 pb-3">
            Cost & Fee Component Layers (in ₹ INR)
          </h2>

          <div className="space-y-4">
            {/* Input 1: Product Cost */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  India Product Cost (Ex-Factory / Distributor)
                </span>
                <span className="font-mono font-bold text-navy-900">₹{productCostInr.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={200}
                max={25000}
                step={50}
                value={productCostInr}
                onChange={e => setProductCostInr(Number(e.target.value))}
                className="w-full accent-ocean-600"
              />
            </div>

            {/* Input 2: India Handling */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  India Warehouse Handling & Pallet Crating
                </span>
                <span className="font-mono font-bold text-navy-900">₹{indiaHandlingInr.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={50}
                max={1500}
                step={25}
                value={indiaHandlingInr}
                onChange={e => setIndiaHandlingInr(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            {/* Input 3: International Ocean Cargo */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  International Ocean Freight (Chennai ➔ Malé Port)
                </span>
                <span className="font-mono font-bold text-navy-900">₹{internationalCargoInr.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={100}
                max={3000}
                step={50}
                value={internationalCargoInr}
                onChange={e => setInternationalCargoInr(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
            </div>

            {/* Input 4: Maldives Handling */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-500" />
                  Maldives Port Terminal Handling & Demurrage Buffer
                </span>
                <span className="font-mono font-bold text-navy-900">₹{maldivesHandlingInr.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={50}
                max={1000}
                step={25}
                value={maldivesHandlingInr}
                onChange={e => setMaldivesHandlingInr(Number(e.target.value))}
                className="w-full accent-teal-600"
              />
            </div>

            {/* Input 5: Maldives Delivery */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Island Doorstep Courier Delivery (Van / Speedboat Ferry)
                </span>
                <span className="font-mono font-bold text-navy-900">₹{maldivesDeliveryInr.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={50}
                max={800}
                step={25}
                value={maldivesDeliveryInr}
                onChange={e => setMaldivesDeliveryInr(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            {/* Input 6: Taxes / Customs Duties */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Maldives Customs Duty & Import Levies
                </span>
                <span className="font-mono font-bold text-navy-900">₹{taxesDutiesInr.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={0}
                max={2500}
                step={25}
                value={taxesDutiesInr}
                onChange={e => setTaxesDutiesInr(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            {/* Input 7: Kadalodi Gross Margin */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  Kadalodi Operating Margin
                </span>
                <span className="font-mono font-bold text-purple-700">₹{kadalodiMarginInr.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={50}
                max={4000}
                step={50}
                value={kadalodiMarginInr}
                onChange={e => setKadalodiMarginInr(Number(e.target.value))}
                className="w-full accent-purple-600"
              />
            </div>

            {/* FX Rate Input */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-slate-700">INR ➔ MVR Exchange Rate</label>
                <p className="text-[11px] text-slate-400">Simulated conversion ratio</p>
              </div>
              <input
                type="number"
                step="0.005"
                min="0.10"
                max="0.30"
                value={exchangeRateInrToMvr}
                onChange={e => setExchangeRateInrToMvr(Number(e.target.value))}
                className="w-24 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-mono font-bold text-navy-900 outline-none text-right"
              />
            </div>
          </div>
        </div>

        {/* Right Live Calculation Results Card (Requirement 22) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-gradient-to-b from-navy-950 to-navy-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[11px] font-mono font-semibold text-ocean-400 uppercase tracking-wider">
                Calculated Landed Selling Price
              </span>
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-white mt-1">
                MVR {finalMvrPrice.toLocaleString()}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Total Landed INR: ₹{totalCostInr.toLocaleString()} • Margin: {marginPercentage}%
              </p>
            </div>

            {/* Detailed Ledger breakdown */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>India Product Cost</span>
                <span className="font-mono">₹{productCostInr.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>International Cargo Freight</span>
                <span className="font-mono">₹{internationalCargoInr.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Hub & Sea Crating</span>
                <span className="font-mono">₹{indiaHandlingInr.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Maldives Handling & Port Clearance</span>
                <span className="font-mono">₹{maldivesHandlingInr.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Island Local Delivery</span>
                <span className="font-mono">₹{maldivesDeliveryInr.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Taxes & Customs Charges</span>
                <span className="font-mono">₹{taxesDutiesInr.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-purple-300 font-semibold">
                <span>Kadalodi Margin</span>
                <span className="font-mono">₹{kadalodiMarginInr.toLocaleString()}</span>
              </div>

              <div className="pt-3 border-t border-slate-700 flex justify-between font-extrabold text-sm text-white">
                <span>Total Landed Cost (INR)</span>
                <span className="font-mono text-ocean-300">₹{totalCostInr.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-extrabold text-base text-sky-400">
                <span>Converted Selling Price (MVR)</span>
                <span className="font-mono">MVR {finalMvrPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Transparent Unit Economics</span>
              </div>
              <p>
                Eliminates middlemen price gouging in the Maldives while guaranteeing profitable margins on freight consolidation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
