import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import './SplitSection.css';

function MacFrame({ title, src, alt }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="mac">
      <div className="mac__bar">
        <span className="mac__dots" aria-hidden="true">
          <i className="mac__dot mac__dot--red" />
          <i className="mac__dot mac__dot--yellow" />
          <i className="mac__dot mac__dot--green" />
        </span>
        <span className="mac__title">{title}</span>
      </div>
      <div className="mac__viewport">
        {failed ? (
          <div className="mac__fallback" />
        ) : (
          <img
            src={src}
            alt={alt}
            className="mac__img"
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </div>
  );
}

export default function SplitSection({ onBookDemo }) {
  const [ref, visible] = useReveal(0.12);

  return (
    <section className="split section" id="system" ref={ref}>
      <div className="split__accent-line" aria-hidden="true" />

      <div className="container">
        <div
          className="split__header"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease-out',
          }}
        >
          <span className="split__pill">The complete dealer stack</span>
          <h2>Website + Dealer OS. One system.</h2>
          <p className="split__sub">
            List faster. Capture real leads. Follow up with context.
          </p>
        </div>

        <div className="split__grid">
          <div className={`split__panel ${visible ? 'split__panel--visible-left' : ''}`}>
            <div className="split__panel-copy">
              <span className="split__label">
                <i className="split__signal" aria-hidden="true" />
                Website
              </span>
              <h3 className="split__title">Convert browsers into enquiries</h3>
              <ul className="split__bullets">
                <li><span className="split__dot" aria-hidden="true" />Fast stock search (mobile-first)</li>
                <li><span className="split__dot" aria-hidden="true" />Finance + trust cues in the right places</li>
                <li><span className="split__dot" aria-hidden="true" />Designed to trigger calls &amp; forms</li>
              </ul>
            </div>
            <MacFrame
              title="Website"
              src="/car dealer website template.png"
              alt="AGNT dealer website showing vehicle stock grid with pricing and enquiry prompts"
            />
          </div>

          <div className={`split__panel ${visible ? 'split__panel--visible-right' : ''}`}>
            <div className="split__panel-copy">
              <span className="split__label">
                <i className="split__signal" aria-hidden="true" />
                Dealer OS
              </span>
              <h3 className="split__title">Run stock &amp; leads without admin drag</h3>
              <ul className="split__bullets">
                <li><span className="split__dot" aria-hidden="true" />Reg + photos &rarr; instant listing draft</li>
                <li><span className="split__dot" aria-hidden="true" />Hot/Warm leads with intent</li>
                <li><span className="split__dot" aria-hidden="true" />Edit once, publish everywhere</li>
              </ul>
            </div>
            <MacFrame
              title="Dealer OS"
              src="/car dealer dashbaord template.png"
              alt="AGNT dealer operating system dashboard showing lead feed with intent signals"
            />
          </div>
        </div>

        <div
          className="split__cta-row"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.7s ease-out 0.15s',
          }}
        >
          <span className="split__cta-label">Want to see it on your stock?</span>
          <button className="btn btn-primary" onClick={onBookDemo} type="button">
            Request a 10-minute demo
          </button>
        </div>
      </div>
    </section>
  );
}
