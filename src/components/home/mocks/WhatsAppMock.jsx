/* Coded replica of the AGNT WhatsApp AI sales agent — replaces the flat PNG
   mockup. Non-interactive presentation surface (aria-hidden); fixed design
   canvas, transform-scaled to its frame (same technique as AppMock).

   The thread plays on a loop: the agent answers a stock question, qualifies,
   books a viewing, then hands the conversation to a human at the desk. */
import useMockFit from './useMockFit';
import './WhatsAppMock.css';

const DESIGN_W = 348;
const DESIGN_H = 706;

const ic = {
  back: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 5l-7 7 7 7" />
    </svg>
  ),
  video: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="12" height="10" rx="2.4" /><path d="M15 11l6-3v8l-6-3z" />
    </svg>
  ),
  call: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5L14 12l4 1.5V17a2 2 0 0 1-2 2A13 13 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  ),
  emoji: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" /><path d="M9 10h.01M15 10h.01M8.8 14.4a4 4 0 0 0 6.4 0" />
    </svg>
  ),
  clip: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 11.5l-8 8a5 5 0 0 1-7-7l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7L9.6 17.2a1.7 1.7 0 0 1-2.4-2.4l7.6-7.6" />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8h3l1.6-2h6.8L17 8h3v11H4z" /><circle cx="12" cy="13" r="3.4" />
    </svg>
  ),
  mic: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 12a6.5 6.5 0 0 0 13 0M12 18.5V21" />
    </svg>
  ),
};

/* Double tick, used on the buyer's own messages. */
const Ticks = () => (
  <span className="wa__ticks">
    <svg viewBox="0 0 20 12" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.5 6.6l3 3.2 6-7.4" />
      <path d="M8.2 9.8l6.3-7.4" />
    </svg>
  </span>
);

/* `from`: 'buyer' | 'agent' | 'human'. Order drives the reveal timing. */
const THREAD = [
  { from: 'buyer', text: 'Hi, is the 2022 Sportage still available?', time: '17:04' },
  {
    from: 'agent',
    text: 'It is. 2022 Kia Sportage, 35,000 km, diesel, manual, €31,950, or from €555 a month over 60.',
    time: '17:04',
  },
  { from: 'buyer', text: 'Could I see it Thursday after 5?', time: '17:06' },
  {
    from: 'agent',
    text: 'Thursday 17:30 is free. Want me to hold it in your name and put you in the diary?',
    time: '17:06',
  },
  { from: 'buyer', text: 'Yes please, and I have a 2017 Golf to trade', time: '17:08' },
  { from: 'system', text: 'Trade-in flagged. Niamh at the desk picked up this chat.' },
  {
    from: 'human',
    text: 'Niamh here. Thursday 17:30 is booked. Send me the Golf reg and I will have a trade figure ready before you arrive.',
    time: '17:09',
  },
];

export default function WhatsAppMock({ fit = 'width', offsetY = 0, setHeight = true }) {
  const ref = useMockFit({ w: DESIGN_W, h: DESIGN_H, fit, offsetY, setHeight });

  return (
    <div className="wa" ref={ref} aria-hidden="true">
      <div className="wa__shell">
        <span className="wa__island" />

        <div className="wa__status">
          <span className="wa__time">17:09</span>
          <span className="wa__status-ic">
            <i className="wa__sig" />
            <i className="wa__wifi" />
            <i className="wa__batt" />
          </span>
        </div>

        <header className="wa__head">
          <span className="wa__back">{ic.back}</span>
          <span className="wa__avatar">YD</span>
          <span className="wa__who">
            <b>Your Dealership</b>
            <i>
              <em className="wa__ai">AI</em>
              answering now
            </i>
          </span>
          <span className="wa__head-ic">{ic.video}</span>
          <span className="wa__head-ic">{ic.call}</span>
        </header>

        <div className="wa__body">
          <div className="wa__thread">
            <span className="wa__daymark">Today</span>

            {THREAD.map((m, i) =>
              m.from === 'system' ? (
                <span key={i} className={`wa__system wa__msg--${i + 1}`}>
                  {m.text}
                </span>
              ) : (
                <span key={i} className={`wa__msg wa__msg--${m.from} wa__msg--${i + 1}`}>
                  {m.from === 'human' ? <b className="wa__by">Niamh, sales</b> : null}
                  {m.text}
                  <span className="wa__meta">
                    {m.time}
                    {m.from === 'buyer' ? <Ticks /> : null}
                  </span>
                </span>
              )
            )}

            <span className="wa__msg wa__msg--agent wa__typing">
              <i /><i /><i />
            </span>
          </div>
        </div>

        <div className="wa__composer">
          <span className="wa__input">
            <span className="wa__input-ic">{ic.emoji}</span>
            Message
            <span className="wa__input-ic wa__input-ic--end">{ic.clip}</span>
            <span className="wa__input-ic wa__input-ic--end">{ic.camera}</span>
          </span>
          <span className="wa__send">{ic.mic}</span>
        </div>

        <span className="wa__bar" />
      </div>
    </div>
  );
}
