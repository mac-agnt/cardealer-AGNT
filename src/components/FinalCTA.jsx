import { Link } from 'react-router-dom';
import './FinalCTA.css';

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="final-cta__check-icon">
      <path d="M3.5 8.5 6.5 11.5 12.5 5.5" />
    </svg>
  );
}

export default function FinalCTA({ onBookDemo }) {
  return (
    <section className="final-cta section" id="demo">
      <div className="final-cta__glow" aria-hidden="true" />
      <div className="container final-cta__inner">
        <div className="final-cta__content reveal">
          <h2 className="final-cta__headline">
            Ready when <span className="final-cta__headline-accent">you are</span>
          </h2>
          <p className="final-cta__sub">
            Bring a few regs and a typical enquiry. We’ll show draft listings, lead handling, WhatsApp AI, and how CRM and
            admin sit behind the site.
          </p>
          <ul className="final-cta__outcomes">
            <li>
              <CheckIcon />
              <span>List and fix stock without juggling separate tools</span>
            </li>
            <li>
              <CheckIcon />
              <span>See enquiries, appointments, and handoffs in one workspace</span>
            </li>
            <li>
              <CheckIcon />
              <span>Understand documents, automation, and import support on your terms</span>
            </li>
          </ul>
          <div className="final-cta__buttons">
            <Link to="/spec" className="btn btn-primary final-cta__btn-p">
              Spec out your system
            </Link>
            <button type="button" className="btn btn-secondary final-cta__btn-s" onClick={onBookDemo}>
              Book a 10-minute demo
            </button>
          </div>
          <p className="final-cta__promise">We can show your stock live on the call.</p>
          <p className="final-cta__reassurance">No obligation · No long contract</p>
        </div>
      </div>
    </section>
  );
}
