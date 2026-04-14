import './Benefits.css';

const BENEFITS = [
  {
    title: 'Catch more serious buyers',
    body: 'Clear enquiry paths and proper follow-up, so you spend time on people who intend to buy.',
  },
  {
    title: 'List stock faster',
    body: 'Draft from reg and photos, fix listings in one place, and keep channels aligned without double work.',
  },
  {
    title: 'Stay on top of leads',
    body: 'See what needs a reply, what is waiting on the customer, and what is at risk of going cold.',
  },
  {
    title: 'Keep slow stock moving',
    body: 'Aged stock and pricing nudges stay visible, so nothing sits unnoticed for months.',
  },
  {
    title: 'Less time on admin',
    body: 'One workspace for stock, leads, appointments and WhatsApp. Fewer logins and handovers.',
  },
];

export default function Benefits() {
  return (
    <section className="benefits section section--compact" id="benefits" aria-labelledby="benefits-heading">
      <div className="container">
        <div className="benefits__intro reveal">
          <p className="section-label">What it helps you do</p>
          <h2 id="benefits-heading" className="benefits__title">
            Look sharper online. <span className="text-gradient">Run the yard more smoothly</span> behind the scenes.
          </h2>
        </div>
        <ul className="benefits__bento">
          {BENEFITS.map((b, i) => (
            <li key={b.title} className={`benefits__tile benefits__tile--${i + 1} reveal-sm`}>
              <span className="benefits__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="benefits__tile-title">{b.title}</h3>
              <p className="benefits__tile-body">{b.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
