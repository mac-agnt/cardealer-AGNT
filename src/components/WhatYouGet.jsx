import { useReveal } from '../hooks/useReveal';
import './WhatYouGet.css';

const COMPARISON_ROWS = [
  {
    key: 'built-for-independents',
    label: 'Built for independent dealers',
    agnt: true,
    carsIreland: false,
    happyDealer: true,
  },
  {
    key: 'dealer-website-included',
    label: 'Dealer website included',
    agnt: true,
    carsIreland: false,
    happyDealer: true,
  },
  {
    key: 'unique-website',
    label: 'Unique website per dealer (not shared templates)',
    agnt: true,
    carsIreland: false,
    happyDealer: false,
  },
  {
    key: 'marketplace-exposure',
    label: 'Marketplace exposure (listing presence)',
    agnt: true,
    carsIreland: true,
    happyDealer: false,
  },
  {
    key: 'multi-platform-publishing',
    label: 'Multi-platform publishing from one place',
    agnt: true,
    carsIreland: false,
    happyDealer: false,
  },
  {
    key: 'unified-inbox',
    label: 'Unified inbox for enquiries',
    agnt: true,
    carsIreland: false,
    happyDealer: false,
  },
  {
    key: 'buyer-detail-capture',
    label: 'Buyer detail capture (name/phone/email)',
    agnt: true,
    carsIreland: false,
    happyDealer: false,
  },
  {
    key: 'intent-signals',
    label: 'Intent signals (Hot/Warm)',
    agnt: true,
    carsIreland: false,
    happyDealer: false,
  },
  {
    key: 'dealer-seo',
    label: 'Dealer SEO (your dealership name)',
    agnt: true,
    carsIreland: false,
    happyDealer: true,
  },
  {
    key: 'transparent-pricing',
    label: 'Transparent pricing (published or quoted clearly)',
    agnt: true,
    carsIreland: false,
    happyDealer: true,
  },
];

function Mark({ value, muted = false }) {
  return (
    <span className={`wyg__mark-wrap ${muted ? 'wyg__mark-wrap--muted' : ''}`}>
      {value ? (
        <span className="wyg__mark wyg__mark--yes" aria-label="Yes">
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3.5 8.5 6.5 11.5 12.5 5.5" />
          </svg>
        </span>
      ) : (
        <span className="wyg__mark wyg__mark--no" aria-label="Not offered or not clearly advertised as standard">N/A</span>
      )}
    </span>
  );
}

export default function WhatYouGet({ onBookDemo }) {
  const [ref, visible] = useReveal(0.12);

  return (
    <section className="wyg section" id="what-you-get" ref={ref}>
      <div className="container">
        <div
          className="wyg__header reveal"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease-out',
          }}
        >
          <span className="wyg__eyebrow">Why dealers switch</span>
          <h2>AGNT vs Dealer Platforms</h2>
          <p className="wyg__sub">
            Built specifically for independent dealers who want control, visibility, and real enquiries.
          </p>
        </div>

        <div
          className={`wyg__table-wrap reveal ${visible ? 'wyg__table-wrap--visible' : ''}`}
          style={{ transitionDelay: '0.12s' }}
        >
          <div className="wyg__how-to-read">
            <p className="wyg__how-to-read-title">How to read this</p>
            <p className="wyg__how-to-read-copy">
              A tick means the feature is offered as a standard part of the platform. A dash means it&apos;s not offered or not clearly advertised as standard.
            </p>
          </div>

          <div className="wyg__table-scroll">
            <table className="wyg__table" aria-label="AGNT comparison table">
              <thead>
                <tr>
                  <th scope="col" className="wyg__feature-col">Feature</th>
                  <th scope="col" className="wyg__col-head wyg__col-head--agnt">AGNT</th>
                  <th scope="col" className="wyg__col-head">Cars Ireland</th>
                  <th scope="col" className="wyg__col-head">Happy Dealer</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.key}>
                    <th scope="row" className="wyg__row-label wyg__feature-col">{row.label}</th>
                    <td className="wyg__cell wyg__cell--agnt">
                      <Mark value={row.agnt} />
                    </td>
                    <td className="wyg__cell wyg__cell--muted">
                      <Mark value={row.carsIreland} muted />
                    </td>
                    <td className="wyg__cell wyg__cell--muted">
                      <Mark value={row.happyDealer} muted />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="wyg__mini-scroll" aria-label="Mobile comparison grid">
            <div className="wyg__mini-table" role="table" aria-label="AGNT comparison mini table">
              <div className="wyg__mini-row wyg__mini-row--head" role="row">
                <div className="wyg__mini-head wyg__mini-head--feature" role="columnheader">Feature</div>
                <div className="wyg__mini-head" role="columnheader">AGNT</div>
                <div className="wyg__mini-head" role="columnheader">Cars Ireland</div>
                <div className="wyg__mini-head" role="columnheader">Happy Dealer</div>
              </div>
              {COMPARISON_ROWS.map((row) => (
                <div key={row.key} className="wyg__mini-row" role="row">
                  <div className="wyg__mini-feature" role="rowheader">{row.label}</div>
                  <div className="wyg__mini-cell wyg__mini-cell--agnt" role="cell">
                    <Mark value={row.agnt} />
                  </div>
                  <div className="wyg__mini-cell" role="cell">
                    <Mark value={row.carsIreland} muted />
                  </div>
                  <div className="wyg__mini-cell" role="cell">
                    <Mark value={row.happyDealer} muted />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="wyg__footer reveal-sm"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.6s ease-out 0.8s',
          }}
        >
          <p className="wyg__clarifier">
            Cars Ireland focuses on marketplace exposure.<br />
            Happy Dealer typically covers the dealer website layer.<br />
            <span>AGNT combines website, publishing workflow, and lead follow-up in one system.</span>
          </p>
          <p className="wyg__disclaimer">
            Comparison based on publicly available information and standard product offerings as of Feb 2026.
          </p>
          <div className="wyg__cta-row">
            <span className="wyg__cta-copy">See how it works on your stock.</span>
            <button className="btn btn-secondary btn-micro" onClick={onBookDemo} type="button">
              Book a 10-minute demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
