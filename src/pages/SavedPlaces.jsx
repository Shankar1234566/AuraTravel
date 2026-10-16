import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Compass, Trash2, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { DestinationGrid } from '../components/DestinationGrid';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { EmptyState } from '../components/EmptyState';
import { useFavorites } from '../hooks/useFavorites';
import { useToast } from '../components/Toast';

export function SavedPlaces() {
  const navigate = useNavigate();
  const { favoriteDestinations, favoriteIds, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const [clearModalOpen, setClearModalOpen] = useState(false);

  const handleClearAll = () => {
    favoriteIds.forEach((id) => toggleFavorite(id));
    setClearModalOpen(false);
    showToast('Cleared all saved places from your bucket list.', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-teal mb-2 block">
            PERSONAL BUCKET LIST
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-warm-white font-medium">
            Saved Sanctuaries
          </h1>
          <p className="text-muted text-sm mt-2">
            Your private collection of dream destinations, preserved in your browser.
          </p>
        </div>

        {favoriteDestinations.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted">
              {favoriteDestinations.length} {favoriteDestinations.length === 1 ? 'place' : 'places'} saved
            </span>
            <Button
              variant="danger"
              size="sm"
              icon={Trash2}
              onClick={() => setClearModalOpen(true)}
            >
              Clear All
            </Button>
          </div>
        )}
      </div>

      {favoriteDestinations.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Your bucket list is currently empty"
          description="Browse our 12 curated sanctuaries and click the heart icon on any destination card to save it for your journey planning."
          actionText="Discover Havens"
          onAction={() => navigate('/explore')}
        />
      ) : (
        <DestinationGrid destinations={favoriteDestinations} />
      )}

      {/* Clear Confirmation Modal */}
      <Modal
        isOpen={clearModalOpen}
        onClose={() => setClearModalOpen(false)}
        title="Clear All Saved Destinations"
      >
        <div className="space-y-4">
          <p className="text-sm text-warm-white/80 leading-relaxed">
            Are you sure you want to empty your entire saved bucket list? This will remove all {favoriteDestinations.length} destination bookmarks from your local browser storage.
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" size="sm" onClick={() => setClearModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" icon={Trash2} onClick={handleClearAll}>
              Yes, Clear All
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
