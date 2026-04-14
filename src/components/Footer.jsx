import './Footer.css';

const CONTACT_PHONE = 'tel:+353830828731';
const CONTACT_EMAIL = 'mailto:info@agnt.ie';

export default function Footer({ onBookDemo }) {
  return (
    <footer className="footer" id="contact">
      <div className="container footer__inner reveal-sm">
        <div className="footer__col footer__col--brand">
          <div className="footer__brand">
            <img src="/agnt-logo.png" alt="" width="28" height="28" />
            <span>
              Car Dealer <strong>AGNT</strong>
            </span>
          </div>
          <p className="footer__meta">Ireland</p>
          <p className="footer__copy">&copy; {new Date().getFullYear()} Car Dealer AGNT. All rights reserved.</p>
        </div>

        <div className="footer__col">
          <h3 className="footer__heading">Explore</h3>
          <div className="footer__links">
            <a className="link-micro" href="#capabilities">
              Capabilities
            </a>
            <a className="link-micro" href="#inside">
              Inside AGNT
            </a>
            <a className="link-micro" href="#how-it-works">
              How it works
            </a>
            <a className="link-micro" href="#pricing">
              Pricing
            </a>
            <a className="link-micro" href="/spec">
              Spec
            </a>
          </div>
        </div>

        <div className="footer__col footer__col--contact">
          <h3 className="footer__heading">Contact</h3>
          <div className="footer__links">
            <a className="link-micro" href={CONTACT_PHONE}>
              +353 830828731
            </a>
            <a className="link-micro" href={CONTACT_EMAIL}>
              info@agnt.ie
            </a>
          </div>

          <h3 className="footer__heading footer__heading--legal">Legal</h3>
          <div className="footer__links">
            <a className="link-micro" href="#">
              Privacy Policy
            </a>
            <a className="link-micro" href="#">
              GDPR / Data Protection
            </a>
            <a className="link-micro" href="#">
              Terms
            </a>
          </div>

          <button className="btn btn-secondary btn-micro footer__cta" onClick={onBookDemo} type="button">
            Book a 10-minute demo
          </button>
        </div>
      </div>
    </footer>
  );
}
