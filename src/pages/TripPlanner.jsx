import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Save, 
  Edit3, 
  CheckCircle, 
  AlertCircle, 
  Sparkles,
  Info,
  Clock,
  Compass,
  FileText
} from 'lucide-react';
import { Button } from '../components/Button';
import { SectionHeading } from '../components/SectionHeading';
import { Modal } from '../components/Modal';
import { useToast } from '../components/Toast';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DESTINATIONS } from '../data/destinations';
import { PRESET_ACTIVITIES } from '../data/activities';

export function TripPlanner() {
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();

  // LocalStorage for saved trips
  const [savedTrips, setSavedTrips] = useLocalStorage('auratravel_saved_trips', [
    {
      id: 'sample-trip-1',
      tripName: 'Autumn Reflection in Kyoto',
      destinationId: 'kyoto',
      startDate: '2026-10-20',
      endDate: '2026-10-25',
      travelers: 2,
      budget: 3500,
      preference: 'Balanced',
      accommodation: 'Boutique Ryokan',
      days: [
        {
          day: 1,
          activities: [
            'Arrive via Shinkansen bullet train at Kyoto Station',
            'Check into traditional Machiya townhouse in Gion',
            'Evening twilight walk along Shirakawa canal'
          ]
        },
        {
          day: 2,
          activities: [
            'Early morning sunrise walk through Fushimi Inari Torii gates',
            'Authentic matcha tea ceremony with Zen master',
            'Kaiseki seasonal dinner tasting'
          ]
        },
        {
          day: 3,
          activities: [
            'Arashiyama Sagano soaring bamboo grove hike',
            'Historic Togetsukyo Bridge crossing & monkey park',
            'Traditional artisan pottery workshop'
          ]
        }
      ]
    }
  ]);

  // Form State
  const initialDestId = searchParams.get('dest') || 'swiss-alps';
  const [editingTripId, setEditingTripId] = useState(null);
  const [tripName, setTripName] = useState('My Grand Expedition');
  const [destinationId, setDestinationId] = useState(initialDestId);
  const [startDate, setStartDate] = useState('2026-11-05');
  const [endDate, setEndDate] = useState('2026-11-10');
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState(4200);
  const [preference, setPreference] = useState('Balanced');
  const [accommodation, setAccommodation] = useState('Boutique');

  // Days and activities state
  const [days, setDays] = useState([
    {
      day: 1,
      activities: ['Arrival & private transfer to alpine chalet', 'Welcome dinner featuring local specialties']
    },
    {
      day: 2,
      activities: ['Morning panoramic cable car ride', 'Scenic alpine trail walk & fondue lunch']
    },
    {
      day: 3,
      activities: ['Guided glacier discovery trek', 'Evening thermal mineral spa recovery session']
    }
  ]);

  // Activity input modal / state
  const [newActivityDay, setNewActivityDay] = useState(null);
  const [customActivityText, setCustomActivityText] = useState('');
  const [selectedPresetActivity, setSelectedPresetActivity] = useState('');

  // Delete modal state
  const [tripToDelete, setTripToDelete] = useState(null);

  // Validation errors
  const [validationErrors, setValidationErrors] = useState({});

  // When destination changes, if user came from a query param
  useEffect(() => {
    const paramDest = searchParams.get('dest');
    if (paramDest && DESTINATIONS.some((d) => d.id === paramDest)) {
      setDestinationId(paramDest);
      const found = DESTINATIONS.find((d) => d.id === paramDest);
      if (found) {
        setTripName(`Journey to ${found.name}`);
        // Seed default itinerary if available
        if (found.suggestedItinerary && found.suggestedItinerary.length > 0) {
          setDays(
            found.suggestedItinerary.map((item) => ({
              day: item.day,
              activities: [item.title, item.description]
            }))
          );
        }
      }
    }
  }, [searchParams]);

  // Calculate day count
  const calculateDays = () => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 1;
  };

  const dayCount = calculateDays();

  // Keep days count aligned with date changes
  const handleDateChange = (newStart, newEnd) => {
    setStartDate(newStart);
    setEndDate(newEnd);

    const start = new Date(newStart);
    const end = new Date(newEnd);

    if (end < start) {
      setValidationErrors((prev) => ({
        ...prev,
        dates: 'End date cannot precede start date.'
      }));
      return;
    } else {
      setValidationErrors((prev) => {
        const copy = { ...prev };
        delete copy.dates;
        return copy;
      });
    }

    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    const count = diff > 0 ? diff : 1;

    // Adjust days array
    setDays((prevDays) => {
      const newDays = [];
      for (let i = 1; i <= count; i++) {
        const existing = prevDays.find((d) => d.day === i);
        if (existing) {
          newDays.push(existing);
        } else {
          newDays.push({
            day: i,
            activities: [`Explore regional highlights for Day ${i}`]
          });
        }
      }
      return newDays;
    });
  };

  // Add activity to a day
  const handleAddActivity = () => {
    if (!newActivityDay) return;
    const textToAdd = customActivityText.trim() || selectedPresetActivity;
    if (!textToAdd) {
      showToast('Please type an activity or select from presets.', 'warning');
      return;
    }

    setDays((prev) =>
      prev.map((d) => {
        if (d.day === newActivityDay) {
          return {
            ...d,
            activities: [...d.activities, textToAdd]
          };
        }
        return d;
      })
    );

    setCustomActivityText('');
    setSelectedPresetActivity('');
    setNewActivityDay(null);
    showToast(`Added activity to Day ${newActivityDay}`, 'success');
  };

  // Remove activity
  const handleRemoveActivity = (dayNumber, activityIndex) => {
    setDays((prev) =>
      prev.map((d) => {
        if (d.day === dayNumber) {
          const nextActivities = d.activities.filter((_, idx) => idx !== activityIndex);
          return { ...d, activities: nextActivities };
        }
        return d;
      })
    );
  };

  // Reorder activity: move up
  const handleMoveActivityUp = (dayNumber, activityIndex) => {
    if (activityIndex <= 0) return;
    setDays((prev) =>
      prev.map((d) => {
        if (d.day === dayNumber) {
          const copy = [...d.activities];
          const temp = copy[activityIndex - 1];
          copy[activityIndex - 1] = copy[activityIndex];
          copy[activityIndex] = temp;
          return { ...d, activities: copy };
        }
        return d;
      })
    );
  };

  // Reorder activity: move down
  const handleMoveActivityDown = (dayNumber, activityIndex) => {
    setDays((prev) =>
      prev.map((d) => {
        if (d.day === dayNumber) {
          if (activityIndex >= d.activities.length - 1) return d;
          const copy = [...d.activities];
          const temp = copy[activityIndex + 1];
          copy[activityIndex + 1] = copy[activityIndex];
          copy[activityIndex] = temp;
          return { ...d, activities: copy };
        }
        return d;
      })
    );
  };

  // Save Trip to LocalStorage
  const handleSaveTrip = (e) => {
    e.preventDefault();

    if (!tripName.trim()) {
      setValidationErrors((prev) => ({ ...prev, name: 'Please enter a trip title.' }));
      showToast('Trip name is required.', 'warning');
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      setValidationErrors((prev) => ({ ...prev, dates: 'End date cannot precede start date.' }));
      showToast('Please correct itinerary dates.', 'warning');
      return;
    }

    const tripData = {
      id: editingTripId || `trip-${Date.now()}`,
      tripName: tripName.trim(),
      destinationId,
      startDate,
      endDate,
      travelers: Number(travelers),
      budget: Number(budget),
      preference,
      accommodation,
      days
    };

    if (editingTripId) {
      setSavedTrips((prev) => prev.map((t) => (t.id === editingTripId ? tripData : t)));
      showToast(`Updated trip "${tripData.tripName}" successfully!`, 'success');
      setEditingTripId(null);
    } else {
      setSavedTrips((prev) => [tripData, ...prev]);
      showToast(`Saved "${tripData.tripName}" to your local plans!`, 'success');
    }
  };

  // Load a saved trip for editing
  const handleEditTrip = (trip) => {
    setEditingTripId(trip.id);
    setTripName(trip.tripName);
    setDestinationId(trip.destinationId);
    setStartDate(trip.startDate);
    setEndDate(trip.endDate);
    setTravelers(trip.travelers);
    setBudget(trip.budget);
    setPreference(trip.preference || 'Balanced');
    setAccommodation(trip.accommodation || 'Boutique');
    setDays(trip.days || []);
    showToast(`Loaded "${trip.tripName}" into builder.`, 'info');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Confirm delete
  const handleDeleteTrip = () => {
    if (!tripToDelete) return;
    setSavedTrips((prev) => prev.filter((t) => t.id !== tripToDelete.id));
    if (editingTripId === tripToDelete.id) {
      setEditingTripId(null);
    }
    showToast(`Deleted "${tripToDelete.tripName}".`, 'info');
    setTripToDelete(null);
  };

  const selectedDestObj = DESTINATIONS.find((d) => d.id === destinationId) || DESTINATIONS[0];
  const totalActivitiesCount = days.reduce((sum, d) => sum + d.activities.length, 0);
  const perPersonBudget = Math.round(budget / (travelers || 1));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <SectionHeading
        eyebrow="BESPOKE ITINERARY BUILDER"
        title="Interactive Trip Planner"
        description="Craft, sequence, and customize your travel days with precision. Plans are securely saved locally on your device."
      />

      {/* Demo notice banner */}
      <div className="p-4 rounded-2xl bg-midnight-card border border-teal/20 flex items-start gap-3.5 shadow-subtle text-xs text-warm-white/80">
        <Info className="w-5 h-5 text-teal shrink-0 mt-0.5" />
        <div>
          <strong className="text-teal font-semibold">Frontend Demo Application:</strong> This trip planner is an interactive architecture prototype. It persists your trip structures directly to your browser's LocalStorage. No live flight or hotel bookings take place.
        </div>
      </div>

      {/* Main Grid: Trip Configuration Form & Summary Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form Controls (2 spans) */}
        <div className="lg:col-span-2 bg-midnight-card border border-midnight-border rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-midnight-border pb-4">
            <h3 className="text-xl font-serif text-warm-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal" />
              {editingTripId ? 'Edit Journey Details' : 'Trip Parameters'}
            </h3>
            {editingTripId && (
              <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2.5 py-1 rounded-full font-semibold">
                Editing Mode
              </span>
            )}
          </div>

          <form onSubmit={handleSaveTrip} className="space-y-6">
            {/* Trip Name & Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-1.5">
                  Trip Name *
                </label>
                <input
                  type="text"
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                  placeholder="e.g. Kyoto Autumn Immersion"
                  className="w-full bg-midnight px-3.5 py-2.5 rounded-xl text-sm text-warm-white border border-midnight-border focus:outline-none focus:border-teal"
                />
                {validationErrors.name && (
                  <span className="text-xs text-rose-400 mt-1 block">{validationErrors.name}</span>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-1.5">
                  Destination Haven *
                </label>
                <select
                  value={destinationId}
                  onChange={(e) => setDestinationId(e.target.value)}
                  className="w-full bg-midnight px-3.5 py-2.5 rounded-xl text-sm text-warm-white border border-midnight-border focus:outline-none focus:border-teal"
                >
                  {DESTINATIONS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}, {d.country} ({d.category})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dates: Start & End */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-1.5">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => handleDateChange(e.target.value, endDate)}
                  className="w-full bg-midnight px-3.5 py-2.5 rounded-xl text-sm text-warm-white border border-midnight-border focus:outline-none focus:border-teal"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-1.5">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => handleDateChange(startDate, e.target.value)}
                  className="w-full bg-midnight px-3.5 py-2.5 rounded-xl text-sm text-warm-white border border-midnight-border focus:outline-none focus:border-teal"
                />
              </div>
            </div>

            {validationErrors.dates && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{validationErrors.dates}</span>
              </div>
            )}

            {/* Travelers & Estimated Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-1.5">
                  Number of Travelers: {travelers}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="w-full accent-teal h-2 bg-midnight rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-muted mt-1">
                  <span>Solo (1)</span>
                  <span>Couple (2)</span>
                  <span>Group (10)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-1.5">
                  Estimated Total Budget: ${budget.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="500"
                  max="15000"
                  step="250"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-teal h-2 bg-midnight rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-muted mt-1">
                  <span>$500</span>
                  <span>$7,500</span>
                  <span>$15,000</span>
                </div>
              </div>
            </div>

            {/* Travel Preferences */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-1.5">
                  Travel Pace
                </label>
                <select
                  value={preference}
                  onChange={(e) => setPreference(e.target.value)}
                  className="w-full bg-midnight px-3.5 py-2.5 rounded-xl text-sm text-warm-white border border-midnight-border focus:outline-none focus:border-teal"
                >
                  <option value="Relaxed">Relaxed (1-2 curated activities per day)</option>
                  <option value="Balanced">Balanced (Comfortable mix of discovery and rest)</option>
                  <option value="Fast-paced">Fast-Paced (Maximum cultural exploration)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-1.5">
                  Stay Preference
                </label>
                <select
                  value={accommodation}
                  onChange={(e) => setAccommodation(e.target.value)}
                  className="w-full bg-midnight px-3.5 py-2.5 rounded-xl text-sm text-warm-white border border-midnight-border focus:outline-none focus:border-teal"
                >
                  <option value="Boutique">Boutique & Design Lodges</option>
                  <option value="Luxury">Ultra Luxury & 5-Star Resorts</option>
                  <option value="Eco">Eco Villas & Nature Glamping</option>
                  <option value="Heritage">Historic Traditional Stays (Ryokans/Chalets)</option>
                </select>
              </div>
            </div>

            {/* Save Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-midnight-border">
              <Button type="submit" variant="primary" size="md" icon={Save}>
                {editingTripId ? 'Save Itinerary Changes' : 'Save Trip to My Library'}
              </Button>
              {editingTripId && (
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => {
                    setEditingTripId(null);
                    setTripName('My Grand Expedition');
                  }}
                >
                  Cancel Edit
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Right Column: Live Summary Metrics */}
        <div className="space-y-6">
          <div className="bg-midnight-card border border-midnight-border rounded-2xl p-6 shadow-xl space-y-5">
            <h3 className="text-lg font-serif text-warm-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" />
              Journey Summary
            </h3>

            {/* Destination Preview Card */}
            <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-midnight border border-white/5">
              <img
                src={selectedDestObj.image}
                alt={selectedDestObj.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/30 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-xs">
                <span className="font-serif font-bold text-base text-warm-white block">
                  {selectedDestObj.name}
                </span>
                <span className="text-sand">{selectedDestObj.country} • {selectedDestObj.category}</span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-midnight border border-midnight-border">
                <span className="text-muted block mb-0.5">Total Duration</span>
                <span className="text-base font-semibold text-teal">{dayCount} Days</span>
              </div>
              <div className="p-3 rounded-xl bg-midnight border border-midnight-border">
                <span className="text-muted block mb-0.5">Travelers</span>
                <span className="text-base font-semibold text-warm-white">{travelers} Guests</span>
              </div>
              <div className="p-3 rounded-xl bg-midnight border border-midnight-border">
                <span className="text-muted block mb-0.5">Budget / Person</span>
                <span className="text-base font-semibold text-gold">${perPersonBudget.toLocaleString()}</span>
              </div>
              <div className="p-3 rounded-xl bg-midnight border border-midnight-border">
                <span className="text-muted block mb-0.5">Total Activities</span>
                <span className="text-base font-semibold text-teal">{totalActivitiesCount} Planned</span>
              </div>
            </div>

            <div className="text-[11px] text-muted space-y-1 pt-2 border-t border-midnight-border">
              <div className="flex justify-between">
                <span>Pace:</span>
                <strong className="text-warm-white">{preference}</strong>
              </div>
              <div className="flex justify-between">
                <span>Accommodation:</span>
                <strong className="text-warm-white">{accommodation}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Day-by-Day Itinerary Builder */}
      <div className="space-y-6 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-serif text-warm-white flex items-center gap-2.5">
              <span>Day-by-Day Activity Schedule</span>
              <span className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-teal/10 text-teal border border-teal/20">
                {days.length} Days
              </span>
            </h3>
            <p className="text-xs text-muted">
              Add signature experiences, remove stops, and reorder events with the up/down arrows.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {days.map((dayItem) => (
            <div
              key={dayItem.day}
              className="bg-midnight-card border border-midnight-border rounded-2xl p-5 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-midnight-border/70 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-teal text-midnight font-bold text-xs flex items-center justify-center">
                      {dayItem.day}
                    </span>
                    <span className="font-serif font-medium text-warm-white">
                      Day {dayItem.day} Itinerary
                    </span>
                  </div>
                  <span className="text-[11px] text-muted">
                    {dayItem.activities.length} {dayItem.activities.length === 1 ? 'item' : 'items'}
                  </span>
                </div>

                {/* Activities List */}
                <div className="space-y-2.5 min-h-[140px]">
                  {dayItem.activities.length === 0 ? (
                    <div className="py-8 text-center text-xs text-muted border border-dashed border-midnight-border rounded-xl">
                      No activities scheduled yet.
                    </div>
                  ) : (
                    dayItem.activities.map((activity, actIdx) => (
                      <div
                        key={actIdx}
                        className="group flex items-start justify-between gap-2 p-2.5 rounded-xl bg-midnight/90 border border-midnight-border/60 hover:border-teal/30 transition-colors text-xs text-warm-white"
                      >
                        <span className="flex-grow leading-relaxed">{activity}</span>

                        {/* Reorder and Delete Controls */}
                        <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => handleMoveActivityUp(dayItem.day, actIdx)}
                            disabled={actIdx === 0}
                            className="p-1 text-muted hover:text-teal disabled:opacity-20"
                            aria-label="Move activity earlier"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveActivityDown(dayItem.day, actIdx)}
                            disabled={actIdx === dayItem.activities.length - 1}
                            className="p-1 text-muted hover:text-teal disabled:opacity-20"
                            aria-label="Move activity later"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveActivity(dayItem.day, actIdx)}
                            className="p-1 text-muted hover:text-rose-400"
                            aria-label="Delete activity"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Add Activity Trigger */}
              <div className="pt-4 mt-4 border-t border-midnight-border/60">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Plus}
                  className="w-full text-xs"
                  onClick={() => setNewActivityDay(dayItem.day)}
                >
                  Add Experience to Day {dayItem.day}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Trips Library Section */}
      <div className="pt-12 border-t border-midnight-border space-y-6">
        <div>
          <h3 className="text-2xl font-serif text-warm-white">Your Saved Custom Itineraries</h3>
          <p className="text-xs text-muted">Review, edit, or delete trip configurations saved in LocalStorage.</p>
        </div>

        {savedTrips.length === 0 ? (
          <div className="p-8 rounded-2xl bg-midnight-card border border-dashed border-midnight-border text-center text-sm text-muted">
            You have no saved trips yet. Configure a journey above and click "Save Trip to My Library".
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedTrips.map((trip) => {
              const destObj = DESTINATIONS.find((d) => d.id === trip.destinationId) || DESTINATIONS[0];
              return (
                <div
                  key={trip.id}
                  className="bg-midnight-card border border-midnight-border rounded-2xl p-5 shadow-xl flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif font-medium text-lg text-warm-white">{trip.tripName}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal/10 text-teal border border-teal/20 font-semibold shrink-0">
                        {trip.days?.length || 0} Days
                      </span>
                    </div>

                    <div className="text-xs text-muted space-y-1">
                      <p className="flex items-center gap-1.5 text-sand">
                        <MapPin className="w-3.5 h-3.5 text-teal" />
                        {destObj.name}, {destObj.country}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {trip.startDate} to {trip.endDate}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5" />
                        Budget: ${trip.budget?.toLocaleString()} for {trip.travelers} traveler(s)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-4 mt-4 border-t border-midnight-border">
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={Edit3}
                      onClick={() => handleEditTrip(trip)}
                      className="flex-grow text-xs"
                    >
                      Load & Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={Trash2}
                      onClick={() => setTripToDelete(trip)}
                      className="text-xs"
                      aria-label="Delete saved trip"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Activity Modal */}
      <Modal
        isOpen={newActivityDay !== null}
        onClose={() => setNewActivityDay(null)}
        title={`Add Experience to Day ${newActivityDay}`}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-1.5">
              Select Preset Signature Experience
            </label>
            <select
              value={selectedPresetActivity}
              onChange={(e) => {
                setSelectedPresetActivity(e.target.value);
                if (e.target.value) setCustomActivityText(e.target.value);
              }}
              className="w-full bg-midnight px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-warm-white border border-midnight-border focus:outline-none focus:border-teal"
            >
              <option value="">Choose from catalog...</option>
              {PRESET_ACTIVITIES.map((act) => (
                <option key={act.id} value={act.title}>
                  {act.title} ({act.category})
                </option>
              ))}
            </select>
          </div>

          <div className="text-center text-xs text-muted font-mono">— OR WRITE CUSTOM —</div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-1.5">
              Custom Activity Description
            </label>
            <textarea
              value={customActivityText}
              onChange={(e) => setCustomActivityText(e.target.value)}
              placeholder="e.g. Sunset cocktails at cliffside panoramic lounge followed by artisan seafood feast"
              rows={3}
              className="w-full bg-midnight px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-warm-white border border-midnight-border focus:outline-none focus:border-teal placeholder:text-muted/60"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" size="sm" onClick={() => setNewActivityDay(null)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" icon={Plus} onClick={handleAddActivity}>
              Add to Day {newActivityDay}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={tripToDelete !== null}
        onClose={() => setTripToDelete(null)}
        title="Delete Itinerary"
      >
        <div className="space-y-4">
          <p className="text-sm text-warm-white/80 leading-relaxed">
            Are you sure you want to permanently remove <strong>{tripToDelete?.tripName}</strong> from your saved trips? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" size="sm" onClick={() => setTripToDelete(null)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" icon={Trash2} onClick={handleDeleteTrip}>
              Permanently Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
