import './Integrations.css';

const INTEGRATIONS = [
  { name: 'Carzone', src: '/6.png' },
  { name: 'Cars.ie', src: '/8.png' },
  { name: 'DoneDeal', src: '/7.png' },
];

export default function Integrations() {
  return (
    <section className="integrations" id="integrations">
      <div className="container integrations__inner reveal">
        <h2 className="integrations__headline reveal">List once. Publish to Carzone, DoneDeal, Cars.ie.</h2>
        <p className="integrations__subhead reveal-sm">Edit once in AGNT. Updates push everywhere.</p>

        <div className="integrations__diagram reveal-sm" aria-label="AGNT publishes to platforms" data-stagger>
          <div className="integrations__flow">
            <span className="integrations__agnt-word">AGNT</span>
            {INTEGRATIONS.map((logo) => (
              <span key={logo.name} className="integrations__flow-item">
                <span className="integrations__arrow" aria-hidden="true">→</span>
                <img
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  className="integrations__logo-img logo-micro"
                  loading="lazy"
                  width="132"
                  height="28"
                />
              </span>
            ))}
            <span className="integrations__website-label">+ your website</span>
          </div>
        </div>
      </div>
    </section>
  );
}
