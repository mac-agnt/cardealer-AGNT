import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  QUESTIONS,
  PACKAGES,
  computePackageId,
  getResultNarrative,
  getLoadingStages,
} from './guidedSpecData';
import './BuildPage.css';

const TOTAL_Q = QUESTIONS.length;

export default function BuildPage({ onBookDemo }) {
  const [phase, setPhase] = useState('intro');
  const [answers, setAnswers] = useState({});
  const [matchedId, setMatchedId] = useState(null);
  const [loadingStage, setLoadingStage] = useState(0);

  const loadingStages = getLoadingStages();

  useEffect(() => {
    if (phase !== 'loading') return undefined;

    const reduced =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const totalMs = reduced ? 1200 : 8000;
    const stageMs = Math.max(400, Math.floor(totalMs / loadingStages.length));

    const stageTimer = window.setInterval(() => {
      setLoadingStage((i) => Math.min(i + 1, loadingStages.length - 1));
    }, stageMs);

    const done = window.setTimeout(() => {
      window.clearInterval(stageTimer);
      setPhase('result');
    }, totalMs);

    return () => {
      window.clearInterval(stageTimer);
      window.clearTimeout(done);
    };
  }, [phase, loadingStages.length]);

  const pickOption = (optionId) => {
    if (typeof phase !== 'number') return;
    const q = QUESTIONS[phase];
    const next = { ...answers, [q.id]: optionId };
    setAnswers(next);
    if (phase === TOTAL_Q - 1) {
      setMatchedId(computePackageId(next));
      setLoadingStage(0);
      setPhase('loading');
    } else {
      setPhase(phase + 1);
    }
  };

  const goBack = () => {
    if (phase === 'loading' || phase === 'result') return;
    if (typeof phase === 'number' && phase > 0) {
      setPhase(phase - 1);
      return;
    }
    if (phase === 0) setPhase('intro');
  };

  const progressCurrent =
    phase === 'intro' ? 0 : typeof phase === 'number' ? phase + 1 : phase === 'loading' ? TOTAL_Q : TOTAL_Q;

  const progressFrac = phase === 'intro' ? 0 : Math.min(progressCurrent / TOTAL_Q, 1);

  const pkg = matchedId ? PACKAGES[matchedId] : null;
  const narrative = matchedId ? getResultNarrative(matchedId, answers) : null;

  return (
    <div className="guided">
      <header className="guided__top">
        <div className="guided__top-inner container">
          <Link to="/" className="guided__logo-link">
            <img src="/agnt-logo.png" alt="" width={28} height={28} />
            <span>AGNT</span>
          </Link>
          <div className="guided__top-actions">
            {phase !== 'intro' && phase !== 'result' ? (
              <button type="button" className="guided__text-btn" onClick={goBack}>
                Back
              </button>
            ) : null}
            <Link to="/spec" className="guided__text-link">
              Package overview
            </Link>
          </div>
        </div>
      </header>

      <main className="guided__main">
        {phase === 'intro' ? (
          <div className="guided__stage container guided__stage--narrow">
            <p className="guided__kicker">Independent dealers · Ireland</p>
            <h1 className="guided__h1">Find the AGNT setup that fits how you operate</h1>
            <p className="guided__intro-copy">
              Seven short questions. No feature checklist, just enough to match you to Core, Growth, or Performance with
              clear pricing.
            </p>
            <button
              type="button"
              className="btn btn-primary guided__cta"
              onClick={() => {
                setAnswers({});
                setMatchedId(null);
                setPhase(0);
              }}
            >
              Start
            </button>
            <p className="guided__intro-foot">About 2 minutes · You can go back and change answers anytime</p>
          </div>
        ) : null}

        {typeof phase === 'number' ? (
          <div className="guided__stage container guided__stage--narrow">
            <div className="guided__progress" aria-hidden="true">
              <div className="guided__progress-track">
                <div className="guided__progress-fill" style={{ width: `${progressFrac * 100}%` }} />
              </div>
              <span className="guided__progress-label">
                {phase + 1} / {TOTAL_Q}
              </span>
            </div>
            <h2 className="guided__question">{QUESTIONS[phase].prompt}</h2>
            <ul className="guided__options" role="list">
              {QUESTIONS[phase].options.map((opt) => {
                const selected = answers[QUESTIONS[phase].id] === opt.id;
                return (
                  <li key={opt.id}>
                    <button
                      type="button"
                      className={`guided__option${selected ? ' guided__option--selected' : ''}`}
                      onClick={() => pickOption(opt.id)}
                    >
                      <span className="guided__option-label">{opt.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        {phase === 'loading' ? (
          <div className="guided__stage guided__stage--loading container guided__stage--narrow">
            <div className="guided__loading-panel">
              <div className="guided__loading-bar" aria-hidden="true">
                <div className="guided__loading-bar-fill" key={matchedId ?? 'pending'} />
              </div>
              <p className="guided__loading-status" key={loadingStage}>
                {loadingStages[loadingStage]}
              </p>
              <p className="guided__loading-hint">Calibrating modules to your answers…</p>
            </div>
          </div>
        ) : null}

        {phase === 'result' && pkg && narrative ? (
          <div className="guided__stage container">
            <div className="guided__result">
              <header className="guided__result-head">
                <p className="guided__result-eyebrow">{narrative.headline}</p>
                <h2 className="guided__result-title">
                  <span className="text-gradient">{pkg.name}</span>
                </h2>
                <p className="guided__result-why">{narrative.why}</p>
                <p className="guided__result-best">{narrative.bestFor}</p>
              </header>

              <div className="guided__pricing">
                <div className="guided__price-block">
                  <span className="guided__price-label">Setup</span>
                  <strong className="guided__price-value">
                    {new Intl.NumberFormat('en-IE', {
                      style: 'currency',
                      currency: 'EUR',
                      maximumFractionDigits: 0,
                    }).format(pkg.setupFee)}
                  </strong>
                </div>
                <div className="guided__price-block">
                  <span className="guided__price-label">Monthly</span>
                  <strong className="guided__price-value">
                    {new Intl.NumberFormat('en-IE', {
                      style: 'currency',
                      currency: 'EUR',
                      maximumFractionDigits: 0,
                    }).format(pkg.monthly)}
                    <span className="guided__price-suffix">/mo</span>
                  </strong>
                </div>
              </div>

              <div className="guided__includes">
                <h3 className="guided__includes-title">Included in this setup</h3>
                {pkg.includesNote ? <p className="guided__includes-note">{pkg.includesNote}</p> : null}
                {pkg.groups.map((g) => (
                  <div key={g.title} className="guided__group">
                    <h4 className="guided__group-title">{g.title}</h4>
                    <ul className="guided__group-list">
                      {g.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="guided__result-actions">
                <button type="button" className="btn btn-primary guided__action-primary" onClick={onBookDemo}>
                  Continue with this setup
                </button>
                <button type="button" className="btn btn-secondary guided__action-secondary" onClick={onBookDemo}>
                  Book a 10-minute demo
                </button>
                <a className="guided__mailto" href="mailto:info@agnt.ie?subject=AGNT%20package%20recommendation">
                  Email this recommendation
                </a>
                <button
                  type="button"
                  className="guided__text-btn guided__text-btn--center"
                  onClick={() => {
                    setAnswers({});
                    setMatchedId(null);
                    setPhase('intro');
                  }}
                >
                  Start over
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
