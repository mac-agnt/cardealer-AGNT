import Navbar from './Navbar';
import ProductShowcase from './home/ProductShowcase';
import FinalCTA from './FinalCTA';
import Footer from './Footer';
import StickyBar from './StickyBar';
import { useRevealOnScroll } from '../lib/useRevealOnScroll';

export default function UspPage({ onBookDemo }) {
  useRevealOnScroll();

  return (
    <>
      <Navbar onBookDemo={onBookDemo} />

      <main>
        <ProductShowcase />
        <FinalCTA onBookDemo={onBookDemo} />
      </main>

      <Footer onBookDemo={onBookDemo} />
      <StickyBar onBookDemo={onBookDemo} />
    </>
  );
}
