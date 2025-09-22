// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in the messagingSenderId.
// O sender ID precisa ser o mesmo do seu projeto
firebase.initializeApp({
    apiKey: "AIzaSyCKtS_ZSgzfcfo-l571JhsaOffkphcXFx0",
    authDomain: "adcraft-blueprint.firebaseapp.com",
    projectId: "adcraft-blueprint",
    storageBucket: "adcraft-blueprint.appspot.com",
    messagingSenderId: "1071558588370",
    appId: "1:1071558588370:web:b225fd25847301b03bfa0b"
});


// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo-escura.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
