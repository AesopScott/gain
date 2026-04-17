// Firebase app initialization.
//
// Replace the placeholder values below with the config from Firebase Console:
//   Project settings → Your apps → Web app → Config
//
// Everything in this file is SAFE to commit publicly — the real security
// boundary is enforced by Firestore rules, not by keeping these values secret.

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'REPLACE_WITH_YOUR_API_KEY',
  authDomain: 'gain-app.firebaseapp.com',
  projectId: 'gain-app',
  storageBucket: 'gain-app.appspot.com',
  messagingSenderId: 'REPLACE_WITH_YOUR_SENDER_ID',
  appId: 'REPLACE_WITH_YOUR_APP_ID'
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
