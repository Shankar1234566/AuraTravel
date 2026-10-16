import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SectionHeading } from '../components/SectionHeading';
import { SearchPanel } from '../components/SearchPanel';
import { DestinationGrid } from '../components/DestinationGrid';
import { DESTINATIONS } from '../data/destinations';

export function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'All';

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [maxBudget, setMaxBudget] = useState(8000);
  const [selectedDuration, setSelectedDuration] = useState('');

  // Sync state with URL params
  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('category');
    if (q !== null) setSearchTerm(q);
    if (cat !== null) setSelectedCategory(cat);
  }, [searchParams]);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    updateUrlParams(term, selectedCategory);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    updateUrlParams(searchTerm, cat);
  };

  const updateUrlParams = (q, cat) => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (cat && cat !== 'All') params.set('category', cat);
    setSearchParams(params, { replace: true });
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setMaxBudget(8000);
    setSelectedDuration('');
    setSearchParams({}, { replace: true });
  };

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((item) => {
      // 1. Text Search
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCountry = item.country.toLowerCase().includes(query);
        const matchesDesc = item.shortDescription.toLowerCase().includes(query);
        const matchesHighlights = item.highlights.some((h) => h.toLowerCase().includes(query));
        if (!matchesName && !matchesCountry && !matchesDesc && !matchesHighlights) {
          return false;
        }
      }

      // 2. Category
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // 3. Budget cap
      if (item.minBudget > maxBudget) {
        return false;
      }

      // 4. Duration
      if (selectedDuration) {
        if (selectedDuration === 'short' && item.durationDays > 5) return false;
        if (selectedDuration === 'medium' && (item.durationDays < 6 || item.durationDays > 8)) return false;
        if (selectedDuration === 'long' && item.durationDays < 9) return false;
      }

      return true;
    });
  }, [searchTerm, selectedCategory, maxBudget, selectedDuration]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SectionHeading
        eyebrow="GLOBAL DESTINATION ARCHIVE"
        title="Explore Extraordinary Havens"
        description="Filter through our 12 handpicked global sanctuaries by experience style, indicative budget, or trip duration."
      />

      <SearchPanel
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        maxBudget={maxBudget}
        onBudgetChange={setMaxBudget}
        selectedDuration={selectedDuration}
        onDurationChange={setSelectedDuration}
        onReset={handleReset}
        totalResults={filteredDestinations.length}
      />

      <DestinationGrid
        destinations={filteredDestinations}
        onReset={handleReset}
      />
    </div>
  );
}
