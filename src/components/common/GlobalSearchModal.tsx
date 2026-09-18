import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Package, ShoppingBag, Ship, User, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from './StatusBadge';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, orders, products, shipments } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  // Filter Orders
  const matchingOrders = orders.filter(o =>
    o.id.toLowerCase().includes(q) ||
    o.customerName.toLowerCase().includes(q) ||
    o.island.toLowerCase().includes(q) ||
    o.items.some(i => i.product.title.toLowerCase().includes(q))
  ).slice(0, 4);

  // Filter Products
  const matchingProducts = products.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.sku.toLowerCase().includes(q)
  ).slice(0, 4);

  // Filter Shipments
  const matchingShipments = shipments.filter(s =>
    s.id.toLowerCase().includes(q) ||
    s.vesselName.toLowerCase().includes(q) ||
    s.originPort.toLowerCase().includes(q)
  ).slice(0, 3);

  const hasResults = matchingOrders.length > 0 || matchingProducts.length > 0 || matchingShipments.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-navy-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search orders (KD-10284), products (Rice Cooker), vessels, islands..."
            className="w-full bg-transparent border-none outline-none text-navy-900 placeholder:text-slate-400 text-sm sm:text-base font-normal"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-500 font-mono"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto divide-y divide-slate-100 space-y-4">
          {!query.trim() ? (
            <div className="py-8 text-center">
              <div className="inline-flex p-3 rounded-2xl bg-ocean-50 text-ocean-600 mb-2">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-navy-900">Search Kadalodi Network</p>
              <p className="text-xs text-slate-500 mt-1">
                Try searching for <span className="font-semibold text-ocean-600">"KD-10284"</span>, <span className="font-semibold text-ocean-600">"Ahmed"</span>, <span className="font-semibold text-ocean-600">"Rice Cooker"</span>, or <span className="font-semibold text-ocean-600">"Hulhumalé"</span>
              </p>
            </div>
          ) : !hasResults ? (
            <div className="py-8 text-center text-slate-500">
              <p className="text-sm">No results found for "{query}"</p>
              <p className="text-xs mt-1">Check spelling or search by order ID like KD-10284.</p>
            </div>
          ) : (
            <>
              {/* Matching Orders */}
              {matchingOrders.length > 0 && (
                <div className="pt-2 first:pt-0">
                  <div className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-2 flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-ocean-500" />
                    Orders ({matchingOrders.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchingOrders.map(order => (
                      <div
                        key={order.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigate(`/track/${order.id}`);
                        }}
                        className="group flex items-center justify-between p-3 rounded-xl hover:bg-ocean-50/60 border border-transparent hover:border-ocean-200 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-ocean-100 text-ocean-700 flex items-center justify-center font-bold text-xs shrink-0">
                            KD
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-navy-900 group-hover:text-ocean-700">
                                {order.id}
                              </span>
                              <span className="text-xs text-slate-400">•</span>
                              <span className="text-xs text-slate-600 font-medium">
                                {order.customerName} ({order.island})
                              </span>
                            </div>
                            <div className="text-xs text-slate-500 line-clamp-1">
                              {order.items.map(i => `${i.product.title} (x${i.quantity})`).join(', ')}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <StatusBadge status={order.status} size="sm" />
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-ocean-600 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matching Products */}
              {matchingProducts.length > 0 && (
                <div className="pt-3">
                  <div className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-2 flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5 text-emerald-500" />
                    Products ({matchingProducts.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchingProducts.map(product => (
                      <div
                        key={product.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigate(`/product/${product.id}`);
                        }}
                        className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 border border-transparent hover:border-emerald-200 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <div className="font-medium text-sm text-navy-900 group-hover:text-emerald-700 line-clamp-1">
                              {product.title}
                            </div>
                            <div className="text-xs text-slate-500">
                              {product.category} • Sourced from {product.originCity}
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="font-bold text-sm text-navy-900">
                            MVR {product.mvrPrice.toLocaleString()}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            ₹{product.inrCost.toLocaleString()} INR
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matching Cargo Shipments */}
              {matchingShipments.length > 0 && (
                <div className="pt-3">
                  <div className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-2 flex items-center gap-1.5">
                    <Ship className="w-3.5 h-3.5 text-sky-500" />
                    Maritime Shipments ({matchingShipments.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchingShipments.map(shipment => (
                      <div
                        key={shipment.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigate('/india/shipments');
                        }}
                        className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-sky-50/60 border border-transparent hover:border-sky-200 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                            <Ship className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-navy-900 group-hover:text-sky-700">
                              {shipment.id} — {shipment.vesselName}
                            </div>
                            <div className="text-xs text-slate-500">
                              {shipment.originPort} ➔ {shipment.destinationPort}
                            </div>
                          </div>
                        </div>

                        <div className="text-xs font-semibold text-ocean-600 bg-ocean-50 px-2.5 py-1 rounded-full">
                          {shipment.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px]">Enter</kbd> to select
          </span>
          <span>Kadalodi Universal Index</span>
        </div>
      </div>
    </div>
  );
};
