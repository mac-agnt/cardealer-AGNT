import { Link } from 'react-router-dom';
import './Hero.css';

const HERO_PHONE_PREVIEW = '/Screenshot%202026-04-13%20at%2001.29.49.png';

function HeroPhoneShell() {
  return (
    <div className="hero-phone">
      <div className="hero-phone__frame">
        <div className="hero-phone__screen">
          <div className="hero-phone__display">
            <img
              src={HERO_PHONE_PREVIEW}
              alt="Premium dealer website on mobile: stock, search, and showroom presentation"
              className="hero-phone__img"
              loading="eager"
              decoding="async"
            />
            <div className="hero-phone__island" aria-hidden="true" />
            <div className="hero-phone__home-indicator" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroDeskBrowser() {
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
        <img
          src="/car dealer dashbaord template.png"
          alt="AGNT in the browser: dealership workspace"
          className="hero-desk__img"
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  );
}

export default function Hero({ onBookDemo }) {
  return (
    <section className="hero section--airy" id="hero">
      <div className="hero__ambient" aria-hidden="true" />
      <div className="container container--wide hero__container">
        <div className="hero__grid">
          <div className="hero__copy">
            <p className="hero__eyebrow reveal">Independent dealers · Ireland</p>
            <h1 className="hero__headline reveal">
              <span className="hero__headline-line">Franchise-grade dealer control.</span>
              <span className="hero__headline-line">
                <span className="hero__display-accent">Built for independent dealers.</span>
              </span>
            </h1>
            <p className="hero__lead reveal-sm">
              A premium public website plus a serious dealer workspace: stock, listings, leads, appointments, WhatsApp AI,
              CRM, digitised documents, and admin automation. Independents get the discipline larger groups expect.
            </p>
            <div className="hero__cta-cluster reveal-sm" data-stagger>
              <Link to="/spec" className="btn btn-primary btn-micro hero__cta hero__cta--primary">
                Spec out your system
              </Link>
              <button type="button" className="btn btn-secondary btn-micro hero__cta hero__cta--secondary" onClick={onBookDemo}>
                Book a demo
              </button>
            </div>
            <div className="hero__trust reveal-sm" role="group" aria-label="At a glance">
              <span className="hero__trust-chip">Live in 3–5 days</span>
              <span className="hero__trust-chip">No lock-in</span>
              <span className="hero__trust-chip">7-day support</span>
            </div>
            <p className="hero__hint reveal-sm">
              In flight: richer customer profiles, deeper admin automation, and sharper reporting.
            </p>
          </div>

          <div className="hero__stage reveal-sm" aria-label="Product preview">
            <div className="hero__stage-inner">
              <div className="hero__composition">
                <div className="hero__desk-wrap">
                  <HeroDeskBrowser />
                </div>
                <div className="hero__phone-wrap">
                  <HeroPhoneShell />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
