import { useEffect, useMemo, useRef, useState } from 'react';
import BuilderHeader from './BuilderHeader';
import BuilderStepper from './BuilderStepper';
import BuilderSummary from './BuilderSummary';
import MobileSummaryDrawer from './MobileSummaryDrawer';
import {
  BUILDER_BASE_PACKAGE,
  BUILDER_FEATURES,
  BUILDER_STEPS,
  MONTHLY_BASE_WEBSITE_ONLY,
  MONTHLY_WEBSITE_PLUS_SOFTWARE,
  DEFAULT_SOFTWARE_PRESELECT_IDS,
} from './builderData';
import './BuildPage.css';

export default function BuildPage({ onBookDemo }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [discountMonthly] = useState(0);
  const [features, setFeatures] = useState(() =>
    BUILDER_FEATURES.map((feature) => ({
      ...feature,
      enabled: DEFAULT_SOFTWARE_PRESELECT_IDS.has(feature.id),
    }))
  );
  const [tierHint, setTierHint] = useState('');
  const previousHasSoftware = useRef(true);

  const currentStep = BUILDER_STEPS[stepIndex];

  const enabledMap = useMemo(
    () => features.reduce((acc, feature) => ({ ...acc, [feature.id]: feature.enabled }), {}),
    [features],
  );

  const enabledFeatures = useMemo(
    () => features.filter((feature) => feature.enabled),
    [features],
  );

  const totalOneTime = useMemo(
    () => BUILDER_BASE_PACKAGE.basePrice + enabledFeatures.reduce((sum, feature) => sum + feature.priceOneTime, 0),
    [enabledFeatures],
  );

  const hasSoftware = useMemo(
    () => enabledFeatures.some((feature) => feature.type === 'software'),
    [enabledFeatures]
  );

  const totalMonthly = useMemo(
    () => (hasSoftware ? MONTHLY_WEBSITE_PLUS_SOFTWARE : MONTHLY_BASE_WEBSITE_ONLY),
    [hasSoftware]
  );

  const finalMonthly = Math.max(totalMonthly - discountMonthly, 0);

  useEffect(() => {
    if (previousHasSoftware.current && !hasSoftware) {
      setTierHint('Software removed — monthly returns to €200/mo.');
      const timer = window.setTimeout(() => setTierHint(''), 2800);
      previousHasSoftware.current = hasSoftware;
      return () => window.clearTimeout(timer);
    }
    previousHasSoftware.current = hasSoftware;
    return undefined;
  }, [hasSoftware]);

  const toggleFeature = (id) => {
    setFeatures((prev) => prev.map((feature) => (feature.id === id ? { ...feature, enabled: !feature.enabled } : feature)));
  };

  const goNext = () => setStepIndex((prev) => Math.min(prev + 1, BUILDER_STEPS.length - 1));
  const goBack = () => setStepIndex((prev) => Math.max(prev - 1, 0));

  return (
    <div className="build-page">
      <BuilderHeader
        stepIndex={stepIndex}
        totalSteps={BUILDER_STEPS.length}
        totalOneTime={totalOneTime}
        totalMonthly={totalMonthly}
        discountMonthly={discountMonthly}
        finalMonthly={finalMonthly}
        hasSoftware={hasSoftware}
      />

      <main className="section build-page__body">
        <div className="container build-page__grid">
          <section className="build-page__main">
            <BuilderStepper
              step={currentStep}
              stepIndex={stepIndex}
              totalSteps={BUILDER_STEPS.length}
              enabledMap={enabledMap}
              onToggleFeature={toggleFeature}
              onBack={goBack}
              onContinue={goNext}
            />
          </section>

          <aside className="build-page__aside">
            <BuilderSummary
              enabledFeatures={enabledFeatures}
              totalOneTime={totalOneTime}
              totalMonthly={totalMonthly}
              discountMonthly={discountMonthly}
              finalMonthly={finalMonthly}
              hasSoftware={hasSoftware}
              baseMonthly={MONTHLY_BASE_WEBSITE_ONLY}
              tierHint={tierHint}
              onBookDemo={onBookDemo}
            />
          </aside>
        </div>
      </main>

      <MobileSummaryDrawer
        open={drawerOpen}
        onOpen={() => setDrawerOpen(true)}
        onClose={() => setDrawerOpen(false)}
        enabledFeatures={enabledFeatures}
        totalOneTime={totalOneTime}
        totalMonthly={totalMonthly}
        discountMonthly={discountMonthly}
        finalMonthly={finalMonthly}
        hasSoftware={hasSoftware}
        baseMonthly={MONTHLY_BASE_WEBSITE_ONLY}
        baseOneTime={BUILDER_BASE_PACKAGE.basePrice}
        tierHint={tierHint}
        onBookDemo={onBookDemo}
      />
    </div>
  );
}
