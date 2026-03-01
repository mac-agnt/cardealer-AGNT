import { useReveal } from '../hooks/useReveal';
import { Link } from 'react-router-dom';
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
          <h2>One package. Built around your dealership.</h2>
          <p className="pricing__sub">
            Premium website and dealer OS, tailored through a simple spec flow.
          </p>
        </div>

        <div
          className={`card pricing__card pricing__card--single ${visible ? 'pricing__card--visible' : ''}`}
          style={{ transitionDelay: '0.15s' }}
        >
          <div className="pricing__card-tag">Website + Dealer OS</div>
          <div className="pricing__price">
            <span className="pricing__from">From</span>
            <span className="pricing__amount">$999</span>
          </div>

          <ul className="pricing__features">
            <li>Premium dealer website</li>
            <li>Fast stock search (mobile-first)</li>
            <li>Reg + photos &rarr; instant listing drafts</li>
            <li>Lead capture with buyer contact details</li>
            <li>Edit once, publish everywhere</li>
            <li>Unified inbox for enquiries</li>
            <li>Built for independent dealerships</li>
          </ul>

          <div className="pricing__actions">
            <Link to="/spec" className="btn btn-primary pricing__cta">
              Spec out your website
            </Link>
            <button className="pricing__demo-link" onClick={onBookDemo} type="button">
              Request a 10-minute demo
            </button>
          </div>
        </div>

        <p className="pricing__note">
          Final pricing depends on stock volume and selected options.
        </p>
      </div>
    </section>
  );
}
