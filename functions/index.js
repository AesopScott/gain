const { onDocumentCreated, onDocumentUpdated } = require('firebase-functions/v2/firestore');
const { defineSecret } = require('firebase-functions/params');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

const brevoKey = defineSecret('BREVO_API_KEY');

const APP_URL = 'https://governainow.com';
const SENDER_EMAIL = 'noreply@governainow.com';
const SENDER_NAME = 'GAIN — Govern AI Now';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
async function sendEmail({ apiKey, to, toName, subject, htmlContent }) {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': apiKey,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      sender: { name: SENDER_NAME, email: SENDER_EMAIL },
      to: [{ email: to, name: toName || '' }],
      subject,
      htmlContent
    })
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Brevo ${res.status}: ${text}`);
  }
}

function emailShell(bodyHtml) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <style>
    body{margin:0;padding:0;background:#f5f5f5;font-family:sans-serif;}
    .wrap{max-width:540px;margin:40px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08);}
    .hdr{background:#1a1a2e;padding:24px 32px;}
    .hdr a{color:#fff;font-size:20px;font-weight:700;text-decoration:none;letter-spacing:.5px;}
    .body{padding:32px;}
    .body p{margin:0 0 16px;color:#333;line-height:1.6;}
    .btn{display:inline-block;background:#4f46e5;color:#fff!important;text-decoration:none;padding:12px 28px;border-radius:6px;font-weight:600;margin:8px 0;}
    .foot{padding:20px 32px;background:#f9f9f9;font-size:12px;color:#888;border-top:1px solid #eee;}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="hdr"><a href="${APP_URL}">GAIN</a></div>
    <div class="body">${bodyHtml}</div>
    <div class="foot">GAIN — Govern AI Now &bull; <a href="${APP_URL}" style="color:#888">${APP_URL}</a></div>
  </div>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// 1. Admin sends invite → email the invited person
// ---------------------------------------------------------------------------
exports.onInviteCreated = onDocumentCreated(
  { document: 'invites/{inviteId}', secrets: [brevoKey] },
  async (event) => {
    const invite = event.data.data();
    if (!invite.email) return;

    let companyName = invite.companyId;
    try {
      const snap = await db.doc(`companies/${invite.companyId}`).get();
      if (snap.exists) companyName = snap.data().name || companyName;
    } catch (_) {}

    const from = invite.inviterName || 'An admin';
    const roleLabel = invite.role
      ? invite.role.charAt(0).toUpperCase() + invite.role.slice(1)
      : 'Member';

    await sendEmail({
      apiKey: brevoKey.value(),
      to: invite.email,
      subject: `You've been invited to join ${companyName} on GAIN`,
      htmlContent: emailShell(`
        <p>Hi,</p>
        <p><strong>${from}</strong> has invited you to join <strong>${companyName}</strong>
        on GAIN as a <strong>${roleLabel}</strong>.</p>
        <p>Sign in or create an account using <strong>${invite.email}</strong> and the
        invitation will be applied automatically.</p>
        <p><a class="btn" href="${APP_URL}/">Accept Invitation</a></p>
        <p style="font-size:.85em;color:#888">If you weren't expecting this, you can ignore this email.</p>
      `)
    });
  }
);

// ---------------------------------------------------------------------------
// 2. User requests to join a company → email all owners/admins
// ---------------------------------------------------------------------------
exports.onJoinRequestCreated = onDocumentCreated(
  { document: 'companies/{companyId}/joinRequests/{requestId}', secrets: [brevoKey] },
  async (event) => {
    const companyId = event.params.companyId;
    const req = event.data.data();

    const [companySnap, membersSnap] = await Promise.all([
      db.doc(`companies/${companyId}`).get(),
      db.collection(`companies/${companyId}/members`).get()
    ]);

    const companyName = companySnap.exists ? companySnap.data().name : companyId;
    const admins = membersSnap.docs
      .filter(d => ['owner', 'admin'].includes(d.data().role) && d.data().email)
      .map(d => ({ email: d.data().email, displayName: d.data().displayName || '' }));

    if (!admins.length) return;

    const requesterLabel = req.displayName
      ? `${req.displayName} (${req.email})`
      : req.email;

    await Promise.all(admins.map(a =>
      sendEmail({
        apiKey: brevoKey.value(),
        to: a.email,
        toName: a.displayName,
        subject: `New join request for ${companyName} on GAIN`,
        htmlContent: emailShell(`
          <p>Hi${a.displayName ? ` ${a.displayName}` : ''},</p>
          <p><strong>${requesterLabel}</strong> has requested to join
          <strong>${companyName}</strong> on GAIN.</p>
          ${req.message ? `<p>Their message: <em>"${req.message}"</em></p>` : ''}
          <p><a class="btn" href="${APP_URL}/settings.html">Review Request</a></p>
        `)
      })
    ));
  }
);

// ---------------------------------------------------------------------------
// 3. Join request approved or denied → email the requester
// ---------------------------------------------------------------------------
exports.onJoinRequestUpdated = onDocumentUpdated(
  { document: 'companies/{companyId}/joinRequests/{requestId}', secrets: [brevoKey] },
  async (event) => {
    const before = event.data.before.data();
    const after = event.data.after.data();

    if (before.status === after.status) return;
    if (after.status !== 'approved' && after.status !== 'denied') return;
    if (!after.email) return;

    const companyId = event.params.companyId;
    let companyName = companyId;
    try {
      const snap = await db.doc(`companies/${companyId}`).get();
      if (snap.exists) companyName = snap.data().name || companyName;
    } catch (_) {}

    const approved = after.status === 'approved';

    await sendEmail({
      apiKey: brevoKey.value(),
      to: after.email,
      toName: after.displayName || '',
      subject: approved
        ? `You've been approved to join ${companyName} on GAIN`
        : `Your request to join ${companyName} was not approved`,
      htmlContent: emailShell(approved
        ? `
          <p>Hi${after.displayName ? ` ${after.displayName}` : ''},</p>
          <p>Your request to join <strong>${companyName}</strong> on GAIN has been
          <strong>approved</strong>. Sign in to access your workspace.</p>
          <p><a class="btn" href="${APP_URL}/dashboard.html">Go to Dashboard</a></p>
        `
        : `
          <p>Hi${after.displayName ? ` ${after.displayName}` : ''},</p>
          <p>Your request to join <strong>${companyName}</strong> on GAIN was not approved
          at this time. Contact the company admin directly if you think this is a mistake.</p>
        `
      )
    });
  }
);
