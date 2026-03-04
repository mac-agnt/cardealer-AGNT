import { useState, useCallback, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Integrations from './components/Integrations';
import SplitSection from './components/SplitSection';
import WhatYouGet from './components/WhatYouGet';
import NewestFeatureUnifiedInbox from './components/NewestFeatureUnifiedInbox';
import Features from './components/Features';
import Pricing from './components/Pricing';
import SpecPage from './components/SpecPage';
import BuildPage from './components/build/BuildPage';
import DemoModal from './components/DemoModal';
import StickyBar from './components/StickyBar';
import Footer from './components/Footer';
import { useRevealOnScroll } from './lib/useRevealOnScroll';

function HomePage({ onBookDemo }) {
  useRevealOnScroll();

  return (
    <>
      <Navbar onBookDemo={onBookDemo} />

      <main>
        <Hero onBookDemo={onBookDemo} />
        <Integrations />
        <SplitSection />
        <WhatYouGet onBookDemo={onBookDemo} />
        <NewestFeatureUnifiedInbox onBookDemo={onBookDemo} />
        <Features onBookDemo={onBookDemo} />
        <Pricing onBookDemo={onBookDemo} />
      </main>

      <Footer onBookDemo={onBookDemo} />
      <StickyBar onBookDemo={onBookDemo} />
    </>
  );
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  useEffect(() => {
    if (!import.meta.env.DEV) return undefined;

    const checkOverflow = () => {
      const viewportWidth = window.innerWidth;
      const offenders = Array.from(document.querySelectorAll('body *')).filter(
        (element) => element.getBoundingClientRect().width > viewportWidth + 1
      );

      if (offenders.length) {
        console.warn(
          '[overflow-check] Elements wider than viewport:',
          offenders.map((node) => ({
            tag: node.tagName.toLowerCase(),
            className: node.className,
            width: Math.round(node.getBoundingClientRect().width),
          }))
        );
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage onBookDemo={openModal} />} />
        <Route path="/spec" element={<SpecPage onBookDemo={openModal} />} />
        <Route path="/build" element={<BuildPage onBookDemo={openModal} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <DemoModal open={modalOpen} onClose={closeModal} />
    </>
  );
}
