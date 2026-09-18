import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Link2,
  FileText,
  Upload,
  ArrowRight,
  CheckCircle2,
  Ship,
  Clock,
  IndianRupee,
  ShieldCheck,
  SearchCheck,
  Building2,
  HelpCircle
} from 'lucide-react';

export const RequestFromIndia: React.FC = () => {
  const { sourcingRequests, addSourcingRequest } = useApp();

  const [productName, setProductName] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [category, setCategory] = useState('Home Appliances');
  const [quantity, setQuantity] = useState(1);
  const [targetPriceInr, setTargetPriceInr] = useState<number | ''>('');
  const [customerName, setCustomerName] = useState('Ahmed Hassan');
  const [customerContact, setCustomerContact] = useState('+960 778-4321');
  const [island, setIsland] = useState('Hulhumalé');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim()) return;

    addSourcingRequest({
      productName,
      productUrl: productUrl || undefined,
      category,
      quantity,
      targetPriceInr: targetPriceInr ? Number(targetPriceInr) : undefined,
      customerName,
      customerContact,
      island,
      notes: notes || undefined
    });

    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Hero Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-navy-950 via-navy-900 to-ocean-950 p-8 sm:p-12 text-white border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-ocean-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean-500/20 text-sky-300 text-xs font-semibold border border-ocean-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct India Sourcing On Demand</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Can't find what you need? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-teal-300">
                Request it directly from India.
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Paste a link from Amazon India, Flipkart, IndiaMART, or describe what you want. Our Chennai procurement desk verifies quality, calculates sea freight and Maldives Customs, and gives you an all-inclusive MVR quote.
            </p>
          </div>
        </div>

        {/* 7-Stage Sourcing Pipeline Diagram (Requirement 23) */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            How The Sourcing Pipeline Works
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-xs">
            {[
              { num: '01', title: 'Request', sub: 'Submit link or specs' },
              { num: '02', title: 'India Sourcing', sub: 'Vendor negotiation' },
              { num: '03', title: 'Price Calc', sub: 'Landed cost analysis' },
              { num: '04', title: 'Cargo Calc', sub: 'Sea volume & weight' },
              { num: '05', title: 'MVR Quote', sub: 'All-inclusive delivered' },
              { num: '06', title: 'Accept', sub: 'Confirm quotation' },
              { num: '07', title: 'Shipped', sub: 'Delivered to island' }
            ].map(stage => (
              <div key={stage.num} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                <span className="text-[10px] font-bold text-ocean-600 font-mono">{stage.num}</span>
                <div className="font-bold text-navy-900 mt-1">{stage.title}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{stage.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sourcing Request Form or Success Message */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-navy-900">Request Submitted Successfully!</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Our Chennai sourcing team is inspecting availability with Indian suppliers. You will receive an all-inclusive MVR quotation within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setProductName('');
                    setProductUrl('');
                    setNotes('');
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-navy-900 text-white font-bold text-xs hover:bg-navy-800"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-navy-900">Tell Us What You Want</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Provide either a product URL or the brand & model details.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Product Name / Description *
                  </label>
                  <input
                    type="text"
                    required
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                    placeholder="e.g. Bosch 7kg Front Load Washing Machine, Godrej Safe, Yamaha Outboard Propeller..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-navy-900 outline-none focus:border-ocean-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Link2 className="w-3.5 h-3.5 text-ocean-600" />
                    <span>Indian Product URL (Optional)</span>
                  </label>
                  <input
                    type="url"
                    value={productUrl}
                    onChange={e => setProductUrl(e.target.value)}
                    placeholder="https://amazon.in/dp/... or https://flipkart.com/..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-navy-900 outline-none focus:border-ocean-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-navy-900 outline-none focus:border-ocean-500 font-medium"
                    >
                      <option value="Home Appliances">Home Appliances</option>
                      <option value="Electronics & IT">Electronics & IT</option>
                      <option value="Marine & Auto Spares">Marine & Auto Spares</option>
                      <option value="Food & Wholesale Spices">Food & Wholesale Spices</option>
                      <option value="Furniture & Decor">Furniture & Decor</option>
                      <option value="Industrial Tools">Industrial Tools</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Quantity</label>
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={e => setQuantity(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-navy-900 outline-none focus:border-ocean-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Target Price in India (₹ INR)
                    </label>
                    <input
                      type="number"
                      value={targetPriceInr}
                      onChange={e => setTargetPriceInr(e.target.value ? Number(e.target.value) : '')}
                      placeholder="e.g. 15000"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-navy-900 outline-none focus:border-ocean-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-navy-900 outline-none focus:border-ocean-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Maldives Contact</label>
                    <input
                      type="text"
                      required
                      value={customerContact}
                      onChange={e => setCustomerContact(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-navy-900 outline-none focus:border-ocean-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Destination Island</label>
                    <input
                      type="text"
                      required
                      value={island}
                      onChange={e => setIsland(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-navy-900 outline-none focus:border-ocean-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Special Sourcing Notes / Voltage / Brand Preferences
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Must be 230V 50Hz for Maldives power grid; include extra filters or marine grade fasteners..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-navy-900 outline-none focus:border-ocean-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Free quotation with zero purchasing obligation</span>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-ocean-600 to-sky-600 hover:from-ocean-700 hover:to-sky-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-ocean-500/25 transition-all"
                  >
                    <span>Request Sourcing Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Sidebar: Active Quotes List */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-navy-900 border-b border-slate-100 pb-2.5">
                Recent Sourcing Requests ({sourcingRequests.length})
              </h3>

              <div className="space-y-3">
                {sourcingRequests.map(req => (
                  <div key={req.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-navy-900 line-clamp-1">{req.productName}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        req.status === 'Quote Ready' ? 'bg-emerald-100 text-emerald-800' :
                        req.status === 'Order Created' ? 'bg-sky-100 text-sky-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {req.status}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-500">
                      Destination: {req.island} • Qty: {req.quantity}
                    </div>

                    {req.quotedMvr && (
                      <div className="pt-2 border-t border-slate-200/80 flex items-baseline justify-between">
                        <span className="text-[11px] text-slate-500">Delivered Quote:</span>
                        <span className="font-extrabold text-sm text-ocean-700">
                          MVR {req.quotedMvr.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
