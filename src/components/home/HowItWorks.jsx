import './HowItWorks.css';

const STEPS = [
  {
    num: '01',
    title: 'Short conversation',
    body: 'We learn your stock volume, how you take enquiries, and what the site needs to achieve.',
  },
  {
    num: '02',
    title: 'Spec and build',
    body: 'We configure your public site and dealer workspace around that—not an off-the-shelf bundle.',
  },
  {
    num: '03',
    title: 'Review and refine',
    body: 'You see the site and workspace, request changes, and we tune before go-live.',
  },
  {
    num: '04',
    title: 'Launch and handover',
    body: 'Usually 5–7 days to live. We walk the team through day-to-day use—no tech headache.',
  },
];

export default function HowItWorks() {
  return (
    <section className="hiw section" id="how-it-works" aria-labelledby="hiw-heading">
      <div className="container">
        <div className="hiw__shell">
          <header className="hiw__intro reveal">
            <p className="section-label">How it works</p>
            <h2 id="hiw-heading" className="hiw__title">
              Fast launch. <span className="text-gradient">Low friction.</span> No long contract.
            </h2>
            <p className="hiw__lede">
              Clear steps, direct access to our team, and a build that respects how you already sell.
            </p>
          </header>

          <ol className="hiw__track reveal-sm" data-stagger>
            {STEPS.map((s) => (
              <li key={s.num} className="hiw__milestone">
                <span className="hiw__index">{s.num}</span>
                <div className="hiw__milestone-copy">
                  <h3 className="hiw__milestone-title">{s.title}</h3>
                  <p className="hiw__milestone-text">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
