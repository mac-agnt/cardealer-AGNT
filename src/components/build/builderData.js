export const BUILDER_BASE_PACKAGE = {
  name: 'Base Site (Brochure Level)',
  basePrice: 999,
};

export const MONTHLY_BASE_WEBSITE_ONLY = 200;
export const MONTHLY_WEBSITE_PLUS_SOFTWARE = 394;

export const BUILDER_PHASES = [
  {
    id: 'website',
    title: 'Phase 1 — Website',
    subtitle: 'Start with your website first. Included by default — untick anything you do not need.',
    sections: [
      {
        id: 'website-conversion',
        title: 'Website conversion layer',
        subtitle: 'Make listings easier to browse and easier to enquire on.',
        features: [
          { id: 'monthly-price', type: 'website', name: 'From EUR/month pricing display', description: 'Frames affordability earlier in the browsing journey.', priceOneTime: 90, priceMonthly: 0 },
          { id: 'reservation', type: 'website', name: 'Instant reservation (EUR500 refundable)', description: 'Converts browsing intent into committed action.', priceOneTime: 100, priceMonthly: 0 },
          { id: 'demand-signals', type: 'website', name: 'Live demand highlights', description: 'Shows where buyer attention is increasing.', priceOneTime: 80, priceMonthly: 0 },
          { id: 'urgency-badges', type: 'website', name: 'Stock urgency badges', description: 'Highlights low-availability moments on key vehicles.', priceOneTime: 60, priceMonthly: 0 },
        ],
      },
      {
        id: 'website-merchandising',
        title: 'Website merchandising',
        subtitle: 'Control how stock is positioned on the site.',
        features: [
          { id: 'featured-slot', type: 'website', name: 'Featured slot control', description: 'Push priority vehicles to the front of category pages.', priceOneTime: 90, priceMonthly: 0 },
          { id: 'price-drop', type: 'website', name: 'Price-drop highlighting', description: 'Makes reductions visible immediately to buyers.', priceOneTime: 70, priceMonthly: 0 },
          { id: 'walkarounds', type: 'website', name: 'Hosted walkaround videos', description: 'Adds richer remote context on vehicle pages.', priceOneTime: 60, priceMonthly: 0 },
          { id: 'reviews', type: 'website', name: 'Review injection', description: 'Reinforces trust with visible customer proof.', priceOneTime: 50, priceMonthly: 0 },
          { id: 'timed-offers', type: 'website', name: 'Timed offers engine', description: 'Supports controlled, time-boxed dealer offers.', priceOneTime: 70, priceMonthly: 0 },
        ],
      },
    ],
  },
  {
    id: 'software',
    title: 'Phase 2 — Software',
    subtitle: 'Add the operating layer. Included by default — untick anything you do not need.',
    sections: [
      {
        id: 'software-inbox',
        title: 'Leads and follow-up',
        subtitle: 'Run all enquiries from one place.',
        features: [
          { id: 'unified-inbox', type: 'software', name: 'Unified Inbox', description: 'Keeps every call, form, and marketplace enquiry in one operational thread.', priceOneTime: 220, priceMonthly: 0 },
          { id: 'smart-routing', type: 'software', name: 'Smart lead routing', description: 'Routes intent signals to the right team member faster.', priceOneTime: 150, priceMonthly: 0 },
          { id: 'intent-forms', type: 'software', name: 'Intent-based forms', description: 'Captures buyer context before the first call.', priceOneTime: 50, priceMonthly: 0 },
          { id: 'after-hours', type: 'software', name: 'After-hours lead capture', description: 'Prevents overnight enquiry loss.', priceOneTime: 40, priceMonthly: 0 },
          { id: 'lead-priority', type: 'software', name: 'Lead priority queue', description: 'Keeps the highest-value leads at the top.', priceOneTime: 40, priceMonthly: 0 },
        ],
      },
      {
        id: 'software-publishing',
        title: 'Publishing and stock operations',
        subtitle: 'Manage listings once and publish everywhere.',
        features: [
          { id: 'multi-platform', type: 'software', name: 'Multi-platform publishing', description: 'Publishes stock across key channels from one place.', priceOneTime: 300, priceMonthly: 0 },
          { id: 'finance-followup', type: 'software', name: 'Finance auto follow-up', description: 'Prevents warm finance leads from going cold.', priceOneTime: 80, priceMonthly: 0 },
          { id: 'trade-estimate', type: 'software', name: 'Instant trade-in estimate', description: 'Sets valuation expectations before manual review.', priceOneTime: 100, priceMonthly: 0 },
          { id: 'condition-slider', type: 'software', name: 'Condition slider valuation', description: 'Collects stronger trade condition context.', priceOneTime: 80, priceMonthly: 0 },
          { id: 'whatsapp-track', type: 'software', name: 'Click-to-WhatsApp tracking', description: 'Tracks direct chat engagement by stock.', priceOneTime: 31, priceMonthly: 0 },
          { id: 'dashboard', type: 'software', name: 'Dealer performance dashboard', description: 'Shows what is moving and what is stuck.', priceOneTime: 60, priceMonthly: 0 },
        ],
      },
    ],
  },
];

export const BUILDER_FEATURES = BUILDER_PHASES.flatMap((phase) =>
  phase.sections.flatMap((section) =>
    section.features.map((feature) => ({
      ...feature,
      phaseId: phase.id,
      sectionId: section.id,
      enabled: true,
    })),
  ),
);
