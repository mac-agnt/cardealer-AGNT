import { useEffect, useMemo, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import './NewestFeatureUnifiedInbox.css';

const FEATURES = [
  {
    id: 'inbox',
    label: 'Unified Inbox',
    benefit: 'All your enquiries in one feed — with clear ownership.',
    bullets: [
      'WhatsApp, website and email together',
      'Assign, tag and track every thread',
      'Keep Hot leads pinned automatically',
    ],
    previewType: 'inbox',
  },
  {
    id: 'publisher',
    label: 'Publish Everywhere',
    benefit: 'Edit once in AGNT — push updates to every platform.',
    bullets: [
      'One change updates all listings',
      'Status per platform (Live / Queued)',
      'Website + Carzone + DoneDeal + Cars.ie',
    ],
    previewType: 'publisher',
  },
  {
    id: 'intent',
    label: 'Intent Signals',
    benefit: 'See who’s serious before you pick up the phone.',
    bullets: [
      'Hot / Warm labels per lead',
      'Surface buyers likely to convert',
      'Prioritise follow-up in minutes',
    ],
    previewType: 'intent',
  },
  {
    id: 'draft',
    label: 'Instant Drafts',
    benefit: 'Reg + photos in — listing draft out.',
    bullets: [
      'Auto title, highlights and description',
      'Ready to edit in seconds',
      'Standardised layout across stock',
    ],
    previewType: 'draft',
  },
  {
    id: 'unlock',
    label: 'Buyer Detail Unlock',
    benefit: 'Capture real buyer details — not anonymous clicks.',
    bullets: [
      'Name + phone captured with consent',
      'More usable leads, less time-wasters',
      'Works seamlessly on mobile',
    ],
    previewType: 'unlock',
  },
];

function InboxPreview() {
  return (
    <div className="update-preview__inner update-preview__inner--two-col">
      <div className="update-preview__list">
        {[
          ['CD', 'Conor Doyle', 'Still available for Saturday?', '11:42', 'Hot'],
          ['MO', "Mary O'Neill", 'Can you send 48 month options?', '10:18', 'Warm'],
          ['LM', 'Liam Murphy', 'I can call in around 6pm.', '09:56', 'Hot'],
          ['SK', 'Sarah Keane', 'Trade-in accepted on this model?', 'Yesterday', 'Warm'],
        ].map(([initials, name, preview, time, tag]) => (
          <article key={name} className={`update-thread ${name === 'Conor Doyle' ? 'is-active' : ''}`}>
            <span className="update-avatar">{initials}</span>
            <div className="update-thread__meta">
              <p>{name}</p>
              <span>{preview}</span>
            </div>
            <div className="update-thread__side">
              <small>{time}</small>
              <i className={`update-chip ${tag === 'Hot' ? 'is-hot' : 'is-warm'}`}>{tag}</i>
            </div>
          </article>
        ))}
      </div>
      <div className="update-preview__panel">
        <header>
          <p>Conor Doyle</p>
          <small>WhatsApp enquiry</small>
        </header>
        <div className="update-bubbles">
          <p className="is-in">Still available for Saturday viewing?</p>
          <p className="is-out">Yes, I can hold it and send monthly options now.</p>
          <p className="is-in">Perfect. Can you send 36/48 month examples?</p>
        </div>
        <div className="update-assist">
          <span>AI suggested reply</span>
          <p>I can send both options now and reserve a Saturday slot for you.</p>
        </div>
        <div className="update-input" aria-hidden="true">
          <span>Type your reply...</span>
          <button type="button" disabled>Send</button>
        </div>
      </div>
    </div>
  );
}

function PublisherPreview() {
  return (
    <div className="update-preview__inner">
      <div className="update-publisher">
        <section>
          <p className="update-kicker">Edit once, publish everywhere</p>
          <h4>BMW 320d M Sport Auto 2021</h4>
          <ul>
            <li>Price updated to €31,950</li>
            <li>Monthly from €596</li>
            <li>New walkaround attached</li>
          </ul>
        </section>
        <section className="update-publisher__platforms">
          {[
            ['Website', 'Live'],
            ['Carzone', 'Queued'],
            ['DoneDeal', 'Live'],
            ['Cars.ie', 'Queued'],
          ].map(([platform, state]) => (
            <div key={platform} className="update-platform-row">
              <span>{platform}</span>
              <i className={`update-chip ${state === 'Live' ? 'is-live' : 'is-queued'}`}>{state}</i>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

function IntentPreview() {
  const leads = [
    {
      intent: 'HOT',
      buyer: 'Sarah Keane',
      vehicle: '2019 BMW 520d M Sport',
      time: '2m ago',
      sources: ['call', 'finance'],
      phone: '+353 87 321 9081',
      email: 'sarah.keane@email.com',
      sourceLabel: 'Finance click',
      lastActivity: '2m ago',
    },
    {
      intent: 'WARM',
      buyer: 'James Doyle',
      vehicle: '2018 Audi A4 S-Line',
      time: '14m ago',
      sources: ['form'],
      phone: '+353 86 992 4420',
      email: 'james.doyle@email.com',
      sourceLabel: 'Form enquiry',
      lastActivity: '14m ago',
    },
    {
      intent: 'HOT',
      buyer: 'Liam Murphy',
      vehicle: '2020 VW Golf GTD',
      time: '27m ago',
      sources: ['call', 'form'],
      phone: '+353 85 740 1159',
      email: 'liam.murphy@email.com',
      sourceLabel: 'Call + form',
      lastActivity: '27m ago',
    },
  ];

  const selected = leads[0];

  const SourceIcon = ({ type }) => {
    if (type === 'call') {
      return (
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M3.2 2.7h2.2l1 2.5-1.3 1.3c.5 1 1.1 1.8 1.8 2.6.8.8 1.7 1.4 2.7 1.8l1.2-1.2 2.6 1v2.2c0 .5-.4.9-.9.9-2.6 0-5.1-1-6.9-2.9-1.9-1.9-3-4.3-3-7 0-.5.4-.9.9-.9Z" />
        </svg>
      );
    }
    if (type === 'form') {
      return (
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M4 3.5h8m-8 3h8M4 9.5h5M3.5 2.5h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d="M5 2.5h6v11H5v-11Zm3 2v2m-1.8 4h3.6M6.2 12h3.6" />
      </svg>
    );
  };

  return (
    <div className="update-preview__inner">
      <div className="update-intent-workspace">
        <div className="update-intent-list">
          {leads.map((lead, index) => (
            <article key={lead.buyer} className={`update-intent-item ${index === 0 ? 'is-selected' : ''}`}>
              <div className="update-intent-item__top">
                <i className={`update-intent-badge ${lead.intent === 'HOT' ? 'is-hot' : 'is-warm'}`}>{lead.intent}</i>
                <small>{lead.time}</small>
              </div>
              <p className="update-intent-item__vehicle">{lead.vehicle}</p>
              <div className="update-intent-item__meta">
                <span>{lead.buyer}</span>
                <div className="update-intent-item__sources">
                  {lead.sources.map((source) => (
                    <i key={`${lead.buyer}-${source}`} className="update-source-chip" aria-label={source}>
                      <SourceIcon type={source} />
                    </i>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="update-intent-detail">
          <header>
            <div>
              <p>{selected.vehicle}</p>
              <span>{selected.buyer}</span>
            </div>
            <i className="update-intent-badge is-hot">HOT</i>
          </header>

          <dl className="update-intent-detail__grid">
            <div>
              <dt>Phone</dt>
              <dd>{selected.phone}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{selected.email}</dd>
            </div>
            <div>
              <dt>Source</dt>
              <dd>{selected.sourceLabel}</dd>
            </div>
            <div>
              <dt>Last activity</dt>
              <dd>{selected.lastActivity}</dd>
            </div>
          </dl>

          <div className="update-intent-actions">
            <p>What to do next</p>
            <div className="update-intent-actions__buttons">
              <button type="button">Call now</button>
              <button type="button">Text</button>
              <button type="button">Send finance pack</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DraftPreview() {
  return (
    <div className="update-preview__inner">
      <div className="update-draft">
        <div className="update-draft__head">
          <span>Reg + Photos input</span>
          <strong>152-D-24831 · 24 photos</strong>
        </div>
        <article className="update-draft__card">
          <p className="update-kicker">Generated Draft</p>
          <h4>2015 BMW 320d M Sport Automatic · Full Service History</h4>
          <p>Clean M Sport spec with heated leather, nav, reversing sensors, and fresh NCT.</p>
          <ul>
            <li>117,000 km</li>
            <li>Finance from €249/month</li>
            <li>Trade-ins considered</li>
          </ul>
        </article>
      </div>
    </div>
  );
}

function UnlockPreview() {
  return (
    <div className="update-preview__inner">
      <div className="update-unlock">
        <article>
          <p className="update-kicker">Buyer Details Captured</p>
          <h4>Vehicle Details Unlock</h4>
          <dl>
            <div>
              <dt>Name</dt>
              <dd>Sarah Keane</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>+353 87 123 4567</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>sarah.keane@email.com</dd>
            </div>
          </dl>
          <small>Consent captured for follow-up and finance communication.</small>
        </article>
      </div>
    </div>
  );
}

function PreviewByType({ type }) {
  if (type === 'publisher') return <PublisherPreview />;
  if (type === 'intent') return <IntentPreview />;
  if (type === 'draft') return <DraftPreview />;
  if (type === 'unlock') return <UnlockPreview />;
  return <InboxPreview />;
}

export default function NewestFeatureUnifiedInbox({ onBookDemo }) {
  const [ref, visible] = useReveal(0.12);
  const [activeId, setActiveId] = useState(FEATURES[0].id);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const activeFeature = useMemo(
    () => FEATURES.find((item) => item.id === activeId) ?? FEATURES[0],
    [activeId],
  );

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setReducedMotion(media.matches);
    handleChange();
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion || paused) return undefined;
    const timer = window.setInterval(() => {
      setActiveId((prev) => {
        const currentIndex = FEATURES.findIndex((item) => item.id === prev);
        const nextIndex = (currentIndex + 1) % FEATURES.length;
        return FEATURES[nextIndex].id;
      });
    }, 7000); // 7 second rotation
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  return (
    <section className="feature-updates section" id="feature-updates" ref={ref}>
      <div className="container">
        <header className={`feature-updates__header ${visible ? 'is-visible' : ''}`}>
          <h2>Signature features that reduce admin and increase calls.</h2>
          <p>Built around how independent dealerships actually list, publish, and follow up.</p>
        </header>

        <div
          className={`feature-updates__tabs-wrap ${visible ? 'is-visible' : ''}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="feature-updates__tabs" role="tablist" aria-label="Signature features">
            {FEATURES.map((feature) => {
              const isActive = feature.id === activeId;
              return (
                <button
                  key={feature.id}
                  type="button"
                  role="tab"
                  className={`feature-chip btn-micro ${isActive ? 'is-active' : ''}`}
                  aria-selected={isActive}
                  aria-label={`View ${feature.label}`}
                  onClick={() => setActiveId(feature.id)}
                >
                  {feature.label}
                </button>
              );
            })}
          </div>
          <div className="feature-updates__progress-track" aria-hidden="true">
            <span
              key={activeId}
              className={`feature-updates__progress-fill ${paused ? 'is-paused' : ''}`}
            />
          </div>
        </div>

        <div className={`feature-updates__content ${visible ? 'is-visible' : ''}`}>
          <div className="feature-updates__copy" key={activeFeature.id}>
            <p className="feature-updates__benefit">{activeFeature.benefit}</p>
            <ul>
              {activeFeature.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <button className="btn btn-secondary btn-micro" onClick={onBookDemo} type="button" aria-label="Book a 10-minute demo">Book a 10-minute demo</button>
          </div>

          <div className="feature-updates__preview" key={`${activeFeature.id}-preview`}>
            <article className="update-preview-frame card-micro" aria-label={`${activeFeature.title} preview`}>
              <header>
                <p>{activeFeature.label}</p>
                <span>Live preview</span>
              </header>
              <PreviewByType type={activeFeature.previewType} />
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
