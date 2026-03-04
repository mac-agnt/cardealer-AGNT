import React from 'react';
import BuilderSummary from './BuilderSummary';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);

export default function MobileSummaryDrawer({
  open,
  onOpen,
  onClose,
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
}) {
  return (
    <>
      <div className="build-mobile-bar">
        <strong>{`Total ${formatCurrency(totalOneTime)}`}</strong>
        <button type="button" onClick={onOpen}>View build</button>
      </div>

      {open ? (
        <div className="build-drawer__overlay" onClick={onClose}>
          <div className="build-drawer" onClick={(event) => event.stopPropagation()}>
            <div className="build-drawer__head">
              <h3>Your Build</h3>
              <button type="button" onClick={onClose}>Close</button>
            </div>
            <div className="build-drawer__body">
              <BuilderSummary
                enabledFeatures={enabledFeatures}
                totalOneTime={totalOneTime}
                totalMonthly={totalMonthly}
                discountMonthly={discountMonthly}
                finalMonthly={finalMonthly}
                hasSoftware={hasSoftware}
                baseMonthly={baseMonthly}
                baseOneTime={baseOneTime}
                tierHint={tierHint}
                onBookDemo={onBookDemo}
                compact
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
