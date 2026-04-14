import './ProgressiveBlur.css';

/**
 * Progressive blur / frosted fade using gradient tint + backdrop-filter.
 * Mask uses luminance (black → transparent), not the fill color (the original
 * snippet’s mask with `backgroundColor` is invalid in CSS).
 *
 * @param {Object} props
 * @param {string} [props.className]
 * @param {string} [props.backgroundColor]
 * @param {'top'|'bottom'} [props.position]
 * @param {string} [props.height]
 * @param {string} [props.blurAmount]
 * @param {Object} [props.style] Merged last; use for e.g. `top: '-58px', height: 'auto'`
 */
export function ProgressiveBlur({
  className = '',
  backgroundColor = '#f5f4f3',
  position = 'top',
  height = '150px',
  blurAmount = '4px',
  style,
}) {
  const isTop = position === 'top';

  const baseStyle = {
    [isTop ? 'top' : 'bottom']: 0,
    height,
    background: isTop
      ? `linear-gradient(to top, transparent, ${backgroundColor})`
      : `linear-gradient(to bottom, transparent, ${backgroundColor})`,
    maskImage: isTop
      ? 'linear-gradient(to bottom, rgba(0, 0, 0, 0.96) 42%, transparent 100%)'
      : 'linear-gradient(to top, rgba(0, 0, 0, 0.96) 38%, transparent 100%)',
    WebkitMaskImage: isTop
      ? 'linear-gradient(to bottom, rgba(0, 0, 0, 0.96) 42%, transparent 100%)'
      : 'linear-gradient(to top, rgba(0, 0, 0, 0.96) 38%, transparent 100%)',
    WebkitBackdropFilter: `blur(${blurAmount}) saturate(1.12)`,
    backdropFilter: `blur(${blurAmount}) saturate(1.12)`,
  };

  return (
    <div
      className={['progressive-blur', className].filter(Boolean).join(' ')}
      style={{ ...baseStyle, ...style }}
      aria-hidden="true"
    />
  );
}

export default ProgressiveBlur;
