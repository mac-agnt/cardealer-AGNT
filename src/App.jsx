import { useState, useCallback } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SplitSection from './components/SplitSection';
import WhatYouGet from './components/WhatYouGet';
import NewestFeatureUnifiedInbox from './components/NewestFeatureUnifiedInbox';
import Features from './components/Features';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import SpecPage from './components/SpecPage';
import DemoModal from './components/DemoModal';
import StickyBar from './components/StickyBar';
import Footer from './components/Footer';

function HomePage({ onBookDemo }) {
  return (
    <>
      <Navbar onBookDemo={onBookDemo} />

      <main>
        <Hero onBookDemo={onBookDemo} />
        <SplitSection onBookDemo={onBookDemo} />
        <WhatYouGet onBookDemo={onBookDemo} />
        <NewestFeatureUnifiedInbox onBookDemo={onBookDemo} />
        <Features onBookDemo={onBookDemo} />
        <Pricing onBookDemo={onBookDemo} />
        <FAQ />
        <FinalCTA onBookDemo={onBookDemo} />
      </main>

      <Footer />
      <StickyBar onBookDemo={onBookDemo} />
    </>
  );
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage onBookDemo={openModal} />} />
        <Route path="/spec" element={<SpecPage onBookDemo={openModal} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <DemoModal open={modalOpen} onClose={closeModal} />
    </>
  );
}
