import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import './SpecPage.css';

const PATHS = {
  pro: 'pro',
  base: 'base',
};

const DEALER_PRO = {
  name: 'Dealer Pro System',
  price: 2800,
  previousPrice: 3200,
  subtitle: 'Complete custom system for active dealerships.',
  websiteFeatures: [
    'Premium website architecture',
    'Unified lead capture points',
    'Finance-first listing framing',
    'Conversion-focused vehicle pages',
    'Stock publishing controls',
  ],
  osFeatures: [
    'Dealer Operating System workspace',
    'Unified inbox and routing',
    'Lead priority queue',
    'Stock movement controls',
    'Performance dashboard views',
  ],
  websiteImage: '/car dealer website template.png',
  osImage: '/car dealer dashbaord template.png',
};

const DEALER_PRO_SUMMARY = {
  website: [
    'Premium dealer website',
    'Mobile-first stock pages',
    'Finance calculator',
    'Trade-in / valuation funnel',
    'Reserve / deposit option',
  ],
  software: [
    'Reg + photos → instant listing drafts',
    'Publish to Carzone, DoneDeal and Cars.ie',
    'Unified inbox for enquiries',
    'Buyer intent signals (Hot/Warm)',
    'Dealer analytics and lead tracking',
  ],
};

const BASE_SITE = {
  name: 'Base Site (Brochure Level)',
  price: 999,
  subtitle: 'Basic online presence. No automation layer.',
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
  websiteImage: '/6bf5949e-e739-4a94-b0d4-8d4da72fe715.png',
  osImage: '/car dealer dashbaord template.png',
};

const BASE_SITE_FLAT_BULLETS = [
  'Brochure website shell',
  'Manual vehicle listings',
  'Basic search and filters',
  'Standard enquiry forms',
  'Basic admin access',
  'Manual listing workflow',
];

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
      <div className="spec-macframe__media">
        <img src={src} alt={alt} loading="lazy" />
      </div>
    </div>
  );
}

function PackageSummary({ website, software }) {
  return (
    <div className="spec-choice__summary" aria-label="Package feature summary">
      <div className="spec-choice__summary-group">
        <p className="spec-choice__summary-title">Website features</p>
        <ul>
          {website.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
      <div className="spec-choice__summary-group">
        <p className="spec-choice__summary-title">Dealer Operating System features</p>
        <ul>
          {software.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
}

function DetailView({ pkg, onModify, onLock }) {
  const isBasePackage = pkg.name === 'Base Site (Brochure Level)';

  return (
    <section className={`spec-detail card ${isBasePackage ? 'spec-detail--base' : ''}`}>
      <h2>{`What’s included in ${pkg.name}`}</h2>
      <div className="spec-detail__cols">
        <article className="spec-detail__panel">
          <h3>Website Features</h3>
          <ul>
            {pkg.websiteFeatures.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <MacFrame
            title="Website"
            src={pkg.websiteImage}
            alt={`${pkg.name} website preview`}
          />
        </article>
        <article className="spec-detail__panel">
          <h3>Dealer Operating System Features</h3>
          <ul>
            {pkg.osFeatures.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <MacFrame
            title="Dealer Operating System"
            src={pkg.osImage}
            alt={`${pkg.name} operating system preview`}
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

function RequestModal({ open, onClose, total, packageType }) {
  if (!open) return null;

  const isDealerPro = packageType === PATHS.pro;
  const contactBody = isDealerPro
    ? [
      'Hi AGNT,',
      '',
      "I'm interested in the Dealer Pro System.",
      '',
      'Dealership name:',
      'Location:',
      'Approx stock size:',
      '',
      'Could we discuss setup and next steps?',
    ].join('\n')
    : [
      'Hi AGNT,',
      '',
      "I'm interested in the Base Site package for my dealership.",
      '',
      'Dealership name:',
      'Location:',
      'Approx stock size:',
      '',
      'Could we discuss setup?',
    ].join('\n');

  const emailHref = `mailto:info@agnt.ie?subject=${encodeURIComponent(
    isDealerPro ? 'Dealer Pro System enquiry' : 'Base Site package enquiry'
  )}&body=${encodeURIComponent(contactBody)}`;

  const whatsappHref = `https://wa.me/353830828731?text=${encodeURIComponent(contactBody)}`;

  return (
    <div className="spec-modal__overlay" onClick={onClose}>
      <div className="spec-modal card" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
        <h2>Contact AGNT</h2>
        <p>{`Total: ${formatCurrency(total)}`}</p>
        <p>Send us your setup and we’ll talk it through.</p>
        <div className="spec-modal__actions">
          <a href={emailHref} className="btn btn-primary">Email us</a>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="spec-btn-outline">WhatsApp us</a>
        </div>
      </div>
    </div>
  );
}

export default function SpecPage() {
  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

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
                  Build It Step-by-Step
                </button>
                <a href="#packages" className="spec-build-hero__compare">Compare packages</a>
              </div>
            </article>

            <div className="spec-packages-row" id="packages">
              <article className="spec-choice spec-choice--pro spec-choice--compact">
                <p className="spec-choice__badge">Most Chosen</p>
                <h3>Dealer Pro System</h3>
                <div className="spec-price-row">
                  <strong>{formatCurrency(DEALER_PRO.price)}</strong>
                  <span>{formatCurrency(DEALER_PRO.previousPrice)}</span>
                </div>
                <p>{DEALER_PRO.subtitle}</p>
                <div className="spec-choice__thumb">
                  <img src="/car dealer website template.png" alt="Dealer Pro website preview" loading="lazy" />
                </div>
                <PackageSummary website={DEALER_PRO_SUMMARY.website} software={DEALER_PRO_SUMMARY.software} />
                <button type="button" className="btn btn-primary" onClick={() => handleSelectPath(PATHS.pro)}>
                  View what’s included
                </button>
              </article>

              <article className="spec-choice spec-choice--compact spec-choice--base">
                <h3>Base Site (Brochure Level)</h3>
                <strong>{`From ${formatCurrency(BASE_SITE.price)}`}</strong>
                <div className="spec-choice__thumb">
                  <img
                    src="/6bf5949e-e739-4a94-b0d4-8d4da72fe715.png"
                    alt="Ocean Auto Club brochure site preview"
                    loading="lazy"
                  />
                </div>
                <ul className="spec-choice__flat-list" aria-label="Base Site included features">
                  {BASE_SITE_FLAT_BULLETS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
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

      <RequestModal open={showModal} onClose={() => setShowModal(false)} total={summaryTotal} packageType={selectedPath} />

      <Footer />
    </div>
  );
}
