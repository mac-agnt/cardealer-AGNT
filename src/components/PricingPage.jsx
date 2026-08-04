import Navbar from './Navbar';
import WhyUpgrade from './home/WhyUpgrade';
import HowItWorks from './home/HowItWorks';
import Pricing from './Pricing';
import FinalCTA from './FinalCTA';
import Footer from './Footer';
import StickyBar from './StickyBar';
import { useRevealOnScroll } from '../lib/useRevealOnScroll';

export default function PricingPage({ onBookDemo }) {
  useRevealOnScroll();

  return (
    <>
      <Navbar onBookDemo={onBookDemo} />

      <main>
        <WhyUpgrade />
        <HowItWorks />
        <Pricing onBookDemo={onBookDemo} />
        <FinalCTA onBookDemo={onBookDemo} />
      </main>

      <Footer onBookDemo={onBookDemo} />
      <StickyBar onBookDemo={onBookDemo} />
    </>
  );
}
