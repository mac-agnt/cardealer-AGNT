import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useScrolled } from '../hooks/useScrolled';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Inside AGNT', href: '#inside' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onBookDemo }) {
  const location = useLocation();
  const navigate = useNavigate();
  const scrolled = useScrolled(12);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('#hero');

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => ({ href: link.href, el: document.querySelector(link.href) })).filter(
      (entry) => entry.el
    );

    const onScroll = () => {
      const offset = 88;
      let current = '#hero';
      for (const section of sections) {
        if (section.el.offsetTop - offset <= window.scrollY) {
          current = section.href;
        }
      }
      setActiveHref(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    setActiveHref(href);
    if (location.pathname !== '/') {
      if (href === '#hero') {
        navigate('/');
        return;
      }
      navigate({ pathname: '/', hash: href.replace(/^#/, '') });
      return;
    }
    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`navbar-wrap ${scrolled ? 'navbar-wrap--scrolled' : ''}`}>
      <header className={`navbar nav-settle ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          <a
            href="#hero"
            className="navbar__logo logo-micro"
            onClick={(e) => {
              e.preventDefault();
              setMobileOpen(false);
              setActiveHref('#hero');
              if (location.pathname !== '/') {
                navigate('/');
                return;
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            AGNT
          </a>

          <div className="navbar__links" role="navigation" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`navbar__link ${activeHref === link.href ? 'navbar__link--active' : ''}`}
                onClick={(e) => handleNav(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="navbar__actions">
            <Link to="/spec" className="btn btn-primary btn-micro navbar__cta navbar__cta--primary">
              Spec out your system
            </Link>
            {typeof onBookDemo === 'function' ? (
              <button type="button" className="navbar__demo btn-micro" onClick={onBookDemo} aria-label="Book a demo">
                Book a demo
              </button>
            ) : null}
          </div>

          <div className="navbar__mobile-controls">
            <button
              className={`navbar__burger ${mobileOpen ? 'navbar__burger--open' : ''}`}
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
              type="button"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {mobileOpen ? (
                  <path d="M6 6 18 18M18 6 6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div id="mobile-nav-panel" className={`navbar__mobile-panel ${mobileOpen ? 'navbar__mobile-panel--open' : ''}`}>
          <div className="navbar__mobile-links" role="navigation" aria-label="Mobile primary">
            {NAV_LINKS.map((link) => (
              <a
                key={`mobile-${link.href}`}
                href={link.href}
                className={`navbar__mobile-link ${activeHref === link.href ? 'navbar__mobile-link--active' : ''}`}
                onClick={(e) => handleNav(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="navbar__mobile-ctas">
            <Link to="/spec" className="btn btn-primary btn-micro navbar__mobile-cta" onClick={() => setMobileOpen(false)}>
              Spec out your system
            </Link>
            {typeof onBookDemo === 'function' ? (
              <button
                type="button"
                className="btn btn-secondary btn-micro navbar__mobile-cta"
                onClick={() => {
                  setMobileOpen(false);
                  onBookDemo();
                }}
              >
                Book a 10-minute demo
              </button>
            ) : null}
          </div>
        </div>
      </header>
    </div>
  );
}
