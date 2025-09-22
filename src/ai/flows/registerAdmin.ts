
'use server';
/**
 * @fileOverview A flow to securely register an admin's push notification token.
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
        throw new Error('As variáveis de ambiente do Firebase não estão definidas. Verifique seu arquivo .env');
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
          throw new Error(`Firebase Admin initialization failed: ${e.message}`);
      }
    }
    return admin.app();
  }


const RegisterAdminInputSchema = z.object({
  uid: z.string().describe('The unique ID for the admin user.'),
  token: z.string().describe('The push notification token to register.'),
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
      initializeFirebaseAdmin();
      const firestore = admin.firestore();
      
      await firestore.collection('adminPushTokens').doc(uid).set({
        token,
        updatedAt: Date.now(),
      });
      
      console.log(`Admin token for UID ${uid} saved to Firestore.`);
      return { success: true };

    } catch (error) {
      console.error('Error in registerAdminFlow:', error);
      return { success: false };
    }
  }
);
