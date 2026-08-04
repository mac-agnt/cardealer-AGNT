import { Link } from 'react-router-dom';
import './AshfordCaseStudy.css';

const ASHFORD_URL = 'https://www.ashfordapproved.ie';
const LINKEDIN_EMBED =
  'https://www.linkedin.com/embed/feed/update/urn:li:share:7470417093172178945?collapsed=1';

export default function AshfordCaseStudy({ onBookDemo }) {
  return (
    <section className="ashford section--airy" id="case-study" aria-labelledby="ashford-heading">
      <div className="container">
        <div className="ashford__panel reveal-sm">
        <div className="ashford__copy">
          <p className="section-label ashford__eyebrow">In the field</p>
          <h2 id="ashford-heading" className="ashford__title">
            Ashford runs on <span className="ashford__mark">AGNT</span>
          </h2>
          <p className="ashford__lead">
            Nadia and the team at Ashford Motors sell every day on an AGNT setup, the same website,
            stock and lead workspace we build for every dealer. Their forecourt, live and in public.
          </p>

          <ul className="ashford__proof">
            {[
              'Public retail website, live now',
              'Stock, leads and WhatsApp in one workspace',
              'The same build every AGNT dealer gets',
            ].map((point) => (
              <li key={point} className="ashford__proof-item">
                <span className="ashford__proof-tick" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                {point}
              </li>
            ))}
          </ul>

          <a
            className="ashford__site"
            href={ASHFORD_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="ashford__site-glyph" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3z" />
              </svg>
            </span>
            <span className="ashford__site-text">
              <span className="ashford__site-label">See the live site</span>
              <span className="ashford__site-url">ashfordapproved.ie</span>
            </span>
            <span className="ashford__site-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </span>
          </a>

          <div className="ashford__cta-cluster">
            <Link to="/spec" className="ashford__cta ashford__cta--primary">
              Spec out your system
            </Link>
            {typeof onBookDemo === 'function' ? (
              <button type="button" className="ashford__cta ashford__cta--ghost" onClick={onBookDemo}>
                Book a 10-minute demo
              </button>
            ) : null}
          </div>
        </div>

        <div className="ashford__embed" aria-label="Ashford Motors on LinkedIn">
          <div className="ashford__browser">
            <div className="ashford__browser-bar" aria-hidden="true">
              <div className="ashford__browser-dots">
                <span />
                <span />
                <span />
              </div>
              <div className="ashford__browser-url">
                <span className="ashford__browser-lock" />
                linkedin.com
              </div>
              <div className="ashford__browser-menu">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="ashford__browser-view">
              <iframe
                className="ashford__embed-frame"
                src={LINKEDIN_EMBED}
                title="Ashford Motors on LinkedIn"
                loading="lazy"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
