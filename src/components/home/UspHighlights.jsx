import { Link } from 'react-router-dom';
import { REVEALS } from './ProductShowcase';
import CustomersMock from './CustomersMock';
import DocumentsMock from './DocumentsMock';
import ImportCalcMock from './ImportCalcMock';
import './UspHighlights.css';

const CARDS = REVEALS.map((item, i) => ({
  n: String(i + 1).padStart(2, '0'),
  title: item.title,
  caption: item.captionMobile,
  render: item.render || null,
  img: item.visualSrc ? encodeURI(item.visualSrc) : null,
}));

function CardVisual({ card }) {
  if (card.render === 'customers') {
    return (
      <div className="usp__card-frame usp__card-frame--mock">
        <CustomersMock />
      </div>
    );
  }
  if (card.render === 'documents') {
    return (
      <div className="usp__card-frame usp__card-frame--mock">
        <DocumentsMock />
      </div>
    );
  }
  if (card.render === 'import') {
    return (
      <div className="usp__card-frame usp__card-frame--mock">
        <ImportCalcMock />
      </div>
    );
  }
  if (card.img) {
    return <img className="usp__card-img" src={card.img} alt="" loading="lazy" decoding="async" />;
  }
  return null;
}

export default function UspHighlights() {
  return (
    <section className="usp section--airy" id="capabilities" aria-labelledby="usp-heading">
      <div className="container usp__head reveal-sm">
        <p className="section-label usp__eyebrow">Highlights</p>
        <h2 id="usp-heading" className="usp__title">
          Our <span className="text-gradient">unique selling points</span>
        </h2>
        <p className="usp__lede">
          The five strengths independents lean on, ticking through what sets an AGNT forecourt apart.
        </p>
      </div>

      <div className="usp__reel reveal-sm" role="region" aria-label="Unique selling points, auto-scrolling reel">
        <div className="usp__track">
          {[...CARDS, ...CARDS].map((card, i) => (
            <article
              className="usp__card"
              key={i}
              aria-hidden={i >= CARDS.length ? 'true' : undefined}
            >
              <div className="usp__card-media">
                <CardVisual card={card} />
              </div>
              <div className="usp__card-body">
                <span className="usp__card-n">{card.n}</span>
                <h3 className="usp__card-title">{card.title}</h3>
                <p className="usp__card-caption">{card.caption}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="usp__fade usp__fade--l" aria-hidden="true" />
        <div className="usp__fade usp__fade--r" aria-hidden="true" />
      </div>

      <div className="container usp__cta-cluster reveal-sm">
        <Link to="/spec" className="usp__cta usp__cta--primary">
          Spec out your system
        </Link>
        <Link to="/unique-selling-points" className="usp__cta usp__cta--ghost">
          See the full list of unique selling points
        </Link>
      </div>
    </section>
  );
}
