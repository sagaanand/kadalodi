import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Ship, Check } from 'lucide-react';
import type { Product } from '../../types';
import { useApp } from '../../context/AppContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, cart } = useApp();

  const isAlreadyInCart = cart.some(item => item.product.id === product.id);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-ocean-300 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
      <div>
        {/* Product Image & Badges */}
        <div className="relative aspect-4/3 overflow-hidden bg-slate-50">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Sourcing Badge */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-navy-950/80 text-white backdrop-blur-md border border-white/10 shadow-xs">
              <Ship className="w-3 h-3 text-sky-400" />
              Ships from India
            </span>
            <span className="text-[10px] font-medium px-2 py-0.2 rounded-full bg-white/90 text-slate-700 shadow-2xs">
              {product.originCity.split(',')[0]}
            </span>
          </div>

          {/* Brand pill */}
          <div className="absolute top-2.5 right-2.5">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white/95 text-slate-800 shadow-sm border border-slate-100">
              {product.brand}
            </span>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-4">
          <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-1.5">
            <span className="text-ocean-700 font-semibold">{product.category}</span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold text-slate-800">{product.rating}</span>
              <span className="text-slate-400 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          <Link to={`/product/${product.id}`}>
            <h3 className="font-bold text-sm text-navy-900 line-clamp-2 group-hover:text-ocean-700 transition-colors leading-snug">
              {product.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Logistics estimate tag */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Est. Delivery:</span>
            <span className="font-semibold text-slate-700">{product.shippingEstimateDays}</span>
          </div>
        </div>
      </div>

      {/* Pricing & Add to Cart Footer */}
      <div className="p-4 pt-0">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <div className="text-lg font-extrabold text-navy-900 tracking-tight">
              MVR {product.mvrPrice.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400">
              ₹{product.inrCost.toLocaleString()} INR in India
            </div>
          </div>
          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
            All-Inclusive
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            to={`/product/${product.id}`}
            className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:border-navy-900 text-slate-700 hover:text-navy-900 font-semibold text-xs text-center transition-colors"
          >
            View Details
          </Link>
          <button
            onClick={() => addToCart(product, 1)}
            className={`w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs ${
              isAlreadyInCart
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-navy-900 hover:bg-ocean-700 text-white'
            }`}
          >
            {isAlreadyInCart ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>In Cart</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-sky-400" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
