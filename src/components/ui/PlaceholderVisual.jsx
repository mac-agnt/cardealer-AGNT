import './PlaceholderVisual.css';

/**
 * Art-direction placeholder, clearly labeled for production handoff.
 * Does not replace final photography or UI captures.
 */
export default function PlaceholderVisual({ label, variant = 'image', className = '' }) {
  return (
    <div
      className={`ph ph--${variant} ${className}`.trim()}
      role="img"
      aria-label={label}
    >
      <span className="ph__meta">Art direction</span>
      <p className="ph__label">{label}</p>
    </div>
  );
}
