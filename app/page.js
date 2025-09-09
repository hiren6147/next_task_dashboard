import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getSessionCookieName, verifySessionCookie } from "@/lib/session";

export default async function Home() {
  const sessionCookie = await cookies().get(getSessionCookieName())?.value;
  const decoded = await verifySessionCookie(sessionCookie);
  if (decoded) redirect("/dashboard");
  redirect("/login");
}
