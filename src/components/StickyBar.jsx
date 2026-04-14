import { Link } from 'react-router-dom';
import { useScrolled } from '../hooks/useScrolled';
import './StickyBar.css';

export default function StickyBar({ onBookDemo }) {
  const visible = useScrolled(600);

  return (
    <div className={`sticky-bar ${visible ? 'sticky-bar--visible' : ''}`}>
      <Link to="/spec" className="btn btn-primary sticky-bar__btn sticky-bar__btn--primary">
        Spec out your system
      </Link>
      <button type="button" className="btn btn-secondary sticky-bar__btn" onClick={onBookDemo}>
        Book a demo
      </button>
    </div>
  );
}
