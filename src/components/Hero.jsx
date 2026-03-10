import { Link } from 'react-router-dom';
import './Hero.css';

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="hero__check-icon">
      <path d="M3.5 8.5 6.5 11.5 12.5 5.5" />
    </svg>
  );
}

export default function Hero({ onBookDemo }) {
  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero__mobile" aria-label="Hero mobile layout">
          <div className="hero__mobile-copy-top reveal">
            <span className="hero__eyebrow">Dealer software</span>
            <h1 className="hero__headline">Dealer software that moves stock.</h1>
          </div>

          <div className="hero__mobile-image-wrap reveal">
            <img
              src="/hero.car.png"
              alt="Luxury vehicle"
              className="hero__base-image"
              loading="eager"
              decoding="async"
              width="1664"
              height="936"
            />
          </div>

          <h2 className="hero__mobile-subhead reveal-sm">
            List cars in minutes, filter time-wasters, and capture real buyer details automatically
            so your team can focus on serious conversations.
          </h2>

          <ul className="hero__outcomes reveal-sm" aria-label="Key outcomes">
            <li>
              <CheckIcon />
              <span>List once - publish everywhere</span>
            </li>
            <li>
              <CheckIcon />
              <span>Hot/Warm intent</span>
            </li>
            <li>
              <CheckIcon />
              <span>Unified inbox</span>
            </li>
          </ul>

          <div className="hero__cta-row reveal-sm" data-stagger>
            <Link to="/spec" className="btn btn-primary btn-micro hero__cta">
              Spec out your system
            </Link>
            <button
              className="btn btn-secondary btn-micro hero__cta"
              onClick={onBookDemo}
              aria-label="Book a 10-minute demo"
            >
              Book a 10-minute demo
            </button>
          </div>
          <p className="hero__trust reveal-sm">
            No contracts • Live in 5-7 days • Built for independent dealers.
          </p>
        </div>

        <div className="hero__desktop">
          <div className="hero__layout">
          <div className="hero__copy">
            <span className="hero__eyebrow">Dealer software</span>
            <h1 className="hero__headline reveal">Dealer software that moves stock.</h1>
            <p className="hero__subhead reveal-sm">
              List cars in minutes, filter time-wasters, and capture real buyer details automatically
              so your team can focus on serious conversations.
            </p>
            <ul className="hero__outcomes reveal-sm" aria-label="Key outcomes">
              <li>
                <CheckIcon />
                <span>List once - publish everywhere</span>
              </li>
              <li>
                <CheckIcon />
                <span>Hot/Warm intent</span>
              </li>
              <li>
                <CheckIcon />
                <span>Unified inbox</span>
              </li>
            </ul>
            <div className="hero__cta-row reveal-sm" data-stagger>
              <Link to="/spec" className="btn btn-primary btn-micro hero__cta">
                Spec out your system
              </Link>
              <button
                className="btn btn-secondary btn-micro hero__cta"
                onClick={onBookDemo}
                aria-label="Book a 10-minute demo"
              >
                Book a 10-minute demo
              </button>
            </div>
            <p className="hero__trust reveal-sm">
              No contracts • Live in 5-7 days • Built for independent dealers.
            </p>
          </div>

          <div className="hero__visual reveal">
            <article className="hero__composite card-micro">
              <img
                src="/hero.car.png"
                alt="Luxury vehicle"
                className="hero__base-image"
                loading="eager"
                decoding="async"
                width="1664"
                height="936"
              />
            </article>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
