import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeroLogisticsVoyage } from '../../components/customer/HeroLogisticsVoyage';
import { ProductCard } from '../../components/customer/ProductCard';
import { useApp } from '../../context/AppContext';
import { PRODUCT_CATEGORIES } from '../../data/mockProducts';
import {
  Ship,
  Anchor,
  ShieldCheck,
  Truck,
  ArrowRight,
  Package,
  Layers,
  Sparkles,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Quote
} from 'lucide-react';

export const CustomerHome: React.FC = () => {
  const { products } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All'
    ? products.slice(0, 8)
    : products.filter(p => p.category === selectedCategory).slice(0, 8);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <HeroLogisticsVoyage />

      {/* Live Maritime Corridor Ticker */}
      <div className="bg-[#08182B] text-white border-y border-slate-800 py-3 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold uppercase tracking-wider text-ocean-300">Corridor Status:</span>
          </div>
          <div className="flex-1 overflow-x-auto whitespace-nowrap text-slate-300 flex items-center gap-8 scrollbar-none font-medium">
            <span>🚢 <strong>MV Maldivian Express:</strong> Laccadive Sea transit underway (ETA Malé: 24 Sep)</span>
            <span>📦 <strong>Malé Port Customs:</strong> 54 consignments released today for Hulhumalé & Addu</span>
            <span>⚓ <strong>Next Sourcing Cut-off:</strong> Cochin Port consolidation departs 22 Sep</span>
            <span>🏝️ <strong>Atoll Coverage:</strong> Regular ferry logistics active for Fuvahmulah & Thinadhoo</span>
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-bold text-ocean-600 uppercase tracking-wider">
              India Sourcing Catalogue
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mt-0.5">
              Curated for Maldivian Island Living
            </h2>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-ocean-600 hover:text-ocean-700"
          >
            <span>View All 20+ Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {PRODUCT_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-navy-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* How Kadalodi Works Section */}
      <section className="bg-white border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold text-ocean-600 uppercase tracking-wider">
              The Cross-Border Model
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mt-1">
              How India ➔ Maldives Commerce Moves
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              From Chennai, Mumbai, and Bengaluru directly to your doorstep in the Maldives. Complete transparent tracking at every milestone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 relative">
              <div className="w-12 h-12 rounded-xl bg-ocean-50 text-ocean-600 flex items-center justify-center font-bold text-lg mb-4">
                01
              </div>
              <h3 className="font-bold text-base text-navy-900 mb-1">
                Browse & Order in MVR
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose genuine products from Indian brand depots. All pricing clearly listed in Maldivian Rufiyaa with zero surprise costs.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 relative">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg mb-4">
                02
              </div>
              <h3 className="font-bold text-base text-navy-900 mb-1">
                India Hub Inspection & Packing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Items are inspected at our Chennai export center, packaged in heavy-duty sea crating, and cleared for maritime transit.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 relative">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-lg mb-4">
                03
              </div>
              <h3 className="font-bold text-base text-navy-900 mb-1">
                Ocean Freight to Malé
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Containers sail aboard scheduled cargo vessels across the Indian Ocean corridor directly into Malé Commercial Port.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 relative">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg mb-4">
                04
              </div>
              <h3 className="font-bold text-base text-navy-900 mb-1">
                Customs & Doorstep Delivery
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kadalodi handles Maldives Customs declarations and hands over to island couriers for final delivery to your home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* "Request from India" Sourcing Feature Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative rounded-3xl bg-gradient-to-r from-navy-950 via-navy-900 to-ocean-900 p-8 sm:p-12 text-white overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-ocean-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-ocean-300 text-xs font-semibold backdrop-blur">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Custom Sourcing Service
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Can't find what you need? <br />
              <span className="text-sky-300">Request it from India.</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Looking for a specific spare part, home appliance, medical supply, or wholesale merchandise from India? Paste any link from Amazon.in, Flipkart, or an Indian manufacturer and receive an all-inclusive MVR quote delivered to your island.
            </p>

            <div className="pt-2">
              <Link
                to="/request-from-india"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-navy-950 font-bold text-sm hover:bg-ocean-50 transition-all shadow-lg"
              >
                <span>Request a Free Sourcing Quote</span>
                <ArrowRight className="w-4 h-4 text-ocean-600" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Maldivian Island Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h3 className="text-2xl font-bold text-navy-900">Trusted Across the Atolls</h3>
          <p className="text-xs text-slate-500 mt-1">Real feedback from customers in Malé, Hulhumalé, and outer islands.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "Ordering Prestige cookware and spice packs from India used to mean asking relatives traveling from Trivandrum. With Kadalodi, the items arrived right at my apartment door in Hulhumalé Phase 2 within 9 days."
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs text-navy-900">Ahmed Hassan</h4>
                <p className="text-[11px] text-slate-400">Hulhumalé (Customer #10284)</p>
              </div>
              <span className="text-amber-500 text-xs">★★★★★</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "We run a safari boat out of Malé harbour. Getting genuine marine tools and Bajaj mixers through Kadalodi saved us nearly 40% compared to local resale prices, and Maldives Customs was completely hassle-free."
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs text-navy-900">Ibrahim Waheed</h4>
                <p className="text-[11px] text-slate-400">Addu City & Malé</p>
              </div>
              <span className="text-amber-500 text-xs">★★★★★</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "The tracking interface is the best part. Seeing our shipment loaded in Chennai, sailing across the ocean, and being sorted in Malé gave us complete peace of mind."
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs text-navy-900">Mariyam Shifa</h4>
                <p className="text-[11px] text-slate-400">Henveiru, Malé</p>
              </div>
              <span className="text-amber-500 text-xs">★★★★★</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
