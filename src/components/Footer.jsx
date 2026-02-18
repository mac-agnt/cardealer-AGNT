import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="bronze-divider" />
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src="/agnt-logo.png" alt="AGNT" width="28" height="28" />
          <span>Car Dealer <strong>AGNT</strong></span>
        </div>
        <p className="footer__copy">&copy; {new Date().getFullYear()} Car Dealer AGNT. All rights reserved.</p>
      </div>
    </footer>
  );
}
