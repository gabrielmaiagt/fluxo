
'use server';
/**
 * @fileOverview Um fluxo para notificar o proprietário do site sobre uma ação do usuário.
 *
 * - notifyOwner - Uma função que lida com o envio de notificações push para o admin.
 * - NotifyOwnerInput - O tipo de entrada para a função notifyOwner.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import * as admin from 'firebase-admin';
import { firebaseConfig } from '@/lib/firebase';

// Inicialize o Firebase Admin SDK apenas uma vez
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`
  });
}

const NotifyOwnerInputSchema = z.object({
  label: z.string().describe('Um rótulo para a ação que acionou a notificação.'),
});

type NotifyOwnerInput = z.infer<typeof NotifyOwnerInputSchema>;

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
      const tokensSnapshot = await admin.firestore().collection('adminPushTokens').get();
      if (tokensSnapshot.empty) {
        console.log('Nenhum token de admin encontrado.');
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
      console.log('Notificações enviadas com sucesso:', response.successCount);
      
      if (response.failureCount > 0) {
        const failedTokens: string[] = [];
        response.responses.forEach((resp, idx) => {
          if (!resp.success) {
            failedTokens.push(tokens[idx]);
          }
        });
        console.log('Lista de tokens que falharam:', failedTokens);
        // Opcional: Lógica para limpar tokens inválidos do Firestore
      }

      return { success: response.successCount > 0 };
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
      return { success: false };
    }
  }
);
