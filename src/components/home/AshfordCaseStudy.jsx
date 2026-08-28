import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import LinkedInPost from './mocks/LinkedInPost';
import './mocks/LinkedInPost.css';
import './AshfordCaseStudy.css';

const ASHFORD_URL = 'https://www.ashfordapproved.ie';

/* Set this to Nadia's own approved wording and the panel renders it as an
   attributed pull-quote instead of the factual statement below. Left null on
   purpose: we do not put words in a customer's mouth. */
const NADIA_QUOTE = null;

const STATEMENT =
  'Nadia and the team sell every day on an AGNT setup. The same website, stock and lead workspace we build for every dealer.';

const PROOF = [
  'Public retail website, live now',
  'Stock, leads and WhatsApp in one workspace',
  'The same build every AGNT dealer gets',
];

/* The statement arrives white and washes to copper the first time it reaches
   the viewport. IntersectionObserver + a CSS transition on background-position,
   which is the same trigger the rest of the page reveals on and works in every
   browser — an earlier pass used animation-timeline: view(), which Firefox and
   pre-26 Safari ignore, so the text just sat there already copper.
   Reduced motion skips straight to the solid copper end state. */
function WaveStatement({ className = '', children }) {
  const ref = useRef(null);
  /* No observer available (very old browsers): start lit, so the copy is
     never left in its unresolved white state. */
  const [lit, setLit] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLit(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    /* Safety net: if no callback ever arrives, settle on the copper end state
       rather than leaving the statement stranded in its white start state. */
    const failsafe = setTimeout(() => setLit(true), 4000);
    return () => {
      clearTimeout(failsafe);
      io.disconnect();
    };
  }, []);

  return (
    <p
      ref={ref}
      className={`ashford__quote ashford__quote--wave${lit ? ' is-lit' : ''}${className ? ` ${className}` : ''}`}
    >
      {children}
    </p>
  );
}

const tick = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function AshfordCaseStudy({ onBookDemo }) {
  return (
    <section className="ashford section--airy" id="case-study" aria-labelledby="ashford-heading">
      <div className="ashford__rails" aria-hidden="true">
        <span className="ashford__dots" />
      </div>

      <div className="container">
        <header className="ashford__head reveal">
          <p className="section-label ashford__eyebrow">In the field</p>
          <h2 id="ashford-heading" className="ashford__title">
            Ashford runs on <span className="ashford__mark">AGNT</span>
          </h2>
          <p className="ashford__sub">One dealer. The whole system, live in public.</p>
        </header>

        <div className="ashford__panel reveal-sm">
          {/* Customer bar — the one forecourt running it, under its own mark */}
          <div className="ashford__bar">
            <span className="ashford__tab">
              <img
                className="ashford__tab-logo"
                src="/brand/ashford-mark-light.png"
                alt=""
                width="110"
                height="80"
                loading="lazy"
                decoding="async"
              />
              Ashford
            </span>
          </div>

          <div className="ashford__body">
            <div className="ashford__statement">
              <WaveStatement className={NADIA_QUOTE ? 'ashford__quote--cited' : ''}>
                {NADIA_QUOTE ?? STATEMENT}
              </WaveStatement>

              <p className="ashford__credit">
                <b>Nadia Adan</b>, Ashford Motors &middot; Ashford
              </p>

              <ul className="ashford__proof">
                {PROOF.map((point) => (
                  <li key={point} className="ashford__proof-item">
                    <span className="ashford__proof-tick" aria-hidden="true">{tick}</span>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="ashford__card-cta">
                <Link to="/spec" className="ashford__cta ashford__cta--primary">
                  Spec out your system
                </Link>
                <a
                  className="ashford__cta ashford__cta--site"
                  href={ASHFORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ashfordapproved.ie
                  <span className="ashford__cta-arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>

            <div className="ashford__embed">
              <LinkedInPost />
            </div>
          </div>
        </div>

        {typeof onBookDemo === 'function' ? (
          <div className="ashford__cta-cluster reveal-sm">
            <button type="button" className="ashford__cta ashford__cta--ghost" onClick={onBookDemo}>
              Book a 10-minute demo
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
