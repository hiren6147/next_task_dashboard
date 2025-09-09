import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminDb } from "@/lib/firebaseAdmin";
import { getSessionCookieName, verifySessionCookie } from "@/lib/session";

// GET: /api/tasks?projectId=...
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId");
  const sessionCookie = cookies().get(getSessionCookieName())?.value;
  const decoded = await verifySessionCookie(sessionCookie);
  if (!decoded)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!projectId)
    return NextResponse.json(
      { error: "projectId is required" },
      { status: 400 }
    );

  const snap = await adminDb
    .collection("projects")
    .doc(projectId)
    .collection("tasks")
    .orderBy("createdAt", "desc")
    .get();
  const tasks = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  return NextResponse.json({ tasks });
}

// POST: create task
export async function POST(request) {
  const sessionCookie = cookies().get(getSessionCookieName())?.value;
  const decoded = await verifySessionCookie(sessionCookie);
  if (!decoded)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { projectId, title, status, dueDate } = await request.json();
  if (!projectId || !title)
    return NextResponse.json(
      { error: "projectId and title are required" },
      { status: 400 }
    );

  const payload = {
    title,
    status: status || "Todo",
    dueDate: dueDate || null,
    createdAt: Date.now(),
  };

  const doc = await adminDb
    .collection("projects")
    .doc(projectId)
    .collection("tasks")
    .add(payload);
  const saved = await doc.get();
  return NextResponse.json(
    { task: { id: saved.id, ...saved.data() } },
    { status: 201 }
  );
}

// PUT: update task
export async function PUT(request) {
  const sessionCookie = cookies().get(getSessionCookieName())?.value;
  const decoded = await verifySessionCookie(sessionCookie);
  if (!decoded)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { projectId, taskId, ...updates } = await request.json();
  if (!projectId || !taskId)
    return NextResponse.json(
      { error: "projectId and taskId are required" },
      { status: 400 }
    );

  await adminDb
    .collection("projects")
    .doc(projectId)
    .collection("tasks")
    .doc(taskId)
    .update(updates);
  const updated = await adminDb
    .collection("projects")
    .doc(projectId)
    .collection("tasks")
    .doc(taskId)
    .get();
  return NextResponse.json({ task: { id: updated.id, ...updated.data() } });
}

// DELETE: delete task
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId");
  const taskId = searchParams.get("taskId");
  const sessionCookie = cookies().get(getSessionCookieName())?.value;
  const decoded = await verifySessionCookie(sessionCookie);
  if (!decoded)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!projectId || !taskId)
    return NextResponse.json(
      { error: "projectId and taskId are required" },
      { status: 400 }
    );

  await adminDb
    .collection("projects")
    .doc(projectId)
    .collection("tasks")
    .doc(taskId)
    .delete();
  return NextResponse.json({ ok: true });
}
