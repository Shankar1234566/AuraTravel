import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { ToastProvider } from './components/Toast';

// Pages
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { DestinationDetails } from './pages/DestinationDetails';
import { TripPlanner } from './pages/TripPlanner';
import { SavedPlaces } from './pages/SavedPlaces';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="explore" element={<Explore />} />
            <Route path="destination/:id" element={<DestinationDetails />} />
            <Route path="planner" element={<TripPlanner />} />
            <Route path="saved" element={<SavedPlaces />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
