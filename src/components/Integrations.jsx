import { useReveal } from '../hooks/useReveal';
import './Integrations.css';

const INTEGRATIONS = [
  { name: 'Carzone', src: '/logo-carzone.svg' },
  { name: 'DoneDeal', src: '/logo-donedeal.svg' },
  { name: 'Cars.ie', src: '/logo-carsie.svg' },
];

export default function Integrations() {
  const [ref, visible] = useReveal(0.2);

  return (
    <section className="integrations" ref={ref}>
      <div className={`container integrations__inner ${visible ? 'visible' : ''}`}>
        <p className="integrations__label">Integrates with</p>
        <div className="integrations__logos">
          {INTEGRATIONS.map((logo) => (
            <div key={logo.name} className="integrations__logo">
              <img
                src={logo.src}
                alt={`${logo.name} logo`}
                className="integrations__logo-img"
                loading="lazy"
                width="132"
                height="24"
              />
            </div>
          ))}
          <span className="integrations__pill">Your Site</span>
        </div>
      </div>
    </section>
  );
}
