import { useScrolled } from '../hooks/useScrolled';
import './StickyBar.css';

export default function StickyBar({ onBookDemo }) {
  const visible = useScrolled(600);

  return (
    <div className={`sticky-bar ${visible ? 'sticky-bar--visible' : ''}`}>
      <button className="btn btn-primary sticky-bar__btn" onClick={onBookDemo}>
        Book a 10-min Demo
      </button>
    </div>
  );
}
