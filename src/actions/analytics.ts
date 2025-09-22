
"use server";

import { collection, addDoc, serverTimestamp, writeBatch, getDocs } from 'firebase/firestore';
// Certifique-se de que o caminho para seu arquivo de configuração do firebase está correto
import { db } from '@/lib/firebase';

/**
 * Cria um novo documento na coleção 'visits' para registrar uma visita única diária.
 */
export async function logVisit(): Promise<void> {
  try {
    const visitsCollection = collection(db, "visits");
    await addDoc(visitsCollection, {
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Failed to log visit:", error);
    // Não relançamos o erro para não quebrar a experiência do usuário se o rastreamento falhar.
  }
}

export async function clearAllAnalytics(): Promise<{ success: boolean; error?: string }> {
  try {
    const batch = writeBatch(db);

    const collectionsToClear = ['visits', 'live_notifications', 'clickCounts'];

    for (const collectionName of collectionsToClear) {
      const collectionRef = collection(db, collectionName);
      const snapshot = await getDocs(collectionRef);
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
    }

    await batch.commit();
    return { success: true };
  } catch (error: any) {
    console.error("Erro ao limpar dados de análise:", error);
    return { success: false, error: error.message };
  }
}
