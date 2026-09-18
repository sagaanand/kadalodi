import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  Ship,
  ShieldCheck,
  CreditCard,
  Building2,
  Banknote,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Clock,
  Package,
  AlertCircle
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, cartTotals, createOrder } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [formData, setFormData] = useState({
    customerName: 'Ahmed Hassan',
    customerPhone: '+960 778-4321',
    island: 'Hulhumalé',
    address: 'Flat 4B, Lotus Tower, Nirolhu Magu, Phase 1',
    notes: 'Please contact 15 minutes before arrival',
    deliveryMethod: 'Standard Ocean Cargo (7–12 days)',
    paymentMethod: 'Bank of Maldives Gateway'
  });

  const islandOptions = [
    'Hulhumalé (Phase 1 & 2)',
    'Malé City (Henveiru, Galolhu, Machangoalhi, Maafannu)',
    'Addu City (Hithadhoo, Maradhoo, Feydhoo)',
    'Fuvahmulah City',
    'Kulhudhuffushi City',
    'Thinadhoo City',
    'Other Atoll (Outer Island Harbour Delivery)'
  ];

  const handlePlaceOrder = () => {
    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }

    const order = createOrder({
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      island: formData.island.split('(')[0].trim(),
      address: formData.address,
      notes: formData.notes,
      paymentMethod: formData.paymentMethod
    });

    navigate(`/order/${order.id}`);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-3xl border border-slate-200">
          <p className="text-sm font-bold text-navy-900">Your cart is empty</p>
          <button
            onClick={() => navigate('/shop')}
            className="mt-4 px-4 py-2 rounded-xl bg-ocean-600 text-white text-xs font-semibold"
          >
            Go to Catalogue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Step Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-xl mx-auto">
            {[
              { num: 1, label: '01 Address' },
              { num: 2, label: '02 Delivery' },
              { num: 3, label: '03 Payment' },
              { num: 4, label: '04 Review' },
            ].map(s => (
              <div key={s.num} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                    step >= s.num
                      ? 'bg-ocean-600 text-white shadow-xs'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                </div>
                <span className={`text-xs font-semibold hidden sm:inline ${
                  step >= s.num ? 'text-navy-900' : 'text-slate-400'
                }`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main Step Form */}
          <div className="md:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            {/* Step 1: Address */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-lg font-extrabold text-navy-900">Delivery Address in Maldives</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Your shipment will clear Maldives Customs and be routed directly to this island location.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.customerName}
                      onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-navy-900 outline-none focus:border-ocean-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Maldives Phone Number</label>
                    <input
                      type="text"
                      value={formData.customerPhone}
                      onChange={e => setFormData({ ...formData, customerPhone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-navy-900 outline-none focus:border-ocean-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Select Island / Locality</label>
                  <select
                    value={formData.island}
                    onChange={e => setFormData({ ...formData, island: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-navy-900 outline-none focus:border-ocean-500 font-medium"
                  >
                    {islandOptions.map(island => (
                      <option key={island} value={island}>{island}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Street Address / Apartment</label>
                  <textarea
                    rows={2}
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-navy-900 outline-none focus:border-ocean-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Delivery Instructions (Optional)</label>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Gate code, ferry harbor notes, preferred call time..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-navy-900 outline-none focus:border-ocean-500"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 rounded-xl bg-navy-900 text-white font-bold text-xs flex items-center gap-2 hover:bg-navy-800 transition-colors"
                  >
                    <span>Continue to Delivery</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Delivery */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-lg font-extrabold text-navy-900">Select Cross-Border Delivery</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Ocean consolidation from Chennai/Cochin Hub directly to Malé Seaport.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border-2 border-ocean-500 bg-ocean-50/40 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-ocean-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Ship className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-navy-900">Standard Ocean Cargo Corridor</h4>
                        <span className="text-[10px] font-bold bg-ocean-100 text-ocean-800 px-2 py-0.5 rounded-full">
                          Recommended
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        Consolidated container freight via Chennai Port to Malé Commercial Seaport with last-mile island dispatch.
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1 font-semibold text-navy-900">
                          <Clock className="w-3.5 h-3.5 text-ocean-600" />
                          7–12 business days
                        </span>
                        <span>•</span>
                        <span>Full insurance included</span>
                      </div>
                    </div>
                  </div>

                  <span className="font-extrabold text-sm text-ocean-700 whitespace-nowrap">
                    MVR {cartTotals.shippingMvr}
                  </span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Maldives Customs electronic clearance pre-processed by Kadalodi Ops.</span>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-navy-900 flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 rounded-xl bg-navy-900 text-white font-bold text-xs flex items-center gap-2 hover:bg-navy-800 transition-colors"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-lg font-extrabold text-navy-900">Payment Method</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Demo Mode: Select any simulated payment method below.
                  </p>
                </div>

                {/* Demo Notice Alert */}
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span><strong>Demo Mode Active:</strong> No real bank transactions or real credit card charges will occur.</span>
                </div>

                <div className="space-y-2.5">
                  {[
                    {
                      id: 'Bank of Maldives Gateway',
                      title: 'Bank of Maldives (BML) Payment Gateway',
                      desc: 'Direct debit from BML accounts & MVR Cards',
                      icon: <Building2 className="w-5 h-5 text-red-600" />
                    },
                    {
                      id: 'Credit / Debit Card (Visa & Mastercard)',
                      title: 'International Credit or Debit Card',
                      desc: 'Visa, MasterCard, American Express accepted',
                      icon: <CreditCard className="w-5 h-5 text-ocean-600" />
                    },
                    {
                      id: 'Card on Delivery',
                      title: 'Pay on Doorstep (POS Machine / Cash)',
                      desc: 'Pay our island delivery courier upon parcel handover',
                      icon: <Banknote className="w-5 h-5 text-emerald-600" />
                    }
                  ].map(method => (
                    <label
                      key={method.id}
                      className={`flex items-start gap-3 p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                        formData.paymentMethod === method.id
                          ? 'border-ocean-500 bg-ocean-50/30 shadow-2xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={formData.paymentMethod === method.id}
                        onChange={() => setFormData({ ...formData, paymentMethod: method.id })}
                        className="mt-1 text-ocean-600 focus:ring-ocean-500"
                      />
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-white border border-slate-100 shadow-2xs">
                          {method.icon}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-navy-900">{method.title}</div>
                          <div className="text-[11px] text-slate-500">{method.desc}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-navy-900 flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="px-6 py-2.5 rounded-xl bg-navy-900 text-white font-bold text-xs flex items-center gap-2 hover:bg-navy-800 transition-colors"
                  >
                    <span>Review Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Review & Place Order */}
            {step === 4 && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-lg font-extrabold text-navy-900">Review & Place Your Order</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Please verify delivery destination and products before final confirmation.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="font-bold text-navy-900 mb-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-ocean-600" />
                      <span>Destination</span>
                    </div>
                    <div className="text-slate-700 font-semibold">{formData.customerName}</div>
                    <div className="text-slate-500">{formData.customerPhone}</div>
                    <div className="text-slate-500 mt-1">{formData.address}, {formData.island}</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="font-bold text-navy-900 mb-1 flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-ocean-600" />
                      <span>Payment & Logistics</span>
                    </div>
                    <div className="text-slate-700 font-semibold">{formData.paymentMethod}</div>
                    <div className="text-slate-500 mt-1">Est. Delivery: 7–12 days</div>
                    <div className="text-emerald-700 font-semibold mt-1">Customs Clearance Included</div>
                  </div>
                </div>

                {/* Items preview */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Package Contents ({cartTotals.itemCount} items • {cartTotals.totalWeightKg} kg)
                  </div>
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white">
                    {cart.map(item => (
                      <div key={item.product.id} className="p-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="w-10 h-10 rounded-lg object-cover border border-slate-100"
                          />
                          <div>
                            <div className="font-semibold text-navy-900 line-clamp-1">{item.product.title}</div>
                            <div className="text-slate-400 text-[11px]">Qty: {item.quantity} • Ships from {item.product.originCity}</div>
                          </div>
                        </div>
                        <span className="font-bold text-navy-900">
                          MVR {(item.product.mvrPrice * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center border-t border-slate-100">
                  <button
                    onClick={() => setStep(3)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-navy-900 flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>

                  <button
                    onClick={handlePlaceOrder}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>Place Order (MVR {cartTotals.totalMvr.toLocaleString()})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Sidebar */}
          <div className="md:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
              <h3 className="font-bold text-sm text-navy-900 border-b border-slate-100 pb-2.5">
                Summary Breakdown
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-navy-900">MVR {cartTotals.subtotalMvr.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Ocean Freight ({cartTotals.totalWeightKg} kg)</span>
                  <span className="font-semibold text-navy-900">MVR {cartTotals.shippingMvr.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Island Doorstep Delivery</span>
                  <span className="font-semibold text-navy-900">MVR {cartTotals.deliveryMvr.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-navy-900">
                  <span>Total (MVR)</span>
                  <span className="text-ocean-700 text-base">MVR {cartTotals.totalMvr.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 text-[11px] text-emerald-800 space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>All-Inclusive Guarantee</span>
                </div>
                <p>Includes Indian export documentation, sea freight manifest, and Maldives Customs clearance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
