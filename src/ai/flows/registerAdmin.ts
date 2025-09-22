
'use server';
/**
 * @fileOverview A flow to securely register an admin's push notification token for local notifications.
 *
 * - registerAdmin - A function that saves the admin's push token to Firestore.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import * as admin from 'firebase-admin';

// Helper to initialize Firebase Admin safely (only once)
function initializeFirebaseAdmin() {
    if (admin.apps.length === 0) {
      if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
        console.warn('As variáveis de ambiente do Firebase não estão definidas. O registro pode não funcionar no servidor.');
        return null;
      }
      try {
          admin.initializeApp({
              credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
              }),
          });
          console.log("Firebase Admin SDK initialized successfully (registerAdmin).");
      } catch(e: any) {
          console.error("Error initializing Firebase Admin SDK (registerAdmin):", e.message);
          return null;
      }
    }
    return admin.app();
  }


const RegisterAdminInputSchema = z.object({
  uid: z.string().describe('The unique ID for the admin user.'),
  token: z.string().describe('A generic token or identifier for the browser session.'),
});

export type RegisterAdminInput = z.infer<typeof RegisterAdminInputSchema>;

export async function registerAdmin(input: RegisterAdminInput): Promise<{ success: boolean; }> {
  return registerAdminFlow(input);
}

const registerAdminFlow = ai.defineFlow(
  {
    name: 'registerAdminFlow',
    inputSchema: RegisterAdminInputSchema,
    outputSchema: z.object({ success: z.boolean() }),
  },
  async ({ uid, token }) => {
    try {
      const app = initializeFirebaseAdmin();
       if (!app) {
        return { success: false };
      }
      const firestore = admin.firestore();
      
      // We are not using push tokens anymore, but we can save a generic identifier if needed.
      // For now, this just confirms the server-side flow can be called.
      await firestore.collection('adminActiveSessions').doc(uid).set({
        lastSeen: Date.now(),
        dummyToken: token, // Not a real push token
      });
      
      console.log(`Admin active session for UID ${uid} registered.`);
      return { success: true };

    } catch (error) {
      console.error('Error in registerAdminFlow:', error);
      return { success: false };
    }
  }
);
