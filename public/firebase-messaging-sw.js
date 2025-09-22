/* eslint-disable no-undef */
// Importa compat para SW
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

// Cole aqui a configuração do seu projeto Firebase.
// Esta configuração é segura para ser pública.
const firebaseConfig = {
  "projectId": "adcraft-blueprint",
  "appId": "1:1071558588370:web:b225fd25847301b03bfa0b",
  "apiKey": "AIzaSyCKtS_ZSgzfcfo-l571JhsaOffkphcXFx0",
  "authDomain": "adcraft-blueprint.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "1071558588370"
};

firebase.initializeApp(firebaseConfig);

// Necessário para receber push em background
const messaging = firebase.messaging();

// (Opcional) personalizar notificação recebida em background
messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  const notificationTitle = payload.notification?.title || 'Novo Evento';
  const notificationOptions = {
    body: payload.notification?.body || 'Você tem um alerta do site.',
    icon: '/icon-192.png', // Opcional: adicione um ícone na pasta public
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
