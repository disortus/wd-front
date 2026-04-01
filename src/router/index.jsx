import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import HomePage from "../pages/HomePage"
import RegisterPage from "../pages/RegisterPage"
import ProfilePage from "../pages/ProfilePage"
import LoginPage from "../pages/LoginPage"
import ProtectedRoute from "../components/ProtectedRoute"

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

        element: (

          <ProtectedRoute>

            <ProfilePage />

          </ProtectedRoute>

        ),

      },

      {
        path: "/login",
        element: <LoginPage />,
      },

    ],
  },
])