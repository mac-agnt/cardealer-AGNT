import { useReveal } from '../hooks/useReveal';
import './FinalCTA.css';

export default function FinalCTA({ onBookDemo }) {
  const [ref, visible] = useReveal(0.15);

  return (
    <section className="final-cta section" id="demo" ref={ref}>
      <div className="final-cta__watermark" aria-hidden="true">
        <img
          src="/hero-car-schematic.png"
          alt=""
          loading="lazy"
          width="800"
          height="450"
        />
      </div>

      <div className="container final-cta__inner">
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease-out',
          }}
        >
          <h2 className="final-cta__headline">Want to see it on your stock?</h2>
          <p className="final-cta__sub">
            We'll walk you through how it fits your dealership and what it would look like live.
          </p>
          <div className="final-cta__buttons">
            <button className="btn btn-primary" onClick={onBookDemo}>
              Book a 10-min Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
