import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, ArrowRight, Heart, MapPin, Shield, Globe, Award } from 'lucide-react';
import { Button } from './Button';
import { Modal } from './Modal';
import { useToast } from './Toast';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [legalModal, setLegalModal] = useState({ isOpen: false, title: '', content: '' });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'warning');
      return;
    }
    showToast('Subscribed! Welcome to AuraTravel Curated Journal (Demo).', 'success');
    setEmail('');
  };

  const openTerms = () => {
    setLegalModal({
      isOpen: true,
      title: 'AuraTravel Terms of Service',
      content: 'This application is an HR frontend technical assessment project showcasing modern React, Tailwind CSS, Motion animations, and interactive design. All flight, hotel, and destination rates shown are illustrative demo estimates. No live transactions or real bookings occur.'
    });
  };

  const openPrivacy = () => {
    setLegalModal({
      isOpen: true,
      title: 'Privacy Policy',
      content: 'Your saved favorites, custom trip itineraries, and preferences are securely stored locally inside your browser using HTML5 LocalStorage. We do not collect, transmit, or share your personal trip planning data.'
    });
  };

  return (
    <footer className="bg-midnight-card border-t border-midnight-border text-warm-white/80 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-teal flex items-center justify-center text-midnight font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-warm-white">
                Aura<span className="text-teal">Travel</span>
              </span>
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-sm">
              The world is closer than you think. Find your next extraordinary destination through cinematic discovery, bespoke itineraries, and seamless trip planning.
            </p>
            <div className="flex items-center gap-4 text-muted text-xs pt-2">
              <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-teal" /> Verified Sample Data</span>
              <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-teal" /> 12 Global Hubs</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-warm-white font-semibold mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li><Link to="/explore" className="hover:text-teal transition-colors">All Destinations</Link></li>
              <li><Link to="/planner" className="hover:text-teal transition-colors">Interactive Trip Planner</Link></li>
              <li><Link to="/saved" className="hover:text-teal transition-colors">Saved Bucket List</Link></li>
              <li><Link to="/about" className="hover:text-teal transition-colors">Our Travel Philosophy</Link></li>
              <li><Link to="/contact" className="hover:text-teal transition-colors">Contact Concierge</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-warm-white font-semibold mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li><Link to="/explore?category=Luxury" className="hover:text-teal transition-colors">Luxury Island Retreats</Link></li>
              <li><Link to="/explore?category=Mountains" className="hover:text-teal transition-colors">Alpine & Snow Escapes</Link></li>
              <li><Link to="/explore?category=Culture" className="hover:text-teal transition-colors">Historic Cultural Odysseys</Link></li>
              <li><Link to="/explore?category=Adventure" className="hover:text-teal transition-colors">Wilderness & Trekking</Link></li>
              <li><Link to="/explore?category=City escapes" className="hover:text-teal transition-colors">Iconic Metropolises</Link></li>
            </ul>
          </div>

          {/* Newsletter / Journal */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-warm-white font-semibold mb-4">
              The Journal
            </h4>
            <p className="text-xs text-muted mb-3 leading-relaxed">
              Receive handpicked seasonal itineraries and secret retreat dispatches.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-midnight px-3.5 py-2 rounded-xl text-xs text-warm-white border border-midnight-border focus:outline-none focus:border-teal placeholder:text-muted/60"
                  aria-label="Newsletter email address"
                />
              </div>
              <Button type="submit" variant="primary" size="sm" className="w-full text-xs" icon={ArrowRight} iconPosition="right">
                Join Dispatch
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-midnight-border/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© {currentYear} AuraTravel Experiences Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={openPrivacy} className="hover:text-warm-white transition-colors">
              Privacy Policy
            </button>
            <button onClick={openTerms} className="hover:text-warm-white transition-colors">
              Terms of Service
            </button>
            <span className="text-muted/60">Frontend Assessment Project</span>
          </div>
        </div>
      </div>

      {/* Legal Dialog */}
      <Modal
        isOpen={legalModal.isOpen}
        onClose={() => setLegalModal({ ...legalModal, isOpen: false })}
        title={legalModal.title}
      >
        <p className="text-sm text-warm-white/80 leading-relaxed">
          {legalModal.content}
        </p>
        <div className="mt-6 flex justify-end">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setLegalModal({ ...legalModal, isOpen: false })}
          >
            I Understand
          </Button>
        </div>
      </Modal>
    </footer>
  );
}
