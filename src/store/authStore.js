import { create } from "zustand"

import {

  loginRequest,

  registerRequest,

  getMeRequest,

} from "../api/auth"



export const useAuthStore = create((set) => ({

  user: null,

  token: localStorage.getItem("token"),

  isLoading: false,



  register: async (data) => {

    set({ isLoading: true })

    try {

      const res = await registerRequest(data)

      localStorage.setItem("token", res.token)

      set({

        token: res.token,

        user: res.user,

      })

    }

    finally {

      set({ isLoading: false })

    }

  },



  login: async (data) => {

    set({ isLoading: true })

    try {

      const res = await loginRequest(data)

      localStorage.setItem("token", res.token)

      set({

        token: res.token,

        user: res.user,

      })

    }

    finally {

      set({ isLoading: false })

    }

  },



  fetchMe: async () => {

    try {

      const user = await getMeRequest()

      set({ user })

    }

    catch {

      localStorage.removeItem("token")

      set({

        token: null,

        user: null,

      })

    }

  },



  logout: () => {

    localStorage.removeItem("token")

    set({

      token: null,

      user: null,

    })

  },

}))