import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Star,
  Ship,
  ShieldCheck,
  Truck,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Anchor,
  Check,
  ChevronRight,
  Info,
  MapPin
} from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useApp();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'features' | 'shipping'>('features');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const product = products.find(p => p.id === id) || products[0];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-navy-900">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-navy-900">Catalogue</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-400">{product.category}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy-900 font-semibold line-clamp-1">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Image Showcase */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm aspect-4/3 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-navy-950/85 text-white backdrop-blur shadow-md">
                  <Ship className="w-3.5 h-3.5 text-sky-400" />
                  Direct from India Hub
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/90 text-slate-800 shadow-sm">
                  {product.originCity}
                </span>
              </div>
            </div>

            {/* Cross-border Quality Assurance Card */}
            <div className="p-4 rounded-2xl bg-ocean-50/60 border border-ocean-100 flex items-center justify-between text-xs text-ocean-900">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-ocean-600 shrink-0" />
                <div>
                  <div className="font-bold">Kadalodi Cross-Border Guarantee</div>
                  <div className="text-slate-500 text-[11px]">
                    100% Genuine OEM Indian stock with tamper-evident seaworthy crating.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Purchasing & Logistics Details */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-ocean-700 uppercase tracking-wider bg-ocean-50 px-2.5 py-0.5 rounded-md">
                  {product.category}
                </span>
                <span className="text-xs font-medium text-slate-500">• Brand: {product.brand}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight leading-tight">
                {product.title}
              </h1>

              {/* Rating & Stock */}
              <div className="flex items-center gap-4 mt-3 text-xs">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-slate-800">{product.rating}</span>
                  <span className="text-slate-400">({product.reviewsCount} customer reviews)</span>
                </div>
                <span className="text-slate-300">|</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Available for Sourcing & Shipment
                </span>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-3xl font-extrabold text-navy-900">
                    MVR {product.mvrPrice.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Approx. ₹{product.inrCost.toLocaleString()} INR Indian retail equivalent
                  </div>
                </div>

                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  All-Inclusive Cross-Border Price
                </span>
              </div>

              <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                Price includes Indian sourcing, export packing, sea freight to Malé, customs clearance, and local island delivery handling.
              </p>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-600">Quantity:</span>
                <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-sm font-bold text-navy-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-xs text-slate-400">Total weight: {(product.weightKg * quantity).toFixed(1)} kg</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className={`py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all ${
                    addedAnimation
                      ? 'bg-emerald-600 text-white scale-[1.02]'
                      : 'bg-navy-900 hover:bg-navy-800 text-white'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-sky-400" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-ocean-500 to-sky-500 hover:from-ocean-600 hover:to-sky-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-ocean-500/25 transition-all"
                >
                  <span>Buy Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Logistics Journey Card (Requirement 7) */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-sm text-navy-900 flex items-center gap-2">
                  <Ship className="w-4 h-4 text-ocean-600" />
                  <span>Logistics Journey & Delivery Route</span>
                </h3>
                <span className="text-xs font-semibold text-ocean-700 bg-ocean-50 px-2 py-0.5 rounded">
                  {product.shippingEstimateDays}
                </span>
              </div>

              {/* Visual Logistics Pathway */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="font-bold text-navy-900">1. India Hub</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Sourced & Packed</div>
                </div>
                <div className="p-2 rounded-xl bg-ocean-50 border border-ocean-100">
                  <div className="font-bold text-ocean-800">2. Cargo Ship</div>
                  <div className="text-[10px] text-ocean-600 mt-0.5">Indian Ocean</div>
                </div>
                <div className="p-2 rounded-xl bg-teal-50 border border-teal-100">
                  <div className="font-bold text-teal-800">3. Malé Port</div>
                  <div className="text-[10px] text-teal-600 mt-0.5">Customs Cleared</div>
                </div>
                <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100">
                  <div className="font-bold text-emerald-800">4. Doorstep</div>
                  <div className="text-[10px] text-emerald-600 mt-0.5">Island Delivery</div>
                </div>
              </div>

              {/* What's Included */}
              <div className="pt-2 text-xs space-y-1.5">
                <div className="font-semibold text-navy-900 mb-1">What's included in Kadalodi service:</div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>India procurement, serial verification, and heavy duty packing</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Scheduled ocean container freight directly to Malé</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Maldives Customs Service electronic declaration processing</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Doorstep delivery to homes, apartments & island harbors</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-400 italic">
                * Actual taxes and port demurrage charges may vary according to customs tariff code schedules.
              </div>
            </div>

            {/* Specifications */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 text-xs space-y-2">
              <h4 className="font-bold text-navy-900">Product Highlights & Specifications</h4>
              <ul className="space-y-1.5 text-slate-600">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ocean-500" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
