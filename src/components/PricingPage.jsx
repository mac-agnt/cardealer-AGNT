import Navbar from './Navbar';
import PlanCheckout from './PlanCheckout';
import Footer from './Footer';
import { useRevealOnScroll } from '../lib/useRevealOnScroll';

export default function PricingPage({ onBookDemo }) {
  useRevealOnScroll();

  return (
    <>
      <Navbar onBookDemo={onBookDemo} />

      <main>
        <PlanCheckout />
      </main>

      <Footer onBookDemo={onBookDemo} />
    </>
  );
}
