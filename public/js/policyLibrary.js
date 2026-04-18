// Policy template library for GAIN.
// Each entry describes a named governance policy, which framework requires it,
// what posture condition triggers a suggestion, and a structured body template
// the user can customise into their actual company policy.

function tpl(name, purpose, scope, requirements, roles) {
  return `# ${name}

**Effective Date:** [Date]
**Policy Owner:** [Name / Role]
**Review Cycle:** Annual

## Purpose
${purpose}

## Scope
${scope}

## Requirements
${requirements}

## Roles and Responsibilities
${roles}

## Compliance Monitoring
Compliance with this policy is reviewed annually by the Policy Owner and reported to the AI Governance Board. Non-compliance may result in corrective action, retraining, or escalation.

## Revision History
| Version | Date | Author | Summary |
|---|---|---|---|
| 1.0 | [Date] | [Author] | Initial draft |
`;
}

export const POLICY_LIBRARY = [

  // ── NIST AI RMF (always on) ──────────────────────────────────────────────

  {
    id: 'nist-risk-governance',
    name: 'AI Risk Management Governance Policy',
    framework: 'NIST AI RMF',
    gainCollection: 'framework',
    description: 'Establishes AI risk tolerance, accountability structures, and enterprise-wide risk management processes.',
    trigger: null,
    bodyTemplate: tpl(
      'AI Risk Management Governance Policy',
      'This policy establishes the organization\'s commitment to managing AI-related risks in a structured, consistent, and accountable manner aligned with the NIST AI Risk Management Framework 1.0.',
      'This policy applies to all personnel involved in the development, procurement, deployment, or oversight of AI systems within the organization.',
      `1. The organization shall maintain a documented AI risk tolerance statement approved by senior leadership.\n2. All AI systems shall be subject to a risk assessment before deployment and on a recurring basis.\n3. Risk management activities shall be integrated into project planning, procurement decisions, and operational reviews.\n4. Identified risks must be documented in the Risk Register with assigned owners and treatment plans.\n5. Material AI incidents must be escalated to the AI Governance Board within [N] business days.`,
      `- **AI Governance Board**: Sets risk tolerance; approves policy; reviews aggregate risk posture.\n- **Chief AI Officer (or designee)**: Operationalises this policy; maintains the Risk Register.\n- **System Owners**: Ensure AI systems under their ownership comply with this policy.\n- **All staff**: Report suspected AI-related risks or incidents to the designated channel.`
    ),
  },

  {
    id: 'nist-inventory-registry',
    name: 'AI System Inventory and Registry Policy',
    framework: 'NIST AI RMF',
    gainCollection: 'inventory',
    description: 'Requires all AI systems to be catalogued, versioned, and kept current in a central registry.',
    trigger: null,
    bodyTemplate: tpl(
      'AI System Inventory and Registry Policy',
      'This policy ensures the organization maintains a complete, accurate, and current inventory of all AI systems it builds, buys, or enables, supporting NIST AI RMF GOVERN 1.6.',
      'Applies to all AI systems in any lifecycle stage (planned, pilot, production, or retired) across all business units.',
      `1. All AI systems must be registered in the GAIN inventory within [N] days of a decision to acquire, build, or enable them.\n2. Each inventory record must capture: system name, purpose, sourcing model, data inputs, risk tier, lifecycle stage, and accountable owner.\n3. The inventory must be reviewed and updated at least quarterly.\n4. Systems approaching retirement must have a decommission plan documented in the inventory.\n5. Shadow AI (AI tools used without formal approval) must be reported and inventoried within [N] days of discovery.`,
      `- **System Owners**: Register and maintain their systems in the inventory.\n- **AI Governance Board**: Reviews the inventory quarterly; approves tier changes.\n- **IT / Security**: Assists with shadow AI discovery during infrastructure reviews.`
    ),
  },

  {
    id: 'nist-roles-responsibilities',
    name: 'AI Roles and Responsibilities Policy',
    framework: 'NIST AI RMF',
    gainCollection: 'governance',
    description: 'Defines ownership, accountability, and decision authority for AI across the system lifecycle.',
    trigger: null,
    bodyTemplate: tpl(
      'AI Roles and Responsibilities Policy',
      'This policy defines the roles, responsibilities, and accountability structures required to govern AI systems throughout their lifecycle, fulfilling NIST AI RMF GOVERN 1.1.',
      'All employees, contractors, and third parties involved in the design, procurement, deployment, monitoring, or governance of AI systems.',
      `1. Each AI system must have a designated System Owner who is accountable for its compliance and performance.\n2. A cross-functional AI Governance Board must be established and meet at least quarterly.\n3. Role definitions must be documented for: AI Governance Lead, System Owner, Data Steward, Risk Reviewer, and Compliance Officer.\n4. Responsibilities must be reflected in job descriptions, performance objectives, and onboarding materials.\n5. Role assignments must be reviewed annually and updated when personnel changes occur.`,
      `- **Board / Executive Sponsor**: Champions AI governance; approves governance charter.\n- **AI Governance Lead / CAIO**: Owns this policy; chairs the Governance Board.\n- **System Owners**: Accountable for day-to-day compliance of their systems.\n- **HR**: Maintains role definitions in job descriptions.`
    ),
  },

  {
    id: 'nist-incident-response',
    name: 'AI Incident Response and Escalation Policy',
    framework: 'NIST AI RMF',
    gainCollection: 'risks',
    description: 'Defines how AI-related incidents are detected, classified, investigated, and communicated.',
    trigger: null,
    bodyTemplate: tpl(
      'AI Incident Response and Escalation Policy',
      'This policy establishes procedures for detecting, classifying, investigating, and remediating AI-related incidents, including unexpected model behaviour, bias events, and security compromises.',
      'All AI systems in production. All personnel who operate, monitor, or are affected by AI systems.',
      `1. AI incidents must be reported within [N] hours of detection using the designated reporting channel.\n2. Incidents are classified as: Low (monitoring anomaly), Medium (degraded performance affecting users), High (harmful output, data breach, regulatory trigger).\n3. High severity incidents must be escalated to the AI Governance Board and Legal within [N] hours.\n4. A post-incident review must be completed within [N] days and findings added to the Risk Register.\n5. External notifications (regulators, affected parties) follow the timelines defined in the applicable regulatory overlay policies.`,
      `- **System Owner**: Initial responder; responsible for containment and escalation.\n- **AI Governance Lead**: Coordinates investigation; owns the incident log.\n- **Legal / Compliance**: Determines notification obligations.\n- **Communications**: Manages external messaging when required.`
    ),
  },

  {
    id: 'nist-governance-board',
    name: 'AI Governance Board Charter',
    framework: 'NIST AI RMF',
    gainCollection: 'governance',
    description: 'Establishes the composition, authority, and operating cadence of the AI oversight body.',
    trigger: null,
    bodyTemplate: tpl(
      'AI Governance Board Charter',
      'This charter establishes the AI Governance Board as the principal oversight body for the organisation\'s AI risk management program, fulfilling NIST AI RMF GOVERN 1.2.',
      'All AI systems, policies, and governance activities within the organisation.',
      `1. The Board shall include representatives from: Legal, Compliance, IT/Security, Data Science, Business Operations, and HR (or equivalents).\n2. The Board shall meet at least quarterly and maintain written minutes.\n3. The Board has authority to: approve new high-risk AI deployments, mandate risk treatment, suspend non-compliant systems, and set AI risk tolerance.\n4. A quorum requires at least [N] of [N] members.\n5. The Board shall produce an annual AI Governance Report for senior leadership.`,
      `- **Executive Sponsor**: Appoints Board members; receives annual report.\n- **Board Chair (AI Governance Lead)**: Chairs meetings; owns agenda and minutes.\n- **Board Members**: Attend meetings; make decisions within their domain expertise.`
    ),
  },

  {
    id: 'nist-monitoring-drift',
    name: 'AI Model Monitoring and Drift Detection Policy',
    framework: 'NIST AI RMF',
    gainCollection: 'risks',
    description: 'Mandates ongoing monitoring of deployed AI systems for performance degradation and data drift.',
    trigger: null,
    bodyTemplate: tpl(
      'AI Model Monitoring and Drift Detection Policy',
      'This policy ensures deployed AI systems are continuously monitored for performance degradation, data drift, and emerging risks, supporting NIST AI RMF MEASURE and MANAGE functions.',
      'All AI systems in production lifecycle stages.',
      `1. Each production AI system must have a monitoring plan approved by the System Owner.\n2. Monitoring must cover: prediction accuracy, input data distribution shifts, output bias metrics, and error rates.\n3. Alert thresholds must be defined and documented. Breach of a threshold triggers a review within [N] business days.\n4. Monitoring results must be reviewed at least monthly and summarised quarterly for the Governance Board.\n5. Systems that persistently breach thresholds must be retrained, adjusted, or decommissioned.`,
      `- **System Owner**: Maintains and reviews monitoring dashboards.\n- **Data Science / ML Team**: Implements monitoring tooling; investigates anomalies.\n- **AI Governance Lead**: Escalates persistent issues to the Board.`
    ),
  },

  {
    id: 'nist-third-party',
    name: 'Third-Party AI Risk Management Policy',
    framework: 'NIST AI RMF',
    gainCollection: 'risks',
    description: 'Governs due diligence, contractual requirements, and ongoing oversight of external AI providers.',
    trigger: null,
    bodyTemplate: tpl(
      'Third-Party AI Risk Management Policy',
      'This policy establishes requirements for evaluating and managing the AI-related risks posed by external vendors, cloud providers, and other third parties whose AI systems or components are used by the organisation.',
      'All procurement of AI systems, AI-enabled SaaS, and third-party AI APIs or models.',
      `1. All third-party AI systems must be registered in the GAIN inventory before use in production.\n2. A pre-procurement risk assessment must evaluate: data handling, model transparency, bias testing, incident response, and regulatory compliance.\n3. Contracts with AI vendors must include: data processing terms, incident notification obligations, audit rights, and model change notification requirements.\n4. High-risk third-party AI systems must be reviewed annually.\n5. Third parties that experience a material AI incident affecting our data or users must notify us within [N] hours.`,
      `- **Procurement / Legal**: Ensures contract terms meet this policy.\n- **System Owner**: Performs pre-procurement assessment; monitors vendor compliance.\n- **AI Governance Lead**: Maintains the approved vendor register.`
    ),
  },

  {
    id: 'nist-human-oversight',
    name: 'Human-AI Configuration and Oversight Policy',
    framework: 'NIST AI RMF',
    gainCollection: 'framework',
    description: 'Defines when and how human review is required in AI decision workflows.',
    trigger: null,
    bodyTemplate: tpl(
      'Human-AI Configuration and Oversight Policy',
      'This policy ensures that appropriate human oversight is maintained for AI decisions and that the degree of human involvement is commensurate with the impact and risk of each system.',
      'All AI systems that produce outputs affecting individuals, business operations, or regulatory obligations.',
      `1. Each AI system must document its "human-in-the-loop" configuration: fully automated, human-on-the-loop, or human-in-the-loop.\n2. Systems making consequential decisions (affecting employment, credit, healthcare, legal status) must have a human review step unless explicitly waived by the Governance Board with documented rationale.\n3. Staff who review AI outputs must receive training on the system's capabilities, limitations, and bias risks.\n4. Human override must be technically possible for all high-risk AI systems.\n5. Override events must be logged for audit and model improvement purposes.`,
      `- **System Owner**: Defines and documents the human-in-the-loop configuration.\n- **AI Governance Board**: Approves fully-automated configurations for high-risk systems.\n- **Operations / End Users**: Receive training; exercise override when warranted.`
    ),
  },

  // ── ISO 42001 ────────────────────────────────────────────────────────────

  {
    id: 'iso42001-aims-policy',
    name: 'AI Management System (AIMS) Policy',
    framework: 'ISO 42001',
    gainCollection: 'framework',
    description: 'Top-level organisational commitment to establishing and maintaining an ISO 42001-aligned AI management system.',
    trigger: { managementSystem: '42001' },
    bodyTemplate: tpl(
      'AI Management System (AIMS) Policy',
      'This policy represents the organisation\'s top-level commitment to establishing, implementing, maintaining, and continually improving an Artificial Intelligence Management System (AIMS) in accordance with ISO/IEC 42001:2023.',
      'The entire organisation, including all AI-related activities, systems, and personnel.',
      `1. The organisation commits to responsible and trustworthy AI development and deployment.\n2. Leadership shall allocate sufficient resources, roles, and authority to support the AIMS.\n3. AI objectives shall be established, monitored, and reported annually.\n4. Continual improvement of the AIMS is a standing organisational requirement.\n5. This policy shall be communicated to all relevant internal and external stakeholders.`,
      `- **Top Management**: Signs and endorses this policy; provides resources.\n- **AI Governance Lead / CAIO**: Owns and operationalises the AIMS.\n- **All employees**: Aware of and contribute to AIMS objectives.`
    ),
  },

  {
    id: 'iso42001-lifecycle',
    name: 'AI Lifecycle Management Policy',
    framework: 'ISO 42001',
    gainCollection: 'inventory',
    description: 'Covers governance requirements across all stages: design, development, deployment, maintenance, and retirement.',
    trigger: { managementSystem: '42001' },
    bodyTemplate: tpl(
      'AI Lifecycle Management Policy',
      'This policy establishes governance requirements for AI systems across their full lifecycle, from initial concept through retirement, ensuring consistent oversight at each stage per ISO/IEC 42001.',
      'All AI systems and projects within the organisation at any lifecycle stage.',
      `1. Each lifecycle stage (concept, design, development, testing, deployment, operations, retirement) must have defined gate criteria before progressing.\n2. An AIA must be completed before any system transitions to production.\n3. Material changes to a deployed system (data, model architecture, use case) require re-assessment at the relevant lifecycle stage.\n4. Retirement plans must address data deletion, user notification, and knowledge transfer.\n5. Lifecycle documentation must be retained for a minimum of [N] years after system retirement.`,
      `- **System Owner**: Responsible for lifecycle documentation and gate sign-offs.\n- **AI Governance Lead**: Reviews gate criteria; approves production deployments.\n- **Legal / Compliance**: Reviews retirement data obligations.`
    ),
  },

  {
    id: 'iso42001-data-governance',
    name: 'AI Data Governance Policy',
    framework: 'ISO 42001',
    gainCollection: 'aia',
    description: 'Establishes requirements for data quality, provenance, labelling, and lifecycle management for AI training and inference.',
    trigger: { managementSystem: '42001' },
    bodyTemplate: tpl(
      'AI Data Governance Policy',
      'This policy establishes requirements for the governance of data used to train, validate, test, and operate AI systems, ensuring quality, provenance, and compliance per ISO/IEC 42001.',
      'All datasets used in the development or operation of AI systems, including training data, validation sets, test sets, and inference inputs.',
      `1. All AI training datasets must be documented with: source, collection method, known biases, date range, and applicable licences.\n2. Training data must be reviewed for representation gaps and bias before model development begins.\n3. Personal data used for AI training must comply with applicable privacy laws and have a lawful basis for processing.\n4. Data pipelines must maintain lineage records sufficient to trace model outputs to their source data.\n5. Data used for AI must be reviewed for ongoing fitness-for-purpose at least annually.`,
      `- **Data Steward**: Maintains dataset documentation; reviews data quality.\n- **Data Science / ML Team**: Implements data lineage and quality checks.\n- **Legal / Privacy**: Reviews lawful basis and data sharing agreements.`
    ),
  },

  {
    id: 'iso42001-bias-fairness',
    name: 'AI Bias and Fairness Policy',
    framework: 'ISO 42001',
    gainCollection: 'risks',
    description: 'Procedures to identify, measure, and mitigate bias in AI systems, including pre-deployment and ongoing testing.',
    trigger: { managementSystem: '42001' },
    bodyTemplate: tpl(
      'AI Bias and Fairness Policy',
      'This policy establishes the organisation\'s commitment to identifying, measuring, and mitigating bias in AI systems to ensure fair and equitable outcomes for all users and affected parties.',
      'All AI systems that produce outputs affecting individuals, particularly those used in decisions relating to employment, credit, healthcare, education, or legal proceedings.',
      `1. A bias risk assessment must be completed for all AI systems before deployment.\n2. Systems must be tested against protected characteristic groups (race, gender, age, disability, etc.) using appropriate fairness metrics.\n3. Bias testing results must be documented in the AIA and reviewed by the Governance Board.\n4. Systems that demonstrate unacceptable disparate impact must not proceed to production until mitigations are validated.\n5. Post-deployment bias monitoring must be conducted at least annually.`,
      `- **Data Science / ML Team**: Conducts bias testing and documents results.\n- **System Owner**: Accountable for AIA completeness and bias remediation.\n- **Legal / Compliance**: Determines acceptable fairness thresholds based on regulatory obligations.`
    ),
  },

  // ── EU AI Act ────────────────────────────────────────────────────────────

  {
    id: 'eu-transparency-disclosure',
    name: 'AI Transparency and Disclosure Policy',
    framework: 'EU AI Act',
    gainCollection: 'framework',
    description: 'Requires users to be informed when they interact with AI; establishes disclosure standards for AI-generated content.',
    trigger: { jurisdiction: 'EU' },
    bodyTemplate: tpl(
      'AI Transparency and Disclosure Policy',
      'This policy establishes requirements for disclosing the use of AI systems to users and affected parties, in compliance with EU AI Act transparency obligations (Articles 50 and 13).',
      'All AI systems deployed in or affecting individuals in the European Union, including chatbots, content-generation tools, and automated decision systems.',
      `1. Users must be notified when they are interacting with an AI system, in clear and plain language, before or at the start of the interaction.\n2. AI-generated audio, video, image, or text content designed to resemble real persons must be labelled as AI-generated.\n3. High-risk AI systems must provide users with: purpose, performance limitations, human oversight options, and data used.\n4. Disclosures must be accessible, not buried in terms and conditions, and provided in the user\'s language where feasible.\n5. Disclosure mechanisms must be reviewed annually and updated when system capabilities change.`,
      `- **Product / UX Teams**: Implement disclosure mechanisms in product interfaces.\n- **Legal / Compliance**: Reviews disclosures for regulatory sufficiency.\n- **System Owner**: Ensures disclosure is accurate and up to date.`
    ),
  },

  {
    id: 'eu-technical-documentation',
    name: 'High-Risk AI Technical Documentation Standard',
    framework: 'EU AI Act',
    gainCollection: 'aia',
    description: 'Mandatory technical documentation for high-risk AI systems before market placement (Article 11).',
    trigger: { jurisdiction: 'EU' },
    bodyTemplate: tpl(
      'High-Risk AI Technical Documentation Standard',
      'This standard establishes documentation requirements for high-risk AI systems in compliance with EU AI Act Article 11, ensuring regulators and deployers can assess conformity.',
      'All AI systems classified as high-risk under the EU AI Act that are placed on the EU market or put into service in the EU.',
      `1. Technical documentation must be completed before market placement and kept current throughout the system\'s lifecycle.\n2. Documentation must include: general description, intended purpose, version history, performance metrics, training data description, human oversight measures, and known limitations.\n3. Documentation must be made available to national competent authorities upon request within [N] days.\n4. Material changes to high-risk AI systems must trigger a documentation update and, where required, a new conformity assessment.\n5. Documentation must be retained for 10 years after the system is placed on the market or put into service.`,
      `- **System Owner**: Owns and maintains technical documentation.\n- **Legal**: Assesses whether changes trigger a new conformity assessment.\n- **AI Governance Lead**: Maintains the register of high-risk systems and their documentation status.`
    ),
  },

  {
    id: 'eu-fundamental-rights-impact',
    name: 'Fundamental Rights Impact Assessment (FRIA) Procedure',
    framework: 'EU AI Act',
    gainCollection: 'aia',
    description: 'Pre-deployment assessment of high-risk AI systems for fundamental rights impacts (Article 27).',
    trigger: { jurisdiction: 'EU' },
    bodyTemplate: tpl(
      'Fundamental Rights Impact Assessment (FRIA) Procedure',
      'This procedure establishes requirements for conducting Fundamental Rights Impact Assessments (FRIAs) for high-risk AI systems deployed by public bodies and private operators in certain sectors, as required by EU AI Act Article 27.',
      'Public bodies and private operators deploying high-risk AI systems in the EU, as specified in Article 27.',
      `1. A FRIA must be conducted before deploying any high-risk AI system subject to Article 27 requirements.\n2. The FRIA must describe: the deployment process, categories of affected persons, specific fundamental rights at risk, severity and likelihood of harm, and planned human oversight measures.\n3. Consultation with relevant stakeholders (including affected communities where feasible) must be documented.\n4. The completed FRIA must be registered in the EU AI Act database where required.\n5. FRIAs must be reviewed and updated when the system or its deployment context changes materially.`,
      `- **Legal / Compliance**: Leads FRIA process; determines registration obligations.\n- **System Owner**: Provides technical input and deployment context.\n- **Affected Communities / Stakeholders**: Consulted where applicable.`
    ),
  },

  {
    id: 'eu-human-oversight',
    name: 'High-Risk AI Human Oversight and Override Policy',
    framework: 'EU AI Act',
    gainCollection: 'framework',
    description: 'Defines human review requirements, override authority, and escalation procedures for high-risk AI systems.',
    trigger: { jurisdiction: 'EU' },
    bodyTemplate: tpl(
      'High-Risk AI Human Oversight and Override Policy',
      'This policy ensures that high-risk AI systems are subject to appropriate human oversight measures, enabling human intervention and override as required by EU AI Act Article 14.',
      'All high-risk AI systems deployed by the organisation in or affecting persons in the EU.',
      `1. All high-risk AI systems must be designed and deployed with the ability for human operators to monitor, understand, and intervene in their operation.\n2. At least one designated human reviewer must be assigned to each high-risk system deployment.\n3. Human reviewers must receive training on the system\'s purpose, outputs, limitations, and bias risks before being assigned.\n4. A documented override procedure must be in place and tested at least annually.\n5. Override events must be logged with reason, actor, and outcome.`,
      `- **System Owner**: Assigns human reviewers; maintains training records.\n- **Human Reviewers / Operators**: Actively monitor outputs; exercise override when warranted.\n- **AI Governance Lead**: Reviews override logs; identifies systemic issues.`
    ),
  },

  {
    id: 'eu-post-market-monitoring',
    name: 'Post-Market Monitoring and Serious Incident Reporting Policy',
    framework: 'EU AI Act',
    gainCollection: 'risks',
    description: 'Establishes surveillance procedures after deployment and reporting obligations for serious incidents (Article 72).',
    trigger: { jurisdiction: 'EU' },
    bodyTemplate: tpl(
      'Post-Market Monitoring and Serious Incident Reporting Policy',
      'This policy establishes the organisation\'s post-market monitoring system and incident reporting obligations for high-risk AI systems, in compliance with EU AI Act Articles 72 and 73.',
      'All high-risk AI systems placed on the EU market or put into service in the EU.',
      `1. A post-market monitoring plan must be prepared before deployment and updated annually.\n2. Monitoring must include: performance metrics, user feedback collection, incident detection mechanisms, and bias/drift checks.\n3. Serious incidents (death, serious harm, property damage, fundamental rights violations) must be reported to the relevant national authority within 15 days of becoming aware.\n4. Near-miss events and material performance degradations must be documented and reviewed within [N] days.\n5. Monitoring results must inform model updates and risk assessments.`,
      `- **System Owner**: Owns the monitoring plan; escalates serious incidents.\n- **Legal / Compliance**: Determines reporting obligations and drafts authority notifications.\n- **AI Governance Lead**: Reviews aggregate monitoring data; updates risk posture.`
    ),
  },

  {
    id: 'eu-prohibited-systems',
    name: 'Prohibited AI Systems Policy',
    framework: 'EU AI Act',
    gainCollection: 'intake',
    description: 'Documents the organisation\'s commitment not to develop or deploy AI systems prohibited by the EU AI Act.',
    trigger: { jurisdiction: 'EU' },
    bodyTemplate: tpl(
      'Prohibited AI Systems Policy',
      'This policy establishes an absolute prohibition on developing, deploying, or using AI systems that are banned under EU AI Act Article 5, regardless of perceived business benefit.',
      'All personnel, projects, and third-party arrangements involving AI systems.',
      `1. The following AI applications are permanently prohibited:\n   - Real-time remote biometric identification systems in publicly accessible spaces (subject to narrow law enforcement exceptions).\n   - AI systems that use subliminal techniques to manipulate persons.\n   - AI systems that exploit vulnerabilities of specific groups to distort behaviour.\n   - Social scoring systems by public authorities.\n   - AI used to predict criminal offences based solely on profiling.\n   - AI that creates or expands facial recognition databases through untargeted scraping.\n   - AI used to infer emotions in workplace or educational settings (with limited exceptions).\n2. Any proposal involving the above must be immediately escalated to Legal before any development or procurement activity.\n3. Violations of this policy constitute a serious breach subject to disciplinary action.`,
      `- **AI Governance Board**: Reviews any borderline cases referred by Legal.\n- **Legal**: First point of escalation for potential prohibited use cases.\n- **All staff**: Must not initiate, commission, or use prohibited AI applications.`
    ),
  },

  // ── NYC Local Law 144 ────────────────────────────────────────────────────

  {
    id: 'nyc-aedt-governance',
    name: 'Automated Employment Decision Tool (AEDT) Governance Policy',
    framework: 'NYC Local Law 144',
    gainCollection: 'intake',
    description: 'Establishes organisational controls for AI used in NYC hiring, promotion, and employment decisions.',
    trigger: { jurisdictions: ['US-NYC', 'Employment/EEOC'] },
    bodyTemplate: tpl(
      'Automated Employment Decision Tool (AEDT) Governance Policy',
      'This policy establishes governance and compliance controls for the use of automated employment decision tools (AEDTs) in New York City, in compliance with NYC Local Law 144.',
      'All AI or automated tools used to screen, rank, or evaluate job candidates or employees for positions based in New York City.',
      `1. No AEDT may be used in NYC employment decisions without prior registration in the AI System Inventory.\n2. An independent bias audit must be completed by an authorised third party within one year before first use and annually thereafter.\n3. The bias audit summary report must be published on the company website before use begins.\n4. Candidates and employees must be notified at least 10 business days before an AEDT is used in a decision affecting them.\n5. Candidates must be offered an alternative selection process or reasonable accommodation upon request.`,
      `- **HR / Talent Acquisition**: Implements candidate notice; maintains records.\n- **Legal / Compliance**: Commissions bias audits; reviews publication requirements.\n- **AI Governance Lead**: Maintains AEDT inventory and audit schedule.`
    ),
  },

  {
    id: 'nyc-bias-audit',
    name: 'AEDT Bias Audit and Testing Procedure',
    framework: 'NYC Local Law 144',
    gainCollection: 'risks',
    description: 'Annual independent bias audit requirement for automated employment decision tools.',
    trigger: { jurisdictions: ['US-NYC', 'Employment/EEOC'] },
    bodyTemplate: tpl(
      'AEDT Bias Audit and Testing Procedure',
      'This procedure establishes requirements for commissioning and managing independent bias audits of AEDTs, as required by NYC Local Law 144 and DCWP rules.',
      'All AEDTs used in New York City employment decisions.',
      `1. Bias audits must be conducted by an independent third party with no financial interest in the AEDT.\n2. Audits must calculate impact ratios for race/ethnicity and sex categories.\n3. Audit scope must cover the most recent year of use data, or historical data if the tool has not been used yet.\n4. Audit results must be documented and retained for at least [3] years.\n5. A summary of the bias audit must be published publicly before or on the date of first use each year.`,
      `- **Legal / Compliance**: Selects and contracts the independent auditor; reviews findings.\n- **HR**: Provides candidate data to auditor; implements findings.\n- **System Owner**: Coordinates technical access for the audit.`
    ),
  },

  {
    id: 'nyc-candidate-notice',
    name: 'AEDT Candidate and Employee Notice Policy',
    framework: 'NYC Local Law 144',
    gainCollection: 'framework',
    description: 'Requires advance notice to candidates/employees when an AEDT will be used and provides an opt-out/alternative pathway.',
    trigger: { jurisdictions: ['US-NYC', 'Employment/EEOC'] },
    bodyTemplate: tpl(
      'AEDT Candidate and Employee Notice Policy',
      'This policy ensures candidates and employees are given required advance notice before an AEDT is used in employment decisions affecting them, in compliance with NYC Local Law 144.',
      'All job candidates and current employees considered for positions based in New York City where an AEDT is used.',
      `1. Written notice must be provided at least 10 business days before the AEDT is used, or before a position is posted if the AEDT screens applicants.\n2. Notice must state: that an AEDT will be used, which qualifications or characteristics it assesses, and how candidates may request an alternative process.\n3. The notice must be provided via job posting, email, or other direct written communication.\n4. A process must exist for candidates to request an alternative selection mechanism or reasonable accommodation.\n5. Records of notices sent and alternative requests received must be retained for [3] years.`,
      `- **HR / Talent Acquisition**: Drafts and delivers notices; processes alternative requests.\n- **Legal**: Reviews notice language for compliance.\n- **AI Governance Lead**: Audits compliance with notice timing requirements.`
    ),
  },

  // ── Colorado AI Act ──────────────────────────────────────────────────────

  {
    id: 'co-high-risk-identification',
    name: 'High-Risk AI System Identification Policy (Colorado)',
    framework: 'Colorado AI Act',
    gainCollection: 'intake',
    description: 'Procedures for determining when an AI system qualifies as high-risk under Colorado SB24-205.',
    trigger: { jurisdiction: 'US-CO' },
    bodyTemplate: tpl(
      'High-Risk AI System Identification Policy (Colorado)',
      'This policy establishes criteria and procedures for classifying AI systems as high-risk under Colorado SB24-205, effective June 30 2026, to ensure appropriate governance is applied before deployment.',
      'All AI systems deployed or used in Colorado that make or substantially influence consequential decisions affecting Colorado consumers.',
      `1. A system is high-risk if it makes or substantially influences a consequential decision regarding: employment, education, financial services, healthcare, housing, insurance, or legal services for Colorado consumers.\n2. All AI systems under evaluation must be assessed against this definition at the intake stage.\n3. Systems classified as high-risk must complete a Colorado-compliant AI Impact Assessment before deployment.\n4. Classification decisions must be documented and retained.\n5. The classification must be reviewed whenever the system\'s use case or Colorado deployment context changes.`,
      `- **System Owner**: Completes classification at intake.\n- **Legal / Compliance**: Makes final determination on borderline cases.\n- **AI Governance Lead**: Maintains the register of Colorado high-risk systems.`
    ),
  },

  {
    id: 'co-consumer-notice',
    name: 'Consumer Notification on Consequential AI Decisions (Colorado)',
    framework: 'Colorado AI Act',
    gainCollection: 'framework',
    description: 'Requires clear notice to Colorado consumers when high-risk AI makes or substantially influences a consequential decision.',
    trigger: { jurisdiction: 'US-CO' },
    bodyTemplate: tpl(
      'Consumer Notification on Consequential AI Decisions (Colorado)',
      'This policy establishes consumer notification requirements for consequential decisions substantially influenced by high-risk AI systems, as required by Colorado SB24-205.',
      'All interactions with Colorado consumers where a high-risk AI system substantially influences a consequential decision.',
      `1. Consumers must be notified when a high-risk AI system makes or substantially influences a consequential decision affecting them.\n2. Notification must be provided in plain language and explain that AI was used.\n3. Consumers must be informed of their right to appeal the decision and request human review where technically feasible.\n4. Consumers must be able to correct inaccurate personal data used in the decision.\n5. Notification records must be retained for [N] years.`,
      `- **Product / Operations**: Implements notification mechanisms.\n- **Legal**: Drafts compliant notice language.\n- **Customer Service**: Handles consumer appeals and data correction requests.`
    ),
  },

  {
    id: 'co-discrimination-reporting',
    name: 'Algorithmic Discrimination Reporting Policy (Colorado)',
    framework: 'Colorado AI Act',
    gainCollection: 'risks',
    description: 'Requires notification to the Colorado Attorney General within 90 days of discovering algorithmic discrimination.',
    trigger: { jurisdiction: 'US-CO' },
    bodyTemplate: tpl(
      'Algorithmic Discrimination Reporting Policy (Colorado)',
      'This policy establishes the process for identifying, investigating, and reporting incidents of algorithmic discrimination by high-risk AI systems to the Colorado Attorney General, as required by SB24-205.',
      'All high-risk AI systems deployed by the organisation in Colorado.',
      `1. Algorithmic discrimination is defined as any differential treatment of Colorado consumers based on protected characteristics resulting from a high-risk AI system.\n2. Upon discovery of potential algorithmic discrimination, a formal investigation must begin within [N] business days.\n3. If investigation confirms algorithmic discrimination, the Colorado Attorney General must be notified within 90 calendar days of discovery.\n4. Notification must include: system description, nature of discrimination, affected consumers, and corrective actions taken or planned.\n5. A corrective action plan must be completed and implemented within [N] days of confirmed discrimination.`,
      `- **Legal / Compliance**: Leads investigation; drafts AG notification.\n- **AI Governance Lead**: Coordinates incident response; updates Risk Register.\n- **System Owner**: Implements corrective actions.`
    ),
  },

  // ── Healthcare / HIPAA ───────────────────────────────────────────────────

  {
    id: 'hipaa-ai-governance',
    name: 'Covered Entity AI Governance Policy',
    framework: 'HIPAA',
    gainCollection: 'framework',
    description: 'Establishes accountability and oversight for any AI system used with Protected Health Information (PHI).',
    trigger: { sector: 'Healthcare/HIPAA' },
    bodyTemplate: tpl(
      'Covered Entity AI Governance Policy',
      'This policy establishes the governance framework for AI systems that create, receive, maintain, or transmit Protected Health Information (PHI), ensuring compliance with HIPAA Privacy and Security Rules.',
      'All AI systems and personnel that interact with PHI, including third-party AI tools used by covered entities and business associates.',
      `1. No AI system may process PHI without prior registration in the AI System Inventory and an executed BAA with the vendor.\n2. A HIPAA-specific risk analysis must be completed for all AI systems handling PHI before deployment.\n3. Minimum-necessary standards apply to PHI used in AI training and inference.\n4. PHI must not be used to train or fine-tune AI models without explicit consent or a valid HIPAA authorisation.\n5. A HIPAA Security Rule risk assessment must be updated whenever a new AI system is introduced to the PHI environment.`,
      `- **HIPAA Privacy Officer**: Reviews AI systems for PHI exposure; maintains BAA register.\n- **HIPAA Security Officer**: Conducts security risk analysis for AI systems.\n- **System Owner**: Ensures BAA is in place; documents minimum-necessary PHI usage.`
    ),
  },

  {
    id: 'hipaa-baa-ai',
    name: 'Business Associate Agreement (BAA) Policy for AI Vendors',
    framework: 'HIPAA',
    gainCollection: 'risks',
    description: 'Requires signed BAAs with AI-specific provisions for any vendor whose AI system accesses or processes PHI.',
    trigger: { sector: 'Healthcare/HIPAA' },
    bodyTemplate: tpl(
      'Business Associate Agreement (BAA) Policy for AI Vendors',
      'This policy requires executed Business Associate Agreements with AI-specific provisions for all vendors whose AI systems access, process, or store PHI, as required by HIPAA.',
      'All third-party AI vendors whose systems access PHI as part of services provided to the organisation.',
      `1. A signed BAA must be in place before any AI vendor accesses PHI.\n2. BAAs for AI vendors must include provisions covering: permitted uses of PHI, prohibition on using PHI for model training without authorisation, subcontractor flow-down requirements, breach notification timelines, and audit rights.\n3. BAAs must be reviewed whenever the vendor\'s AI system materially changes in scope or capability.\n4. The Legal/Privacy team must maintain a current register of all AI vendor BAAs.\n5. AI vendors who cannot execute an acceptable BAA must not be used with PHI.`,
      `- **Legal / Privacy Officer**: Drafts BAA template; executes and files BAAs.\n- **Procurement**: Routes AI vendor contracts through Legal before signature.\n- **System Owner**: Notifies Legal of any changes in vendor AI system scope.`
    ),
  },

  {
    id: 'hipaa-explainability',
    name: 'Healthcare AI Explainability and Transparency Policy',
    framework: 'HIPAA',
    gainCollection: 'aia',
    description: 'Requires plain-language documentation of AI model inputs, training, performance, and limitations for clinical AI.',
    trigger: { sector: 'Healthcare/HIPAA' },
    bodyTemplate: tpl(
      'Healthcare AI Explainability and Transparency Policy',
      'This policy ensures that AI systems used in clinical or patient-affecting contexts are sufficiently explainable to clinicians, patients, and oversight bodies, supporting safe and informed use of AI in healthcare.',
      'All AI systems that produce clinical recommendations, patient-facing outputs, or outputs that influence diagnostic, treatment, or administrative decisions.',
      `1. Each clinical AI system must have a plain-language description of: its intended purpose, training data sources, performance metrics by population subgroup, known limitations, and how outputs should be interpreted.\n2. Clinicians using AI decision support must receive training on the system\'s capabilities, limitations, and bias characteristics before use.\n3. AI outputs presented to clinicians must clearly indicate they are AI-generated and include relevant confidence or certainty indicators where technically feasible.\n4. Patients must be informed when AI was a significant factor in a clinical recommendation, upon request.\n5. EHR-integrated AI tools must comply with the ONC algorithm transparency requirements (effective January 1, 2025).`,
      `- **Clinical Informatics / CMO**: Owns explainability requirements; approves clinical AI deployments.\n- **System Owner**: Documents model characteristics; maintains training materials.\n- **Legal / Privacy**: Reviews patient disclosure obligations.`
    ),
  },

  // ── Financial Services / GLBA ────────────────────────────────────────────

  {
    id: 'glba-privacy-protection',
    name: 'AI Privacy and Data Protection Policy (GLBA)',
    framework: 'GLBA',
    gainCollection: 'framework',
    description: 'Ensures AI systems comply with GLBA Privacy Rule requirements for protecting consumer financial information.',
    trigger: { sector: 'Finance/GLBA' },
    bodyTemplate: tpl(
      'AI Privacy and Data Protection Policy (GLBA)',
      'This policy establishes requirements for protecting nonpublic personal financial information (NPI) in AI systems, in compliance with the Gramm-Leach-Bliley Act Privacy Rule.',
      'All AI systems that process, store, or transmit NPI about customers or consumers of financial products and services.',
      `1. NPI may not be used in AI model training without documented consumer consent or an applicable GLBA exception.\n2. AI systems processing NPI must be listed in the AI System Inventory with their data handling practices documented.\n3. Privacy notices must disclose AI-based data processing practices in plain language.\n4. NPI sharing with third-party AI vendors must be covered by a data processing agreement that restricts use to the specified purpose.\n5. Consumer opt-out mechanisms for AI-based data sharing must be honoured within [N] days.`,
      `- **Chief Privacy Officer**: Owns this policy; oversees consumer privacy notices.\n- **Legal**: Reviews data processing agreements; assesses sharing exceptions.\n- **System Owner**: Documents NPI data flows in AI systems.`
    ),
  },

  {
    id: 'glba-safeguards',
    name: 'AI Financial Data Safeguards Policy',
    framework: 'GLBA',
    gainCollection: 'risks',
    description: 'Implements GLBA Safeguards Rule requirements for security programs protecting customer financial data in AI systems.',
    trigger: { sector: 'Finance/GLBA' },
    bodyTemplate: tpl(
      'AI Financial Data Safeguards Policy',
      'This policy implements requirements for securing customer financial information within AI systems in accordance with the FTC Safeguards Rule under GLBA.',
      'All AI systems that access, process, or store NPI about financial customers.',
      `1. AI systems processing NPI must be included in the organisation\'s Information Security Program.\n2. Access to NPI in AI systems must be limited to authorised personnel based on the least-privilege principle.\n3. NPI used in AI systems must be encrypted at rest and in transit.\n4. AI vendor contracts must require equivalent data security standards for any NPI processed.\n5. A risk assessment of AI systems handling NPI must be included in the annual Safeguards Rule review.`,
      `- **CISO / Security Officer**: Owns this policy; conducts annual risk assessment.\n- **System Owner**: Implements and documents security controls.\n- **Legal**: Reviews vendor security requirements in contracts.`
    ),
  },

  {
    id: 'glba-model-governance',
    name: 'AI Model Governance and Validation Policy (GLBA)',
    framework: 'GLBA',
    gainCollection: 'inventory',
    description: 'Requirements for development, testing, validation, and monitoring of AI models used in financial operations.',
    trigger: { sector: 'Finance/GLBA' },
    bodyTemplate: tpl(
      'AI Model Governance and Validation Policy (GLBA)',
      'This policy establishes model governance requirements for AI and machine learning models used in financial operations, building on GLBA obligations and Federal Reserve SR 11-7 model risk management guidance.',
      'All AI and machine learning models used in credit decisions, fraud detection, customer screening, pricing, or financial reporting.',
      `1. All financial AI models must be registered in the Model Inventory before use.\n2. Each model must undergo independent validation before deployment, covering: conceptual soundness, data quality, performance testing, and sensitivity analysis.\n3. Models must be monitored monthly for performance drift; significant drift triggers a re-validation.\n4. Model documentation must be maintained and updated for all material changes.\n5. Retired models must be documented with retirement rationale and retained for [N] years.`,
      `- **Model Risk Officer / Quant Risk**: Owns the Model Inventory; commissions validations.\n- **Data Science / Analytics**: Develops models; provides documentation to validators.\n- **Internal Audit**: Reviews model governance annually.`
    ),
  },

  // ── Credit & Lending / ECOA + FCRA ───────────────────────────────────────

  {
    id: 'ecoa-fair-lending',
    name: 'Fair Lending AI Governance Policy',
    framework: 'ECOA / FCRA',
    gainCollection: 'framework',
    description: 'Establishes controls to ensure AI credit models comply with ECOA and do not produce discriminatory outcomes.',
    trigger: { sector: 'Credit/ECOA' },
    bodyTemplate: tpl(
      'Fair Lending AI Governance Policy',
      'This policy establishes the organisation\'s commitment to fair lending and non-discrimination in AI-based credit decisions, in compliance with the Equal Credit Opportunity Act (ECOA) and Regulation B.',
      'All AI systems used to make or substantially influence credit decisions, including underwriting, pricing, line management, and collections.',
      `1. AI credit models must be tested for disparate impact on protected classes (race, colour, religion, national origin, sex, marital status, age, familial status) before deployment.\n2. Models must be validated annually for fair lending compliance by an independent reviewer.\n3. Adverse action notices must provide specific, accurate reasons for credit denial even when AI models are used, and must not cite "model output" as the sole reason.\n4. Protected class data may not be used as direct inputs to AI credit models for non-mortgage purposes except for limited monitoring and testing purposes.\n5. A fair lending testing program must be maintained and results reviewed by the AI Governance Board annually.`,
      `- **Fair Lending Officer / BSA Officer**: Owns this policy; coordinates testing.\n- **Model Risk / Data Science**: Implements fair lending testing in model validation.\n- **Legal / Compliance**: Reviews adverse action notice adequacy; monitors regulatory guidance.`
    ),
  },

  {
    id: 'ecoa-adverse-action',
    name: 'Adverse Action Notice Policy for AI Credit Decisions',
    framework: 'ECOA / FCRA',
    gainCollection: 'framework',
    description: 'Ensures applicants receive specific, understandable reasons for credit denial when AI models are used.',
    trigger: { sector: 'Credit/ECOA' },
    bodyTemplate: tpl(
      'Adverse Action Notice Policy for AI Credit Decisions',
      'This policy establishes requirements for providing specific and accurate adverse action notices to credit applicants when AI or machine learning models are used, in compliance with ECOA Regulation B and FCRA.',
      'All credit decisions made or substantially influenced by AI models where an adverse action notice is required.',
      `1. Adverse action notices must provide the most significant and specific reasons for denial, not generic AI model outputs.\n2. Reason codes derived from AI models must be explainable and mapped to consumer-understandable language.\n3. The organisation must maintain documentation of how AI model outputs are translated into adverse action reason codes.\n4. CFPB guidance on AI/ML model adverse action notices must be reviewed and incorporated into procedures annually.\n5. Notices must comply with ECOA Regulation B timing requirements regardless of whether AI or traditional models were used.`,
      `- **Credit / Compliance Team**: Maintains reason code library; reviews notice accuracy.\n- **Data Science / Model Team**: Provides explainability documentation for reason code mapping.\n- **Legal**: Monitors CFPB guidance; reviews notice templates.`
    ),
  },

  // ── Education / FERPA + COPPA ────────────────────────────────────────────

  {
    id: 'ferpa-student-data-privacy',
    name: 'Student Data Privacy and AI Policy',
    framework: 'FERPA / COPPA',
    gainCollection: 'framework',
    description: 'Institutional commitment to protecting student education records and child online data in AI contexts.',
    trigger: { sector: 'Education/FERPA' },
    bodyTemplate: tpl(
      'Student Data Privacy and AI Policy',
      'This policy establishes the organisation\'s commitment to protecting student education records and children\'s online data in AI systems, in compliance with FERPA, COPPA, and applicable state student privacy laws.',
      'All AI systems used in educational contexts that process or could access student education records or personal information from children under 13.',
      `1. Student education records may not be shared with AI vendors without a valid FERPA exception (school official with legitimate educational interest, or written consent).\n2. Personal information may not be collected from children under 13 through AI systems without verifiable parental consent (COPPA).\n3. All AI tools used with students must be vetted for FERPA, COPPA, and applicable state law compliance before adoption.\n4. AI vendor contracts must include a Student Data Protection Agreement (DPA) prohibiting commercial use of student data.\n5. Parents and eligible students must be able to access, correct, and request deletion of education records used in AI systems.`,
      `- **Privacy Officer / Data Protection Officer**: Owns this policy; maintains vendor DPA register.\n- **Technology / IT**: Vets AI tools before procurement; implements access controls.\n- **Legal**: Reviews FERPA exceptions; drafts DPA requirements.`
    ),
  },

  {
    id: 'ferpa-parental-consent',
    name: 'Parental Consent Procedure for AI Data Collection (COPPA)',
    framework: 'FERPA / COPPA',
    gainCollection: 'intake',
    description: 'Verifiable parental consent process for AI systems collecting personal information from children under 13.',
    trigger: { sector: 'Education/FERPA' },
    bodyTemplate: tpl(
      'Parental Consent Procedure for AI Data Collection (COPPA)',
      'This procedure establishes requirements for obtaining verifiable parental consent before collecting personal information from children under 13 through AI systems, in compliance with COPPA.',
      'All AI systems and digital services directed at children under 13, or that knowingly collect personal information from children under 13.',
      `1. No AI system may collect personal information from a child under 13 without first obtaining verifiable parental consent (VPC).\n2. VPC methods must meet FTC standards (e.g., signed consent form, credit card verification, video call).\n3. A clear, plain-language privacy notice must be provided to parents before consent is obtained.\n4. Children\'s data collected under COPPA must not be shared with AI vendors without a contractual prohibition on commercial use.\n5. VPC records must be retained for [N] years and available for FTC inspection.`,
      `- **Privacy Officer**: Designs and maintains the VPC process.\n- **Product / Technology**: Implements age-gating and consent collection in AI products.\n- **Legal**: Reviews VPC method adequacy against current FTC guidance.`
    ),
  },

  // ── Insurance / NAIC ─────────────────────────────────────────────────────

  {
    id: 'naic-ai-use-policy',
    name: 'NAIC AI Systems Use Policy',
    framework: 'NAIC',
    gainCollection: 'framework',
    description: 'Organisational commitment to responsible AI aligned with the NAIC Model Bulletin on AI Systems.',
    trigger: { sector: 'Insurance' },
    bodyTemplate: tpl(
      'NAIC AI Systems Use Policy',
      'This policy establishes the organisation\'s commitment to responsible AI use in insurance operations, aligned with the NAIC Model Bulletin on the Use of Artificial Intelligence Systems and applicable state insurance regulations.',
      'All AI systems used in insurance underwriting, claims handling, pricing, marketing, and customer service.',
      `1. AI systems used in insurance operations must be accountable, transparent, fair, secure, and compliant.\n2. AI systems must not produce unfairly discriminatory outcomes in violation of applicable state insurance laws.\n3. Consumers must be able to understand the basis of adverse insurance decisions influenced by AI.\n4. Third-party AI vendors must demonstrate equivalent governance standards as a condition of contract.\n5. This policy must be reviewed annually and updated when NAIC guidance or state regulations change.`,
      `- **Chief Compliance Officer**: Owns this policy; reports to the Board.\n- **Actuarial / Underwriting**: Ensures AI models meet unfair discrimination standards.\n- **Legal**: Monitors NAIC and state regulatory developments.`
    ),
  },

  {
    id: 'naic-bias-fairness',
    name: 'Bias and Fairness Testing in Insurance AI Policy',
    framework: 'NAIC',
    gainCollection: 'risks',
    description: 'Pre-deployment and ongoing testing of insurance AI for disparate impact and unfair discriminatory outcomes.',
    trigger: { sector: 'Insurance' },
    bodyTemplate: tpl(
      'Bias and Fairness Testing in Insurance AI Policy',
      'This policy establishes requirements for testing and monitoring AI systems used in insurance for unfair discriminatory outcomes, in compliance with NAIC AI guidelines and state unfair trade practices laws.',
      'All AI systems used in underwriting, claims, pricing, and marketing decisions for insurance products.',
      `1. A bias and fairness assessment must be completed for all AI systems before deployment in insurance operations.\n2. Testing must evaluate disparate impact on protected classes under applicable state law.\n3. Actuarial review must confirm that any AI-driven rate or underwriting differences are actuarially justified.\n4. Post-deployment monitoring for discriminatory outcomes must occur at least annually.\n5. Systems found to produce unfair discriminatory outcomes must be suspended pending remediation.`,
      `- **Actuarial / Pricing**: Leads actuarial justification review.\n- **Compliance / Legal**: Assesses state unfair discrimination standards; reviews test results.\n- **Model Risk / Data Science**: Conducts technical bias testing.`
    ),
  },

  {
    id: 'naic-generative-ai',
    name: 'Generative AI Governance Policy (Insurance)',
    framework: 'NAIC',
    gainCollection: 'framework',
    description: 'Specific governance for generative AI systems used in insurance (claims, underwriting support, customer communications).',
    trigger: { sector: 'Insurance' },
    bodyTemplate: tpl(
      'Generative AI Governance Policy (Insurance)',
      'This policy establishes governance requirements specific to generative AI (GenAI) systems used in insurance operations, addressing risks unique to large language models and other generative technologies.',
      'All generative AI tools and systems used in insurance operations, including AI-generated policy summaries, claims correspondence, underwriting narratives, and customer communications.',
      `1. GenAI systems used in insurance must be registered in the AI System Inventory with GenAI type noted.\n2. All customer-facing outputs generated by GenAI must be reviewed by a qualified human before transmission.\n3. GenAI must not generate policy terms, coverage determinations, or claims decisions without human review and approval.\n4. Hallucination risk must be assessed and mitigated through prompt design, output validation, and human review protocols.\n5. GenAI training data must not include customer NPI without express authorisation.`,
      `- **Chief Compliance Officer**: Approves use cases for GenAI in insurance operations.\n- **Claims / Underwriting Management**: Implements human review checkpoints.\n- **IT / Security**: Ensures GenAI systems meet data security requirements.`
    ),
  },

  // ── SOX ──────────────────────────────────────────────────────────────────

  {
    id: 'sox-internal-controls',
    name: 'AI Internal Controls Policy',
    framework: 'SOX',
    gainCollection: 'risks',
    description: 'Establishes controls for AI systems used in financial reporting to ensure accuracy, auditability, and SOX compliance.',
    trigger: { sector: 'Public Company/SOX' },
    bodyTemplate: tpl(
      'AI Internal Controls Policy',
      'This policy establishes internal control requirements for AI systems that affect financial reporting, accounting estimates, or internal controls, ensuring compliance with Sarbanes-Oxley Act Sections 302 and 404.',
      'All AI systems that produce, transform, or quality-check data used in financial reporting, or that support internal controls over financial reporting (ICFR).',
      `1. AI systems that are part of ICFR must be documented in the internal controls framework and assessed annually.\n2. Change management controls must be applied to all AI systems in scope for SOX, including change approvals, testing, and rollback procedures.\n3. Access controls for financial AI systems must follow least-privilege principles and be reviewed semi-annually.\n4. Outputs of AI systems in financial reporting must be subject to human review by a qualified person before inclusion in filings.\n5. Material weaknesses or significant deficiencies identified in AI-related controls must be reported to the Audit Committee.`,
      `- **Controller / CFO**: Owns financial reporting AI systems; certifies controls (Section 302).\n- **Internal Audit**: Tests AI-related controls as part of SOX 404 assessment.\n- **IT / Security**: Implements access and change management controls.`
    ),
  },

  {
    id: 'sox-section-404',
    name: 'Section 404 Compliance Policy for AI-Assisted Controls',
    framework: 'SOX',
    gainCollection: 'framework',
    description: 'Documentation and testing requirements for internal controls relying on AI systems.',
    trigger: { sector: 'Public Company/SOX' },
    bodyTemplate: tpl(
      'Section 404 Compliance Policy for AI-Assisted Controls',
      'This policy establishes requirements for documenting, testing, and assessing the effectiveness of internal controls over financial reporting that rely on or use AI systems, in compliance with SOX Section 404.',
      'All AI-assisted controls that are in scope for management\'s assessment of ICFR under SOX Section 404.',
      `1. AI-assisted controls must be documented in the ICFR narrative with a description of the AI\'s role, data inputs, outputs, and human review steps.\n2. Testing of AI-assisted controls must include: walkthrough of the AI process, testing of IT general controls over the AI system, and testing of the human review step.\n3. Management must assess the design and operating effectiveness of AI-assisted controls annually.\n4. Deficiencies identified in AI-assisted controls must be classified (control deficiency, significant deficiency, or material weakness) and remediated on the same timeline as other SOX deficiencies.\n5. External auditors must be briefed on AI-assisted controls in scope for their ICFR audit.`,
      `- **Controller / CFO**: Signs off on management assessment.\n- **SOX Program Manager**: Coordinates documentation and testing; liaises with external auditors.\n- **Internal Audit**: Performs independent testing of AI-assisted controls.`
    ),
  },

  {
    id: 'sox-financial-reporting-transparency',
    name: 'Financial Reporting AI Transparency Policy',
    framework: 'SOX',
    gainCollection: 'framework',
    description: 'Ensures AI tools used in financial reporting are transparent, explainable, and auditable.',
    trigger: { sector: 'Public Company/SOX' },
    bodyTemplate: tpl(
      'Financial Reporting AI Transparency Policy',
      'This policy ensures that AI systems contributing to financial reporting are sufficiently transparent and auditable to support management certifications under SOX Sections 302 and 404 and to withstand external audit scrutiny.',
      'All AI systems that produce outputs used directly or indirectly in the preparation of financial statements, disclosures, or supporting schedules.',
      `1. Financial reporting AI systems must maintain audit trails of inputs, model parameters, and outputs for a minimum of [7] years.\n2. AI model changes must be documented, approved by the Controller, and tested before use in financial close processes.\n3. AI systems must provide outputs that a competent accountant can understand and challenge.\n4. The external auditors must be informed of AI systems in the financial reporting process and given access to documentation and outputs upon request.\n5. AI systems must not replace the professional judgement of a qualified accountant for estimates requiring significant judgement.`,
      `- **Controller / CFO**: Approves AI model changes in financial reporting processes.\n- **External Auditors**: Review AI system documentation and outputs as part of the audit.\n- **IT / Data**: Maintains audit trail infrastructure.`
    ),
  },
];

// ── Suggestion engine ────────────────────────────────────────────────────────

function matchesTrigger(trigger, posture) {
  if (!trigger) return true;
  const sectors = posture?.sectors || [];
  const jurisdictions = posture?.jurisdictions || [];
  const ms = posture?.managementSystem || '';
  if (trigger.sector) return sectors.includes(trigger.sector);
  if (trigger.sectors) return trigger.sectors.some(s => sectors.includes(s));
  if (trigger.jurisdiction) return jurisdictions.includes(trigger.jurisdiction);
  if (trigger.jurisdictions) {
    // match if any jurisdiction listed OR if any matching sector is selected
    return trigger.jurisdictions.some(j => jurisdictions.includes(j) || sectors.includes(j));
  }
  if (trigger.managementSystem) return ms.includes(trigger.managementSystem);
  return false;
}

export function suggestedPolicies(posture, existingLibraryIds = new Set()) {
  return POLICY_LIBRARY.filter(p =>
    !existingLibraryIds.has(p.id) && matchesTrigger(p.trigger, posture)
  );
}

export const FRAMEWORKS = [
  'NIST AI RMF',
  'ISO 42001',
  'EU AI Act',
  'NYC Local Law 144',
  'Colorado AI Act',
  'HIPAA',
  'GLBA',
  'ECOA / FCRA',
  'FERPA / COPPA',
  'NAIC',
  'SOX',
  'Other',
];

export const GAIN_COLLECTIONS = [
  { value: 'framework', label: 'Governance / Framework' },
  { value: 'governance', label: 'Board / Roles' },
  { value: 'intake', label: 'Intake' },
  { value: 'inventory', label: 'Inventory' },
  { value: 'aia', label: 'AI Impact Assessments' },
  { value: 'risks', label: 'Risk Register' },
];
