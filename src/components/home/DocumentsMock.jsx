/* Coded replica of the AGNT Documents page — used as the "Digitised dealer documents"
   product mock. Mirrors the hero dashboard shell/theme. An animated pointer drives a
   short loop: opens New Document, then sends two rows. Decorative (aria-hidden);
   collapses to a static frame under prefers-reduced-motion. Rendered at a fixed design
   width, then scaled to fit its frame so proportions hold at every breakpoint. */
import { useEffect, useRef } from 'react';
import './DocumentsMock.css';

const DESIGN_W = 1280;
const DESIGN_H = 800; // 16:10, matches the other product stages

/* ——— Inline stroke icons (1.6px), matching project convention ——— */
const ic = {
  car: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 11l1.5-4A2 2 0 0 1 8.4 5.7h7.2A2 2 0 0 1 17.5 7L19 11" /><path d="M3 11h18v5H3z" /><circle cx="7" cy="16.5" r="1.4" /><circle cx="17" cy="16.5" r="1.4" /></svg>,
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
  layers: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5M3 17l9 5 9-5" /></svg>,
  plus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>,
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>,
  chevron: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>,
  logout: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" /><path d="M9 12h11M16 8l4 4-4 4" /></svg>,
  file: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4M10 13h5M10 17h5" /></svg>,
  eye: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>,
  download: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v11M7 11l5 5 5-5M5 20h14" /></svg>,
  send: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 4L3 11l7 2 2 7z" /><path d="M21 4L11 14" /></svg>,
  comment: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5h14v10H9l-4 4z" /></svg>,
  more: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></svg>,
};

const NAV = [
  { type: 'label', text: 'Deals' },
  { type: 'item', icon: 'home', text: 'Home' },
  { type: 'item', icon: 'pipeline', text: 'Pipeline' },
  { type: 'item', icon: 'leads', text: 'Leads' },
  { type: 'item', icon: 'customers', text: 'Customers' },
  { type: 'item', icon: 'whatsapp', text: 'WhatsApp' },
  { type: 'item', icon: 'calendar', text: 'Appointments' },
  { type: 'item', icon: 'doc', text: 'Documents', active: true },
  { type: 'item', icon: 'template', text: 'Templates', sub: true },
  { type: 'label', text: 'Stock' },
  { type: 'item', icon: 'vehicles', text: 'Vehicles' },
  { type: 'item', icon: 'reg', text: 'Reg Check' },
  { type: 'item', icon: 'calc', text: 'Import Calculator' },
  { type: 'item', icon: 'social', text: 'Social Studio' },
];

const STATS = [
  { label: 'Draft', n: '1', tone: 'grey' },
  { label: 'Sent', n: '1', tone: 'blue' },
  { label: 'Signed', n: '1', tone: 'green' },
  { label: 'Void', n: '0', tone: 'red' },
  { label: 'Completed', n: '0', tone: 'green' },
];

const ROWS = [
  { title: 'Sales Contract — Shane Doyle — 2020 BMW 320d', status: 'Signed', tone: 'green', no: 'DOC-20260419-0001', ago: '2h ago', who: 'Shane Doyle' },
  { title: 'Deposit Receipt — Darragh Kelly — 2021 VW Golf', status: 'Sent', tone: 'blue', no: 'DOC-20260419-0002', ago: '5h ago', who: 'Darragh Kelly' },
  { title: 'Invoice — Aoife Murphy — 2022 Toyota Corolla', status: 'Draft', tone: 'grey', no: 'DOC-20260419-0003', ago: '1h ago', who: 'Aoife Murphy' },
];

export default function DocumentsMock() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const frame = el?.parentElement;
    if (!el || !frame) return;
    const fit = () => {
      const s = frame.clientWidth / DESIGN_W;
      el.style.transform = `scale(${s})`;
      frame.style.height = `${s * DESIGN_H}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(frame);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="docs" ref={ref} aria-hidden="true">
      {/* Sidebar */}
      <aside className="docs__side">
        <div className="docs__brand">
          <span className="docs__brand-logo">{ic.car}</span>
          <span className="docs__brand-name">Admin</span>
          <span className="docs__brand-toggle">{ic.sun}</span>
        </div>

        <nav className="docs__nav">
          {NAV.map((row, i) =>
            row.type === 'label' ? (
              <p key={i} className="docs__nav-label">{row.text}</p>
            ) : (
              <span
                key={i}
                className={`docs__nav-item${row.active ? ' is-active' : ''}${row.sub ? ' is-sub' : ''}`}
              >
                <span className="docs__nav-icon">{ic[row.icon]}</span>
                <span className="docs__nav-text">{row.text}</span>
              </span>
            )
          )}
        </nav>

        <div className="docs__account">
          <span className="docs__account-email">demo@dealer.com</span>
          <span className="docs__account-logout">{ic.logout}</span>
        </div>
      </aside>

      {/* Main */}
      <main className="docs__main">
        <header className="docs__head">
          <div className="docs__head-copy">
            <h2 className="docs__title">Documents</h2>
            <p className="docs__subtitle">Contracts, invoices, and dealership paperwork (3 total)</p>
          </div>
          <div className="docs__head-actions">
            <span className="docs__btn docs__btn--ghost">
              <span className="docs__btn-icon">{ic.layers}</span>Templates
            </span>
            <span className="docs__btn docs__btn--primary docs__new">
              <span className="docs__btn-icon">{ic.plus}</span>New Document
            </span>
          </div>
        </header>

        <div className="docs__stats">
          {STATS.map((s) => (
            <div key={s.label} className="docs__stat">
              <span className={`docs__badge docs__badge--${s.tone}`}>{s.label}</span>
              <span className="docs__stat-num">{s.n}</span>
            </div>
          ))}
        </div>

        <div className="docs__filters">
          <div className="docs__search">
            <span className="docs__search-icon">{ic.search}</span>
            <span className="docs__search-ph">Search by title, number, or customer...</span>
          </div>
          <div className="docs__select">All Types<span className="docs__select-chev">{ic.chevron}</span></div>
          <div className="docs__select">All Status<span className="docs__select-chev">{ic.chevron}</span></div>
        </div>

        <div className="docs__list">
          {ROWS.map((r, i) => (
            <div key={r.no} className={`docs__row docs__row--${i}`}>
              <span className="docs__row-icon">{ic.file}</span>
              <div className="docs__row-body">
                <div className="docs__row-titleline">
                  <span className="docs__row-title">{r.title}</span>
                  <span className={`docs__badge docs__badge--${r.tone}`}>{r.status}</span>
                </div>
                <div className="docs__row-meta">
                  <span className="docs__row-no">{r.no}</span>
                  <span className="docs__row-ago">{r.ago}</span>
                  <span className="docs__row-who">{r.who}</span>
                </div>
              </div>
              <div className="docs__row-acts">
                <span className="docs__act">{ic.eye}</span>
                <span className="docs__act">{ic.download}</span>
                <span className={`docs__act docs__act--send${i !== 1 ? ` docs__act--press${i === 0 ? 'A' : 'B'}` : ''}`}>{ic.send}</span>
                <span className="docs__act">{ic.comment}</span>
                <span className="docs__act">{ic.more}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Animated pointer */}
      <span className="docs__cursor">
        <svg viewBox="0 0 24 24" fill="none"><path d="M5 3l14 8-6 1.6L9.6 18z" fill="#f3f0ea" stroke="#0c0c0b" strokeWidth="1.2" strokeLinejoin="round" /></svg>
        <span className="docs__cursor-ring" />
      </span>
    </div>
  );
}
