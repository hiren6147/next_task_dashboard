import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionCookieName, verifySessionCookie } from "@/lib/session";

export default async function DashboardLayout({ children }) {
  const sessionCookie = cookies().get(getSessionCookieName())?.value;
  const decoded = await verifySessionCookie(sessionCookie);
  if (!decoded) redirect("/login");
  return <div className="min-h-screen p-4">{children}</div>;
}
