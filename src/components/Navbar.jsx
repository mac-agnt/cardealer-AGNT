import { useEffect, useState } from 'react';
import { useScrolled } from '../hooks/useScrolled';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'The System', href: '#system' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar({ onBookDemo }) {
  const scrolled = useScrolled(24);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('#hero');

  useEffect(() => {
    const sections = NAV_LINKS
      .map((link) => ({ href: link.href, el: document.querySelector(link.href) }))
      .filter((entry) => entry.el);

    const onScroll = () => {
      const offset = 130;
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
    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="navbar-wrap">
        <div className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
        <a
          href="#hero"
          className="navbar__logo"
          onClick={(e) => {
            e.preventDefault();
            setActiveHref('#hero');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          AGNT.IE
        </a>

        <div className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
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

        <button className="navbar__cta" onClick={onBookDemo}>
          Book a 10-minute demo
        </button>

        <button
          className={`navbar__burger ${mobileOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          <span /><span /><span />
        </button>
        </div>
      </div>
    </nav>
  );
}
