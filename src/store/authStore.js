import { create } from "zustand";
import { authApi } from "../api/auth.js";
import { profileApi } from "../api/profile.js";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("auth_token") || null,
  isAuthenticated: !!localStorage.getItem("auth_token"),
  isLoading: true,
  error: null,

  // Initialize auth from stored token
  initialize: async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      set({ isLoading: false, isAuthenticated: false });
      return;
    }
    try {
      const { data } = await profileApi.getMe();
      set({
        user: data.data,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch {
      localStorage.removeItem("auth_token");
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  // Login
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await authApi.login({ email, password });
      const { token, user } = data.data;
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user", JSON.stringify(user));
      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || "Ошибка входа";
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },

  // Register
  register: async (fullname, email, password, phone) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await authApi.register({ fullname, email, password, phone });
      const { token, user } = data.data;
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user", JSON.stringify(user));
      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || "Ошибка регистрации";
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  // Update user profile
  updateUser: (userData) => {
    set((state) => ({
      ...state,
      user: { ...state.user, ...userData },
    }));
  },

  // Clear error
  clearError: () => set({ error: null }),
}));

export default useAuthStore;