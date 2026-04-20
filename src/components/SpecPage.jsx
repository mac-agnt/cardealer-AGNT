import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './SpecPage.css';

export default function SpecPage({ onBookDemo }) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="spec-gateway">
      <Navbar onBookDemo={onBookDemo} />

      <main className="spec-gateway__main section">
        <div className="container spec-gateway__container">
          <div className="spec-gateway__shell">
            <p className="spec-gateway__eyebrow">Package matching</p>
            <h1 className="spec-gateway__title">The right AGNT setup for your dealership</h1>
            <p className="spec-gateway__lead">
              Answer seven focused questions on stock, leads, and how you work today. We recommend Core, Growth, or
              Performance: clear pricing, no manual feature picking.
            </p>

            <ul className="spec-gateway__trust" aria-label="What to expect">
              <li>
                <span className="spec-gateway__trust-mark" aria-hidden />
                One question at a time
              </li>
              <li>
                <span className="spec-gateway__trust-mark" aria-hidden />
                Built for independents in Ireland
              </li>
              <li>
                <span className="spec-gateway__trust-mark" aria-hidden />
                Result in under two minutes
              </li>
            </ul>

            <div className="spec-gateway__cta-stack">
              <button type="button" className="btn btn-primary spec-gateway__cta-primary" onClick={() => navigate('/build')}>
                Start questionnaire
              </button>
              <Link to="/spec/packages" className="spec-gateway__cta-secondary">
                Review all recommended packages
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer onBookDemo={onBookDemo} />
    </div>
  );
}
