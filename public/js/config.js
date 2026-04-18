// Firebase app initialization.
//
// Values below are the live config for the `gain-e89d8` Firebase project.
// Safe to commit publicly — the real security boundary is enforced by
// Firestore rules, not by keeping these values secret.

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCchLWh7Opz4K9976900bup1omxZ3NPdb4',
  authDomain: 'gain-e89d8.firebaseapp.com',
  projectId: 'gain-e89d8',
  storageBucket: 'gain-e89d8.firebasestorage.app',
  messagingSenderId: '881719598649',
  appId: '1:881719598649:web:6fbff6ae247fe5bed777e8',
  measurementId: 'G-TF8MTZ2J68'
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
