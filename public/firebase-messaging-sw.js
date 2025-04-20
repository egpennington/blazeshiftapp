/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBravNT6hugMJmttdZNtfmIQLz8gfqgfb0",
  authDomain: "blazeshiftapp.firebaseapp.com",
  projectId: "blazeshiftapp",
  messagingSenderId: "458611007306",
  appId: "1:458611007306:web:85343d07173440737d6bb3"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification.title;

  const notificationOptions = {
    body: payload.notification.body,
    icon: '/android-chrome-192x192.png', // ✅ high-res icon
    badge: '/favicon-32x32.png',         // ✅ clean badge icon (optional)
    actions: [
      { action: 'view', title: '📅 View Shift' },
      { action: 'dismiss', title: '❌ Dismiss' }
    ],
    data: {
      url: 'https://blazeshiftapp.netlify.app/' // where to send user on click
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (const client of clientList) {
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

