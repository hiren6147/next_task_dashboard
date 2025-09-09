"use client";
import { redirect } from "next/navigation";
import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,
  fetchMe: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      if (!res.ok) throw new Error("Not authenticated");
      const data = await res.json();
      set({ user: data.user, loading: false });
    } catch (e) {
      set({ user: null, loading: false, error: e.message });
    }
  },
  login: async (email, password) => {
    set({ loading: true, error: null });
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      set({ loading: false, error: body?.error || "Login failed" });
      return false;
    }
    set({ loading: false });
    await get().fetchMe();
    return true;
  },
  register: async (email, password, displayName) => {
    set({ loading: true, error: null });
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, displayName }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      set({ loading: false, error: body?.error || "Registration failed" });
      return false;
    }
    set({ loading: false });
    await get().fetchMe();
    return true;
  },
  logout: async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    set({ user: null });
    redirect("/login");
  },
}));
