// src/store/authStore.js

import { create } from "zustand"
import { authApi } from "../api/auth"
import { profileApi } from "../api/profile"

const useAuthStore = create((set) => ({

  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  initialize: async () => {
    try {
      const { data } = await profileApi.getMe()

      set({
        user: data.data,
        isAuthenticated: true,
        isLoading: false,
      })
    }
    catch {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      })
    }
  },

  login: async (email, password) => {

    set({
      isLoading: true,
      error: null,
    })

    try {
      await authApi.login({
        email,
        password,
      })

      const { data } = await profileApi.getMe()

      set({
        user: data.data,
        isAuthenticated: true,
        isLoading: false,
      })

      return {
        success: true,
      }
    }

    catch (err) {
      const message = err.response?.data?.message || "Ошибка входа"
      set({
        error: message,
        isLoading: false,
      })

      return {
        success: false,
        message,
      }
    }
  },

  register: async (fullname, email, password, phone) => {

    set({
      isLoading: true,
      error: null,
    })

    try {
      await authApi.register({
        fullname,
        email,
        password,
        phone,
      })

      const { data } = await profileApi.getMe()

      set({
        user: data.data,
        isAuthenticated: true,
        isLoading: false,
      })

      return {
        success: true,
      }
    }

    catch (err) {
      const message = err.response?.data?.message || "Ошибка регистрации"

      set({
        error: message,
        isLoading: false,
      })

      return {
        success: false,
        message,
      }
    }
  },

  logout: async () => {
    try {
      await authApi.logout()
    }
    finally {
      set({
        user: null,
        isAuthenticated: false,
      })
    }
  },
  updateUser: (userData) => {
    set(state => ({
      user: {
        ...state.user,
        ...userData,
      },
    }))
  },
  clearError: () => set({
    error: null,
  }),
}))

export default useAuthStore