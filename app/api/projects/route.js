import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminDb } from "@/lib/firebaseAdmin";
import { getSessionCookieName, verifySessionCookie } from "@/lib/session";

export async function GET() {
  const sessionCookie = cookies().get(getSessionCookieName())?.value;
  const decoded = await verifySessionCookie(sessionCookie);
  if (!decoded)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const snap = await adminDb
    .collection("projects")
    .where("ownerId", "==", decoded.uid)
    .orderBy("createdAt", "desc")
    .get();
  const projects = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  return NextResponse.json({ projects });
}

export async function POST(request) {
  const sessionCookie = cookies().get(getSessionCookieName())?.value;
  const decoded = await verifySessionCookie(sessionCookie);
  if (!decoded)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, description } = await request.json();
  if (!name)
    return NextResponse.json({ error: "Name is required" }, { status: 400 });

  const doc = await adminDb.collection("projects").add({
    name,
    description: description || "",
    ownerId: decoded.uid,
    createdAt: Date.now(),
  });
  const saved = await doc.get();
  return NextResponse.json(
    { project: { id: saved.id, ...saved.data() } },
    { status: 201 }
  );
}

export async function DELETE(request) {
  const sessionCookie = cookies().get(getSessionCookieName())?.value;
  const decoded = await verifySessionCookie(sessionCookie);
  if (!decoded)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId");

  if (!projectId)
    return NextResponse.json(
      { error: "Project ID is required" },
      { status: 400 }
    );

  try {
    // First verify the project belongs to the user
    const projectDoc = await adminDb
      .collection("projects")
      .doc(projectId)
      .get();
    if (!projectDoc.exists) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const projectData = projectDoc.data();
    if (projectData.ownerId !== decoded.uid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Delete all tasks associated with this project
    const tasksSnapshot = await adminDb
      .collection("tasks")
      .where("projectId", "==", projectId)
      .get();

    const batch = adminDb.batch();
    tasksSnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    // Delete the project
    batch.delete(adminDb.collection("projects").doc(projectId));

    await batch.commit();

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
