import { useState, useEffect, useRef } from 'react';
import './DemoModal.css';

const INITIAL = {
  dealership: '',
  name: '',
  phone: '',
  email: '',
  stockSize: '',
  notes: '',
};

export default function DemoModal({ open, onClose }) {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setSubmitted(false);
      setForm(INITIAL);
      setErrors({});
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

  const validate = () => {
    const e = {};
    if (!form.dealership.trim()) e.dealership = 'Required';
    if (!form.name.trim()) e.name = 'Required';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.stockSize) e.stockSize = 'Please select';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-label="Book a demo">
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>

        {submitted ? (
          <div className="modal__success">
            <div className="modal__success-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="24" cy="24" r="20" />
                <path d="M15 24l6 6 12-12" />
              </svg>
            </div>
            <h3>Demo booked!</h3>
            <p>We'll be in touch within 24 hours to schedule your walkthrough.</p>
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <h3 className="modal__title">Book a 10-min Demo</h3>
            <p className="modal__desc">See how AGNT works with your stock. No commitment.</p>

            <form className="modal__form" onSubmit={handleSubmit} noValidate>
              <div className="modal__field">
                <label htmlFor="demo-dealership">Dealership name</label>
                <input
                  id="demo-dealership"
                  type="text"
                  value={form.dealership}
                  onChange={handleChange('dealership')}
                  placeholder="e.g. O'Brien Motors"
                  className={errors.dealership ? 'modal__input--error' : ''}
                />
                {errors.dealership && <span className="modal__error">{errors.dealership}</span>}
              </div>

              <div className="modal__row">
                <div className="modal__field">
                  <label htmlFor="demo-name">Name</label>
                  <input
                    id="demo-name"
                    type="text"
                    value={form.name}
                    onChange={handleChange('name')}
                    placeholder="Your name"
                    className={errors.name ? 'modal__input--error' : ''}
                  />
                  {errors.name && <span className="modal__error">{errors.name}</span>}
                </div>
                <div className="modal__field">
                  <label htmlFor="demo-phone">Phone</label>
                  <input
                    id="demo-phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange('phone')}
                    placeholder="+353 ..."
                    className={errors.phone ? 'modal__input--error' : ''}
                  />
                  {errors.phone && <span className="modal__error">{errors.phone}</span>}
                </div>
              </div>

              <div className="modal__field">
                <label htmlFor="demo-email">Email</label>
                <input
                  id="demo-email"
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  placeholder="you@dealership.ie"
                  className={errors.email ? 'modal__input--error' : ''}
                />
                {errors.email && <span className="modal__error">{errors.email}</span>}
              </div>

              <div className="modal__field">
                <label htmlFor="demo-stock">Approx stock size</label>
                <select
                  id="demo-stock"
                  value={form.stockSize}
                  onChange={handleChange('stockSize')}
                  className={`${!form.stockSize ? 'modal__select--placeholder' : ''} ${errors.stockSize ? 'modal__input--error' : ''}`}
                >
                  <option value="">Select range</option>
                  <option value="30-80">30 – 80 cars</option>
                  <option value="80-200">80 – 200 cars</option>
                </select>
                {errors.stockSize && <span className="modal__error">{errors.stockSize}</span>}
              </div>

              <div className="modal__field">
                <label htmlFor="demo-notes">Notes <span className="modal__optional">(optional)</span></label>
                <textarea
                  id="demo-notes"
                  value={form.notes}
                  onChange={handleChange('notes')}
                  rows={3}
                  placeholder="Anything specific you'd like to see?"
                />
              </div>

              <button type="submit" className="btn btn-primary modal__submit" disabled={submitting}>
                {submitting ? 'Sending...' : 'Request Demo'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
