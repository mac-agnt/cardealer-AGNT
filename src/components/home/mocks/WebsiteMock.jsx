/* Coded replica of a tailored AGNT dealer site — replaces the flat PNG
   mockup. Non-interactive presentation surface (aria-hidden); rendered at a fixed
   design width, then scaled to fit its frame so proportions stay identical at
   every breakpoint (same technique as HeroDashboardMock).

   Photography is cropped from the client's own site assets into public/mock/. */
import { useEffect, useRef } from 'react';
import './WebsiteMock.css';

const DESIGN_W = 1240;
const DESIGN_H = 1106;

const ic = {
  chevron: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.6-3.6" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  ),
  trend: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16l5-5 4 4 7-8" /><path d="M16 7h4v4" />
    </svg>
  ),
};

const NAV = ['Stock', 'New', 'Electric', 'Offers', 'Finance', 'Sell'];

const FIELDS = [
  ['Make', 'Any make'],
  ['Model', 'Any model'],
  ['Year', 'Any year'],
  ['Price', 'Any budget'],
  ['Fuel', 'Any fuel'],
  ['Transmission', 'Any transmission'],
];

const TABS = ['All', 'Electric', 'Hybrid', 'Under EUR 25k', 'Automatic'];

const STOCK = [
  {
    img: 'sportage',
    mo: 'From €555/mo',
    cash: 'Cash €31,950',
    pills: ['35,000 km', 'Diesel', 'Manual'],
    name: '2022 Kia Sportage',
    justIn: true,
  },
  {
    img: 'leaf',
    mo: 'From €503/mo',
    cash: 'Cash €28,950',
    pills: ['18,500 km', 'Electric', 'Automatic'],
    name: '2022 Nissan Leaf',
    justIn: true,
  },
  {
    img: 'bmw3',
    mo: 'From €512/mo',
    cash: 'Cash €32,950',
    pills: ['58,000 km', 'Diesel', 'Automatic'],
    name: '2021 BMW 3 Series',
  },
  {
    img: 'rangerover',
    mo: 'From €986/mo',
    cash: 'Cash €64,500',
    pills: ['21,400 km', 'Diesel', 'Automatic'],
    name: '2023 Range Rover Sport',
    justIn: true,
  },
];

export default function WebsiteMock() {
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
    <div className="wsite" ref={ref} aria-hidden="true">
      {/* ——— Hero over the showroom photograph ——— */}
      <section className="wsite__hero">
        <span className="wsite__hero-shot" />
        <span className="wsite__hero-scrim" />

        <header className="wsite__nav">
          <span className="wsite__brand">
            <span className="wsite__brand-mark" />
            <span className="wsite__brand-text">
              <b>YOUR DEALERSHIP</b>
            </span>
          </span>
          <nav className="wsite__links">
            {NAV.map((l) => (
              <span key={l} className="wsite__link">{l}</span>
            ))}
          </nav>
          <span className="wsite__nav-actions">
            <span className="wsite__btn wsite__btn--ghost">View Stock</span>
            <span className="wsite__btn wsite__btn--ghost">Calculate Finance</span>
            <span className="wsite__btn wsite__btn--accent">BOOK</span>
          </span>
        </header>

        <div className="wsite__hero-copy">
          <span className="wsite__pill">
            <i />
            Dublin &middot; Since 1995
          </span>
          <h1 className="wsite__h1">
            Selected vehicles.
            <br />
            <em>Priced with clarity.</em>
          </h1>
          <p className="wsite__lede">
            Curated stock, transparent pricing, and fast follow-up from a family-run showroom in Ashford.
          </p>
          <span className="wsite__hero-cta">
            <span className="wsite__btn wsite__btn--accent wsite__btn--lg">
              View stock <span className="wsite__btn-ic">{ic.arrow}</span>
            </span>
            <span className="wsite__btn wsite__btn--ghost wsite__btn--lg">
              <span className="wsite__btn-ic">{ic.trend}</span> Value your trade
            </span>
          </span>
        </div>

        {/* Inventory search, floating over the bottom of the hero */}
        <div className="wsite__search-panel">
          <span className="wsite__search-label">Inventory search</span>
          <div className="wsite__search-row">
            {FIELDS.map(([label, value]) => (
              <span key={label} className="wsite__field">
                <span className="wsite__field-label">{label}</span>
                <span className="wsite__field-box">
                  {value}
                  <span className="wsite__field-ic">{ic.chevron}</span>
                </span>
              </span>
            ))}
            <span className="wsite__search-btn">
              <span className="wsite__search-ic">{ic.search}</span>
              SEARCH
            </span>
          </div>
        </div>
      </section>

      {/* ——— Just Arrived ——— */}
      <section className="wsite__arrivals">
        <header className="wsite__arrivals-head">
          <span>
            <h2 className="wsite__h2">Just Arrived</h2>
            <p className="wsite__h2-sub">Fresh stock added to our latest listings.</p>
          </span>
          <span className="wsite__viewall">
            View all stock <span className="wsite__viewall-ic">{ic.arrow}</span>
          </span>
        </header>

        <div className="wsite__tabs">
          {TABS.map((t, i) => (
            <span key={t} className={`wsite__tab${i === 0 ? ' is-active' : ''}`}>{t}</span>
          ))}
        </div>

        <div className="wsite__grid">
          {STOCK.map((v) => (
            <article key={v.name} className="wcard">
              <span className={`wcard__shot wcard__shot--${v.img}`}>
                {v.justIn ? <span className="wcard__tag">JUST IN</span> : null}
              </span>
              <span className="wcard__body">
                <span className="wcard__mo">{v.mo}</span>
                <span className="wcard__cash">{v.cash}</span>
                <span className="wcard__note">Estimate only</span>
                <span className="wcard__pills">
                  {v.pills.map((p) => (
                    <span key={p} className="wcard__pill">{p}</span>
                  ))}
                </span>
                <span className="wcard__name">{v.name}</span>
              </span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
