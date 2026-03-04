import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Pricing.css';

const PRICING_TIERS = [
  {
    key: 'core',
    label: 'Core',
    audience: 'For most independent dealers. Fast launch, full operating stack.',
    pricePrefix: 'From',
    priceValue: '€999',
    priceSuffix: 'Typical range €999–€2,499',
    features: [
      'Premium dealer website (mobile-first)',
      'Stock search + VDP enquiry flow',
      'Tap-to-call sticky bar',
      'Dealer OS: reg + photos → instant drafts',
      'Publish everywhere (Website + Carzone + DoneDeal + Cars.ie)',
      'Unified inbox + Intent signals (Hot/Warm)',
      'Onboarding + launch support (5–7 days)',
    ],
    highlight: true,
  },
];

function usePricingReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = ref.current;

    if (!el) return undefined;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

export default function Pricing({ onBookDemo }) {
  const [ref, visible] = usePricingReveal(0.12);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false
  );
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const media = window.matchMedia('(max-width: 767px)');
    const handleChange = (event) => setIsMobile(event.matches);
    setIsMobile(media.matches);

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', handleChange);
      return () => media.removeEventListener('change', handleChange);
    }

    media.addListener(handleChange);
    return () => media.removeListener(handleChange);
  }, []);

  return (
    <section className="pricing section" id="pricing" ref={ref}>
      <div className="container">
        <div className={`pricing__header reveal ${visible ? 'pricing__header--visible' : ''}`}>
          <span className="section-label">Pricing</span>
          <h2>Pricing</h2>
          <p className="pricing__sub">
            One package. Built around your dealership.
          </p>
          <p className="pricing__micro">
            From €999.
          </p>
        </div>

        <div className={`pricing__grid ${visible ? 'pricing__grid--visible' : ''} ${PRICING_TIERS.length === 1 ? 'pricing__grid--single' : ''}`}>
          {PRICING_TIERS.map((tier, index) => {
            const isExpanded = !!expanded[tier.key];
            const visibleFeatures = isMobile && !isExpanded ? tier.features.slice(0, 6) : tier.features;

            return (
              <article
                key={tier.key}
                className={`pricing__card ${tier.highlight ? 'pricing__card--highlight' : ''}`}
                style={{ transitionDelay: `${120 + index * 100}ms` }}
              >
                <div className="pricing__card-head">
                  <p className="pricing__card-tag">{tier.label}</p>
                  <p className="pricing__audience">{tier.audience}</p>
                </div>

                <div className="pricing__price" aria-label={`${tier.label} pricing`}>
                  {tier.pricePrefix ? <span className="pricing__from">{tier.pricePrefix}</span> : null}
                  <span className="pricing__amount">{tier.priceValue}</span>
                </div>
                <p className="pricing__suffix">{tier.priceSuffix}</p>

                <ul className="pricing__features" id={`pricing-features-${tier.key}`} data-stagger>
                  {visibleFeatures.map((feature) => (
                    <li key={`${tier.key}-${feature}`}>{feature}</li>
                  ))}
                </ul>

                {isMobile && tier.features.length > 6 ? (
                  <button
                    type="button"
                    className="pricing__toggle"
                    onClick={() => setExpanded((prev) => ({ ...prev, [tier.key]: !prev[tier.key] }))}
                    aria-expanded={isExpanded}
                    aria-controls={`pricing-features-${tier.key}`}
                  >
                    {isExpanded ? 'Show fewer features' : 'See all features'}
                  </button>
                ) : null}

                <div className="pricing__actions">
                  <Link to="/spec" className="btn btn-primary btn-micro pricing__cta">
                    Spec out your website
                  </Link>
                  <button className="btn btn-secondary btn-micro pricing__demo-link" onClick={onBookDemo} type="button">
                    Book a 10-minute demo
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className={`pricing__meta ${visible ? 'pricing__meta--visible' : ''}`}>
          <p>No contracts</p>
          <span aria-hidden="true">•</span>
          <p>Live in 5–7 days</p>
          <span aria-hidden="true">•</span>
          <p>Built for independent dealers</p>
        </div>
      </div>
    </section>
  );
}
