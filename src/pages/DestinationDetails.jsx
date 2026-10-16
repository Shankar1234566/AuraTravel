import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Heart, 
  Calendar, 
  Clock, 
  DollarSign, 
  Star, 
  CheckCircle, 
  Compass, 
  Sun, 
  CloudSun, 
  Info, 
  Sparkles, 
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Share2,
  ExternalLink
} from 'lucide-react';
import { Button } from '../components/Button';
import { DestinationCard } from '../components/DestinationCard';
import { Modal } from '../components/Modal';
import { useFavorites } from '../hooks/useFavorites';
import { useToast } from '../components/Toast';
import { DESTINATIONS } from '../data/destinations';

export function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();

  const [activeItineraryDay, setActiveItineraryDay] = useState(1);
  const [plannerModalOpen, setPlannerModalOpen] = useState(false);

  const destination = DESTINATIONS.find((d) => d.id === id);

  if (!destination) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-serif text-warm-white mb-4">Destination Not Found</h2>
        <p className="text-muted mb-8">We could not locate this sanctuary in our global archive.</p>
        <Button variant="primary" onClick={() => navigate('/explore')}>
          Browse Available Havens
        </Button>
      </div>
    );
  }

  const favorited = isFavorite(destination.id);

  const handleFavoriteClick = () => {
    const isNowFav = toggleFavorite(destination.id);
    if (isNowFav) {
      showToast(`Added ${destination.name} to your bucket list!`, 'success');
    } else {
      showToast(`Removed ${destination.name} from saved places.`, 'info');
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Destination link copied to clipboard!', 'info');
    } else {
      showToast('Sharing available via URL copy.', 'info');
    }
  };

  const similarDestinations = DESTINATIONS
    .filter((d) => d.id !== destination.id && (d.category === destination.category || d.travelStyle === destination.travelStyle))
    .slice(0, 3);

  return (
    <div className="pb-24">
      {/* Editorial Hero Header */}
      <div className="relative h-[65vh] min-h-[460px] w-full overflow-hidden bg-midnight">
        <img
          src={destination.image}
          alt={`${destination.name}, ${destination.country}`}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-midnight/40" />

        {/* Back navigation */}
        <div className="absolute top-6 left-4 sm:left-8 z-20">
          <Button
            variant="secondary"
            size="sm"
            icon={ArrowLeft}
            onClick={() => navigate('/explore')}
            className="backdrop-blur-md bg-midnight/80 border-white/10"
          >
            Back to Explore
          </Button>
        </div>

        {/* Hero Title & Breadcrumb */}
        <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal/20 text-teal border border-teal/30 uppercase tracking-widest">
              {destination.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-sand font-mono bg-midnight/80 px-2.5 py-1 rounded-full border border-white/10">
              <Compass className="w-3.5 h-3.5 text-gold" />
              {destination.coordinates?.lat}, {destination.coordinates?.lng}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-warm-white font-medium tracking-tight mb-2">
            {destination.name}
          </h1>
          <p className="text-lg sm:text-xl text-sand/90 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-teal" />
            <span>{destination.country}</span>
          </p>
        </div>
      </div>

      {/* Main Editorial Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Column (2 spans) */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <section className="bg-midnight-card border border-midnight-border rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl font-serif text-warm-white mb-4">Sanctuary Overview</h2>
              <p className="text-warm-white/80 text-base sm:text-lg leading-relaxed mb-6 font-light">
                {destination.overview}
              </p>
              
              {/* Photo Gallery Grid */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                {destination.gallery?.map((imgUrl, i) => (
                  <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden bg-midnight">
                    <img
                      src={imgUrl}
                      alt={`${destination.name} gallery ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Highlights */}
            <section className="bg-midnight-card border border-midnight-border rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl font-serif text-warm-white mb-6">Signature Experiences & Highlights</h2>
              <div className="grid grid-cols-1 gap-3.5">
                {destination.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-midnight/70 border border-midnight-border/70"
                  >
                    <CheckCircle className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-warm-white font-normal">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Suggested Itinerary */}
            <section className="bg-midnight-card border border-midnight-border rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-serif text-warm-white">Suggested Itinerary</h2>
                  <p className="text-xs text-muted">A balanced sequence curated by destination specialists</p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Calendar}
                  onClick={() => setPlannerModalOpen(true)}
                >
                  Adopt in Trip Planner
                </Button>
              </div>

              {/* Day selection tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
                {destination.suggestedItinerary.map((day) => (
                  <button
                    key={day.day}
                    onClick={() => setActiveItineraryDay(day.day)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      activeItineraryDay === day.day
                        ? 'bg-teal text-midnight shadow-md shadow-teal/20'
                        : 'bg-midnight text-muted hover:text-warm-white border border-midnight-border'
                    }`}
                  >
                    Day {day.day}
                  </button>
                ))}
              </div>

              {/* Day Details Card */}
              {destination.suggestedItinerary.find((d) => d.day === activeItineraryDay) && (
                <div className="p-5 rounded-xl bg-midnight border border-teal/20 space-y-3">
                  <div className="flex items-center justify-between text-xs text-teal font-semibold">
                    <span>Day {activeItineraryDay} Itinerary</span>
                    <span className="text-muted">Suggested Pace: Moderate</span>
                  </div>
                  <h3 className="text-lg font-serif text-warm-white font-medium">
                    {destination.suggestedItinerary.find((d) => d.day === activeItineraryDay)?.title}
                  </h3>
                  <p className="text-sm text-warm-white/80 leading-relaxed">
                    {destination.suggestedItinerary.find((d) => d.day === activeItineraryDay)?.description}
                  </p>
                </div>
              )}
            </section>

            {/* Travel Insider Tips */}
            <section className="bg-midnight-card border border-midnight-border rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl font-serif text-warm-white mb-4">Local Insider Tips & Etiquette</h2>
              <ul className="space-y-3 text-sm text-warm-white/80">
                {destination.travelTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-midnight/50 p-3.5 rounded-xl border border-midnight-border">
                    <Sparkles className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Weather Placeholder (Clearly identified sample) */}
            <section className="bg-midnight-card border border-midnight-border rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-serif text-warm-white flex items-center gap-2">
                  <CloudSun className="w-6 h-6 text-teal" />
                  Seasonal Weather Forecast
                </h2>
                <span className="text-[10px] uppercase font-bold text-gold px-2.5 py-1 rounded bg-gold/10 border border-gold/20">
                  Illustrative Demo Data
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-midnight border border-midnight-border text-center">
                  <span className="text-xs text-muted block mb-1">Peak Season</span>
                  <span className="text-sm font-semibold text-warm-white">{destination.weatherSample.season}</span>
                </div>
                <div className="p-4 rounded-xl bg-midnight border border-midnight-border text-center">
                  <span className="text-xs text-muted block mb-1">Typical Temperature</span>
                  <span className="text-sm font-semibold text-teal">{destination.weatherSample.temp}</span>
                </div>
                <div className="p-4 rounded-xl bg-midnight border border-midnight-border text-center">
                  <span className="text-xs text-muted block mb-1">Atmospheric Condition</span>
                  <span className="text-sm font-semibold text-sand">{destination.weatherSample.condition}</span>
                </div>
              </div>
              <p className="text-xs text-muted/70 mt-3 italic text-center">
                * Real-time weather requires external meteorology satellite API integration. Illustrated for frontend design presentation.
              </p>
            </section>
          </div>

          {/* Sticky Desktop Action Sidebar (Non-blocking on mobile) */}
          <div className="space-y-6">
            <div className="bg-midnight-card border border-midnight-border rounded-2xl p-6 shadow-2xl lg:sticky lg:top-24 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs uppercase tracking-wider text-muted font-medium">Indicative Budget</span>
                  <span className="text-xs text-gold flex items-center gap-1 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {destination.rating} ({destination.reviewsCount} reviews)
                  </span>
                </div>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-warm-white">
                  {destination.indicativeBudget}
                </span>
                <span className="text-xs text-muted block mt-0.5">Estimated total per traveler</span>
              </div>

              <div className="space-y-3 pt-3 border-t border-midnight-border text-xs text-warm-white/80">
                <div className="flex justify-between py-1.5 border-b border-midnight-border/50">
                  <span className="text-muted">Suggested Length:</span>
                  <span className="font-semibold">{destination.duration}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-midnight-border/50">
                  <span className="text-muted">Ideal Season:</span>
                  <span className="font-semibold text-sand">{destination.bestSeason}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-muted">Travel Style:</span>
                  <span className="font-semibold text-teal">{destination.travelStyle}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <Button
                  variant="primary"
                  size="md"
                  icon={Calendar}
                  onClick={() => setPlannerModalOpen(true)}
                  className="w-full"
                >
                  Build Custom Trip Plan
                </Button>

                <Button
                  variant={favorited ? 'danger' : 'secondary'}
                  size="md"
                  icon={Heart}
                  onClick={handleFavoriteClick}
                  className="w-full"
                >
                  {favorited ? 'Remove from Saved' : 'Save to Bucket List'}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  icon={Share2}
                  onClick={handleShare}
                  className="w-full text-xs"
                >
                  Share Destination
                </Button>
              </div>

              <div className="p-3.5 rounded-xl bg-midnight/80 border border-white/5 text-[11px] text-muted leading-relaxed">
                <p>
                  <strong>Note:</strong> AuraTravel provides bespoke planning tools and curated recommendations. Flight and hotel booking services are mock estimates.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Havens Section */}
        {similarDestinations.length > 0 && (
          <section className="mt-20 pt-16 border-t border-midnight-border">
            <h2 className="text-2xl sm:text-3xl font-serif text-warm-white mb-8">
              Similar Extraordinary Sanctuaries
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarDestinations.map((similar) => (
                <DestinationCard key={similar.id} destination={similar} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Add to Trip Planner Modal */}
      <Modal
        isOpen={plannerModalOpen}
        onClose={() => setPlannerModalOpen(false)}
        title={`Plan Journey to ${destination.name}`}
      >
        <div className="space-y-4">
          <p className="text-sm text-warm-white/80 leading-relaxed">
            Would you like to import <strong>{destination.name}</strong> into your interactive Trip Planner? This will initialize a new bespoke trip itinerary pre-configured with this destination.
          </p>
          <div className="p-4 rounded-xl bg-midnight border border-midnight-border space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted">Destination:</span>
              <span className="font-semibold text-warm-white">{destination.name}, {destination.country}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Estimated Duration:</span>
              <span className="font-semibold text-teal">{destination.duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Budget Tier:</span>
              <span className="font-semibold text-sand">{destination.indicativeBudget}</span>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" size="sm" onClick={() => setPlannerModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={Calendar}
              onClick={() => {
                setPlannerModalOpen(false);
                navigate(`/planner?dest=${destination.id}`);
              }}
            >
              Launch Planner
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
