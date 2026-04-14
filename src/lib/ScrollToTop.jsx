import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Ensures route changes start at the top of the viewport (fixes deep scroll on in-app navigation).
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}
