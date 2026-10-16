import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Compass, 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Award, 
  Globe2, 
  Clock, 
  Search,
  Heart,
  SlidersHorizontal,
  Star
} from 'lucide-react';
import { Button } from '../components/Button';
import { SectionHeading } from '../components/SectionHeading';
import { DestinationCard } from '../components/DestinationCard';
import { ScrollReveal } from '../components/ScrollReveal';
import { DESTINATIONS, CATEGORIES } from '../data/destinations';

export function Home() {
  const navigate = useNavigate();
  const [heroSearch, setHeroSearch] = useState('');
  const [heroCategory, setHeroCategory] = useState('All');

  // Hero Quick Search submit
  const handleHeroSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (heroSearch) params.append('q', heroSearch);
    if (heroCategory !== 'All') params.append('category', heroCategory);
    navigate(`/explore?${params.toString()}`);
  };

  const featuredDestinations = DESTINATIONS.slice(0, 3);
  const curatedEscapes = DESTINATIONS.slice(3, 9);

  return (
    <div className="space-y-24 -mt-20">
      {/* Cinematic Hero */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with slow zoom */}
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85')`
          }}
        />

        {/* Ambient Gradient Overlays for perfect legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-midnight/30 to-midnight" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-midnight-card/80 border border-teal/30 backdrop-blur-md text-teal text-xs font-semibold uppercase tracking-widest mb-6 shadow-glow"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>YOUR NEXT CHAPTER STARTS HERE</span>
          </motion.div>

          {/* Staggered Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-warm-white font-medium tracking-tight max-w-5xl leading-[1.08] mb-6"
          >
            Find Your Next <span className="italic text-teal font-normal">Extraordinary</span>.
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-warm-white/80 text-base sm:text-lg md:text-xl max-w-2xl font-normal leading-relaxed mb-10"
          >
            Bespoke itineraries, cinematic global destinations, and an intuitive trip planner designed for discerning travelers seeking true wonder.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-14"
          >
            <Button
              variant="primary"
              size="lg"
              icon={Compass}
              onClick={() => navigate('/explore')}
              className="w-full sm:w-auto"
            >
              Explore Destinations
            </Button>
            <Button
              variant="secondary"
              size="lg"
              icon={Calendar}
              onClick={() => navigate('/planner')}
              className="w-full sm:w-auto"
            >
              Plan Your Journey
            </Button>
          </motion.div>

          {/* Hero Quick Search Panel */}
          <motion.form
            onSubmit={handleHeroSearch}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="w-full max-w-3xl bg-midnight-card/85 backdrop-blur-xl border border-midnight-border rounded-2xl p-3 sm:p-4 shadow-2xl flex flex-col sm:flex-row gap-3 items-center"
          >
            <div className="relative w-full sm:flex-grow">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="Where does your imagination lead you? (e.g. Kyoto, Alps)"
                className="w-full bg-midnight/90 pl-10 pr-3 py-3 rounded-xl text-xs sm:text-sm text-warm-white border border-midnight-border focus:outline-none focus:border-teal placeholder:text-muted/60"
              />
            </div>
            <div className="w-full sm:w-48">
              <select
                value={heroCategory}
                onChange={(e) => setHeroCategory(e.target.value)}
                className="w-full bg-midnight/90 px-3 py-3 rounded-xl text-xs sm:text-sm text-warm-white border border-midnight-border focus:outline-none focus:border-teal"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
              className="w-full sm:w-auto shrink-0"
            >
              Discover
            </Button>
          </motion.form>

          {/* Floating Destination Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="hidden lg:flex items-center gap-3 mt-10 px-4 py-2 rounded-full bg-midnight/70 backdrop-blur-md border border-white/10 text-xs text-muted"
          >
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span className="text-warm-white">Featured Sanctuary:</span>
            <span>Swiss Alps Glacier Range</span>
            <span className="font-mono text-sand">46.0207° N, 7.7491° E</span>
          </motion.div>
        </div>
      </section>

      {/* Featured Editorial Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-teal mb-2 block">
              CURATED EXPEDITIONS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-warm-white font-medium">
              Handpicked Iconic Sanctuaries
            </h2>
          </div>
          <Link
            to="/explore"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-teal text-sm font-semibold hover:text-warm-white transition-colors group"
          >
            <span>View all 12 destinations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      {/* Interactive Experience Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-midnight-card border border-midnight-border rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
            <ScrollReveal direction="up" delay={0.1}>
              <span className="text-3xl sm:text-5xl font-serif font-bold text-teal block mb-1">
                12
              </span>
              <span className="text-xs uppercase tracking-widest text-muted font-medium">
                Global Sanctuaries
              </span>
              <p className="text-[11px] text-muted/70 mt-1">From Bali to the Alps</p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <span className="text-3xl sm:text-5xl font-serif font-bold text-gold block mb-1">
                48+
              </span>
              <span className="text-xs uppercase tracking-widest text-muted font-medium">
                Day Itinerary Blocks
              </span>
              <p className="text-[11px] text-muted/70 mt-1">Curated by travel specialists</p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <span className="text-3xl sm:text-5xl font-serif font-bold text-teal block mb-1">
                4.92
              </span>
              <span className="text-xs uppercase tracking-widest text-muted font-medium">
                Average Experience Rating
              </span>
              <p className="text-[11px] text-muted/70 mt-1">Based on sample travelers</p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4}>
              <span className="text-3xl sm:text-5xl font-serif font-bold text-warm-white block mb-1">
                100%
              </span>
              <span className="text-xs uppercase tracking-widest text-muted font-medium">
                Local In-Browser Privacy
              </span>
              <p className="text-[11px] text-muted/70 mt-1">Zero trackers or ads</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Brand Philosophy / Design Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="THE AURATRAVEL ADVANTAGE"
          title="Designed for Deep Wonder"
          description="We replace generic search engines with intentional, design-led discovery and thoughtful day-by-day journey curation."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ScrollReveal direction="up" delay={0.1} className="bg-midnight-card border border-midnight-border rounded-2xl p-8 hover:border-teal/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal/10 text-teal flex items-center justify-center mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-medium text-warm-white mb-3">
                Cinematic Visual Discovery
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Experience places before you set foot. Full-width editorial photography, authentic local contexts, and accurate seasonal guidance.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-midnight-border text-xs text-teal font-medium">
              Zero stock fluff
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2} className="bg-midnight-card border border-midnight-border rounded-2xl p-8 hover:border-teal/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-medium text-warm-white mb-3">
                Drag & Sequence Planner
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Construct days with custom activities, reorder experiences with single taps, calculate realistic budgets, and save trips offline.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-midnight-border text-xs text-gold font-medium">
              Seamless LocalStorage persistence
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3} className="bg-midnight-card border border-midnight-border rounded-2xl p-8 hover:border-teal/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal/10 text-teal flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-medium text-warm-white mb-3">
                Authentic Cultural Respect
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Curated travel tips honor local etiquette, spiritual temples, alpine environments, and indigenous heritage across all destinations.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-midnight-border text-xs text-teal font-medium">
              Mindful travel guidelines
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Secondary Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-teal mb-2 block">
              MORE DESTINATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-warm-white font-medium">
              Escape to Distinctive Horizons
            </h2>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/explore')}
            icon={ArrowRight}
            iconPosition="right"
          >
            Browse All Places
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {curatedEscapes.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      {/* Quote / Editorial Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-midnight-card/60 border border-midnight-border backdrop-blur-md">
          <p className="font-serif text-2xl sm:text-3xl text-sand italic leading-relaxed mb-6">
            "Travel is fatal to prejudice, bigotry, and narrow-mindedness, and many of our people need it sorely on these accounts."
          </p>
          <span className="text-xs uppercase tracking-widest text-muted block font-medium">
            Mark Twain — Innocents Abroad
          </span>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-ocean/40 via-midnight-card to-midnight p-8 sm:p-16 border border-teal/20 text-center flex flex-col items-center">
          <h2 className="text-3xl sm:text-5xl font-serif font-medium text-warm-white mb-4 max-w-2xl">
            Ready to design your extraordinary journey?
          </h2>
          <p className="text-muted text-base max-w-xl mb-8 leading-relaxed">
            Create your personalized day-by-day itinerary in minutes. Choose destinations, set budgets, arrange activities, and save offline.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button
              variant="primary"
              size="lg"
              icon={Calendar}
              onClick={() => navigate('/planner')}
            >
              Open Trip Planner
            </Button>
            <Button
              variant="outline"
              size="lg"
              icon={Compass}
              onClick={() => navigate('/explore')}
            >
              Explore All 12 Places
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
