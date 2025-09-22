'use server';

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  "projectId": "adcraft-blueprint",
  "appId": "1:1071558588370:web:b225fd25847301b03bfa0b",
  "apiKey": "AIzaSyCKtS_ZSgzfcfo-l571JhsaOffkphcXFx0",
  "authDomain": "adcraft-blueprint.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "1071558588370"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const messaging = (typeof window !== 'undefined') ? getMessaging(app) : null;


export { app, db, messaging, firebaseConfig };
