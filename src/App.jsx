import { useState, useCallback, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ScrollToTop from './lib/ScrollToTop';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValueStrip from './components/home/ValueStrip';
import CapabilityMatrix from './components/home/CapabilityMatrix';
import ThePackage from './components/home/ThePackage';
import ProductShowcase from './components/home/ProductShowcase';
import WhyUpgrade from './components/home/WhyUpgrade';
import HowItWorks from './components/home/HowItWorks';
import Pricing from './components/Pricing';
import SpecTailored from './components/home/SpecTailored';
import FinalCTA from './components/FinalCTA';
import SpecPage from './components/SpecPage';
import SpecPackagesPage from './components/SpecPackagesPage';
import CapabilityDetailPage from './components/capabilities/CapabilityDetailPage';
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
        <ValueStrip onBookDemo={onBookDemo} />
        <CapabilityMatrix />
        <ThePackage />
        <ProductShowcase />
        <WhyUpgrade />
        <HowItWorks />
        <Pricing onBookDemo={onBookDemo} />
        <SpecTailored onBookDemo={onBookDemo} />
        <FinalCTA onBookDemo={onBookDemo} />
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
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage onBookDemo={openModal} />} />
        <Route path="/contact" element={<Navigate to="/#contact" replace />} />
        <Route path="/spec" element={<SpecPage onBookDemo={openModal} />} />
        <Route path="/spec/packages" element={<SpecPackagesPage onBookDemo={openModal} />} />
        <Route path="/capabilities/:slug" element={<CapabilityDetailPage onBookDemo={openModal} />} />
        <Route path="/website-and-conversion" element={<Navigate to="/capabilities/website-conversion" replace />} />
        <Route path="/leads-and-customer-handling" element={<Navigate to="/capabilities/sales-follow-up" replace />} />
        <Route path="/admin-stock-and-sourcing" element={<Navigate to="/capabilities/dealer-operations" replace />} />
        <Route path="/build" element={<BuildPage onBookDemo={openModal} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <DemoModal open={modalOpen} onClose={closeModal} />
    </>
  );
}
