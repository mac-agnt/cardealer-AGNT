import { useEffect, useMemo, useRef, useState } from 'react';
import BuilderHeader from './BuilderHeader';
import BuilderStepper from './BuilderStepper';
import BuilderSummary from './BuilderSummary';
import MobileSummaryDrawer from './MobileSummaryDrawer';
import {
  BUILDER_BASE_PACKAGE,
  BUILDER_FEATURES,
  BUILDER_PHASES,
  MONTHLY_BASE_WEBSITE_ONLY,
  MONTHLY_WEBSITE_PLUS_SOFTWARE,
} from './builderData';
import './BuildPage.css';

export default function BuildPage({ onBookDemo }) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [discountMonthly] = useState(0);
  const [features, setFeatures] = useState(BUILDER_FEATURES);
  const [tierHint, setTierHint] = useState('');
  const previousHasSoftware = useRef(true);

  const currentPhase = BUILDER_PHASES[phaseIndex];

  const enabledMap = useMemo(
    () => features.reduce((acc, feature) => ({ ...acc, [feature.id]: feature.enabled }), {}),
    [features],
  );

  const enabledFeatures = useMemo(
    () => features.filter((feature) => feature.enabled),
    [features],
  );

  const enabledWebsiteFeatures = useMemo(
    () => enabledFeatures.filter((feature) => feature.type === 'website'),
    [enabledFeatures],
  );

  const enabledSoftwareFeatures = useMemo(
    () => enabledFeatures.filter((feature) => feature.type === 'software'),
    [enabledFeatures],
  );

  const totalOneTime = useMemo(
    () => BUILDER_BASE_PACKAGE.basePrice + enabledFeatures.reduce((sum, feature) => sum + feature.priceOneTime, 0),
    [enabledFeatures],
  );

  const hasSoftware = useMemo(
    () => enabledSoftwareFeatures.length > 0,
    [enabledSoftwareFeatures]
  );

  const totalMonthly = useMemo(
    () => (hasSoftware ? MONTHLY_WEBSITE_PLUS_SOFTWARE : MONTHLY_BASE_WEBSITE_ONLY),
    [hasSoftware]
  );

  const finalMonthly = Math.max(totalMonthly - discountMonthly, 0);
  const websiteOneTime = useMemo(
    () => BUILDER_BASE_PACKAGE.basePrice + enabledWebsiteFeatures.reduce((sum, feature) => sum + feature.priceOneTime, 0),
    [enabledWebsiteFeatures],
  );
  const softwareOneTime = useMemo(
    () => enabledSoftwareFeatures.reduce((sum, feature) => sum + feature.priceOneTime, 0),
    [enabledSoftwareFeatures],
  );
  const softwareMonthly = hasSoftware ? Math.max(MONTHLY_WEBSITE_PLUS_SOFTWARE - MONTHLY_BASE_WEBSITE_ONLY, 0) : 0;

  useEffect(() => {
    if (previousHasSoftware.current && !hasSoftware) {
      setTierHint('Software removed — monthly returns to EUR200/mo.');
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

  const focusDoneActions = () => {
    const scrollToTarget = () => {
      const target = document.getElementById('build-done-actions');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    if (window.innerWidth < 980) {
      setDrawerOpen(true);
      window.setTimeout(scrollToTarget, 60);
      return;
    }

    scrollToTarget();
  };

  const goNext = () => {
    const isLastPhase = phaseIndex === BUILDER_PHASES.length - 1;
    if (isLastPhase) {
      focusDoneActions();
      return;
    }
    setPhaseIndex((prev) => Math.min(prev + 1, BUILDER_PHASES.length - 1));
  };
  const goBack = () => setPhaseIndex((prev) => Math.max(prev - 1, 0));

  return (
    <div className="build-page">
      <BuilderHeader
        phaseIndex={phaseIndex}
        totalPhases={BUILDER_PHASES.length}
        totalOneTime={totalOneTime}
        discountMonthly={discountMonthly}
        finalMonthly={finalMonthly}
        hasSoftware={hasSoftware}
        websiteOneTime={websiteOneTime}
        softwareOneTime={softwareOneTime}
        softwareMonthly={softwareMonthly}
      />

      <main className="section build-page__body">
        <div className="container build-page__grid">
          <section className="build-page__main">
            <BuilderStepper
              phase={currentPhase}
              phaseIndex={phaseIndex}
              totalPhases={BUILDER_PHASES.length}
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
              baseOneTime={BUILDER_BASE_PACKAGE.basePrice}
              websiteOneTime={websiteOneTime}
              softwareOneTime={softwareOneTime}
              softwareMonthly={softwareMonthly}
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
        websiteOneTime={websiteOneTime}
        softwareOneTime={softwareOneTime}
        softwareMonthly={softwareMonthly}
        tierHint={tierHint}
        onBookDemo={onBookDemo}
      />
    </div>
  );
}
