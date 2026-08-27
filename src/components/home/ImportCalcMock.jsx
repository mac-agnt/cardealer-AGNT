/* Coded replica of the AGNT Import Price Calculator page — interactive product
   mock with an animated cursor that presses buttons. Non-interactive surface
   (aria-hidden). Rendered at a fixed design width, then scaled to fit its frame. */
import { useEffect, useRef } from 'react';
import './ImportCalcMock.css';

const DESIGN_W = 1180;
const REVEAL_H = 720;

const ic = {
  car: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 11l1.5-4A2 2 0 0 1 8.4 5.7h7.2A2 2 0 0 1 17.5 7L19 11" />
      <path d="M3 11h18v5H3z" />
      <circle cx="7" cy="16.5" r="1.4" /><circle cx="17" cy="16.5" r="1.4" />
    </svg>
  ),
  sun: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" /></svg>,
  home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11l8-6 8 6" /><path d="M6 10v9h12v-9" /></svg>,
  pipeline: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M5 5v14M10 8v11M15 5v14M20 10v9" /></svg>,
  leads: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16v11H9l-4 3z" /></svg>,
  customers: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3" /><path d="M3 19c0-3 3-5 6-5s6 2 6 5" /><path d="M16 6a3 3 0 0 1 0 6M17 14c2 .4 4 2 4 5" /></svg>,
  whatsapp: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 18l-1 3 3.2-1A8 8 0 1 0 4 12a7.8 7.8 0 0 0 1 4z" /></svg>,
  calendar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 9h16M8 3v4M16 3v4" /></svg>,
  doc: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></svg>,
  template: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 9h16M9 9v11" /></svg>,
  vehicles: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l1.5-4A2 2 0 0 1 6.4 6.7h11.2A2 2 0 0 1 19.5 8L21 12" /><path d="M2 12h20v4H2z" /><circle cx="6.5" cy="16.5" r="1.3" /><circle cx="17.5" cy="16.5" r="1.3" /></svg>,
  reg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="6" /><path d="M9 11l1.6 1.6L14 9M20 20l-3.5-3.5" /></svg>,
  calc: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 7h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15v3" /></svg>,
  social: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l17-7-4 16-5-5z" /><path d="M11 15l-3 4v-4" /></svg>,
  globe: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8" /><path d="M4 12h16M12 4c2.5 2.5 2.5 13 0 16M12 4c-2.5 2.5-2.5 13 0 16" /></svg>,
  mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>,
  layers: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5M3 17l9 5 9-5" /></svg>,
  settings: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.1-1.3l2-1.5-2-3.4-2.3 1a7 7 0 0 0-2.2-1.3L14 2h-4l-.4 2.5a7 7 0 0 0-2.2 1.3l-2.3-1-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .4 0 .9.1 1.3l-2 1.5 2 3.4 2.3-1a7 7 0 0 0 2.2 1.3L10 22h4l.4-2.5a7 7 0 0 0 2.2-1.3l2.3 1 2-3.4-2-1.5c.1-.4.1-.9.1-1.3z" /></svg>,
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>,
  reset: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4v6h6" /><path d="M4 10a8 8 0 1 1-1 4" /></svg>,
  list: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01" /></svg>,
  gavel: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 5l5 5M10 9l5 5M3 21h8M5 17l6-6M12.5 5.5l3 3" /></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.5l2.5 2.5 4.5-5" /></svg>,
  info: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>,
  caret: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>,
  save: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h11l3 3v13H5z" /><path d="M8 4v5h7V4M8 14h8v6H8z" /></svg>,
};

const NAV = [
  { type: 'label', text: 'Deals' },
  { type: 'item', icon: 'home', text: 'Home' },
  { type: 'item', icon: 'pipeline', text: 'Pipeline' },
  { type: 'item', icon: 'leads', text: 'Leads' },
  { type: 'item', icon: 'customers', text: 'Customers' },
  { type: 'item', icon: 'whatsapp', text: 'WhatsApp' },
  { type: 'item', icon: 'calendar', text: 'Appointments' },
  { type: 'item', icon: 'doc', text: 'Documents' },
  { type: 'item', icon: 'template', text: 'Templates', sub: true },
  { type: 'label', text: 'Stock' },
  { type: 'item', icon: 'vehicles', text: 'Vehicles' },
  { type: 'item', icon: 'reg', text: 'Reg Check' },
  { type: 'item', icon: 'calc', text: 'Import Calculator', active: true },
  { type: 'item', icon: 'social', text: 'Social Studio' },
  { type: 'label', text: 'Setup' },
  { type: 'item', icon: 'globe', text: 'Website Content' },
  { type: 'item', icon: 'mail', text: 'Email Inbox' },
  { type: 'item', icon: 'layers', text: 'Logo & Watermark' },
  { type: 'item', icon: 'settings', text: 'Settings' },
];

function Field({ label, value, select, span }) {
  return (
    <div className="imp-field" style={span ? { gridColumn: `span ${span}` } : undefined}>
      <span className="imp-field__label">{label}</span>
      <div className={`imp-field__input${select ? ' is-select' : ''}`}>
        <span className="imp-field__value">{value}</span>
        {select && <span className="imp-field__caret">{ic.caret}</span>}
      </div>
    </div>
  );
}

export default function ImportCalcMock() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const frame = el?.parentElement;
    if (!el || !frame) return;
    const fit = () => {
      const s = frame.clientWidth / DESIGN_W;
      el.style.transform = `scale(${s})`;
      frame.style.height = `${s * REVEAL_H}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(frame);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="imp" ref={ref} aria-hidden="true">
      {/* Sidebar */}
      <aside className="imp__side">
        <div className="imp__brand">
          <span className="imp__brand-logo">{ic.car}</span>
          <span className="imp__brand-name">Admin</span>
          <span className="imp__brand-toggle">{ic.sun}</span>
        </div>
        <nav className="imp__nav">
          {NAV.map((row, i) =>
            row.type === 'label' ? (
              <p key={i} className="imp__nav-label">{row.text}</p>
            ) : (
              <span key={i} className={`imp__nav-item${row.active ? ' is-active' : ''}${row.sub ? ' is-sub' : ''}`}>
                <span className="imp__nav-icon">{ic[row.icon]}</span>
                <span className="imp__nav-text">{row.text}</span>
              </span>
            )
          )}
        </nav>
        <div className="imp__account">
          <span className="imp__account-email">demo@dealer.com</span>
        </div>
      </aside>

      {/* Main — Import Price Calculator */}
      <main className="imp__main">
        <p className="imp-eyebrow">History</p>
        <div className="imp-history">Completed calculations appear here as you work — no save button required.</div>

        <div className="imp-head">
          <div>
            <h2 className="imp-title">Import Price Calculator</h2>
            <p className="imp-sub">Full landed cost — Japan &amp; UK to Ireland. Enter details manually or extract from a listing URL below.</p>
          </div>
          <span className="imp-reset"><span className="imp-reset__ic">{ic.reset}</span>Reset</span>
        </div>

        <div className="imp-modes">
          <span className="imp-mode is-active"><span className="imp-mode__ic">{ic.list}</span>Listing</span>
          <span className="imp-mode"><span className="imp-mode__ic">{ic.gavel}</span>Auction</span>
        </div>

        {/* Listing URL */}
        <div className="imp-card imp-url">
          <span className="imp-card__label">Listing URL</span>
          <div className="imp-url__row">
            <div className="imp-url__input">
              <span className="imp-url__search">{ic.search}</span>
              <span className="imp-url__ph">Paste a listing URL — SBT Japan, Car From Japan, BE FORWARD…</span>
            </div>
            <span className="imp-analyse" data-target="analyse">Analyse</span>
          </div>
          <p className="imp-url__hint">Extraction fills vehicle and price fields when the site allows. You can always edit manually.</p>
        </div>

        {/* Two columns */}
        <div className="imp-grid">
          <div className="imp-card imp-vehicle">
            <span className="imp-card__heading">Source &amp; vehicle</span>

            <div className="imp-seg">
              <span className="imp-seg__opt is-active"><span className="imp-seg__flag">🇯🇵</span>Japan</span>
              <span className="imp-seg__opt"><span className="imp-seg__flag">🇬🇧</span>UK (GB)</span>
              <span className="imp-seg__opt" data-target="ni"><span className="imp-seg__flag">🇬🇧</span>N. Ireland</span>
            </div>

            <div className="imp-fields">
              <Field label="Make" value="Toyota" span={2} />
              <Field label="Model" value="Land Cruiser" span={2} />
              <Field label="Year" value="2023" span={2} />
              <Field label="Fuel" value="Petrol" select span={2} />
              <Field label="CC" value="1800" span={2} />
              <Field label="Mileage (km)" value="45,000" span={2} />
              <Field label="Gearbox" value="Unknown" select span={3} />
              <Field label="Manufactured In" value="Japan" select span={3} />
            </div>

            <p className="imp-duty"><span className="imp-duty__ic">{ic.check}</span>0% duty — EU-Japan EPA</p>
          </div>

          <div className="imp-card imp-total">
            <span className="imp-card__label">Total landed cost</span>
            <span className="imp-total__bar" />
            <p className="imp-total__link"><span className="imp-total__link-ic">{ic.info}</span>Enter OMSP to see VRT calculation</p>
            <div className="imp-total__empty">
              <p>Enter an OMSP estimate in the form to calculate taxes, VRT, and total landed cost.</p>
            </div>
            <span className="imp-save" data-target="save"><span className="imp-save__ic">{ic.save}</span>Save Calculation</span>
            <p className="imp-total__foot">Estimates only. VRT determined by Revenue at NCTS.</p>
          </div>
        </div>
      </main>

      {/* Animated cursor */}
      <span className="imp__cursor" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M5 3l14 8.5-6 1.2 3.2 6.3-2.7 1.3-3.3-6.4L5 19z" fill="#fff" stroke="#0b0b0a" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}
