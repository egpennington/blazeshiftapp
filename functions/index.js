const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.sendPush = functions.https.onRequest(async (req, res) => {
  const { token, name, block, date } = req.body;

  try {
    await admin.messaging().sendToDevice(token, {
      notification: {
        title: "🚒 BlazeShift Signup Confirmed",
        body: `Hi ${name}, you're confirmed for the ${block} shift on ${date}`
      }
    });

    console.log("✅ Push sent to:", token);
    res.status(200).send("Push sent");
  } catch (error) {
    console.error("❌ Error sending push:", error.message);
    res.status(500).send("Push failed");
  }
});

