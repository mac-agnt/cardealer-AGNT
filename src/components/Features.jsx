import { useReveal } from '../hooks/useReveal';
import './Features.css';

const PILLARS = [
  {
    title: 'List Once, Done',
    desc: 'AI generates your listing from a reg plate and photos. No manual data entry.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 14l3 3 7-7" />
        <circle cx="14" cy="14" r="11" />
      </svg>
    ),
  },
  {
    title: 'Publish Everywhere',
    desc: 'One click pushes your stock to Carzone, DoneDeal, Cars.ie, and your own site.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 4v10" />
        <path d="M9 9l5 5 5-5" />
        <path d="M4 18v4a2 2 0 002 2h16a2 2 0 002-2v-4" />
      </svg>
    ),
  },
  {
    title: 'Lead Intelligence',
    desc: 'Know who\'s looking, what they want, and how hot they are — before you call.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="14" cy="10" r="5" />
        <path d="M6 24c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        <path d="M20 7l2-2M22 7l-2-2" />
      </svg>
    ),
  },
];

export default function Features() {
  const [ref, visible] = useReveal(0.15);

  return (
    <section className="features section" id="features" ref={ref}>
      <div className="container">
        <div
          className="features__header"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease-out',
          }}
        >
          <span className="section-label">Why dealers choose AGNT</span>
          <h2>Three pillars. Zero compromise.</h2>
        </div>

        <div className="features__grid">
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.title}
              className={`card features__card brackets ${visible ? 'features__card--visible' : ''}`}
              style={{ transitionDelay: `${0.15 + i * 0.12}s` }}
            >
              <div className="features__icon">{pillar.icon}</div>
              <h3>{pillar.title}</h3>
              <p>{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
