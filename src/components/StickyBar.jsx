import { Link } from 'react-router-dom';
import { useScrolled } from '../hooks/useScrolled';
import './StickyBar.css';

/* Mobile-only floating CTA. One action, glass, clear of the content. */
export default function StickyBar() {
  const visible = useScrolled(600);

  return (
    <div className={`sticky-bar${visible ? ' sticky-bar--visible' : ''}`}>
      <Link to="/spec" className="sticky-bar__btn">
        <span>Spec out your system</span>
        <span className="sticky-bar__ic" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h13M13 6l6 6-6 6" />
          </svg>
        </span>
      </Link>
    </div>
  );
}
