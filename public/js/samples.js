// Sample data for empty states.
//
// When any list page has zero real items, we render these fixtures so a
// brand-new customer sees what a populated workspace looks like instead of
// an empty table. Samples are identified by `isSample: true` and given a
// `sample-*` ID prefix, so row renderers can style them distinctly and
// disable Edit/Delete actions.
//
// All samples form one coherent scenario — a fictitious mid-market
// healthcare organization called "Memorial Community Clinic" — so the
// walkthrough tour can tell a consistent story across pages.

// Reference IDs so collections can cross-link. These are fake — they never
// land in Firestore.
const S_INV_DOCSUM = 'sample-inv-docsummarizer';
const S_INV_APPT   = 'sample-inv-appointmentbot';
const S_INV_CADE   = 'sample-inv-radiology-cade';

// ---------- Inventory ----------
export const INVENTORY_SAMPLES = [
  {
    id: S_INV_DOCSUM,
    isSample: true,
    name: 'DocSummarizer — clinical note summarization',
    purpose: 'Summarize patient-encounter notes for continuity-of-care handoffs.',
    owner: 'Dr. Sarah Chen',
    sourcing: 'Third-party SaaS',
    lifecycle: 'Production',
    riskTier: 'High',
    updatedAt: '2026-04-12T14:22:00Z',
  },
  {
    id: S_INV_APPT,
    isSample: true,
    name: 'AppointmentBot — patient scheduling chatbot',
    purpose: 'Route patient scheduling requests; check insurance eligibility.',
    owner: 'Miguel Rivera',
    sourcing: 'Third-party SaaS',
    lifecycle: 'Pilot',
    riskTier: 'Medium',
    updatedAt: '2026-04-08T10:02:00Z',
  },
  {
    id: S_INV_CADE,
    isSample: true,
    name: 'Radiology CADe — chest X-ray triage',
    purpose: 'FDA-cleared computer-aided detection for chest X-ray abnormalities.',
    owner: 'Dr. James Park',
    sourcing: 'Third-party SaaS',
    lifecycle: 'Production',
    riskTier: 'High',
    updatedAt: '2026-03-30T16:45:00Z',
  },
];

// ---------- Risks ----------
export const RISKS_SAMPLES = [
  {
    id: 'sample-risk-hallucination',
    isSample: true,
    title: 'Hallucinated clinical details in summaries',
    systemId: S_INV_DOCSUM,
    systemName: 'DocSummarizer',
    owner: 'Dr. Sarah Chen',
    inherentScore: 16,
    treatment: 'Mandatory clinician verification before hand-off; summary labeled "draft".',
    residualScore: 4,
    status: 'Treated',
    regulatoryBasis: 'HIPAA §164.308, NIST AI RMF MAP 5.1',
    emergent: false,
  },
  {
    id: 'sample-risk-phi-leak',
    isSample: true,
    title: 'PHI leakage through model provider',
    systemId: S_INV_DOCSUM,
    systemName: 'DocSummarizer',
    owner: 'Janet Liu — Privacy Officer',
    inherentScore: 20,
    treatment: 'BAA executed with vendor; prompts redacted; annual data-handling audit.',
    residualScore: 8,
    status: 'Treated',
    regulatoryBasis: 'HIPAA Privacy Rule §164.504',
    emergent: false,
  },
  {
    id: 'sample-risk-appt-denial',
    isSample: true,
    title: 'Appointment bot denies care inappropriately',
    systemId: S_INV_APPT,
    systemName: 'AppointmentBot',
    owner: 'Miguel Rivera',
    inherentScore: 12,
    treatment: 'Human fallback on any negative decision; weekly disparity review.',
    residualScore: 6,
    status: 'Treated',
    regulatoryBasis: 'Anti-discrimination (ACA §1557)',
    emergent: false,
  },
  {
    id: 'sample-risk-cade-false-neg',
    isSample: true,
    title: 'False negative on chest X-ray triage',
    systemId: S_INV_CADE,
    systemName: 'Radiology CADe',
    owner: 'Dr. James Park',
    inherentScore: 20,
    treatment: 'Every CADe output reviewed by radiologist (FDA-cleared workflow).',
    residualScore: 8,
    status: 'Treated',
    regulatoryBasis: 'FDA 510(k), HIPAA',
    emergent: true,
    feedbackSource: 'Radiology QA report 2026-Q1',
  },
];

// ---------- AIAs ----------
export const AIAS_SAMPLES = [
  {
    id: 'sample-aia-docsum',
    isSample: true,
    systemId: S_INV_DOCSUM,
    systemName: 'DocSummarizer',
    version: 'v1.0',
    impactScore: 18,
    status: 'Approved',
    reviewedAt: '2026-02-20T09:30:00Z',
    updatedAt: '2026-02-20T09:30:00Z',
  },
  {
    id: 'sample-aia-appt',
    isSample: true,
    systemId: S_INV_APPT,
    systemName: 'AppointmentBot',
    version: 'v0.3 (pilot)',
    impactScore: 11,
    status: 'Draft',
    reviewedAt: null,
    updatedAt: '2026-04-05T15:10:00Z',
  },
];

// ---------- Intake ----------
export const INTAKE_SAMPLES = [
  {
    id: 'sample-intake-new-imaging',
    isSample: true,
    title: 'Evaluate new medical-imaging AI vendor (PneumoScan)',
    requesterName: 'Dr. Amy Zhang',
    department: 'Radiology',
    createdAt: '2026-04-10T11:05:00Z',
    status: 'Pending review',
  },
  {
    id: 'sample-intake-clinician-chatgpt',
    isSample: true,
    title: 'ChatGPT plugin for clinician note drafting',
    requesterName: 'Tom Whitfield',
    department: 'IT',
    createdAt: '2026-03-18T08:40:00Z',
    status: 'Approved',
  },
];

// ---------- Policies ----------
export const POLICIES_SAMPLES = [
  {
    id: 'sample-policy-aup',
    isSample: true,
    name: 'Acceptable AI Use Policy',
    description: 'Rules for how clinicians and staff may use AI tools, with guardrails for PHI handling.',
    framework: 'NIST AI RMF',
    gainCollection: 'Core',
    status: 'Approved',
    owner: 'Chief Privacy Officer',
    nextReviewDate: '2027-03-01',
    updatedAt: '2026-03-12T13:15:00Z',
  },
  {
    id: 'sample-policy-incident',
    isSample: true,
    name: 'AI Incident Response Plan',
    description: 'Procedures for detecting, reporting, and remediating AI-system incidents (hallucinations, bias, drift).',
    framework: 'NIST AI RMF',
    gainCollection: 'Core',
    status: 'Approved',
    owner: 'Janet Liu',
    nextReviewDate: '2026-08-15',
    updatedAt: '2026-02-28T10:45:00Z',
  },
  {
    id: 'sample-policy-monitoring',
    isSample: true,
    name: 'Model Monitoring and Drift Policy',
    description: 'Continuous-monitoring requirements for production AI systems, with drift thresholds and re-validation triggers.',
    framework: 'ISO 42001',
    gainCollection: 'Operations',
    status: 'Draft',
    owner: 'Dr. Sarah Chen',
    nextReviewDate: '2026-06-01',
    updatedAt: '2026-04-01T09:00:00Z',
  },
];

// ---------- Contracts ----------
export const CONTRACTS_SAMPLES = [
  {
    id: 'sample-contract-docsum-baa',
    isSample: true,
    vendorName: 'DocSummarizer Inc.',
    contractType: 'BAA',
    systemId: S_INV_DOCSUM,
    systemName: 'DocSummarizer',
    effectiveDate: '2025-10-01',
    expirationDate: '2028-10-01',
    status: 'Active',
    clauses: { phi_handling: true, subprocessor_flowdown: true, audit_rights: true },
    externalLink: '',
  },
  {
    id: 'sample-contract-appt-msa',
    isSample: true,
    vendorName: 'AppointmentBot Inc.',
    contractType: 'MSA',
    systemId: S_INV_APPT,
    systemName: 'AppointmentBot',
    effectiveDate: '2025-12-15',
    expirationDate: '2026-12-15',
    status: 'Active',
    clauses: { data_retention: true, audit_rights: true },
    externalLink: '',
  },
  {
    id: 'sample-contract-cade-baa',
    isSample: true,
    vendorName: 'RadAI Systems',
    contractType: 'BAA',
    systemId: S_INV_CADE,
    systemName: 'Radiology CADe',
    effectiveDate: '2024-06-01',
    expirationDate: '2026-06-01',
    status: 'Expiring soon',
    clauses: { phi_handling: true, subprocessor_flowdown: true },
    externalLink: '',
  },
];

// ---------- Incidents ----------
export const INCIDENTS_SAMPLES = [
  {
    id: 'sample-incident-hallucination',
    isSample: true,
    title: 'DocSummarizer produced fabricated medication dosage in summary',
    systemId: S_INV_DOCSUM,
    systemFree: 'DocSummarizer',
    category: 'hallucination',
    severity: 'high',
    status: 'resolved',
    detectedAt: '2026-03-22T07:50:00Z',
    ownerFree: 'Dr. Sarah Chen',
    reportableExternal: false,
  },
];

// ---------- Consent records ----------
export const CONSENT_SAMPLES = [
  {
    id: 'sample-consent-docsum-1',
    isSample: true,
    subjectName: 'Jane Doe (patient)',
    subjectEmail: 'jane.doe@example.com',
    regulation: 'HIPAA',
    purpose: 'AI-assisted clinical documentation (DocSummarizer)',
    consentedAt: '2026-01-15T14:30:00Z',
    recordedByName: 'Janet Liu',
  },
  {
    id: 'sample-consent-appt-1',
    isSample: true,
    subjectName: 'John Smith (patient)',
    subjectEmail: 'john.smith@example.com',
    regulation: 'HIPAA',
    purpose: 'AI-powered appointment reminders & rescheduling (AppointmentBot)',
    consentedAt: '2026-02-03T11:00:00Z',
    recordedByName: 'Miguel Rivera',
  },
];

// ---------- Disclosures ----------
export const DISCLOSURES_SAMPLES = [
  {
    id: 'sample-disclosure-cade',
    isSample: true,
    systemId: S_INV_CADE,
    systemName: 'Radiology CADe',
    disclosureType: 'Public website notice',
    venue: 'memorial-community.org/ai-disclosures',
    disclosedAt: '2026-01-05T00:00:00Z',
    url: 'https://memorial-community.example/ai-disclosures',
    frameworkRefs: 'EU AI Act Art. 13',
  },
  {
    id: 'sample-disclosure-sec',
    isSample: true,
    systemId: S_INV_DOCSUM,
    systemName: 'DocSummarizer',
    disclosureType: 'Form 10-K AI risk disclosure',
    venue: 'SEC filing',
    disclosedAt: '2026-03-01T00:00:00Z',
    url: '',
    frameworkRefs: 'SEC Regulation S-K Item 101(c)',
  },
];

// ---------- Training ----------
export const TRAINING_ROSTER_SAMPLES = [
  {
    id: 'sample-roster-chen',
    isSample: true,
    name: 'Dr. Sarah Chen',
    email: 'schen@memorial-community.example',
    department: 'Clinical',
    jobTitle: 'Chief Medical Informatics Officer',
  },
  {
    id: 'sample-roster-rivera',
    isSample: true,
    name: 'Miguel Rivera',
    email: 'mrivera@memorial-community.example',
    department: 'Operations',
    jobTitle: 'Patient Access Manager',
  },
  {
    id: 'sample-roster-liu',
    isSample: true,
    name: 'Janet Liu',
    email: 'jliu@memorial-community.example',
    department: 'Compliance',
    jobTitle: 'Chief Privacy Officer',
  },
];

export const TRAINING_COURSES_SAMPLES = [
  {
    id: 'sample-course-101',
    isSample: true,
    title: 'AI Governance 101 for Clinicians',
    description: 'Using AI tools safely in clinical settings — PHI rules, hallucination awareness, when to escalate.',
    category: 'AI Governance',
    format: 'Live',
    durationHours: 2,
    requiredFor: 'All clinical staff',
  },
  {
    id: 'sample-course-vendor',
    isSample: true,
    title: 'HIPAA and AI Vendor Due Diligence',
    description: 'What to check when onboarding a new AI vendor that touches PHI.',
    category: 'Privacy & Compliance',
    format: 'Async',
    durationHours: 1,
    requiredFor: 'IT, Compliance, Contracts',
  },
];

export const TRAINING_CLASSES_SAMPLES = [
  {
    id: 'sample-class-101-q1',
    isSample: true,
    courseName: 'AI Governance 101 for Clinicians',
    date: '2026-02-15T09:00:00Z',
    period: 'Q1 2026',
    enrolled: 42,
    completions: 38,
    status: 'Completed',
  },
  {
    id: 'sample-class-vendor-q2',
    isSample: true,
    courseName: 'HIPAA and AI Vendor Due Diligence',
    date: '2026-05-12T13:00:00Z',
    period: 'Q2 2026',
    enrolled: 15,
    completions: 0,
    status: 'Scheduled',
  },
];

// ---------- Helpers ----------

// Swap in sample data when a user's real list is empty. The caller gets
// back samples with `isSample: true` so row renderers can decorate them.
// Pages pass their own samples array; this keeps the sample data
// centralized while letting each page control when samples appear (e.g.
// only when filters aren't active).
export function withSamplesIfEmpty(items, samples) {
  if (Array.isArray(items) && items.length > 0) return items;
  return samples || [];
}

// Inline banner that pages can render above their table when samples are
// being shown. The label fills in the collection name ("inventory items",
// "risks", "policies", etc.). Plain HTML string — pages insert where they
// render empty states.
export function sampleBannerHTML(label) {
  return `
    <div class="sample-banner" role="status">
      <span class="sample-pill">SAMPLE DATA</span>
      <span class="sample-banner-text">
        You're viewing sample ${label} from a fictitious healthcare organization
        ("Memorial Community Clinic") so you can see what a populated workspace
        looks like. Add your first real entry and these samples disappear.
      </span>
    </div>
  `;
}

// Used when a page wants to detect sample presence without importing the
// specific sample array — e.g. to disable Edit/Delete handlers on rows
// that carry `isSample: true`.
export function isSampleRow(row) {
  return !!(row && row.isSample);
}
