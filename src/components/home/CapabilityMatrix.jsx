import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProgressiveBlur } from '../ui/ProgressiveBlur';
import { CAPABILITY_SUMMARY } from './capabilityData';
import './CapabilityMatrix.css';

function CapCheckIcon() {
  return (
    <svg className="cap-summary__tick" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2 6.2 4.8 9 10 3.5" />
    </svg>
  );
}

export default function CapabilityMatrix() {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const root = trackRef.current;
    if (!root) return;

    const cards = [...root.querySelectorAll('.cap-summary__card')];
    if (cards.length === 0) return;

    const pickActive = () => {
      const rootRect = root.getBoundingClientRect();
      const mid = rootRect.left + rootRect.width / 2;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const c = r.left + r.width / 2;
        const d = Math.abs(c - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActiveIndex(best);
    };

    pickActive();
    root.addEventListener('scroll', pickActive, { passive: true });
    window.addEventListener('resize', pickActive);

    return () => {
      root.removeEventListener('scroll', pickActive);
      window.removeEventListener('resize', pickActive);
    };
  }, []);

  const scrollToCard = useCallback((index) => {
    const track = trackRef.current;
    const card = track?.querySelectorAll('.cap-summary__card')[index];
    card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, []);

  return (
    <section className="cap section" id="capabilities" aria-labelledby="cap-heading">
      <div className="container container--wide">
        <header className="cap__header reveal">
          <p className="section-label">Capability architecture</p>
          <h2 id="cap-heading" className="cap__title">
            What <span className="text-gradient">AGNT</span> can do
          </h2>
          <p className="cap__lede">
            Three layers: public site, dealer operations, and sales follow-up. One connected system for independents who
            have outgrown disconnected tools.
          </p>
        </header>

        <div className="cap-summary__viewport">
          <div
            ref={trackRef}
            className="cap-summary cap-summary--deck"
            role="region"
            aria-roledescription="carousel"
            aria-label="Capability highlights. Swipe sideways to see all three."
          >
            {CAPABILITY_SUMMARY.map((card, index) => (
              <article
                key={card.id}
                className={`cap-summary__card reveal-sm ${index === 1 ? 'cap-summary__card--center' : ''}`}
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${CAPABILITY_SUMMARY.length}: ${card.title}`}
              >
                <div className="cap-summary__glass" aria-hidden="true" />
                <div className="cap-summary__surface">
                  <p className="cap-summary__eyebrow">{card.eyebrow}</p>
                  <h3 className="cap-summary__title">{card.title}</h3>
                  <p className="cap-summary__tagline">{card.tagline}</p>
                  <div className="cap-summary__features-wrap">
                    <ul className="cap-summary__features" aria-label="Highlights">
                      {card.features.map((line) => (
                        <li key={line} className="cap-summary__feature">
                          <CapCheckIcon />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="cap-summary__lower">
                  <ProgressiveBlur
                    className="cap-summary__progressive-blur"
                    position="bottom"
                    backgroundColor="rgba(26, 25, 24, 0.9)"
                    blurAmount="22px"
                    style={{ top: '-58px', bottom: 0, height: 'auto' }}
                  />
                  <div className="cap-summary__cta-wrap">
                    <Link to={card.route} className="btn btn-secondary btn-micro cap-summary__cta">
                      Learn more
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="cap-summary__deck-meta">
            <div className="cap-summary__deck-dots" role="group" aria-label="Jump to a capability card">
              {CAPABILITY_SUMMARY.map((card, i) => (
                <button
                  key={card.id}
                  type="button"
                  className={`cap-summary__deck-dot${i === activeIndex ? ' is-active' : ''}`}
                  aria-current={i === activeIndex ? 'true' : undefined}
                  aria-label={`Show ${card.title}`}
                  onClick={() => scrollToCard(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
