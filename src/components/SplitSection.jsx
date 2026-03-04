import { useReveal } from '../hooks/useReveal';
import './SplitSection.css';

const WEBSITE_FLOW = [
  { title: 'Stock grid', src: '/stock grid .png', alt: 'Stock grid preview' },
  { title: 'Vehicle detail', src: '/vehicle detail.png', alt: 'Vehicle detail preview' },
  { title: 'Inquiry form', src: '/enquiry form.png', alt: 'Inquiry form preview' },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="split__check-icon">
      <path d="M3.5 8.5 6.5 11.5 12.5 5.5" />
    </svg>
  );
}

function WebsitePreviewCard({ title, src, alt, aspectClass, hint }) {
  return (
    <div className="split__website-card">
      <div className="split__website-card-head">
        <p className="split__website-card-title">{title}</p>
        {hint ? <p className="split__website-card-hint">{hint}</p> : null}
      </div>
      <div className="split__website-card-body">
        <div className={`split__website-card-frame ${aspectClass}`}>
          <img
            src={src}
            alt={alt}
            className="split__website-card-img"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}

function SystemCard({ outcomeLabel, title, description, bullets, replaces, imageSrc, imageAlt, visibleClass }) {
  const isWebsiteCard = outcomeLabel === 'More calls';
  const isDealerCard = outcomeLabel === 'Faster listings';

  return (
    <article className={`split__card card-micro reveal ${visibleClass}`}>
      <div className="split__card-layout">
        <div className="split__card-copy">
          <span className="split__outcome-pill">{outcomeLabel}</span>
          <h3 className="split__card-title">{title}</h3>
          <p className="split__card-desc">{description}</p>
          <ul className="split__bullets">
            {bullets.map((item) => (
              <li key={item}>
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {isWebsiteCard ? (
            <>
              <div className="split__stats" aria-label="Designed to increase">
                <span className="split__stats-label">Designed to increase</span>
                <div className="split__stats-pills">
                  <span className="split__stat-pill">+calls</span>
                  <span className="split__stat-pill">+forms</span>
                  <span className="split__stat-pill">+finance enquiries</span>
                </div>
              </div>

              <div className="split__journey" aria-label="Website conversion journey">
                <div className="split__website-previews split__website-previews--desktop">
                  {WEBSITE_FLOW.map((item) => (
                    <WebsitePreviewCard
                      key={item.title}
                      title={item.title}
                      src={item.src}
                      alt={item.alt}
                      aspectClass="split__aspect-16-10"
                    />
                  ))}

                  <div className="split__website-wide">
                    <WebsitePreviewCard
                      title="Website"
                      src="/stock grid .png"
                      alt="Website overall preview"
                      aspectClass="split__aspect-21-9"
                      hint="Stock → VDP → enquiry"
                    />
                  </div>
                </div>

                <div className="split__website-previews split__website-previews--mobile">
                  {WEBSITE_FLOW.map((item) => (
                    <WebsitePreviewCard
                      key={`mobile-${item.title}`}
                      title={item.title}
                      src={item.src}
                      alt={item.alt}
                      aspectClass="split__aspect-16-10"
                    />
                  ))}

                  <WebsitePreviewCard
                    title="Website"
                    src="/stock grid .png"
                    alt="Website overall preview"
                    aspectClass="split__aspect-16-9"
                    hint="Stock → VDP → enquiry"
                  />
                </div>
              </div>
            </>
          ) : null}
          {isDealerCard ? (
            <div className="split__timeline" aria-label="Dealer OS workflow timeline">
              <div className="split__timeline-step">
                <span className="split__timeline-num">Step 1</span>
                <p className="split__timeline-title">Reg + photos in</p>
                <p className="split__timeline-note">Upload photos and enter the reg.</p>
              </div>
              <div className="split__timeline-step">
                <span className="split__timeline-num">Step 2</span>
                <p className="split__timeline-title">Instant draft</p>
                <p className="split__timeline-note">Title, description, highlights and finance info generated automatically.</p>
              </div>
              <div className="split__timeline-step">
                <span className="split__timeline-num">Step 3</span>
                <p className="split__timeline-title">Publish everywhere</p>
                <p className="split__timeline-note">Listing goes live across marketplaces while leads flow into the inbox.</p>
              </div>
            </div>
          ) : null}
          {isDealerCard ? (
            <p className="split__reassurance">Full edit control with audit history on every listing.</p>
          ) : null}
          <p className="split__replaces">
            <strong>What this replaces:</strong> {replaces}
          </p>
        </div>
        <span className="split__card-media">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="split__image"
            loading="lazy"
            decoding="async"
          />
          {isDealerCard ? (
            <>
              <span className="split__os-overlay split__os-overlay--input">Photos uploaded • Reg detected</span>
              <span className="split__os-overlay split__os-overlay--draft">Generated listing preview</span>
          <span className="split__os-publish reveal-sm">
                <span className="split__os-publish-chip split__os-publish-chip--agnt">
                  <span className="split__os-agnt">AGNT</span>
                  <i>Live</i>
                </span>
                <span className="split__os-publish-chip">
                  <img src="/logo-carzone.svg" alt="Carzone logo" className="split__os-publish-logo logo-micro" loading="lazy" />
                  <i>Queued</i>
                </span>
                <span className="split__os-publish-chip">
                  <img src="/logo-donedeal.svg" alt="DoneDeal logo" className="split__os-publish-logo logo-micro" loading="lazy" />
                  <i>Live</i>
                </span>
                <span className="split__os-publish-chip">
                  <img src="/logo-carsie.svg" alt="Cars.ie logo" className="split__os-publish-logo logo-micro" loading="lazy" />
                  <i>Queued</i>
                </span>
              </span>
              <span className="split__os-lead">
                <p>James • Dublin</p>
                <div>
                  <span className="split__os-lead-hot">HOT</span>
                  <small>Unlocked phone</small>
                </div>
              </span>
            </>
          ) : null}
        </span>
      </div>
    </article>
  );
}

export default function SplitSection() {
  const [ref, visible] = useReveal(0.12);

  return (
    <section className="split section" id="system" ref={ref}>
      <div className="split__accent-line" aria-hidden="true" />

      <div className="container">
        <div
          className="split__header reveal"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease-out',
          }}
        >
          <h2>The complete dealer stack</h2>
          <p className="split__sub">Website + Dealer OS. One system.</p>
        </div>

        <div className="split__grid">
          <SystemCard
            outcomeLabel="More calls"
            title="Premium dealer website"
            description="Built to turn stock views into calls, WhatsApps, finance leads, and trade-in valuations."
            bullets={[
              'Tap-to-call sticky bar (mobile)',
              'WhatsApp CTA (optional)',
              'Finance calculator placed where buyers decide',
              'Trade-in / valuation funnel',
              'Reserve / deposit button (optional)',
            ]}
            replaces="template sites + slow stock pages + missed calls."
            imageSrc="/car dealer website template.png"
            imageAlt="Premium dealer website interface showing stock and enquiry flow"
            visibleClass={visible ? 'split__card--visible' : ''}
          />

          <SystemCard
            outcomeLabel="Faster listings"
            title="Dealer OS"
            description="Turn reg + photos into a live listing — then publish everywhere and capture leads automatically."
            bullets={[
              'Reg + photos → instant listing draft',
              'Hot/Warm intent on every lead',
              'Edit once, publish everywhere',
              'Unified inbox for calls & enquiries',
            ]}
            replaces="spreadsheets + marketplace logins + missed enquiries"
            imageSrc="/car dealer dashbaord template.png"
            imageAlt="Dealer OS dashboard for listings, lead intent, and follow-up"
            visibleClass={visible ? 'split__card--visible' : ''}
          />
        </div>

        <div className={`split__publish-strip card-micro reveal-sm ${visible ? 'split__publish-strip--visible' : ''}`} aria-label="Publishing flow">
          <p className="split__publish-strip-title">Edit once, publish everywhere</p>
          <div className="split__publish-strip-flow">
            <span className="split__publish-chip split__publish-chip--agnt">AGNT</span>
            <i aria-hidden="true">→</i>
            <span className="split__publish-chip"><img className="logo-micro" src="/logo-carzone.svg" alt="Carzone logo" /></span>
            <i aria-hidden="true">→</i>
            <span className="split__publish-chip"><img className="logo-micro" src="/logo-donedeal.svg" alt="DoneDeal logo" /></span>
            <i aria-hidden="true">→</i>
            <span className="split__publish-chip"><img className="logo-micro" src="/logo-carsie.svg" alt="Cars.ie logo" /></span>
            <i aria-hidden="true">→</i>
            <span className="split__publish-chip split__publish-chip--site">+ your website</span>
          </div>
        </div>

      </div>
    </section>
  );
}
