
'use server';
/**
 * @fileOverview Um fluxo para notificar o proprietário do site sobre uma ação do usuário via Push Notification.
 *
 * - notifyOwner - Uma função que dispara uma notificação push para os administradores.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import * as admin from 'firebase-admin';

// Helper para inicializar o Firebase Admin de forma segura (uma única vez)
function initializeFirebaseAdmin() {
  if (admin.apps.length === 0) {
    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
      console.warn('As variáveis de ambiente do Firebase (para o Admin SDK) não estão definidas. O envio de notificações falhará.');
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
        console.error("Admin SDK não inicializado, não é possível enviar notificação ou registrar clique.");
        return { success: false };
      }
      
      const firestore = admin.firestore();
      const messaging = admin.messaging();

      // Tarefa 1: Incrementar o contador de cliques
      const clickDocRef = firestore.collection('clickCounts').doc(input.label);
      try {
        await clickDocRef.set({
          count: admin.firestore.FieldValue.increment(1),
          label: input.label, // Garante que o rótulo esteja no documento
          lastClicked: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        console.log(`Clique no botão "${input.label}" registrado com sucesso.`);
      } catch (firestoreError) {
        console.error("Erro ao registrar clique no Firestore:", firestoreError);
        // Continua para enviar a notificação mesmo se o registro do clique falhar
      }
      
      // Tarefa 2: Enviar a notificação push
      const tokensSnapshot = await firestore.collection('adminPushTokens').get();
      if (tokensSnapshot.empty) {
        console.log('Nenhum token de administrador encontrado para enviar notificação.');
        return { success: true }; // Sucesso, pois não havia ninguém para notificar.
      }

      const tokens = tokensSnapshot.docs.map(doc => doc.data().token);

      const message: admin.messaging.MulticastMessage = {
        tokens: tokens,
        notification: {
          title: '🔔 Novo Clique no Site!',
          body: `Um usuário clicou em: ${input.label}`,
        },
        webpush: {
          fcmOptions: {
            link: '/admin', 
          },
          notification: {
             icon: 'https://i.postimg.cc/zGxkL1Hp/logo-escura.png'
          }
        },
      };

      const batchResponse = await messaging.sendEachForMulticast(message);
      console.log(`${batchResponse.successCount} mensagens enviadas com sucesso.`);

      if (batchResponse.failureCount > 0) {
        const failedTokens: string[] = [];
        batchResponse.responses.forEach((resp, idx) => {
          if (!resp.success) {
            failedTokens.push(tokens[idx]);
          }
        });
        console.log('Tokens que falharam:', failedTokens);
      }

      return { success: true };

    } catch (error) {
      console.error('Erro geral no fluxo notifyOwnerFlow:', error);
      return { success: false };
    }
  }
);
