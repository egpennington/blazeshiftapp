import React, { useEffect } from 'react'
import ShiftSignupForm from './components/ShiftSignupForm'
import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";

const vapidKey = "BCGNce0TKYPnWXcRL_ZMxvk_UkZE1eJ27_I02-xq8c9JTj3Vgoslza3-iLnbMgn6f1f1p3Ufhle5CI00UJmaE30";

const App = () => {
  useEffect(() => {
    const requestPermission = async () => {
      console.log("🔔 Requesting notification permission...");
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("✅ Notification permission granted.");
        const token = await getToken(messaging, { vapidKey });
        console.log("📲 FCM Token:", token);
        // Optionally: save token to Firestore here
      } else {
        console.log("❌ Notification permission denied.");
      }
    };

    requestPermission();
  }, []);

  return (
    <div className="App">
      <ShiftSignupForm />
    </div>
  );
};

export default App;