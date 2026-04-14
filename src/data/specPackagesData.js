/** Legacy website-led package definitions for /spec/packages review page */

export const PATHS = {
  pro: 'pro',
  base: 'base',
};

export const DEALER_PRO = {
  name: 'Dealer Pro',
  price: 2800,
  previousPrice: 3200,
  subtitle: 'Full website package with built-in tools for active independent dealers.',
  websiteFeatures: [
    'Premium website architecture',
    'Strong lead capture across stock and vehicle pages',
    'Finance-first listing framing where you need it',
    'Conversion-focused vehicle detail pages',
    'Stock publishing controls',
  ],
  osFeatures: [
    'Workspace for vehicles, leads, appointments and WhatsApp',
    'Lead queue, follow-up and escalation visibility',
    'Stock attention, aged stock and listing fixes',
    'Publishing workflow across your channels',
    'Performance views for marketing and stock movement',
  ],
  websiteImage: '/car dealer website template.png',
  osImage: '/car dealer dashbaord template.png',
};

export const DEALER_PRO_SUMMARY = {
  website: [
    'Premium dealer website',
    'Mobile-first stock pages',
    'Finance calculator',
    'Trade-in / valuation funnel',
    'Reserve / deposit option',
  ],
  software: [
    'Reg + photos → instant listing drafts',
    'Publish to Carzone, DoneDeal and Cars.ie',
    'Lead handling and follow-up in one place',
    'Lead priority and queue visibility',
    'Stock and listing health at a glance',
  ],
};

export const BASE_SITE = {
  name: 'Base Site (Brochure Level)',
  price: 999,
  subtitle: 'Basic online presence. No automation layer.',
  websiteFeatures: [
    'Brochure website shell',
    'Manual listings and edits',
    'Basic search and filters',
    'Standard contact pathways',
    'Core pages and business info',
  ],
  osFeatures: [
    'Basic admin access',
    'Manual listing workflow',
    'No automation layer',
    'No lead scoring or routing',
    'No unified communication feed',
  ],
  websiteImage: '/6bf5949e-e739-4a94-b0d4-8d4da72fe715.png',
  osImage: '/car dealer dashbaord template.png',
};

export const BASE_SITE_FLAT_BULLETS = [
  'Brochure website shell',
  'Manual vehicle listings',
  'Basic search and filters',
  'Standard enquiry forms',
  'Basic admin access',
  'Manual listing workflow',
];

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
}
