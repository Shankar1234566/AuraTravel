import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, MapPin, Calendar, Clock, DollarSign, Star, ArrowUpRight } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { useToast } from './Toast';

export function DestinationCard({ destination }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const favorited = isFavorite(destination.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isNowFav = toggleFavorite(destination.id);
    if (isNowFav) {
      showToast(`Saved ${destination.name} to your bucket list!`, 'success');
    } else {
      showToast(`Removed ${destination.name} from saved places.`, 'info');
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-midnight-card border border-midnight-border rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-teal/30 transition-all flex flex-col h-full cursor-pointer"
      onClick={() => navigate(`/destination/${destination.id}`)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') navigate(`/destination/${destination.id}`);
      }}
      role="article"
      aria-label={`${destination.name}, ${destination.country}`}
    >
      {/* Image Container with Aspect Ratio */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-midnight">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-midnight-surface animate-pulse" />
        )}
        
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-midnight-surface text-muted text-xs p-4 text-center">
            <span>{destination.name} preview</span>
          </div>
        ) : (
          <img
            src={destination.image}
            alt={`${destination.name}, ${destination.country}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        )}

        {/* Gradient Overlay for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-card via-midnight/20 to-black/30 pointer-events-none" />

        {/* Category Pill */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-midnight/80 backdrop-blur-md text-sand border border-white/10 uppercase tracking-wider">
            {destination.category}
          </span>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3.5 right-3.5 z-10 p-2 rounded-full backdrop-blur-md transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal ${
            favorited
              ? 'bg-rose-500/90 text-white shadow-lg shadow-rose-500/30'
              : 'bg-midnight/70 text-warm-white hover:text-rose-400 border border-white/10'
          }`}
          aria-label={favorited ? `Remove ${destination.name} from favorites` : `Save ${destination.name} to favorites`}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
        </button>

        {/* Location & Rating overlay */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-xs text-warm-white">
          <span className="flex items-center gap-1 font-medium bg-midnight/70 px-2 py-0.5 rounded-md backdrop-blur-sm">
            <MapPin className="w-3.5 h-3.5 text-teal" />
            {destination.country}
          </span>
          <span className="flex items-center gap-1 font-semibold text-gold bg-midnight/70 px-2 py-0.5 rounded-md backdrop-blur-sm">
            <Star className="w-3.5 h-3.5 fill-current" />
            {destination.rating}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-xl font-serif font-medium text-warm-white group-hover:text-teal transition-colors flex items-center justify-between mb-2">
            <span>{destination.name}</span>
            <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-teal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </h3>
          <p className="text-muted text-xs line-clamp-2 leading-relaxed mb-4">
            {destination.shortDescription}
          </p>
        </div>

        {/* Card Footer Details */}
        <div className="pt-3 border-t border-midnight-border flex items-center justify-between text-xs text-warm-white/80">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-muted tracking-wider">Est. Budget</span>
            <span className="font-semibold text-warm-white">{destination.indicativeBudget}</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[10px] uppercase text-muted tracking-wider">Duration</span>
            <span className="font-medium text-teal flex items-center gap-1 justify-end">
              <Clock className="w-3 h-3" />
              {destination.duration}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
