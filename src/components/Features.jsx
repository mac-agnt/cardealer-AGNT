import { useReveal } from '../hooks/useReveal';
import './Features.css';
import { Timeline } from './ui/timeline';

const ONBOARDING_STEPS = [
  {
    title: 'Fill out a short form',
    desc: 'Tell us about your dealership, stock volume, and preferences.',
  },
  {
    title: 'Quick setup call',
    desc: 'We jump on a call to finalise specs and walk you through the system.',
  },
  {
    title: 'See your website',
    desc: 'We build your site and system. You review it and request changes.',
  },
  {
    title: 'Optimised & launched',
    desc: 'We optimise everything for Google and publish it live.',
  },
  {
    title: 'In-person handover',
    desc: 'We walk you through the full system so you’re confident using it day one.',
  },
];

export default function Features({ onBookDemo }) {
  const [ref, visible] = useReveal(0.15);
  const timelineData = ONBOARDING_STEPS.map((step, index) => ({
    title: `Step ${index + 1}`,
    content: (
      <div>
        <h3>{step.title}</h3>
        <p>{step.desc}</p>
      </div>
    ),
  }));

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
          <span className="section-label">Onboarding</span>
          <h2>From first call to live site — handled for you.</h2>
          <p className="features__sub">
            A simple, guided setup designed around how dealerships actually work.
          </p>
        </div>

        <div
          className="features__timeline-wrap"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s ease-out 0.1s',
          }}
        >
          <Timeline data={timelineData} />
        </div>

        <p
          className="features__reassurance"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.6s ease-out 0.5s',
          }}
        >
          No contracts. No tech headaches. You stay in control.
        </p>

        <div
          className="features__cta-row"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.6s ease-out 0.62s',
          }}
        >
          <span>Ready to get started?</span>
          <button className="btn btn-primary" onClick={onBookDemo} type="button">
            Request a 10-minute demo
          </button>
        </div>
      </div>
    </section>
  );
}
