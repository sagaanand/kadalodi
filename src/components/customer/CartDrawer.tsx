import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Ship, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CartDrawer: React.FC = () => {
  const { isCartDrawerOpen, setIsCartDrawerOpen, cart, cartTotals, updateCartQuantity, removeFromCart } = useApp();
  const navigate = useNavigate();

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-navy-950/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={() => setIsCartDrawerOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-ocean-100 text-ocean-700 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-navy-900 text-base">Your Cart</h3>
                <p className="text-xs text-slate-500">
                  {cartTotals.itemCount} {cartTotals.itemCount === 1 ? 'item' : 'items'} • Ships from India
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="py-20 text-center text-slate-400">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30 text-slate-400" />
                <p className="text-base font-semibold text-navy-900">Your cart is empty</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Browse products sourced directly from Indian brands and delivered across the Maldives.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/shop');
                  }}
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-ocean-600 text-white text-xs font-semibold hover:bg-ocean-700 shadow-sm"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-white shadow-xs"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-16 h-16 rounded-lg object-cover border border-slate-100 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-xs text-navy-900 line-clamp-1">
                      {item.product.title}
                    </h4>
                    <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                      <span>Ships from {item.product.originCity.split(',')[0]}</span>
                      <span>•</span>
                      <span>{item.product.weightKg} kg</span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="font-bold text-sm text-ocean-700">
                        MVR {(item.product.mvrPrice * item.quantity).toLocaleString()}
                      </div>

                      <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 rounded text-slate-600 hover:bg-white transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-1.5 text-navy-900">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 rounded text-slate-600 hover:bg-white transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cross-border Delivery Note */}
          {cart.length > 0 && (
            <div className="px-4 py-2 bg-ocean-50/60 border-t border-ocean-100 flex items-center gap-2 text-xs text-ocean-800">
              <Ship className="w-4 h-4 text-ocean-600 shrink-0" />
              <span>Consolidated ocean cargo to Malé. Doorstep delivery across all islands.</span>
            </div>
          )}

          {/* Order Summary & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Product Subtotal</span>
                  <span className="font-medium text-navy-900">MVR {cartTotals.subtotalMvr.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="flex items-center gap-1">
                    <span>International Ocean Cargo</span>
                    <span className="text-[10px] text-slate-400">({cartTotals.totalWeightKg} kg)</span>
                  </span>
                  <span className="font-medium text-navy-900">MVR {cartTotals.shippingMvr.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Maldives Island Delivery</span>
                  <span className="font-medium text-navy-900">MVR {cartTotals.deliveryMvr.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-navy-900">
                  <span>Estimated Total</span>
                  <span className="text-ocean-700 text-base">MVR {cartTotals.totalMvr.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('/checkout');
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-ocean-600 to-sky-600 hover:from-ocean-700 hover:to-sky-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-ocean-500/20 active:scale-[0.99] transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Maldives Customs clearance & insurance included</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
