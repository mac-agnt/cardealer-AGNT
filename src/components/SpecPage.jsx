import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import './SpecPage.css';

const BASE_PRICE = 999;

const PATHS = {
  pro: 'pro',
  base: 'base',
  custom: 'custom',
};

const DEALER_PRO = {
  name: 'Dealer Pro System',
  price: 2600,
  subtitle: 'Complete custom system for active dealerships.',
  bullets: [
    'Premium dealer website',
    'Full Dealer OS',
    'Unified inbox',
    'Multi-platform publishing',
    'Buyer intent signals',
  ],
  websiteFeatures: [
    'Premium website architecture',
    'Unified lead capture points',
    'Finance-first listing framing',
    'Conversion-focused vehicle pages',
    'Stock publishing controls',
  ],
  osFeatures: [
    'Dealer OS workspace',
    'Unified inbox and routing',
    'Lead priority queue',
    'Stock movement controls',
    'Performance dashboard views',
  ],
};

const BASE_SITE = {
  name: 'Base Site (Brochure Level)',
  price: 999,
  subtitle: 'Basic online presence. No automation layer.',
  bullets: [
    'Vehicle listings (manual)',
    'Basic enquiry form',
    'Static finance calculator',
    'Basic admin panel',
    'No unified inbox',
  ],
  websiteFeatures: [
    'Brochure website shell',
    'Manual listings and edits',
    'Basic search and filters',
    'Standard contact pathways',
    'Core pages and business info',
  ],
  osFeatures: [
    'Basic admin access',
    'Manual listing workflow',
    'No automation layer',
    'No lead scoring or routing',
    'No unified communication feed',
  ],
};

const CUSTOM_STEPS = [
  {
    id: 'buyers',
    title: 'Capture Serious Buyers',
    subtitle: 'This directly impacts lead quality.',
    items: [
      { id: 'unified-inbox', name: 'Unified Inbox', price: 150, impact: 'Keeps every enquiry in one operational thread.' },
      { id: 'smart-routing', name: 'Smart Lead Routing', price: 150, impact: 'Routes intent signals to the right person faster.' },
      { id: 'intent-forms', name: 'Intent-Based Forms', price: 120, impact: 'Captures buyer context before the first call.' },
    ],
  },
  {
    id: 'pressure',
    title: 'Create Buying Pressure',
    subtitle: 'Help active buyers make decisions sooner.',
    items: [
      { id: 'demand-signals', name: 'Live Demand Signals', price: 80, impact: 'Shows immediate interest momentum.' },
      { id: 'urgency-badges', name: 'Urgency Badges', price: 60, impact: 'Highlights limited availability moments.' },
      { id: 'timed-offers', name: 'Timed Offers Engine', price: 70, impact: 'Supports controlled time-boxed offers.' },
    ],
  },
  {
    id: 'stock',
    title: 'Move Stock Faster',
    subtitle: 'Improve stock visibility and movement pacing.',
    items: [
      { id: 'featured-slot', name: 'Featured Slot Control', price: 90, impact: 'Push priority vehicles to the front.' },
      { id: 'price-drop', name: 'Price Drop Highlighting', price: 70, impact: 'Makes reductions visible immediately.' },
      { id: 'multi-platform', name: 'Multi-Platform Publishing', price: 300, impact: 'Publishes stock across key channels from one place.' },
    ],
  },
  {
    id: 'finance',
    title: 'Reduce Finance Drop-Off',
    subtitle: 'Lower finance-related friction points.',
    items: [
      { id: 'monthly-price', name: 'From €X / Month Pricing', price: 90, impact: 'Frames affordability earlier in the journey.' },
      { id: 'reservation', name: 'Instant Reservation (€500 refundable)', price: 100, impact: 'Converts intent into committed action.' },
      { id: 'finance-followup', name: 'Finance Auto Follow-Up', price: 80, impact: 'Prevents warm finance leads from going cold.' },
    ],
  },
  {
    id: 'trade',
    title: 'Set Trade Expectations',
    subtitle: 'Create cleaner trade-in conversations.',
    items: [
      { id: 'trade-estimate', name: 'Instant Trade-In Estimate', price: 100, impact: 'Sets expectations before manual review.' },
      { id: 'condition-slider', name: 'Condition Slider Valuation', price: 80, impact: 'Collects better trade condition context.' },
    ],
  },
  {
    id: 'trust',
    title: 'Build Buyer Trust',
    subtitle: 'Increase confidence before first contact.',
    items: [
      { id: 'walkarounds', name: 'Hosted Walkaround Videos', price: 60, impact: 'Adds rich context for remote buyers.' },
      { id: 'reviews', name: 'Review Injection', price: 50, impact: 'Reinforces trust with visible social proof.' },
    ],
  },
  {
    id: 'conversation',
    title: 'Capture Every Conversation',
    subtitle: 'Avoid gaps in communication coverage.',
    items: [
      { id: 'after-hours', name: 'After-Hours Lead Capture', price: 40, impact: 'Prevents overnight enquiry loss.' },
      { id: 'whatsapp-track', name: 'Click-to-WhatsApp Tracking', price: 31, impact: 'Tracks direct chat engagement by stock.' },
    ],
  },
  {
    id: 'machine',
    title: 'Run a Sales Machine',
    subtitle: 'Keep teams focused on the right leads.',
    items: [
      { id: 'dashboard', name: 'Dealer Performance Dashboard', price: 60, impact: 'Shows what is moving and what is stuck.' },
      { id: 'lead-priority', name: 'Lead Priority Queue', price: 40, impact: 'Ensures highest-value leads are actioned first.' },
    ],
  },
];

const ALL_CUSTOM_OPTIONS = CUSTOM_STEPS.flatMap((step) => step.items);
const DEFAULT_TOGGLES = ALL_CUSTOM_OPTIONS.reduce((acc, option) => ({ ...acc, [option.id]: true }), {});

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);

function MacFrame({ title, src, alt }) {
  return (
    <div className="spec-macframe">
      <div className="spec-macframe__bar">
        <span />
        <span />
        <span />
        <p>{title}</p>
      </div>
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
}

function DetailView({ pkg, onModify, onLock }) {
  return (
    <section className="spec-detail card">
      <h2>{`What’s included in ${pkg.name}`}</h2>
      <div className="spec-detail__cols">
        <article>
          <h3>Website Features</h3>
          <ul>
            {pkg.websiteFeatures.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <MacFrame
            title="Website"
            src="/car dealer website template.png"
            alt="Dealer website template preview"
          />
        </article>
        <article>
          <h3>Dealer OS Features</h3>
          <ul>
            {pkg.osFeatures.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <MacFrame
            title="Dealer OS"
            src="/car dealer dashbaord template.png"
            alt="Dealer dashboard template preview"
          />
        </article>
      </div>
      <div className="spec-detail__actions">
        <button type="button" className="spec-btn-outline" onClick={onModify}>Modify setup</button>
        <button type="button" className="btn btn-primary" onClick={onLock}>Lock in this setup</button>
      </div>
    </section>
  );
}

function ToggleRow({ feature, checked, onChange }) {
  return (
    <div className="spec-toggle-row">
      <div>
        <p className="spec-toggle-row__name">{feature.name}</p>
        <p className="spec-toggle-row__impact">{feature.impact}</p>
      </div>
      <div className="spec-toggle-row__right">
        <span>{formatCurrency(feature.price)}</span>
        <button
          type="button"
          className={`spec-switch ${checked ? 'is-on' : 'is-off'}`}
          onClick={() => onChange(!checked)}
          aria-pressed={checked}
          aria-label={`${feature.name} ${checked ? 'enabled' : 'disabled'}`}
        >
          <span />
        </button>
      </div>
    </div>
  );
}

function RequestModal({ open, onClose, total, onBookDemo }) {
  if (!open) return null;
  return (
    <div className="spec-modal__overlay" onClick={onClose}>
      <div className="spec-modal card" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
        <h2>Lock in this setup</h2>
        <p>{`Total: ${formatCurrency(total)}`}</p>
        <p>We’ll review and confirm everything before build.</p>
        <div className="spec-modal__actions">
          <button type="button" className="btn btn-primary" onClick={onClose}>Submit interest</button>
          <button type="button" className="spec-btn-outline" onClick={onBookDemo}>Request a 10-minute demo</button>
        </div>
      </div>
    </div>
  );
}

export default function SpecPage({ onBookDemo }) {
  const [selectedPath, setSelectedPath] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [toggles, setToggles] = useState(DEFAULT_TOGGLES);

  const currentStep = CUSTOM_STEPS[stepIndex];
  const isLastStep = stepIndex === CUSTOM_STEPS.length - 1;

  const customUpgradesTotal = useMemo(
    () =>
      ALL_CUSTOM_OPTIONS.reduce((sum, option) => sum + (toggles[option.id] ? option.price : 0), 0),
    [toggles],
  );
  const customTotal = BASE_PRICE + customUpgradesTotal;

  const handleSelectPath = (path) => {
    setSelectedPath(path);
    if (path === PATHS.custom) setStepIndex(0);
  };

  const handleToggle = (id, value) => {
    setToggles((prev) => ({ ...prev, [id]: value }));
  };

  const summaryTotal =
    selectedPath === PATHS.pro ? DEALER_PRO.price
      : selectedPath === PATHS.base ? BASE_SITE.price
      : customTotal;

  return (
    <div className="spec-page">
      <header className="spec-topbar">
        <div className="container spec-topbar__inner">
          <Link to="/" className="spec-topbar__back">← Back to home</Link>
          <button className="spec-topbar__demo" onClick={onBookDemo} type="button">
            Request a 10-minute demo
          </button>
        </div>
      </header>

      <main className="section spec-page__body">
        <div className="container">
          <section className="spec-hero">
            <h1>Choose your dealership setup</h1>
            <p>Most dealers pick Dealer Pro. Some start with Base. Advanced teams spec their own.</p>
          </section>

          <section className="spec-decision-grid">
            <article className="spec-choice spec-choice--pro">
              <p className="spec-choice__badge">Most Chosen</p>
              <h3>Dealer Pro System</h3>
              <strong>{formatCurrency(DEALER_PRO.price)}</strong>
              <p>{DEALER_PRO.subtitle}</p>
              <ul>{DEALER_PRO.bullets.map((item) => <li key={item}>{item}</li>)}</ul>
              <div className="spec-choice__frames">
                <MacFrame title="Website" src="/car dealer website template.png" alt="Website template preview" />
                <MacFrame title="Dealer OS" src="/car dealer dashbaord template.png" alt="Dashboard template preview" />
              </div>
              <button type="button" className="btn btn-primary" onClick={() => handleSelectPath(PATHS.pro)}>
                View what’s included
              </button>
            </article>

            <article className="spec-choice">
              <h3>Base Site (Brochure Level)</h3>
              <strong>{`From ${formatCurrency(BASE_SITE.price)}`}</strong>
              <p>{BASE_SITE.subtitle}</p>
              <ul>{BASE_SITE.bullets.map((item) => <li key={item}>{item}</li>)}</ul>
              <button type="button" className="spec-btn-outline" onClick={() => handleSelectPath(PATHS.base)}>
                View what’s included
              </button>
            </article>

            <article className="spec-choice">
              <h3>Build It Step-by-Step</h3>
              <p>Customise your system feature by feature.</p>
              <ul>
                <li>Choose only what you need</li>
                <li>See price update live</li>
                <li>Guided setup logic</li>
              </ul>
              <button type="button" className="spec-btn-outline" onClick={() => handleSelectPath(PATHS.custom)}>
                Start building
              </button>
            </article>
          </section>

          {selectedPath === PATHS.pro ? (
            <DetailView pkg={DEALER_PRO} onModify={() => setSelectedPath(PATHS.custom)} onLock={() => setShowModal(true)} />
          ) : null}

          {selectedPath === PATHS.base ? (
            <DetailView pkg={BASE_SITE} onModify={() => setSelectedPath(PATHS.custom)} onLock={() => setShowModal(true)} />
          ) : null}

          {selectedPath === PATHS.custom ? (
            <section className="spec-custom">
              {!isLastStep ? (
                <article className="spec-custom__step card">
                  <p className="spec-custom__progress">{`${String(stepIndex + 1).padStart(2, '0')} / ${String(CUSTOM_STEPS.length).padStart(2, '0')}`}</p>
                  <h2>{currentStep.title}</h2>
                  <p>{currentStep.subtitle}</p>
                  <div className="spec-custom__rows">
                    {currentStep.items.map((feature) => (
                      <ToggleRow
                        key={feature.id}
                        feature={feature}
                        checked={!!toggles[feature.id]}
                        onChange={(value) => handleToggle(feature.id, value)}
                      />
                    ))}
                  </div>
                  <div className="spec-custom__step-foot">
                    <button
                      type="button"
                      className="spec-custom__continue"
                      onClick={() => setStepIndex((prev) => Math.min(prev + 1, CUSTOM_STEPS.length - 1))}
                    >
                      {`Continue (${String(stepIndex + 2).padStart(2, '0')}/${String(CUSTOM_STEPS.length).padStart(2, '0')})`}
                    </button>
                  </div>
                </article>
              ) : (
                <article className="spec-custom__summary card">
                  <h2>Your Custom Build</h2>
                  <div className="spec-custom__summary-row">
                    <span>Base</span>
                    <strong>{formatCurrency(BASE_PRICE)}</strong>
                  </div>
                  <div className="spec-custom__summary-row">
                    <span>Upgrades</span>
                    <strong>{formatCurrency(customUpgradesTotal)}</strong>
                  </div>
                  <div className="spec-custom__summary-row spec-custom__summary-row--total">
                    <span>Total</span>
                    <strong>{formatCurrency(customTotal)}</strong>
                  </div>
                  <p>We’ll review and confirm everything before build.</p>
                  <div className="spec-custom__summary-actions">
                    <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>
                      Lock in this setup
                    </button>
                    <button type="button" className="spec-btn-outline" onClick={onBookDemo}>
                      Request a 10-minute demo
                    </button>
                  </div>
                </article>
              )}
            </section>
          ) : null}
        </div>
      </main>

      <RequestModal open={showModal} onClose={() => setShowModal(false)} total={summaryTotal} onBookDemo={onBookDemo} />

      <Footer />
    </div>
  );
}
