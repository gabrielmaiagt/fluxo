
'use server';
/**
 * @fileOverview Um fluxo para buscar os dados de contagem de cliques do Firestore.
 *
 * - getClickCounts - Uma função que retorna a contagem de cliques para cada botão.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import * as admin from 'firebase-admin';

// Helper para inicializar o Firebase Admin de forma segura (uma única vez)
function initializeFirebaseAdmin() {
  if (admin.apps.length === 0) {
    // A inicialização já deve ter ocorrido em outros fluxos, mas verificamos por segurança.
    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
      console.warn('As variáveis de ambiente do Firebase (para o Admin SDK) não estão definidas. A busca de dados falhará.');
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
        console.log("Firebase Admin SDK inicializado com sucesso (getClickCounts).");
    } catch(e: any) {
        console.error("Erro ao inicializar Firebase Admin SDK (getClickCounts):", e.message);
        return null;
    }
  }
  return admin.app();
}

const ClickCountSchema = z.object({
  label: z.string(),
  count: z.number(),
});

const GetClickCountsOutputSchema = z.array(ClickCountSchema);

export type ClickCount = z.infer<typeof ClickCountSchema>;

export async function getClickCounts(): Promise<ClickCount[]> {
  return getClickCountsFlow();
}

const getClickCountsFlow = ai.defineFlow(
  {
    name: 'getClickCountsFlow',
    inputSchema: z.undefined(),
    outputSchema: GetClickCountsOutputSchema,
  },
  async () => {
    try {
      const app = initializeFirebaseAdmin();
      if (!app) {
        console.error("Admin SDK não inicializado, não é possível buscar os dados de clique.");
        return [];
      }
      
      const firestore = admin.firestore();
      
      const clicksSnapshot = await firestore.collection('clickCounts').orderBy('count', 'desc').get();
      
      if (clicksSnapshot.empty) {
        console.log('Nenhum dado de clique encontrado.');
        return [];
      }
      
      const clickCounts = clicksSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          label: data.label || doc.id,
          count: data.count || 0,
        };
      });
      
      return clickCounts;

    } catch (error) {
      console.error('Erro no fluxo getClickCountsFlow:', error);
      // Retorna um array vazio em caso de erro para não quebrar o front-end
      return [];
    }
  }
);
