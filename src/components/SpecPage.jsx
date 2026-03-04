import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import './SpecPage.css';

const PATHS = {
  pro: 'pro',
  base: 'base',
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
          <button type="button" className="spec-btn-outline" onClick={onBookDemo}>Book a 10-minute demo</button>
        </div>
      </div>
    </div>
  );
}

export default function SpecPage({ onBookDemo }) {
  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSelectPath = (path) => {
    setSelectedPath(path);
  };

  const summaryTotal =
    selectedPath === PATHS.pro ? DEALER_PRO.price
      : BASE_SITE.price;

  return (
    <div className="spec-page">
      <header className="spec-topbar">
        <div className="container spec-topbar__inner">
          <Link to="/" className="spec-topbar__back">← Back to home</Link>
          <button className="spec-topbar__demo" onClick={onBookDemo} type="button">
            Book a 10-minute demo
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
            <article className="spec-choice spec-build-hero">
              <p className="spec-build-hero__pill">Recommended</p>
              <h3>Build It Step-by-Step</h3>
              <p>Customise your system feature by feature.</p>
              <p className="spec-build-hero__support">Choose only what you need, then shape the exact setup for your dealership.</p>
              <ul>
                <li>Choose only what you need</li>
                <li>See price update live</li>
                <li>Guided setup logic</li>
              </ul>
              <div className="spec-build-hero__actions">
                <button type="button" className="btn btn-primary" onClick={() => navigate('/build')}>
                  Start building
                </button>
                <a href="#packages" className="spec-build-hero__compare">Compare packages</a>
              </div>
            </article>

            <div className="spec-packages-row" id="packages">
              <article className="spec-choice spec-choice--pro spec-choice--compact">
                <p className="spec-choice__badge">Most Chosen</p>
                <h3>Dealer Pro System</h3>
                <strong>{formatCurrency(DEALER_PRO.price)}</strong>
                <p>{DEALER_PRO.subtitle}</p>
                <div className="spec-choice__thumb">
                  <img src="/car dealer website template.png" alt="Dealer Pro website preview" loading="lazy" />
                </div>
                <ul>{DEALER_PRO.bullets.map((item) => <li key={item}>{item}</li>)}</ul>
                <button type="button" className="btn btn-primary" onClick={() => handleSelectPath(PATHS.pro)}>
                  View what’s included
                </button>
              </article>

              <article className="spec-choice spec-choice--compact">
                <h3>Base Site (Brochure Level)</h3>
                <strong>{`From ${formatCurrency(BASE_SITE.price)}`}</strong>
                <p>{BASE_SITE.subtitle}</p>
                <div className="spec-choice__thumb">
                  <img
                    src="/6bf5949e-e739-4a94-b0d4-8d4da72fe715.png"
                    alt="Ocean Auto Club brochure site preview"
                    loading="lazy"
                  />
                </div>
                <ul>{BASE_SITE.bullets.map((item) => <li key={item}>{item}</li>)}</ul>
                <button type="button" className="spec-btn-outline" onClick={() => handleSelectPath(PATHS.base)}>
                  View what’s included
                </button>
              </article>
            </div>
          </section>

          {selectedPath === PATHS.pro ? (
            <DetailView pkg={DEALER_PRO} onModify={() => navigate('/build')} onLock={() => setShowModal(true)} />
          ) : null}

          {selectedPath === PATHS.base ? (
            <DetailView pkg={BASE_SITE} onModify={() => navigate('/build')} onLock={() => setShowModal(true)} />
          ) : null}

        </div>
      </main>

      <RequestModal open={showModal} onClose={() => setShowModal(false)} total={summaryTotal} onBookDemo={onBookDemo} />

      <Footer />
    </div>
  );
}
