import admin from "firebase-admin";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const rawPrivateKey = process.env.FIREBASE_PRIVATE_KEY;

const privateKey = rawPrivateKey
  ? rawPrivateKey.replace(/\\n/g, "\n")
  : undefined;

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });

    if (process.env.FIREBASE_EMULATORS === "true") {
      try {
        if (process.env.FIRESTORE_EMULATOR_HOST) {
          admin.firestore().settings({
            host: process.env.FIRESTORE_EMULATOR_HOST,
            ssl: false,
          });
        }
      } catch (_) {
        // ignore emulator errors
      }
    }
  } catch (error) {
    console.error("Firebase Admin initialization failed:", error);
    throw new Error(`Firebase Admin initialization failed: ${error.message}`);
  }
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
export default admin;
