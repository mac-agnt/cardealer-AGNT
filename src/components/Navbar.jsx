import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useScrolled } from '../hooks/useScrolled';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', href: 'https://agnt.ie', activeMatch: '#hero' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', href: '#contact' },
];

function linkIsActive(link, activeHref) {
  if (link.to) return false;
  const key = link.activeMatch ?? link.href;
  return activeHref === key;
}

function NavItem({ link, base, activeHref, onNav, onClose }) {
  if (link.to) {
    return (
      <Link to={link.to} className={base} onClick={onClose}>
        {link.label}
      </Link>
    );
  }
  const active = linkIsActive(link, activeHref);
  return (
    <a
      href={link.href}
      className={`${base} ${active ? `${base}--active` : ''}`}
      onClick={(e) => onNav(e, link.href, link.activeMatch)}
    >
      {link.label}
    </a>
  );
}

export default function Navbar({ onBookDemo }) {
  const location = useLocation();
  const navigate = useNavigate();
  const scrolled = useScrolled(12);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('#hero');

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => {
      const selector = link.activeMatch ?? link.href;
      if (typeof selector !== 'string' || !selector.startsWith('#')) return null;
      const el = document.querySelector(selector);
      return el ? { activeKey: link.activeMatch ?? link.href, el } : null;
    }).filter(Boolean);

    const onScroll = () => {
      const offset = 88;
      let current = '#hero';
      for (const section of sections) {
        if (section.el.offsetTop - offset <= window.scrollY) {
          current = section.activeKey;
        }
      }
      setActiveHref(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e, href, activeMatch) => {
    e.preventDefault();
    setMobileOpen(false);
    if (href.startsWith('http://') || href.startsWith('https://')) {
      window.location.assign(href);
      return;
    }
    const scrollKey = activeMatch ?? href;
    setActiveHref(scrollKey);
    if (location.pathname !== '/') {
      if (scrollKey === '#hero') {
        navigate('/');
        return;
      }
      navigate({ pathname: '/', hash: href.replace(/^#/, '') });
      return;
    }
    if (scrollKey === '#hero') {
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
              <NavItem
                key={link.label}
                link={link}
                base="navbar__link"
                activeHref={activeHref}
                onNav={handleNav}
                onClose={() => setMobileOpen(false)}
              />
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
              <NavItem
                key={`mobile-${link.label}`}
                link={link}
                base="navbar__mobile-link"
                activeHref={activeHref}
                onNav={handleNav}
                onClose={() => setMobileOpen(false)}
              />
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
