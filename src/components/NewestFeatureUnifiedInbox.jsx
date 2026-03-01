import { useReveal } from '../hooks/useReveal';
import './NewestFeatureUnifiedInbox.css';

const CONVERSATIONS = [
  {
    initials: 'CD',
    name: 'Conor Doyle',
    preview: 'Still available for Saturday viewing?',
    time: '11:42',
    status: 'Hot',
  },
  {
    initials: 'MO',
    name: "Mary O'Neill",
    preview: 'Can you send finance options for 48 months?',
    time: '10:18',
    status: 'Warm',
  },
  {
    initials: 'LM',
    name: 'Liam Murphy',
    preview: 'I can call in around 6pm after work.',
    time: '09:56',
    status: 'Hot',
  },
  {
    initials: 'SK',
    name: 'Sarah Keane',
    preview: 'Do you take trade-ins on this model?',
    time: 'Yesterday',
    status: 'Warm',
  },
];

export default function NewestFeatureUnifiedInbox({ onBookDemo }) {
  const [ref, visible] = useReveal(0.12);

  return (
    <section className="inbox-feature section" id="unified-inbox" ref={ref}>
      <div className="container">
        <div
          className="inbox-feature__top-banner"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.6s ease-out',
          }}
        >
          Newest Feature
        </div>

        <div className="inbox-feature__grid">
          <div
            className="inbox-feature__copy"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(18px)',
              transition: 'all 0.7s ease-out',
            }}
          >
            <h2 className="inbox-feature__headline">
              Unified Inbox
              <span className="inbox-feature__scanner" aria-hidden="true" />
            </h2>
            <p className="inbox-feature__sub">
              WhatsApp + Website + Email — in one feed. Reply in seconds with AI assist.
            </p>

            <ul className="inbox-feature__bullets">
              <li>All enquiries in one place</li>
              <li>Assign, tag, track threads</li>
              <li>AI suggests fast replies</li>
              <li>Never miss a hot lead</li>
            </ul>
          </div>

          <div
            className="inbox-feature__visual-col"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(22px)',
              transition: 'all 0.8s ease-out 0.12s',
            }}
          >
            <article className="inbox-board" aria-label="Unified inbox preview">
              <aside className="inbox-board__filters">
                <button type="button" className="inbox-board__filter inbox-board__filter--active">All</button>
                <button type="button" className="inbox-board__filter">
                  <i className="inbox-board__dot inbox-board__dot--whatsapp" aria-hidden="true" />
                  WhatsApp
                </button>
                <button type="button" className="inbox-board__filter">
                  <i className="inbox-board__dot inbox-board__dot--website" aria-hidden="true" />
                  Website
                </button>
                <button type="button" className="inbox-board__filter">
                  <i className="inbox-board__dot inbox-board__dot--email" aria-hidden="true" />
                  Email
                </button>
              </aside>

              <div className="inbox-board__list">
                {CONVERSATIONS.map((item) => (
                  <div
                    key={item.name}
                    className={`inbox-board__item ${item.name === 'Conor Doyle' ? 'inbox-board__item--active' : ''}`}
                  >
                    <div className="inbox-board__avatar" aria-hidden="true">{item.initials}</div>
                    <div className="inbox-board__meta">
                      <p className="inbox-board__name">{item.name}</p>
                      <p className="inbox-board__preview">{item.preview}</p>
                    </div>
                    <div className="inbox-board__side">
                      <span className="inbox-board__time">{item.time}</span>
                      <span
                        className={`inbox-board__status ${item.status === 'Hot' ? 'inbox-board__status--hot' : 'inbox-board__status--warm'}`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="inbox-board__thread">
                <div className="inbox-board__thread-head">
                  <p className="inbox-board__thread-name">Conor Doyle</p>
                  <span className="inbox-board__thread-meta">BMW 320d enquiry</span>
                </div>

                <div className="inbox-board__messages">
                  <div className="inbox-board__bubble inbox-board__bubble--buyer">
                    Still available for Saturday viewing?
                    <span>11:42</span>
                  </div>
                  <div className="inbox-board__bubble inbox-board__bubble--dealer">
                    Yes, absolutely. I can hold it for you and share finance figures now.
                    <span>11:44</span>
                  </div>
                  <div className="inbox-board__bubble inbox-board__bubble--buyer">
                    Great. Send the monthly option please.
                    <span>11:45</span>
                  </div>
                </div>

                <div className="inbox-board__assist">
                  <p className="inbox-board__assist-title">AI Assist</p>
                  <p className="inbox-board__assist-text">
                    Suggested: “I’ll send 36/48 month options now and reserve your viewing slot.”
                  </p>
                  <div className="inbox-board__assist-actions">
                    <button type="button">Polish</button>
                    <button type="button">Shorten</button>
                  </div>
                </div>

                <div className="inbox-board__composer">
                  <input type="text" value="Send finance option + reserve viewing slot..." readOnly aria-label="Message draft" />
                  <button type="button">Send</button>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div
          className="inbox-feature__cta-row"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.6s ease-out 0.2s',
          }}
        >
          <span>See it live on your stock</span>
          <button className="btn btn-primary" onClick={onBookDemo} type="button">
            Request a 10-minute demo
          </button>
        </div>
      </div>
    </section>
  );
}
