import { useEffect, useState } from 'react';
import './Hero.css';

export default function Hero({ onBookDemo }) {
  const [loaded, setLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero" id="hero">
      {/* z-0  background base */}
      <div className="hero__base" aria-hidden="true" />

      {/* z-10  blueprint grid (fine + major) */}
      <div className="hero__grid" aria-hidden="true" />
      <span
        className={`hero__grid-scan ${loaded ? 'hero__grid-scan--active' : ''}`}
        aria-hidden="true"
      />

      {/* z-15  vignette for text readability (does NOT kill grid) */}
      <div className="hero__vignette" aria-hidden="true" />

      {/* z-20  left-column label */}
      <span className="hero__moodword hero__moodword--private" aria-hidden="true">
        Dealer
      </span>

      {/* z-30  occlusion mask — paints background over words in car shape */}
      <div className="hero__occlusion" aria-hidden="true" />

      {/* z-40  centered car */}
      <div className="hero__car-stage" aria-hidden="true">
        <div className="hero__car-tone" />
        <div className={`hero__car-wrap ${loaded ? 'hero__car-wrap--visible' : ''}`}>
          {imageFailed ? (
            <div className="hero__car-fallback" />
          ) : (
            <img
              src="/hero.car.png"
              alt=""
              className="hero__car-image"
              loading="eager"
              decoding="async"
              width="1664"
              height="936"
              onError={() => setImageFailed(true)}
            />
          )}
        </div>
      </div>

      {/* z-50  top-right header block */}
      <div className={`hero__tr ${loaded ? 'hero__tr--visible' : ''}`}>
        <span className="hero__tr-rule" aria-hidden="true" />
        <p className="hero__tr-overline">AGNT.IE / Dealer System</p>
        <p className="hero__tr-headline">
          Dealer software<br />that moves stock.
        </p>
      </div>

      {/* z-50  bottom-left CTA block */}
      <div className={`hero__bl ${loaded ? 'hero__bl--visible' : ''}`}>
        <p className="hero__bl-sub">
          <span>List cars in minutes, filter time-wasters</span>
          <span>and get buyers&apos; details automatically.</span>
        </p>
        <button
          className="hero__cta"
          onClick={onBookDemo}
          aria-label="Request a 10-minute demo"
        >
          Request a 10-minute demo
        </button>
        <p className="hero__bl-proof">
          No contracts. Built for real dealerships.
        </p>
      </div>

      {/* z-60  integrations strip */}
      <div className={`hero__bottom ${loaded ? 'hero__bottom--visible' : ''}`}>
        <div className="container hero__bottom-inner">
          <span className="hero__integrations-label">Integrates with</span>
          <div className="hero__integrations-row">
            <img src="/6.png" alt="Carzone logo" className="hero__logo" width="132" height="24" loading="lazy" />
            <img src="/7.png" alt="DoneDeal logo" className="hero__logo" width="132" height="24" loading="lazy" />
            <img src="/8.png" alt="Cars.ie logo" className="hero__logo" width="112" height="24" loading="lazy" />
            <span className="hero__site-label">Your Site</span>
          </div>
        </div>
      </div>
    </section>
  );
}
