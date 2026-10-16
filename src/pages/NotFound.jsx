import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import { Button } from '../components/Button';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <div className="w-20 h-20 rounded-3xl bg-midnight-card border border-midnight-border flex items-center justify-center text-teal mb-6 shadow-2xl">
        <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '20s' }} />
      </div>
      <span className="text-xs uppercase tracking-widest font-mono text-gold mb-2 block">
        ERROR 404 — HORIZON UNCHARTED
      </span>
      <h1 className="text-4xl sm:text-6xl font-serif text-warm-white font-medium mb-4">
        Lost in Wonder
      </h1>
      <p className="text-muted text-base max-w-md mx-auto mb-8 leading-relaxed">
        The destination or page coordinate you are looking for does not exist in our global navigation chart.
      </p>
      <div className="flex items-center gap-4">
        <Button variant="primary" size="md" icon={Compass} onClick={() => navigate('/')}>
          Return Home
        </Button>
        <Button variant="secondary" size="md" icon={ArrowLeft} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    </div>
  );
}
