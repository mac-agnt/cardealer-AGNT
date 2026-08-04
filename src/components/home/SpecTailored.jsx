import { Link } from 'react-router-dom';
import HeroDashboardMock from '../HeroDashboardMock';
import './SpecTailored.css';

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
            <figure className="spec-block__visual spec-block__visual--mock">
              <HeroDashboardMock />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
