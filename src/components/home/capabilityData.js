/**
 * Capability summary (3 homepage cards) + in-depth pages under /capabilities/*
 */

export const CAPABILITY_SUMMARY = [
  {
    id: 'website',
    slug: 'website-conversion',
    route: '/capabilities/website-conversion',
    eyebrow: 'Website',
    title: 'Website & conversion',
    tagline:
      'Fully branded dealer site, stock presentation, and conversion tools: finance, trade-in, reservations, and enquiry paths, built for serious Irish buyers.',
    features: [
      'Premium responsive site and vehicle pages',
      'Finance, trade-in, reservations, WhatsApp prompts',
      'Service, EV hub, offers, new and used stock',
      'Search, filters, and enquiry paths built to convert',
      'One brand and data set, not a bolt-on microsite',
    ],
  },
  {
    id: 'operations',
    slug: 'dealer-operations',
    route: '/capabilities/dealer-operations',
    eyebrow: 'Operations',
    title: 'Dealer operations',
    tagline:
      'Dashboard, stock, listings, import maths, branding on photos, Social Studio, digitised documents, and admin workflows: how the yard runs day to day.',
    features: [
      'Dashboard, vehicles, and live listings',
      'Listing health, pricing signals, landed import cost',
      'Logo and watermark on photos',
      'Social Studio from real stock',
      'Digitised documents and admin automation',
    ],
  },
  {
    id: 'sales',
    slug: 'sales-follow-up',
    route: '/capabilities/sales-follow-up',
    eyebrow: 'Sales',
    title: 'Sales & follow-up',
    tagline:
      'Leads from every channel, WhatsApp AI with clean handoff, appointments, CRM, and follow-up visibility so enquiries do not die in silos.',
    features: [
      'Unified leads from site and marketplaces',
      'WhatsApp AI sales agent with dealer takeover',
      'Appointments with source, notes, and status',
      'Customer profiles and deal history',
      'Follow-up visibility by status and risk',
    ],
  },
];

const DETAIL = {
  'website-conversion': {
    heroEyebrow: 'Capability',
    title: 'Website & conversion',
    heroSub: 'The public face of your yard: sharp, fast, and built to turn browsers into qualified enquiries.',
    lead:
      'AGNT gives independents a dealer website that reads as serious as a franchise group: proper stock discovery, rich vehicle pages, and conversion tools that match how Irish buyers actually shop.',
    body:
      'From homepage and filters to finance estimates, trade-in, reservations, and WhatsApp prompts, everything is tied to the same brand and data. No bolt-on microsite that fights your process.',
    placeholderLabel:
      'Premium public dealer website on desktop and mobile: calm product composition, stock grids, vehicle detail, finance and enquiry paths.',
    supportCards: [
      {
        title: 'Site & brand',
        bullets: [
          'Fully branded responsive site: dealer name, logo, colours, hours, and contact',
          'Homepage, used stock, new cars, offers, service, EV hub, finance, sell your car, about, contact',
          'Premium layout and typography: conversion-led, not cookie-cutter',
        ],
      },
      {
        title: 'Stock discovery',
        bullets: [
          'Search and filters by make, model, year, budget, fuel, transmission',
          'Quick-search and “Just Arrived” tabs for segments that suit your forecourt',
          'Vehicle pages: gallery, specs, features, vehicle file, social proof where it helps',
          'Cash / monthly price toggle and walkaround video on listings',
        ],
      },
      {
        title: 'Conversion tools',
        bullets: [
          'Finance calculator with deposit, term, and APR, wired from listings',
          'Trade-in / sell your car funnel: structured capture, then ballpark guidance',
          'Online reservations: refundable deposit flow from vehicle pages',
          'WhatsApp integration and quick enquiry forms where buyers expect them',
        ],
      },
      {
        title: 'Buyer journeys',
        bullets: [
          'Service page: tiers and NCT-focused offers where you run a workshop',
          'Electric vehicle hub: EV stock plus practical running-cost framing',
          'Offers / sale page: price-drop vehicles with clear savings',
          'Contact page: form, phone, email, address, hours',
        ],
      },
    ],
  },
  'dealer-operations': {
    heroEyebrow: 'Capability',
    title: 'Dealer operations',
    heroSub:
      'The workspace behind the site: stock discipline, listing quality, import maths, and admin that scales with the yard.',
    lead:
      'Independent dealers need one place to run vehicles, listings, landed costs, and paperwork. AGNT pulls dashboard signals, vehicle management, and digitised admin into a single calm layer.',
    body:
      'Social Studio feeds the market with publish-ready creative from real stock. Documents and workflows sit against customer and vehicle records so reminders and handovers are system-led, not folder-led.',
    placeholderLabel:
      'Dealer workspace: dashboard, inventory, listing health, import tools, document and admin panels in a premium staged composition.',
    supportCards: [
      {
        title: 'Dashboard & stock',
        bullets: [
          'Dashboard home: KPIs for vehicles, listings, leads, inventory health',
          'Add, edit, and publish vehicles: specs, photos, pricing, features, descriptions',
          'Active listings and inventory health: aged stock, fixes, pricing signals',
          'Listing optimisation: keep channels aligned without double entry',
        ],
      },
      {
        title: 'Import & margin',
        bullets: [
          'Import price calculator: source URL or manual entry, Japan / GB / Northern Ireland logic',
          'Live rates, shipping, insurance, duty, VAT, VRT, NOx, fees, OMSP, margin, saved calculations',
        ],
      },
      {
        title: 'Branding & imagery',
        bullets: [
          'Logo and watermark: position, size, opacity, margins, background-aware overlays on photos',
        ],
      },
      {
        title: 'Social Studio',
        bullets: [
          'Choose vehicle, generate or select imagery treatments and layout variants',
          'Caption generation and publish-ready outputs',
          'Refresh and repost workflows from live stock',
        ],
      },
      {
        title: 'Documents & automation',
        bullets: [
          'Digitised dealer admin: invoices, receipts, trade-in agreements, sales contracts, declarations, GDPR consents',
          'Automated workflows: follow-up reminders, document generation, trade-in triggers',
          'Service, NCT, and tax expiry alerts tied to the right records',
          'Settings: dealership configuration, branding, accounts',
        ],
      },
    ],
  },
  'sales-follow-up': {
    heroEyebrow: 'Capability',
    title: 'Sales & follow-up',
    heroSub:
      'Every enquiry channel feeding one pipeline: AI help on WhatsApp and proper records behind every deal.',
    lead:
      'Website, WhatsApp, Carzone, DoneDeal, and Cars Ireland land in one searchable lead layer. Appointments carry source, notes, and status. CRM holds purchase and trade-in history so handovers stay factual.',
    body:
      'The WhatsApp AI sales agent answers in plain dealership language, searches inventory, books viewings, tags intent, and flags when your team needs to take over. Dashboard visibility on conversation load and handoffs.',
    placeholderLabel:
      'WhatsApp AI, lead queue, appointments, and CRM context: layered premium product visual.',
    supportCards: [
      {
        title: 'Lead management',
        bullets: [
          'Single workspace for website, WhatsApp, and marketplace leads',
          'Source, vehicle, and status on every line: searchable and filterable',
          'Follow-up visibility: what needs a reply, what is waiting, what is at risk',
        ],
      },
      {
        title: 'WhatsApp AI sales agent',
        bullets: [
          'Natural dealer-style messaging for inbound WhatsApp',
          'Inventory search inside the conversation',
          'Book test drives and viewings from chat',
          'Intent tagging: AI active, handoff needed, closed',
          'Dealer takeover when the deal needs a human',
          'Dashboard view of live conversations and attention required',
        ],
      },
      {
        title: 'Appointments',
        bullets: [
          'Viewings and test drives with type, time, contact, booking source, and notes',
          'Status handling so the desk knows who is arriving and what was promised',
        ],
      },
      {
        title: 'CRM & history',
        bullets: [
          'Customer profiles: buyer and seller records with contact and vehicle interest',
          'Enquiry, purchase, and trade-in history attached to the right people',
        ],
      },
    ],
  },
};

export function getCapabilityDetail(slug) {
  return DETAIL[slug] ?? null;
}

export const CAPABILITY_SLUGS = Object.keys(DETAIL);
