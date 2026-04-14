import { Link, Navigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import PlaceholderVisual from '../ui/PlaceholderVisual';
import { getCapabilityDetail } from '../home/capabilityData';
import { useRevealOnScroll } from '../../lib/useRevealOnScroll';
import './CapabilityDetailPage.css';

export default function CapabilityDetailPage({ onBookDemo }) {
  const { slug } = useParams();
  const page = slug ? getCapabilityDetail(slug) : null;
  useRevealOnScroll();

  if (!page) return <Navigate to="/" replace />;

  return (
    <div className="cap-detail">
      <Navbar onBookDemo={onBookDemo} />

      <main className="cap-detail__main">
        <section className="cap-detail__hero section--tight">
          <div className="container container--wide">
            <div className="cap-detail__hero-inner reveal">
              <p className="section-label">{page.heroEyebrow}</p>
              <h1 className="cap-detail__hero-title">{page.title}</h1>
              <p className="cap-detail__hero-sub">{page.heroSub}</p>
            </div>
          </div>
        </section>

        <section className="cap-detail__split-wrap section--tight" aria-labelledby="cap-detail-explainer">
          <div className="container container--wide">
            <div className="cap-detail__split reveal-sm">
              <div className="cap-detail__split-visual">
                <PlaceholderVisual label={page.placeholderLabel} variant="ui" className="cap-detail__ph" />
              </div>
              <div className="cap-detail__split-copy" id="cap-detail-explainer">
                <p className="cap-detail__lead">{page.lead}</p>
                <p className="cap-detail__body">{page.body}</p>
                <div className="cap-detail__split-actions">
                  <Link to="/spec" className="btn btn-primary btn-micro">
                    Spec out your system
                  </Link>
                  <button type="button" className="btn btn-secondary btn-micro" onClick={() => onBookDemo?.()}>
                    Book a demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cap-detail__support section" aria-labelledby="cap-detail-support-heading">
          <div className="container container--wide">
            <h2 id="cap-detail-support-heading" className="cap-detail__support-heading reveal">
              What sits inside
            </h2>
            <div className="cap-detail__support-grid">
              {page.supportCards.map((card) => (
                <div key={card.title} className="cap-detail__support-card reveal-sm">
                  <h3 className="cap-detail__support-title">{card.title}</h3>
                  <ul className="cap-detail__support-list">
                    {card.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cap-detail__bottom section--tight">
          <div className="container container--wide">
            <div className="cap-detail__bottom-panel reveal-sm">
              <p className="cap-detail__bottom-label">Next step</p>
              <p className="cap-detail__bottom-copy">Map these capabilities to how your yard sells today.</p>
              <div className="cap-detail__bottom-actions">
                <Link to="/spec" className="btn btn-primary btn-micro">
                  Spec out your system
                </Link>
                <button type="button" className="btn btn-secondary btn-micro" onClick={() => onBookDemo?.()}>
                  Book a demo
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onBookDemo={onBookDemo} />
    </div>
  );
}
