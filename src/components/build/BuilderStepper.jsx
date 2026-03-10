import React from 'react';
import FeatureToggleRow from './FeatureToggleRow';

export default function BuilderStepper({
  phase,
  phaseIndex,
  totalPhases,
  enabledMap,
  onToggleFeature,
  onBack,
  onContinue,
}) {
  const nextPhaseIndex = Math.min(phaseIndex + 2, totalPhases);
  const isFirstPhase = phaseIndex === 0;
  const isLastPhase = phaseIndex === totalPhases - 1;

  return (
    <article className="build-stepper card">
      <p className="build-stepper__progress">
        {`${String(phaseIndex + 1).padStart(2, '0')} / ${String(totalPhases).padStart(2, '0')}`}
      </p>
      <h2>{phase.title}</h2>
      <p className="build-stepper__subtitle">{phase.subtitle}</p>
      <p className="build-stepper__default-note">Your build starts fully loaded. Untick anything you do not need.</p>

      <div className="build-stepper__rows">
        {phase.sections.map((section) => (
          <section key={section.id} className="build-stepper__section">
            <h3>{section.title}</h3>
            <p>{section.subtitle}</p>
            <div className="build-stepper__section-rows">
              {section.features.map((feature) => (
                <FeatureToggleRow
                  key={feature.id}
                  feature={feature}
                  enabled={!!enabledMap[feature.id]}
                  onToggle={() => onToggleFeature(feature.id)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="build-stepper__actions">
        {!isFirstPhase ? (
          <button type="button" className="build-stepper__back" onClick={onBack}>
            Back
          </button>
        ) : <span />}
        <button type="button" className="btn btn-primary build-stepper__continue" onClick={onContinue}>
          {isLastPhase
            ? 'Review your totals'
            : `Continue to phase ${String(nextPhaseIndex).padStart(2, '0')}`}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
}
