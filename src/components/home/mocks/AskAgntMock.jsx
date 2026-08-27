/* Coded replica of the Ask AGNT screen from the dealer app — the assistant home.
   Non-interactive presentation surface (aria-hidden); fixed design canvas,
   transform-scaled to its frame (same technique as AppMock). */
import useMockFit from './useMockFit';
import './AskAgntMock.css';

const DESIGN_W = 348;
const DESIGN_H = 676;

const ic = {
  spark: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.6c.7 4.3 2.9 6.5 7.2 7.2-4.3.7-6.5 2.9-7.2 7.2-.7-4.3-2.9-6.5-7.2-7.2 4.3-.7 6.5-2.9 7.2-7.2z" />
    </svg>
  ),
  plus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><path d="M12 6v12M6 12h12" /></svg>,
  up: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V6M6 12l6-6 6 6" /></svg>,
  cloud: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M7 18a4 4 0 0 1 .4-8 5 5 0 0 1 9.4 1.2A3.4 3.4 0 0 1 16.5 18z" /></svg>,
  calendar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="5" width="16" height="15" rx="2.5" /><path d="M4 10h16M8.5 3v4M15.5 3v4" /></svg>,
  doc: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4" /></svg>,
  people: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3" /><path d="M3.5 19c0-3 2.6-5 5.5-5s5.5 2 5.5 5" /><path d="M16 6.2a3 3 0 0 1 0 5.6M17 14c2 .5 3.5 2.2 3.5 5" /></svg>,
  home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11l8-6 8 6" /><path d="M6 10v9h12v-9" /></svg>,
  filters: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M4 7h16M7 12h10M10 17h4" /></svg>,
  car: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12l1.4-3.8A2 2 0 0 1 7.3 7h9.4a2 2 0 0 1 1.9 1.2L20 12" />
      <path d="M3 12h18v4H3z" /><circle cx="7" cy="16.5" r="1.2" /><circle cx="17" cy="16.5" r="1.2" />
    </svg>
  ),
  list: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h2M4 12h2M4 17h2M9 7h11M9 12h11M9 17h11" /></svg>,
};

const CHIPS = [
  { icon: 'cloud', label: 'Aged stock' },
  { icon: 'calendar', label: 'Today' },
  { icon: 'doc', label: 'Documents' },
  { icon: 'people', label: 'Follow-ups', wrap: true },
];

const TABS = [
  { icon: 'home' },
  { icon: 'filters' },
  { icon: 'spark', label: 'Ask', active: true },
  { icon: 'car' },
  { icon: 'list' },
];

export default function AskAgntMock({ fit = 'width', offsetY = 0, setHeight = true }) {
  const ref = useMockFit({ w: DESIGN_W, h: DESIGN_H, fit, offsetY, setHeight });

  return (
    <div className="aapp" ref={ref} aria-hidden="true">
      <div className="aapp__shell">
        <div className="aapp__screen">
          <span className="aapp__glow" />

          <div className="aapp__status">
            <span className="aapp__time">9:41</span>
            <span className="aapp__status-ic">
              <i className="aapp__sig" />
              <i className="aapp__wifi" />
              <i className="aapp__batt" />
            </span>
          </div>

          <p className="aapp__title">Ask AGNT</p>

          <div className="aapp__center">
            <span className="aapp__avatar">{ic.spark}</span>
            <p className="aapp__greet">Good morning, John</p>
            <p className="aapp__sub">Stock, deals, customers, documents, appointments</p>

            <div className="aapp__composer">
              <span className="aapp__composer-text">Ask AGNT anything</span>
              <span className="aapp__composer-plus">{ic.plus}</span>
              <span className="aapp__composer-send">{ic.up}</span>
            </div>

            <div className="aapp__chips">
              {CHIPS.map((c) => (
                <span key={c.label} className={`aapp__chip${c.wrap ? ' aapp__chip--wrap' : ''}`}>
                  <span className="aapp__chip-ic">{ic[c.icon]}</span>
                  {c.label}
                </span>
              ))}
            </div>
          </div>

          <nav className="aapp__tabs">
            {TABS.map((t, i) => (
              <span key={i} className={`aapp__tab${t.active ? ' is-active' : ''}`}>
                <span className="aapp__tab-ic">{ic[t.icon]}</span>
                {t.label}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
