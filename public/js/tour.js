// Walkthrough tour.
//
// When a new user clicks "Start tour" (on the dashboard or in settings),
// we navigate to the first page with ?tour=0. Every page imports this
// module; on load, it checks the URL for ?tour=<step> and renders a
// floating panel explaining what that page does, referencing the sample
// data already on the page.
//
// State:
// - Completion is remembered in localStorage under `gain.tour.completed`
//   (boolean) so the Dashboard CTA can auto-hide for users who've already
//   done the tour.
// - No per-step progress tracking — the step number travels in the URL.
//
// Flow model: each step specifies a target page and body content. "Next"
// navigates to the next step's page with ?tour=<n+1>; "Previous" does the
// reverse; "Skip tour" marks completed and returns to the dashboard.

// ---------- tour content ----------
// One step per core page. Body copy references the sample data the user
// sees on the page — that's the point: the tour teaches by showing.
export const TOUR_STEPS = [
  {
    page: '/dashboard.html',
    title: 'Welcome to GAIN',
    body: `
      <p>This is your <strong>Dashboard</strong> — a posture summary of every
      governance workflow in your workspace.</p>
      <p>For this tour, every page is pre-populated with sample data from a
      fictitious healthcare organization ("Memorial Community Clinic") so you
      can see what a populated workspace looks like. Your real data stays
      separate — samples disappear as soon as you add your first real entry.</p>
      <p><strong>What you'll see in 10 stops:</strong> framework posture,
      intake, inventory, risks, AIAs, checklists, policies, miscellaneous
      tools, and settings.</p>
    `,
  },
  {
    page: '/framework.html',
    title: 'Framework posture',
    body: `
      <p>This is where you tell GAIN which AI governance frameworks, laws, and
      sectors apply to you.</p>
      <p>Pick sectors (Healthcare/HIPAA, Education/FERPA, Finance/GLBA, etc.)
      and jurisdictions (EU, US states). GAIN uses this posture to decide
      which checklists appear, which AIA questions are required, and which
      policy templates are suggested — so you only see what's relevant.</p>
      <p><strong>Tip:</strong> set this before adding AI systems, so intake
      forms know which conditional blocks to show.</p>
    `,
  },
  {
    page: '/intake.html',
    title: 'Intake — every new AI idea starts here',
    body: `
      <p>Every new AI use case — whether you're building, buying, or enabling
      a vendor feature — starts with an intake request.</p>
      <p>The samples show two realistic examples: a new medical-imaging
      vendor evaluation from Radiology, and a ChatGPT plugin request from IT.
      Each carries a requester, department, and triage status.</p>
      <p>Intake is the front door — approved requests become AI systems in
      your Inventory, trigger AIAs if high-impact, and create an audit trail
      for NIST AI RMF MAP 1.1.</p>
    `,
  },
  {
    page: '/inventory.html',
    title: 'Inventory — every AI system you operate',
    body: `
      <p>The Inventory is your central register of every AI system in
      production, pilot, or planned.</p>
      <p>The samples show three realistic systems: <strong>DocSummarizer</strong>
      (clinical-note summarization), <strong>AppointmentBot</strong> (scheduling
      chatbot), and <strong>Radiology CADe</strong> (X-ray triage). Each has
      a risk tier, owner, and sourcing type.</p>
      <p>Risk tier drives whether a system needs an AIA before launch. HIPAA
      and GLBA sectors add vendor-BAA and regulatory-control fields to the
      editor automatically.</p>
    `,
  },
  {
    page: '/risks.html',
    title: 'Risk register — every identified risk + its treatment',
    body: `
      <p>For each AI system, you log inherent risk, treatment, and residual
      risk. Every risk has an owner and review date.</p>
      <p>The samples show four realistic risks tied to the sample inventory:
      hallucinated clinical details, PHI leakage through the model vendor,
      inappropriate appointment denial, and false-negative X-ray triage. Each
      cites a regulatory basis (HIPAA, FDA, ACA §1557).</p>
      <p>Emergent and externally-sourced risks are flagged separately per
      NIST MEASURE 3.1.</p>
    `,
  },
  {
    page: '/aia.html',
    title: 'AI Impact Assessments',
    body: `
      <p>An AIA documents the intended use, stakeholders, data, fairness,
      human oversight, and residual risk of a specific AI system. GAIN
      requires one for any high-risk system before launch.</p>
      <p>The samples show two: an <strong>Approved</strong> AIA for
      DocSummarizer (v1.0), and a <strong>Draft</strong> AIA for
      AppointmentBot in pilot.</p>
      <p>Your framework posture decides which questions are mandatory — e.g.
      ISO 42001 adds oversight-plan fields, EU AI Act adds Art. 10 data-
      governance fields.</p>
    `,
  },
  {
    page: '/checklists.html',
    title: 'Compliance checklists',
    body: `
      <p>GAIN ships checklists for every major framework — NIST AI RMF, ISO
      42001, EU AI Act — plus sector-specific ones (HIPAA, FERPA, GLBA, SOX,
      ECOA, NAIC, Colorado AI Act, NYC Local Law 144).</p>
      <p>Which sector checklists appear is driven by your Framework posture,
      so a healthcare org sees HIPAA and a bank sees GLBA. Your NIST AI RMF
      core checklist is always on.</p>
      <p>Tick items as your program meets them. The Dashboard rolls up your
      progress across all active checklists.</p>
    `,
  },
  {
    page: '/policies.html',
    title: 'Policies — draft, approve, ratify, track review dates',
    body: `
      <p>A library of your organisation's AI governance policies. GAIN
      <strong>suggests policies based on your posture</strong> so nothing
      your frameworks require falls through.</p>
      <p>The samples show three realistic policies: Acceptable AI Use,
      Incident Response Plan, and Model Monitoring & Drift.</p>
      <p>Clicking <strong>+ New policy</strong> lets the built-in AI assistant
      (Claude Haiku) draft the document — you review, edit, approve, and set
      a next-review date. Overdue-review alerts surface on this page.</p>
    `,
  },
  {
    page: '/misc.html',
    title: 'Miscellaneous — contracts, incidents, consent, disclosures, training',
    body: `
      <p>Five more tools grouped on one page until they justify top-level
      nav: Vendor Contracts & BAAs, Incident Response, Consent Records,
      Public Disclosures, and Training.</p>
      <p>The samples show realistic entries across all five — BAAs with AI
      vendors, a resolved hallucination incident, HIPAA consent authorizations,
      an EU AI Act Art. 13 disclosure, and AI Governance 101 training for
      clinicians.</p>
      <p>Each sub-tool satisfies specific framework controls: Contracts
      covers NIST GOVERN 5.1 and HIPAA §164.308; Training covers GOVERN 6.1;
      Incidents covers MANAGE 4.1; etc.</p>
    `,
  },
  {
    page: '/settings.html',
    title: 'Settings — plan, members, branding, data rights',
    body: `
      <p>Your workspace control panel.</p>
      <p>Key sections: <strong>Plan &amp; Billing</strong> (view your tier, see
      limits, upgrade), <strong>Profile</strong>, <strong>Security</strong>
      (change password), <strong>Members</strong> (invite teammates, assign
      owner/admin/editor/viewer roles), <strong>Branding</strong>
      (Business &amp; Enterprise: hide the GAIN tagline), and
      <strong>Data &amp; Deletion Rights</strong> (export ZIP of your
      entire workspace, request workspace or account deletion with a
      verifiable certificate).</p>
      <p>That's the full tour. When you're ready, add your first real AI
      system to the Inventory — the samples will retire themselves.</p>
    `,
  },
];

// ---------- storage keys ----------
const COMPLETED_KEY = 'gain.tour.completed';

export function hasCompletedTour() {
  try { return localStorage.getItem(COMPLETED_KEY) === '1'; } catch (_) { return false; }
}

export function markTourCompleted() {
  try { localStorage.setItem(COMPLETED_KEY, '1'); } catch (_) {}
}

export function resetTour() {
  try { localStorage.removeItem(COMPLETED_KEY); } catch (_) {}
}

// ---------- tour engine ----------

// Starts the tour at step 0 by navigating to the first step's page. Called
// from the Dashboard "Start tour" CTA and from Settings "Restart tour".
export function startTour() {
  const first = TOUR_STEPS[0];
  window.location.href = `${first.page}?tour=0`;
}

function currentStepFromURL() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get('tour');
  if (raw === null) return -1;
  const n = parseInt(raw, 10);
  return (Number.isInteger(n) && n >= 0 && n < TOUR_STEPS.length) ? n : -1;
}

function navigateToStep(stepIdx) {
  const step = TOUR_STEPS[stepIdx];
  if (!step) return;
  const onSamePage = window.location.pathname === step.page;
  if (onSamePage) {
    // Same page, just update the step query param.
    const url = new URL(window.location.href);
    url.searchParams.set('tour', String(stepIdx));
    window.history.replaceState({}, '', url);
    render(stepIdx);
  } else {
    window.location.href = `${step.page}?tour=${stepIdx}`;
  }
}

function exitTour({ completed = false } = {}) {
  if (completed) markTourCompleted();
  const panel = document.getElementById('gain-tour-panel');
  const backdrop = document.getElementById('gain-tour-backdrop');
  if (panel) panel.remove();
  if (backdrop) backdrop.remove();
  // Strip the query param so a refresh doesn't reopen.
  const url = new URL(window.location.href);
  url.searchParams.delete('tour');
  window.history.replaceState({}, '', url);
}

function render(stepIdx) {
  // Remove any previous panel in case the caller navigated within a page.
  const prevPanel = document.getElementById('gain-tour-panel');
  const prevBackdrop = document.getElementById('gain-tour-backdrop');
  if (prevPanel) prevPanel.remove();
  if (prevBackdrop) prevBackdrop.remove();

  const step = TOUR_STEPS[stepIdx];
  if (!step) return;

  const total = TOUR_STEPS.length;
  const isFirst = stepIdx === 0;
  const isLast = stepIdx === total - 1;

  const backdrop = document.createElement('div');
  backdrop.id = 'gain-tour-backdrop';
  backdrop.className = 'tour-backdrop';
  document.body.appendChild(backdrop);

  const panel = document.createElement('div');
  panel.id = 'gain-tour-panel';
  panel.className = 'tour-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-labelledby', 'gain-tour-title');
  panel.innerHTML = `
    <div class="tour-panel-head">
      <span class="tour-step-counter">Step ${stepIdx + 1} of ${total}</span>
      <button type="button" class="tour-skip" id="gain-tour-skip" aria-label="Skip tour">Skip tour</button>
    </div>
    <h3 id="gain-tour-title" class="tour-panel-title">${step.title}</h3>
    <div class="tour-panel-body">${step.body}</div>
    <div class="tour-panel-actions">
      <button type="button" class="btn btn-ghost btn-sm" id="gain-tour-prev" ${isFirst ? 'disabled' : ''}>← Previous</button>
      <span class="tour-dots">${TOUR_STEPS.map((_, i) => `<span class="tour-dot${i === stepIdx ? ' tour-dot-active' : ''}"></span>`).join('')}</span>
      <button type="button" class="btn btn-primary btn-sm" id="gain-tour-next">${isLast ? 'Finish tour' : 'Next →'}</button>
    </div>
  `;
  document.body.appendChild(panel);

  document.getElementById('gain-tour-skip').addEventListener('click', () => exitTour({ completed: false }));
  document.getElementById('gain-tour-prev').addEventListener('click', () => {
    if (!isFirst) navigateToStep(stepIdx - 1);
  });
  document.getElementById('gain-tour-next').addEventListener('click', () => {
    if (isLast) {
      exitTour({ completed: true });
      // Strip any ?tour param and land the user back on the dashboard.
      window.location.href = '/dashboard.html';
    } else {
      navigateToStep(stepIdx + 1);
    }
  });
}

// Auto-run on every page load — does nothing if ?tour= is absent.
function autoRun() {
  const step = currentStepFromURL();
  if (step < 0) return;
  // Expected-page mismatch (user shared a tour URL out of context) — don't
  // force them; just bail and let the URL be.
  const expected = TOUR_STEPS[step].page;
  if (window.location.pathname !== expected) return;
  // Wait until the DOM has finished rendering so the panel lands above
  // everything the page just mounted.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => render(step));
  } else {
    // Still defer by a tick so page-init scripts finish their async work.
    setTimeout(() => render(step), 0);
  }
}

autoRun();
