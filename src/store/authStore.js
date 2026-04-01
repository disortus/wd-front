import { create } from "zustand"

import {

  loginRequest,

  registerRequest,

  getMeRequest,

  logoutRequest,

} from "../api/auth"



export const useAuthStore = create((set) => ({

  user: null,

  isLoading: false,



  register: async (data) => {

    set({ isLoading: true })

    try {

      const res = await registerRequest(data)

      set({

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

      set({

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

      set({

        user,

      })

    }

    catch {

      set({

        user: null,

      })

    }

  },



  logout: async () => {

    await logoutRequest()

    set({

      user: null,

    })

  },

}))