/* GAIN — posture derivations.
   Single source of truth for how the framework posture drives downstream UI.
   Pure functions, no Firestore I/O. Phase 1: postureEffects powers the
   inline affordance on framework.html. Phases 2+ wire the derived*() helpers
   into intake / inventory / aia / risks / dashboard.
*/

// Map keyed by "field:value" -> human-readable downstream effect.
// This IS the contract. Every new posture option should land here first;
// downstream pages read the same keys to decide what to render.
export const postureEffects = {
  // --- §1 Supplementary standards ---
  'supportingFrameworks:ISO/IEC 23894':
    'Risks get ISO 23894 control-mapping · adds AI-lifecycle risk categories',
  'supportingFrameworks:OECD AI Principles':
    'AIAs add OECD attestation block (accountability, transparency, fairness)',
  'supportingFrameworks:UNESCO':
    'AIAs add UNESCO ethics-principle attestation',
  'supportingFrameworks:NIST CSF 2.0':
    'Inventory maps to CSF IDENTIFY / PROTECT / DETECT / RESPOND / RECOVER · links AI risks to IT risk register',
  'supportingFrameworks:NIST Privacy Framework':
    'Intake adds PII-handling block · Inventory maps privacy controls',
  'supportingFrameworks:COBIT 2019':
    'Role-based approval chains on AIAs · COBIT-aligned governance objectives',
  'supportingFrameworks:COSO ERM':
    'Risks roll up with COSO ERM tag into enterprise risk dashboard',
  'supportingFrameworks:FAIR':
    'Risks gain quantitative loss-range fields (min / most-likely / max)',

  // --- §2 Management system ---
  'managementSystem:ISO/IEC 42001':
    'Adds management-review cadence to controls · AIA gets documented-objective field',
  'managementSystem:ISO/IEC 27001':
    'Adds security-control mapping to inventory records',
  'managementSystem:ISO/IEC 27001+42001':
    'Adds both security-control mapping and management-review cadence',
  'managementSystem:SOC 2':
    'Adds SOC 2 subservice field to inventory · auditor-view toggle',
  'managementOutcome:Internal alignment only':
    'Controls library visible internally · no evidence-export or auditor view',
  'managementOutcome:Readiness for audit (no cert)':
    'Evidence-export shows gap-to-audit · no certification paperwork',
  'managementOutcome:Third-party certification':
    'Evidence-export pack will include all posture-derived controls',

  // --- §3 Jurisdictions ---
  'jurisdictions:US-Federal':
    'AIAs flag federal AI use-case inventory requirement (OMB M-24-10)',
  'jurisdictions:EU':
    'AIAs require EU AI Act risk classification · risks get regulatoryBasis tag (GDPR)',
  'jurisdictions:US-CA':
    'AIAs flag CCPA/CPRA automated-decision disclosures',
  'jurisdictions:US-CO':
    'AIAs flag Colorado AI Act impact-assessment requirement',
  'jurisdictions:US-NYC':
    'Requires NYC LL144 bias-audit date on employment-decision AIAs',
  'jurisdictions:US-IL':
    'Biometric systems trigger BIPA consent fields',
  'jurisdictions:UK':
    'AIAs surface UK ICO AI / automated-decision guidance reminders',
  'jurisdictions:Canada':
    'AIAs flag AIDA / PIPEDA automated-decision obligations',
  'jurisdictions:Brazil':
    'AIAs flag LGPD automated-decision review right',

  // --- §4 Sectors & regulated data types ---
  'sectors:Healthcare/HIPAA':
    'Intake adds PHI-handling block · Inventory adds BAA reference field · Risks auto-tag HIPAA',
  'sectors:Education/FERPA':
    'Intake adds student-data block · COPPA consent if under-13 users',
  'sectors:Finance/GLBA':
    'Inventory adds GLBA safeguards field · Risks auto-tag GLBA',
  'sectors:Credit/ECOA':
    'AIAs flag adverse-action explainability obligations · Risks auto-tag ECOA / FCRA',
  'sectors:Public Company/SOX':
    'Intake flags material financial-process AI · Risks auto-tag SOX',
  'sectors:Insurance':
    'AIAs flag NAIC Model Bulletin / state-level AI rules',
  'sectors:Employment/EEOC':
    'AIAs flag employment-decision scrutiny · NYC LL144 bias-audit if jurisdiction = NYC',
  'sectors:Government':
    'Intake adds procurement / sovereign-AI block',
  'sectors:Critical Infrastructure':
    'Risks auto-tag critical infrastructure · higher residual-risk threshold',
  'sectors:Children':
    'Intake adds COPPA consent block · automatic high-impact flag on AIAs',
  'sectors:Biometrics':
    'Intake adds biometric-disclosure block · BIPA / CPRA flags if jurisdiction matches',

  // --- §5 Risk appetite & maturity ---
  'riskAppetite:averse':
    'High-impact systems cannot move past "pilot" without AIA sign-off',
  'riskAppetite:cautious':
    'Intake auto-flags high-impact systems as "pilot" · AIAs require quarterly review',
  'riskAppetite:balanced':
    'Standard workflow · residual-risk tracking required on all high / medium risks',
  'riskAppetite:opportunity-seeking':
    'Lighter-weight AIAs allowed · post-deployment monitoring emphasized',
  'maturityTarget:1':
    'Inventory + risk log surfaced · AIAs stay optional · no policy gating',
  'maturityTarget:2':
    'Policies + inventory required · AIAs optional · Dashboard shows coverage %',
  'maturityTarget:3':
    'AIAs become required (not optional) for high-impact systems · Dashboard shows AIA coverage %',
  'maturityTarget:4':
    'All systems require AIAs · continuous-monitoring fields appear · quantitative risk scoring',
};

// ---------- derived data (Phase 2+ consumers) ----------

// Every regulation this company is on the hook for, given the posture.
export function derivedApplicableRegs(posture) {
  const regs = new Set(['NIST AI RMF 1.0']);
  const sectors = posture?.sectors || [];
  const jurisdictions = posture?.jurisdictions || [];
  const mgmt = posture?.managementSystem || '';

  if (sectors.includes('Healthcare/HIPAA')) regs.add('HIPAA');
  if (sectors.includes('Education/FERPA')) regs.add('FERPA');
  if (sectors.includes('Finance/GLBA')) regs.add('GLBA');
  if (sectors.includes('Credit/ECOA')) { regs.add('ECOA'); regs.add('FCRA'); }
  if (sectors.includes('Public Company/SOX')) regs.add('SOX');
  if (sectors.includes('Insurance')) regs.add('NAIC Model Bulletin');
  if (sectors.includes('Employment/EEOC')) regs.add('EEOC');
  if (sectors.includes('Children')) regs.add('COPPA');
  if (sectors.includes('Biometrics')) regs.add('BIPA');

  if (jurisdictions.includes('EU')) { regs.add('EU AI Act'); regs.add('GDPR'); }
  if (jurisdictions.includes('US-CA')) regs.add('CCPA/CPRA');
  if (jurisdictions.includes('US-CO')) regs.add('Colorado AI Act');
  if (jurisdictions.includes('US-NYC')) regs.add('NYC LL144');
  if (jurisdictions.includes('US-IL')) regs.add('BIPA');
  if (jurisdictions.includes('UK')) regs.add('UK GDPR');
  if (jurisdictions.includes('Canada')) { regs.add('AIDA'); regs.add('PIPEDA'); }
  if (jurisdictions.includes('Brazil')) regs.add('LGPD');

  if (mgmt.includes('42001')) regs.add('ISO/IEC 42001');
  if (mgmt.includes('27001')) regs.add('ISO/IEC 27001');
  if (mgmt === 'SOC 2') regs.add('SOC 2');

  return [...regs];
}

// Which conditional blocks Intake should surface.
export function derivedIntakeExtras(posture) {
  const extras = new Set();
  const sectors = posture?.sectors || [];
  if (sectors.includes('Healthcare/HIPAA')) extras.add('phi');
  if (sectors.includes('Education/FERPA')) extras.add('studentData');
  if (sectors.includes('Children')) extras.add('coppa');
  if (sectors.includes('Biometrics')) extras.add('biometric');
  if (sectors.includes('Employment/EEOC')) extras.add('employmentDecision');
  if (sectors.includes('Public Company/SOX')) extras.add('sox');
  if (sectors.includes('Government')) extras.add('publicSector');
  return [...extras];
}

// Which extra fields AIAs should surface + which attestations are required.
export function derivedAiaRequirements(posture) {
  const jurisdictions = posture?.jurisdictions || [];
  const sectors = posture?.sectors || [];
  const mgmt = posture?.managementSystem || '';
  return {
    euRiskClass: jurisdictions.includes('EU'),
    nycBiasAudit: jurisdictions.includes('US-NYC') && sectors.includes('Employment/EEOC'),
    adverseAction: sectors.includes('Credit/ECOA'),
    naicBulletin: sectors.includes('Insurance'),
    coloradoImpact: jurisdictions.includes('US-CO'),
    documentedObjective: mgmt.includes('42001'),
  };
}

// Per the maturity-target contract in framework.html §5:
//   Tier 3 "Managed"    -> AIAs required for high-impact systems
//   Tier 4 "Optimizing" -> AIAs required for all systems
export function aiaRequiredFor(posture, system) {
  const target = Number(posture?.maturityTarget || 0);
  if (target >= 4) return true;
  if (target >= 3 && system?.impactTier === 'high') return true;
  return false;
}

// ---------- posture drift (Phase 5) ----------
// When an existing record's applicableRegsSnapshot differs from the current
// posture's derived regs, show a banner so reviewers know the record was
// saved under a different posture. Records stay truthful (snapshot never
// mutates retroactively), but reviewers see that the world has moved.

export function computeRegDrift(snapshot, current) {
  const snap = Array.isArray(snapshot) ? snapshot : [];
  const curr = Array.isArray(current) ? current : [];
  // No snapshot -> record predates the snapshot mechanism; don't surface drift.
  if (snap.length === 0) return { changed: false, added: [], removed: [] };
  const snapSet = new Set(snap);
  const currSet = new Set(curr);
  const added = curr.filter(r => !snapSet.has(r));
  const removed = snap.filter(r => !currSet.has(r));
  return { changed: added.length > 0 || removed.length > 0, added, removed };
}

// Reg names come from derivedApplicableRegs — a closed allowlist of hard-coded
// strings in this module. No user input reaches the template, so raw
// interpolation is safe.
export function driftBannerHTML(snapshot, current) {
  const { changed, added, removed } = computeRegDrift(snapshot, current);
  if (!changed) return '';
  const list = (items) => items.map(r => `<li>${r}</li>`).join('');
  const addedCol = added.length
    ? `<div class="drift-col"><span class="drift-label drift-added">Now applies</span><ul>${list(added)}</ul></div>`
    : '';
  const removedCol = removed.length
    ? `<div class="drift-col"><span class="drift-label drift-removed">No longer applies</span><ul>${list(removed)}</ul></div>`
    : '';
  return `
    <div class="drift-banner">
      <strong>Framework posture has changed since this record was saved.</strong>
      <div class="drift-cols">${addedCol}${removedCol}</div>
      <p class="drift-hint">Re-save this record to refresh its posture snapshot.</p>
    </div>
  `;
}
