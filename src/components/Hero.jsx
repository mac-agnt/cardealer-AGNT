import { useEffect, useState } from 'react';
import './Hero.css';

const PROOF_CHIPS = [
  'Reg + photos → listing',
  'Publishes everywhere',
  'Lead captured + intent',
];

export default function Hero({ onBookDemo }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero__car-bg" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />

      <div className="container hero__inner">
        <div className={`hero__copy ${loaded ? 'hero__copy--visible' : ''}`}>
          <h1 className="hero__headline">
            List in minutes.<br />
            <span className="hero__headline-accent">Catch serious buyers.</span>
          </h1>
          <p className="hero__sub">
            AGNT is the dealer system behind a premium website — AI listings, multi-platform publishing, and lead intelligence built for closing.
          </p>
          <button className="btn btn-primary hero__cta" onClick={onBookDemo}>
            Book a 10-minute demo
          </button>

          <div className={`hero__chips ${loaded ? 'hero__chips--visible' : ''}`}>
            {PROOF_CHIPS.map((chip) => (
              <span key={chip} className="hero__chip">
                <span className="hero__chip-dot" aria-hidden="true" />
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={`hero__bottom ${loaded ? 'hero__bottom--visible' : ''}`}>
        <div className="container hero__bottom-inner">
          <span className="hero__integrations-label">Integrates with</span>
          <div className="hero__integrations-row">
            <img src="/6.png" alt="Carzone logo" className="hero__logo" width="132" height="24" loading="lazy" />
            <img src="/7.png" alt="DoneDeal logo" className="hero__logo" width="132" height="24" loading="lazy" />
            <img src="/8.png" alt="Cars.ie logo" className="hero__logo" width="112" height="24" loading="lazy" />
            <span className="hero__site-pill">Your Site</span>
          </div>
        </div>
      </div>
    </section>
  );
}
