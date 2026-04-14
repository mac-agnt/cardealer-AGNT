import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Pricing.css';

const PRICING_TIERS = [
  {
    key: 'core',
    label: 'Core package',
    audience:
      'Built for independent dealers who want a premium public site and a single workspace for stock, leads, WhatsApp, CRM, and admin.',
    pricePrefix: 'From',
    priceValue: '€999',
    priceSuffix: 'Typical range €999–€2,499 depending on spec',
    features: [
      'Premium branded dealer website (responsive, conversion-led)',
      'Stock search, vehicle pages, finance, trade-in, and enquiry flows (as specified)',
      'Dashboard, vehicle management, and listing / inventory health',
      'Lead and appointment handling across website and marketplaces',
      'WhatsApp AI sales agent or WhatsApp handling layer (package-dependent)',
      'Customer profiles / CRM foundations',
      'Social Studio and branding tools, including logo and watermark where specified',
      'Import price calculator where specified',
      'Digitised dealer documents and admin workflow setup (scope on spec)',
      'Onboarding and launch support, usually 5–7 days',
    ],
    highlight: true,
  },
];

const OPTIONAL_ADDONS = [
  'Online reservations / deposit flow',
  'Deeper finance and trade-in capture',
  'Expanded WhatsApp AI and automation',
  'Richer document packs and workflow automation',
  'Extended custom branding and launch support',
];

function usePricingReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return reducedMotion || !('IntersectionObserver' in window);
  });

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const el = ref.current;
    if (!el || visible) return undefined;

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
  }, [threshold, visible]);

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

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', handleChange);
      return () => media.removeEventListener('change', handleChange);
    }

    media.addListener(handleChange);
    return () => media.removeListener(handleChange);
  }, []);

  return (
    <section className="pricing section pricing--architecture" id="pricing" ref={ref}>
      <div className="container">
        <div className="pricing__shell">
        <div className={`pricing__header reveal ${visible ? 'pricing__header--visible' : ''}`}>
          <p className="section-label">Pricing</p>
          <h2 className="pricing__headline">
            One <span className="text-gradient">core package.</span> Spec-based additions.
          </h2>
          <p className="pricing__sub">
            We scope around your yard: same foundation, optional depth on WhatsApp AI, documents, automation, and
            branding where they earn their keep.
          </p>
          <p className="pricing__micro">From €999. We confirm scope on a short call.</p>
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

                <p className="pricing__includes">Typically includes:</p>
                <ul className="pricing__features" id={`pricing-features-${tier.key}`} data-stagger>
                  {visibleFeatures.map((feature) => (
                    <li key={`${tier.key}-${feature}`}>{feature}</li>
                  ))}
                </ul>

                <p className="pricing__optional-label">Optional additions (examples)</p>
                <ul className="pricing__optional">
                  {OPTIONAL_ADDONS.map((item) => (
                    <li key={item}>{item}</li>
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
                    {isExpanded ? 'Show fewer details' : 'See full list'}
                  </button>
                ) : null}

                <div className="pricing__actions">
                  <Link to="/spec" className="btn btn-primary btn-micro pricing__cta">
                    Spec out your system
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
          <span aria-hidden="true">·</span>
          <p>Live in 5–7 days</p>
          <span aria-hidden="true">·</span>
          <p>Built for independent dealers in Ireland</p>
        </div>
        </div>
      </div>
    </section>
  );
}
