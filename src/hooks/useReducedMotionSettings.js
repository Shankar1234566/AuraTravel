import { useSyncExternalStore } from 'react';

function subscribe(callback) {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', callback);
    return () => mediaQuery.removeEventListener('change', callback);
  }
  
  mediaQuery.addListener(callback);
  return () => mediaQuery.removeListener(callback);
}

function getSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getServerSnapshot() {
  return false; // Safe default for SSR environments
}

export function useReducedMotionSettings() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}