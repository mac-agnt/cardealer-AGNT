import React, { useMemo, useRef, useState } from 'react';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);

export default function BuilderSummary({
  enabledFeatures,
  totalOneTime,
  totalMonthly,
  discountMonthly,
  finalMonthly,
  hasSoftware,
  baseMonthly,
  baseOneTime,
  tierHint,
  onBookDemo,
  compact = false,
}) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    dealership: '',
    website: '',
    stockVolume: '0–30',
    marketplaces: [],
    contactMethod: 'Email',
    preferredTime: 'Today',
    message: '',
  });
  const sheetRef = useRef(null);

  const tierLabel = hasSoftware ? 'Website + Software (€394/mo)' : 'Website-only (€200/mo)';

  const specText = useMemo(() => {
    const featuresText = enabledFeatures.length
      ? enabledFeatures.map((feature) => `- ${feature.name}: ${formatCurrency(feature.priceOneTime)}`).join('\n')
      : '- No optional modules selected';

    return [
      'Your AGNT Build Spec',
      `Date: ${new Date().toLocaleDateString('en-IE')}`,
      '',
      `Package: Brochure website (${formatCurrency(baseOneTime)} one-time, €${baseMonthly}/mo)`,
      `Tier: ${tierLabel}`,
      '',
      'Selected modules:',
      featuresText,
      '',
      `One-time total: ${formatCurrency(totalOneTime)}`,
      `Final monthly: €${finalMonthly}/mo`,
      '',
      'No contracts • Live in 5–7 days',
    ].join('\n');
  }, [enabledFeatures, totalOneTime, finalMonthly, baseOneTime, baseMonthly, tierLabel]);

  const openSheet = () => {
    setSheetOpen(true);
    requestAnimationFrame(() => {
      sheetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const copySpec = async () => {
    try {
      await navigator.clipboard.writeText(specText);
      setSuccess('Spec copied to clipboard.');
    } catch {
      setSuccess('Unable to copy right now.');
    }
  };

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSuccess('');
  };

  const toggleMarketplace = (name) => {
    setForm((prev) => {
      const exists = prev.marketplaces.includes(name);
      return {
        ...prev,
        marketplaces: exists
          ? prev.marketplaces.filter((item) => item !== name)
          : [...prev.marketplaces, name],
      };
    });
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Name is required.';
    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!/.+@.+\..+/.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid email.';
    }
    return nextErrors;
  };

  const submitSpec = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const payload = {
      contact: {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        dealership: form.dealership.trim(),
        website: form.website.trim(),
      },
      preferences: {
        contactMethod: form.contactMethod,
        preferredTime: form.preferredTime,
        stockVolume: form.stockVolume,
        marketplaces: form.marketplaces,
        message: form.message.trim(),
      },
      build: {
        package: {
          name: 'Brochure website',
          oneTime: baseOneTime,
          monthly: baseMonthly,
        },
        tier: hasSoftware ? 'website_plus_software' : 'website_only',
        monthlyTierPrice: hasSoftware ? 394 : 200,
        hasSoftware,
        modules: enabledFeatures.map((feature) => ({
          id: feature.id,
          name: feature.name,
          type: feature.type,
          priceOneTime: feature.priceOneTime,
          priceMonthly: feature.priceMonthly ?? 0,
        })),
        totals: {
          oneTimeTotal: totalOneTime,
          monthlyFinal: finalMonthly,
        },
      },
      timestamp: new Date().toISOString(),
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
    };

    console.log('build-spec-submit', payload);
    setSuccess('Spec sent. Typical reply within 2 hours.');
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
            <strong>{formatCurrency(totalOneTime)}</strong>
            <small>Includes brochure site + selected build</small>
          </div>
          <div className="build-summary__total-card">
            <span>Final monthly</span>
            <strong>{`€${finalMonthly}/mo`}</strong>
            <small>{hasSoftware ? 'Includes software platform access' : 'Website-only monthly access'}</small>
          </div>
        </div>
        <div className="build-summary__breakdown">
          <div className="build-summary__row">
            <span>Base package</span>
            <strong>{`${formatCurrency(baseOneTime)} + €${baseMonthly}/mo`}</strong>
          </div>
          <div className="build-summary__row">
            <span>Tier</span>
            <strong>{tierLabel}</strong>
          </div>
          <div className="build-summary__row">
            <span>Discounts</span>
            <strong>{discountMonthly > 0 ? `€${discountMonthly}/mo` : '—'}</strong>
          </div>
        </div>
        <p className="build-summary__monthly-note">Monthly switches to €394/mo when any software is included.</p>
        {tierHint ? <p className="build-summary__tier-hint">{tierHint}</p> : null}
      </div>

      {!compact ? (
        <div className="build-summary__section">
          <h4 className="build-summary__done">You’re done.</h4>
          <p className="build-summary__done-sub">Send your spec and we’ll reply with exact delivery + next steps.</p>
          <div className="build-summary__cta-pair">
            <button type="button" className="btn btn-primary" onClick={openSheet}>
              Send my spec for a quick quote
            </button>
            <button type="button" className="btn btn-secondary" onClick={onBookDemo}>
              Talk it through (10 min)
            </button>
          </div>
        </div>
      ) : null}

      {(sheetOpen || compact) ? (
        <div className="build-summary__section build-summary__sheet" ref={sheetRef}>
          <h4>Your AGNT Build Spec</h4>
          <p className="build-summary__sheet-date">{new Date().toLocaleDateString('en-IE')}</p>
          <div className="build-summary__sheet-block">
            <p>Package: Brochure website ({formatCurrency(baseOneTime)} one-time, €{baseMonthly}/mo)</p>
            <p>Tier: {tierLabel}</p>
          </div>
          <ul className="build-summary__sheet-list">
            {enabledFeatures.map((feature) => (
              <li key={`sheet-${feature.id}`}>
                <span>{feature.name}</span>
                <strong>{formatCurrency(feature.priceOneTime)}</strong>
              </li>
            ))}
          </ul>
          <div className="build-summary__sheet-totals">
            <p><span>One-time total</span><strong>{formatCurrency(totalOneTime)}</strong></p>
            <p><span>Final monthly</span><strong>{`€${finalMonthly}/mo`}</strong></p>
          </div>
          <p className="build-summary__sheet-disclaimer">No contracts • Live in 5–7 days</p>

          <form className="build-summary__contact" onSubmit={submitSpec}>
            <label>
              Name
              <input
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                aria-invalid={!!errors.name}
              />
              {errors.name ? <small>{errors.name}</small> : null}
            </label>
            <label>
              Email
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                aria-invalid={!!errors.email}
              />
              {errors.email ? <small>{errors.email}</small> : null}
            </label>
            <label>
              Phone (optional)
              <input value={form.phone} onChange={(e) => updateField('phone', e.target.value)} />
            </label>
            <label>
              Dealership name
              <input value={form.dealership} onChange={(e) => updateField('dealership', e.target.value)} />
            </label>
            <label>
              Website (optional)
              <input value={form.website} onChange={(e) => updateField('website', e.target.value)} />
            </label>
            <label>
              Stock volume
              <select value={form.stockVolume} onChange={(e) => updateField('stockVolume', e.target.value)}>
                <option>0–30</option>
                <option>30–80</option>
                <option>80–150</option>
                <option>150+</option>
              </select>
            </label>
            <div className="build-summary__segments">
              <p>Main marketplaces used</p>
              <div className="build-summary__checks">
                {['Carzone', 'DoneDeal', 'Cars.ie', 'Other'].map((market) => (
                  <label key={market} className="build-summary__check-item">
                    <input
                      type="checkbox"
                      checked={form.marketplaces.includes(market)}
                      onChange={() => toggleMarketplace(market)}
                    />
                    <span>{market}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="build-summary__segments">
              <p>Preferred contact method</p>
              <div>
                {['Call', 'WhatsApp', 'Email'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    className={form.contactMethod === method ? 'is-active' : ''}
                    onClick={() => updateField('contactMethod', method)}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div className="build-summary__segments">
              <p>Preferred time</p>
              <div>
                {['Today', 'Tomorrow', 'This week'].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={form.preferredTime === slot ? 'is-active' : ''}
                    onClick={() => updateField('preferredTime', slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <label>
              Message (optional)
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => updateField('message', e.target.value)}
              />
            </label>

            <div className="build-summary__sheet-actions">
              <button type="button" className="btn btn-secondary" onClick={copySpec}>
                Copy spec
              </button>
              <button type="submit" className="btn btn-primary">
                Send my spec
              </button>
              <button type="button" className="btn btn-secondary" onClick={onBookDemo}>
                Talk it through (10 min)
              </button>
            </div>
            <p className="build-summary__reply-time">Typical reply within 2 hours.</p>
            {success ? <p className="build-summary__success">{success}</p> : null}
          </form>
        </div>
      ) : null}
    </aside>
  );
}
