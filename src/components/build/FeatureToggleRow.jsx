import React from 'react';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);

export default function FeatureToggleRow({ feature, enabled, onToggle }) {
  return (
    <button
      type="button"
      className={`build-feature-row ${enabled ? 'is-enabled' : ''}`}
      onClick={onToggle}
      role="switch"
      aria-checked={enabled}
      aria-label={`${feature.name} ${enabled ? 'enabled' : 'disabled'}`}
    >
      <div className="build-feature-row__copy">
        <p className="featureLabel">{feature.name}</p>
        <span className="featureLabel">{feature.description}</span>
      </div>
      <div className="build-feature-row__meta">
        <strong>{formatCurrency(feature.priceOneTime)}</strong>
        <span className={`build-feature-row__toggle ${enabled ? 'is-on' : 'is-off'}`}>
          <i />
        </span>
      </div>
    </button>
  );
}
