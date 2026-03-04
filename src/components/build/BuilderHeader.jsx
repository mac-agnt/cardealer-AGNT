import React from 'react';
import { Link } from 'react-router-dom';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);

export default function BuilderHeader({
  stepIndex,
  totalSteps,
  totalOneTime,
  totalMonthly,
  discountMonthly,
  finalMonthly,
  hasSoftware,
}) {
  return (
    <header className="build-header">
      <div className="container build-header__inner">
        <Link to="/spec" className="build-header__back">{'← Back to /spec'}</Link>
        <div className="build-header__title">
          <p>Build your system</p>
          <span>{`Step ${String(stepIndex + 1).padStart(2, '0')} of ${String(totalSteps).padStart(2, '0')}`}</span>
        </div>
        <div className="build-header__totals">
          <strong>{`Current total ${formatCurrency(totalOneTime)}`}</strong>
          <span>{`€${finalMonthly}/mo`}</span>
          {hasSoftware ? <small>Website + Software</small> : <small>Website only</small>}
          {discountMonthly > 0 ? <small className="build-header__monthly">{`Discount €${discountMonthly}/mo`}</small> : null}
        </div>
      </div>
    </header>
  );
}
