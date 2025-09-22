'use client';

/**
 * @fileoverview Lógica do lado do cliente para registrar o navegador para notificações push
 * usando Firebase Cloud Messaging (FCM).
 */

import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { registerAdmin } from "@/ai/flows/registerAdmin";
import { app, db } from "./firebase"; // app e db são necessários para inicialização

// Função para solicitar permissão e registrar para notificações push
export async function enablePushNotifications() {
  // Verifica se o código está rodando no navegador e se o messaging é suportado
  const messaging = (typeof window !== 'undefined') ? (await import('firebase/messaging')).getMessaging(app) : null;
  
  if (!messaging) {
    throw new Error("O Messaging do Firebase não é suportado neste navegador.");
  }
  
  try {
    // Registra o service worker do Firebase
    await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    console.log("Service Worker do Firebase registrado com sucesso.");
    
    // Solicita permissão para notificações
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      throw new Error('Permissão para notificações foi negada.');
    }
    console.log('Permissão de notificação concedida.');

    const vapidKey = process.env.NEXT_PUBLIC_VAPID_KEY;
    if (!vapidKey) {
        console.error("VAPID key não encontrada nas variáveis de ambiente (NEXT_PUBLIC_VAPID_KEY).");
        throw new Error("Configuração do cliente incompleta. Chave VAPID ausente.");
    }
    
    const registration = await navigator.serviceWorker.ready;
    const token = await getToken(messaging, { 
      vapidKey: vapidKey,
      serviceWorkerRegistration: registration,
    });
    
    if (!token) {
      throw new Error('Não foi possível obter o token de registro do FCM.');
    }
    console.log('Token do Admin:', token);
    
    // Envia o token para o servidor para ser salvo
    // O UID é apenas um identificador único para o admin, pode ser fixo.
    const result = await registerAdmin({ uid: 'admin-main-device', token });
    
    if (!result.success) {
      throw new Error('Falha ao registrar o token no servidor.');
    }
    console.log("Token registrado no servidor com sucesso.");

    // Ouve por mensagens enquanto a página de admin está aberta (útil para debug)
    onMessage(messaging, (payload) => {
      console.log('Mensagem recebida em foreground: ', payload);
      const notificationTitle = payload.notification?.title || 'Nova Notificação';
      const notificationOptions = {
        body: payload.notification?.body || '',
        icon: '/favicon.ico',
      };
      new Notification(notificationTitle, notificationOptions);
    });

    return token;
    
  } catch (error) {
    console.error('Erro ao habilitar notificações push:', error);
    // Propaga o erro para ser tratado pela UI
    throw error;
  }
}
