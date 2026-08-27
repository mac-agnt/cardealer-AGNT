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
    <section className="hero" id="hero">
      <div className="hero__panel">
        {/* Flickering dot matrix — four interleaved grids, each pulsing on its own clock */}
        <div className="hero__dots" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="hero__glow" aria-hidden="true" />

        <div className="hero__copy">
          <h1 className="hero__headline reveal">
            <span className="hero__headline-line">Franchise-level dealer tools.</span>
            <span className="hero__headline-line">Built for independent dealers</span>
          </h1>
          <p className="hero__lead reveal-sm">
            A complete dealer management system in one workspace, the setup franchise groups pay
            six figures for, priced for independents.
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
