/* Coded replica of the AGNT Admin dashboard — used as the hero product mock.
   Non-interactive presentation surface (aria-hidden); mirrors the live app shell.
   Rendered at a fixed design width, then scaled to fit its frame so proportions
   stay identical at every breakpoint. */
import { useEffect, useRef } from 'react';
import './HeroDashboardMock.css';

const DESIGN_W = 1180; // fixed canvas width
const REVEAL_H = 680;  // portion of the canvas shown before it bleeds below the cut

/* ——— Inline stroke icons (1.5px), matching project convention ——— */
const ic = {
  car: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 11l1.5-4A2 2 0 0 1 8.4 5.7h7.2A2 2 0 0 1 17.5 7L19 11" />
      <path d="M3 11h18v5H3z" />
      <circle cx="7" cy="16.5" r="1.4" /><circle cx="17" cy="16.5" r="1.4" />
    </svg>
  ),
  sun: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </svg>
  ),
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
  logout: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" /><path d="M9 12h11M16 8l4 4-4 4" /></svg>,
  arrowUp: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V6M6 12l6-6 6 6" /></svg>,
  alert: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4l9 16H3z" /><path d="M12 10v4M12 17h.01" /></svg>,
  chat: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16v11H9l-4 3z" /></svg>,
  spark: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7z" /></svg>,
  trend: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 16l5-5 4 4 7-8" /><path d="M16 7h4v4" /></svg>,
};

const STATS = [
  { n: '0', label: 'Leads today' },
  { n: '2', label: 'Unreplied', dot: true },
  { n: '0', label: 'Appointments' },
  { n: '11', label: 'In stock' },
  { n: '2', label: 'Handoffs', dot: true },
  { n: '11', label: 'Aged 45d+' },
];

const NAV = [
  { type: 'label', text: 'Deals' },
  { type: 'item', icon: 'home', text: 'Home', active: true },
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
  { type: 'item', icon: 'calc', text: 'Import Calculator' },
  { type: 'item', icon: 'social', text: 'Social Studio' },
  { type: 'label', text: 'Setup' },
  { type: 'item', icon: 'globe', text: 'Website Content' },
  { type: 'item', icon: 'mail', text: 'Email Inbox' },
  { type: 'item', icon: 'layers', text: 'Logo & Watermark' },
  { type: 'item', icon: 'settings', text: 'Settings' },
];

const CHIPS = [
  { icon: 'alert', text: '2 unreplied leads' },
  { icon: 'chat', text: '2 handoffs waiting' },
  { icon: 'spark', text: 'Daily summary' },
  { icon: 'customers', text: 'Pipeline' },
  { icon: 'vehicles', text: 'Aged stock' },
  { icon: 'social', text: 'Post to social' },
  { icon: 'trend', text: 'Pricing check' },
];

export default function HeroDashboardMock() {
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
    <div className="dash" ref={ref} aria-hidden="true">
      {/* Sidebar */}
      <aside className="dash__side">
        <div className="dash__brand">
          <span className="dash__brand-logo">{ic.car}</span>
          <span className="dash__brand-name">Admin</span>
          <span className="dash__brand-toggle">{ic.sun}</span>
        </div>

        <nav className="dash__nav">
          {NAV.map((row, i) =>
            row.type === 'label' ? (
              <p key={i} className="dash__nav-label">{row.text}</p>
            ) : (
              <span
                key={i}
                className={`dash__nav-item${row.active ? ' is-active' : ''}${row.sub ? ' is-sub' : ''}`}
              >
                <span className="dash__nav-icon">{ic[row.icon]}</span>
                <span className="dash__nav-text">{row.text}</span>
              </span>
            )
          )}
        </nav>

        <div className="dash__account">
          <span className="dash__account-email">demo@dealer.com</span>
          <span className="dash__account-logout">{ic.logout}</span>
        </div>
      </aside>

      {/* Main */}
      <main className="dash__main">
        <div className="dash__stats">
          {STATS.map((s) => (
            <div key={s.label} className="dash__stat">
              {s.dot && <span className="dash__stat-dot" />}
              <span className="dash__stat-num">{s.n}</span>
              <span className="dash__stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="dash__center">
          <h2 className="dash__greeting">Good afternoon.</h2>
          <p className="dash__sub">You have 2 unreplied leads, 2 WhatsApp handoffs and 11 vehicles aged 45d+.</p>

          <div className="dash__composer">
            <span className="dash__composer-text">Draft a WhatsApp reply for a finance lead</span>
            <span className="dash__composer-send">{ic.arrowUp}</span>
          </div>

          <div className="dash__chips">
            {CHIPS.map((c) => (
              <span key={c.text} className="dash__chip">
                <span className="dash__chip-icon">{ic[c.icon]}</span>
                {c.text}
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
