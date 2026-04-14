import { useEffect } from 'react';

const SELECTOR = '.reveal, .reveal-sm, [data-stagger]';

export function useRevealOnScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const nodes = Array.from(document.querySelectorAll(SELECTOR));
    if (!nodes.length) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}
