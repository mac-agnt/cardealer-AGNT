import { useReveal } from '../hooks/useReveal';
import './WhatYouGet.css';

const FEATURES = [
  'AI Listings (reg + photos)',
  'Multi-platform publishing',
  'Lead Unlock (name + phone)',
  'Buyer intent signals',
  'Stock always up to date',
  'Premium vehicle pages',
  'Fast mobile browsing',
  'Dealer lead feed (hot/warm)',
];

export default function WhatYouGet({ onBookDemo }) {
  const [ref, visible] = useReveal(0.12);

  return (
    <section className="wyg section" id="what-you-get" ref={ref}>
      <div className="container">
        <div
          className="wyg__header"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease-out',
          }}
        >
          <span className="section-label">What you get</span>
          <h2>Built for dealers who want more.</h2>
          <p className="wyg__sub">
            Everything is designed for one outcome: faster listings, tighter follow-up, more closed deals — without adding headcount.
          </p>
        </div>

        <div className="wyg__grid">
          {FEATURES.map((feature, i) => (
            <div
              key={feature}
              className={`wyg__card ${visible ? 'wyg__card--visible' : ''}`}
              style={{ transitionDelay: `${0.15 + i * 0.06}s` }}
            >
              <span className="wyg__card-text">{feature}</span>
            </div>
          ))}
        </div>

        <div
          className="wyg__footer"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.6s ease-out 0.8s',
          }}
        >
          <button className="wyg__cta" onClick={onBookDemo}>
            Book a 10-min Demo <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </section>
  );
}
