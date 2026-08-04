import { Link } from 'react-router-dom';
import './Footer.css';

const CONTACT_PHONE_HREF = 'tel:+353830828731';
const CONTACT_PHONE_LABEL = '+353 83 082 8731';
const CONTACT_EMAIL = 'info@agnt.ie';

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

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export default function Footer({ onBookDemo }) {
  return (
    <footer className="footer" id="contact">
      <div className="footer__inner reveal-sm">
        <div className="footer__grid">
          <div className="footer__col footer__col--brand">
            <div className="footer__brand">
              <img src="/agnt-logo.png" alt="" width="30" height="30" />
              <span>
                Car Dealer <strong>AGNT</strong>
              </span>
            </div>
            <p className="footer__blurb">
              Proudly Irish. The dealer management system for independent forecourts, website,
              stock, leads and WhatsApp in one workspace, priced to move.
            </p>
            <p className="footer__flag">
              <span className="footer__flag-mark" aria-hidden="true">🇮🇪</span>
              Made in Ireland
            </p>
          </div>

          <nav className="footer__col" aria-label="Product">
            <h3 className="footer__heading">Product</h3>
            <div className="footer__links">
              <Link className="footer__link" to="/capabilities/website-conversion">
                Website &amp; conversion
              </Link>
              <Link className="footer__link" to="/capabilities/dealer-operations">
                Dealer operations
              </Link>
              <Link className="footer__link" to="/capabilities/sales-follow-up">
                Sales &amp; follow-up
              </Link>
              <Link className="footer__link" to="/pricing">
                Pricing
              </Link>
            </div>
          </nav>

          <nav className="footer__col" aria-label="Company">
            <h3 className="footer__heading">Company</h3>
            <div className="footer__links">
              <Link className="footer__link" to="/pricing">
                How it works
              </Link>
              <a className="footer__link" href="/#case-study">
                Ashford Motors
              </a>
              <Link className="footer__link" to="/spec">
                Spec out your system
              </Link>
              <button type="button" className="footer__link footer__link--button" onClick={onBookDemo}>
                Book a demo
              </button>
            </div>
          </nav>

          <div className="footer__col footer__col--contact">
            <h3 className="footer__heading">Contact</h3>
            <div className="footer__contact-list">
              <a className="footer__contact" href={`mailto:${CONTACT_EMAIL}`}>
                <span className="footer__contact-icon"><MailIcon /></span>
                {CONTACT_EMAIL}
              </a>
              <a className="footer__contact" href={CONTACT_PHONE_HREF}>
                <span className="footer__contact-icon"><PhoneIcon /></span>
                {CONTACT_PHONE_LABEL}
              </a>
              <p className="footer__contact footer__contact--static">
                <span className="footer__contact-icon"><PinIcon /></span>
                Dublin, Ireland
              </p>
            </div>
          </div>
        </div>

        <div className="footer__bar">
          <p className="footer__copy">
            &copy; {new Date().getFullYear()} Car Dealer AGNT. All rights reserved.
          </p>
          <div className="footer__legal">
            <a className="footer__link footer__link--legal" href="#">
              Privacy Policy
            </a>
            <a className="footer__link footer__link--legal" href="#">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
