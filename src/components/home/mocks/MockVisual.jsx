/* Resolves a REVEALS `render` key to its coded mock.

   variant tells the mock how much room it has:
     'stage' / 'slide' — a frame tall enough for a whole device or screen
     'card'            — a 16/9 thumbnail, which crops into the screen instead */
import { MOCKS, isPhoneMock } from './mockRegistry';

export default function MockVisual({ name, variant = 'stage' }) {
  const Mock = MOCKS[name];
  if (!Mock) return null;

  if (isPhoneMock(name)) {
    /* In a thumbnail the whole handset would be unreadable, so crop past the
       status bar and show the top of the screen at full size instead. */
    return variant === 'card' ? <Mock offsetY={-54} setHeight={false} /> : <Mock fit="height" />;
  }

  return <Mock />;
}
