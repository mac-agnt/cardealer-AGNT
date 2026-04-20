import { useReveal } from '../hooks/useReveal';
import './Features.css';

const ONBOARDING_STEPS = [
  {
    icon: 'form',
    title: 'Fill out a short form',
    desc: 'Tell us about your dealership, stock volume, and preferences.',
  },
  {
    icon: 'call',
    title: 'Quick setup call',
    desc: 'We jump on a call to finalise specs and walk you through the system.',
  },
  {
    icon: 'screen',
    title: 'See your website',
    desc: 'We build your site and system. You review it and request changes.',
  },
  {
    icon: 'launch',
    title: 'Optimised & launched',
    desc: 'We optimise everything for Google and publish it live.',
  },
  {
    icon: 'guide',
    title: 'Remote handover',
    desc: 'We walk you through the full system so you’re confident using it day one.',
  },
];

function StepIcon({ type }) {
  if (type === 'form') {
    return (
      <svg viewBox="0 0 18 18" aria-hidden="true">
        <path d="M5 4.5h8M5 8h8M5 11.5h5M4.5 3.5h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z" />
      </svg>
    );
  }
  if (type === 'call') {
    return (
      <svg viewBox="0 0 18 18" aria-hidden="true">
        <path d="M4 3.5h2.3l1 2.7-1.4 1.3c.5 1.1 1.2 2 2.1 2.9.9.9 1.8 1.6 3 2.1l1.3-1.4 2.7 1V14c0 .6-.4 1-1 1-2.8 0-5.4-1.1-7.4-3.1S3 6.4 3 3.5c0-.6.4-1 1-1Z" />
      </svg>
    );
  }
  if (type === 'screen') {
    return (
      <svg viewBox="0 0 18 18" aria-hidden="true">
        <path d="M3.5 4.5h11a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1ZM7 14.5h4M8 12.5v2m2-2v2" />
      </svg>
    );
  }
  if (type === 'launch') {
    return (
      <svg viewBox="0 0 18 18" aria-hidden="true">
        <path d="M9 3.5c2.8 0 5 2.2 5 5v2l1.2 1.2M4 13l2.2-2.2M5.5 8.5l7-4-4 7-3 1Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M4 4.5h10v9H4v-9Zm2 2.5h6M9 7v6m-2.5-2h5" />
    </svg>
  );
}

export default function Features({ onBookDemo }) {
  const [ref, visible] = useReveal(0.15);

  return (
    <section className="features section" id="features" ref={ref}>
      <div className="container">
        <div
          className="features__header reveal"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease-out',
          }}
        >
          <span className="section-label">Onboarding</span>
          <h2>Onboarding</h2>
          <p className="features__promise">Live in 3 to 5 days.</p>
          <p className="features__sub">
            From first call to live site, everything is handled in a simple guided setup built around how dealerships actually work.
          </p>
        </div>

        <div
          className="features__layout reveal"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s ease-out 0.1s',
          }}
        >
          <div className="features__timeline" data-stagger>
            {ONBOARDING_STEPS.map((step, index) => (
              <article key={step.title} className="features__step card-micro">
                <div className="features__step-rail" aria-hidden="true">
                  <span className="features__step-num">{index + 1}</span>
                </div>
                <div className="features__step-card">
                  <span className="features__step-icon" aria-hidden="true">
                    <StepIcon type={step.icon} />
                  </span>
                  <div>
                    <h3>{`Step ${index + 1}: ${step.title}`}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="features__inputs-card card-micro reveal-sm">
            <h3>What you need to provide</h3>
            <ul>
              <li>Logo</li>
              <li>Brand colours</li>
              <li>Stock feed (or 3 regs to start)</li>
              <li>Domain access (or we set up a new domain)</li>
            </ul>
            <p>If you don’t have a stock feed yet, send 3 regs and we’ll show it live.</p>
          </aside>
        </div>

        <div
          className="features__support-strip reveal-sm"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.6s ease-out 0.5s',
          }}
        >
          <p>Support included: onboarding, email support, and a direct line to our team.</p>
        </div>

        <p className="features__reassurance">
          No contracts. No tech headaches. You stay in control.
        </p>

        <div
          className="features__cta-row reveal-sm"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.6s ease-out 0.62s',
          }}
        >
          <span>Ready to get started?</span>
          <button className="btn btn-secondary btn-micro" onClick={onBookDemo} type="button">
            Book a 10-minute demo
          </button>
        </div>
      </div>
    </section>
  );
}
