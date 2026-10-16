import React from 'react';
import { Search, RotateCcw, SlidersHorizontal, DollarSign, Clock } from 'lucide-react';
import { Button } from './Button';
import { FilterChips } from './FilterChips';

export function SearchPanel({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  maxBudget,
  onBudgetChange,
  selectedDuration,
  onDurationChange,
  onReset,
  totalResults
}) {
  return (
    <div className="bg-midnight-card/80 backdrop-blur-xl border border-midnight-border rounded-2xl p-5 md:p-6 shadow-2xl mb-8 space-y-5">
      {/* Search Input Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search destinations, countries, or cultural highlights..."
            className="w-full bg-midnight/90 pl-11 pr-4 py-3 rounded-xl text-sm text-warm-white border border-midnight-border focus:outline-none focus:border-teal placeholder:text-muted/60 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-warm-white text-xs px-1.5 py-0.5 rounded bg-white/5"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Reset */}
        <Button
          variant="secondary"
          size="md"
          icon={RotateCcw}
          onClick={onReset}
          className="shrink-0 text-xs"
        >
          Reset All
        </Button>
      </div>

      {/* Category Chips */}
      <div>
        <span className="text-[11px] uppercase tracking-wider text-muted font-medium block mb-2">
          Filter by Experience Category
        </span>
        <FilterChips
          activeCategory={selectedCategory}
          onSelectCategory={onCategoryChange}
        />
      </div>

      {/* Secondary Filters: Budget & Duration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-midnight-border/60">
        {/* Budget Range Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-teal" /> Max Budget Cap:
            </span>
            <span className="font-semibold text-teal">${maxBudget.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="1000"
            max="8000"
            step="500"
            value={maxBudget}
            onChange={(e) => onBudgetChange(Number(e.target.value))}
            className="w-full accent-teal h-1.5 bg-midnight rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Duration Filter */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-teal" /> Suggested Duration:
            </span>
            <span className="font-semibold text-warm-white">{selectedDuration || 'Any length'}</span>
          </div>
          <select
            value={selectedDuration}
            onChange={(e) => onDurationChange(e.target.value)}
            className="w-full bg-midnight px-3 py-1.5 rounded-lg text-xs text-warm-white border border-midnight-border focus:outline-none focus:border-teal"
          >
            <option value="">Any Length</option>
            <option value="short">Short Escapes (3 - 5 Days)</option>
            <option value="medium">Classic Journeys (6 - 8 Days)</option>
            <option value="long">Extended Expeditions (9+ Days)</option>
          </select>
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-muted pt-2 border-t border-midnight-border/40">
        <span>Showing <strong className="text-teal font-semibold">{totalResults}</strong> extraordinary destinations</span>
        {(searchTerm || selectedCategory !== 'All' || maxBudget < 8000 || selectedDuration) && (
          <span className="text-gold text-[11px] font-medium">Filters active</span>
        )}
      </div>
    </div>
  );
}
