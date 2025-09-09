"use client";
import { create } from "zustand";

export const useTaskStore = create((set) => ({
  tasksByProject: {},
  loading: false,
  error: null,
  fetchTasks: async (projectId) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(
        `/api/tasks?projectId=${encodeURIComponent(projectId)}`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error("Failed to load tasks");
      const data = await res.json();
      set((s) => ({
        tasksByProject: { ...s.tasksByProject, [projectId]: data.tasks || [] },
        loading: false,
      }));
    } catch (e) {
      set({ loading: false, error: e.message });
    }
  },
  addTask: async (projectId, payload) => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId, ...payload }),
    });
    if (res.ok) {
      const { task } = await res.json();
      set((s) => ({
        tasksByProject: {
          ...s.tasksByProject,
          [projectId]: [task, ...(s.tasksByProject[projectId] || [])],
        },
      }));
    }
  },
  updateTask: async (projectId, taskId, updates) => {
    const res = await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId, taskId, ...updates }),
    });
    if (res.ok) {
      const { task } = await res.json();
      set((s) => ({
        tasksByProject: {
          ...s.tasksByProject,
          [projectId]: (s.tasksByProject[projectId] || []).map((t) =>
            t.id === task.id ? task : t
          ),
        },
      }));
    }
  },
  deleteTask: async (projectId, taskId) => {
    const res = await fetch(
      `/api/tasks?projectId=${encodeURIComponent(
        projectId
      )}&taskId=${encodeURIComponent(taskId)}`,
      { method: "DELETE" }
    );
    if (res.ok) {
      set((s) => ({
        tasksByProject: {
          ...s.tasksByProject,
          [projectId]: (s.tasksByProject[projectId] || []).filter(
            (t) => t.id !== taskId
          ),
        },
      }));
    }
  },
}));
