import MockVisual from './mocks/MockVisual';
import { isPhoneMock } from './mocks/mockRegistry';
import './ProductShowcase.css';

export const REVEALS = [
  {
    title: 'Retail-grade dealer website',
    caption:
      'Fully branded and built for buyers who compare: stock discovery, detailed vehicle pages, finance and trade-in paths, reservations, and direct WhatsApp or contact. A proper retail front end, with clear next steps from first search to enquiry, not a static brochure.',
    captionMobile:
      'Branded stock discovery, vehicle pages, finance, trade-in, reservations, and WhatsApp, built to convert, not to sit as a brochure.',
    visualLabel:
      '[PLACEHOLDER VISUAL: premium branded dealer website on desktop and mobile, stock cards, VDP, finance and enquiry paths]',
    layout: 'a',
    render: 'website',
    visualAlt:
      'Branded dealer website with stock discovery, vehicle detail, finance, and enquiry paths.',
  },
  {
    title: 'WhatsApp AI sales agent',
    caption:
      'Incoming messages answered in natural, dealer-appropriate language. It checks stock, answers vehicle questions, qualifies intent, books viewings or test drives, and passes the thread to your team the moment a human needs to own the deal, so conversations keep moving around the clock.',
    captionMobile:
      'AI answers WhatsApp in plain language: stock checks, qualification, bookings, then hands off cleanly when your team takes the deal.',
    visualLabel:
      '[PLACEHOLDER VISUAL: WhatsApp AI sales agent handling stock questions, booking a viewing, and handing off to staff]',
    layout: 'b',
    render: 'whatsapp',
    visualAlt: 'WhatsApp conversation where the AI agent answers, books a viewing, and hands off to staff.',
  },
  {
    title: 'Dealer app in the buyer’s pocket',
    caption:
      'Your stock, saved vehicles, trade-in valuations, service booking, and the live thread with your team, in a branded app. Buyers keep a route back to you between visits instead of drifting back to the portals.',
    captionMobile:
      'Branded app: stock, saved cars, trade-in value, service booking, and a live thread with your team.',
    visualLabel:
      '[PLACEHOLDER VISUAL: branded dealer app home with saved vehicle, quick actions, and activity feed]',
    layout: 'a',
    render: 'app',
    visualAlt: 'Branded dealer app showing saved stock, quick actions, and recent activity.',
  },
  {
    title: 'Customer profiles that keep context',
    caption:
      'One record per buyer or seller: what they asked, what they viewed, what they bought, what they traded in. Handovers stay factual; the next call or visit starts with context instead of guesswork or a filing cabinet.',
    captionMobile:
      'Every enquiry, view, purchase, and trade-in on one profile, so the next conversation starts with facts, not memory.',
    visualLabel:
      '[PLACEHOLDER VISUAL: customer profile with enquiry history, vehicle interest, trade-in and purchase records]',
    layout: 'b',
    render: 'customers',
    visualAlt:
      'Customer profile view with enquiry history, vehicles of interest, trade-in notes, and purchase context.',
  },
  {
    title: 'Digitised dealer documents',
    caption:
      'Invoices, receipts, trade-in agreements, sales contracts, vehicle declarations, and GDPR forms live against the right customer and vehicle. Less redoing admin because a form went missing, and no parallel paper trail outside the deal.',
    captionMobile:
      'Invoices, agreements, declarations, and GDPR, stored on the customer and vehicle, not lost in a drawer.',
    visualLabel:
      '[PLACEHOLDER VISUAL: digitised dealer paperwork linked to customer and vehicle records]',
    layout: 'a',
    render: 'documents',
    visualAlt: 'Digitised dealer documents and forms linked to a customer and vehicle record.',
  },
  {
    title: 'Import landed cost, before you price or promise',
    caption:
      'Paste a Japan, UK, or Northern Ireland source listing and see full landed economics for Ireland: shipping, insurance, duty, VAT, VRT, NOx, fees, and margin in one view. Know what the car really owes you before you buy stock or quote a buyer: clarity independents rarely get without a dedicated import desk.',
    captionMobile:
      'Japan, UK, or NI listings → full Irish landed cost: duties, VAT, VRT, NOx, fees, margin, before you buy or quote.',
    visualLabel:
      '[PLACEHOLDER VISUAL: import calculator with source URL, landed cost breakdown, tax logic, and margin view]',
    layout: 'b',
    render: 'import',
    visualAlt:
      'Import landed cost calculator with source listing, Irish duty, VAT, VRT, fees, and margin breakdown.',
  },
];

export function MobileFeatureSlide({ item }) {
  const hasVisual = Boolean(item.visualSrc) || Boolean(item.render);
  const stageClass = [
    'inside__slide-placeholder',
    hasVisual ? 'inside__slide-placeholder--image' : 'inside__stage--placeholder',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className="inside__slide" aria-label={item.title}>
      <div className={`inside__slide-card${hasVisual ? ' inside__slide-card--media' : ''}`}>
        <div
          className={stageClass}
          role={hasVisual ? undefined : 'img'}
          aria-label={hasVisual ? undefined : item.visualLabel}
        >
          {item.render ? (
            <div
              className={`inside__stage--mock inside__slide-mock${
                isPhoneMock(item.render) ? ' inside__stage--phone' : ''
              }`}
            >
              <MockVisual name={item.render} variant="slide" />
            </div>
          ) : hasVisual ? (
            <img
              src={item.visualSrc}
              alt={item.visualAlt}
              className="inside__slide-img"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <p className="inside__placeholder-label inside__placeholder-label--slide">{item.visualLabel}</p>
          )}
        </div>
        <div className="inside__slide-glass" aria-hidden="true" />
        <div className="inside__slide-overlay">
          <h3 className="inside__slide-title">{item.title}</h3>
          <p className="inside__slide-caption">{item.captionMobile}</p>
        </div>
      </div>
    </article>
  );
}

export default function ProductShowcase() {
  return (
    <section className="inside section" id="inside" aria-labelledby="inside-heading">
      <div className="container">
        <header className="inside__header reveal">
          <p className="section-label">Highlights</p>
          <h2 id="inside-heading" className="inside__title">
            Our <span className="text-gradient">unique selling points</span>
          </h2>
          <p className="inside__lede">
            The product strengths independents lean on: public site, WhatsApp coverage, buyer app, customer records,
            document discipline, and import economics you can price before you commit.
          </p>
        </header>

        <div className="inside__sequence inside__sequence--desktop">
          {REVEALS.map((item) => (
            <article
              key={item.title}
              className={`inside__reveal inside__reveal--${item.layout} reveal-sm`}
            >
              <div className="inside__copy">
                <h3 className="inside__reveal-title">{item.title}</h3>
                <p className="inside__reveal-caption">{item.caption}</p>
              </div>
              <div className="inside__frame inside__frame--media">
                {item.render ? (
                  <div
                    className={`inside__stage product-stage inside__stage--mock${
                      isPhoneMock(item.render) ? ' inside__stage--phone' : ''
                    }`}
                  >
                    <MockVisual name={item.render} variant="stage" />
                  </div>
                ) : item.visualSrc ? (
                  <div className="inside__stage product-stage inside__stage--visual">
                    <img
                      src={item.visualSrc}
                      alt={item.visualAlt}
                      className="inside__stage-img"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : (
                  <div
                    className="inside__stage product-stage inside__stage--placeholder"
                    role="img"
                    aria-label={item.visualLabel}
                  >
                    <p className="inside__placeholder-label">{item.visualLabel}</p>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="inside__ticker-wrap reveal-sm">
          <div
            className="inside__ticker-viewport"
            role="region"
            aria-label="AGNT product highlights, auto-playing reel"
          >
            <div className="inside__ticker-marquee" aria-live="off">
              <div className="inside__ticker-set">
                {REVEALS.map((item) => (
                  <MobileFeatureSlide key={`${item.title}-a`} item={item} />
                ))}
              </div>
              <div className="inside__ticker-set" aria-hidden="true">
                {REVEALS.map((item) => (
                  <MobileFeatureSlide key={`${item.title}-b`} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
