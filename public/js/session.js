// Session / auth helpers.
//
// Every protected page should call requireAuth() at the top of its module
// script. That function returns a promise that resolves with { user, memberships }
// once the user is signed in, or redirects to /index.html if they aren't.
//
// The "active company" is stored in localStorage under `gain.activeCompanyId`.
// A page that needs a company context should call requireCompany() which
// resolves with { user, company, member, memberships } or redirects to the
// dashboard if no company is picked yet.

import { auth, db } from './config.js';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  GoogleAuthProvider,
  signInWithPopup
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  collection,
  getDocs,
  query,
  where
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const ACTIVE_COMPANY_KEY = 'gain.activeCompanyId';

// ---------- auth ----------

export function onAuth(cb) {
  return onAuthStateChanged(auth, cb);
}

export function currentUser() {
  return auth.currentUser;
}

export async function signIn(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function signUp(email, password, displayName) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const user = cred.user;
  if (displayName) {
    await updateProfile(user, { displayName });
  }
  // Create /users/{uid}
  await setDoc(doc(db, 'users', user.uid), {
    displayName: displayName || '',
    email: user.email,
    createdAt: serverTimestamp(),
    companyIds: []
  }, { merge: true });
  return user;
}

export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

// Sign in (or sign up) via Google. Works with any Google account, including
// Google Workspace — SSO is automatic when the user is signed into their
// Workspace tenant. Creates /users/{uid} on first login. Returns
// { user, isNewUser }.
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const cred = await signInWithPopup(auth, provider);
  const user = cred.user;
  const existingProfile = await getDoc(doc(db, 'users', user.uid));
  const isNewUser = !existingProfile.exists();
  if (isNewUser) {
    await setDoc(doc(db, 'users', user.uid), {
      displayName: user.displayName || '',
      email: user.email,
      createdAt: serverTimestamp(),
      companyIds: [],
    }, { merge: true });
  } else {
    await setDoc(doc(db, 'users', user.uid), {
      displayName: user.displayName || existingProfile.data().displayName || '',
      email: user.email,
    }, { merge: true });
  }
  return { user, isNewUser };
}

// In-app password change for a signed-in user. Reauthenticates with the
// current password first (Firebase requires a recent sign-in for password
// updates), then sets the new one. Returns nothing on success; throws on
// auth/wrong-password, auth/weak-password, etc.
export async function changePassword(currentPassword, newPassword) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not signed in.');
  if (!user.email) throw new Error('No email associated with this account.');
  const cred = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, cred);
  await updatePassword(user, newPassword);
}

export async function logOut() {
  localStorage.removeItem(ACTIVE_COMPANY_KEY);
  try { sessionStorage.removeItem('gain.hideBrandFooter'); } catch (_) {}
  await signOut(auth);
}

// ---------- user profile ----------

export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function upsertUserProfile(user, patch = {}) {
  await setDoc(doc(db, 'users', user.uid), {
    displayName: user.displayName || patch.displayName || '',
    email: user.email,
    ...patch
  }, { merge: true });
}

// ---------- memberships ----------

// Returns the list of companies this user belongs to, by reading the member
// docs via a collection-group query. Each result includes the company doc.
export async function loadMemberships(uid) {
  const q = query(collection(db, 'users', uid, 'memberCache'));
  // The memberCache subcollection is optional — the source of truth is the
  // companyIds array on the user doc. We hydrate each company doc by id.
  const profile = await getUserProfile(uid);
  const ids = (profile && Array.isArray(profile.companyIds)) ? profile.companyIds : [];
  const results = [];
  for (const companyId of ids) {
    try {
      const companySnap = await getDoc(doc(db, 'companies', companyId));
      if (!companySnap.exists()) continue;
      const memberSnap = await getDoc(doc(db, 'companies', companyId, 'members', uid));
      if (!memberSnap.exists()) continue;
      results.push({
        company: { id: companySnap.id, ...companySnap.data() },
        member: { id: memberSnap.id, ...memberSnap.data() }
      });
    } catch (e) {
      console.warn('Failed to load company', companyId, e);
    }
  }
  results.sort((a, b) => (a.company.name || '').localeCompare(b.company.name || ''));
  return results;
}

// ---------- active company ----------

export function getActiveCompanyId() {
  return localStorage.getItem(ACTIVE_COMPANY_KEY) || null;
}

export function setActiveCompanyId(companyId) {
  if (companyId) {
    localStorage.setItem(ACTIVE_COMPANY_KEY, companyId);
  } else {
    localStorage.removeItem(ACTIVE_COMPANY_KEY);
  }
}

// ---------- guards ----------

// Resolves when signed in, redirects to /index.html otherwise.
export function requireAuth() {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = '/index.html';
        return;
      }
      const memberships = await loadMemberships(user.uid);
      resolve({ user, memberships });
    });
  });
}

// Requires both auth AND an active company. Redirects to /dashboard.html if no
// active company is set or the user isn't a member of the saved one.
export async function requireCompany() {
  const { user, memberships } = await requireAuth();
  const activeId = getActiveCompanyId();
  const match = memberships.find(m => m.company.id === activeId);
  if (!match) {
    window.location.href = '/dashboard.html';
    return new Promise(() => {}); // never resolves; page is redirecting
  }
  // Cache branding flag for renderFooter() — only Business/Enterprise plans
  // may hide the GAIN brand tagline, so we check plan eligibility here so
  // renderFooter can be plan-unaware.
  try {
    const plan = resolvePlan(match.company);
    const brandEligible = plan === 'business' || plan === 'enterprise';
    const hide = !!(match.company.hideBrandFooter && brandEligible);
    sessionStorage.setItem('gain.hideBrandFooter', hide ? '1' : '0');
  } catch (_) {}
  return { user, memberships, company: match.company, member: match.member };
}

// ---------- role helpers ----------

export function roleRank(role) {
  return { owner: 4, admin: 3, editor: 2, viewer: 1 }[role] || 0;
}

export function canEdit(member) {
  return member && roleRank(member.role) >= roleRank('editor');
}

export function canAdmin(member) {
  return member && roleRank(member.role) >= roleRank('admin');
}

export function isOwner(member) {
  return member && member.role === 'owner';
}

// ---------- super admin ----------
// Only this email is a platform-wide super admin. The actual account (and its
// password) must be created directly in Firebase Auth — never in source code.
// Super admin access is enforced both in the UI (below) and in Firestore rules
// (via request.auth.token.email check).
export const SUPERADMIN_EMAIL = 'admin@governainow.com';

export function isSuperadmin(user) {
  return !!(user && user.email && user.email.toLowerCase() === SUPERADMIN_EMAIL);
}

// ---------- plan ----------
// Valid plan keys across the app. Anything else falls back to 'starter'.
export const PLAN_KEYS = ['starter', 'pro', 'business', 'enterprise'];

// Effective plan for a company. Precedence:
//   1. planOverride — superadmin-set comp/test license (bypasses billing entirely).
//   2. stripePlan   — written by the Stripe webhook on real subscription state.
//   3. plan         — legacy/manual field.
//   4. 'starter'    — default free tier.
export function resolvePlan(company) {
  if (!company) return 'starter';
  const raw = (company.planOverride || company.stripePlan || company.plan || 'starter').toLowerCase();
  return PLAN_KEYS.includes(raw) ? raw : 'starter';
}
