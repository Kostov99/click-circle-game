// firebase-init.js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

navigator.serviceWorker.register('firebase-messaging-sw.js')
  .then((reg) => {
    messaging.useServiceWorker(reg);
    return Notification.requestPermission();
  })
  .then((permission) => {
    if (permission === "granted") {
      return messaging.getToken({ vapidKey: "YOUR_PUBLIC_VAPID_KEY" });
    } else {
      console.warn("Permission denied");
    }
  })
  .then((token) => {
    if (token) {
      console.log("FCM Token:", token);
      localStorage.setItem("fcm_token", token);
    }
  })
  .catch((err) => {
    console.error("FCM error:", err);
  });

messaging.onMessage((payload) => {
  alert(`🔔 ${payload.notification.title}: ${payload.notification.body}`);
});

