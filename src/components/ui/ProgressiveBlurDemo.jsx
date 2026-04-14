import { ProgressiveBlur } from './ProgressiveBlur';
import './ProgressiveBlurDemo.css';

const LOREM =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, reiciendis eum vitae nostrum, temporibus repudiandae voluptatibus, natus iure ipsa velit odit quibusdam illum. Quaerat cumque laudantium libero reprehenderit perferendis.';

/** Full-height scroll demo (light background). Import in a route if you want to preview. */
export function Skiper41() {
  return (
    <div className="skiper41">
      <ProgressiveBlur position="top" backgroundColor="#f5f4f3" />
      <ProgressiveBlur position="bottom" backgroundColor="#f5f4f3" />

      <div className="skiper41__scroll">
        <div className="skiper41__intro">
          <span className="skiper41__hint">Scroll down to see the effect</span>
        </div>

        <div className="skiper41__body">
          {Array.from({ length: 10 }).map((_, index) => (
            <p key={index}>{LOREM}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProgressiveBlurDemo() {
  return <Skiper41 />;
}
