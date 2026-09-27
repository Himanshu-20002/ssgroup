'use client';

import React from 'react';
import { CATEGORIES } from '@/lib/portfolioService';

interface PortfolioFiltersProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  categoryCounts: Record<string, number>;
}

export function PortfolioFilters({
  activeCategory,
  onSelectCategory,
  categoryCounts,
}: PortfolioFiltersProps) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2">
      <div className="flex items-center gap-2 sm:gap-2.5 min-w-max pb-2 justify-start md:justify-center">
        {CATEGORIES.map((cat) => {
          const count = categoryCounts[cat.id] ?? 0;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                isActive
                  ? 'bg-[#24150e] text-white border-[#24150e] shadow-md'
                  : 'bg-white hover:bg-neutral-100 text-[#5a4234] border-neutral-200 shadow-2xs'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                  isActive ? 'bg-amber-400 text-neutral-900' : 'bg-neutral-100 text-neutral-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
