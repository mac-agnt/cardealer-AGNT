import { useReveal } from '../hooks/useReveal';
import './Pricing.css';

export default function Pricing({ onBookDemo }) {
  const [ref, visible] = useReveal(0.12);

  return (
    <section className="pricing section" id="pricing" ref={ref}>
      <div className="container">
        <div
          className="pricing__header"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease-out',
          }}
        >
          <span className="section-label">Pricing</span>
          <h2>From &euro;999 &mdash; built around your dealership.</h2>
          <p className="pricing__sub">
            Pick the launch that matches your stock volume. We'll show exactly what it looks like on your cars in a 10-minute demo.
          </p>
        </div>

        <div className="pricing__grid">
          {/* Launch Package — primary */}
          <div
            className={`card pricing__card pricing__card--primary ${visible ? 'pricing__card--visible' : ''}`}
            style={{ transitionDelay: '0.15s' }}
          >
            <div className="pricing__popular-badge">Most Popular</div>
            <div className="pricing__card-tag">Launch Package</div>
            <div className="pricing__price">
              <span className="pricing__from">From</span>
              <span className="pricing__amount">&euro;999</span>
            </div>
            <div className="pricing__tag-line">Best for 30–80 cars</div>
            <ul className="pricing__features">
              <li>Premium dealer website</li>
              <li>AI listings (reg + photos)</li>
              <li>Lead Unlock (name + phone)</li>
              <li>Buyer intent signals</li>
            </ul>
            <button className="btn btn-primary pricing__cta" onClick={onBookDemo}>
              Book a 10-min Demo
            </button>
          </div>

          {/* Dealer Scale Setup — secondary */}
          <div
            className={`card pricing__card ${visible ? 'pricing__card--visible' : ''}`}
            style={{ transitionDelay: '0.3s' }}
          >
            <div className="pricing__card-tag">Dealer Scale Setup</div>
            <div className="pricing__price">
              <span className="pricing__from">From</span>
              <span className="pricing__amount">&euro;999</span>
              <span className="pricing__tailored">(tailored)</span>
            </div>
            <div className="pricing__tag-line">Best for 80–200 cars</div>
            <ul className="pricing__features">
              <li>Everything in Launch</li>
              <li>Multi-platform publishing</li>
              <li>Advanced lead intelligence</li>
              <li>Priority onboarding + support</li>
            </ul>
            <button className="btn btn-primary pricing__cta" onClick={onBookDemo}>
              Book a 10-min Demo
            </button>
          </div>
        </div>

        <p className="pricing__note">
          Final pricing depends on stock volume and dealership requirements.
        </p>
      </div>
    </section>
  );
}
