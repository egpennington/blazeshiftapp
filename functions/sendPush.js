// functions/sendPush.js
const functions = require("firebase-functions");
const { google } = require("googleapis");
const cors = require("cors")({ origin: true });
const admin = require("firebase-admin");
const fetch = require("node-fetch");

admin.initializeApp();

const SCOPES = ["https://www.googleapis.com/auth/firebase.messaging"];

exports.sendPush = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { token, name, block, date } = req.body;

    if (!token) {
      console.error("❌ No FCM token received");
      return res.status(400).send("Missing token");
    }

    console.log("📥 Incoming token:", token);

    try {
      const auth = new google.auth.GoogleAuth({ scopes: SCOPES });
      const accessToken = await auth.getAccessToken();
      const projectId = "blazeshiftapp"; // actual Firebase project ID


      const message = {
        message: {
          token,
          notification: {
            title: "🚒 BlazeShift Signup Confirmed",
            body: `Hi ${name}, you're confirmed for the ${block} shift on ${date}`,
          },
          webpush: {
            fcmOptions: {
              link: "https://blazeshift.netlify.app/"
            }
          }
        }
      };

      const response = await fetch(`https://fcm.googleapis.com/v1/projects/$projectId}/messages:send`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(message)
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error("❌ Failed to send push:", result);
        return res.status(500).send("Push failed");
      }

      console.log("✅ Push sent successfully:", result);
      res.status(200).send("Push sent");

    } catch (err) {
      console.error("❌ Error sending push:", err.message);
      res.status(500).send("Server error");
    }
  });
});