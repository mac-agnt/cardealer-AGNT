export const BUILDER_BASE_PACKAGE = {
  name: 'Base Site (Brochure Level)',
  basePrice: 999,
};

export const MONTHLY_BASE_WEBSITE_ONLY = 200;
export const MONTHLY_WEBSITE_PLUS_SOFTWARE = 394;

export const DEFAULT_SOFTWARE_PRESELECT_IDS = new Set([
  'unified-inbox',
  'smart-routing',
  'intent-forms',
  'multi-platform',
]);

export const BUILDER_STEPS = [
  {
    id: 'buyers',
    title: 'Capture Serious Buyers',
    subtitle: 'This directly impacts lead quality.',
    features: [
      { id: 'unified-inbox', type: 'software', name: 'Unified Inbox', description: 'Keeps every enquiry in one operational thread.', priceOneTime: 150, priceMonthly: 0 },
      { id: 'smart-routing', type: 'software', name: 'Smart Lead Routing', description: 'Routes intent signals to the right person faster.', priceOneTime: 150, priceMonthly: 0 },
      { id: 'intent-forms', type: 'software', name: 'Intent-Based Forms', description: 'Captures buyer context before the first call.', priceOneTime: 120, priceMonthly: 0 },
    ],
  },
  {
    id: 'pressure',
    title: 'Create Buying Pressure',
    subtitle: 'Help active buyers make decisions sooner.',
    features: [
      { id: 'demand-signals', type: 'software', name: 'Live Demand Signals', description: 'Shows immediate interest momentum.', priceOneTime: 80, priceMonthly: 0 },
      { id: 'urgency-badges', type: 'software', name: 'Urgency Badges', description: 'Highlights limited availability moments.', priceOneTime: 60, priceMonthly: 0 },
      { id: 'timed-offers', type: 'software', name: 'Timed Offers Engine', description: 'Supports controlled time-boxed offers.', priceOneTime: 70, priceMonthly: 0 },
    ],
  },
  {
    id: 'stock',
    title: 'Move Stock Faster',
    subtitle: 'Improve stock visibility and movement pacing.',
    features: [
      { id: 'featured-slot', type: 'software', name: 'Featured Slot Control', description: 'Push priority vehicles to the front.', priceOneTime: 90, priceMonthly: 0 },
      { id: 'price-drop', type: 'software', name: 'Price Drop Highlighting', description: 'Makes reductions visible immediately.', priceOneTime: 70, priceMonthly: 0 },
      { id: 'multi-platform', type: 'software', name: 'Multi-Platform Publishing', description: 'Publishes stock across key channels from one place.', priceOneTime: 300, priceMonthly: 0 },
    ],
  },
  {
    id: 'finance',
    title: 'Reduce Finance Drop-Off',
    subtitle: 'Lower finance-related friction points.',
    features: [
      { id: 'monthly-price', type: 'website', name: 'From €X / Month Pricing', description: 'Frames affordability earlier in the journey.', priceOneTime: 90, priceMonthly: 0 },
      { id: 'reservation', type: 'website', name: 'Instant Reservation (€500 refundable)', description: 'Converts intent into committed action.', priceOneTime: 100, priceMonthly: 0 },
      { id: 'finance-followup', type: 'software', name: 'Finance Auto Follow-Up', description: 'Prevents warm finance leads from going cold.', priceOneTime: 80, priceMonthly: 0 },
    ],
  },
  {
    id: 'trade',
    title: 'Set Trade Expectations',
    subtitle: 'Create cleaner trade-in conversations.',
    features: [
      { id: 'trade-estimate', type: 'software', name: 'Instant Trade-In Estimate', description: 'Sets expectations before manual review.', priceOneTime: 100, priceMonthly: 0 },
      { id: 'condition-slider', type: 'software', name: 'Condition Slider Valuation', description: 'Collects better trade condition context.', priceOneTime: 80, priceMonthly: 0 },
    ],
  },
  {
    id: 'trust',
    title: 'Build Buyer Trust',
    subtitle: 'Increase confidence before first contact.',
    features: [
      { id: 'walkarounds', type: 'software', name: 'Hosted Walkaround Videos', description: 'Adds rich context for remote buyers.', priceOneTime: 60, priceMonthly: 0 },
      { id: 'reviews', type: 'software', name: 'Review Injection', description: 'Reinforces trust with visible social proof.', priceOneTime: 50, priceMonthly: 0 },
    ],
  },
  {
    id: 'conversation',
    title: 'Capture Every Conversation',
    subtitle: 'Avoid gaps in communication coverage.',
    features: [
      { id: 'after-hours', type: 'software', name: 'After-Hours Lead Capture', description: 'Prevents overnight enquiry loss.', priceOneTime: 40, priceMonthly: 0 },
      { id: 'whatsapp-track', type: 'software', name: 'Click-to-WhatsApp Tracking', description: 'Tracks direct chat engagement by stock.', priceOneTime: 31, priceMonthly: 0 },
    ],
  },
  {
    id: 'machine',
    title: 'Run a Sales Machine',
    subtitle: 'Keep teams focused on the right leads.',
    features: [
      { id: 'dashboard', type: 'software', name: 'Dealer Performance Dashboard', description: 'Shows what is moving and what is stuck.', priceOneTime: 60, priceMonthly: 0 },
      { id: 'lead-priority', type: 'software', name: 'Lead Priority Queue', description: 'Ensures highest-value leads are actioned first.', priceOneTime: 40, priceMonthly: 0 },
    ],
  },
];

export const BUILDER_FEATURES = BUILDER_STEPS.flatMap((step) =>
  step.features.map((feature) => ({ ...feature, stepId: step.id, enabled: false })),
);
