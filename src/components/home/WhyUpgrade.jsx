import './WhyUpgrade.css';

const CARDS = [
  {
    title: 'Buyers judge you before the call',
    body: 'A generic site reads as a generic operation—shoppers decide how serious you are long before anyone answers.',
  },
  {
    title: 'Leads need an owner',
    body: 'Intent split across forms, marketplaces, and WhatsApp cools fast when nobody clearly owns the next step.',
  },
  {
    title: 'Stock shows how fast you move',
    body: 'Late or thin listings age metal on the forecourt and make you look slower than better-run independents.',
  },
  {
    title: 'Paper and inboxes cap the operation',
    body: 'When history and deal progress live in drawers and threads, handovers stay fragile and the setup stays small.',
  },
];

export default function WhyUpgrade() {
  return (
    <section className="why section" id="why-upgrade" aria-labelledby="why-heading">
      <div className="container">
        <header className="why__header reveal">
          <p className="section-label">Why upgrade</p>
          <h2 id="why-heading" className="why__title">
            Serious dealers <span className="text-gradient">tighten the setup.</span>
          </h2>
          <p className="why__lede">
            A strong public face only holds up when leads, listings, and records are not running on parallel tracks.
          </p>
        </header>

        <ul className="why__cards">
          {CARDS.map((card) => (
            <li key={card.title} className="why__card reveal-sm">
              <h3 className="why__card-title">{card.title}</h3>
              <p className="why__card-body">{card.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
