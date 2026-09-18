import React from 'react';
import { Link } from 'react-router-dom';
import { Ship, Anchor, ShieldCheck, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#071322] text-slate-300 pt-14 pb-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-ocean-500 flex items-center justify-center text-white shadow-md">
                <Ship className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">KADALODI</span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              <strong>Connecting the Islands. Moving Everyday Life.</strong>
              <br />
              Shop directly from India's leading manufacturers and retail networks. Direct ocean cargo logistics, Maldives Customs clearance, and doorstep delivery across all atolls.
            </p>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-slate-800/80 text-ocean-300 border border-slate-700">
                🚢 Chennai ➔ Malé Ocean Freight
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800/80 text-emerald-300 border border-slate-700">
                📦 Customs Cleared
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800/80 text-sky-300 border border-slate-700">
                🏝️ Doorstep Delivery
              </span>
            </div>
          </div>

          {/* Customer Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Shop & Discover</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/shop" className="hover:text-ocean-400 transition-colors">Product Catalogue</Link></li>
              <li><Link to="/request-from-india" className="hover:text-ocean-400 transition-colors">Request from India Quote</Link></li>
              <li><Link to="/track/KD-10284" className="hover:text-ocean-400 transition-colors">Track Shipment KD-10284</Link></li>
              <li><Link to="/orders" className="hover:text-ocean-400 transition-colors">My Past Orders</Link></li>
            </ul>
          </div>

          {/* Island Coverage */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Delivery Coverage</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-ocean-400" /> Malé (All Wards)</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-ocean-400" /> Hulhumalé (Phases 1 & 2)</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-ocean-400" /> Addu City (Hithadhoo, Feydhoo)</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-ocean-400" /> Fuvahmulah & Thinadhoo</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-ocean-400" /> Kulhudhuffushi & Northern Atolls</li>
            </ul>
          </div>

          {/* Operational Hubs */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Operational Hubs</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div>
                <p className="font-semibold text-white">Chennai Sourcing Hub</p>
                <p className="text-[11px] text-slate-500">Ambattur Industrial Area, Chennai</p>
              </div>
              <div className="pt-2">
                <p className="font-semibold text-white">Malé Commercial Hub</p>
                <p className="text-[11px] text-slate-500">Boduthakurufaanu Magu, Malé</p>
              </div>
              <div className="pt-2 flex items-center gap-1.5 text-ocean-400 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Maldives Customs Licensed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 KADALODI Commerce & Logistics Platform. Self-contained interactive product demo.</p>
          <div className="flex items-center gap-4">
            <span>Prices quoted in Maldivian Rufiyaa (MVR)</span>
            <span>•</span>
            <span>All-inclusive cross-border delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
