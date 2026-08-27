/* Safari-style window chrome wrapped around a coded product mock.
   Presentation only (aria-hidden) — kept local to the mocks folder so it stays
   independent of the hero's own browser frame. */
import './BrowserChrome.css';

export default function BrowserChrome({ url, children, className = '' }) {
  return (
    <div className={`bchrome${className ? ` ${className}` : ''}`} aria-hidden="true">
      <div className="bchrome__bar">
        <span className="bchrome__traffic">
          <i /><i /><i />
        </span>
        <span className="bchrome__nav">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6l-6 6 6 6" />
          </svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </span>
        <span className="bchrome__url">
          <span className="bchrome__url-lock">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
          </span>
          {url}
        </span>
        <span className="bchrome__end">
          <span className="bchrome__ic">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
          <span className="bchrome__ic">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="5" width="16" height="14" rx="2" /><path d="M12 5v14" />
            </svg>
          </span>
        </span>
      </div>
      <div className="bchrome__viewport">{children}</div>
    </div>
  );
}
