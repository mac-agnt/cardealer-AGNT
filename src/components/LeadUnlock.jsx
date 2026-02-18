import { useReveal } from '../hooks/useReveal';
import './LeadUnlock.css';

export default function LeadUnlock() {
  const [ref, visible] = useReveal(0.12);

  return (
    <section className="lead section" id="lead-unlock" ref={ref}>
      <div className="container">
        <div className="lead__header" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)' }}>
          <span className="section-label">Signature feature</span>
          <h2>Stop anonymous browsing.</h2>
          <p className="lead__sub">
            Buyers unlock full vehicle details with their name + phone — your team gets a real lead with intent.
          </p>
        </div>

        <div className="lead__grid">
          {/* Left — vehicle page mock */}
          <div className={`lead__mock lead__mock--vehicle ${visible ? 'lead__mock--visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
            <div className="lead__mock-plate brackets">
              <div className="lead__mock-bar">
                <span className="lead__mock-dot" /><span className="lead__mock-dot" /><span className="lead__mock-dot" />
              </div>

              {/* Vehicle preview */}
              <div className="lead__vehicle-img" />
              <div className="lead__vehicle-info">
                <div className="lead__vehicle-title">2024 BMW 3 Series — 320d M Sport</div>
                <div className="lead__vehicle-price">€42,950</div>
                <div className="lead__vehicle-specs">
                  <span>Diesel</span><span>Auto</span><span>18,200 km</span>
                </div>
              </div>

              {/* Lock panel */}
              <div className={`lead__lock-panel ${visible ? 'lead__lock-panel--open' : ''}`}>
                <div className="lead__lock-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="4" y="9" width="12" height="8" rx="2" />
                    <path d="M7 9V6a3 3 0 016 0v3" />
                  </svg>
                </div>
                <div className="lead__lock-title">Unlock full details</div>
                <div className="lead__lock-fields">
                  <div className="lead__lock-field">
                    <span>Name</span>
                  </div>
                  <div className="lead__lock-field">
                    <span>Phone</span>
                  </div>
                </div>
                <div className="lead__lock-btn">Unlock Now</div>
              </div>
            </div>
          </div>

          {/* Right — lead card mock */}
          <div className={`lead__mock lead__mock--card ${visible ? 'lead__mock--visible' : ''}`} style={{ transitionDelay: '0.5s' }}>
            <div className="lead__mock-plate brackets">
              <div className="lead__mock-bar">
                <span className="lead__mock-dot" /><span className="lead__mock-dot" /><span className="lead__mock-dot" />
              </div>

              <div className="lead__card-header">
                <div className="lead__card-avatar">JO</div>
                <div>
                  <div className="lead__card-name">John O'Brien</div>
                  <div className="lead__card-phone">+353 87 *** ****</div>
                </div>
                <div className="lead__card-badge">Hot Lead</div>
              </div>

              <div className="lead__card-rows">
                <div className="lead__card-row">
                  <span className="lead__card-label">Cars viewed</span>
                  <span className="lead__card-value">BMW 320d, Audi A4, Mercedes C200</span>
                </div>
                <div className="lead__card-row">
                  <span className="lead__card-label">Price band</span>
                  <span className="lead__card-value">€35k – €50k</span>
                </div>
                <div className="lead__card-row">
                  <span className="lead__card-label">Preference</span>
                  <span className="lead__card-value">Saloon / Black / Diesel</span>
                </div>
                <div className="lead__card-row">
                  <span className="lead__card-label">Interest score</span>
                  <span className="lead__card-value lead__card-value--hot">
                    <span className="lead__card-score-bar">
                      <span className="lead__card-score-fill" style={{ width: '85%' }} />
                    </span>
                    85
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
