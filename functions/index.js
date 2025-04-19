const functions = require("firebase-functions");
const twilio = require("twilio");

// 🔐 Twilio credentials stored securely using Firebase config
const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.token;
const client = twilio(accountSid, authToken);

// 📨 Cloud Function: sendConfirmationSMS
exports.sendConfirmationSMS = functions.https.onCall(async (data, context) => {
  const { to, name, date, shiftBlock } = data;

  try {
    const message = await client.messages.create({
      body: `Hi ${name}, you're confirmed for your BlazeShift on ${date} (${shiftBlock}). 🚒`,
      from: '+18446979439',
      to: to
    });

    return { success: true, sid: message.sid };
  } catch (error) {
    console.error("❌ Error sending SMS:", error.message);
    return { success: false, error: error.message };
  }
});
