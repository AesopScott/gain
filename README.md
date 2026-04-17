# GAIN — Governance for AI, Navigated

Multi-tenant AI governance program builder. Each company works through the
framework in its own isolated workspace; all data lives in Firestore under
`/companies/{companyId}/...` and is protected by member-based security rules.

Pattern follows Aesop Academy: plain HTML, ES modules from CDN, no build step.
The difference is that GAIN uses Firebase Auth (email + password) because
governance data needs real, revocable access control.

## Structure

```
/gain/
├── firebase.json              Hosting + Firestore config
├── .firebaserc                Firebase project alias
├── firestore.rules            Member-based access control
├── firestore.indexes.json     Composite indexes
└── public/
    ├── index.html             Login / sign up / password reset
    ├── dashboard.html         Company picker + program progress
    ├── framework.html         Framework Selection Worksheet (interactive)
    ├── intake.html            AI Use Case Intake Form
    ├── inventory.html         AI System Inventory
    ├── aia.html               AI Impact Assessment editor
    ├── risks.html             Risk Register with scoring
    ├── settings.html          Company settings + members
    ├── css/gain-theme.css     CSS variables + base styles
    ├── js/config.js           Firebase config (edit after creating project)
    ├── js/session.js          Auth guard, user/company context
    ├── js/ui.js               Shared header, toast, modal helpers
    └── js/data.js             Firestore CRUD wrappers
```

## One-Time Firebase Setup

1. Create a new Firebase project in the console, name it `gain-app` (or edit
   `.firebaserc` to match whatever you pick).
2. Enable **Authentication → Email/Password** provider.
3. Enable **Firestore** in Native mode (pick region near your users).
4. In Project Settings → Your apps → register a Web app, copy the config into
   `public/js/config.js` (template is provided there).
5. Install the CLI if you don't have it: `npm install -g firebase-tools`.
6. `firebase login`
7. From this folder: `firebase deploy --only firestore:rules,firestore:indexes`
8. `firebase deploy --only hosting`

## Custom Domain

- In the Firebase Console → Hosting → Add custom domain, follow the wizard.
- Point DNS records at Firebase's verification target, then at Firebase Hosting.
- No code changes needed — the app runs from whatever domain points at the site.

## Data Model

```
/users/{uid}
    displayName, email, createdAt, companyIds[]

/companies/{companyId}
    name, ownerUid, createdAt, industry, size, archived

    /members/{uid}
        role: owner | admin | editor | viewer
        email, displayName, joinedAt

    /frameworkPosture/current
        operatingFramework, managementSystem,
        jurisdictions[], sectors[],
        riskAppetite, maturityTarget, ratifiedAt, ratifiedBy

    /intake/{useCaseId}        (use-case intake requests)
    /inventory/{systemId}      (AI systems in production / planned)
    /aias/{aiaId}              (AI Impact Assessments, linked to inventory)
    /risks/{riskId}            (risk register entries)
    /audit/{eventId}           (append-only event journal)

/invites/{inviteId}            email-based invites (redeemed on sign up)
```

## Roles

| Role    | Can do                                                     |
|---------|------------------------------------------------------------|
| owner   | Everything (one per company; cannot be removed)            |
| admin   | Invite/remove members, edit company, edit posture          |
| editor  | Create/edit intake, inventory, AIAs, risks                 |
| viewer  | Read-only access                                           |

## Local Development

No build step. Open `public/index.html` in a browser, or run:

```bash
cd gain
npx firebase emulators:start
```

(The emulator serves hosting, runs Firestore and Auth locally.)

## Deployment

```bash
firebase deploy
```

That's it.
