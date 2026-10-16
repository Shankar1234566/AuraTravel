import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Eye, HeartHandshake, Shield, Sparkles, Globe, MapPin, Feather } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { ScrollReveal } from '../components/ScrollReveal';

export function About() {
  const navigate = useNavigate();

  return (
    <div className="space-y-24 py-12">
      {/* Brand Introduction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-xs uppercase tracking-widest font-semibold text-teal px-3 py-1 rounded-full bg-teal/10 border border-teal/20 inline-block">
            OUR TRAVEL PHILOSOPHY
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-warm-white font-medium tracking-tight">
            "The world is closer than you think."
          </h1>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
            AuraTravel was conceived from a simple belief: genuine discovery happens when design, context, and mindful curation align. Rather than bombarding travelers with thousands of endless listings, we focus on depth, beauty, and practical day-by-day precision.
          </p>
        </div>
      </section>

      {/* Atmospheric Editorial Feature */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden aspect-[21/9] min-h-[320px] bg-midnight border border-white/10 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80"
            alt="Kyoto traditional lanterns and cobblestone path"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 max-w-xl">
            <span className="text-xs uppercase tracking-widest font-mono text-sand block mb-2">
              SLOW TRAVEL PRINCIPLE
            </span>
            <p className="font-serif text-xl sm:text-2xl text-warm-white italic">
              "We measure travel not by miles logged, but by the quiet stillness found in ancient shrines and high alpine summits."
            </p>
          </div>
        </div>
      </section>

      {/* 4 Interactive Values Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="CORE VALUES"
          title="How We Curate Destinations"
          description="Every sanctuary in the AuraTravel collection meets strict criteria for authenticity, natural grandeur, and cultural integrity."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollReveal direction="up" delay={0.1} className="bg-midnight-card border border-midnight-border rounded-2xl p-8 hover:border-teal/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-teal/10 text-teal flex items-center justify-center mb-5">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-medium text-warm-white mb-3">
              Design-Led Discovery
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              Travel interfaces should reflect the elegance of the destinations they showcase. We eliminate clutter, banners, and fake countdown timers in favor of cinematic editorial pacing and typography.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2} className="bg-midnight-card border border-midnight-border rounded-2xl p-8 hover:border-teal/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-5">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-medium text-warm-white mb-3">
              Realistic Logistics & Budgets
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              We provide transparent indicative budget brackets, suggested durations, and verified seasonal weather contexts so travelers can prepare with total confidence.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3} className="bg-midnight-card border border-midnight-border rounded-2xl p-8 hover:border-teal/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-teal/10 text-teal flex items-center justify-center mb-5">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-medium text-warm-white mb-3">
              Respect for Local Heritage
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              Every destination highlights local cultural etiquette, conservation guidelines, and sustainable community experiences that leave sanctuaries better than we found them.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4} className="bg-midnight-card border border-midnight-border rounded-2xl p-8 hover:border-teal/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-5">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-medium text-warm-white mb-3">
              Private In-Browser Utility
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              Your dream itineraries, custom day sequences, and bucket lists are stored directly on your own device. We respect user privacy without requiring forced account signups.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Curatorial Story (Transparent and grounded) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-midnight-card border border-midnight-border rounded-3xl p-8 sm:p-12 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif text-warm-white">
            The Team & Architectural Vision
          </h2>
          <p className="text-sm sm:text-base text-warm-white/80 leading-relaxed font-light">
            AuraTravel was developed as an advanced frontend engineering project demonstrating modern component architecture, state management with LocalStorage, fluid Motion animations, and responsive editorial web design.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-midnight-border text-xs text-muted">
            <div>
              <span className="font-semibold text-warm-white block mb-1">Architecture</span>
              <p>React 18 with Vite, Motion for React, and Tailwind CSS</p>
            </div>
            <div>
              <span className="font-semibold text-warm-white block mb-1">Curation Engine</span>
              <p>12 handpicked global retreats across 7 distinct travel styles</p>
            </div>
            <div>
              <span className="font-semibold text-warm-white block mb-1">State Persistence</span>
              <p>Resilient client-side LocalStorage synchronization</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-12">
        <h2 className="text-3xl font-serif text-warm-white mb-4">Start Planning Your Next Expedition</h2>
        <p className="text-muted text-sm max-w-md mx-auto mb-8">
          Explore our collection or craft a multi-day itinerary with our interactive planner.
        </p>
        <Button variant="primary" size="lg" icon={Compass} onClick={() => navigate('/explore')}>
          Explore 12 Global Sanctuaries
        </Button>
      </section>
    </div>
  );
}
