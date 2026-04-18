// Checklist templates for GAIN.
//
// Each checklist is a static template. Per-company completion state is
// stored separately in Firestore under companies/{companyId}/checklists/{key}.
//
// A checklist becomes "applicable" to a company when its trigger conditions
// match the company's framework posture. NIST is always applicable.

export const CHECKLISTS = [
  // ---------------------------------------------------------------------
  {
    key: 'nist-ai-rmf',
    name: 'NIST AI RMF 1.0',
    tag: 'Always on',
    description: 'The operating foundation for every GAIN program. Covers the four NIST AI RMF functions: GOVERN, MAP, MEASURE, MANAGE.',
    always: true,
    sections: [
      {
        name: 'GOVERN — Cultivate a risk-management culture',
        items: [
          { id: 'g-1-1', text: 'Roles and responsibilities for AI governance are assigned and documented (team roster complete)', ref: 'GOVERN 1.1' },
          { id: 'g-1-2', text: 'Legal, regulatory, and ethical requirements applicable to AI are identified', ref: 'GOVERN 1.2' },
          { id: 'g-1-4', text: 'Processes for ongoing monitoring and review are established', ref: 'GOVERN 1.4' },
          { id: 'g-1-5', text: 'Policies for human-AI teaming and handoff are defined', ref: 'GOVERN 1.5' },
          { id: 'g-1-6', text: 'A current, enterprise-wide AI system inventory is maintained', ref: 'GOVERN 1.6' },
          { id: 'g-2-1', text: 'Accountability structures exist so owners can be identified for every AI system', ref: 'GOVERN 2.1' },
          { id: 'g-3-1', text: 'Decision-making processes ensure diverse perspectives and disciplines are represented', ref: 'GOVERN 3.1' },
          { id: 'g-4-1', text: 'Incident response and harm-mitigation procedures are documented', ref: 'GOVERN 4.1' },
          { id: 'g-5-1', text: 'Third-party AI suppliers and contractors meet governance requirements', ref: 'GOVERN 5.1' },
          { id: 'g-6-1', text: 'Workforce training and competency programs for AI risk exist', ref: 'GOVERN 6.1' },
        ]
      },
      {
        name: 'MAP — Establish the context to frame AI risks',
        items: [
          { id: 'm-1-1', text: 'Intended purpose, deployment context, and prohibited uses are documented', ref: 'MAP 1.1' },
          { id: 'm-1-2', text: 'Affected stakeholders (internal and external) are identified', ref: 'MAP 1.2' },
          { id: 'm-2-1', text: 'Each AI system is categorized (tier: prohibited / high / limited / minimal)', ref: 'MAP 2.1' },
          { id: 'm-2-2', text: 'AI actors in the system lifecycle (designer, developer, deployer, evaluator) are identified', ref: 'MAP 2.2' },
          { id: 'm-3-1', text: 'Benefits and costs across AI lifecycle stages are assessed', ref: 'MAP 3.1' },
          { id: 'm-3-2', text: 'Potential impacts on individuals, groups, society, and environment are documented', ref: 'MAP 3.2' },
          { id: 'm-4-1', text: 'Approaches for mapping interdependencies between system components are applied', ref: 'MAP 4.1' },
          { id: 'm-5-1', text: 'Impact assessments (AIAs) are completed for high-impact systems before deployment', ref: 'MAP 5.1' },
        ]
      },
      {
        name: 'MEASURE — Assess, analyze, and track risks',
        items: [
          { id: 'me-1-1', text: 'Metrics and methods for identifying AI risks are selected and implemented', ref: 'MEASURE 1.1' },
          { id: 'me-2-1', text: 'Validity and reliability of AI system outputs are measured', ref: 'MEASURE 2.1' },
          { id: 'me-2-3', text: 'Safety metrics and thresholds are established and monitored', ref: 'MEASURE 2.3' },
          { id: 'me-2-5', text: 'Security and resilience are measured against adversarial threats', ref: 'MEASURE 2.5' },
          { id: 'me-2-7', text: 'Privacy protections are measured and tested', ref: 'MEASURE 2.7' },
          { id: 'me-2-8', text: 'Fairness and bias are measured across relevant demographic groups', ref: 'MEASURE 2.8' },
          { id: 'me-2-9', text: 'Explainability and interpretability of outputs is evaluated', ref: 'MEASURE 2.9' },
          { id: 'me-3-1', text: 'External feedback channels (end users, community, regulators) are established', ref: 'MEASURE 3.1' },
          { id: 'me-3-2', text: 'Emergent / unquantified risks are tracked and flagged', ref: 'MEASURE 3.2' },
          { id: 'me-3-3', text: 'Third-party feedback (vendor alerts, regulatory notices) is monitored', ref: 'MEASURE 3.3' },
          { id: 'me-4-1', text: 'Measurement approaches are periodically revisited and improved', ref: 'MEASURE 4.1' },
        ]
      },
      {
        name: 'MANAGE — Prioritize and act on risks',
        items: [
          { id: 'ma-1-1', text: 'Risk response options (mitigate / transfer / avoid / accept) are documented per risk', ref: 'MANAGE 1.1' },
          { id: 'ma-1-2', text: 'Risk treatment plans are resourced and executed', ref: 'MANAGE 1.2' },
          { id: 'ma-1-3', text: 'Residual risks are communicated to downstream deployers and users', ref: 'MANAGE 1.3' },
          { id: 'ma-1-4', text: 'Residual risk statements describe unmitigated exposure clearly', ref: 'MANAGE 1.4' },
          { id: 'ma-2-1', text: 'Strategies for tracking response effectiveness are implemented', ref: 'MANAGE 2.1' },
          { id: 'ma-2-3', text: 'Mechanisms to disengage, deactivate, or remove an AI system exist', ref: 'MANAGE 2.3' },
          { id: 'ma-3-1', text: 'Third-party risks are continuously monitored', ref: 'MANAGE 3.1' },
          { id: 'ma-4-1', text: 'Post-deployment monitoring detects and responds to emergent risks', ref: 'MANAGE 4.1' },
          { id: 'ma-4-2', text: 'Incident communication and harm-remediation actions are documented', ref: 'MANAGE 4.2' },
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------
  {
    key: 'hipaa',
    name: 'HIPAA — Healthcare (PHI)',
    tag: 'Sector',
    description: 'For AI systems processing Protected Health Information (PHI). Aligns with Privacy Rule, Security Rule, Breach Notification Rule, Section 1557, and the January 2025 HIPAA Security Rule NPRM.',
    triggeredBy: { sectors: ['Healthcare/HIPAA'] },
    sections: [
      {
        name: 'Pre-deployment — legal & privacy',
        items: [
          { id: 'hp-1', text: 'AI use case authorized under Privacy Rule (treatment / payment / operations) or patient authorization obtained' },
          { id: 'hp-2', text: 'Notice of Privacy Practices reviewed and updated to reflect AI use' },
          { id: 'hp-3', text: 'AI vendor classified as Business Associate (or confirmed not to be)' },
          { id: 'hp-4', text: 'Business Associate Agreement (BAA) signed before ANY PHI is shared with vendor' },
          { id: 'hp-5', text: 'BAA prohibits vendor from using PHI to train/fine-tune general models without authorization' },
          { id: 'hp-6', text: 'BAA specifies data retention (zero or defined) and deletion timelines' },
          { id: 'hp-7', text: 'BAA includes sub-processor disclosure and flow-down requirements' },
          { id: 'hp-8', text: 'BAA requires annual written verification of technical safeguards (per 2025 NPRM)' },
        ]
      },
      {
        name: 'Pre-deployment — risk analysis',
        items: [
          { id: 'hr-1', text: 'AI system added to technology asset inventory' },
          { id: 'hr-2', text: 'Security Rule §164.308(a)(1) risk analysis updated to include AI system' },
          { id: 'hr-3', text: 'Risk analysis dated and documented BEFORE go-live' },
          { id: 'hr-4', text: 'Type and volume of ePHI accessed by the AI is assessed' },
          { id: 'hr-5', text: 'AI output disclosure pathways (sub-processors, logging) are mapped' },
          { id: 'hr-6', text: 'Vendor SOC 2 / HITRUST / pen-test results reviewed' },
        ]
      },
      {
        name: 'Technical safeguards',
        items: [
          { id: 'ht-1', text: 'Encryption in transit (TLS 1.2+) confirmed' },
          { id: 'ht-2', text: 'Encryption at rest (AES-256) confirmed' },
          { id: 'ht-3', text: 'Unique service account credentials provisioned for the AI system' },
          { id: 'ht-4', text: 'Role-based access controls limit AI access to minimum necessary' },
          { id: 'ht-5', text: 'Multi-factor authentication enabled for access to systems the AI uses' },
          { id: 'ht-6', text: 'Audit log captures AI-specific fields: model ID, prompt, output, authorizer, timestamp' },
          { id: 'ht-7', text: 'Network segmentation isolates AI processing environment (per 2025 NPRM)' },
        ]
      },
      {
        name: 'Minimum necessary & data handling',
        items: [
          { id: 'hm-1', text: 'PHI access scoped to minimum necessary for the AI function' },
          { id: 'hm-2', text: 'If PHI is used for training: de-identified via Safe Harbor or Expert Determination' },
          { id: 'hm-3', text: 'NER / redaction pipeline in place for automated de-identification' },
          { id: 'hm-4', text: 'AI accesses only records relevant to the current encounter, not full patient database' },
        ]
      },
      {
        name: 'Section 1557 — nondiscrimination',
        items: [
          { id: 'hs-1', text: 'Bias and discrimination risk assessment completed for clinical decision support tools' },
          { id: 'hs-2', text: 'Mitigation measures for identified discrimination risks are documented' },
          { id: 'hs-3', text: 'Human oversight mechanism confirmed for clinical recommendations' },
        ]
      },
      {
        name: 'Governance & training',
        items: [
          { id: 'hg-1', text: 'Responsible owner assigned (Privacy Officer, CISO, or AI governance committee)' },
          { id: 'hg-2', text: 'Workforce trained on interaction with / oversight of the AI tool' },
          { id: 'hg-3', text: 'Incident response plan updated for AI-specific failure modes (hallucination, memorized PHI)' },
        ]
      },
      {
        name: 'Ongoing / post-deployment',
        items: [
          { id: 'ho-1', text: 'Vulnerability scanning performed at least every 6 months (per 2025 NPRM)' },
          { id: 'ho-2', text: 'Penetration testing performed at least annually (per 2025 NPRM)' },
          { id: 'ho-3', text: 'Risk analysis re-run when model version changes or data access changes' },
          { id: 'ho-4', text: 'Annual BAA review and vendor safeguard re-verification' },
          { id: 'ho-5', text: 'State AI law compliance reviewed (CA SB 1120, AB 3030; CO SB 24-205)' },
          { id: 'ho-6', text: 'OCR / HHS guidance monitored; new requirements incorporated' },
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------
  {
    key: 'ferpa',
    name: 'FERPA — Education (Student Records)',
    tag: 'Sector',
    description: 'For AI systems processing education records. Covers FERPA, PPRA, and COPPA intersections for K-12 providers.',
    triggeredBy: { sectors: ['Education/FERPA'] },
    sections: [
      {
        name: 'Authorization & disclosure',
        items: [
          { id: 'fe-1', text: 'AI use of education records falls within a FERPA exception (directory info, school official, legitimate educational interest) or prior written consent obtained' },
          { id: 'fe-2', text: 'If vendor is a "school official": direct control test documented (school controls data use and redisclosure)' },
          { id: 'fe-3', text: 'Data processing agreement (DPA) with vendor prohibits use for any purpose other than the authorized educational function' },
          { id: 'fe-4', text: 'DPA prohibits training vendor models on student records' },
          { id: 'fe-5', text: 'Parents / eligible students notified of AI use in annual FERPA notice' },
        ]
      },
      {
        name: 'COPPA (students under 13)',
        items: [
          { id: 'fc-1', text: 'Verifiable parental consent obtained before collecting personal info from users under 13 (or school acts as agent under "school authorization" rule)' },
          { id: 'fc-2', text: 'COPPA-compliant privacy notice published' },
          { id: 'fc-3', text: 'AI does not use children\'s data for behavioral advertising or profile-building' },
        ]
      },
      {
        name: 'PPRA (protected surveys)',
        items: [
          { id: 'fp-1', text: 'AI-driven assessments do not solicit PPRA-protected information (political affiliation, mental health, sex behavior, religious practices, etc.) without prior consent' },
        ]
      },
      {
        name: 'Data handling',
        items: [
          { id: 'fd-1', text: 'Encryption at rest and in transit for education records' },
          { id: 'fd-2', text: 'Data minimization: AI accesses only records necessary for the educational function' },
          { id: 'fd-3', text: 'Data deletion schedule defined (end of engagement, end of school year, etc.)' },
          { id: 'fd-4', text: 'Breach response plan complies with state student privacy laws (CA SOPIPA, NY Ed Law §2-d, etc.)' },
        ]
      },
      {
        name: 'Automated decision-making',
        items: [
          { id: 'fa-1', text: 'Human educator review required for any AI-driven grading, placement, or disciplinary decision' },
          { id: 'fa-2', text: 'Appeal mechanism for automated academic decisions documented' },
          { id: 'fa-3', text: 'Bias testing performed across protected classes (race, disability, EL status)' },
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------
  {
    key: 'glba',
    name: 'GLBA — Financial Services',
    tag: 'Sector',
    description: 'For AI in banks, credit unions, broker-dealers, and nonbank financial institutions. Covers Gramm-Leach-Bliley Safeguards Rule and Privacy Rule.',
    triggeredBy: { sectors: ['Finance/GLBA'] },
    sections: [
      {
        name: 'Safeguards Rule (amended 2021, fully effective 2023)',
        items: [
          { id: 'gs-1', text: 'Qualified Individual named and responsible for information security program (including AI)' },
          { id: 'gs-2', text: 'Written risk assessment covering AI systems and the NPI they access' },
          { id: 'gs-3', text: 'Access controls, encryption, secure development practices applied to AI systems' },
          { id: 'gs-4', text: 'Multi-factor authentication on all access to AI-enabled customer systems' },
          { id: 'gs-5', text: 'Penetration testing annually; vulnerability assessments every 6 months' },
          { id: 'gs-6', text: 'Written incident response plan covers AI-specific failure modes' },
          { id: 'gs-7', text: 'Annual written report to Board / senior officer on AI program status' },
          { id: 'gs-8', text: 'FTC notification within 30 days of unauthorized acquisition affecting 500+ customers' },
        ]
      },
      {
        name: 'Privacy Rule',
        items: [
          { id: 'gp-1', text: 'Privacy notice discloses AI use of NPI (affiliated / non-affiliated sharing)' },
          { id: 'gp-2', text: 'Opt-out mechanism provided for non-affiliated sharing' },
          { id: 'gp-3', text: 'Vendor contracts limit use of NPI to the specific service purpose' },
        ]
      },
      {
        name: 'Model risk management (OCC/Fed SR 11-7)',
        items: [
          { id: 'gm-1', text: 'AI models registered in model inventory with owner, purpose, and risk tier' },
          { id: 'gm-2', text: 'Model validation performed by independent function before deployment' },
          { id: 'gm-3', text: 'Model performance monitoring and thresholds for degradation defined' },
          { id: 'gm-4', text: 'Model documentation (development, assumptions, limitations) maintained' },
          { id: 'gm-5', text: 'Challenger / champion model framework in place for material models' },
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------
  {
    key: 'ecoa',
    name: 'ECOA / FCRA — Credit & Lending',
    tag: 'Sector',
    description: 'For AI used in credit decisioning, underwriting, pricing, or adverse action. Covers ECOA (Regulation B), FCRA, and CFPB guidance on AI.',
    triggeredBy: { sectors: ['Credit/ECOA'] },
    sections: [
      {
        name: 'Adverse action notices (CFPB Circular 2023-03)',
        items: [
          { id: 'ec-1', text: 'Adverse action notices provide specific, accurate principal reasons — not generic checkbox codes' },
          { id: 'ec-2', text: 'If AI produces reasons, the reasons reflect the actual factors in the model output' },
          { id: 'ec-3', text: 'Notices issued within 30 days of decision (ECOA) / 60 days (FCRA-covered decisions)' },
          { id: 'ec-4', text: 'Right-to-dispute language included and mechanism operational' },
        ]
      },
      {
        name: 'Disparate impact testing',
        items: [
          { id: 'ed-1', text: 'Fair lending testing performed before model deployment across protected classes (race, color, religion, national origin, sex, marital status, age, receipt of public assistance)' },
          { id: 'ed-2', text: 'Less discriminatory alternatives (LDA) search conducted and documented' },
          { id: 'ed-3', text: 'Ongoing monitoring of approval / pricing disparities; thresholds for escalation defined' },
          { id: 'ed-4', text: 'Third-party / vendor model fair-lending results obtained and reviewed' },
        ]
      },
      {
        name: 'FCRA — consumer reporting',
        items: [
          { id: 'ef-1', text: 'If AI outputs used for eligibility decisions, FCRA permissible purpose established' },
          { id: 'ef-2', text: 'Accuracy and dispute handling procedures comply with FCRA §§ 607, 611' },
          { id: 'ef-3', text: 'Furnishers\' procedures for reporting accurate info to CRAs cover AI-generated attributes' },
        ]
      },
      {
        name: 'Model governance',
        items: [
          { id: 'em-1', text: 'SR 11-7 model validation applied to credit AI models' },
          { id: 'em-2', text: 'Explainability sufficient to support adverse action reason generation' },
          { id: 'em-3', text: 'Input data documented for lineage and quality' },
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------
  {
    key: 'sox',
    name: 'SOX — Public Companies',
    tag: 'Sector',
    description: 'For AI that touches internal controls over financial reporting (ICFR) at SEC-registered public companies. Covers Sarbanes-Oxley 302 / 404 and PCAOB AS 2201.',
    triggeredBy: { sectors: ['Public Company/SOX'] },
    sections: [
      {
        name: 'ICFR scoping',
        items: [
          { id: 'sx-1', text: 'AI systems that impact financial reporting identified and in ICFR scope' },
          { id: 'sx-2', text: 'Key controls around AI outputs used in financial statements documented' },
          { id: 'sx-3', text: 'Process narratives describe how AI output flows into accounting records' },
        ]
      },
      {
        name: 'Control design & testing',
        items: [
          { id: 'sc-1', text: 'Input controls validate data fed to AI is complete and accurate' },
          { id: 'sc-2', text: 'Output controls verify AI results before posting to the GL' },
          { id: 'sc-3', text: 'IT general controls (change mgmt, access, operations) cover AI systems' },
          { id: 'sc-4', text: 'Independent testing of AI-related controls performed at least annually' },
          { id: 'sc-5', text: 'Deficiencies logged and remediated; material weaknesses disclosed' },
        ]
      },
      {
        name: 'SEC cybersecurity disclosure (2023 rule)',
        items: [
          { id: 'ss-1', text: 'Material AI-related cyber incidents disclosed on Form 8-K within 4 business days' },
          { id: 'ss-2', text: 'Annual Form 10-K discloses AI cybersecurity risk management processes' },
        ]
      },
      {
        name: 'Management certifications',
        items: [
          { id: 'sm-1', text: 'CEO / CFO SOX 302 certifications consider AI-introduced risks' },
          { id: 'sm-2', text: 'Audit committee briefed on material AI risks and controls' },
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------
  {
    key: 'insurance',
    name: 'Insurance — NAIC Model Bulletin',
    tag: 'Sector',
    description: 'For insurers using AI in underwriting, pricing, claims, fraud, and marketing. Aligns with the NAIC Model Bulletin (adopted Dec 2023) and state insurance AI laws.',
    triggeredBy: { sectors: ['Insurance'] },
    sections: [
      {
        name: 'Written AIS program (AI Systems program)',
        items: [
          { id: 'in-1', text: 'Formal written AI program approved by senior management / Board' },
          { id: 'in-2', text: 'Program addresses governance, risk management, internal controls, and third-party oversight' },
          { id: 'in-3', text: 'Program scoped to cover all AI systems and predictive models, including vendor-sourced' },
        ]
      },
      {
        name: 'Consumer protection',
        items: [
          { id: 'ic-1', text: 'AI outcomes tested for unfair discrimination (race, color, creed, national origin, disability, gender identity, sexual orientation)' },
          { id: 'ic-2', text: 'Adverse actions accompanied by specific, meaningful explanations' },
          { id: 'ic-3', text: 'Consumer appeal / dispute mechanism available for AI-driven decisions' },
          { id: 'ic-4', text: 'Colorado Reg 10-1-1 quantitative testing performed if operating in CO (life insurance)' },
        ]
      },
      {
        name: 'Third-party governance',
        items: [
          { id: 'it-1', text: 'Written contracts with AI vendors include audit rights and regulator access' },
          { id: 'it-2', text: 'Vendor testing for bias and accuracy documented and reviewed' },
        ]
      },
      {
        name: 'Ongoing monitoring',
        items: [
          { id: 'io-1', text: 'Drift, fairness, and accuracy monitored post-deployment' },
          { id: 'io-2', text: 'Program effectiveness reviewed annually and reported to senior management' },
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------
  {
    key: 'employment',
    name: 'Employment / HR — EEOC + NYC LL144',
    tag: 'Sector',
    description: 'For AI in hiring, promotion, termination, pay, and workforce management. Covers Title VII, ADA, ADEA, EEOC guidance, NYC Local Law 144, and emerging state laws (CO, IL, CA).',
    triggeredBy: { sectors: ['Employment/EEOC'] },
    sections: [
      {
        name: 'EEOC / federal anti-discrimination',
        items: [
          { id: 'em-1', text: 'Adverse impact analysis performed under UGESP four-fifths rule' },
          { id: 'em-2', text: 'Validity evidence (content, construct, or criterion) supports AI-driven selection tools' },
          { id: 'em-3', text: 'ADA: reasonable accommodation available; AI does not screen out applicants with disabilities' },
          { id: 'em-4', text: 'ADEA: AI does not cause age-based disparities without justification' },
          { id: 'em-5', text: 'Candidates notified they are being assessed by AI and offered human alternative where feasible' },
        ]
      },
      {
        name: 'NYC Local Law 144 (automated employment decision tools)',
        items: [
          { id: 'en-1', text: 'Annual independent bias audit completed before use' },
          { id: 'en-2', text: 'Audit results published publicly with selection rate / impact ratio by race and sex' },
          { id: 'en-3', text: 'Candidates notified at least 10 business days before AEDT use' },
          { id: 'en-4', text: 'Notice includes job qualifications, characteristics evaluated, and data retention policy' },
        ]
      },
      {
        name: 'Illinois AI Video Interview Act / new 2026 employment AI law',
        items: [
          { id: 'ei-1', text: 'If using AI video interviews in IL: consent obtained, limited sharing, deletion within 30 days on request' },
          { id: 'ei-2', text: 'Illinois SB 2553 (eff Jan 1, 2026): no discrimination via AI; notice of AI use in employment decisions' },
        ]
      },
      {
        name: 'California / Colorado',
        items: [
          { id: 'ecs-1', text: 'California FEHA regulations (2025): bias testing, anti-discrimination policies for automated decision systems in employment' },
          { id: 'ecs-2', text: 'Colorado AI Act (eff 2026, delayed): impact assessments for high-risk employment AI' },
        ]
      },
      {
        name: 'Data & transparency',
        items: [
          { id: 'ed-1', text: 'Applicant data retained per state limits; deleted when no longer needed' },
          { id: 'ed-2', text: 'Explanations available to candidates upon request for AI-driven decisions' },
          { id: 'ed-3', text: 'Vendor contracts require non-use of candidate data for model training' },
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------
  {
    key: 'government',
    name: 'Government / Public Sector',
    tag: 'Sector',
    description: 'For federal agencies, contractors, and state / local governments deploying AI. Covers OMB M-24-10 / M-25-21, FedRAMP, state government AI mandates.',
    triggeredBy: { sectors: ['Government'] },
    sections: [
      {
        name: 'OMB M-24-10 / M-25-21 — federal agency AI',
        items: [
          { id: 'go-1', text: 'Chief AI Officer designated' },
          { id: 'go-2', text: 'Annual AI use case inventory published publicly' },
          { id: 'go-3', text: 'Rights-impacting AI: minimum practices before use (impact assessment, testing, identify/mitigate bias)' },
          { id: 'go-4', text: 'Safety-impacting AI: pre-deployment testing and ongoing monitoring' },
          { id: 'go-5', text: 'Waivers for non-compliance publicly disclosed with justification' },
          { id: 'go-6', text: 'AI governance body (council) convened' },
        ]
      },
      {
        name: 'Procurement (M-24-18 / generative AI)',
        items: [
          { id: 'gp-1', text: 'Acquisition contracts include required AI clauses (testing, documentation, data rights)' },
          { id: 'gp-2', text: 'Vendor AI system cards / model cards obtained' },
          { id: 'gp-3', text: 'Generative AI pilots follow agency-approved use pattern' },
        ]
      },
      {
        name: 'Transparency',
        items: [
          { id: 'gt-1', text: 'Members of the public notified when interacting with rights-impacting AI' },
          { id: 'gt-2', text: 'Appeal / redress mechanism available for AI-affected decisions' },
          { id: 'gt-3', text: 'Individual opt-out offered where practicable' },
        ]
      },
      {
        name: 'Security & FedRAMP',
        items: [
          { id: 'gs-1', text: 'AI system hosted on FedRAMP-authorized infrastructure (if handling federal data)' },
          { id: 'gs-2', text: 'Authorization to Operate (ATO) granted before production use' },
          { id: 'gs-3', text: 'Continuous monitoring plan aligned with NIST SP 800-53' },
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------
  {
    key: 'critical-infrastructure',
    name: 'Critical Infrastructure',
    tag: 'Sector',
    description: 'For AI in energy, water, comms, transportation, and other CISA-designated critical sectors. Covers CISA AI guidance and sector-specific rules.',
    triggeredBy: { sectors: ['Critical Infrastructure'] },
    sections: [
      {
        name: 'CISA guidance (2024)',
        items: [
          { id: 'ci-1', text: 'AI risk assessment performed for each safety-critical AI deployment' },
          { id: 'ci-2', text: 'Red-team testing against adversarial attacks completed before deployment' },
          { id: 'ci-3', text: 'AI-enabled systems isolated from OT networks where feasible' },
          { id: 'ci-4', text: 'Human fail-safe and rollback mechanisms operational' },
          { id: 'ci-5', text: 'AI supply chain risk assessed (training data, model provenance, compute)' },
        ]
      },
      {
        name: 'Secure by design',
        items: [
          { id: 'cd-1', text: 'Software Bills of Materials (SBOM) maintained for AI systems' },
          { id: 'cd-2', text: 'Secure development practices (NIST SSDF) applied to AI dev' },
          { id: 'cd-3', text: 'Vulnerability disclosure channel available' },
        ]
      },
      {
        name: 'Sector-specific',
        items: [
          { id: 'cs-1', text: 'NERC CIP: AI controls meet relevant CIP standards (if electric)' },
          { id: 'cs-2', text: 'TSA Security Directives: AI in pipelines / rail meet cyber directives' },
          { id: 'cs-3', text: 'EPA water sector: AI does not compromise SCADA / ICS safety' },
        ]
      },
      {
        name: 'Incident response',
        items: [
          { id: 'cir-1', text: 'CIRCIA reporting: covered cyber incidents reported to CISA within 72h; ransom payments within 24h' },
          { id: 'cir-2', text: 'AI-specific incident categories in IR playbook (model poisoning, data exfil via prompt injection, etc.)' },
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------
  {
    key: 'children',
    name: 'Children\'s Data (COPPA / CCPA / KOSA)',
    tag: 'Data type',
    description: 'For AI that processes data from or about children. Covers COPPA (under 13), state comprehensive privacy laws with teen provisions, and emerging KOSA requirements.',
    triggeredBy: { sectors: ['Children'] },
    sections: [
      {
        name: 'COPPA (under 13)',
        items: [
          { id: 'cc-1', text: 'Verifiable parental consent obtained before collecting personal info from users under 13' },
          { id: 'cc-2', text: 'COPPA-compliant privacy notice published' },
          { id: 'cc-3', text: 'Parents can review, correct, or delete child\'s data on request' },
          { id: 'cc-4', text: 'AI does not use children\'s data for behavioral advertising' },
          { id: 'cc-5', text: 'Data minimization: only info reasonably necessary to the activity is collected' },
          { id: 'cc-6', text: 'Deletion when no longer necessary; breach notification per FTC' },
        ]
      },
      {
        name: 'COPPA 2025 amendments',
        items: [
          { id: 'c25-1', text: 'New disclosures for biometric identifiers and inferences about children' },
          { id: 'c25-2', text: 'Limits on data retention (not indefinitely) and deletion commitments' },
          { id: 'c25-3', text: 'No use of children\'s data for AI model training without separate consent' },
        ]
      },
      {
        name: 'State teen privacy laws (CT, NY SAFE for Kids, CA AB 1394, FL)',
        items: [
          { id: 'ct-1', text: 'Age assurance / estimation implemented where required' },
          { id: 'ct-2', text: 'Data Protection Impact Assessment performed for services likely used by minors' },
          { id: 'ct-3', text: 'Default privacy settings are most protective for known-minor users' },
          { id: 'ct-4', text: 'Dark patterns that encourage minors to share more data are prohibited' },
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------
  {
    key: 'biometrics',
    name: 'Biometric Data (BIPA / Texas / Washington / NY)',
    tag: 'Data type',
    description: 'For AI using facial recognition, fingerprints, voiceprints, or other biometric identifiers. Covers Illinois BIPA, Texas CUBI, Washington HB 1493, NY SHIELD, and state comprehensive privacy laws.',
    triggeredBy: { sectors: ['Biometrics'] },
    sections: [
      {
        name: 'Illinois BIPA (Biometric Information Privacy Act)',
        items: [
          { id: 'bi-1', text: 'Publicly available written policy covering retention schedule and destruction guidelines' },
          { id: 'bi-2', text: 'Written consent obtained BEFORE capturing biometric identifier or info' },
          { id: 'bi-3', text: 'Consent specifies the purpose and retention period' },
          { id: 'bi-4', text: 'No sale, lease, trade, or profit from biometric data' },
          { id: 'bi-5', text: 'Biometric data destroyed when initial purpose fulfilled OR within 3 years of last interaction (whichever first)' },
          { id: 'bi-6', text: 'Third-party disclosures limited to consent-backed, finance-related, or legally compelled' },
        ]
      },
      {
        name: 'Texas CUBI / Washington / other states',
        items: [
          { id: 'bt-1', text: 'Texas: notice and consent before capturing; $25k/violation enforcement' },
          { id: 'bt-2', text: 'Washington HB 1493: retention limited to purpose; destruction after; security reasonable' },
          { id: 'bt-3', text: 'NY SHIELD Act: biometric info protected under reasonable security requirements' },
        ]
      },
      {
        name: 'State comprehensive privacy laws (CA, VA, CO, CT, UT, etc.)',
        items: [
          { id: 'bs-1', text: 'Biometric data treated as "sensitive personal info": opt-in consent required' },
          { id: 'bs-2', text: 'Data Protection Impact Assessment (DPIA) for biometric processing' },
          { id: 'bs-3', text: 'Consumer right to delete biometric data on request' },
        ]
      },
      {
        name: 'Technical controls',
        items: [
          { id: 'bc-1', text: 'Biometric templates stored encrypted (AES-256) and segregated from other PII' },
          { id: 'bc-2', text: 'Access controls limit biometric data to authorized personnel only' },
          { id: 'bc-3', text: 'Audit logs capture all biometric access / match events' },
          { id: 'bc-4', text: 'Liveness detection / anti-spoofing deployed for authentication use cases' },
          { id: 'bc-5', text: 'Accuracy testing performed across demographic groups; disparities documented' },
        ]
      }
    ]
  }
];

// Determines which checklists apply to a company based on its posture.
// Returns an array of checklist objects with an `applicable` boolean.
export function applicableChecklists(posture) {
  const sectors = (posture && posture.sectors) || [];
  return CHECKLISTS.map(cl => {
    const applicable = !!(cl.always ||
      (cl.triggeredBy?.sectors || []).some(s => sectors.includes(s)));
    return { ...cl, applicable };
  });
}

// Counts total / checked items for progress display.
export function checklistStats(template, progress) {
  let total = 0, done = 0;
  for (const s of template.sections) {
    for (const it of s.items) {
      total++;
      if (progress?.items?.[it.id]?.checked) done++;
    }
  }
  return { total, done, pct: total ? Math.round(done / total * 100) : 0 };
}
