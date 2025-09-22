
'use server';
/**
 * @fileOverview Um fluxo para registrar o token de push FCM de um administrador no Firestore.
 *
 * - registerAdmin - Uma função que salva o token de push do administrador.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import * as admin from 'firebase-admin';

// Helper para inicializar o Firebase Admin de forma segura (uma única vez)
function initializeFirebaseAdmin() {
  if (admin.apps.length === 0) {
    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
      console.warn('As variáveis de ambiente do Firebase (para o Admin SDK) não estão definidas. O registro do token falhará.');
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
        console.log("Firebase Admin SDK inicializado com sucesso (registerAdmin).");
    } catch(e: any) {
        console.error("Erro ao inicializar Firebase Admin SDK (registerAdmin):", e.message);
        return null;
    }
  }
  return admin.app();
}


const RegisterAdminInputSchema = z.object({
  uid: z.string().describe('O ID único para o dispositivo do administrador.'),
  token: z.string().describe('O token de registro do Firebase Cloud Messaging (FCM).'),
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
        console.error("Admin SDK não inicializado, não é possível salvar o token.");
        return { success: false };
      }
      const firestore = admin.firestore();
      
      // Salva o token FCM em uma coleção específica para facilitar o envio posterior
      await firestore.collection('adminPushTokens').doc(uid).set({
        token: token,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      
      console.log(`Token FCM para o dispositivo admin ${uid} foi salvo/atualizado.`);
      return { success: true };

    } catch (error) {
      console.error('Erro no fluxo registerAdminFlow ao salvar token:', error);
      return { success: false };
    }
  }
);
