import { useEffect, useRef } from 'react';

/* Scales a fixed design canvas into whatever frame it is dropped into, so a
   mock keeps identical proportions at every breakpoint. Returns the ref to
   attach to the canvas root; its parent element is the frame.

   fit 'width'  — scale to the frame width. The frame's height follows the
                  canvas unless setHeight is false (a frame with its own
                  aspect-ratio crops the canvas instead).
   fit 'height' — scale to the frame height and centre the canvas, for a
                  portrait device sitting in a landscape frame.

   offsetY shifts the canvas in design pixels before scaling, so a cropping
   frame can land on the part of the screen worth showing. */
export default function useMockFit({ w, h, fit = 'width', offsetY = 0, setHeight = true }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const frame = el?.parentElement;
    if (!el || !frame) return;

    const apply = () => {
      if (fit === 'height') {
        const scale = frame.clientHeight / h;
        el.style.left = '50%';
        el.style.transformOrigin = 'top center';
        el.style.transform = `translateX(-50%) scale(${scale})`;
        return;
      }
      const scale = frame.clientWidth / w;
      el.style.left = '0';
      el.style.transformOrigin = 'top left';
      el.style.transform = `scale(${scale}) translateY(${offsetY}px)`;
      if (setHeight) frame.style.height = `${scale * h}px`;
    };

    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(frame);
    return () => ro.disconnect();
  }, [w, h, fit, offsetY, setHeight]);

  return ref;
}
