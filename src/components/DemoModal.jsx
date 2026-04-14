import { useEffect, useRef } from 'react';
import './DemoModal.css';

const EMAIL_HREF =
  "mailto:info@agnt.ie?subject=Dealer%20website%20enquiry&body=Hi%20AGNT%20team,%0A%0AI%E2%80%99m%20interested%20in%20a%20premium%20dealer%20website%20with%20your%20built-in%20tools.%0A%0APlease%20let%20me%20know%20the%20next%20steps.%0A%0ADealership%20name:%0ALocation:%0AStock%20size:%0A%0AThanks";
const WHATSAPP_HREF =
  "https://wa.me/353830828731?text=Hi%20AGNT,%20I%E2%80%99m%20interested%20in%20a%20premium%20dealer%20website%20with%20your%20built-in%20tools.%20Could%20we%20discuss%20setup?";

export default function DemoModal({ open, onClose }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-label="Contact options">
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>

        <h3 className="modal__title">Contact AGNT</h3>
        <p className="modal__desc">Send us your setup and we&apos;ll talk it through.</p>

        <div className="modal__actions" role="group" aria-label="Contact actions">
          <a href={EMAIL_HREF} className="btn btn-secondary modal__action-btn">
            Email us
          </a>
          <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="btn btn-primary modal__action-btn">
            WhatsApp us
          </a>
        </div>
      </div>
    </div>
  );
}
