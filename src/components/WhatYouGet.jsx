import { useReveal } from '../hooks/useReveal';
import './WhatYouGet.css';

const COMPARISON_ROWS = [
  {
    label: 'Built specifically for independent dealers',
    agnt: true,
    carsIreland: false,
    happyDealer: true,
  },
  {
    label: 'Professional, modern dealer website',
    agnt: true,
    carsIreland: false,
    happyDealer: true,
  },
  {
    label: 'Custom-built site (not shared templates)',
    agnt: true,
    carsIreland: false,
    happyDealer: false,
  },
  {
    label: 'Strong marketplace exposure',
    agnt: true,
    carsIreland: true,
    happyDealer: false,
  },
  {
    label: 'Multi-platform publishing from one place',
    agnt: true,
    carsIreland: false,
    happyDealer: false,
  },
  {
    label: 'Unified inbox for calls, forms & enquiries',
    agnt: true,
    carsIreland: false,
    happyDealer: false,
  },
  {
    label: 'Lead capture with buyer contact details',
    agnt: true,
    carsIreland: false,
    happyDealer: false,
  },
  {
    label: 'Buyer intent signals (Hot / Warm)',
    agnt: true,
    carsIreland: false,
    happyDealer: false,
  },
  {
    label: 'SEO visibility for your own dealership name',
    agnt: true,
    carsIreland: false,
    happyDealer: true,
  },
  {
    label: 'Transparent, dealer-first pricing',
    agnt: true,
    carsIreland: false,
    happyDealer: true,
  },
];

function Mark({ value, muted = false }) {
  return (
    <span className={`wyg__mark-wrap ${muted ? 'wyg__mark-wrap--muted' : ''}`}>
      <span
        className={`wyg__mark ${value ? 'wyg__mark--yes' : 'wyg__mark--no'}`}
        aria-label={value ? 'Yes' : 'No'}
      >
        {value ? '✓' : '✕'}
      </span>
    </span>
  );
}

export default function WhatYouGet({ onBookDemo }) {
  const [ref, visible] = useReveal(0.12);

  return (
    <section className="wyg section" id="what-you-get" ref={ref}>
      <div className="container">
        <div
          className="wyg__header"
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
          className={`wyg__table-wrap ${visible ? 'wyg__table-wrap--visible' : ''}`}
          style={{ transitionDelay: '0.12s' }}
        >
          <table className="wyg__table" aria-label="AGNT comparison table">
            <thead>
              <tr>
                <th scope="col" />
                <th scope="col" className="wyg__col-head wyg__col-head--agnt">
                  <span className="wyg__col-micro">Most dealers choose AGNT</span>
                  AGNT
                </th>
                <th scope="col" className="wyg__col-head">Cars Ireland</th>
                <th scope="col" className="wyg__col-head">Happy Dealer</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="wyg__row-label">{row.label}</th>
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

          <table className="wyg__mobile-table" aria-label="AGNT comparison table mobile">
            <thead>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col">AGNT</th>
                <th scope="col">Cars Ireland</th>
                <th scope="col">Happy Dealer</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr key={`mobile-${row.label}`}>
                  <th scope="row" className="wyg__mobile-feature">{row.label}</th>
                  <td className="wyg__mobile-cell wyg__mobile-cell--agnt">
                    {row.agnt ? <span className="wyg__mobile-mark wyg__mobile-mark--yes">✓</span> : <span className="wyg__mobile-empty">&nbsp;</span>}
                  </td>
                  <td className="wyg__mobile-cell">
                    {row.carsIreland ? <span className="wyg__mobile-mark wyg__mobile-mark--yes">✓</span> : <span className="wyg__mobile-empty">&nbsp;</span>}
                  </td>
                  <td className="wyg__mobile-cell">
                    {row.happyDealer ? <span className="wyg__mobile-mark wyg__mobile-mark--yes">✓</span> : <span className="wyg__mobile-empty">&nbsp;</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className="wyg__footer"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.6s ease-out 0.8s',
          }}
        >
          <p className="wyg__clarifier">
            Cars Ireland is excellent for marketplace exposure.<br />
            Happy Dealer provides a basic dealer website.<br />
            <span>AGNT combines visibility, lead capture, and follow-up into one system.</span>
          </p>
          <p className="wyg__disclaimer">
            Comparison based on publicly available information and standard product offerings at time of writing.
          </p>
          <div className="wyg__cta-row">
            <span className="wyg__cta-copy">See how it works on your stock.</span>
            <button className="btn btn-primary" onClick={onBookDemo} type="button">
              Request a 10-minute demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
