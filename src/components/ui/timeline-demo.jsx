import { Timeline } from './timeline';

export function TimelineDemo() {
  const data = [
    {
      title: 'Step 1',
      content: (
        <div>
          <h3>Fill out a short form</h3>
          <p>Tell us about your dealership, stock volume, and preferences.</p>
        </div>
      ),
    },
    {
      title: 'Step 2',
      content: (
        <div>
          <h3>Quick setup call</h3>
          <p>We jump on a call to finalise specs and walk you through the system.</p>
        </div>
      ),
    },
    {
      title: 'Step 3',
      content: (
        <div>
          <h3>See your website</h3>
          <p>We build your site and system. You review it and request changes.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '12px' }}>
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80"
              alt="Dealer website preview"
              style={{ width: '100%', borderRadius: '10px', height: '130px', objectFit: 'cover' }}
            />
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"
              alt="Dealer dashboard preview"
              style={{ width: '100%', borderRadius: '10px', height: '130px', objectFit: 'cover' }}
            />
          </div>
        </div>
      ),
    },
  ];

  return <Timeline data={data} />;
}
