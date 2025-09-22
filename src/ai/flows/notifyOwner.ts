
'use server';
/**
 * @fileOverview Um fluxo para notificar o proprietário do site sobre uma ação do usuário e registrar a contagem de cliques.
 *
 * - notifyOwner - Uma função que registra um clique e cria um gatilho de notificação ao vivo no Firestore.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import * as admin from 'firebase-admin';

// Helper para inicializar o Firebase Admin de forma segura (uma única vez)
function initializeFirebaseAdmin() {
  if (admin.apps.length === 0) {
    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
      console.warn('As variáveis de ambiente do Firebase (para o Admin SDK) não estão definidas. A notificação e o registro de cliques falharão.');
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
  label: z.string().describe('Um rótulo para a ação que acionou a notificação (ex: "Clique no WhatsApp").'),
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
        console.error("Admin SDK não inicializado, não é possível processar a ação.");
        return { success: false };
      }
      
      const firestore = admin.firestore();

      // Tarefa 1: Incrementar o contador de cliques para o dashboard
      const clickDocRef = firestore.collection('clickCounts').doc(input.label);
      try {
        await clickDocRef.set({
          count: admin.firestore.FieldValue.increment(1),
          label: input.label,
          lastClicked: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        console.log(`Clique no botão "${input.label}" registrado com sucesso.`);
      } catch (firestoreError) {
        console.error("Erro ao registrar clique no Firestore:", firestoreError);
      }
      
      // Tarefa 2: Criar um documento gatilho para a notificação ao vivo na página de admin
      try {
        const liveNotificationRef = firestore.collection('live_notifications').doc();
        await liveNotificationRef.set({
            label: input.label,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            read: false
        });
        console.log(`Gatilho de notificação ao vivo criado para "${input.label}".`);
      } catch (liveNotificationError) {
         console.error("Erro ao criar gatilho de notificação ao vivo:", liveNotificationError);
      }

      return { success: true };

    } catch (error) {
      console.error('Erro geral no fluxo notifyOwnerFlow:', error);
      return { success: false };
    }
  }
);
