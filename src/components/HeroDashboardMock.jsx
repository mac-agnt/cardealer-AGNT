/* Coded replica of the AGNT Admin dashboard — used as the hero product mock.
   Non-interactive presentation surface (aria-hidden); mirrors the live app shell.
   Rendered at a fixed design width, then scaled to fit its frame so proportions
   stay identical at every breakpoint.

   A scripted demo drives a ghost cursor through a real interaction loop: it picks
   a suggestion chip, types it, sends it, reads the reply, opens Leads, opens a
   lead, then returns home. Every step is genuine component state, not decoration. */
import { useCallback, useEffect, useRef, useState } from 'react';
import './HeroDashboardMock.css';

const DESIGN_W = 1180; // fixed canvas width
const REVEAL_H = 632;  // portion of the canvas shown before it bleeds below the cut

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
  { type: 'item', icon: 'calc', text: 'Import Calculator' },
  { type: 'item', icon: 'social', text: 'Social Studio' },
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

const LEADS = [
  { name: 'Aoife Brennan', car: '2019 BMW 320d M Sport', src: 'DoneDeal', status: 'Unreplied', age: '2h' },
  { name: 'Cathal Murray', car: '2021 Hyundai Tucson Executive', src: 'WhatsApp', status: 'Unreplied', age: '5h' },
  { name: 'Niamh Kelleher', car: '2018 Audi A4 Avant', src: 'Website', status: 'Booked', age: '1d' },
  { name: 'Declan Moloney', car: '2020 Ford Kuga ST-Line', src: 'Carzone', status: 'Quoted', age: '1d' },
  { name: 'Saoirse Nolan', car: '2022 Kia Sportage K3', src: 'Facebook', status: 'Replied', age: '2d' },
];

const ASK = 'Give me a daily summary';
const REPLY =
  '2 leads are still unreplied, the oldest since 08:14. 1 finance deal is waiting on proof of address, and 11 cars have passed 45 days in stock.';

function timeGreeting(hour) {
  if (hour < 12) return 'Good morning.';
  if (hour < 18) return 'Good afternoon.';
  return 'Good evening.';
}

const INITIAL = {
  view: 'home',
  nav: 'Home',
  chip: null,
  press: false,
  composer: '',
  typeTarget: null,
  thread: [],
  thinking: false,
  lead: null,
  target: null,
};

/* [delay before the step, state transition] — runs on a loop. */
const SCRIPT = [
  [1400, (s) => ({ ...s, target: 'chip-2' })],
  [820, (s) => ({ ...s, press: true, chip: 2 })],
  [170, (s) => ({ ...s, press: false, typeTarget: ASK })],
  [1500, (s) => ({ ...s, target: 'send' })],
  [720, (s) => ({ ...s, press: true })],
  [170, (s) => ({
    ...s,
    press: false,
    chip: null,
    composer: '',
    typeTarget: null,
    thinking: true,
    thread: [{ role: 'user', text: ASK }],
  })],
  [1250, (s) => ({ ...s, thinking: false, thread: [...s.thread, { role: 'bot', text: REPLY }] })],
  [2400, (s) => ({ ...s, target: 'nav-Leads' })],
  [780, (s) => ({ ...s, press: true })],
  [170, (s) => ({ ...s, press: false, view: 'leads', nav: 'Leads', thread: [], thinking: false })],
  [1500, (s) => ({ ...s, target: 'row-0' })],
  [820, (s) => ({ ...s, press: true })],
  [170, (s) => ({ ...s, press: false, lead: 0 })],
  [2600, (s) => ({ ...s, target: 'nav-Home' })],
  [780, (s) => ({ ...s, press: true })],
  [170, (s) => ({ ...s, press: false, view: 'home', nav: 'Home', lead: null })],
  [2200, (s) => s],
];

/* `revealHeight` controls how much of the canvas is shown before it bleeds past
   the frame — the hero crops tighter than the in-card usage. */
export default function HeroDashboardMock({ revealHeight = REVEAL_H }) {
  const ref = useRef(null);
  const nodes = useRef({});
  const [state, setState] = useState(INITIAL);
  const [cursor, setCursor] = useState({ x: 470, y: 60 });
  const [greeting, setGreeting] = useState(() => timeGreeting(new Date().getHours()));

  const setNode = useCallback((key) => (el) => {
    if (el) nodes.current[key] = el;
    else delete nodes.current[key];
  }, []);

  /* Scale the fixed-width canvas into whatever frame it is dropped into */
  useEffect(() => {
    const el = ref.current;
    const frame = el?.parentElement;
    if (!el || !frame) return;
    const fit = () => {
      const s = frame.clientWidth / DESIGN_W;
      el.style.transform = `scale(${s})`;
      frame.style.height = `${s * revealHeight}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(frame);
    return () => ro.disconnect();
  }, [revealHeight]);

  /* Greeting follows the clock — re-checked every minute so an open tab stays honest */
  useEffect(() => {
    const id = setInterval(() => setGreeting(timeGreeting(new Date().getHours())), 60000);
    return () => clearInterval(id);
  }, []);

  /* Demo loop */
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    let step = 0;
    let timer;
    const run = () => {
      const [delay, fn] = SCRIPT[step % SCRIPT.length];
      timer = setTimeout(() => {
        setState(fn);
        step += 1;
        run();
      }, delay);
    };
    run();
    return () => clearTimeout(timer);
  }, []);

  /* Type the picked suggestion into the composer, character by character */
  useEffect(() => {
    const text = state.typeTarget;
    if (!text) return undefined;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setState((s) => (s.typeTarget === text ? { ...s, composer: text.slice(0, i) } : s));
      if (i >= text.length) clearInterval(id);
    }, 34);
    return () => clearInterval(id);
  }, [state.typeTarget]);

  /* Park the cursor over whatever the script is pointing at (design-space coords) */
  useEffect(() => {
    if (!state.target) return undefined;
    const id = requestAnimationFrame(() => {
      const el = nodes.current[state.target];
      const root = ref.current;
      if (!el || !root) return;
      let x = 0;
      let y = 0;
      let n = el;
      while (n && n !== root) {
        x += n.offsetLeft;
        y += n.offsetTop;
        n = n.offsetParent;
      }
      setCursor({ x: x + Math.min(el.offsetWidth / 2, 90), y: y + el.offsetHeight / 2 });
    });
    return () => cancelAnimationFrame(id);
  }, [state.target, state.view]);

  const openLead = state.lead === null ? null : LEADS[state.lead];

  return (
    <div
      className="dash"
      ref={ref}
      style={{ '--dash-reveal': `${revealHeight}px` }}
      aria-hidden="true"
    >
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
                ref={setNode(`nav-${row.text}`)}
                className={`dash__nav-item${state.nav === row.text ? ' is-active' : ''}${row.sub ? ' is-sub' : ''}`}
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

        {state.view === 'home' ? (
          <div className="dash__center">
            {state.thread.length === 0 ? (
              <>
                <h2 className="dash__greeting">{greeting}</h2>
                <p className="dash__sub">
                  You have 2 unreplied leads, 2 WhatsApp handoffs and 11 vehicles aged 45d+.
                </p>
              </>
            ) : (
              <div className="dash__thread">
                {state.thread.map((m, i) => (
                  <div key={i} className={`dash__msg dash__msg--${m.role}`}>
                    {m.text}
                  </div>
                ))}
                {state.thinking && (
                  <div className="dash__msg dash__msg--bot dash__msg--typing">
                    <span />
                    <span />
                    <span />
                  </div>
                )}
              </div>
            )}

            <div className="dash__composer">
              <span className={`dash__composer-text${state.composer ? ' is-filled' : ''}`}>
                {state.composer || 'Ask anything about your stock, leads or deals'}
                {state.composer && <i className="dash__caret" />}
              </span>
              <span
                ref={setNode('send')}
                className={`dash__composer-send${state.composer ? ' is-ready' : ''}`}
              >
                {ic.arrowUp}
              </span>
            </div>

            <div className="dash__chips">
              {CHIPS.map((c, i) => (
                <span
                  key={c.text}
                  ref={setNode(`chip-${i}`)}
                  className={`dash__chip${state.chip === i ? ' is-picked' : ''}`}
                >
                  <span className="dash__chip-icon">{ic[c.icon]}</span>
                  {c.text}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="dash__leads">
            <div className="dash__leads-table">
              <div className="dash__leads-head">
                <span>Lead</span>
                <span>Vehicle</span>
                <span>Source</span>
                <span>Status</span>
                <span>Age</span>
              </div>
              {LEADS.map((l, i) => (
                <div
                  key={l.name}
                  ref={setNode(`row-${i}`)}
                  className={`dash__leads-row${state.lead === i ? ' is-open' : ''}`}
                >
                  <span className="dash__leads-name">{l.name}</span>
                  <span>{l.car}</span>
                  <span>{l.src}</span>
                  <span>
                    <em className={`dash__pill dash__pill--${l.status.toLowerCase()}`}>{l.status}</em>
                  </span>
                  <span>{l.age}</span>
                </div>
              ))}
            </div>

            {openLead && (
              <aside className="dash__drawer">
                <p className="dash__drawer-name">{openLead.name}</p>
                <p className="dash__drawer-car">{openLead.car}</p>
                <div className="dash__drawer-meta">
                  <span>{openLead.src}</span>
                  <span>{openLead.age} old</span>
                </div>
                <p className="dash__drawer-note">
                  Asked about finance on the {openLead.car.split(' ').slice(1, 3).join(' ')}. No reply sent yet.
                </p>
                <div className="dash__drawer-actions">
                  <span className="dash__drawer-btn dash__drawer-btn--primary">Draft WhatsApp reply</span>
                  <span className="dash__drawer-btn">Book viewing</span>
                </div>
              </aside>
            )}
          </div>
        )}
      </main>

      {/* Ghost cursor — driven by the script above */}
      <div
        className={`dash__cursor${state.press ? ' is-press' : ''}`}
        style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
        aria-hidden="true"
      >
        <span className="dash__cursor-ring" />
        <svg viewBox="0 0 24 24">
          <path
            d="M5 2.5l13.2 10.3-5.9.6 3.2 6.2-2.5 1.2-3.1-6.2L5 18.6z"
            fill="#fff"
            stroke="rgba(12,11,10,0.55)"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
