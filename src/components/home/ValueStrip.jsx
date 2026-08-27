import HeroDashboardMock from '../HeroDashboardMock';
import WebsiteMock from './mocks/WebsiteMock';
import AskAgntMock from './mocks/AskAgntMock';
import WireframeDottedGlobe from '../ui/WireframeDottedGlobe';
import BrowserChrome from './mocks/BrowserChrome';
import './ValueStrip.css';

/* Inline stroke icons — matches the project convention (see HeroDashboardMock)
   rather than pulling in an icon package for three glyphs. */
const ic = {
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16M12 4c2.5 2.5 2.5 13 0 16M12 4c-2.5 2.5-2.5 13 0 16" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="2.5" width="10" height="19" rx="2.6" />
      <path d="M10.8 5.4h2.4" />
    </svg>
  ),
  board: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M9 9v11" />
    </svg>
  ),
};

/** Corner brackets — the card signature. */
function CardFrame({ children, className = '' }) {
  return (
    <article className={`vs-card${className ? ` ${className}` : ''}`}>
      <span className="vs-card__corner vs-card__corner--tl" aria-hidden="true" />
      <span className="vs-card__corner vs-card__corner--tr" aria-hidden="true" />
      <span className="vs-card__corner vs-card__corner--bl" aria-hidden="true" />
      <span className="vs-card__corner vs-card__corner--br" aria-hidden="true" />
      {children}
    </article>
  );
}

function CardHeading({ icon, label, statement }) {
  return (
    <div className="vs-card__head">
      <span className="vs-card__label">
        <span className="vs-card__label-ic">{ic[icon]}</span>
        {label}
      </span>
      <p className="vs-card__statement">{statement}</p>
    </div>
  );
}

/** Schematic side rails: dot field, dashed verticals, node joints. */
function Rails() {
  return (
    <div className="vs-rails" aria-hidden="true">
      <span className="vs-rails__dots" />
      <span className="vs-rails__rail vs-rails__rail--l">
        <i style={{ top: '13%' }} />
        <i style={{ top: '47%' }} />
        <i style={{ top: '81%' }} />
      </span>
      <span className="vs-rails__rail vs-rails__rail--r">
        <i style={{ top: '22%' }} />
        <i style={{ top: '58%' }} />
        <i style={{ top: '90%' }} />
      </span>
    </div>
  );
}

export default function ValueStrip({ onBookDemo }) {
  return (
    <section
      className="value-strip section--tight"
      id="what-agnt-is"
      aria-labelledby="what-agnt-heading"
    >
      <Rails />

      <div className="container container--wide">
        <header className="value-strip__head reveal">
          <p className="section-label">What AGNT is</p>
          <h2 id="what-agnt-heading" className="value-strip__title">
            One connected <span className="text-gradient">dealer system</span>
          </h2>
          <p className="value-strip__sub">
            Premium site, operational dashboard, AI-led WhatsApp, CRM, documents, and automation, aligned the way bigger
            groups run, sized for independents.
          </p>
        </header>

        <div className="vs-grid" aria-label="AGNT system components">
          <CardFrame className="reveal-sm">
            <CardHeading
              icon="globe"
              label="Premium tailored website"
              statement="Your forecourt, open and selling at 2am."
            />
            <div className="vs-card__media vs-card__media--dashed">
              <div className="vs-stage">
                <WebsiteMock />
              </div>
            </div>
          </CardFrame>

          <CardFrame className="reveal-sm">
            <CardHeading icon="phone" label="Dealer app" statement="A dealership in your pocket." />
            <div className="vs-card__media vs-card__media--dashed vs-card__media--globe">
              <div className="vs-globe">
                <WireframeDottedGlobe />
              </div>
              <div className="vs-stage vs-stage--app">
                <AskAgntMock />
              </div>
            </div>
          </CardFrame>

          <CardFrame className="vs-card--wide reveal-sm">
            <CardHeading
              icon="board"
              label="Dealer workspace & dashboard"
              statement="Every lead, deal, and vehicle on one screen."
            />
            <div className="vs-card__media vs-card__media--dashed">
              <div className="vs-desk">
                <BrowserChrome url="app.agnt.ie">
                  <div className="vs-deskframe">
                    <HeroDashboardMock revealHeight={470} />
                  </div>
                </BrowserChrome>
              </div>
            </div>
          </CardFrame>
        </div>

        <div className="value-strip__cta reveal-sm">
          <button
            type="button"
            className="btn btn-primary btn-micro value-strip__demo"
            onClick={() => onBookDemo?.()}
          >
            Book a demo
          </button>
        </div>
      </div>
    </section>
  );
}
