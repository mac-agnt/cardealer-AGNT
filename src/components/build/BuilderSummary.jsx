import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);

export default function BuilderSummary({
  enabledFeatures,
  totalOneTime,
  discountMonthly,
  finalMonthly,
  hasSoftware,
  baseOneTime,
  websiteOneTime,
  softwareOneTime,
  softwareMonthly,
  tierHint,
  compact = false,
}) {
  const [success, setSuccess] = useState('');
  const [chooserOpen, setChooserOpen] = useState(false);

  const safeTotalOneTime = Number.isFinite(totalOneTime) ? totalOneTime : 0;
  const safeFinalMonthly = Number.isFinite(finalMonthly) ? finalMonthly : 0;
  const safeWebsiteOneTime = Number.isFinite(websiteOneTime) ? websiteOneTime : baseOneTime;
  const safeSoftwareOneTime = Number.isFinite(softwareOneTime) ? softwareOneTime : 0;
  const safeSoftwareMonthly = Number.isFinite(softwareMonthly) ? softwareMonthly : 0;
  const specPayload = useMemo(
    () => ({
      package: {
        name: 'Brochure website',
        oneTime: baseOneTime,
      },
      tier: hasSoftware ? 'website_plus_software' : 'website_only',
      modules: enabledFeatures.map((feature) => ({
        id: feature.id,
        name: feature.name,
        type: feature.type,
        oneTime: feature.priceOneTime,
      })),
      totals: {
        websiteOneTime: safeWebsiteOneTime,
        softwareOneTime: safeSoftwareOneTime,
        oneTimeTotal: safeTotalOneTime,
        monthlyTotal: safeFinalMonthly,
      },
      timestamp: new Date().toISOString(),
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
    }),
    [
      baseOneTime,
      hasSoftware,
      enabledFeatures,
      safeWebsiteOneTime,
      safeSoftwareOneTime,
      safeTotalOneTime,
      safeFinalMonthly,
    ],
  );

  const featureSummary = useMemo(
    () => (enabledFeatures.length
      ? enabledFeatures.map((feature) => `- ${feature.name}`).join('\n')
      : '- No optional modules selected'),
    [enabledFeatures],
  );

  const buildMessage = useMemo(
    () => [
      'Hi AGNT,',
      '',
      "I'd like to discuss the following dealership setup:",
      '',
      `Package: ${hasSoftware ? 'Dealer Pro' : 'Base Site'}`,
      'Website: Yes',
      `Website total: ${formatCurrency(safeWebsiteOneTime)} one-time`,
      `Software total: ${formatCurrency(safeSoftwareOneTime)} one-time`,
      `Monthly total: €${safeFinalMonthly}/mo`,
      '',
      'Selected features:',
      featureSummary,
      '',
      'Dealership name:',
      'Location:',
      'Stock size:',
      '',
      'Please let me know the next steps.',
    ].join('\n'),
    [featureSummary, hasSoftware, safeWebsiteOneTime, safeSoftwareOneTime, safeFinalMonthly],
  );

  const buildMailtoHref = useMemo(() => (
    `mailto:info@agnt.ie?subject=${encodeURIComponent('Dealership system setup enquiry')}&body=${encodeURIComponent(buildMessage)}`
  ), [buildMessage]);

  const buildWhatsAppHref = useMemo(() => (
    `https://wa.me/353830828731?text=${encodeURIComponent(buildMessage)}`
  ), [buildMessage]);

  useEffect(() => {
    if (!chooserOpen) return undefined;

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [chooserOpen]);

  const openChooser = () => {
    setChooserOpen(true);
  };

  const handleChannelSelect = () => {
    console.log('build-spec-submit', specPayload);
    setSuccess('Build details loaded. Send via your selected channel.');
    setChooserOpen(false);
  };

  return (
    <aside className={`build-summary card ${compact ? 'is-compact' : ''}`}>
      <h3>Your Build</h3>
      <div className="build-summary__section">
        <p className="build-summary__label">Included</p>
        <ul className="build-summary__features">
          {enabledFeatures.map((feature) => (
            <li key={feature.id}>
              <span>{feature.name}</span>
              <strong>{formatCurrency(feature.priceOneTime)}</strong>
            </li>
          ))}
        </ul>
      </div>

      <div className="build-summary__section">
        <p className="build-summary__label">Pricing</p>
        <div className="build-summary__totals-grid">
          <div className="build-summary__total-card">
            <span>One-time total</span>
            <strong>{formatCurrency(safeTotalOneTime)}</strong>
            <small>Includes brochure site + selected build</small>
          </div>
          <div className="build-summary__total-card">
            <span>Final monthly</span>
            <strong>{`€${safeFinalMonthly}/mo`}</strong>
            <small>{hasSoftware ? 'Includes software platform access' : 'Website-only monthly access'}</small>
          </div>
        </div>
        <div className="build-summary__breakdown">
          <div className="build-summary__row">
            <span>Website total</span>
            <strong>{`${formatCurrency(safeWebsiteOneTime)} one-time`}</strong>
          </div>
          <div className="build-summary__row">
            <span>Software total</span>
            <strong>{`${formatCurrency(safeSoftwareOneTime)} one-time`}</strong>
          </div>
          <div className="build-summary__row">
            <span>Software monthly</span>
            <strong>{hasSoftware ? `€${safeSoftwareMonthly}/mo` : '€0/mo'}</strong>
          </div>
          <div className="build-summary__row">
            <span>Discounts</span>
            <strong>{discountMonthly > 0 ? `€${discountMonthly}/mo` : '—'}</strong>
          </div>
        </div>
        <p className="build-summary__monthly-note">Monthly is €200/mo for website only, and €394/mo when any software module is included.</p>
        {tierHint ? <p className="build-summary__tier-hint">{tierHint}</p> : null}
      </div>

      <div className="build-summary__section build-summary__sheet" id="build-done-actions">
        <h4 className="build-summary__done">You’re done.</h4>
        <p className="build-summary__done-sub">Send your build and we’ll confirm delivery and next steps.</p>
        {!compact ? (
          <div className="build-summary__sheet-totals">
            <p><span>Website</span><strong>{`${formatCurrency(safeWebsiteOneTime)} one-time`}</strong></p>
            <p><span>Software</span><strong>{`${formatCurrency(safeSoftwareOneTime)} one-time`}</strong></p>
            <p><span>Total</span><strong>{formatCurrency(safeTotalOneTime)}</strong></p>
            <p><span>Monthly</span><strong>{`€${safeFinalMonthly}/mo`}</strong></p>
          </div>
        ) : null}
        <div className="build-summary__cta-pair">
          <div className="build-summary__cta-primary-wrap">
            <button type="button" className="btn btn-primary" onClick={openChooser}>
              Send setup to AGNT
            </button>
            <p className="build-summary__cta-sub">We’ll review your build and contact you with next steps.</p>
          </div>
        </div>
        {success ? <p className="build-summary__success">{success}</p> : null}
      </div>

      {chooserOpen
        ? createPortal(
          <div className="build-summary__chooser-overlay">
            <div className="build-summary__chooser" role="dialog" aria-modal="true" aria-label="Send your setup">
              <h4>Send your setup</h4>
              <p>Choose how you&apos;d like to send your build.</p>
              <div className="build-summary__chooser-actions">
                <a href={buildMailtoHref} className="btn btn-secondary" onClick={handleChannelSelect}>Email us</a>
                <a
                  href={buildWhatsAppHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  onClick={handleChannelSelect}
                >
                  WhatsApp us
                </a>
              </div>
            </div>
          </div>,
          document.body,
        )
        : null}
    </aside>
  );
}
