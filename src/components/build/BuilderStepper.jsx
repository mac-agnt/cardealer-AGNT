import React from 'react';
import FeatureToggleRow from './FeatureToggleRow';

export default function BuilderStepper({
  step,
  stepIndex,
  totalSteps,
  enabledMap,
  onToggleFeature,
  onBack,
  onContinue,
}) {
  const nextStepIndex = Math.min(stepIndex + 2, totalSteps);
  const isFirstStep = stepIndex === 0;

  return (
    <article className="build-stepper card">
      <p className="build-stepper__progress">
        {`${String(stepIndex + 1).padStart(2, '0')} / ${String(totalSteps).padStart(2, '0')}`}
      </p>
      <h2>{step.title}</h2>
      <p className="build-stepper__subtitle">{step.subtitle}</p>

      <div className="build-stepper__rows">
        {step.features.map((feature) => (
          <FeatureToggleRow
            key={feature.id}
            feature={feature}
            enabled={!!enabledMap[feature.id]}
            onToggle={() => onToggleFeature(feature.id)}
          />
        ))}
      </div>

      <div className="build-stepper__actions">
        {!isFirstStep ? (
          <button type="button" className="build-stepper__back" onClick={onBack}>
            Back
          </button>
        ) : <span />}
        <button type="button" className="btn btn-primary build-stepper__continue" onClick={onContinue}>
          {`Continue (${String(nextStepIndex).padStart(2, '0')}/${String(totalSteps).padStart(2, '0')})`}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
}
