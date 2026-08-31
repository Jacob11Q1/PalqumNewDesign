import { useEffect, useRef, useState } from 'react';

/**
 * Fade+rise reveal, once, on scroll into view. Mirrors the vanilla-site .reveal
 * pattern: short travel distance, generous rootMargin so content is basically
 * already visible by the time it's reached — never a blank section on scroll.
 */
export default function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, visible];
}
