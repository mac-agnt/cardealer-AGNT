/* Wireframe dotted globe (21st.dev component, ported to this codebase).
   Original is TSX + Tailwind + full d3; this is plain JSX on d3-geo/d3-timer with
   project CSS. Differences on purpose:
     - decorative background, so drag/zoom handlers are dropped (the original's
       wheel handler called preventDefault and would have eaten page scroll)
     - rotation is time-based and much slower, on a tilted axis
     - palette follows the copper system instead of the original white-on-black */
import { useEffect, useRef } from 'react';
import { geoBounds, geoGraticule, geoOrthographic, geoPath } from 'd3-geo';
import { timer } from 'd3-timer';
import './WireframeDottedGlobe.css';

const LAND_URL =
  'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json';

const DEG_PER_SECOND = 3.4; // full turn ≈ 106s
const AXIS_TILT = -16; // globe leans back rather than spinning bolt upright

function pointInRing(point, ring) {
  const [x, y] = point;
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function pointInFeature(point, feature) {
  const { type, coordinates } = feature.geometry;

  if (type === 'Polygon') {
    if (!pointInRing(point, coordinates[0])) return false;
    for (let i = 1; i < coordinates.length; i++) {
      if (pointInRing(point, coordinates[i])) return false; // sits in a hole
    }
    return true;
  }

  if (type === 'MultiPolygon') {
    for (const polygon of coordinates) {
      if (!pointInRing(point, polygon[0])) continue;
      let inHole = false;
      for (let i = 1; i < polygon.length; i++) {
        if (pointInRing(point, polygon[i])) {
          inHole = true;
          break;
        }
      }
      if (!inHole) return true;
    }
  }

  return false;
}

/* Lat/lng lattice clipped to a land feature — the halftone fill. */
function dotsForFeature(feature, spacing) {
  const dots = [];
  const [[minLng, minLat], [maxLng, maxLat]] = geoBounds(feature);
  for (let lng = minLng; lng <= maxLng; lng += spacing) {
    for (let lat = minLat; lat <= maxLat; lat += spacing) {
      if (pointInFeature([lng, lat], feature)) dots.push([lng, lat]);
    }
  }
  return dots;
}

export default function WireframeDottedGlobe({ className = '', dotSpacing = 1.3 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const frame = canvas?.parentElement;
    const context = canvas?.getContext('2d');
    if (!canvas || !frame || !context) return undefined;

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    // Phones: render once and hold. Repainting ~10k dots per frame is the main
    // source of scroll jank on mobile, and the globe is decoration.
    const still = reduced || window.matchMedia?.('(max-width: 900px)').matches;
    let width = 0;
    let height = 0;
    let radius = 0;
    let land = null;
    const dots = [];
    let cancelled = false;

    const projection = geoOrthographic().clipAngle(90);
    const path = geoPath(projection, context);
    const graticule = geoGraticule();

    const size = () => {
      width = frame.clientWidth;
      height = frame.clientHeight;
      if (!width || !height) return;
      // Cap DPR: at this canvas size a full 2x buffer is a lot of pixels to repaint
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      radius = Math.min(width, height) / 2.15;
      projection.scale(radius).translate([width / 2, height / 2]);
    };

    const render = () => {
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);

      // Sphere — barely-there fill so the section colour still reads through
      context.beginPath();
      context.arc(width / 2, height / 2, radius, 0, 2 * Math.PI);
      context.fillStyle = 'rgba(9, 9, 8, 0.55)';
      context.fill();
      context.lineWidth = 1;
      context.strokeStyle = 'rgba(255, 255, 255, 0.16)';
      context.stroke();

      // Graticule
      context.beginPath();
      path(graticule());
      context.lineWidth = 1;
      context.strokeStyle = 'rgba(255, 255, 255, 0.075)';
      context.stroke();

      if (!land) return;

      // Coastlines
      context.beginPath();
      land.features.forEach((feature) => path(feature));
      context.lineWidth = 1;
      context.strokeStyle = 'rgba(255, 138, 84, 0.32)';
      context.stroke();

      // Halftone land dots, fading towards the limb for depth
      for (let i = 0; i < dots.length; i++) {
        const projected = projection(dots[i]);
        if (!projected) continue;
        const dx = projected[0] - width / 2;
        const dy = projected[1] - height / 2;
        const edge = Math.sqrt(dx * dx + dy * dy) / radius;
        if (edge > 1) continue;
        context.beginPath();
        context.arc(projected[0], projected[1], 1.15, 0, 2 * Math.PI);
        context.fillStyle = `rgba(255, 150, 96, ${0.72 - edge * 0.42})`;
        context.fill();
      }
    };

    size();
    projection.rotate([0, AXIS_TILT]);
    render();

    const observer = new ResizeObserver(() => {
      size();
      render();
    });
    observer.observe(frame);

    const spin = still
      ? null
      : timer((elapsed) => {
          projection.rotate([((elapsed / 1000) * DEG_PER_SECOND) % 360, AXIS_TILT]);
          render();
        });

    fetch(LAND_URL)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('land data'))))
      .then((data) => {
        if (cancelled) return;
        land = data;
        land.features.forEach((feature) => {
          dotsForFeature(feature, dotSpacing).forEach((dot) => dots.push(dot));
        });
        render();
      })
      .catch(() => {
        /* Background art — a wireframe sphere without coastlines is a fine fallback */
      });

    return () => {
      cancelled = true;
      spin?.stop();
      observer.disconnect();
    };
  }, [dotSpacing]);

  return (
    <div className={`globe ${className}`.trim()} aria-hidden="true">
      <canvas ref={canvasRef} className="globe__canvas" />
    </div>
  );
}
