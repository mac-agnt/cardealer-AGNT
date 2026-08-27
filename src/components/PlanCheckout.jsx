/* Pricing as a plan-selection panel: plans and payment on the left, a rotating
   showcase of the real product surfaces on the right. Every showcase slide is a
   coded mock from the main site rather than a screenshot. */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MockVisual from './home/mocks/MockVisual';
import { isPhoneMock } from './home/mocks/mockRegistry';
import './PlanCheckout.css';

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4.5 12.5l5 5 10-11" />
  </svg>
);

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

const PLANS = [
  {
    key: 'starter',
    name: 'Starter',
    setup: '€997',
    monthly: '€199',
    features: [
      'Custom-branded dealership site',
      'Full inventory management',
      'Finance calculator & lead capture',
      'Admin dashboard',
      'Subdomain included',
      'Email support',
    ],
  },
  {
    key: 'professional',
    name: 'Professional',
    badge: 'Most popular',
    setup: '€2,599',
    monthly: '€397',
    features: [
      'Everything in Starter',
      'WhatsApp Business integration',
      'Cartell history check integration',
      'Social media publishing tools',
      'Custom domain support',
      'Import calculator & offers module',
      'Priority support',
      'Onboarding call included',
    ],
  },
];

const ASSURANCES = [
  'Irish-built platform',
  'You own the site',
  'No lock-in contracts',
  'Full admin dashboard',
];

/* Each slide names a feature that actually appears in a plan above, so the
   showcase never promises something the plan lists do not include. */
const SLIDES = [
  {
    plan: 'Starter plan',
    title: 'Custom-branded dealership site',
    body: 'A retail front end in your own branding: stock discovery, vehicle pages, finance and trade-in paths, and enquiries that land in the dashboard.',
    mock: 'website',
  },
  {
    plan: 'Starter plan',
    title: 'One dashboard for the whole forecourt',
    body: 'Leads, appointments, stock and aged units on a single screen, with the day’s follow-ups already written for you when you sit down.',
    mock: 'dashboard',
  },
  {
    plan: 'Professional plan',
    title: 'Import calculator',
    body: 'Full landed cost, Japan and UK to Ireland. Customs duty, VAT, VRT by band, NOx levy and Irish fees, with potential profit and margin.',
    mock: 'import',
  },
  {
    plan: 'Professional plan',
    title: 'Ask your dealership anything',
    body: 'An assistant on the home screen that answers from your own data: stock, deals, customers, documents and appointments, in one question.',
    mock: 'ask',
  },
  {
    plan: 'Starter plan',
    title: 'Dealer documents in the dashboard',
    body: 'Invoices, receipts, trade-in agreements and sales contracts filed against the right customer and vehicle, not in a drawer behind the desk.',
    mock: 'documents',
  },
];

const EVERYTHING = [
  'Custom-branded dealership site',
  'Full inventory management',
  'Finance calculator',
  'Lead capture & enquiry inbox',
  'Admin dashboard',
  'Subdomain included',
  'WhatsApp Business integration',
  'Cartell history checks',
  'Import calculator & offers',
  'Social media publishing',
  'Custom domain support',
  'Priority support',
  'Onboarding call included',
];

const SLIDE_MS = 7000;

function useSlideRotation(count) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), SLIDE_MS);
    return () => window.clearInterval(id);
  }, [count, paused]);

  return { index, setIndex, setPaused };
}

export default function PlanCheckout() {
  const [selected, setSelected] = useState('professional');
  const { index, setIndex, setPaused } = useSlideRotation(SLIDES.length);

  /* Cursor position drives the dot spotlight through CSS variables written
     straight to the node: a continuous pointer value must never become React
     state, or the whole panel re-renders on every mouse move. */
  const showRef = useRef(null);

  const trackPointer = (event) => {
    const el = showRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  const plan = PLANS.find((p) => p.key === selected) ?? PLANS[1];
  const slide = SLIDES[index];

  return (
    <section className="pco" aria-labelledby="pco-heading">
      {/* ——— Plans and payment ——— */}
      <div className="pco__panel pco__panel--plans">
        <div className="pco__account">
          <Link to="/contact" className="pco__account-link">
            Already paid? Resume setup
          </Link>
          <Link to="/contact" className="pco__account-link pco__account-link--strong">
            Sign in
          </Link>
        </div>

        <p className="pco__eyebrow">AGNT platform</p>

        <h1 id="pco-heading" className="pco__title">
          Your dealership live in 60 minutes.
        </h1>

        <p className="pco__lede">
          Built for Irish motor dealers. One-time setup fee, then a flat monthly rate. No lock-in,
          no agency retainers. You own everything.
        </p>

        <ul className="pco__assurances">
          {ASSURANCES.map((item) => (
            <li key={item}>
              <span className="pco__assurance-ic"><Check /></span>
              {item}
            </li>
          ))}
        </ul>

        <div className="pco__plans" role="radiogroup" aria-label="Choose a plan">
          {PLANS.map((p) => {
            const active = p.key === selected;
            return (
              <button
                key={p.key}
                type="button"
                role="radio"
                aria-checked={active}
                className={`pco-plan${active ? ' is-active' : ''}`}
                onClick={() => setSelected(p.key)}
              >
                <span className="pco-plan__head">
                  <span className="pco-plan__radio" aria-hidden="true" />
                  <span className="pco-plan__name">{p.name}</span>
                  {p.badge ? <span className="pco-plan__badge">{p.badge}</span> : null}
                </span>

                <span className="pco-plan__prices">
                  <span className="pco-plan__price">
                    {p.setup}
                    <i>setup + VAT</i>
                  </span>
                  <span className="pco-plan__price pco-plan__price--month">
                    {p.monthly}
                    <i>/ month + VAT</i>
                  </span>
                </span>

                <span className="pco-plan__features">
                  {p.features.map((f) => (
                    <span key={f} className="pco-plan__feature">
                      <span className="pco-plan__check"><Check /></span>
                      {f}
                    </span>
                  ))}
                </span>
              </button>
            );
          })}
        </div>

        <Link to="/spec" className="pco__cta">
          <span className="pco__cta-label">
            Choose {plan.name}
            <span className="pco__cta-tail">, continue to payment</span>
          </span>
          <span className="pco__cta-ic"><Arrow /></span>
        </Link>

        <p className="pco__secure">
          <span>Secured by Stripe, SSL encrypted</span>
          <span>Cancel any time</span>
        </p>

        <p className="pco__after">
          After payment you set up your dealership: business details, branding, homepage, stock and
          domain. Around 15 minutes, and you can stop and resume any time.
        </p>
      </div>

      {/* ——— Product showcase ——— */}
      <div
        className="pco__panel pco__panel--show"
        ref={showRef}
        onPointerEnter={() => setPaused(true)}
        onPointerMove={trackPointer}
        onPointerLeave={() => setPaused(false)}
      >
        <span className="pco__dots-field" aria-hidden="true" />
        <span className="pco__dots-glow" aria-hidden="true" />

        <div className="pco__show-inner">
          <p className="pco__show-pill">{slide.plan}</p>
          <h2 className="pco__show-title">{slide.title}</h2>
          <p className="pco__show-body">{slide.body}</p>

          <div
            className={`pco__stage${isPhoneMock(slide.mock) ? ' pco__stage--phone' : ''}`}
            aria-hidden="true"
          >
            <div className="pco__fit" key={slide.mock}>
              <MockVisual name={slide.mock} variant="stage" />
            </div>
          </div>

          <div className="pco__dots" role="tablist" aria-label="Product showcase">
            {SLIDES.map((s, i) => (
              <button
                key={s.mock}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={s.title}
                className={`pco__dot${i === index ? ' is-active' : ''}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>

          <div className="pco__everything">
            <p className="pco__everything-label">Everything you get</p>
            <ul className="pco__everything-list">
              {EVERYTHING.map((item) => (
                <li key={item}>
                  <span className="pco__everything-ic"><Check /></span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="pco__everything-note">All thirteen included on Professional.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
