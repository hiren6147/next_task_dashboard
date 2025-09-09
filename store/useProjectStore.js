"use client";
import { create } from "zustand";

export const useProjectStore = create((set) => ({
  projects: [],
  loading: false,
  createLoading: false,
  error: null,
  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/projects", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load projects");
      const data = await res.json();
      set({ projects: data.projects || [], loading: false });
    } catch (e) {
      set({ loading: false, error: e.message });
    }
  },
  createProject: async (name, description) => {
    set({ createLoading: true, error: null });
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });
      if (!res.ok) throw new Error("Failed to create project");
      const { project } = await res.json();
      set((s) => ({
        projects: [project, ...s.projects],
        createLoading: false,
      }));
    } catch (e) {
      set({ createLoading: false, error: e.message });
    }
  },
  deleteProject: async (projectId) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(
        `/api/projects?projectId=${encodeURIComponent(projectId)}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to delete project");
      }
      set((s) => ({
        projects: s.projects.filter((p) => p.id !== projectId),
        loading: false,
      }));
    } catch (e) {
      set({ loading: false, error: e.message });
    }
  },
}));
