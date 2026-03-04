import { useReveal } from '../hooks/useReveal';
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
  const [ref, visible] = useReveal(0.15);

  return (
    <section className="final-cta section" id="demo" ref={ref}>
      <div className="container final-cta__inner">
        <div
          className="final-cta__content"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease-out',
          }}
        >
          <h2 className="final-cta__headline">See it on your stock — live.</h2>
          <p className="final-cta__sub">
            Show us 3 regs and we’ll generate drafts and walk you through the inbox.
          </p>
          <ul className="final-cta__outcomes">
            <li><CheckIcon /><span>Reg + photos → instant draft</span></li>
            <li><CheckIcon /><span>Edit once → publish everywhere</span></li>
            <li><CheckIcon /><span>Hot/Warm intent + unified inbox</span></li>
          </ul>
          <div className="final-cta__buttons">
            <Link to="/spec" className="btn btn-primary">
              Spec out your system
            </Link>
            <button className="btn btn-secondary" onClick={onBookDemo}>
              Book a 10-minute demo
            </button>
          </div>
          <p className="final-cta__promise">We’ll show your stock live on the call.</p>
          <p className="final-cta__reassurance">No obligation • No contract</p>
        </div>
      </div>
    </section>
  );
}
