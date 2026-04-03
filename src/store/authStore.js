import { create } from "zustand";
import { authApi } from "../api/auth.js";
import { profileApi } from "../api/profile.js";

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  hasInitialized: false,
  error: null,

  initialize: async () => {
    if (get().hasInitialized || get().isLoading) {
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const { data } = await profileApi.getMe();

      set({
        user: data.data,
        isAuthenticated: true,
        isLoading: false,
        hasInitialized: true,
      });
    }
    catch {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        hasInitialized: true,
      });
    }
  },

  login: async (phone, password) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      await authApi.login({
        phone,
        password,
      });

      const { data } = await profileApi.getMe();

      set({
        user: data.data,
        isAuthenticated: true,
        isLoading: false,
        hasInitialized: true,
      });

      return {
        success: true,
      };
    }

    catch (err) {
      const message = err.response?.data?.message || "Ошибка входа";
      set({
        error: message,
        isLoading: false,
      });

      return {
        success: false,
        message,
      };
    }
  },

  register: async (fullname, phone, password) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      await authApi.register({
        fullname,
        phone,
        password,
      });

      const { data } = await profileApi.getMe();

      set({
        user: data.data,
        isAuthenticated: true,
        isLoading: false,
        hasInitialized: true,
      });

      return {
        success: true,
      };
    }

    catch (err) {
      const message = err.response?.data?.message || "Ошибка регистрации";

      set({
        error: message,
        isLoading: false,
      });

      return {
        success: false,
        message,
      };
    }
  },

  logout: async () => {
    try {
      await authApi.logout();
    }
    finally {
      get().forceLogout();
    }
  },

  forceLogout: () => {
    set({
      user: null,
      isAuthenticated: false,
      hasInitialized: true,
      isLoading: false,
      error: null,
    });
  },

  updateUser: (userData) => {
    set((state) => ({
      user: {
        ...state.user,
        ...userData,
      },
    }));
  },
  clearError: () => set({
    error: null,
  }),
}));

export default useAuthStore;