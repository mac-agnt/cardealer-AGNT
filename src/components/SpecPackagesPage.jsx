import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import {
  PATHS,
  DEALER_PRO,
  DEALER_PRO_SUMMARY,
  BASE_SITE,
  BASE_SITE_FLAT_BULLETS,
  formatCurrency,
} from '../data/specPackagesData';
import './SpecPackagesPage.css';

function MacFrame({ title, src, alt }) {
  return (
    <div className="pkg-macframe">
      <div className="pkg-macframe__bar">
        <span />
        <span />
        <span />
        <p>{title}</p>
      </div>
      <div className="pkg-macframe__media">
        <img src={src} alt={alt} loading="lazy" />
      </div>
    </div>
  );
}

function PackageSummary({ website, software }) {
  return (
    <div className="pkg-card__summary" aria-label="Package feature summary">
      <div className="pkg-card__summary-group">
        <p className="pkg-card__summary-title">Website</p>
        <ul>
          {website.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="pkg-card__summary-group">
        <p className="pkg-card__summary-title">Built-in tools</p>
        <ul>
          {software.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DetailView({ pkg, onQuestionnaire, onLock }) {
  const isBasePackage = pkg.name === 'Base Site (Brochure Level)';

  return (
    <section className={`pkg-detail card ${isBasePackage ? 'pkg-detail--base' : ''}`}>
      <h2 className="pkg-detail__title">{`What’s included in ${pkg.name}`}</h2>
      <div className="pkg-detail__cols">
        <article className="pkg-detail__panel">
          <h3>Website</h3>
          <ul>
            {pkg.websiteFeatures.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <MacFrame title="Website" src={pkg.websiteImage} alt={`${pkg.name} website preview`} />
        </article>
        <article className="pkg-detail__panel">
          <h3>Built-in tools</h3>
          <ul>
            {pkg.osFeatures.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <MacFrame title="Workspace" src={pkg.osImage} alt={`${pkg.name} workspace preview`} />
        </article>
      </div>
      <div className="pkg-detail__actions">
        <button type="button" className="pkg-btn-outline" onClick={onQuestionnaire}>
          Prefer a matched package?
        </button>
        <button type="button" className="btn btn-primary" onClick={onLock}>
          Lock in this setup
        </button>
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
        "I'm interested in the Dealer Pro package.",
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
    isDealerPro ? 'Dealer Pro package enquiry' : 'Base Site package enquiry'
  )}&body=${encodeURIComponent(contactBody)}`;

  const whatsappHref = `https://wa.me/353830828731?text=${encodeURIComponent(contactBody)}`;

  return (
    <div className="pkg-modal__overlay" onClick={onClose} role="presentation">
      <div className="pkg-modal card" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
        <h2>Contact AGNT</h2>
        <p className="pkg-modal__total">{`Total: ${formatCurrency(total)}`}</p>
        <p>Send us your setup and we’ll talk it through.</p>
        <div className="pkg-modal__actions">
          <a href={emailHref} className="btn btn-primary">
            Email us
          </a>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="pkg-btn-outline">
            WhatsApp us
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SpecPackagesPage({ onBookDemo }) {
  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  const summaryTotal = selectedPath === PATHS.pro ? DEALER_PRO.price : BASE_SITE.price;

  return (
    <div className="pkg-review-page">
      <Navbar onBookDemo={onBookDemo} />

      <main className="pkg-review-main section">
        <div className="container pkg-review-main__inner">
          <header className="pkg-review-hero">
            <p className="pkg-review-hero__eyebrow">Website-led options</p>
            <h1 className="pkg-review-hero__title">Review all recommended packages</h1>
            <p className="pkg-review-hero__lead">
              Compare Dealer Pro and Base Site side by side. For a matched Core, Growth, or Performance setup with no
              manual feature picking, use the questionnaire first.
            </p>
            <div className="pkg-review-hero__cta-row">
              <Link to="/build" className="btn btn-primary pkg-review-hero__primary">
                Start questionnaire
              </Link>
              <Link to="/spec" className="pkg-review-hero__link">
                Back to package matching
              </Link>
            </div>
          </header>

          <div className="pkg-grid">
            <article className="pkg-card pkg-card--featured">
              <div className="pkg-card__header">
                <span className="pkg-card__badge">Most chosen</span>
                <h2 className="pkg-card__name">Dealer Pro</h2>
                <div className="pkg-card__pricing">
                  <span className="pkg-card__price">{formatCurrency(DEALER_PRO.price)}</span>
                  <span className="pkg-card__price-was" aria-label={`Previously ${formatCurrency(DEALER_PRO.previousPrice)}`}>
                    {formatCurrency(DEALER_PRO.previousPrice)}
                  </span>
                </div>
                <p className="pkg-card__subtitle">{DEALER_PRO.subtitle}</p>
              </div>
              <div className="pkg-card__visual">
                <img src="/car dealer website template.png" alt="Dealer Pro website preview" loading="lazy" />
              </div>
              <PackageSummary website={DEALER_PRO_SUMMARY.website} software={DEALER_PRO_SUMMARY.software} />
              <button type="button" className="btn btn-primary pkg-card__action" onClick={() => setSelectedPath(PATHS.pro)}>
                View what’s included
              </button>
            </article>

            <article className="pkg-card pkg-card--base">
              <div className="pkg-card__header">
                <h2 className="pkg-card__name">Base Site</h2>
                <p className="pkg-card__tier">Brochure level</p>
                <div className="pkg-card__pricing">
                  <span className="pkg-card__price">{`From ${formatCurrency(BASE_SITE.price)}`}</span>
                </div>
                <p className="pkg-card__subtitle">{BASE_SITE.subtitle}</p>
              </div>
              <div className="pkg-card__visual">
                <img
                  src="/6bf5949e-e739-4a94-b0d4-8d4da72fe715.png"
                  alt="Base Site brochure preview"
                  loading="lazy"
                />
              </div>
              <ul className="pkg-card__bullets" aria-label="Base Site included features">
                {BASE_SITE_FLAT_BULLETS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <button type="button" className="pkg-btn-outline pkg-card__action" onClick={() => setSelectedPath(PATHS.base)}>
                View what’s included
              </button>
            </article>
          </div>

          {selectedPath === PATHS.pro ? (
            <DetailView pkg={DEALER_PRO} onQuestionnaire={() => navigate('/build')} onLock={() => setShowModal(true)} />
          ) : null}

          {selectedPath === PATHS.base ? (
            <DetailView pkg={BASE_SITE} onQuestionnaire={() => navigate('/build')} onLock={() => setShowModal(true)} />
          ) : null}
        </div>
      </main>

      <RequestModal open={showModal} onClose={() => setShowModal(false)} total={summaryTotal} packageType={selectedPath} />

      <Footer onBookDemo={onBookDemo} />
    </div>
  );
}
