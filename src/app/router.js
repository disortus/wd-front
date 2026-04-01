import { createBrowserRouter } from "react-router-dom"

import MainLayout from "../components/layout/MainLayout"

import HomePage from "../pages/HomePage"
import RegisterPage from "../pages/RegisterPage"
import ProfilePage from "../pages/ProfilePage"

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [

      {
        path: "/",
        element: <HomePage />,
      },

      {
        path: "/register",
        element: <RegisterPage />,
      },

      {
        path: "/profile",
        element: <ProfilePage />,
      },

    ],
  },
])