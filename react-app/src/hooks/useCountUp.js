import { useEffect, useRef, useState } from 'react';

/** Counts up to `target` once the element scrolls into view. */
export default function useCountUp(target, duration = 1200) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.unobserve(el);
        const t0 = performance.now();
        function tick(t) {
          const p = Math.min((t - t0) / duration, 1);
          setValue(Math.floor(p * target));
          if (p < 1) requestAnimationFrame(tick);
          else setValue(target);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return [ref, value];
}
