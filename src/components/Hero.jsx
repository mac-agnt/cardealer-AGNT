import { Link } from 'react-router-dom';
import HeroDashboardMock from './HeroDashboardMock';
import './Hero.css';

function HeroBrowser() {
  return (
    <div className="hero-desk hero-desk--browser">
      <div className="hero-desk__chrome" aria-hidden="true">
        <div className="hero-desk__traffic">
          <span />
          <span />
          <span />
        </div>
        <div className="hero-desk__url-center">
          <div className="hero-desk__url-pill">
            <span className="hero-desk__url-shield" />
            <span className="hero-desk__url-text">app.agnt.ie</span>
          </div>
        </div>
        <button type="button" className="hero-desk__plus" tabIndex={-1} aria-hidden="true">
          <span className="hero-desk__plus-icon" />
        </button>
        <div className="hero-desk__chrome-end">
          <span className="hero-desk__chrome-icon hero-desk__chrome-icon--tabs" />
          <span className="hero-desk__chrome-icon hero-desk__chrome-icon--menu" />
        </div>
      </div>
      <div className="hero-desk__viewport">
        <HeroDashboardMock />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero section--airy" id="hero">
      <div className="hero__ambient" aria-hidden="true" />
      <div className="container container--wide hero__container">
        <div className="hero__copy">
          <h1 className="hero__headline reveal">
            <span className="hero__headline-line">Franchise-level dealer tools.</span>
            <span className="hero__headline-line">
              <span className="hero__display-accent" data-ghost="Built for independent dealers">
                Built for independent dealers
              </span>
              .
            </span>
          </h1>
          <p className="hero__lead reveal-sm">
            A complete dealer management system in one workspace, the setup franchise groups pay
            six figures for, priced for independents.
          </p>
          <p className="hero__trust reveal-sm">
            <span className="hero__trust-star" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 6 20.4l1.4-6.8L2.2 9l6.9-.8z" />
              </svg>
            </span>
            Trusted by independent dealers across Ireland and the UK
          </p>
          <div className="hero__cta-cluster reveal-sm">
            <Link to="/spec" className="hero__cta">
              <span>Get started</span>
              <span className="hero__cta-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        <div className="hero__stage reveal-sm" aria-label="AGNT dealer workspace preview">
          <HeroBrowser />
        </div>
      </div>
    </section>
  );
}
