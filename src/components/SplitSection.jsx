import { useReveal } from '../hooks/useReveal';
import './SplitSection.css';

export default function SplitSection() {
  const [ref, visible] = useReveal(0.12);

  return (
    <section className="split section" id="system" ref={ref}>
      <div className="container">
        <div
          className="split__header"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease-out',
          }}
        >
          <span className="section-label">Two sides. One system.</span>
          <h2>The complete dealer stack.</h2>
          <p className="split__sub">
            A premium customer experience on the front. A dealer operating system behind it.
          </p>
          <div className="split__header-rule" aria-hidden="true" />
        </div>

        <div className="split__grid">
          {/* Website card */}
          <div className={`card split__card ${visible ? 'split__card--visible-left' : ''}`}>
            <h3>Premium dealer website</h3>
            <span className="split__micro">Built to convert</span>
            <ul className="split__bullets">
              <li>
                <span className="split__bullet-icon" aria-hidden="true">&#9670;</span>
                Fast stock browsing that feels expensive
              </li>
              <li>
                <span className="split__bullet-icon" aria-hidden="true">&#9670;</span>
                Vehicle pages built to convert enquiries
              </li>
              <li>
                <span className="split__bullet-icon" aria-hidden="true">&#9670;</span>
                Clean, mobile-first, frictionless
              </li>
            </ul>

            <div className="split__preview">
              <div className="split__preview-plate">
                <div className="split__preview-bar">
                  <span className="split__dot" /><span className="split__dot" /><span className="split__dot" />
                </div>
                <div className="split__preview-grid">
                  <div className="split__preview-car-card" />
                  <div className="split__preview-car-card" />
                  <div className="split__preview-car-card" />
                  <div className="split__preview-car-card" />
                  <div className="split__preview-car-card" />
                  <div className="split__preview-car-card" />
                </div>
              </div>
            </div>
          </div>

          {/* Control Panel card */}
          <div className={`card split__card ${visible ? 'split__card--visible-right' : ''}`}>
            <h3>Dealer control panel</h3>
            <span className="split__micro">Built to move stock</span>
            <ul className="split__bullets">
              <li>
                <span className="split__bullet-icon" aria-hidden="true">&#9670;</span>
                Add reg + photos &rarr; AI generates the listing
              </li>
              <li>
                <span className="split__bullet-icon" aria-hidden="true">&#9670;</span>
                Publish across platforms via API
              </li>
              <li>
                <span className="split__bullet-icon" aria-hidden="true">&#9670;</span>
                Live lead feed with buyer intent signals
              </li>
            </ul>

            <div className="split__preview">
              <div className="split__preview-plate split__preview-plate--panel">
                <div className="split__preview-bar">
                  <span className="split__dot" /><span className="split__dot" /><span className="split__dot" />
                </div>
                <div className="split__preview-leads">
                  <div className="split__lead-row">
                    <div className="split__lead-avatar" />
                    <div className="split__lead-info">
                      <div className="split__lead-name" />
                      <div className="split__lead-detail" />
                    </div>
                    <div className="split__lead-badge">Hot</div>
                  </div>
                  <div className="split__lead-row">
                    <div className="split__lead-avatar" />
                    <div className="split__lead-info">
                      <div className="split__lead-name" />
                      <div className="split__lead-detail" />
                    </div>
                    <div className="split__lead-badge split__lead-badge--warm">Warm</div>
                  </div>
                  <div className="split__lead-row">
                    <div className="split__lead-avatar" />
                    <div className="split__lead-info">
                      <div className="split__lead-name" />
                      <div className="split__lead-detail" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
