// Firestore CRUD wrappers scoped to the active company.
//
// Every function takes `companyId` as the first arg (to avoid hidden globals)
// and paths under /companies/{companyId}/... for strict tenant isolation.

import { db } from './config.js';
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  runTransaction,
  arrayUnion,
  arrayRemove
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// ---------- company lifecycle ----------

// Creates a new company document AND the owner member record in a single
// transaction. Also appends the companyId to the user's companyIds array.
export async function createCompany({ uid, email, displayName, name, industry = '', size = '' }) {
  const companyRef = doc(collection(db, 'companies'));
  const memberRef = doc(db, 'companies', companyRef.id, 'members', uid);
  const userRef = doc(db, 'users', uid);

  await runTransaction(db, async (tx) => {
    const userSnap = await tx.get(userRef);
    const existing = userSnap.exists() ? (userSnap.data().companyIds || []) : [];

    tx.set(companyRef, {
      name,
      ownerUid: uid,
      industry,
      size,
      archived: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    tx.set(memberRef, {
      role: 'owner',
      email,
      displayName: displayName || '',
      joinedAt: serverTimestamp()
    });
    tx.set(userRef, {
      email,
      displayName: displayName || '',
      companyIds: [...new Set([...existing, companyRef.id])]
    }, { merge: true });
  });

  return companyRef.id;
}

export async function updateCompany(companyId, patch) {
  await updateDoc(doc(db, 'companies', companyId), {
    ...patch,
    updatedAt: serverTimestamp()
  });
}

export async function getCompany(companyId) {
  const snap = await getDoc(doc(db, 'companies', companyId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// ---------- members ----------

export async function listMembers(companyId) {
  const snap = await getDocs(collection(db, 'companies', companyId, 'members'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function updateMemberRole(companyId, memberUid, role) {
  await updateDoc(doc(db, 'companies', companyId, 'members', memberUid), { role });
}

export async function removeMember(companyId, memberUid) {
  await deleteDoc(doc(db, 'companies', companyId, 'members', memberUid));
  // Also pull companyId from that user's companyIds, best-effort.
  try {
    await updateDoc(doc(db, 'users', memberUid), {
      companyIds: arrayRemove(companyId)
    });
  } catch (e) {
    console.warn('Could not update user companyIds on removal:', e.message);
  }
}

// ---------- invites ----------

export async function createInvite({ companyId, email, role, inviterUid, inviterName }) {
  const ref = await addDoc(collection(db, 'invites'), {
    companyId,
    email: email.toLowerCase().trim(),
    role,
    inviterUid,
    inviterName: inviterName || '',
    createdAt: serverTimestamp()
  });
  return ref.id;
}

export async function listInvitesForCompany(companyId) {
  const q = query(collection(db, 'invites'), where('companyId', '==', companyId));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function listInvitesForEmail(email) {
  const q = query(collection(db, 'invites'), where('email', '==', email.toLowerCase().trim()));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function redeemInvite({ inviteId, companyId, uid, email, displayName, role }) {
  const companyRef = doc(db, 'companies', companyId);
  const memberRef = doc(db, 'companies', companyId, 'members', uid);
  const userRef = doc(db, 'users', uid);
  const inviteRef = doc(db, 'invites', inviteId);

  await runTransaction(db, async (tx) => {
    const userSnap = await tx.get(userRef);
    const existing = userSnap.exists() ? (userSnap.data().companyIds || []) : [];
    tx.set(memberRef, {
      role,
      email,
      displayName: displayName || '',
      joinedAt: serverTimestamp(),
      inviteId // needed by the firestore rule to authorize self-create via invite
    });
    tx.set(userRef, {
      email,
      displayName: displayName || '',
      companyIds: [...new Set([...existing, companyId])]
    }, { merge: true });
    tx.delete(inviteRef);
  });
}

export async function deleteInvite(inviteId) {
  await deleteDoc(doc(db, 'invites', inviteId));
}

// ---------- framework posture ----------

export async function getPosture(companyId) {
  const snap = await getDoc(doc(db, 'companies', companyId, 'frameworkPosture', 'current'));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function savePosture(companyId, data, actorUid) {
  await setDoc(doc(db, 'companies', companyId, 'frameworkPosture', 'current'), {
    ...data,
    updatedAt: serverTimestamp(),
    updatedBy: actorUid
  }, { merge: true });
}

// ---------- generic collection CRUD ----------
// Used for intake, inventory, aias, risks — all follow the same pattern.

function col(companyId, name) {
  return collection(db, 'companies', companyId, name);
}

function rec(companyId, name, id) {
  return doc(db, 'companies', companyId, name, id);
}

export async function listDocs(companyId, name, opts = {}) {
  const constraints = [];
  if (opts.where) {
    for (const [f, op, v] of opts.where) constraints.push(where(f, op, v));
  }
  if (opts.orderBy) {
    for (const [f, dir] of opts.orderBy) constraints.push(orderBy(f, dir || 'asc'));
  }
  if (opts.limit) constraints.push(limit(opts.limit));
  const q = constraints.length ? query(col(companyId, name), ...constraints) : col(companyId, name);
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getRecord(companyId, name, id) {
  const snap = await getDoc(rec(companyId, name, id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function createRecord(companyId, name, data, actorUid) {
  const ref = await addDoc(col(companyId, name), {
    ...data,
    createdAt: serverTimestamp(),
    createdBy: actorUid,
    updatedAt: serverTimestamp(),
    updatedBy: actorUid
  });
  return ref.id;
}

export async function updateRecord(companyId, name, id, patch, actorUid) {
  await updateDoc(rec(companyId, name, id), {
    ...patch,
    updatedAt: serverTimestamp(),
    updatedBy: actorUid
  });
}

export async function deleteRecord(companyId, name, id) {
  await deleteDoc(rec(companyId, name, id));
}

// ---------- audit log ----------

export async function logEvent(companyId, { actorUid, actorName, action, target, details = {} }) {
  await addDoc(col(companyId, 'audit'), {
    actorUid,
    actorName: actorName || '',
    action,
    target: target || '',
    details,
    at: serverTimestamp()
  });
}

export async function listRecentEvents(companyId, n = 50) {
  return listDocs(companyId, 'audit', {
    orderBy: [['at', 'desc']],
    limit: n
  });
}
