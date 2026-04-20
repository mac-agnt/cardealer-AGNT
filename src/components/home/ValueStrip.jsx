import './ValueStrip.css';

/** Processed transparent PNGs (see scripts/process_product_visuals.py) */
const VISUAL_PREMIUM_WEBSITE = '/agnt-visual-premium-website.png';
const VISUAL_DEALER_DASHBOARD = '/agnt-visual-dealer-dashboard.png';
const VISUAL_WHATSAPP_AGENT = '/agnt-visual-whatsapp-agent.png';

const PRIMARY = [
  {
    id: 'website',
    name: 'Premium tailored website',
    visualSrc: VISUAL_PREMIUM_WEBSITE,
    visualAlt: 'Desktop and mobile showing a premium tailored dealer website with stock and search.',
  },
  {
    id: 'workspace',
    name: 'Dealer workspace & dashboard',
    visualSrc: VISUAL_DEALER_DASHBOARD,
    visualAlt: 'Dealer workspace dashboard with leads, appointments, and operational overview.',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp AI sales agent',
    visualSrc: VISUAL_WHATSAPP_AGENT,
    visualAlt: 'Mobile phone with WhatsApp AI sales agent conversation and handoff.',
  },
];

const SUPPORT = [
  'Stock & inventory',
  'Leads & enquiries',
  'Appointments & bookings',
  'Customer profiles / CRM',
  'Digitised dealer admin',
  'Automated workflows',
  'Import price calculator',
  'Logo & watermark',
  'Social Studio',
];

export default function ValueStrip({ onBookDemo }) {
  return (
    <section
      className="value-strip section--tight"
      id="what-agnt-is"
      aria-labelledby="what-agnt-heading"
    >
      <div className="container container--wide">
        <header className="value-strip__head reveal">
          <p className="section-label">What AGNT is</p>
          <h2 id="what-agnt-heading" className="value-strip__title">
            One connected <span className="text-gradient">dealer system</span>
          </h2>
          <p className="value-strip__sub">
            Premium site, operational dashboard, AI-led WhatsApp, CRM, documents, and automation, aligned the way bigger
            groups run, sized for independents.
          </p>
        </header>

        <div className="value-strip__board reveal-sm" aria-label="AGNT system components">
          <div className="value-strip__spine" aria-hidden="true" />
          <div className="value-strip__primary">
            {PRIMARY.map((m, i) => (
              <div
                key={m.id}
                className={`value-strip__module value-strip__module--primary reveal-sm ${
                  i === 0 ? 'value-strip__module--hero' : ''
                }${m.visualSrc ? '' : ' value-strip__module--text-only'}`}
              >
                <span className="value-strip__module-accent" aria-hidden="true" />
                {m.visualSrc ? (
                  <div className={`value-strip__visual value-strip__visual--${m.id}`}>
                    <img
                      src={m.visualSrc}
                      alt={m.visualAlt}
                      className="value-strip__visual-img"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : null}
                <span className="value-strip__module-name">{m.name}</span>
              </div>
            ))}
          </div>

          <ul className="value-strip__support">
            {SUPPORT.map((name) => (
              <li key={name} className="value-strip__support-cell reveal-sm">
                <span className="value-strip__support-inner">
                  <span className="value-strip__support-mark" aria-hidden="true" />
                  <span className="value-strip__support-name">{name}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="value-strip__cta reveal-sm">
          <button
            type="button"
            className="btn btn-primary btn-micro value-strip__demo"
            onClick={() => onBookDemo?.()}
          >
            Book a demo
          </button>
        </div>
      </div>
    </section>
  );
}
