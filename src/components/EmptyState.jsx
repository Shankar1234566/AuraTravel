import React from 'react';
import { Compass } from 'lucide-react';
import { Button } from './Button';

export function EmptyState({
  title = "No destinations found",
  description = "Try adjusting your search criteria or reset filters to see all extraordinary places.",
  actionText = "Reset Filters",
  onAction,
  icon: Icon = Compass
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-md mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-midnight-card border border-midnight-border flex items-center justify-center text-teal mb-5 shadow-inner">
        <Icon className="w-8 h-8 opacity-80" />
      </div>
      <h3 className="text-xl font-serif font-medium text-warm-white mb-2">{title}</h3>
      <p className="text-muted text-sm leading-relaxed mb-6">{description}</p>
      {onAction && actionText && (
        <Button variant="secondary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}
