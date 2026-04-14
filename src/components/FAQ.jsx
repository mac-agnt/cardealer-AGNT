import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import './FAQ.css';

const FAQS = [
  {
    q: 'How long does setup take?',
    a: 'Most dealerships are live within 5–7 business days. We handle the build, migration, and launch. You provide your stock and branding.',
  },
  {
    q: 'Can I use my own domain?',
    a: 'Absolutely. We connect your existing domain or help you register a new one. Full DNS setup is included.',
  },
  {
    q: 'Can I edit listings after they\'re generated?',
    a: 'Yes. AI creates the first draft, but you have full control to edit titles, descriptions, pricing, and images at any time.',
  },
  {
    q: 'Which platforms do you integrate with?',
    a: 'We currently integrate with Carzone, DoneDeal, and Cars.ie. New platforms are added regularly based on dealer demand.',
  },
  {
    q: 'How does Lead Unlock work? Is it compliant?',
    a: 'Buyers voluntarily provide their name and phone number to access full vehicle details. This is a clear value exchange with explicit consent, fully GDPR-compliant.',
  },
  {
    q: 'What support do you offer?',
    a: 'All plans include dedicated onboarding, email support, and a direct line to our team. Priority support is available on the Tailored plan.',
  },
];

export default function FAQ() {
  const [ref, visible] = useReveal(0.15);
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="faq section" id="faq" ref={ref}>
      <div className="container">
        <div className="faq__header" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.7s ease-out' }}>
          <span className="section-label">FAQ</span>
          <h2>Common questions.</h2>
        </div>

        <div className="faq__list">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`faq__item ${openIndex === i ? 'faq__item--open' : ''} ${visible ? 'faq__item--visible' : ''}`}
              style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
            >
              <button
                className="faq__question"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span>{faq.q}</span>
                <span className="faq__chevron" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 6l4 4 4-4" />
                  </svg>
                </span>
              </button>
              <div className="faq__answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
