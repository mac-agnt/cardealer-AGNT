/** Guided package matcher: 7 questions → Core | Growth | Performance */

export const QUESTIONS = [
  {
    id: 'stock',
    prompt: 'How many vehicles do you usually carry in stock?',
    options: [
      { id: 'under25', label: 'Under 25', scores: { core: 4, growth: 1, performance: 0 } },
      { id: '25_60', label: '25–60', scores: { core: 1, growth: 4, performance: 2 } },
      { id: '60plus', label: '60+', scores: { core: 0, growth: 2, performance: 5 } },
    ],
  },
  {
    id: 'handling',
    prompt: 'How is stock and lead handling managed today?',
    options: [
      { id: 'mostly_manual', label: 'Mostly manual', scores: { core: 3, growth: 1, performance: 0 } },
      { id: 'mix', label: 'A mix of software and manual work', scores: { core: 1, growth: 3, performance: 1 } },
      { id: 'disconnected', label: 'Systems in place, but disconnected', scores: { core: 0, growth: 2, performance: 4 } },
    ],
  },
  {
    id: 'priority',
    prompt: 'What matters most for you right now?',
    options: [
      {
        id: 'website_stock',
        label: 'Website and stock presentation',
        scores: { core: 1, growth: 4, performance: 1 },
      },
      {
        id: 'leads',
        label: 'Lead handling and appointments',
        scores: { core: 0, growth: 4, performance: 2 },
      },
      {
        id: 'admin',
        label: 'Admin, paperwork, day-to-day control',
        scores: { core: 1, growth: 1, performance: 4 },
      },
      {
        id: 'scale',
        label: 'Scaling the whole setup properly',
        scores: { core: 0, growth: 2, performance: 5 },
      },
    ],
  },
  {
    id: 'whatsapp',
    prompt: 'How important is WhatsApp in your sales process?',
    options: [
      { id: 'nice', label: 'Nice to have', scores: { core: 3, growth: 1, performance: 0 } },
      { id: 'important', label: 'Important', scores: { core: 0, growth: 4, performance: 1 } },
      { id: 'core_channel', label: 'A core channel for us', scores: { core: 0, growth: 1, performance: 5 } },
    ],
  },
  {
    id: 'import',
    prompt: 'Do you source imported stock or need landed-cost clarity?',
    options: [
      { id: 'rarely', label: 'Rarely or never', scores: { core: 4, growth: 1, performance: 0 } },
      { id: 'sometimes', label: 'Sometimes', scores: { core: 1, growth: 3, performance: 2 } },
      { id: 'regularly', label: 'Regularly', scores: { core: 0, growth: 1, performance: 5 } },
    ],
  },
  {
    id: 'records',
    prompt: 'How are customer records and paperwork handled today?',
    options: [
      {
        id: 'paper',
        label: 'Mostly paper, memory, or inboxes',
        scores: { core: 2, growth: 2, performance: 1 },
      },
      {
        id: 'spread',
        label: 'Spread across a few tools',
        scores: { core: 1, growth: 3, performance: 2 },
      },
      {
        id: 'digitised',
        label: 'We want it fully digitised in one place',
        scores: { core: 0, growth: 2, performance: 4 },
      },
    ],
  },
  {
    id: 'setup',
    prompt: 'What kind of setup are you looking for?',
    options: [
      {
        id: 'lighter',
        label: 'A lighter system to tighten the basics',
        scores: { core: 5, growth: 1, performance: 0 },
      },
      {
        id: 'stronger',
        label: 'Stronger customer-facing and sales tooling',
        scores: { core: 0, growth: 5, performance: 1 },
      },
      {
        id: 'full',
        label: 'The most complete system you offer',
        scores: { core: 0, growth: 1, performance: 5 },
      },
    ],
  },
];

export const PACKAGES = {
  core: {
    id: 'core',
    name: 'Core',
    setupFee: 999,
    monthly: 200,
    bestFor: 'Smaller independents who want a sharper operating base without the full conversion and automation layer.',
    whyDefault:
      'You do not need every advanced module to get value. Core gives operating essentials (stock, CRM, publishing, and Social Studio) without loading day one with tools you may not lean on yet.',
    groups: [
      {
        title: 'Dealer workspace',
        items: ['Dashboard home', 'Vehicle management', 'Stock publishing & listing management', 'Settings'],
      },
      {
        title: 'Marketing & brand',
        items: ['Social Studio', 'Logo & watermark'],
      },
      {
        title: 'Customer handling',
        items: ['Customer profiles / CRM'],
      },
      {
        title: 'Website & conversion',
        items: ['Tailored public site foundation aligned to your brand'],
      },
    ],
  },
  growth: {
    id: 'growth',
    name: 'Growth',
    setupFee: 1699,
    monthly: 300,
    includesNote: 'Includes everything in Core.',
    bestFor: 'Growing independents who need stronger enquiry handling and a retail-grade site without the deepest automation tier.',
    whyDefault:
      'Growth fits when the website and lead path need to match how buyers actually shop, while keeping the stack disciplined before you step up to full AI and import tooling.',
    groups: [
      {
        title: 'Website & conversion',
        items: [
          'Premium dealer website',
          'Inventory search & filtering',
          'Vehicle listing pages',
          'Finance calculator',
          'Trade-in / sell your car funnel',
          'Quick enquiry form',
          'Cash / monthly presentation where applicable',
        ],
      },
      {
        title: 'Customer handling',
        items: [
          'WhatsApp integration',
          'Lead management',
          'Appointments',
          'Customer profiles / CRM',
        ],
      },
      {
        title: 'Dealer workspace',
        items: ['Dashboard home', 'Vehicle management', 'Stock publishing & listing management', 'Social Studio', 'Settings'],
      },
      {
        title: 'Marketing & brand',
        items: ['Logo & watermark'],
      },
    ],
  },
  performance: {
    id: 'performance',
    name: 'Performance',
    setupFee: 2499,
    monthly: 397,
    includesNote: 'Includes everything in Growth.',
    bestFor: 'Established independents who want conversion, customer handling, sourcing, and admin running through one tighter system.',
    whyDefault:
      'Performance is the right fit when WhatsApp, imports, paperwork, and operational load all need to sit in one place, so nothing serious lives in parallel tools or memory.',
    groups: [
      {
        title: 'Website & conversion',
        items: [
          'Premium dealer website',
          'Inventory search & filtering',
          'Vehicle listing pages',
          'Finance calculator',
          'Trade-in / sell your car funnel',
          'Online vehicle reservations',
          'Cash / monthly price toggle',
          'Walkaround video on listings',
          'Quick enquiry form',
        ],
      },
      {
        title: 'Customer handling',
        items: [
          'WhatsApp AI sales agent',
          'WhatsApp integration & lead management',
          'Appointments',
          'Enhanced customer context & lifecycle',
        ],
      },
      {
        title: 'Sourcing & import',
        items: ['Import price calculator (landed cost clarity)'],
      },
      {
        title: 'Admin & automation',
        items: [
          'Digitised dealer admin documents',
          'Automated dealership admin workflows',
        ],
      },
      {
        title: 'Dealer workspace',
        items: ['Dashboard home', 'Vehicle management', 'Stock publishing & listing management', 'Social Studio', 'Settings'],
      },
      {
        title: 'Marketing & brand',
        items: ['Logo & watermark'],
      },
    ],
  },
};

const LOADING_STAGES = [
  'Reviewing your answers',
  'Configuring your system',
  'Matching the right modules',
  'Preparing your recommendation',
];

export function getLoadingStages() {
  return LOADING_STAGES;
}

function addScores(totals, scores) {
  totals.core += scores.core;
  totals.growth += scores.growth;
  totals.performance += scores.performance;
}

export function computePackageId(answers) {
  const totals = { core: 0, growth: 0, performance: 0 };

  QUESTIONS.forEach((q) => {
    const choice = answers[q.id];
    const opt = q.options.find((o) => o.id === choice);
    if (opt) addScores(totals, opt.scores);
  });

  const ranked = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  const topScore = ranked[0][1];
  const tied = ranked.filter(([, s]) => s === topScore).map(([k]) => k);

  if (tied.length === 1) return tied[0];

  if (answers.setup === 'lighter' && tied.includes('core')) return 'core';
  if (answers.setup === 'stronger' && tied.includes('growth')) return 'growth';
  if (answers.setup === 'full' && tied.includes('performance')) return 'performance';

  if (answers.whatsapp === 'core_channel' && tied.includes('performance')) return 'performance';
  if (answers.import === 'regularly' && tied.includes('performance')) return 'performance';
  if (answers.priority === 'scale' && tied.includes('performance')) return 'performance';

  if (tied.includes('growth')) return 'growth';
  return ranked[0][0];
}

export function getResultNarrative(packageId, answers) {
  const pkg = PACKAGES[packageId];
  const lines = [];

  if (packageId === 'core') {
    if (answers.stock === 'under25' || answers.setup === 'lighter') {
      lines.push(
        'Based on stock scale and how you want to start, Core keeps the footprint lean while still lifting presentation, CRM, and publishing.'
      );
    } else {
      lines.push(pkg.whyDefault);
    }
  } else if (packageId === 'growth') {
    if (answers.priority === 'website_stock' || answers.priority === 'leads') {
      lines.push(
        'You flagged the public site and enquiry path as the priority. Growth adds the retail tooling and lead structure Core does not carry, without jumping to the full automation tier.'
      );
    } else {
      lines.push(pkg.whyDefault);
    }
  } else {
    if (answers.import === 'regularly' || answers.whatsapp === 'core_channel') {
      lines.push(
        'Imports and/or WhatsApp are material to how you trade. Performance layers in landed-cost clarity, AI-assisted WhatsApp, digitised documents, and workflow automation so nothing critical sits outside the system.'
      );
    } else {
      lines.push(pkg.whyDefault);
    }
  }

  return {
    headline: 'Your recommended setup',
    why: lines[0],
    bestFor: pkg.bestFor,
  };
}
