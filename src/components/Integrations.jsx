import './Integrations.css';

const INTEGRATIONS = [
  { name: 'Carzone', src: '/logo-carzone.svg' },
  { name: 'DoneDeal', src: '/logo-donedeal.svg' },
  { name: 'Cars.ie', src: '/logo-carsie.svg' },
];

export default function Integrations() {
  return (
    <section className="integrations" id="integrations">
      <div className="container integrations__inner reveal">
        <h2 className="integrations__headline reveal">List once. Publish to Carzone, DoneDeal, Cars.ie.</h2>
        <p className="integrations__subhead reveal-sm">Edit once in AGNT—updates push everywhere.</p>

        <div className="integrations__diagram reveal-sm" aria-label="AGNT publishes to platforms" data-stagger>
          <span className="integrations__agnt-chip">AGNT</span>
          <span className="integrations__arrow" aria-hidden="true">→</span>
          <div className="integrations__logos">
            {INTEGRATIONS.map((logo, index) => (
              <div key={logo.name} className="integrations__logo-unit">
                <div className="integrations__logo-chip">
                  <img
                    src={logo.src}
                    alt={`${logo.name} logo`}
                    className="integrations__logo-img logo-micro"
                    loading="lazy"
                    width="132"
                    height="28"
                  />
                </div>
                {index < INTEGRATIONS.length - 1 ? (
                  <span className="integrations__arrow" aria-hidden="true">→</span>
                ) : null}
              </div>
            ))}
            <span className="integrations__arrow" aria-hidden="true">→</span>
            <span className="integrations__pill">+ your website</span>
          </div>
        </div>
      </div>
    </section>
  );
}
