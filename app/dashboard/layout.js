import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionCookieName, verifySessionCookie } from "@/lib/session";

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(getSessionCookieName())?.value;
  const decoded = await verifySessionCookie(sessionCookie);
  if (!decoded) redirect("/login");
  return <div className="min-h-screen p-4">{children}</div>;
}
