import { adminAuth } from "./firebaseAdmin";

const cookieName = process.env.AUTH_COOKIE_NAME || "app_session";
const maxAgeDays = Number(process.env.AUTH_COOKIE_MAX_AGE_DAYS || "7");
const expiresInMs = maxAgeDays * 24 * 60 * 60 * 1000;

export function getSessionCookieName() {
  return cookieName;
}

export function getSessionMaxAgeSeconds() {
  return Math.floor(expiresInMs / 1000);
}

export async function createSessionCookie(idToken) {
  return adminAuth.createSessionCookie(idToken, { expiresIn: expiresInMs });
}

export async function verifySessionCookie(sessionCookie) {
  if (!sessionCookie) return null;
  try {
    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    return decoded;
  } catch (err) {
    return null;
  }
}
