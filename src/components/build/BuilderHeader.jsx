import React from 'react';
import { Link } from 'react-router-dom';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);

export default function BuilderHeader({
  phaseIndex,
  totalPhases,
  totalOneTime,
  discountMonthly,
  finalMonthly,
  hasSoftware,
  websiteOneTime,
  softwareOneTime,
  softwareMonthly,
}) {
  const safeOneTime = Number.isFinite(totalOneTime) ? totalOneTime : 0;
  const safeMonthly = Number.isFinite(finalMonthly) ? finalMonthly : 0;

  return (
    <header className="build-header">
      <div className="container build-header__inner">
        <Link to="/spec" className="build-header__back">{'← Back to /spec'}</Link>
        <div className="build-header__title">
          <p>Build your system</p>
          <span>{`Phase ${phaseIndex + 1} of ${totalPhases} • Website first, software second`}</span>
        </div>
        <div className="build-header__totals">
          <strong>{`Current total ${formatCurrency(safeOneTime)}`}</strong>
          <span>{`€${safeMonthly}/mo`}</span>
          <small>{`Website ${formatCurrency(websiteOneTime)} • Software ${formatCurrency(softwareOneTime)}`}</small>
          <small>{hasSoftware ? `Software monthly ${formatCurrency(softwareMonthly)}/mo` : 'Software monthly €0/mo'}</small>
          {discountMonthly > 0 ? <small className="build-header__monthly">{`Discount €${discountMonthly}/mo`}</small> : null}
        </div>
      </div>
    </header>
  );
}
