import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import './timeline.css';

export function Timeline({ data }) {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 15%', 'end 55%'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const nextIndex = Math.min(data.length - 1, Math.floor(latest * data.length));
    setActiveIndex(nextIndex);
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="timeline" ref={containerRef}>
      <div ref={ref} className="timeline__entries">
        {data.map((item, index) => (
          <div key={`${item.title}-${index}`} className="timeline__entry">
            <div className="timeline__left">
              <div className={`timeline__dot ${index <= activeIndex ? 'timeline__dot--active' : ''}`} />
              <p className="timeline__step">{item.title}</p>
            </div>

            <div className="timeline__right">{item.content}</div>
          </div>
        ))}

        <div className="timeline__line-wrap" style={{ height: `${height}px` }}>
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="timeline__line-progress"
          />
        </div>
      </div>
    </div>
  );
}
