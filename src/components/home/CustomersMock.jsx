/* Coded replica of the AGNT Customers page — interactive product mock with an
   animated cursor that presses buttons. Non-interactive surface (aria-hidden).
   Rendered at a fixed design width, then scaled to fit its frame. */
import { useEffect, useRef } from 'react';
import './CustomersMock.css';

const DESIGN_W = 1180;
const REVEAL_H = 660;

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
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>,
  mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5L19 16l4 1.5V20a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>,
  contract: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 13h6M9 17h4" /></svg>,
  plus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>,
  chevron: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>,
};

const NAV = [
  { type: 'item', icon: 'home', text: 'Home' },
  { type: 'label', text: 'Deals' },
  { type: 'item', icon: 'pipeline', text: 'Pipeline' },
  { type: 'item', icon: 'leads', text: 'Leads' },
  { type: 'item', icon: 'customers', text: 'Customers', active: true },
  { type: 'item', icon: 'whatsapp', text: 'WhatsApp' },
  { type: 'item', icon: 'calendar', text: 'Appointments' },
  { type: 'item', icon: 'doc', text: 'Documents' },
  { type: 'item', icon: 'template', text: 'Templates', sub: true },
  { type: 'label', text: 'Stock' },
  { type: 'item', icon: 'vehicles', text: 'Vehicles' },
  { type: 'item', icon: 'reg', text: 'Reg Check' },
];

const CUSTOMERS = [
  { initials: 'SM', name: 'Seán Murphy', email: 'sean.murphy@example.com', phone: '+353 87 123 4567', city: 'Dublin', ago: '45d ago' },
  { initials: 'AK', name: 'Aoife Kelly', email: 'aoife.kelly@example.com', phone: '+353 86 987 6543', city: 'Dublin', ago: '20d ago' },
  { initials: 'PB', name: 'Patrick Byrne', email: 'pat.byrne@example.com', phone: '+353 85 456 7890', city: 'Naas', ago: '7d ago' },
];

export default function CustomersMock() {
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
    <div className="cust" ref={ref} aria-hidden="true">
      {/* Sidebar */}
      <aside className="cust__side">
        <div className="cust__brand">
          <span className="cust__brand-logo">{ic.car}</span>
          <span className="cust__brand-name">Admin</span>
          <span className="cust__brand-toggle">{ic.sun}</span>
        </div>
        <nav className="cust__nav">
          {NAV.map((row, i) =>
            row.type === 'label' ? (
              <p key={i} className="cust__nav-label">{row.text}</p>
            ) : (
              <span key={i} className={`cust__nav-item${row.active ? ' is-active' : ''}${row.sub ? ' is-sub' : ''}`}>
                <span className="cust__nav-icon">{ic[row.icon]}</span>
                <span className="cust__nav-text">{row.text}</span>
              </span>
            )
          )}
        </nav>
      </aside>

      {/* Main */}
      <main className="cust__main">
        <div className="cust__head">
          <div>
            <h2 className="cust__title">Customers</h2>
            <p className="cust__subtitle">Customer profiles for contract generation</p>
          </div>
          <span className="cust__new" data-press="new">
            <span className="cust__new-icon">{ic.plus}</span>
            New Customer
          </span>
        </div>

        <div className="cust__search">
          <span className="cust__search-icon">{ic.search}</span>
          <span className="cust__search-ph">Search by name, email or phone...</span>
        </div>

        <div className="cust__list">
          {CUSTOMERS.map((c, i) => (
            <div key={c.name} className="cust__row">
              <span className="cust__avatar">{c.initials}</span>
              <div className="cust__person">
                <span className="cust__person-name">{c.name}</span>
                <div className="cust__person-meta">
                  <span className="cust__meta"><span className="cust__meta-icon">{ic.mail}</span>{c.email}</span>
                  <span className="cust__meta"><span className="cust__meta-icon">{ic.phone}</span>{c.phone}</span>
                </div>
              </div>
              <div className="cust__loc">
                <span className="cust__loc-city">{c.city}</span>
                <span className="cust__loc-ago">{c.ago}</span>
              </div>
              <span className="cust__contract" data-press={`row${i}`}>
                <span className="cust__contract-icon">{ic.contract}</span>
                Create Contract
              </span>
              <span className="cust__chevron">{ic.chevron}</span>
            </div>
          ))}
        </div>

        <p className="cust__count">3 of 3 customers</p>
      </main>

      {/* Animated cursor */}
      <span className="cust__cursor" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M5 3l14 8.5-6 1.2 3.2 6.3-2.7 1.3-3.3-6.4L5 19z" fill="#fff" stroke="#0b0b0a" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}
