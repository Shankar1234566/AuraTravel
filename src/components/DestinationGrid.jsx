import React from 'react';
import { motion } from 'motion/react';
import { DestinationCard } from './DestinationCard';
import { EmptyState } from './EmptyState';

export function DestinationGrid({
  destinations = [],
  onReset,
  className = ''
}) {
  if (destinations.length === 0) {
    return <EmptyState onAction={onReset} />;
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 ${className}`}>
      {destinations.map((destination, index) => (
        <motion.div
          key={destination.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: (index % 6) * 0.08 }}
        >
          <DestinationCard destination={destination} />
        </motion.div>
      ))}
    </div>
  );
}
