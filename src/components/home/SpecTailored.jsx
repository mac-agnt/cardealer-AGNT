import { Link } from 'react-router-dom';
import './SpecTailored.css';

const SPEC_VISUAL_SRC = encodeURI('/Spec out your system.png');

export default function SpecTailored({ onBookDemo }) {
  return (
    <section className="spec-block section" id="spec-tailored" aria-labelledby="spec-block-heading">
      <div className="container">
        <div className="spec-block__shell">
          <div className="spec-block__grid reveal-sm">
            <div className="spec-block__copy">
              <p className="section-label">Tailored to your yard</p>
              <h2 id="spec-block-heading" className="spec-block__title">
                <span className="text-gradient">Spec out</span> your system
              </h2>
              <p className="spec-block__body">
                Tell us how you retail and source, which marketplaces matter, and how you want WhatsApp and paperwork
                handled. We map website depth, AI handling, CRM, documents, automation, import tools, and Social Studio, so
                you pay for what the yard actually uses.
              </p>
              <div className="spec-block__actions">
                <Link to="/spec" className="btn btn-primary btn-micro spec-block__btn-primary">
                  Start your spec
                </Link>
                <button type="button" className="btn btn-secondary btn-micro" onClick={onBookDemo}>
                  Book a 10-minute demo
                </button>
              </div>
            </div>
            <figure className="spec-block__visual">
              <img
                src={SPEC_VISUAL_SRC}
                alt="AGNT spec setup: market, marketplaces, phone, CRM choice, and revenue snapshot on a dark dashboard."
                className="spec-block__img"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
