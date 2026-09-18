import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Ship,
  ShieldCheck,
  MapPin,
  ArrowLeft
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const { cart, cartTotals, updateCartQuantity, removeFromCart, clearCart } = useApp();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#F8FAFC] px-4 py-16">
        <div className="text-center max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-ocean-50 text-ocean-600 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-navy-900">Your Cart is Empty</h2>
          <p className="text-xs text-slate-500 mt-2">
            Discover verified Indian kitchen appliances, food staples, electronics, and textiles ready for island delivery.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-900 text-white text-xs font-bold hover:bg-navy-800 transition-colors"
          >
            <span>Explore Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Review your items sourced from India before proceeding to island delivery checkout.
            </p>
          </div>

          <button
            onClick={clearCart}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors"
          >
            Clear all items
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-8 space-y-3">
            {cart.map(item => (
              <div
                key={item.product.id}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-20 h-20 rounded-xl object-cover border border-slate-100 shrink-0"
                  />
                  <div>
                    <div className="text-[11px] font-semibold text-ocean-700 bg-ocean-50 inline-block px-2 py-0.5 rounded">
                      {item.product.category}
                    </div>
                    <h3 className="font-bold text-sm text-navy-900 mt-1 line-clamp-1">
                      {item.product.title}
                    </h3>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Ships from {item.product.originCity} • {(item.product.weightKg * item.quantity).toFixed(1)} kg total
                    </div>
                    <div className="text-sm font-extrabold text-navy-900 mt-1">
                      MVR {item.product.mvrPrice.toLocaleString()}{' '}
                      <span className="text-xs font-normal text-slate-400">each</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  {/* Quantity */}
                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 rounded-lg text-slate-500 hover:bg-white transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-navy-900">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 rounded-lg text-slate-500 hover:bg-white transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right min-w-[100px]">
                    <div className="font-extrabold text-base text-ocean-700">
                      MVR {(item.product.mvrPrice * item.quantity).toLocaleString()}
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-xs font-bold text-ocean-600 hover:text-ocean-700 pt-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h2 className="font-bold text-base text-navy-900 border-b border-slate-100 pb-3">
                Order Summary
              </h2>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Product Subtotal</span>
                  <span className="font-semibold text-navy-900">MVR {cartTotals.subtotalMvr.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <div>
                    <span>International Ocean Cargo</span>
                    <p className="text-[10px] text-slate-400">Total weight: {cartTotals.totalWeightKg} kg</p>
                  </div>
                  <span className="font-semibold text-navy-900">MVR {cartTotals.shippingMvr.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Maldives Island Delivery</span>
                  <span className="font-semibold text-navy-900">MVR {cartTotals.deliveryMvr.toLocaleString()}</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between text-base font-extrabold text-navy-900">
                  <span>Total Amount</span>
                  <span className="text-ocean-700 text-lg">MVR {cartTotals.totalMvr.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-ocean-500 to-sky-500 hover:from-ocean-600 hover:to-sky-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-ocean-500/25 transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-[11px] text-slate-600">
                <div className="flex items-center gap-1.5 font-bold text-navy-900">
                  <Ship className="w-3.5 h-3.5 text-ocean-600" />
                  <span>Scheduled Sea Cargo</span>
                </div>
                <p>Consolidated in Chennai, shipped to Malé Seaport, and delivered to your doorstep.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
