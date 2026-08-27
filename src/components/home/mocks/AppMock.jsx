/* Coded replica of the AGNT dealer app — "a dealership in your pocket".
   Non-interactive presentation surface (aria-hidden); fixed design canvas,
   transform-scaled to its frame (same technique as HeroDashboardMock). */
import useMockFit from './useMockFit';
import './AppMock.css';

const DESIGN_W = 348;
const DESIGN_H = 706;

const ic = {
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.6-3.6" />
    </svg>
  ),
  bell: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 13 6 9z" /><path d="M10 18a2 2 0 0 0 4 0" />
    </svg>
  ),
  home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11l8-6 8 6" /><path d="M6 10v9h12v-9" /></svg>,
  car: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12l1.4-3.8A2 2 0 0 1 7.3 7h9.4a2 2 0 0 1 1.9 1.2L20 12" />
      <path d="M3 12h18v4H3z" /><circle cx="7" cy="16.5" r="1.2" /><circle cx="17" cy="16.5" r="1.2" />
    </svg>
  ),
  heart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.6-7 9-7 9z" /></svg>,
  chat: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16v11H9l-4 3z" /></svg>,
  user: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.2" /><path d="M5 20c0-3.4 3.1-5.5 7-5.5s7 2.1 7 5.5" /></svg>,
  key: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="12" r="4" /><path d="M12 12h9M18 12v3M15 12v2" /></svg>,
  tag: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12V5h7l8 8-7 7z" /><circle cx="8.5" cy="8.5" r="1.2" /></svg>,
  spanner: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5a4 4 0 0 0-5.2 5.2L4 16v4h4l5.8-5.8A4 4 0 0 0 19 9l-2.5 1L14 7.5z" /></svg>,
  euro: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M17 6.5A6 6 0 0 0 8 12a6 6 0 0 0 9 5.5M5 10.5h8M5 13.5h8" /></svg>,
  arrow: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M13 6l6 6-6 6" /></svg>,
};

const ACTIONS = [
  { icon: 'car', label: 'Browse stock' },
  { icon: 'euro', label: 'Value my car' },
  { icon: 'spanner', label: 'Book service' },
  { icon: 'tag', label: 'Finance' },
];

const TABS = [
  { icon: 'home', label: 'Home', active: true },
  { icon: 'car', label: 'Stock' },
  { icon: 'heart', label: 'Saved' },
  { icon: 'chat', label: 'Chat', dot: true },
  { icon: 'user', label: 'You' },
];

export default function AppMock({ fit = 'width', offsetY = 0, setHeight = true }) {
  const ref = useMockFit({ w: DESIGN_W, h: DESIGN_H, fit, offsetY, setHeight });

  return (
    <div className="papp" ref={ref} aria-hidden="true">
      <div className="papp__shell">
        <span className="papp__island" />

        <div className="papp__status">
          <span className="papp__time">9:41</span>
          <span className="papp__status-ic">
            <i className="papp__sig" /><i className="papp__wifi" /><i className="papp__batt" />
          </span>
        </div>

        <div className="papp__screen">
          <header className="papp__head">
            <span className="papp__brand">
              <span className="papp__brand-mark">YD</span>
              <span className="papp__brand-name">Your Dealership</span>
            </span>
            <span className="papp__bell">
              {ic.bell}
              <i className="papp__bell-dot" />
            </span>
          </header>

          <p className="papp__greet">Evening, Dara.</p>

          <span className="papp__search">
            <span className="papp__search-ic">{ic.search}</span>
            Search 34 vehicles in stock
          </span>

          <p className="papp__label">Saved for you</p>

          <article className="papp__feature">
            <span className="papp__feature-shot">
              <span className="papp__feature-badge">Price drop</span>
            </span>
            <span className="papp__feature-body">
              <span className="papp__feature-name">2021 BMW 520d M Sport</span>
              <span className="papp__feature-meta">78,400 km &middot; Diesel &middot; Auto</span>
              <span className="papp__feature-foot">
                <span className="papp__feature-price">
                  €34,950
                  <s>€36,400</s>
                </span>
                <span className="papp__feature-cta">
                  Reserve <span className="papp__feature-cta-ic">{ic.arrow}</span>
                </span>
              </span>
            </span>
          </article>

          <div className="papp__actions">
            {ACTIONS.map((a) => (
              <span key={a.label} className="papp__action">
                <span className="papp__action-ic">{ic[a.icon]}</span>
                {a.label}
              </span>
            ))}
          </div>

          <p className="papp__label">Your activity</p>

          <span className="papp__row">
            <span className="papp__row-ic papp__row-ic--copper">{ic.chat}</span>
            <span className="papp__row-text">
              <b>Your dealership replied</b>
              <i>Viewing confirmed for Thursday, 4:30pm</i>
            </span>
          </span>

          <span className="papp__row">
            <span className="papp__row-ic">{ic.key}</span>
            <span className="papp__row-text">
              <b>Trade-in valued</b>
              <i>2017 Golf 1.6 TDI &middot; €11,200 offer</i>
            </span>
          </span>
        </div>

        <nav className="papp__tabs">
          {TABS.map((t) => (
            <span key={t.label} className={`papp__tab${t.active ? ' is-active' : ''}`}>
              <span className="papp__tab-ic">
                {ic[t.icon]}
                {t.dot ? <i className="papp__tab-dot" /> : null}
              </span>
              {t.label}
            </span>
          ))}
        </nav>

        <span className="papp__bar" />
      </div>
    </div>
  );
}
