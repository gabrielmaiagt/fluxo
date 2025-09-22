'use client';

import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app } from "./firebase";
import { registerAdmin } from "@/ai/flows/registerAdmin";

const vapidKey = "BMA4boknocWY3_LTEvHIP69zsOU7ipULcG_3PcOJahW8qNNfSsI8XjAuyRr40u-B76QRBvm_zdei5NUBugsk2zs";

export async function enableAdminPush(uid: string) {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !window.Notification) {
        throw new Error("Este navegador não suporta notificações push.");
    }
    if (!vapidKey || vapidKey === 'YOUR_VAPID_KEY') {
        console.error("VAPID key is not set. Please set it in src/lib/push.ts");
        alert("A chave VAPID não está configurada. Verifique o console para mais detalhes.");
        throw new Error("VAPID key is not set.");
    }

    const messaging = getMessaging(app);

    try {
        await navigator.serviceWorker.register("/firebase-messaging-sw.js");

        const perm = await window.Notification.requestPermission();
        if (perm !== "granted") {
            throw new Error("Permissão para notificações foi negada.");
        }

        console.log("Obtendo token...");
        const token = await getToken(messaging, {
            vapidKey: vapidKey,
            serviceWorkerRegistration: await navigator.serviceWorker.ready,
        });

        if (token) {
            console.log("Token do Admin:", token);
            // Em vez de escrever no DB pelo cliente, chamamos o fluxo do servidor
            const result = await registerAdmin({ uid, token });

            if (!result.success) {
                throw new Error("Falha ao registrar o token no servidor.");
            }

            console.log("Token do admin salvo via fluxo do servidor.");

            // Opcional: ouvir mensagens com a aba aberta
            onMessage(messaging, (payload) => {
                console.log("Mensagem recebida em foreground: ", payload);
                const { title, body } = payload.notification || {};
                new window.Notification(title || "Novo Evento", { body: body || "Você tem um novo alerta." });
            });
            
            return token;
        } else {
            throw new Error("Não foi possível obter o token de notificação.");
        }
    } catch (error) {
        console.error("Erro ao habilitar notificações push:", error);
        throw error;
    }
}
