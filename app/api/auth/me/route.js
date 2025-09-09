import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSessionCookieName, verifySessionCookie } from "@/lib/session";
import { adminAuth } from "@/lib/firebaseAdmin";

export async function GET() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(getSessionCookieName())?.value;
  const decoded = await verifySessionCookie(sessionCookie);
  if (!decoded) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  const userRecord = await adminAuth.getUser(decoded.uid);
  return NextResponse.json({
    user: {
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName || null,
    },
  });
}
