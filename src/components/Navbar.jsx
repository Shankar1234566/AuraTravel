import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { Compass, Heart, Menu, X, Calendar, Sparkles } from 'lucide-react';
import { Button } from './Button';
import { useFavorites } from '../hooks/useFavorites';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { count: favoriteCount } = useFavorites();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Plan a Trip', path: '/planner' },
    { name: 'Saved', path: '/saved', badge: favoriteCount },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-midnight/90 backdrop-blur-md border-b border-midnight-border/80 py-3.5 shadow-xl'
          : 'bg-gradient-to-b from-midnight/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-teal rounded-lg p-1"
            aria-label="AuraTravel Home"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-ocean via-teal to-gold p-0.5 flex items-center justify-center shadow-lg shadow-teal/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-midnight rounded-[10px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-teal group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-tight text-warm-white group-hover:text-teal transition-colors">
                Aura<span className="text-teal">Travel</span>
              </span>
              <span className="text-[9px] tracking-widest uppercase text-muted -mt-1 font-mono">
                Bespoke Journeys
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-3 bg-midnight-card/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-midnight-border">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-3.5 py-1.5 text-xs lg:text-sm font-medium rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-midnight bg-teal font-semibold shadow-sm'
                      : 'text-warm-white/80 hover:text-warm-white hover:bg-white/5'
                  }`
                }
              >
                {link.name}
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-gold text-midnight leading-none">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Action button */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              icon={Calendar}
              onClick={() => navigate('/planner')}
            >
              Start Planning
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/saved"
              className="p-2 text-warm-white hover:text-teal relative"
              aria-label="View Saved Places"
            >
              <Heart className="w-5 h-5" />
              {favoriteCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[10px] bg-gold text-midnight rounded-full flex items-center justify-center font-bold">
                  {favoriteCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-warm-white hover:text-teal focus:outline-none focus:ring-2 focus:ring-teal rounded-lg"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-midnight/95 backdrop-blur-xl border-b border-midnight-border px-4 pt-3 pb-6 space-y-2 mt-3 animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-teal text-midnight font-semibold'
                    : 'text-warm-white/90 hover:bg-white/5 hover:text-teal'
                }`
              }
            >
              <span>{link.name}</span>
              {link.badge !== undefined && link.badge > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-gold text-midnight">
                  {link.badge}
                </span>
              )}
            </NavLink>
          ))}
          <div className="pt-3 border-t border-midnight-border">
            <Button
              variant="primary"
              size="md"
              className="w-full"
              icon={Sparkles}
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/planner');
              }}
            >
              Start Planning Trip
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
