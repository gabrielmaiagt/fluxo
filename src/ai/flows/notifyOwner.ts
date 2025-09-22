
'use server';
/**
 * @fileOverview Um fluxo para registrar uma ação do usuário no Firestore.
 *
 * - notifyOwner - Uma função que salva um registro da ação do usuário.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import * as admin from 'firebase-admin';

// Helper para inicializar o Firebase Admin de forma segura (uma única vez)
function initializeFirebaseAdmin() {
  if (admin.apps.length === 0) {
    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
      console.warn('As variáveis de ambiente do Firebase não estão definidas. A notificação pode não funcionar no servidor.');
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
        console.log("Firebase Admin SDK inicializado com sucesso (notifyOwner).");
    } catch(e: any) {
        console.error("Erro ao inicializar Firebase Admin SDK (notifyOwner):", e.message);
        return null;
    }
  }
  return admin.app();
}


const NotifyOwnerInputSchema = z.object({
  label: z.string().describe('Um rótulo para a ação que acionou a notificação.'),
});

export type NotifyOwnerInput = z.infer<typeof NotifyOwnerInputSchema>;

export async function notifyOwner(input: NotifyOwnerInput): Promise<{ success: boolean; }> {
  return notifyOwnerFlow(input);
}

const notifyOwnerFlow = ai.defineFlow(
  {
    name: 'notifyOwnerFlow',
    inputSchema: NotifyOwnerInputSchema,
    outputSchema: z.object({ success: z.boolean() }),
  },
  async (input) => {
    try {
      const app = initializeFirebaseAdmin();
      if (!app) {
        return { success: false };
      }
      const firestore = admin.firestore();
      
      // Salva a ação em uma coleção para ser "ouvida" pelo admin
      await firestore.collection('userActions').add({
        label: input.label,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log(`Ação do usuário registrada: ${input.label}`);
      return { success: true };

    } catch (error) {
      console.error('Erro geral no fluxo notifyOwnerFlow:', error);
      return { success: false };
    }
  }
);
