import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import StickyBar from './StickyBar';
import { useRevealOnScroll } from '../lib/useRevealOnScroll';
import './ContactPage.css';

const EMAIL = 'info@agnt.ie';
const PHONE_HREF = 'tel:+353830828731';
const PHONE_LABEL = '+353 83 082 8731';

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 5c0-.6.4-1 1-1h2.3c.5 0 .9.3 1 .8l.8 3c.1.4 0 .8-.3 1L8.3 10a12 12 0 0 0 5.7 5.7l1.2-1.5c.3-.3.6-.4 1-.3l3 .8c.5.1.8.5.8 1V18c0 .6-.4 1-1 1A15 15 0 0 1 4 5z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function ContactPage({ onBookDemo }) {
  useRevealOnScroll();

  return (
    <>
      <Navbar onBookDemo={onBookDemo} />

      <main>
        <section className="contact" id="contact-top" aria-labelledby="contact-heading">
          <div className="contact__panel">
            {/* Flowing warm gradient, built from layered blurred sheets rather
                than a bitmap so it stays sharp at any viewport and costs nothing
                to download. */}
            <span className="contact__canvas" aria-hidden="true">
              <i className="contact__ribbon contact__ribbon--sweep" />
              <i className="contact__ribbon contact__ribbon--loop" />
              <i className="contact__ribbon contact__ribbon--core" />
              <i className="contact__ribbon contact__ribbon--fold" />
            </span>

            <div className="container contact__inner reveal-sm">
            <p className="section-label contact__eyebrow">Contact</p>
            <h1 id="contact-heading" className="contact__title">
              Talk to <span className="text-gradient">us</span>
            </h1>
            <p className="contact__lead">
              Questions on a build, pricing, or getting your forecourt live? Email or call and we
              come straight back.
            </p>

            <div className="contact__methods">
              <a className="contact__card" href={`mailto:${EMAIL}`}>
                <span className="contact__card-icon"><MailIcon /></span>
                <span className="contact__card-text">
                  <span className="contact__card-label">Email</span>
                  <span className="contact__card-value">{EMAIL}</span>
                </span>
                <span className="contact__card-arrow"><ArrowIcon /></span>
              </a>
              <a className="contact__card" href={PHONE_HREF}>
                <span className="contact__card-icon"><PhoneIcon /></span>
                <span className="contact__card-text">
                  <span className="contact__card-label">Phone</span>
                  <span className="contact__card-value">{PHONE_LABEL}</span>
                </span>
                <span className="contact__card-arrow"><ArrowIcon /></span>
              </a>
            </div>

            <div className="contact__cta-cluster">
              <Link to="/spec" className="contact__cta contact__cta--primary">
                Spec out your system
              </Link>
              {typeof onBookDemo === 'function' ? (
                <button type="button" className="contact__cta contact__cta--ghost" onClick={onBookDemo}>
                  Book a 10-minute demo
                </button>
              ) : null}
            </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onBookDemo={onBookDemo} />
      <StickyBar />
    </>
  );
}
