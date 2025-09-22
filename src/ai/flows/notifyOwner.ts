
'use server';
/**
 * @fileOverview Um fluxo para notificar o proprietário do site sobre uma ação do usuário.
 *
 * - notifyOwner - Uma função que lida com o envio de notificações push para o admin.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import * as admin from 'firebase-admin';

// Helper para inicializar o Firebase Admin de forma segura (uma única vez)
function initializeFirebaseAdmin() {
  if (admin.apps.length === 0) {
    try {
        admin.initializeApp({
            credential: admin.credential.applicationDefault(),
        });
        console.log("Firebase Admin SDK inicializado com sucesso.");
    } catch(e: any) {
        console.error("Erro ao inicializar Firebase Admin SDK:", e.message);
        // Lançar o erro pode ajudar a diagnosticar problemas de credenciais
        throw new Error(`Falha na inicialização do Firebase Admin: ${e.message}`);
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
      initializeFirebaseAdmin();
      const firestore = admin.firestore();
      
      const tokensSnapshot = await firestore.collection('adminPushTokens').get();
      
      if (tokensSnapshot.empty) {
        console.log('Nenhum token de admin encontrado para enviar notificação.');
        return { success: false };
      }

      const tokens = tokensSnapshot.docs.map(doc => doc.data().token).filter(Boolean);

      if (tokens.length === 0) {
        console.log('Tokens de admin vazios ou inválidos.');
        return { success: false };
      }
      
      const payload: admin.messaging.MulticastMessage = {
        notification: {
          title: '🔔 Nova Ação no Site',
          body: `Um usuário clicou em: ${input.label}`,
        },
        tokens,
      };

      const response = await admin.messaging().sendEachForMulticast(payload);
      console.log('Relatório de envio de notificações:', response);
      
      if (response.failureCount > 0) {
        const failedTokens: string[] = [];
        response.responses.forEach((resp, idx) => {
          if (!resp.success) {
            failedTokens.push(tokens[idx]);
            console.warn(`Falha ao enviar para o token: ${tokens[idx]}`, resp.error);
          }
        });
        console.log('Lista de tokens que falharam:', failedTokens);
      }

      return { success: response.successCount > 0 };
    } catch (error) {
      console.error('Erro geral no fluxo notifyOwnerFlow:', error);
      return { success: false };
    }
  }
);
