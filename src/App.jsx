import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SplitSection from './components/SplitSection';
import WhatYouGet from './components/WhatYouGet';
import LeadUnlock from './components/LeadUnlock';
import Features from './components/Features';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import DemoModal from './components/DemoModal';
import StickyBar from './components/StickyBar';
import Footer from './components/Footer';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <Navbar onBookDemo={openModal} />

      <main>
        <Hero onBookDemo={openModal} />
        <SplitSection />
        <WhatYouGet onBookDemo={openModal} />
        <LeadUnlock />
        <Features />
        <Pricing onBookDemo={openModal} />
        <FAQ />
        <FinalCTA onBookDemo={openModal} />
      </main>

      <Footer />
      <StickyBar onBookDemo={openModal} />
      <DemoModal open={modalOpen} onClose={closeModal} />
    </>
  );
}
