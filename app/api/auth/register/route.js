import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebaseAdmin";
import {
  createSessionCookie,
  getSessionCookieName,
  getSessionMaxAgeSeconds,
} from "@/lib/session";

export const runtime = "nodejs";

const API_KEY = process.env.FIREBASE_WEB_API_KEY;

export async function POST(request) {
  try {
    if (!API_KEY) {
      return NextResponse.json(
        { error: "Missing FIREBASE_WEB_API_KEY" },
        { status: 500 }
      );
    }

    const { email, password, displayName } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const signUpRes = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );

    if (!signUpRes.ok) {
      const err = await signUpRes.json().catch(() => ({}));
      return NextResponse.json(
        { error: err?.error?.message || "Registration failed" },
        { status: 400 }
      );
    }

    const data = await signUpRes.json();

    const missingAdmin = [
      "FIREBASE_PROJECT_ID",
      "FIREBASE_CLIENT_EMAIL",
      "FIREBASE_PRIVATE_KEY",
    ].filter((k) => !process.env[k]);
    if (missingAdmin.length) {
      return NextResponse.json(
        { error: `Missing Firebase Admin env: ${missingAdmin.join(", ")}` },
        { status: 500 }
      );
    }

    if (displayName) {
      try {
        await adminAuth.updateUser(data.localId, { displayName });
      } catch (_) {}
    }

    let sessionCookie;
    try {
      sessionCookie = await createSessionCookie(data.idToken);
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        // Surface the underlying Admin SDK error in development
        console.error("createSessionCookie error", e);
        const detail = e?.errorInfo?.code || e?.message || String(e);
        return NextResponse.json(
          {
            error:
              "Failed to create session cookie (check service account config)",
            detail,
          },
          { status: 500 }
        );
      }
      return NextResponse.json(
        {
          error:
            "Failed to create session cookie (check service account config)",
        },
        { status: 500 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set({
      name: getSessionCookieName(),
      value: sessionCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: getSessionMaxAgeSeconds(),
    });

    return NextResponse.json({
      user: {
        uid: data.localId,
        email: data.email,
        displayName: displayName || null,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
