import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCT_CATEGORIES } from '../../data/mockProducts';
import { ProductCard } from '../../components/customer/ProductCard';
import { Search, SlidersHorizontal, ArrowUpDown, Ship, CheckCircle2 } from 'lucide-react';

export const ShopCatalog: React.FC = () => {
  const { products } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'rating'>('featured');

  // Filter products
  const filtered = products.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Sort products
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price_asc') return a.mvrPrice - b.mvrPrice;
    if (sortBy === 'price_desc') return b.mvrPrice - a.mvrPrice;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured default
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-ocean-700 bg-ocean-50 px-2.5 py-1 rounded-full border border-ocean-200 mb-2">
            <Ship className="w-3.5 h-3.5" />
            <span>Direct Sourcing from Indian Brand Hubs</span>
          </div>
          <h1 className="text-3xl font-extrabold text-navy-900 tracking-tight">
            India Sourcing Catalogue
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Browse verified Indian kitchen appliances, food staples, electronics, and textiles. All prices in MVR with cross-border cargo handling included.
          </p>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products, brands (Prestige, Tata, FabIndia)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-navy-900 placeholder:text-slate-400 outline-none focus:border-ocean-500 focus:bg-white"
              />
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2 shrink-0">
              <ArrowUpDown className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-navy-900 outline-none focus:border-ocean-500"
              >
                <option value="featured">Featured & Recommended</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 scrollbar-none">
            {PRODUCT_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-ocean-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
          <span>Showing <strong>{sorted.length}</strong> products</span>
          <span className="flex items-center gap-1 text-emerald-600 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Maldives Customs Clearance Guaranteed</span>
          </span>
        </div>

        {sorted.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-sm font-semibold text-navy-900">No products match your criteria</p>
            <p className="text-xs text-slate-500 mt-1">Try changing the category or clearing the search keyword.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-ocean-50 text-ocean-700 text-xs font-semibold hover:bg-ocean-100"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sorted.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
