import { create } from "zustand";
import { authApi } from "../api/auth.js";
import { profileApi } from "../api/profile.js";

const parseAuthError = (err, mode = "login") => {
  const status = err?.response?.status;
  const payload = err?.response?.data;
  const rawMessage = payload?.message || payload?.error || payload?.errors?.[0]?.msg || err?.message || "";
  const normalized = String(rawMessage).toLowerCase();

  if (mode === "login") {
    if (
      status === 401
      || normalized.includes("invalid")
      || normalized.includes("password")
      || normalized.includes("credential")
    ) {
      return "Неверный номер телефона или пароль";
    }

    return rawMessage || "Ошибка входа";
  }

  if (
    status === 409
    || normalized.includes("already exists")
    || normalized.includes("already registered")
    || normalized.includes("phone already")
    || normalized.includes("exists")
  ) {
    return "Пользователь уже зарегистрирован";
  }

  return rawMessage || "Ошибка регистрации";
};

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
      const message = parseAuthError(err, "login");
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
      const message = parseAuthError(err, "register");

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