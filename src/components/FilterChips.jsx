import React from 'react';
import { CATEGORIES } from '../data/destinations';

export function FilterChips({ activeCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
      {CATEGORIES.map((category) => {
        const isSelected = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
              isSelected
                ? 'bg-teal text-midnight font-semibold shadow-md shadow-teal/20'
                : 'bg-midnight-card text-warm-white/70 hover:text-warm-white hover:bg-midnight-surface border border-midnight-border'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
